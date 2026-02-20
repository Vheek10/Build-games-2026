/** @format */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

import { Loader2 } from "lucide-react";
import ConnectWalletButton from "@/components/ConnectWalletButton";

interface AuthGuardProps {
	children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
	const { isConnected } = useAccount();
	const router = useRouter();

	// If simple checks fail (not connected and not reconnecting), redirect
	// If simple checks fail (not connected and not reconnecting), show connect prompt
	if (!isConnected) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
				<div className="max-w-md w-full text-center space-y-6">
					<div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="text-blue-600">
							<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
							<path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
							<path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
						</svg>
					</div>

					<h2 className="text-2xl font-bold text-gray-900">
						Connect Wallet to Access
					</h2>

					<p className="text-gray-600">
						This page requires a connected wallet. Please connect your wallet to
						verify your identity and continue.
					</p>

					<div className="flex justify-center pt-4">
						<ConnectWalletButton />
					</div>
				</div>
			</div>
		);
	}

	// If authenticated, render the protected content
	return <>{children}</>;
}
