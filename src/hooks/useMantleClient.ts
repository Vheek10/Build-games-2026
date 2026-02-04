/** @format */

"use client";

import { useSuiWallet } from "@/providers/suiet-provider";

/**
 * Sui-only placeholder for Mantle client hook. Returns minimal wallet/connect state.
 */
export function useMantleClient() {
	const { connected } = useSuiWallet();

	return {
		chainId: undefined,
		publicClient: undefined,
		walletClient: undefined,
		isConnected: !!connected,
		isMantleNetwork: false,
		isMainnet: false,
		isTestnet: false,
	};
}
