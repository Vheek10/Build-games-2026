/** @format */

"use client";

import * as React from "react";
import { WalletProvider, useWallet } from "@suiet/wallet-kit";

export function SuietProvider({ children }: { children: React.ReactNode }) {
	return (
		<WalletProvider>
			{children}
		</WalletProvider>
	);
}

export function useSuiWallet() {
	const wallet = useWallet();

	return {
		...wallet,
		address: wallet.account?.address,
		connected: wallet.connected,
		disconnect: wallet.disconnect,
	};
}


