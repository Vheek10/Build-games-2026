/** @format */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSuiWallet } from "@/providers/suiet-provider";
import ConnectWalletButton from "@/components/ConnectWalletButton";

export function WalletConnectButton() {
	const { connected } = useSuiWallet();
	const router = useRouter();

	useEffect(() => {
		if (connected) {
			const timer = setTimeout(() => router.push("/dashboard"), 800);
			return () => clearTimeout(timer);
		}
	}, [connected, router]);

	return <ConnectWalletButton />;
}
