/** @format */

import { createPublicClient, http } from "viem";
import { mantle, mantleSepoliaTestnet } from "./chains";

// Mainnet public client
export const mantlePublicClient = createPublicClient({
	chain: mantle,
	transport: http(
		process.env.NEXT_PUBLIC_MANTLE_MAINNET_RPC_URL || "https://rpc.mantle.xyz",
	),
});

// Sepolia testnet public client
export const mantleSepoliaPublicClient = createPublicClient({
	chain: mantleSepoliaTestnet,
	transport: http(
		process.env.NEXT_PUBLIC_MANTLE_SEPOLIA_RPC_URL ||
			"https://rpc.sepolia.mantle.xyz",
	),
});

// Pick client based on chainId
export const getPublicClient = (chainId?: number) => {
	switch (chainId) {
		case 5000:
			return mantlePublicClient;

		case 5003:
			return mantleSepoliaPublicClient;

		default:
			return mantleSepoliaPublicClient;
	}
};
