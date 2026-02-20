/** @format */

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { avalanche, avalancheFuji } from "@/config/web3/chains";
import { http } from "wagmi";

/**
 * Wagmi + RainbowKit configuration for Avalanche C-Chain.
 * Supports Core Wallet, MetaMask, Rabby, and other EVM wallets.
 */
export const config = getDefaultConfig({
	appName: "StrataDeed",
	projectId:
		process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ||
		"YOUR_WALLETCONNECT_PROJECT_ID",
	chains: [avalancheFuji, avalanche],
	transports: {
		[avalancheFuji.id]: http(),
		[avalanche.id]: http(),
	},
	ssr: true,
});
