/** @format */

"use client";

import * as React from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { config } from "@/config/web3/providers";
import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();

/**
 * Web3Provider — Wraps the app with wagmi, RainbowKit, and React Query
 * for Avalanche C-Chain wallet connectivity.
 *
 * Supported wallets: MetaMask, Core Wallet, Rabby, WalletConnect, etc.
 */
export function Web3Provider({ children }: { children: React.ReactNode }) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider
					theme={darkTheme({
						accentColor: "#E84142", // Avalanche red
						accentColorForeground: "white",
						borderRadius: "medium",
					})}
					modalSize="compact">
					{children}
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}

// Re-export for backward compatibility with existing imports
export { Web3Provider as SuietProvider };
