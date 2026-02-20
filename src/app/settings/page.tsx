/** @format */
"use client";

import { useState } from "react";
import { Settings, Wallet, Shield } from "lucide-react";
import Link from "next/link";

const SettingsPage = () => {
	return (
		<div className="min-h-screen bg-gray-50 font-montserrat">
			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
				{/* Header */}
				<header className="space-y-2">
					<div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1">
						<Settings className="w-4 h-4 text-blue-500" />
						<span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 font-montserrat">
							Settings
						</span>
					</div>
					<div>
						<h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight font-mclaren">
							Account Settings
						</h1>
						<p className="mt-1 text-sm text-gray-600 font-montserrat">
							Manage your wallet connection and privacy preferences.
						</p>
					</div>
				</header>

				<div className="space-y-6">
					{/* Wallet */}
					<section className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
						<div className="flex items-center gap-2">
							<Wallet className="w-4 h-4 text-emerald-500" />
							<h2 className="text-sm font-black text-gray-900 font-montserrat">
								Wallet Connection
							</h2>
						</div>
						<p className="text-xs text-gray-600">
							Connect or disconnect your wallet using the button in the navbar.
							StrataDeed does not custody your assets or private keys.
						</p>
					</section>

					{/* Privacy & Identity */}
					<section className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
						<div className="flex items-center gap-2">
							<Shield className="w-4 h-4 text-purple-500" />
							<h2 className="text-sm font-black text-gray-900 font-montserrat">
								Privacy & Identity
							</h2>
						</div>
						<p className="text-xs text-gray-600 mb-3 font-montserrat">
							Your identity is tied to your connected wallet. Manage your
							zero-knowledge credentials and encrypted documents in the Vault.
						</p>
						<Link
							href="/vault"
							className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-900 hover:bg-purple-600 text-white rounded-full transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(147,51,234,0.4)] hover:scale-105 hover:-translate-y-1">
							<Shield className="w-4 h-4" />
							<span className="text-[10px] font-black uppercase tracking-[0.4em] font-montserrat">
								Open Identity Vault
							</span>
						</Link>
					</section>

					{/* Network */}
					<section className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
						<div className="flex items-center gap-2">
							<div className="w-4 h-4 rounded-full bg-linear-to-br from-blue-500 to-cyan-400" />
							<h2 className="text-sm font-black text-gray-900 font-montserrat">
								Network
							</h2>
						</div>
						<p className="text-xs text-gray-600">
							StrataDeed operates on Avalanche Fuji Testnet. Ensure your wallet
							is connected to the correct network.
						</p>
					</section>

					{/* Privacy Notice */}
					<div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
						<p className="text-xs text-blue-700 font-montserrat">
							<strong>Privacy First:</strong> StrataDeed uses zero-knowledge
							proofs to protect your identity. Your personal data never leaves
							your device.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SettingsPage;
