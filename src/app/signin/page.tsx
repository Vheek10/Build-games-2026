/** @format */
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
	ArrowLeft,
	Shield,
	CheckCircle,
	Building2,
	Home,
	User,
	Wallet,
	ExternalLink,
	ChevronDown,
	AlertCircle,
	LogOut,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";


export default function SignInPage() {
	const router = useRouter();
	const { isConnected } = useAccount();

	// Redirect to dashboard when wallet connects
	useEffect(() => {
		if (isConnected) {
			const timer = setTimeout(() => {
				router.push("/dashboard");
			}, 1500); // 1.5 second delay to show connected state
			return () => clearTimeout(timer);
		}
	}, [isConnected, router]);



	return (
		<div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
			<div className="w-full max-w-6xl flex flex-col lg:flex-row gap-0 lg:gap-0 min-h-[90vh]">
				{/* Left Column - Sign In Form */}
				<div className="lg:w-2/5">
					<div className="h-full flex flex-col justify-center p-4 lg:p-8">
						{/* Back Button - Mobile */}
						<div className="lg:hidden mb-6">
							<Link
								href="/"
								className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
								<ArrowLeft className="w-4 h-4" />
								Back to home
							</Link>
						</div>

						{/* Card */}
						<div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl p-6">
							{/* Header */}
							<div className="text-center mb-6">
								<div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-600/10 to-cyan-500/10 rounded-xl flex items-center justify-center">
									<LogIn className="w-6 h-6 text-blue-600 dark:text-blue-400" />
								</div>
								<h1 className="text-xl font-bold text-gray-900 dark:text-white">
									Welcome Back
								</h1>
								<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
									Sign in to continue your investment journey
								</p>
							</div>

							{/* Connect Wallet Button - Styled with redirect */}
							<div className="mb-4">
								<ConnectButton.Custom>
									{({
										account,
										chain,
										openAccountModal,
										openChainModal,
										openConnectModal,
										authenticationStatus,
										mounted,
									}) => {
										const ready = mounted && authenticationStatus !== "loading";
										const connected =
											ready &&
											account &&
											chain &&
											(!authenticationStatus ||
												authenticationStatus === "authenticated");

										if (!ready) {
											return (
												<div className="w-full h-11 bg-gray-800/50 rounded-lg animate-pulse border border-gray-700/50" />
											);
										}

										if (!connected) {
											return (
												<button
													onClick={openConnectModal}
													type="button"
													className="group relative w-full px-4 py-3 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 overflow-hidden">
													{/* Shine effect */}
													<div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

													<div className="relative flex items-center justify-center gap-2">
														<Wallet className="w-5 h-5 group-hover:scale-110 transition-transform" />
														<span className="text-sm font-bold tracking-wide">
															Connect Wallet
														</span>
														<ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
													</div>
												</button>
											);
										}

										if (chain.unsupported) {
											return (
												<div className="flex items-center gap-3">
													<div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-red-900/30 to-red-800/30 border border-red-800/50 text-red-400 rounded-lg backdrop-blur-sm">
														<AlertCircle className="w-4 h-4" />
														<span className="text-sm font-medium">
															Wrong Network
														</span>
													</div>
													<button
														onClick={openChainModal}
														type="button"
														className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
														Switch Network
													</button>
												</div>
											);
										}

										// Show connected state with redirect indicator
										return (
											<div className="space-y-2">
												{/* Connected Badge with redirect animation */}
												<div className="group relative px-4 py-3 bg-gradient-to-r from-emerald-900/30 via-green-900/30 to-emerald-900/30 border border-emerald-800/50 rounded-lg backdrop-blur-sm">
													<div className="flex items-center justify-between">
														<div className="flex items-center gap-2">
															<CheckCircle className="w-5 h-5 text-emerald-400" />
															<div>
																<div className="text-sm font-medium text-emerald-400">
																	{account.displayName}
																</div>
																<div className="text-xs text-emerald-500/80">
																	{chain.name}
																</div>
															</div>
														</div>
														<button
															onClick={openAccountModal}
															className="p-1.5 hover:bg-emerald-800/20 rounded transition-colors"
															title="Account Settings">
															<ChevronDown className="w-4 h-4 text-emerald-400" />
														</button>
													</div>

													{/* Redirecting progress indicator */}
													<div className="mt-2">
														<div className="flex items-center justify-between text-xs text-emerald-400/80 mb-1">
															<span>Redirecting to Dashboard...</span>
															<span className="animate-pulse">...</span>
														</div>
														<div className="w-full h-1 bg-emerald-900/50 rounded-full overflow-hidden">
															<div className="h-full bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-400 animate-[shimmer_1.5s_ease-in-out_infinite]" />
														</div>
													</div>
												</div>

												{/* Quick disconnect button */}
												<button
													onClick={openAccountModal}
													className="w-full px-3 py-2 bg-red-900/10 border border-red-800/20 text-red-400 text-xs font-medium rounded hover:bg-red-800/20 hover:border-red-700/30 transition-colors flex items-center justify-center gap-2">
													<LogOut className="w-3 h-3" />
													Disconnect & Cancel Redirect
												</button>
											</div>
										);
									}}
								</ConnectButton.Custom>
							</div>

							{/* Instructions */}
							<div className="text-center mt-8">
								<p className="text-sm text-gray-500 dark:text-gray-400">
									Privacy-First: No email or password required. <br/>
									Just connect your secure wallet to access your assets.
								</p>
							</div>

							{/* Footer */}
							<div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
								<div className="flex items-center justify-center gap-2">
									<Shield className="w-3 h-3 text-emerald-500" />
									<p className="text-xs text-center text-gray-500 dark:text-gray-400">
										Zero-Knowledge Privacy Architecture
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Right Column - Background Image */}
				<div className="lg:w-3/5 relative hidden lg:block">
					<div className="absolute inset-0">
						<Image
							src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
							alt="Luxury modern home interior with natural light"
							fill
							className="object-cover"
							priority
							sizes="60vw"
						/>
						<div className="absolute inset-0 bg-gradient-to-l from-blue-900/70 via-blue-900/50 to-transparent" />

						{/* Floating Elements */}
						<div className="absolute top-8 left-8">
							<Link
								href="/"
								className="inline-flex items-center gap-2 text-sm text-white hover:text-blue-100 transition-colors duration-200 backdrop-blur-sm bg-white/10 px-4 py-2 rounded-lg">
								<ArrowLeft className="w-4 h-4" />
								Back to home
							</Link>
						</div>

						{/* Content Overlay */}
						<div className="absolute bottom-8 left-8 right-8">
							<div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-md">
								<div className="flex items-center gap-3 mb-4">
									<div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
										<Home className="w-6 h-6 text-blue-200" />
									</div>
									<div>
										<h3 className="text-xl font-bold text-white">StrataDeed</h3>
										<p className="text-blue-100 text-sm">
											Blockchain Real Estate
										</p>
									</div>
								</div>

								<h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
									Welcome Back to the Future of{" "}
									<span className="text-cyan-200">Real Estate</span>
								</h2>

								<div className="space-y-3 mb-6">
									<div className="flex items-center gap-3 text-blue-100">
										<User className="w-5 h-5 text-cyan-400" />
										<span>25K+ Investors Trust Us</span>
									</div>
									<div className="flex items-center gap-3 text-blue-100">
										<Building2 className="w-5 h-5 text-emerald-400" />
										<span>Access Verified Properties</span>
									</div>
									<div className="flex items-center gap-3 text-blue-100">
										<CheckCircle className="w-5 h-5 text-blue-400" />
										<span>Seamless Portfolio Management</span>
									</div>
								</div>

								<div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
									<div className="text-center">
										<div className="text-xl font-bold text-white">45+</div>
										<div className="text-xs text-blue-200">Countries</div>
									</div>
									<div className="text-center">
										<div className="text-xl font-bold text-white">$5B+</div>
										<div className="text-xs text-blue-200">Invested</div>
									</div>
									<div className="text-center">
										<div className="text-xl font-bold text-white">99.9%</div>
										<div className="text-xs text-blue-200">Secure</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
