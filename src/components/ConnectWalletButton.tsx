/** @format */
"use client";

import { ConnectButton } from "@suiet/wallet-kit";
import { motion } from "framer-motion";
import { Wallet, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ConnectWalletButton() {
	return (
		<motion.div
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			className="relative">
			<style>{`
				/* ============================================
				   Connect Wallet Button - Institutional Capsule
				   ============================================ */
				.suiet-connect-button {
					background: #111827 !important; /* gray-900 */
					border: 1px solid rgba(255, 255, 255, 0.1) !important;
					color: #ffffff !important;
					font-family: var(--font-montserrat), ui-sans-serif, system-ui, sans-serif !important;
					font-weight: 900 !important;
					font-size: 10px !important;
					padding: 0.8rem 2rem !important;
					border-radius: 9999px !important;
					transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
					box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
					cursor: pointer !important;
					display: inline-flex !important;
					align-items: center !important;
					justify-content: center !important;
					gap: 0.75rem !important;
					text-transform: uppercase !important;
					letter-spacing: 0.4em !important;
					min-height: 48px !important;
					width: 100% !important;
					max-width: 280px !important;
				}

				.suiet-connect-button:hover {
					background: #2563eb !important; /* blue-600 */
					box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.2), 0 4px 6px -2px rgba(37, 99, 235, 0.1) !important;
					transform: translateY(-1px) !important;
					border-color: rgba(255, 255, 255, 0.2) !important;
				}

				.suiet-connect-button:active {
					transform: translateY(0) !important;
				}

				/* ============================================
				   Connected state - Emerald Green
				   ============================================ */
				.suiet-connect-button.connected {
					background: linear-gradient(135deg, #059669 0%, #047857 100%) !important;
					border-color: rgba(52, 211, 153, 0.3) !important;
					box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.15) !important;
				}

				.suiet-connect-button.connected:hover {
					background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
					border-color: rgba(52, 211, 153, 0.5) !important;
					box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.2) !important;
				}

				/* ============================================
				   Modal/Dropdown wrapper styling - LIGHT THEME
				   ============================================ */
				.suiet-wallet-kit-modal,
				.suiet-wallet-kit-dialog {
					background: linear-gradient(180deg, #ffffff 0%, #f9fafb 100%) !important;
					border: 1px solid #e5e7eb !important;
					border-radius: 1.5rem !important;
					box-shadow: 
						0 25px 50px -12px rgba(0, 0, 0, 0.25),
						0 0 0 1px rgba(59, 130, 246, 0.1) !important;
					overflow: hidden !important;
				}

				/* ============================================
				   Modal header styling - LIGHT THEME
				   ============================================ */
				.suiet-wallet-kit-modal-header,
				.suiet-wallet-kit-dialog-header {
					padding: 1.5rem !important;
					border-bottom: 1px solid #e5e7eb !important;
					background: linear-gradient(180deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%) !important;
				}

				.suiet-wallet-kit-modal-title,
				.suiet-wallet-kit-dialog-title {
					color: #111827 !important;
					font-family: var(--font-mclaren), ui-sans-serif !important;
					font-size: 1.5rem !important;
					font-weight: 900 !important;
					letter-spacing: 0.02em !important;
					text-align: center !important;
					margin: 0 !important;
				}

				.suiet-wallet-kit-modal-subtitle,
				.suiet-wallet-kit-dialog-subtitle {
					color: #6b7280 !important;
					font-family: var(--font-montserrat), ui-sans-serif !important;
					font-size: 0.75rem !important;
					font-weight: 600 !important;
					text-transform: uppercase !important;
					letter-spacing: 0.15em !important;
					text-align: center !important;
					margin-top: 0.5rem !important;
				}

				/* ============================================
				   Dialog/Modal background overlay
				   ============================================ */
				.suiet-wallet-kit-dialog-overlay {
					background: rgba(3, 7, 18, 0.5) !important;
					backdrop-filter: blur(8px) !important;
				}

				/* ============================================
				   Wallet list section headers - LIGHT THEME
				   ============================================ */
				.suiet-wallet-kit-section-title,
				.suiet-wallet-section-title {
					color: #9ca3af !important;
					font-family: var(--font-montserrat), ui-sans-serif !important;
					font-size: 0.65rem !important;
					font-weight: 800 !important;
					text-transform: uppercase !important;
					letter-spacing: 0.2em !important;
					padding: 1rem 1.5rem 0.5rem !important;
				}

				/* ============================================
				   Wallet option buttons - Premium LIGHT styling
				   ============================================ */
				.suiet-wallet-kit-option,
				.suiet-wallet-option {
					background: linear-gradient(180deg, #f9fafb 0%, #ffffff 100%) !important;
					border: 1px solid #e5e7eb !important;
					color: #111827 !important;
					transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
					border-radius: 1rem !important;
					padding: 1rem 1.5rem !important;
					margin: 0.5rem 1rem !important;
					display: flex !important;
					align-items: center !important;
					gap: 1rem !important;
				}

				.suiet-wallet-kit-option:hover,
				.suiet-wallet-option:hover {
					background: linear-gradient(180deg, #eff6ff 0%, #dbeafe 100%) !important;
					border-color: #3b82f6 !important;
					transform: translateX(4px) !important;
					box-shadow: 
						0 4px 6px -1px rgba(0, 0, 0, 0.1),
						0 0 0 2px rgba(59, 130, 246, 0.2) !important;
				}

				/* ============================================
				   Wallet option icon wrapper - LIGHT THEME
				   ============================================ */
				.suiet-wallet-kit-option-icon-wrapper,
				.suiet-wallet-option-icon-wrapper {
					width: 48px !important;
					height: 48px !important;
					border-radius: 12px !important;
					background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%) !important;
					border: 1px solid #d1d5db !important;
					display: flex !important;
					align-items: center !important;
					justify-content: center !important;
					flex-shrink: 0 !important;
				}

				.suiet-wallet-kit-option-icon,
				.suiet-wallet-option-icon {
					width: 28px !important;
					height: 28px !important;
					filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)) !important;
				}

				/* ============================================
				   Wallet option text styling - LIGHT THEME
				   ============================================ */
				.suiet-wallet-kit-option-content,
				.suiet-wallet-option-content {
					flex: 1 !important;
					text-align: left !important;
				}

				.suiet-wallet-kit-option-name,
				.suiet-wallet-option-name {
					color: #111827 !important;
					font-family: var(--font-montserrat), ui-sans-serif !important;
					font-weight: 800 !important;
					font-size: 0.9rem !important;
					text-transform: uppercase !important;
					letter-spacing: 0.05em !important;
				}

				.suiet-wallet-kit-option-description,
				.suiet-wallet-option-description {
					color: #6b7280 !important;
					font-family: var(--font-montserrat), ui-sans-serif !important;
					font-size: 0.75rem !important;
					font-weight: 500 !important;
					margin-top: 0.25rem !important;
				}

				/* ============================================
				   Arrow indicator - LIGHT THEME
				   ============================================ */
				.suiet-wallet-kit-option-arrow,
				.suiet-wallet-option-arrow {
					color: #9ca3af !important;
					width: 20px !important;
					height: 20px !important;
					transition: all 0.3s !important;
				}

				.suiet-wallet-kit-option:hover .suiet-wallet-kit-option-arrow,
				.suiet-wallet-option:hover .suiet-wallet-option-arrow {
					color: #3b82f6 !important;
					transform: translateX(4px) !important;
				}

				/* ============================================
				   Close button styling - LIGHT THEME
				   ============================================ */
				.suiet-wallet-kit-dialog-close,
				.suiet-close-button {
					color: #6b7280 !important;
					background: #f3f4f6 !important;
					border: 1px solid #e5e7eb !important;
					border-radius: 9999px !important;
					padding: 0.5rem !important;
					transition: all 0.2s !important;
					top: 1rem !important;
					right: 1rem !important;
					width: 36px !important;
					height: 36px !important;
					display: flex !important;
					align-items: center !important;
					justify-content: center !important;
				}

				.suiet-wallet-kit-dialog-close:hover,
				.suiet-close-button:hover {
					color: #111827 !important;
					background: #e5e7eb !important;
					border-color: #d1d5db !important;
				}

				/* ============================================
				   Disconnect button styling - LIGHT THEME
				   ============================================ */
				.suiet-disconnect-button {
					background: linear-gradient(180deg, #fee2e2 0%, #fecaca 100%) !important;
					color: #991b1b !important;
					border: 1px solid rgba(220, 38, 38, 0.2) !important;
					border-radius: 0.75rem !important;
					padding: 0.875rem 1rem !important;
					font-family: var(--font-montserrat), ui-sans-serif !important;
					font-weight: 800 !important;
					font-size: 0.8rem !important;
					text-transform: uppercase !important;
					letter-spacing: 0.1em !important;
					transition: all 0.3s !important;
					margin: 1rem !important;
				}

				.suiet-disconnect-button:hover {
					background: linear-gradient(180deg, #fecaca 0%, #fca5a5 100%) !important;
					border-color: rgba(220, 38, 38, 0.4) !important;
					box-shadow: 0 4px 12px rgba(220, 38, 38, 0.2) !important;
					transform: translateY(-2px) !important;
				}

				/* ============================================
				   Account info section styling - LIGHT THEME
				   ============================================ */
				.suiet-wallet-kit-account {
					background: linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%) !important;
					border: 1px solid #e5e7eb !important;
					border-radius: 1rem !important;
					padding: 1.5rem !important;
					margin: 1rem !important;
				}

				.suiet-wallet-kit-account-header {
					color: #6b7280 !important;
					font-family: var(--font-montserrat), ui-sans-serif !important;
					font-size: 0.65rem !important;
					font-weight: 800 !important;
					text-transform: uppercase !important;
					letter-spacing: 0.15em !important;
					margin-bottom: 0.75rem !important;
				}

				.suiet-wallet-kit-account-address {
					color: #2563eb !important;
					font-weight: 700 !important;
					font-family: var(--font-mono), ui-monospace !important;
					font-size: 0.9rem !important;
					background: rgba(37, 99, 235, 0.1) !important;
					padding: 0.5rem 0.75rem !important;
					border-radius: 0.5rem !important;
					display: inline-block !important;
					letter-spacing: 0.05em !important;
				}

				.suiet-wallet-kit-account-balance {
					color: #059669 !important;
					font-family: var(--font-mono), ui-monospace !important;
					font-size: 1.25rem !important;
					font-weight: 700 !important;
					margin-top: 0.75rem !important;
				}

				/* ============================================
				   Loading state styling - LIGHT THEME
				   ============================================ */
				.suiet-loading {
					color: #3b82f6 !important;
					font-family: var(--font-montserrat), ui-sans-serif !important;
					font-weight: 700 !important;
					font-size: 0.875rem !important;
				}

				.suiet-loading-spinner {
					width: 24px !important;
					height: 24px !important;
					border: 3px solid #e5e7eb !important;
					border-top-color: #3b82f6 !important;
					border-radius: 50% !important;
				}

				/* ============================================
				   Wallet list scrollbar styling - LIGHT THEME
				   ============================================ */
				.suiet-wallet-kit-options-list,
				.suiet-wallet-options-list {
					max-height: 400px !important;
					overflow-y: auto !important;
					padding-bottom: 1rem !important;
				}

				.suiet-wallet-kit-options-list::-webkit-scrollbar,
				.suiet-wallet-options-list::-webkit-scrollbar {
					width: 6px !important;
				}

				.suiet-wallet-kit-options-list::-webkit-scrollbar-track,
				.suiet-wallet-options-list::-webkit-scrollbar-track {
					background: #f3f4f6 !important;
					border-radius: 3px !important;
				}

				.suiet-wallet-kit-options-list::-webkit-scrollbar-thumb,
				.suiet-wallet-options-list::-webkit-scrollbar-thumb {
					background: #d1d5db !important;
					border-radius: 3px !important;
				}

				.suiet-wallet-kit-options-list::-webkit-scrollbar-thumb:hover,
				.suiet-wallet-options-list::-webkit-scrollbar-thumb:hover {
					background: #9ca3af !important;
				}

				/* ============================================
				   Footer/Security badge styling - LIGHT THEME
				   ============================================ */
				.suiet-wallet-kit-footer,
				.suiet-wallet-footer {
					padding: 1rem !important;
					border-top: 1px solid #e5e7eb !important;
					text-align: center !important;
				}

				.suiet-wallet-kit-footer-text,
				.suiet-wallet-footer-text {
					color: #9ca3af !important;
					font-family: var(--font-montserrat), ui-sans-serif !important;
					font-size: 0.7rem !important;
					font-weight: 600 !important;
					text-transform: uppercase !important;
					letter-spacing: 0.1em !important;
				}

				/* ============================================
				   Learn more link styling - LIGHT THEME
				   ============================================ */
				.suiet-wallet-kit-learn-more,
				.suiet-wallet-learn-more {
					color: #3b82f6 !important;
					font-weight: 700 !important;
					text-decoration: none !important;
					transition: all 0.2s !important;
				}

				.suiet-wallet-kit-learn-more:hover,
				.suiet-wallet-learn-more:hover {
					color: #2563eb !important;
					text-decoration: underline !important;
				}

				/* ============================================
				   Animation for modal appearance
				   ============================================ */
				.suiet-wallet-kit-modal-enter,
				.suiet-wallet-kit-modal-appear {
					opacity: 0 !important;
					transform: scale(0.95) translateY(10px) !important;
				}

				.suiet-wallet-kit-modal-enter-active,
				.suiet-wallet-kit-modal-appear-active {
					opacity: 1 !important;
					transform: scale(1) translateY(0) !important;
					transition: opacity 0.3s ease-out, transform 0.3s ease-out !important;
				}

				.suiet-wallet-kit-modal-exit {
					opacity: 1 !important;
				}

				.suiet-wallet-kit-modal-exit-active {
					opacity: 0 !important;
					transform: scale(0.95) translateY(10px) !important;
					transition: opacity 0.2s ease-in, transform 0.2s ease-in !important;
				}
			`}</style>
			<div className="flex items-center justify-center">
				<ConnectButton />
			</div>
		</motion.div>
	);
}
