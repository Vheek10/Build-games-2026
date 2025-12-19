/** @format */
"use client";

import {
	ArrowRight,
	Shield,
	CheckCircle,
	Zap,
	Globe,
	Building2,
	Check,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function FinalCTASection() {
	const benefits = [
		{ icon: Shield, text: "Bank-grade security" },
		{ icon: CheckCircle, text: "Verified ownership" },
		{ icon: Zap, text: "Instant transactions" },
		{ icon: Globe, text: "Global accessibility" },
	];

	return (
		<section className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
			{/* Background Image with Overlay */}
			<div className="absolute inset-0">
				{/* Background Image */}
				<div className="absolute inset-0">
					<Image
						src="/images/unsplash-c627a92ad1ab.jpg"
						alt="Modern city skyline with skyscrapers"
						fill
						className="object-cover"
						priority
						sizes="100vw"
					/>
				</div>

				{/* Dark Overlay */}
				<div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/80 to-cyan-900/80" />

				{/* Subtle Pattern Overlay */}
				<div className="absolute inset-0 opacity-10">
					<div
						className="absolute inset-0"
						style={{
							backgroundImage: `linear-gradient(45deg, transparent 49%, white 49%, white 51%, transparent 51%)`,
							backgroundSize: "40px 40px",
						}}
					/>
				</div>

				{/* Animated Light Effects */}
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
				<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000" />

				{/* Building Silhouette Effect */}
				<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
			</div>

			<div className="relative max-w-6xl mx-auto">
				{/* Main Content */}
				<div className="text-center mb-12">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}>
						<div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-8 border border-white/30">
							<div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
							<span className="text-sm font-medium text-white">
								FUTURE OF REAL ESTATE
							</span>
							<Building2 className="w-4 h-4 text-emerald-300" />
						</div>
					</motion.div>

					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight drop-shadow-lg">
						Modern{" "}
						<span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
							Property Infrastructure
						</span>
						<br />
						Built on Blockchain
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="text-xl lg:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed backdrop-blur-sm bg-white/5 px-6 py-4 rounded-2xl border border-white/10">
						No hidden processes. No manual errors. No silent title issues. Just
						secure, transparent, and accessible real estate ownership.
					</motion.p>
				</div>

				{/* Benefits */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
					className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
					{benefits.map((benefit, index) => {
						const Icon = benefit.icon;
						return (
							<div
								key={index}
								className="group relative p-6 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
								<div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

								<div className="relative z-10">
									<div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4 mx-auto border border-white/10">
										<Icon className="w-7 h-7 text-white" />
									</div>
									<span className="text-base font-semibold text-white text-center block">
										{benefit.text}
									</span>
								</div>

								<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
							</div>
						);
					})}
				</motion.div>

				{/* CTA Buttons */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
					<Link
						href="/dashboard"
						className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-300 overflow-hidden">
						<span className="relative z-10">Start Investing</span>
						<ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
					</Link>

					<Link
						href="/marketplace"
						className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 hover:scale-105 transition-all duration-300 overflow-hidden">
						<span>Browse Properties</span>
						<div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
					</Link>
				</motion.div>

				{/* Trust Indicators */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.5 }}
					className="text-center mb-8">
					<div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 text-white/90 text-xs sm:text-sm bg-white/10 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-white/20 max-w-full">
						<div className="flex items-center gap-2 sm:gap-3">
							<div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
								<Check className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-300" />
							</div>
							<span className="font-medium whitespace-nowrap">
								No minimum investment
							</span>
						</div>
						<div className="hidden sm:block w-px h-4 bg-white/30" />
						<div className="flex items-center gap-2 sm:gap-3">
							<div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
								<Check className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-300" />
							</div>
							<span className="font-medium whitespace-nowrap">
								24/7 global access
							</span>
						</div>
						<div className="hidden sm:block w-px h-4 bg-white/30" />
						<div className="flex items-center gap-2 sm:gap-3">
							<div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
								<Check className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-300" />
							</div>
							<span className="font-medium whitespace-nowrap">
								Fully regulated platform
							</span>
						</div>
					</div>
				</motion.div>

				{/* Stats Counter */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.6 }}
					className="mt-12 pt-8 border-t border-white/20">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
						{[
							{ value: "25K+", label: "Properties Tokenized", icon: Building2 },
							{ value: "45+", label: "Countries Supported", icon: Globe },
							{ value: "$2.5B+", label: "Transaction Volume", icon: Zap },
							{ value: "99.9%", label: "Platform Uptime", icon: CheckCircle },
						].map((stat, index) => {
							const Icon = stat.icon;
							return (
								<div
									key={index}
									className="group text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300">
									<Icon className="w-8 h-8 text-cyan-300 mx-auto mb-3 group-hover:scale-110 transition-transform" />
									<div className="text-2xl lg:text-3xl font-bold text-white mb-1">
										{stat.value}
									</div>
									<div className="text-sm text-blue-200 font-medium">
										{stat.label}
									</div>
								</div>
							);
						})}
					</div>
				</motion.div>

				{/* Bottom Note */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.7 }}
					className="mt-8 text-center">
					<p className="text-sm text-blue-200">
						Join thousands of investors transforming their real estate
						portfolios
					</p>
				</motion.div>
			</div>
		</section>
	);
}
