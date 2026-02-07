/** @format */
"use client";

import { ConnectButton } from "@suiet/wallet-kit";

export default function ConnectWalletButton() {
	return (
		<div className="flex items-center justify-center">
			<style>{`
				/* Connect Wallet Button - Clean Solid Color */
				.suiet-connect-button {
					background: #3b82f6 !important;
					border: 1.5px solid rgba(59, 130, 246, 0.4) !important;
					color: #ffffff !important;
					font-weight: 600 !important;
					font-size: 0.875rem !important;
					padding: 0.625rem 1.25rem !important;
					border-radius: 0.5rem !important;
					transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
					box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2) !important;
					cursor: pointer !important;
					display: inline-flex !important;
					align-items: center !important;
					gap: 0.5rem !important;
				}

				.suiet-connect-button:hover {
					background: #2563eb !important;
					border-color: rgba(59, 130, 246, 0.6) !important;
					box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3) !important;
					transform: translateY(-1px) !important;
				}

				.suiet-connect-button:active {
					transform: translateY(0) !important;
					box-shadow: 0 2px 6px rgba(59, 130, 246, 0.2) !important;
				}

				/* Connected state - Emerald Green */
				.suiet-connect-button.connected {
					background: #10b981 !important;
					border-color: rgba(16, 185, 129, 0.4) !important;
					box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2) !important;
				}

				.suiet-connect-button.connected:hover {
					background: #059669 !important;
					border-color: rgba(16, 185, 129, 0.6) !important;
					box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3) !important;
				}

				/* Dropdown menu styling - Dark Theme */
				.suiet-wallet-kit-dialog,
				.suiet-wallet-kit-dropdown {
					background: #1f2937 !important;
					border: 1px solid #374151 !important;
					border-radius: 0.75rem !important;
					box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5) !important;
				}

				.suiet-wallet-kit-dialog-title,
				.suiet-wallet-kit-dropdown > div {
					color: #f9fafb !important;
					font-weight: 600 !important;
				}

				/* Dialog/Modal background */
				.suiet-wallet-kit-dialog-overlay {
					background: rgba(0, 0, 0, 0.75) !important;
					backdrop-filter: blur(4px) !important;
				}

				/* Wallet option buttons */
				.suiet-wallet-kit-option,
				.suiet-wallet-option {
					background: #374151 !important;
					border: 1px solid #4b5563 !important;
					color: #f9fafb !important;
					transition: all 0.2s ease !important;
					border-radius: 0.5rem !important;
					padding: 0.75rem !important;
				}

				.suiet-wallet-kit-option:hover,
				.suiet-wallet-option:hover {
					background: #4b5563 !important;
					border-color: #60a5fa !important;
					color: #ffffff !important;
					box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2) !important;
				}

				/* Text styling */
				.suiet-wallet-kit-option-name,
				.suiet-wallet-option-name {
					color: #f9fafb !important;
					font-weight: 600 !important;
				}

				.suiet-wallet-kit-option-description,
				.suiet-wallet-option-description {
					color: #9ca3af !important;
					font-size: 0.8rem !important;
				}

				/* Close button */
				.suiet-wallet-kit-dialog-close,
				.suiet-close-button {
					color: #9ca3af !important;
					background: transparent !important;
					border: none !important;
				}

				.suiet-wallet-kit-dialog-close:hover,
				.suiet-close-button:hover {
					color: #f9fafb !important;
					background: #374151 !important;
					border-radius: 0.375rem !important;
				}

				/* Disconnect/logout button */
				.suiet-wallet-kit-disconnect,
				.suiet-disconnect-button {
					background: #ef4444 !important;
					color: #ffffff !important;
					border: 1px solid rgba(239, 68, 68, 0.4) !important;
					border-radius: 0.5rem !important;
					padding: 0.625rem 1rem !important;
					font-weight: 600 !important;
					cursor: pointer !important;
					transition: all 0.3s ease !important;
				}

				.suiet-wallet-kit-disconnect:hover,
				.suiet-disconnect-button:hover {
					background: #dc2626 !important;
					border-color: rgba(239, 68, 68, 0.6) !important;
					box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3) !important;
				}

				/* Account info section */
				.suiet-wallet-kit-account {
					background: #374151 !important;
					border: 1px solid #4b5563 !important;
					border-radius: 0.5rem !important;
					padding: 0.75rem !important;
					color: #f9fafb !important;
				}

				.suiet-wallet-kit-account-address {
					color: #60a5fa !important;
					font-weight: 600 !important;
					font-family: monospace !important;
				}

				/* Loading state */
				.suiet-wallet-kit-loading,
				.suiet-loading {
					color: #60a5fa !important;
				}
			`}</style>
			<ConnectButton />
		</div>
	);
}
