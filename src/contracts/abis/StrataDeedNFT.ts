/** @format */

export const StrataDeedNFTABI = [
	// Events
	"event PropertyTokenized(address indexed owner, uint256 indexed tokenId, string propertyId, string metadataURI)",
	"event DeedTransferred(address indexed from, address indexed to, uint256 indexed tokenId)",

	// Read
	"function tokenCounter() view returns (uint256)",
	"function ownerOf(uint256 tokenId) view returns (address)",
	"function balanceOf(address owner) view returns (uint256)",
	"function getPropertyDeed(uint256 tokenId) view returns (string propertyId, string metadataURI, uint256 mintedAt)",
	"function tokensOfOwner(address owner) view returns (uint256[])",

 	// Write
	"function mintPropertyDeed(string propertyId, string metadataURI, bytes32 privateCommitment) payable returns (uint256)",
	"function safeTransferFrom(address from, address to, uint256 tokenId)",
	"function safeTransferFrom(address from, address to, uint256 tokenId, bytes data)",

	// Admin
	"function setBaseURI(string baseURI) external",
	"function withdraw() external",
] as const;
