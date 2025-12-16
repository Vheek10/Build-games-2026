/** @format */

"use client";

import { useChainId, usePublicClient, useWalletClient } from "wagmi";
import { getPublicClient } from "@/config/web3/clients";

/**
 * Custom hook to interact with the Mantle Network.
 * Provides network status, clients, and chain information.
 *
 * @returns {object} The mantle client state.
 * @returns {number} return.chainId - The current chain ID.
 * @returns {PublicClient} return.publicClient - The correct public client for the current chain.
 * @returns {WalletClient} return.walletClient - The connected wallet client.
 * @returns {boolean} return.isConnected - True if a wallet is connected.
 * @returns {boolean} return.isMantleNetwork - True if on Mantle Mainnet (5000) or Sepolia (5003).
 * @returns {boolean} return.isMainnet - True if on Mantle Mainnet.
 * @returns {boolean} return.isTestnet - True if on Mantle Sepolia.
 */
export function useMantleClient() {
	const chainId = useChainId();
	const { data: walletClient } = useWalletClient();

	// Wagmi's default public client (might not be Mantle optimized)
	const publicClient = usePublicClient();

	// Our Mantle-specific client mapped by chainId (if available)
	const mantlePublicClient = getPublicClient(chainId);

	const isMantle = chainId === 5000 || chainId === 5003;

	return {
		chainId,
		// Fallback to default Wagmi public client if specific Mantle client isn't found
		publicClient: mantlePublicClient ?? publicClient,
		walletClient,
		isConnected: !!walletClient,
		isMantleNetwork: isMantle,
		isMainnet: chainId === 5000,
		isTestnet: chainId === 5003,
	};
}
