/** @format */
"use client";

import { useState } from "react";
import {
	Shield,
	Key,
	Lock,
	Eye,
	EyeOff,
	Copy,
	Check,
	Fingerprint,
	Database,
	FileKey,
	AlertCircle,
	Info,
	Sparkles,
} from "lucide-react";
import AuthGuard from "@/components/AuthGuard";
import { useAccount } from "wagmi";

export default function VaultPage() {
	const { address, isConnected } = useAccount();
	const [showPrivateKey, setShowPrivateKey] = useState(false);
	const [copied, setCopied] = useState(false);

	const handleCopy = (text: string) => {
		navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	// Mock credentials - in production, these would be encrypted and stored securely
	const mockCredentials = [
		{
			id: 1,
			type: "ZK-KYC Credential",
			issuer: "StrataDeed Compliance",
			issuedDate: "2025-12-20",
			status: "Active",
			hash: "0x7f8a...3b2c",
		},
		{
			id: 2,
			type: "Accredited Investor",
			issuer: "Regulatory Authority",
			issuedDate: "2025-11-15",
			status: "Active",
			hash: "0x9a1c...5d4e",
		},
	];

	return (
		<AuthGuard>
			<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
				<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
					{/* Header */}
					<header className="space-y-4">
						<div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/5 px-4 py-2">
							<Shield className="w-5 h-5 text-purple-500" />
							<span className="text-sm font-semibold uppercase tracking-[0.18em] text-purple-500">
								Identity Hub
							</span>
						</div>
						<div>
							<h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-2">
								Your Private Vault
							</h1>
							<p className="text-base text-gray-600 dark:text-gray-400">
								Secure key management and zero-knowledge credential storage.
								Your identity, your control.
							</p>
						</div>

						{/* ZK Privacy Badge */}
						<div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
							<Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
							<span className="text-sm font-medium text-purple-900 dark:text-purple-300">
								Protected by Zero-Knowledge Proofs
							</span>
						</div>
					</header>

					{/* Wallet Connection Status */}
					<section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
						<div className="flex items-center gap-3">
							<Key className="w-5 h-5 text-blue-500" />
							<h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
								Connected Wallet
							</h2>
						</div>

						{isConnected && address ? (
							<div className="space-y-3">
								<div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
									<div className="flex items-center gap-3 flex-1 min-w-0">
										<div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
											<Fingerprint className="w-5 h-5 text-white" />
										</div>
										<div className="min-w-0">
											<div className="text-sm font-medium text-gray-900 dark:text-white">
												Primary Wallet
											</div>
											<div className="text-xs text-gray-500 dark:text-gray-400 font-mono truncate">
												{address}
											</div>
										</div>
									</div>
									<button
										onClick={() => handleCopy(address)}
										className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
										aria-label="Copy address"
									>
										{copied ? (
											<Check className="w-4 h-4 text-green-500" />
										) : (
											<Copy className="w-4 h-4 text-gray-500" />
										)}
									</button>
								</div>

								<div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
									<Info className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
									<p className="text-xs text-blue-700 dark:text-blue-300">
										Your wallet is your identity. StrataDeed never stores your
										private keys.
									</p>
								</div>
							</div>
						) : (
							<div className="p-6 text-center bg-gray-50 dark:bg-gray-800 rounded-xl">
								<Lock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Connect your wallet to access your vault
								</p>
							</div>
						)}
					</section>

					{/* ZK Credentials */}
					<section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
						<div className="flex items-center gap-3">
							<FileKey className="w-5 h-5 text-purple-500" />
							<h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
								Zero-Knowledge Credentials
							</h2>
						</div>

						<p className="text-sm text-gray-600 dark:text-gray-400">
							Your compliance credentials are stored as cryptographic commitments.
							Prove eligibility without revealing personal data.
						</p>

						<div className="space-y-3">
							{mockCredentials.map((credential) => (
								<div
									key={credential.id}
									className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10 rounded-xl border border-purple-100 dark:border-purple-800/30"
								>
									<div className="flex items-start justify-between mb-2">
										<div className="flex-1">
											<div className="font-semibold text-gray-900 dark:text-white mb-1">
												{credential.type}
											</div>
											<div className="text-xs text-gray-500 dark:text-gray-400">
												Issued by {credential.issuer}
											</div>
										</div>
										<span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded-full">
											{credential.status}
										</span>
									</div>

									<div className="flex items-center justify-between text-xs">
										<span className="text-gray-500 dark:text-gray-400">
											Issued: {credential.issuedDate}
										</span>
										<span className="font-mono text-gray-600 dark:text-gray-400">
											{credential.hash}
										</span>
									</div>
								</div>
							))}
						</div>

						<div className="flex items-start gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
							<Shield className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
							<p className="text-xs text-purple-700 dark:text-purple-300">
								<strong>Privacy First:</strong> Only cryptographic hashes are
								stored on-chain. Your actual identity data never leaves your
								device.
							</p>
						</div>
					</section>

					{/* Private Data Storage */}
					<section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
						<div className="flex items-center gap-3">
							<Database className="w-5 h-5 text-cyan-500" />
							<h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
								Encrypted Document Vault
							</h2>
						</div>

						<p className="text-sm text-gray-600 dark:text-gray-400">
							Store sensitive property documents with client-side encryption.
							Only you can decrypt and access your files.
						</p>

						<div className="p-8 text-center bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
							<Lock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
							<p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
								Document Vault Coming Soon
							</p>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								End-to-end encrypted storage for property deeds and compliance
								documents
							</p>
						</div>
					</section>

					{/* Security Notice */}
					<div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
						<AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
						<div className="flex-1">
							<p className="text-sm font-medium text-amber-900 dark:text-amber-300 mb-1">
								Security Best Practices
							</p>
							<ul className="text-xs text-amber-700 dark:text-amber-400 space-y-1">
								<li>• Never share your private keys or seed phrase</li>
								<li>• Use a hardware wallet for maximum security</li>
								<li>
									• Verify all transaction details before signing
								</li>
								<li>
									• Keep your credentials backed up in a secure location
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</AuthGuard>
	);
}
