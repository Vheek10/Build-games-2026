/** @format */

"use client";

import { forwardRef } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const ConnectWalletButton = forwardRef<HTMLDivElement>((props, ref) => {
	return (
		<div
			className="sd-connect-button"
			ref={ref}>
			<ConnectButton.Custom>
				{({
					account,
					chain,
					openAccountModal,
					openChainModal,
					openConnectModal,
					mounted,
				}) => {
					const connected = mounted && account && chain;

					return (
						<div
							{...(!mounted && {
								"aria-hidden": true,
								style: {
									opacity: 0,
									pointerEvents: "none",
									userSelect: "none",
								},
							})}>
							{(() => {
								if (!connected) {
									return (
										<button
											onClick={openConnectModal}
											type="button"
											className="sd-wallet-btn sd-disconnected">
											Connect Wallet
										</button>
									);
								}

								if (chain.unsupported) {
									return (
										<button
											onClick={openChainModal}
											type="button"
											className="sd-wallet-btn sd-wrong-network">
											Wrong Network
										</button>
									);
								}

								return (
									<button
										onClick={openAccountModal}
										type="button"
										className="sd-wallet-btn sd-connected">
										<span className="sd-connected-dot" />
										<span className="sd-address">{account.displayName}</span>
									</button>
								);
							})()}
						</div>
					);
				}}
			</ConnectButton.Custom>
		</div>
	);
});

ConnectWalletButton.displayName = "ConnectWalletButton";

export default ConnectWalletButton;
