/** @format */

/**
 * Centralized configuration for Avalanche C-Chain Solidity Smart Contracts.
 *
 * Contracts Location: contracts/
 * - StrataDeedNFT.sol: ERC-721 property deed NFTs with ZK commitments
 * - FractionalDeedToken.sol: ERC-20 fractional ownership tokens with escrow
 * - ZKComplianceVerifier.sol: Merkle proof + ZK verification
 * - StrataDeedCore.sol: Orchestrator contract
 */

// Contract Addresses (set after deployment via .env.local)
export const STRATA_DEED_NFT_ADDRESS = (process.env
	.NEXT_PUBLIC_STRATA_DEED_NFT_ADDRESS || "") as `0x${string}`;
export const FRACTIONAL_DEED_TOKEN_ADDRESS = (process.env
	.NEXT_PUBLIC_FRACTIONAL_DEED_TOKEN_ADDRESS || "") as `0x${string}`;
export const ZK_COMPLIANCE_VERIFIER_ADDRESS = (process.env
	.NEXT_PUBLIC_ZK_COMPLIANCE_VERIFIER_ADDRESS || "") as `0x${string}`;
export const STRATA_DEED_CORE_ADDRESS = (process.env
	.NEXT_PUBLIC_STRATA_DEED_CORE_ADDRESS || "") as `0x${string}`;

// ==================== ABIs ====================

/** StrataDeedNFT – ERC-721 property deed NFTs */
export const STRATA_DEED_NFT_ABI = [
	{
		inputs: [
			{ internalType: "string", name: "propertyId", type: "string" },
			{ internalType: "string", name: "metadataURI", type: "string" },
			{ internalType: "bytes", name: "privateCommitment", type: "bytes" },
			{ internalType: "address", name: "to", type: "address" },
		],
		name: "mintPropertyDeed",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "uint256", name: "tokenId", type: "uint256" },
			{ internalType: "bytes", name: "newCommitment", type: "bytes" },
		],
		name: "updatePrivateCommitment",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
		name: "verifyProperty",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
		name: "getPropertyId",
		outputs: [{ internalType: "string", name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
		name: "getPrivateCommitment",
		outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
		name: "isVerified",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "totalMinted",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
] as const;

/** FractionalDeedToken – ERC-20 fractional ownership with escrow */
export const FRACTIONAL_DEED_TOKEN_ABI = [
	{
		inputs: [],
		name: "depositEscrow",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [],
		name: "finalizeEscrow",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "cancelEscrow",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address payable", name: "recipient", type: "address" },
			{ internalType: "uint256", name: "amount", type: "uint256" },
		],
		name: "distributeYield",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "account", type: "address" },
			{ internalType: "bool", name: "status", type: "bool" },
		],
		name: "setWhitelisted",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "treasuryBalance",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "totalSupply",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "account", type: "address" }],
		name: "balanceOf",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
] as const;

/** ZKComplianceVerifier – Merkle proof + ZK verification */
export const ZK_COMPLIANCE_VERIFIER_ABI = [
	{
		inputs: [
			{ internalType: "address", name: "account", type: "address" },
			{ internalType: "bytes32[]", name: "merkleProof", type: "bytes32[]" },
		],
		name: "verifyCompliance",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "account", type: "address" }],
		name: "isCompliant",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "view",
		type: "function",
	},
] as const;

/** StrataDeedCore – Orchestrator contract */
export const STRATA_DEED_CORE_ABI = [
	{
		inputs: [
			{ internalType: "string", name: "propertyId", type: "string" },
			{ internalType: "string", name: "metadataURI", type: "string" },
			{ internalType: "bytes", name: "privateCommitment", type: "bytes" },
			{ internalType: "address", name: "owner", type: "address" },
		],
		name: "createProperty",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "uint256", name: "deedTokenId", type: "uint256" },
			{ internalType: "string", name: "tokenName", type: "string" },
			{ internalType: "string", name: "tokenSymbol", type: "string" },
			{ internalType: "uint256", name: "totalShares", type: "uint256" },
			{ internalType: "uint256", name: "fundingCap", type: "uint256" },
		],
		name: "fractionalizeProperty",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "deedTokenId", type: "uint256" }],
		name: "getFractionalToken",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getFractionalizedDeeds",
		outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "fractionalizedCount",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "account", type: "address" }],
		name: "checkCompliance",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "view",
		type: "function",
	},
] as const;

/**
 * Aggregated contract config for convenience
 */
export const CONTRACTS = {
	strataDeedNFT: {
		address: STRATA_DEED_NFT_ADDRESS,
		abi: STRATA_DEED_NFT_ABI,
	},
	fractionalDeedToken: {
		address: FRACTIONAL_DEED_TOKEN_ADDRESS,
		abi: FRACTIONAL_DEED_TOKEN_ABI,
	},
	zkComplianceVerifier: {
		address: ZK_COMPLIANCE_VERIFIER_ADDRESS,
		abi: ZK_COMPLIANCE_VERIFIER_ABI,
	},
	strataDeedCore: {
		address: STRATA_DEED_CORE_ADDRESS,
		abi: STRATA_DEED_CORE_ABI,
	},
} as const;

// Helper to check if contracts are configured (addresses deployed)
export const isContractsConfigured = () => {
	return !!(STRATA_DEED_NFT_ADDRESS && STRATA_DEED_CORE_ADDRESS);
};
