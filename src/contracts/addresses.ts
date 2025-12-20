/** @format */

 export const STRATA_DEED_NFT_ADDRESS: Record<number, `0x${string}`> = {
	5000: "0x0000000000000000000000000000000000000000", // Mantle Mainnet
	5001: "0x0000000000000000000000000000000000000000", // Mantle Testnet (Legacy)
	5003: (process.env.NEXT_PUBLIC_STRATA_DEED_NFT_ADDRESS as `0x${string}`) || "0x4c7e8cd47ee5782c948ee65f0d93f4d4e27ef93c", // Mantle Sepolia
};
