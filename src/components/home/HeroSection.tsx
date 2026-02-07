/** @format */
"use client";

import Link from "next/link";
import Image from "next/image";
import {
	ArrowRight,
	Sparkles,
	Globe,
	Shield,
	Building,
	Lock,
} from "lucide-react";

export default function HeroSection() {
	return (
		<section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
			{/* Fullscreen video background - Optimized for all screen sizes */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden w-full h-full">
				{/* Video container with aspect ratio - Enhanced for large screens */}
				<div className="absolute inset-0 w-full h-full bg-transparent">
					<video
						autoPlay
						muted
						loop
						playsInline
						className="absolute inset-0 w-full h-full object-cover will-change-transform saturate-105 contrast-110 brightness-110"
						style={{
							filter:
								"brightness(1.15) contrast(1.15) saturate(1.1) drop-shadow(0 0 2px rgba(90, 127, 176, 0.1))",
							objectFit: "cover",
							objectPosition: "center",
						}}
						preload="auto"
						poster="/hero.avif">
						<source
							src="/herovid.mp4"
							type="video/mp4"
						/>
						Your browser does not support the video tag.
					</video>
				</div>

				{/* Atmospheric overlays - Enhanced for better readability with screen-size adjustment */}
				<div className="absolute inset-0 bg-radial-gradient(circle at center, rgba(90,127,176,0.05) 0%, rgba(90,127,176,0.02) 50%, transparent 75%)" />
				<div className="absolute inset-0 bg-linear-to-br from-white/5 via-white/2 to-transparent" />
				<div className="absolute inset-0 bg-linear-to-t from-white/10 via-transparent to-transparent" />

				{/* Refined vignette effect - more subtle for larger screens */}
				<div className="absolute inset-0 bg-radial-gradient(ellipse at center, transparent 0%, rgba(255,255,255,0.2) 100%)" />

				{/* Additional clarity enhancement for larger screens */}
				<div className="hidden xl:block absolute inset-0 bg-radial-gradient(circle at 50% 40%, transparent 0%, rgba(255,255,255,0.05) 100%)" />
			</div>

			{/* Subtle pattern overlay - very transparent */}
			<div className="absolute inset-0 opacity-[0.01] z-1 pointer-events-none">
				<div className="h-full w-full bg-[linear-gradient(45deg,transparent_48%,rgba(90,127,176,0.015)_48%,rgba(90,127,176,0.015)_52%,transparent_52%)] bg-[length:100px_100px]" />
			</div>

			<div className="relative z-20 w-full">
				<div className="w-full px-4 sm:px-6 lg:px-8">
					<div className="max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-10 lg:gap-16 items-center">
						<div className="text-center lg:text-left">
							{/* Semi-transparent badge - Mobile responsive */}
							<div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 lg:px-5 lg:py-2.5 bg-platinum-100/80 backdrop-blur-md rounded-full mb-6 sm:mb-8 lg:mb-10 border border-platinum-200/60">
								<Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 animate-pulse" />
								<span className="text-[10px] xs:text-xs sm:text-sm font-semibold text-gray-900 tracking-wide whitespace-nowrap">
									INNOVATING REAL ESTATE
								</span>
								<Shield className="w-3 h-3 sm:w-4 sm:h-4 text-mist-600" />
							</div>

							{/* Main Heading with responsive text sizes */}
							<div className="relative mb-6 sm:mb-8 lg:mb-10">
								<div className="relative inline-block">
									<h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] mb-4 sm:mb-6">
										<span className="block">Tokenizing Global</span>
										<span className="block bg-gradient-to-r from-blue-600 via-slate-500 to-mist-600 bg-clip-text text-transparent mt-1 sm:mt-2">
											Real Estate Assets
										</span>
									</h1>
									{/* Subtle text shadow for better readability */}
									<div className="absolute inset-0 -z-10 blur-sm opacity-30">
										<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-700 leading-[1.1] mb-4 sm:mb-6">
											<span className="block">Tokenizing Global</span>
											<span className="block">Real Estate Assets</span>
										</h1>
									</div>
								</div>

								{/* Subtitle with responsive text */}
								<div className="mt-6 sm:mt-8 max-w-3xl mx-auto px-2">
									<div className="relative">
										<p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed relative z-10">
											Verified digital deeds. Borderless ownership.{" "}
											<span className="font-semibold text-gray-900">
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
												className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-${item.color}-100/60 flex items-center justify-center border border-${item.color}-200/40 group-hover:border-${item.color}-300 transition-all duration-300 backdrop-blur-sm flex-shrink-0`}>
												<item.icon
													className={`w-4 h-4 sm:w-5 sm:h-5 text-${item.color}-600 group-hover:scale-110 transition-transform`}
												/>
											</div>
											<span className="text-gray-900 text-sm sm:text-base font-medium group-hover:text-blue-700 transition-colors whitespace-nowrap">
												{item.label}
											</span>
										</div>
									))}
								</div>
							</div>

							{/* CTA Buttons - Stack on mobile */}
							<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-stretch sm:items-center mb-12 sm:mb-14 lg:mb-16 px-4 w-full max-w-md sm:max-w-none mx-auto lg:mx-0">
								{/* Primary Button */}
								<Link
									href="/dashboard"
									className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-blue-600 to-mist-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-blue-600/40 w-full sm:w-auto text-center shadow-lg min-h-[48px]">
									{/* Shine effect */}
									<div className="absolute inset-0 translate-x-[-100%] skew-x-[-45deg] group-hover:translate-x-[100%] group-hover:skew-x-[-45deg] transition-all duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

									{/* Content */}
									<div className="relative flex items-center justify-center gap-2">
										<span className="text-sm sm:text-base font-medium">
											Start Investing
										</span>
										<ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
									</div>
								</Link>

								{/* Secondary Button */}
								<Link
									href="/mint"
									className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-platinum-100/60 backdrop-blur-sm border border-platinum-300/50 text-gray-900 font-semibold rounded-xl overflow-hidden transition-all duration-500 hover:bg-platinum-100 hover:border-blue-400/40 hover:text-blue-700 w-full sm:w-auto text-center shadow-md min-h-[48px]">
									{/* Background glow on hover */}
									<div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-mist-500/0 group-hover:from-blue-600/10 group-hover:to-mist-600/10 transition-all duration-500" />

									{/* Content */}
									<div className="relative flex items-center justify-center gap-2">
										<Building className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
										<span className="text-sm sm:text-base font-medium">
											List Property
										</span>
									</div>

									{/* Border animation */}
									<div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-blue-400/40 transition-all duration-300" />
								</Link>
							</div>

							{/* Trust indicators - Responsive grid */}
							<div className="max-w-2xl mx-auto lg:mx-0 px-4">
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

						{/* Right column: floating card */}
						<div className="hidden lg:block">
							<div className="relative">
								<div className="absolute -inset-1 bg-gradient-to-tr from-blue-500/20 via-mist-400/15 to-emerald-400/10 blur-2xl opacity-60" />
								<div className="relative rounded-3xl border border-platinum-300/40 bg-platinum-50/60 backdrop-blur-xl shadow-2xl shadow-blue-600/10 p-6 space-y-5">
									<div className="flex items-center justify-between gap-3">
										<div>
											<p className="text-xs font-semibold text-blue-700 uppercase tracking-[0.2em]">
												LIVE ON SUI
											</p>
											<p className="mt-1 text-sm text-gray-700">
												ZK-powered property tokenization with real-time
												settlement.
											</p>
										</div>
										<div className="flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 border border-emerald-300">
											<div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
											<span className="text-xs font-medium text-emerald-900">
												<Lock className="inline-block w-3 h-3 mr-1 align-[-2px]" />
												ZK Privacy
											</span>
										</div>
									</div>

									<div className="grid grid-cols-3 gap-4 text-center text-xs">
										<div className="rounded-2xl bg-platinum-100/60 border border-platinum-300/40 px-3 py-3">
											<p className="text-[11px] text-gray-700 mb-1">
												Avg. Finality
											</p>
											<p className="text-lg font-semibold text-gray-900">
												&lt;2s
											</p>
										</div>
										<div className="rounded-2xl bg-platinum-100/60 border border-platinum-300/40 px-3 py-3">
											<p className="text-[11px] text-gray-700 mb-1">
												Properties Modeled
											</p>
											<p className="text-lg font-semibold text-gray-900">
												25K+
											</p>
										</div>
										<div className="rounded-2xl bg-platinum-100/60 border border-platinum-300/40 px-3 py-3">
											<p className="text-[11px] text-gray-700 mb-1">
												Global Investors
											</p>
											<p className="text-lg font-semibold text-gray-900">
												120+
											</p>
										</div>
									</div>

									<div className="flex items-center justify-between text-[11px] text-gray-700 border-t border-platinum-200 pt-3">
										<div className="flex items-center gap-2">
											<div className="flex -space-x-2">
												{[1, 2, 3].map((i) => (
													<div
														key={i}
														className="w-6 h-6 rounded-full border border-white bg-platinum-300">
														<Image
															src="/logo.png"
															alt=""
															width={24}
															height={24}
															className="w-full h-full object-contain"
														/>
													</div>
												))}
											</div>
											<span>Trusted by leading RealFi teams</span>
										</div>
										<span className="text-gray-600">
											Backed by on-chain compliance rails
										</span>
									</div>
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
						<div className="w-6 h-10 sm:w-7 sm:h-12 border border-gray-400/50 rounded-full flex justify-center backdrop-blur-sm bg-platinum-200/30 shadow-lg">
							<div className="w-1.5 h-3 sm:h-4 bg-gradient-to-b from-blue-600 to-mist-600 rounded-full mt-3 sm:mt-4 animate-pulse" />
						</div>
					</div>
					<span className="text-xs text-gray-700 mt-2 sm:mt-3 tracking-wider font-medium">
						EXPLORE
					</span>
				</div>
			</div>

			{/* Subtle decorative elements - Hide on mobile */}
			<div className="absolute top-1/4 left-4 sm:left-8 w-0.5 h-20 sm:h-32 lg:h-40 bg-gradient-to-b from-blue-500/15 via-mist-400/5 to-transparent hidden md:block" />
			<div className="absolute bottom-1/3 right-4 sm:right-8 w-0.5 h-16 sm:h-24 lg:h-32 bg-gradient-to-b from-blue-500/15 via-mist-400/5 to-transparent hidden md:block" />

			{/* Corner accents for depth - Hide on mobile */}
			<div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500/3 to-transparent hidden lg:block" />
			<div className="absolute bottom-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tl from-mist-500/3 to-transparent hidden lg:block" />
		</section>
	);
}
