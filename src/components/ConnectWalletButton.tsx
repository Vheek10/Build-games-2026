/** @format */

"use client";

import { ConnectButton } from "@suiet/wallet-kit";

export default function ConnectWalletButton() {
	return (
		<div className="sd-connect-button">
			<ConnectButton showBalance={false}>Connect</ConnectButton>
		</div>
	);
}
