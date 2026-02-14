/** @format */

"use client";

import { forwardRef } from "react";
import { ConnectButton, useWallet } from "@suiet/wallet-kit";

const ConnectWalletButtonContent = () => {
	const { currentAccount } = useWallet();

	if (currentAccount) {
		const address = currentAccount.address;
		const truncated = `${address.slice(0, 6)}...${address.slice(-4)}`;
		return <span>{truncated}</span>;
	}

	return <span>Connect</span>;
};

const ConnectWalletButton = forwardRef<HTMLDivElement>((props, ref) => {
	return (
		<div
			className="sd-connect-button"
			ref={ref}>
			<ConnectButton showBalance={false}>
				<ConnectWalletButtonContent />
			</ConnectButton>
		</div>
	);
});

ConnectWalletButton.displayName = "ConnectWalletButton";

export default ConnectWalletButton;
