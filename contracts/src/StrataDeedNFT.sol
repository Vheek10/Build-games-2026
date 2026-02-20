// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title StrataDeedNFT
 * @author StrataDeed Team
 * @notice ERC-721 NFT representing tokenized real estate property deeds on Avalanche.
 * @dev Each token stores a metadata URI (pointing to property info on IPFS or similar)
 *      and a private commitment hash used for ZK-based compliance verification.
 *      Ported from the Sui Move `property_nft.move` module.
 */
contract StrataDeedNFT is
    ERC721,
    ERC721URIStorage,
    ERC721Burnable,
    AccessControl,
    Pausable,
    ReentrancyGuard
{
    // =========================================================================
    // Roles
    // =========================================================================

    /// @notice Role that can mint new property deeds and verify properties.
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    /// @notice Role for compliance officers who can freeze / unflag deeds.
    bytes32 public constant COMPLIANCE_ROLE = keccak256("COMPLIANCE_ROLE");

    // =========================================================================
    // State
    // =========================================================================

    /// @notice Auto-incrementing token ID counter.
    uint256 private _nextTokenId;

    /// @notice Maximum allowed commitment length in bytes (matches Move's 64-byte limit).
    uint256 public constant MAX_COMMITMENT_LENGTH = 64;

    /// @dev Mapping from tokenId → property identifier string (e.g. "PROP-00123").
    mapping(uint256 => string) private _propertyIds;

    /// @dev Mapping from tokenId → ZK private commitment hash.
    mapping(uint256 => bytes) private _privateCommitments;

    /// @dev Mapping from tokenId → whether the property has been admin-verified.
    mapping(uint256 => bool) private _verified;

    /// @dev Mapping from tokenId → minted-at timestamp.
    mapping(uint256 => uint256) private _mintedAt;

    // =========================================================================
    // Events
    // =========================================================================

    /// @notice Emitted when a new property deed NFT is minted.
    event PropertyTokenized(
        address indexed owner,
        uint256 indexed tokenId,
        string propertyId,
        string metadataURI
    );

    /// @notice Emitted when a deed is transferred between addresses.
    event DeedTransferred(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );

    /// @notice Emitted when the private ZK commitment is updated.
    event PrivateDataUpdated(
        uint256 indexed tokenId,
        bytes commitment
    );

    /// @notice Emitted when a property's verification status changes.
    event PropertyVerified(
        uint256 indexed tokenId,
        bool verified
    );

    // =========================================================================
    // Errors
    // =========================================================================

    error InvalidCommitmentLength(uint256 length);
    error EmptyCommitment();
    error EmptyPropertyId();
    error EmptyMetadataURI();
    error PropertyNotVerified(uint256 tokenId);
    error SelfTransferNotAllowed();

    // =========================================================================
    // Constructor
    // =========================================================================

    /**
     * @param admin The address that receives DEFAULT_ADMIN_ROLE, MINTER_ROLE,
     *              and COMPLIANCE_ROLE on deployment.
     */
    constructor(address admin) ERC721("StrataDeed Property", "SDEED") {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(MINTER_ROLE, admin);
        _grantRole(COMPLIANCE_ROLE, admin);
    }

    // =========================================================================
    // External / Public — Minting
    // =========================================================================

    /**
     * @notice Mint a new Property Deed NFT.
     * @param to               Recipient of the deed.
     * @param propertyId       Human-readable property identifier (e.g. "PROP-00123").
     * @param metadataURI      URI pointing to off-chain property metadata (IPFS, Arweave, etc.).
     * @param privateCommitment ZK commitment hash for private property data (max 64 bytes).
     * @return tokenId          The newly minted token ID.
     */
    function mintPropertyDeed(
        address to,
        string calldata propertyId,
        string calldata metadataURI,
        bytes calldata privateCommitment
    )
        external
        onlyRole(MINTER_ROLE)
        whenNotPaused
        nonReentrant
        returns (uint256 tokenId)
    {
        if (bytes(propertyId).length == 0) revert EmptyPropertyId();
        if (bytes(metadataURI).length == 0) revert EmptyMetadataURI();
        _validateCommitment(privateCommitment);

        tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, metadataURI);

        _propertyIds[tokenId] = propertyId;
        _privateCommitments[tokenId] = privateCommitment;
        _mintedAt[tokenId] = block.timestamp;

        emit PropertyTokenized(to, tokenId, propertyId, metadataURI);
        emit PrivateDataUpdated(tokenId, privateCommitment);
    }

    // =========================================================================
    // External / Public — Commitment Management
    // =========================================================================

    /**
     * @notice Update the ZK private commitment for a deed you own.
     * @param tokenId        The deed token ID.
     * @param newCommitment  The new commitment hash (1-64 bytes).
     */
    function updatePrivateCommitment(
        uint256 tokenId,
        bytes calldata newCommitment
    ) external whenNotPaused {
        address owner = _requireOwned(tokenId);
        require(owner == msg.sender, "Caller is not the deed owner");
        _validateCommitment(newCommitment);

        _privateCommitments[tokenId] = newCommitment;
        emit PrivateDataUpdated(tokenId, newCommitment);
    }

    // =========================================================================
    // External / Public — Verification
    // =========================================================================

    /**
     * @notice Mark a property deed as verified (compliance / admin action).
     * @param tokenId The deed token ID to verify.
     */
    function verifyProperty(uint256 tokenId)
        external
        onlyRole(COMPLIANCE_ROLE)
    {
        _requireOwned(tokenId);
        _verified[tokenId] = true;
        emit PropertyVerified(tokenId, true);
    }

    /**
     * @notice Revoke verification status of a property deed.
     * @param tokenId The deed token ID.
     */
    function revokeVerification(uint256 tokenId)
        external
        onlyRole(COMPLIANCE_ROLE)
    {
        _requireOwned(tokenId);
        _verified[tokenId] = false;
        emit PropertyVerified(tokenId, false);
    }

    // =========================================================================
    // External / Public — Pausable
    // =========================================================================

    /// @notice Pause all minting and transfers (emergency circuit breaker).
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    /// @notice Unpause the contract.
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    // =========================================================================
    // View Functions
    // =========================================================================

    /// @notice Get the property identifier for a deed.
    function getPropertyId(uint256 tokenId) external view returns (string memory) {
        _requireOwned(tokenId);
        return _propertyIds[tokenId];
    }

    /// @notice Get the private ZK commitment for a deed.
    function getPrivateCommitment(uint256 tokenId) external view returns (bytes memory) {
        _requireOwned(tokenId);
        return _privateCommitments[tokenId];
    }

    /// @notice Check whether a property deed has been verified.
    function isVerified(uint256 tokenId) external view returns (bool) {
        _requireOwned(tokenId);
        return _verified[tokenId];
    }

    /// @notice Get the mint timestamp of a deed.
    function getMintedAt(uint256 tokenId) external view returns (uint256) {
        _requireOwned(tokenId);
        return _mintedAt[tokenId];
    }

    /// @notice Get the total number of deeds minted so far.
    function totalMinted() external view returns (uint256) {
        return _nextTokenId;
    }

    // =========================================================================
    // Internal Overrides (ERC-721 + URIStorage + AccessControl)
    // =========================================================================

    /// @dev Hook that runs before every transfer; enforces pause.
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721) whenNotPaused returns (address) {
        address from = _ownerOf(tokenId);
        if (from != address(0) && to != address(0) && from == to) {
            revert SelfTransferNotAllowed();
        }
        if (from != address(0) && to != address(0)) {
            emit DeedTransferred(from, to, tokenId);
        }
        return super._update(to, tokenId, auth);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // =========================================================================
    // Internal Helpers
    // =========================================================================

    /// @dev Validate a commitment is non-empty and within MAX_COMMITMENT_LENGTH.
    function _validateCommitment(bytes calldata commitment) internal pure {
        if (commitment.length == 0) revert EmptyCommitment();
        if (commitment.length > MAX_COMMITMENT_LENGTH) {
            revert InvalidCommitmentLength(commitment.length);
        }
    }
}
