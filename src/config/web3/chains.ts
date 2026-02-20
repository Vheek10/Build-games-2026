/** @format */

import { defineChain } from "viem";

// Avalanche C-Chain Mainnet
export const avalanche = defineChain({
	id: 43114,
	name: "Avalanche",
	nativeCurrency: { name: "Avalanche", symbol: "AVAX", decimals: 18 },
	rpcUrls: {
		default: { http: ["https://api.avax.network/ext/bc/C/rpc"] },
	},
	blockExplorers: {
		default: { name: "SnowTrace", url: "https://snowtrace.io" },
	},
});

// Avalanche Fuji Testnet
export const avalancheFuji = defineChain({
	id: 43113,
	name: "Avalanche Fuji",
	nativeCurrency: { name: "Avalanche", symbol: "AVAX", decimals: 18 },
	rpcUrls: {
		default: { http: ["https://api.avax-test.network/ext/bc/C/rpc"] },
	},
	blockExplorers: {
		default: { name: "SnowTrace Testnet", url: "https://testnet.snowtrace.io" },
	},
	testnet: true,
});

// All supported chains
export const SUPPORTED_CHAINS = [avalancheFuji, avalanche] as const;

// Current network based on env
export const CURRENT_NETWORK = process.env.NEXT_PUBLIC_NETWORK || "fuji";

// Helper to get chain by network name
export const getChain = (network: string = CURRENT_NETWORK) => {
	switch (network) {
		case "mainnet":
			return avalanche;
		case "fuji":
		default:
			return avalancheFuji;
	}
};
