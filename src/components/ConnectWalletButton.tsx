/** @format */

"use client";

import { forwardRef } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const ConnectWalletButton = forwardRef<HTMLDivElement>((props, ref) => {
	return (
		<div
			className="sd-connect-button"
			ref={ref}>
			<ConnectButton
				chainStatus="icon"
				accountStatus="address"
				showBalance={false}
			/>
		</div>
	);
});

ConnectWalletButton.displayName = "ConnectWalletButton";

export default ConnectWalletButton;
