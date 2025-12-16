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
							{/* Semi-transparent badge - Mobile responsive */}
							<div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 lg:px-5 lg:py-2.5 bg-gray-800/40 backdrop-blur-md rounded-full mb-6 sm:mb-8 lg:mb-10 border border-gray-700/30">
								<Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 animate-pulse" />
								<span className="text-[10px] xs:text-xs sm:text-sm font-semibold text-gray-200 tracking-wide whitespace-nowrap">
									INNOVATING REAL ESTATE
								</span>
								<Shield className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
							</div>

							{/* Main Heading with responsive text sizes */}
							<div className="relative mb-6 sm:mb-8 lg:mb-10">
								<div className="relative inline-block">
										<h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-4 sm:mb-6">
										<span className="block">Tokenizing Global</span>
										<span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent mt-1 sm:mt-2">
											Real Estate Assets
										</span>
									</h1>
									{/* Subtle text shadow for better readability */}
									<div className="absolute inset-0 -z-10 blur-sm opacity-30">
										<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-[1.1] mb-4 sm:mb-6">
											<span className="block">Tokenizing Global</span>
											<span className="block">Real Estate Assets</span>
										</h1>
									</div>
								</div>

								{/* Subtitle with responsive text */}
								<div className="mt-6 sm:mt-8 max-w-3xl mx-auto px-2">
									<div className="relative">
										<p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed relative z-10">
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
								<div className="absolute -bottom-2 sm:-bottom-3 lg:-bottom-4 left-1/2 transform -translate-x-1/2 w-24 sm:w-28 lg:w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
							</div>

							{/* Value Proposition - Stack on mobile */}
							<div className="max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-12 px-2">
								<div className="flex flex-col sm:flex-row justify-center items-center sm:items-start gap-4 sm:gap-6">
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
											className="flex items-center gap-3 group w-full sm:w-auto justify-center sm:justify-start">
											<div
												className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-${item.color}-900/30 flex items-center justify-center border border-${item.color}-800/20 group-hover:border-${item.color}-700/40 transition-all duration-300 backdrop-blur-sm`}>
												<item.icon
													className={`w-4 h-4 sm:w-5 sm:h-5 text-${item.color}-400 group-hover:scale-110 transition-transform`}
												/>
											</div>
											<span className="text-gray-200 text-sm sm:text-base font-medium group-hover:text-white transition-colors whitespace-nowrap">
												{item.label}
											</span>
										</div>
									))}
								</div>
							</div>

	
							{/* CTA Buttons - Stack on mobile */}
							<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-12 sm:mb-14 lg:mb-16 px-4 w-full max-w-md sm:max-w-none mx-auto">
								{/* Primary Button */}
								<Link
									href="/dashboard"
									className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/40 w-full sm:w-auto text-center shadow-lg min-h-[48px]">
									{/* Shine effect */}
									<div className="absolute inset-0 translate-x-[-100%] skew-x-[-45deg] group-hover:translate-x-[100%] group-hover:skew-x-[-45deg] transition-all duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

									{/* Content */}
									<div className="relative flex items-center justify-center gap-2">
										<span className="text-sm sm:text-base font-medium">
											Start Investing
										</span>
										<ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
									</div>

									{/* Border gradient */}
									<div className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-r from-blue-500 to-cyan-400 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								</Link>

								{/* Secondary Button */}
								<Link
									href="/mint"
									className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-gray-800/40 backdrop-blur-sm border border-gray-700/30 text-gray-200 font-semibold rounded-xl overflow-hidden transition-all duration-500 hover:bg-gray-800/60 hover:border-gray-600/50 hover:text-white w-full sm:w-auto text-center shadow-md min-h-[48px]">
									{/* Background glow on hover */}
									<div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-cyan-500/0 group-hover:from-blue-600/15 group-hover:to-cyan-600/15 transition-all duration-500" />

									{/* Content */}
									<div className="relative flex items-center justify-center gap-2">
										<Building className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
										<span className="text-sm sm:text-base font-medium">
											List Property
										</span>
									</div>

									{/* Border animation */}
									<div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-blue-500/40 transition-all duration-300" />
								</Link>
							</div>

							{/* Trust indicators - Responsive grid */}
							<div className="max-w-2xl mx-auto px-4">
								<div className="grid grid-cols-3 gap-2 xs:gap-3 sm:gap-4 md:gap-6">
									{[
										{ value: "100%", label: "Compliance" },
										{ value: "24/7", label: "Trading" },
										{ value: "YES", label: "Verified" },
									].map((item, index) => (
										<div
											key={index}
											className="text-center group">
											<div className="relative inline-block">
												<div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300 relative z-10">
													{item.value}
												</div>
												{/* Text shadow for better visibility */}
												<div className="absolute inset-0 text-2xl sm:text-3xl font-bold text-black/30 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300 -z-10 blur-[2px]">
													{item.value}
												</div>
											</div>
											<div className="text-xs sm:text-sm text-gray-300 uppercase tracking-wider font-medium">
												{item.label}
											</div>
											<div className="h-1 w-6 mx-auto mt-1 sm:mt-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full group-hover:w-8 sm:group-hover:w-10 transition-all duration-300" />
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Scroll indicator */}
			<div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
				<div className="flex flex-col items-center">
					<div className="animate-bounce">
						<div className="w-6 h-10 sm:w-7 sm:h-12 border border-gray-600/50 rounded-full flex justify-center backdrop-blur-sm bg-gray-900/40 shadow-lg">
							<div className="w-1.5 h-3 sm:h-4 bg-gradient-to-b from-blue-400 to-cyan-300 rounded-full mt-3 sm:mt-4 animate-pulse" />
						</div>
					</div>
					<span className="text-xs text-gray-400 mt-2 sm:mt-3 tracking-wider font-medium">
						EXPLORE
					</span>
				</div>
			</div>

			{/* Subtle decorative elements - Hide on mobile */}
			<div className="absolute top-1/4 left-4 sm:left-8 w-0.5 h-20 sm:h-32 lg:h-40 bg-gradient-to-b from-blue-500/20 via-cyan-400/10 to-transparent hidden md:block" />
			<div className="absolute bottom-1/3 right-4 sm:right-8 w-0.5 h-16 sm:h-24 lg:h-32 bg-gradient-to-b from-blue-500/20 via-cyan-400/10 to-transparent hidden md:block" />

			{/* Corner accents for depth - Hide on mobile */}
			<div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500/5 to-transparent hidden lg:block" />
			<div className="absolute bottom-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tl from-cyan-500/5 to-transparent hidden lg:block" />
		</section>
	);
}
