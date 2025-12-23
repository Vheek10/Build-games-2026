/** @format */
"use client";

import { useState } from "react";
import { Settings, Wallet, Shield } from "lucide-react";
import AuthGuard from "@/components/AuthGuard";
import Link from "next/link";

const SettingsPage = () => {
	return (
		<AuthGuard>
			<div className="min-h-screen bg-gray-50 dark:bg-gray-950">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
					{/* Header */}
					<header className="space-y-2">
						<div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1">
							<Settings className="w-4 h-4 text-blue-500" />
							<span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
								Settings
							</span>
						</div>
						<div>
							<h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50">
								Account Settings
							</h1>
							<p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
								Manage your wallet connection and privacy preferences.
							</p>
						</div>
					</header>

					<div className="space-y-6">
						{/* Wallet */}
						<section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 space-y-3">
							<div className="flex items-center gap-2">
								<Wallet className="w-4 h-4 text-emerald-500" />
								<h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
									Wallet Connection
								</h2>
							</div>
							<p className="text-xs text-gray-600 dark:text-gray-400">
								Connect or disconnect your wallet using the button in the
								navbar. StrataDeed does not custody your assets or private keys.
							</p>
						</section>

						{/* Privacy & Identity */}
						<section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 space-y-3">
							<div className="flex items-center gap-2">
								<Shield className="w-4 h-4 text-purple-500" />
								<h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
									Privacy & Identity
								</h2>
							</div>
							<p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
								Your identity is tied to your connected wallet. Manage your
								zero-knowledge credentials and encrypted documents in the Vault.
							</p>
							<Link
								href="/vault"
								className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
							>
								<Shield className="w-4 h-4" />
								Open Identity Vault
							</Link>
						</section>

						{/* Network */}
						<section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 space-y-3">
							<div className="flex items-center gap-2">
								<div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400" />
								<h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
									Network
								</h2>
							</div>
							<p className="text-xs text-gray-600 dark:text-gray-400">
								StrataDeed operates on Mantle Sepolia Testnet (Chain ID: 5003).
								Ensure your wallet is connected to the correct network.
							</p>
						</section>

						{/* Privacy Notice */}
						<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
							<p className="text-xs text-blue-700 dark:text-blue-300">
								<strong>Privacy First:</strong> StrataDeed uses zero-knowledge
								proofs to protect your identity. Your personal data never leaves
								your device.
							</p>
						</div>
					</div>
				</div>
			</div>
		</AuthGuard>
	);
};

export default SettingsPage;
