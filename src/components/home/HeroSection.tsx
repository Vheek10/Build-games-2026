/** @format */
"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Globe, Shield, Building } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
	return (
		<section className="relative min-h-screen flex items-center overflow-hidden bg-gray-900">
			{/* Background Image with improved visibility */}
			<div className="absolute inset-0 z-0">
				{/* Enhanced Image Container */}
				<div className="relative w-full h-full">
					<Image
						src="/hero.avif"
						alt="Modern architectural building with clean lines"
						fill
						priority
						className="object-cover object-center"
						sizes="100vw"
						quality={100}
						style={{
							objectPosition: "center 40%",
							filter: "brightness(0.85) contrast(1.1)",
						}}
					/>
				</div>

				{/* Lighter gradient overlays to show more of the image */}
				<div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-900/60 to-gray-900/50" />
				<div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/50 to-transparent" />
				<div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-blue-900/10 to-cyan-900/10" />

				{/* Subtle vignette - reduced opacity */}
				<div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.5) 100%)" />

				{/* Additional lighting effects */}
				<div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />
				<div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent" />
			</div>

			{/* Subtle pattern overlay - very transparent */}
			<div className="absolute inset-0 opacity-[0.015] z-1">
				<div className="h-full w-full bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.02)_48%,rgba(59,130,246,0.02)_52%,transparent_52%)] bg-[length:100px_100px]" />
			</div>

			<div className="relative z-20 w-full">
				<div className="w-full px-4 sm:px-6 lg:px-8">
					<div className="max-w-6xl mx-auto">
						<div className="text-center">
							{/* Semi-transparent badge for better image visibility */}
							<div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gray-800/40 backdrop-blur-md rounded-full mb-10 border border-gray-700/30">
								<Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
								<span className="text-sm font-semibold text-gray-200 tracking-wide">
									INNOVATING REAL ESTATE GLOBALLY
								</span>
								<Shield className="w-4 h-4 text-cyan-400" />
							</div>

							{/* Main Heading with transparent background */}
							<div className="relative mb-10">
								<div className="relative inline-block">
									<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
										<span className="block">Tokenizing Global</span>
										<span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
											Real Estate Assets
										</span>
									</h1>
									{/* Subtle text shadow for better readability */}
									<div className="absolute inset-0 -z-10 blur-sm opacity-30">
										<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-[1.1] mb-6">
											<span className="block">Tokenizing Global</span>
											<span className="block">Real Estate Assets</span>
										</h1>
									</div>
								</div>

								{/* Subtitle with slight background for readability */}
								<div className="mt-8 max-w-3xl mx-auto">
									<div className="relative">
										<p className="text-lg sm:text-xl lg:text-2xl text-gray-200 leading-relaxed relative z-10">
											Verified digital deeds. Borderless ownership.{" "}
											<span className="font-semibold text-white">
												Unprecedented liquidity.
											</span>
										</p>
										{/* Subtle text background */}
										<div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] rounded-lg -z-10" />
									</div>
								</div>

								{/* Decorative line */}
								<div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
							</div>

							{/* Value Proposition - More transparent */}
							<div className="max-w-3xl mx-auto mb-12">
								<div className="flex flex-wrap justify-center gap-6">
									{[
										{
											icon: Shield,
											label: "Regulatory Compliance",
											color: "blue",
										},
										{
											icon: Globe,
											label: "Global Market Access",
											color: "cyan",
										},
										{
											icon: Building,
											label: "Verified Properties",
											color: "emerald",
										},
									].map((item, index) => (
										<div
											key={index}
											className="flex items-center gap-3 group">
											<div
												className={`w-10 h-10 rounded-full bg-${item.color}-900/30 flex items-center justify-center border border-${item.color}-800/20 group-hover:border-${item.color}-700/40 transition-all duration-300 backdrop-blur-sm`}>
												<item.icon
													className={`w-5 h-5 text-${item.color}-400 group-hover:scale-110 transition-transform`}
												/>
											</div>
											<span className="text-gray-200 text-sm font-medium group-hover:text-white transition-colors">
												{item.label}
											</span>
										</div>
									))}
								</div>
							</div>

							{/* CTA Buttons - Enhanced visibility */}
							<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
								{/* Primary Button */}
								<Link
									href="/signup"
									className="group relative px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/40 min-w-[180px] text-center shadow-lg">
									{/* Shine effect */}
									<div className="absolute inset-0 translate-x-[-100%] skew-x-[-45deg] group-hover:translate-x-[100%] group-hover:skew-x-[-45deg] transition-all duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

									{/* Content */}
									<div className="relative flex items-center justify-center gap-2">
										<span className="text-sm font-medium">Start Investing</span>
										<ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
									</div>

									{/* Border gradient */}
									<div className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-r from-blue-500 to-cyan-400 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								</Link>

								{/* Secondary Button - More transparent */}
								<Link
									href="/list-property"
									className="group relative px-8 py-3.5 bg-gray-800/40 backdrop-blur-sm border border-gray-700/30 text-gray-200 font-semibold rounded-xl overflow-hidden transition-all duration-500 hover:bg-gray-800/60 hover:border-gray-600/50 hover:text-white min-w-[180px] text-center shadow-md">
									{/* Background glow on hover */}
									<div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-cyan-500/0 group-hover:from-blue-600/15 group-hover:to-cyan-600/15 transition-all duration-500" />

									{/* Content */}
									<div className="relative flex items-center justify-center gap-2">
										<Building className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
										<span className="text-sm font-medium">List Property</span>
									</div>

									{/* Border animation */}
									<div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-blue-500/40 transition-all duration-300" />
								</Link>
							</div>

							{/* Trust indicators - Better contrast */}
							<div className="max-w-2xl mx-auto">
								<div className="grid grid-cols-3 gap-6">
									{[
										{ value: "100%", label: "Compliance" },
										{ value: "24/7", label: "Trading" },
										{ value: "✓", label: "Verified" },
									].map((item, index) => (
										<div
											key={index}
											className="text-center group">
											<div className="relative inline-block">
												<div className="text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300 relative z-10">
													{item.value}
												</div>
												{/* Text shadow for better visibility */}
												<div className="absolute inset-0 text-3xl font-bold text-black/30 mb-2 group-hover:scale-110 transition-transform duration-300 -z-10 blur-[2px]">
													{item.value}
												</div>
											</div>
											<div className="text-xs text-gray-300 uppercase tracking-wider font-medium">
												{item.label}
											</div>
											<div className="h-1 w-6 mx-auto mt-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full group-hover:w-10 transition-all duration-300" />
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Scroll indicator - More visible */}
			<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
				<div className="flex flex-col items-center">
					<div className="animate-bounce">
						<div className="w-7 h-12 border border-gray-600/50 rounded-full flex justify-center backdrop-blur-sm bg-gray-900/40 shadow-lg">
							<div className="w-1.5 h-4 bg-gradient-to-b from-blue-400 to-cyan-300 rounded-full mt-4 animate-pulse" />
						</div>
					</div>
					<span className="text-xs text-gray-400 mt-3 tracking-wider font-medium">
						EXPLORE
					</span>
				</div>
			</div>

			{/* Subtle decorative elements - More visible */}
			<div className="absolute top-1/4 left-8 w-0.5 h-40 bg-gradient-to-b from-blue-500/20 via-cyan-400/10 to-transparent hidden lg:block" />
			<div className="absolute bottom-1/3 right-8 w-0.5 h-32 bg-gradient-to-b from-blue-500/20 via-cyan-400/10 to-transparent hidden lg:block" />

			{/* Corner accents for depth */}
			<div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-500/5 to-transparent hidden lg:block" />
			<div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-cyan-500/5 to-transparent hidden lg:block" />
		</section>
	);
}
