// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/common/ERC2981Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";

/**
 * @title StrataDeedNFT
 * @notice Registry for Digital Property Deeds.
 * Each NFT represents a unique property deed registered on the platform.
 */
contract StrataDeedNFT is 
    Initializable, 
    ERC721EnumerableUpgradeable,
    ERC721URIStorageUpgradeable, 
    ERC2981Upgradeable,
    AccessControlUpgradeable,
    ReentrancyGuardUpgradeable, 
    UUPSUpgradeable 
{
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    uint256 public tokenCounter;

    struct PropertyDeed {
        string propertyId;
        string metadataURI;
        bytes32 privateCommitment; // Hash/Commitment to private property data (ZK-ready)
        uint256 mintedAt;
    }

    mapping(uint256 => PropertyDeed) public propertyDeeds;
    mapping(string => bool) public propertyIdExists;

    // Events matching the frontend ABI
    event PropertyTokenized(address indexed owner, uint256 indexed tokenId, string propertyId, string metadataURI);
    event DeedTransferred(address indexed from, address indexed to, uint256 indexed tokenId);
    event PrivateDataUpdated(uint256 indexed tokenId, bytes32 commitment);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address admin) public initializer {
        __ERC721_init("StrataDeed Property Deed", "SD-DEED");
        __ERC721Enumerable_init();
        __ERC721URIStorage_init();
        __ERC2981_init();
        __AccessControl_init();
        __UUPSUpgradeable_init();
        __ReentrancyGuard_init();

        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(MINTER_ROLE, admin);
        _grantRole(UPGRADER_ROLE, admin);
        
        tokenCounter = 0;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}

    function setRoyalty(address receiver, uint96 feeNumerator) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _setDefaultRoyalty(receiver, feeNumerator);
    }

    /**
     * @notice Mints a new Property Deed NFT.
     * @param propertyId The unique identifier for the property (e.g., PROP-123).
     * @param metadataURI The URI pointing to the property's metadata.
     * @param privateCommitment A hash commitment to private documents (ZK-Proof anchor).
     * @return The ID of the newly minted token.
     */
    function mintPropertyDeed(
        address to,
        string memory propertyId, 
        string memory metadataURI, 
        bytes32 privateCommitment
    ) public payable nonReentrant returns (uint256) {
        require(!propertyIdExists[propertyId], "Property already tokenized");
        require(bytes(propertyId).length > 0, "Empty property ID");
        uint256 newTokenId = tokenCounter;
        _safeMint(to, newTokenId);
        _setTokenURI(newTokenId, metadataURI);

        propertyDeeds[newTokenId] = PropertyDeed({
            propertyId: propertyId,
            metadataURI: metadataURI,
            privateCommitment: privateCommitment,
            mintedAt: block.timestamp
        });
        propertyIdExists[propertyId] = true;

        emit PropertyTokenized(to, newTokenId, propertyId, metadataURI);
        emit PrivateDataUpdated(newTokenId, privateCommitment);
        tokenCounter++;
        return newTokenId;
    }

    /**
     * @notice Returns the deed details for a specific token.
     */
    function getPropertyDeed(uint256 tokenId) public view returns (string memory propertyId, string memory metadataURI, uint256 mintedAt) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        PropertyDeed memory deed = propertyDeeds[tokenId];
        return (deed.propertyId, deed.metadataURI, deed.mintedAt);
    }

    /**
     * @notice Burns a specific token.
     */
    function burn(uint256 tokenId) public {
        require(_isAuthorized(_ownerOf(tokenId), _msgSender(), tokenId), "Not authorized to burn");
        _burn(tokenId);
    }

    /**
     * @notice Transfers a deed and emits the custom event.
     */
    function safeTransferDeed(address from, address to, uint256 tokenId) public {
        safeTransferFrom(from, to, tokenId);
        emit DeedTransferred(from, to, tokenId);
    }

    /**
     * @notice Allows admin to withdraw collected fees.
     */
    function withdraw() external onlyRole(DEFAULT_ADMIN_ROLE) {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        (bool success, ) = payable(_msgSender()).call{value: balance}("");
        require(success, "Withdrawal failed");
    }

    // =========================================
    // Overrides
    // =========================================

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721EnumerableUpgradeable, ERC721URIStorageUpgradeable, ERC2981Upgradeable, AccessControlUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    uint256[50] private __gap;
}
