/** @format */

import { createPublicClient, http } from "viem";
import {
	avalanche,
	avalancheFuji,
	getChain,
	CURRENT_NETWORK,
} from "@/config/web3/chains";

// Public clients for reading on-chain data
export const fujiPublicClient = createPublicClient({
	chain: avalancheFuji,
	transport: http(),
});

export const mainnetPublicClient = createPublicClient({
	chain: avalanche,
	transport: http(),
});

// Get public client for the current network
export const getPublicClient = (network: string = CURRENT_NETWORK) => {
	switch (network) {
		case "mainnet":
			return mainnetPublicClient;
		case "fuji":
		default:
			return fujiPublicClient;
	}
};
