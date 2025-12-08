/** @format */
"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Globe, Shield, Building } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
	return (
		<section className="relative min-h-screen flex items-center overflow-hidden">
			{/* Background Image with overlay */}
			<div className="absolute inset-0 z-0">
				{/* Return to the former minimalist architectural image */}
				<Image
					src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
					alt="Modern architectural building with clean lines"
					fill
					priority
					className="object-cover object-center"
					sizes="100vw"
					quality={100}
				/>
				{/* Enhanced gradient overlays for better readability */}
				<div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-900/70 to-gray-900/50" />
				<div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
				<div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-cyan-900/10" />
			</div>

			{/* Subtle grid background */}
			<div className="absolute inset-0 opacity-5 z-5">
				<div className="h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
			</div>

			<div className="relative z-20 w-full">
				<div className="w-full px-4 sm:px-6 lg:px-8">
					<div className="max-w-6xl mx-auto">
						<div className="text-center">
							{/* Professional badge */}
							<div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full mb-10 border border-white/20">
								<Sparkles className="w-4 h-4 text-blue-300 animate-pulse" />
								<span className="text-sm font-semibold text-white tracking-wide">
									INNOVATING REAL ESTATE GLOBALLY
								</span>
								<Shield className="w-4 h-4 text-cyan-300" />
							</div>

							{/* Main Heading - Clean professional layout */}
							<div className="relative mb-10">
								<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
									<span className="block">Tokenizing Global</span>
									<span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
										Real Estate Assets
									</span>
									<span className="block text-lg sm:text-xl lg:text-2xl text-blue-100 font-normal mt-6 max-w-3xl mx-auto leading-relaxed">
										Verified digital deeds. Borderless ownership.{" "}
										<span className="font-semibold text-white">
											Unprecedented liquidity.
										</span>
									</span>
								</h1>

								{/* Decorative line */}
								<div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
							</div>

							{/* Value Proposition */}
							<div className="max-w-3xl mx-auto mb-12">
								<div className="flex flex-wrap justify-center gap-6">
									<div className="flex items-center gap-3">
										<div className="w-9 h-9 rounded-full bg-blue-500/20 flex items-center justify-center">
											<Shield className="w-4 h-4 text-blue-300" />
										</div>
										<span className="text-blue-100 text-sm font-medium">
											Regulatory Compliance
										</span>
									</div>
									<div className="flex items-center gap-3">
										<div className="w-9 h-9 rounded-full bg-cyan-500/20 flex items-center justify-center">
											<Globe className="w-4 h-4 text-cyan-300" />
										</div>
										<span className="text-blue-100 text-sm font-medium">
											Global Market Access
										</span>
									</div>
									<div className="flex items-center gap-3">
										<div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center">
											<Building className="w-4 h-4 text-emerald-300" />
										</div>
										<span className="text-blue-100 text-sm font-medium">
											Verified Properties
										</span>
									</div>
								</div>
							</div>

							{/* Professional CTA Buttons - Reduced size */}
							<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
								{/* Primary Button */}
								<Link
									href="/signup"
									className="group relative px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/30 min-w-[180px] text-center">
									{/* Shine effect */}
									<div className="absolute inset-0 translate-x-[-100%] skew-x-[-45deg] group-hover:translate-x-[100%] group-hover:skew-x-[-45deg] transition-all duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

									{/* Content */}
									<div className="relative flex items-center justify-center gap-2">
										<span className="text-sm">Start Investing</span>
										<ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
									</div>

									{/* Border gradient */}
									<div className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-r from-blue-400 to-cyan-300 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								</Link>

								{/* Secondary Button */}
								<Link
									href="/list-property"
									className="group relative px-8 py-3.5 bg-white/5 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl overflow-hidden transition-all duration-500 hover:bg-white/10 hover:border-white/40 min-w-[180px] text-center">
									{/* Background glow on hover */}
									<div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all duration-500" />

									{/* Content */}
									<div className="relative flex items-center justify-center gap-2">
										<Building className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
										<span className="text-sm">List Property</span>
									</div>

									{/* Border animation */}
									<div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-white/30 transition-all duration-300" />
								</Link>
							</div>

							{/* Trust indicators - Professional layout */}
							<div className="max-w-2xl mx-auto">
								<div className="grid grid-cols-3 gap-6">
									<div className="text-center group">
										<div className="text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
											100%
										</div>
										<div className="text-xs text-blue-200 uppercase tracking-wider font-medium">
											Compliance
										</div>
										<div className="h-1 w-6 mx-auto mt-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full group-hover:w-10 transition-all duration-300" />
									</div>
									<div className="text-center group">
										<div className="text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
											24/7
										</div>
										<div className="text-xs text-blue-200 uppercase tracking-wider font-medium">
											Trading
										</div>
										<div className="h-1 w-6 mx-auto mt-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full group-hover:w-10 transition-all duration-300" />
									</div>
									<div className="text-center group">
										<div className="text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
											✓
										</div>
										<div className="text-xs text-blue-200 uppercase tracking-wider font-medium">
											Verified
										</div>
										<div className="h-1 w-6 mx-auto mt-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full group-hover:w-10 transition-all duration-300" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Minimal scroll indicator */}
			<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
				<div className="flex flex-col items-center">
					<div className="animate-bounce">
						<div className="w-5 h-8 border border-white/20 rounded-full flex justify-center backdrop-blur-sm">
							<div className="w-1 h-2.5 bg-gradient-to-b from-blue-300 to-cyan-200 rounded-full mt-2" />
						</div>
					</div>
					<span className="text-xs text-white/40 mt-2 tracking-wider">
						EXPLORE
					</span>
				</div>
			</div>

			{/* Subtle decorative elements */}
			<div className="absolute top-1/4 left-10 w-0.5 h-32 bg-gradient-to-b from-blue-500/20 via-cyan-400/10 to-transparent hidden lg:block" />
			<div className="absolute bottom-1/3 right-10 w-0.5 h-24 bg-gradient-to-b from-blue-500/20 via-cyan-400/10 to-transparent hidden lg:block" />
		</section>
	);
}
