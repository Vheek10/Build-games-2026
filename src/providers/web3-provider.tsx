/** @format */

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { config } from "@/config/web3/providers";

const queryClient = new QueryClient();

/**
 * Web3Provider — wraps the app with Wagmi, RainbowKit, and React Query
 * for Avalanche C-Chain wallet connectivity.
 */
export function Web3Provider({ children }: { children: React.ReactNode }) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider
					theme={darkTheme({
						accentColor: "#E84142",
						accentColorForeground: "white",
						borderRadius: "medium",
					})}>
					{children}
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}
