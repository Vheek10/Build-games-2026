// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import "./StrataDeedNFT.sol";
import "./FractionalDeedToken.sol";
import "./ZKComplianceVerifier.sol";

/**
 * @title StrataDeedCore
 * @author StrataDeed Team
 * @notice Orchestrator contract that ties together property deed NFTs,
 *         fractional ownership tokens, and ZK-based compliance verification
 *         on Avalanche C-Chain.
 * @dev This contract acts as a single entry point for:
 *        1. Minting property deed NFTs (via StrataDeedNFT)
 *        2. Fractionalizing deeds into ERC-20 shares (deploys FractionalDeedToken per property)
 *        3. Enforcing compliance checks before fractionalization
 *        4. Managing the registry of fractionalized properties
 *
 *      Ported from the combined logic of Sui Move modules:
 *        - property.move (property creation + token minting)
 *        - property_nft.move (deed NFTs + ZK commitments)
 *        - property_rwa.move (fractional tokens + escrow + yield)
 */
contract StrataDeedCore is AccessControl, Pausable, ReentrancyGuard {
    // =========================================================================
    // Roles
    // =========================================================================

    /// @notice Role for operators who can mint deeds and fractionalize.
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");

    // =========================================================================
    // Linked Contracts
    // =========================================================================

    /// @notice The StrataDeedNFT contract for property deed NFTs.
    StrataDeedNFT public immutable deedNFT;

    /// @notice The ZKComplianceVerifier contract for compliance checks.
    ZKComplianceVerifier public immutable complianceVerifier;

    // =========================================================================
    // State
    // =========================================================================

    /// @notice Whether compliance verification is required before fractionalization.
    bool public complianceRequired;

    /// @dev Mapping from deed tokenId → deployed FractionalDeedToken address.
    mapping(uint256 => address) public fractionalTokens;

    /// @dev Array of all deed IDs that have been fractionalized.
    uint256[] private _fractionalizedDeeds;

    /// @notice Struct for property creation parameters.
    struct PropertyParams {
        string propertyId;
        string metadataURI;
        bytes privateCommitment;
    }

    /// @notice Struct for fractionalization parameters.
    struct FractionalizationParams {
        string tokenName;
        string tokenSymbol;
        uint256 totalShares;
        uint256 fundingCap;
    }

    // =========================================================================
    // Events
    // =========================================================================

    event PropertyCreated(
        uint256 indexed deedTokenId,
        address indexed owner,
        string propertyId
    );

    event PropertyFractionalized(
        uint256 indexed deedTokenId,
        address indexed fractionalToken,
        uint256 totalShares,
        uint256 fundingCap
    );

    event ComplianceRequirementChanged(bool required);

    // =========================================================================
    // Errors
    // =========================================================================

    error DeedAlreadyFractionalized(uint256 deedTokenId);
    error CallerNotDeedOwner(uint256 deedTokenId, address caller);
    error ComplianceCheckFailed(address account);
    error ZeroShares();
    error ZeroFundingCap();
    error DeedNotFractionalized(uint256 deedTokenId);

    // =========================================================================
    // Constructor
    // =========================================================================

    /**
     * @param admin               Admin address (receives all roles).
     * @param deedNFT_            Address of the deployed StrataDeedNFT contract.
     * @param complianceVerifier_ Address of the deployed ZKComplianceVerifier contract.
     */
    constructor(
        address admin,
        address deedNFT_,
        address complianceVerifier_
    ) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(OPERATOR_ROLE, admin);

        deedNFT = StrataDeedNFT(deedNFT_);
        complianceVerifier = ZKComplianceVerifier(complianceVerifier_);
        complianceRequired = true;
    }

    // =========================================================================
    // Property Creation
    // =========================================================================

    /**
     * @notice Mint a new property deed NFT via StrataDeedNFT.
     * @param to     Recipient of the deed.
     * @param params Property parameters (propertyId, metadataURI, privateCommitment).
     * @return deedTokenId The minted deed's token ID.
     * @dev Caller must have OPERATOR_ROLE. The StrataDeedCore contract must
     *      hold MINTER_ROLE on the StrataDeedNFT contract.
     */
    function createProperty(
        address to,
        PropertyParams calldata params
    )
        external
        onlyRole(OPERATOR_ROLE)
        whenNotPaused
        returns (uint256 deedTokenId)
    {
        if (complianceRequired) {
            if (!complianceVerifier.isCompliant(to)) {
                revert ComplianceCheckFailed(to);
            }
        }

        deedTokenId = deedNFT.mintPropertyDeed(
            to,
            params.propertyId,
            params.metadataURI,
            params.privateCommitment
        );

        emit PropertyCreated(deedTokenId, to, params.propertyId);
    }

    // =========================================================================
    // Fractionalization
    // =========================================================================

    /**
     * @notice Fractionalize a property deed into ERC-20 shares.
     * @param deedTokenId The deed NFT token ID to fractionalize.
     * @param params      Fractionalization parameters.
     * @return tokenAddress The address of the newly deployed FractionalDeedToken.
     * @dev Deploys a new FractionalDeedToken contract. The caller must own the deed.
     *      All shares are minted to the deed owner.
     */
    function fractionalizeProperty(
        uint256 deedTokenId,
        FractionalizationParams calldata params
    )
        external
        whenNotPaused
        nonReentrant
        returns (address tokenAddress)
    {
        // Validate
        if (fractionalTokens[deedTokenId] != address(0)) {
            revert DeedAlreadyFractionalized(deedTokenId);
        }
        if (params.totalShares == 0) revert ZeroShares();
        if (params.fundingCap == 0) revert ZeroFundingCap();

        address deedOwner = deedNFT.ownerOf(deedTokenId);
        if (deedOwner != msg.sender) {
            revert CallerNotDeedOwner(deedTokenId, msg.sender);
        }

        // Compliance check on the deed owner
        if (complianceRequired) {
            if (!complianceVerifier.isCompliant(msg.sender)) {
                revert ComplianceCheckFailed(msg.sender);
            }
        }

        // Get the property ID from the deed
        string memory propertyId = deedNFT.getPropertyId(deedTokenId);

        // Deploy a new FractionalDeedToken
        FractionalDeedToken token = new FractionalDeedToken(
            params.tokenName,
            params.tokenSymbol,
            msg.sender,         // admin = deed owner
            propertyId,
            deedTokenId,
            params.totalShares,
            params.fundingCap
        );

        tokenAddress = address(token);
        fractionalTokens[deedTokenId] = tokenAddress;
        _fractionalizedDeeds.push(deedTokenId);

        emit PropertyFractionalized(
            deedTokenId,
            tokenAddress,
            params.totalShares,
            params.fundingCap
        );
    }

    // =========================================================================
    // Admin Functions
    // =========================================================================

    /// @notice Enable or disable compliance requirement for minting & fractionalization.
    function setComplianceRequired(bool required)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        complianceRequired = required;
        emit ComplianceRequirementChanged(required);
    }

    /// @notice Pause all core operations.
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    /// @notice Unpause.
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    // =========================================================================
    // View Functions
    // =========================================================================

    /**
     * @notice Get the fractional token address for a deed.
     * @param deedTokenId The deed NFT token ID.
     * @return tokenAddress Address of the FractionalDeedToken (zero if not fractionalized).
     */
    function getFractionalToken(uint256 deedTokenId)
        external
        view
        returns (address tokenAddress)
    {
        return fractionalTokens[deedTokenId];
    }

    /// @notice Get all fractionalized deed IDs.
    function getFractionalizedDeeds()
        external
        view
        returns (uint256[] memory)
    {
        return _fractionalizedDeeds;
    }

    /// @notice Get the total count of fractionalized properties.
    function fractionalizedCount() external view returns (uint256) {
        return _fractionalizedDeeds.length;
    }

    /**
     * @notice Check if a given address passes compliance.
     * @param account Address to check.
     * @return compliant True if compliant (or compliance is not required).
     */
    function checkCompliance(address account)
        external
        view
        returns (bool compliant)
    {
        if (!complianceRequired) return true;
        return complianceVerifier.isCompliant(account);
    }
}
