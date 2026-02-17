/** @format */

"use client";

import { forwardRef } from "react";
import { ConnectButton, useWallet } from "@suiet/wallet-kit";

const ConnectWalletButtonContent = () => {
	const { account } = useWallet();

	if (account) {
		const address = account.address;
		const truncated = `${address.slice(0, 4)}...${address.slice(-4)}`;
		return <span className="text-white">{truncated}</span>;
	}

	return <span className="text-white">Connect</span>;
};

const ConnectWalletButton = forwardRef<HTMLDivElement>((props, ref) => {
	return (
		<div
			className="sd-connect-button"
			ref={ref}>
			<ConnectButton>
				<ConnectWalletButtonContent />
			</ConnectButton>
		</div>
	);
});

ConnectWalletButton.displayName = "ConnectWalletButton";

export default ConnectWalletButton;
