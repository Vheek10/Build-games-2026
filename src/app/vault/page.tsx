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
		<div className="min-h-screen bg-linear-to-b from-gray-50 to-white font-montserrat">
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
				{/* Header */}
				<header className="space-y-4">
					<div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/5 px-4 py-2">
						<Shield className="w-5 h-5 text-purple-500" />
						<span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-500 font-montserrat">
							Identity Hub
						</span>
					</div>
					<div>
						<h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2 tracking-tight font-mclaren">
							Your Private Vault
						</h1>
						<p className="text-base text-gray-600 font-medium font-montserrat">
							Secure key management and zero-knowledge credential storage. Your
							identity, your control.
						</p>
					</div>

					{/* ZK Privacy Badge */}
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
						<Sparkles className="w-4 h-4 text-purple-600" />
						<span className="text-sm font-black text-purple-900 font-montserrat">
							Protected by Zero-Knowledge Proofs
						</span>
					</div>
				</header>

				{/* Wallet Connection Status */}
				<section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
					<div className="flex items-center gap-3">
						<Key className="w-5 h-5 text-blue-500" />
						<h2 className="text-xl font-black text-gray-900 tracking-tight font-mclaren">
							Connected Wallet
						</h2>
					</div>

					{isConnected && address ? (
						<div className="space-y-3">
							<div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
								<div className="flex items-center gap-3 flex-1 min-w-0">
									<div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-cyan-400 flex items-center justify-center shrink-0">
										<Fingerprint className="w-5 h-5 text-white" />
									</div>
									<div className="min-w-0">
										<div className="text-sm font-medium text-gray-900">
											Primary Wallet
										</div>
										<div className="text-xs text-gray-500 font-mono truncate">
											{address}
										</div>
									</div>
								</div>
								<button
									onClick={() => handleCopy(address)}
									className="p-2 hover:bg-gray-200 rounded-lg transition-colors shrink-0"
									aria-label="Copy address">
									{copied ? (
										<Check className="w-4 h-4 text-green-500" />
									) : (
										<Copy className="w-4 h-4 text-gray-500" />
									)}
								</button>
							</div>

							<div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
								<Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
								<p className="text-xs text-blue-700">
									Your wallet is your identity. StrataDeed never stores your
									private keys.
								</p>
							</div>
						</div>
					) : (
						<div className="p-6 text-center bg-gray-50 rounded-xl">
							<Lock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
							<p className="text-sm text-gray-600">
								Connect your wallet to access your vault
							</p>
						</div>
					)}
				</section>

				{/* ZK Credentials */}
				<section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
					<div className="flex items-center gap-3">
						<FileKey className="w-5 h-5 text-purple-500" />
						<h2 className="text-xl font-black text-gray-900 tracking-tight font-mclaren">
							Zero-Knowledge Credentials
						</h2>
					</div>

					<p className="text-sm text-gray-600">
						Your compliance credentials are stored as cryptographic commitments.
						Prove eligibility without revealing personal data.
					</p>

					<div className="space-y-3">
						{mockCredentials.map((credential) => (
							<div
								key={credential.id}
								className="p-4 bg-linear-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100">
								<div className="flex items-start justify-between mb-2">
									<div className="flex-1">
										<div className="font-semibold text-gray-900 mb-1">
											{credential.type}
										</div>
										<div className="text-xs text-gray-500">
											Issued by {credential.issuer}
										</div>
									</div>
									<span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
										{credential.status}
									</span>
								</div>

								<div className="flex items-center justify-between text-xs">
									<span className="text-gray-500">
										Issued: {credential.issuedDate}
									</span>
									<span className="font-mono text-gray-600">
										{credential.hash}
									</span>
								</div>
							</div>
						))}
					</div>

					<div className="flex items-start gap-2 p-3 bg-purple-50 rounded-lg">
						<Shield className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
						<p className="text-xs text-purple-700">
							<strong>Privacy First:</strong> Only cryptographic hashes are
							stored on-chain. Your actual identity data never leaves your
							device.
						</p>
					</div>
				</section>

				{/* Private Data Storage */}
				<section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
					<div className="flex items-center gap-3">
						<Database className="w-5 h-5 text-cyan-500" />
						<h2 className="text-xl font-black text-gray-900 tracking-tight font-mclaren">
							Encrypted Document Vault
						</h2>
					</div>

					<p className="text-sm text-gray-600">
						Store sensitive property documents with client-side encryption. Only
						you can decrypt and access your files.
					</p>

					<div className="p-8 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
						<Lock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
						<p className="text-sm font-black text-gray-900 mb-1 font-montserrat">
							Document Vault Coming Soon
						</p>
						<p className="text-xs text-gray-500">
							End-to-end encrypted storage for property deeds and compliance
							documents
						</p>
					</div>
				</section>

				{/* Security Notice */}
				<div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
					<AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
					<div className="flex-1">
						<p className="text-sm font-black text-amber-900 mb-1 font-montserrat">
							Security Best Practices
						</p>
						<ul className="text-xs text-amber-700 space-y-1">
							<li>• Never share your private keys or seed phrase</li>
							<li>• Use a hardware wallet for maximum security</li>
							<li>• Verify all transaction details before signing</li>
							<li>• Keep your credentials backed up in a secure location</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
