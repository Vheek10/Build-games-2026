/** @format */
"use client";

import Link from "next/link";
import Image from "next/image";
import {
	ArrowRight,
	ArrowUpRight,
	Sparkles,
	Globe,
	Shield,
	Building,
	Lock,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function HeroSection() {
	return (
		<section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-transparent pt-20 sm:pt-24 lg:pt-28">
			<Navbar placement="hero" />
			{/* Fullscreen video background - Optimized for all screen sizes */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden w-full h-full">
				{/* Video container with aspect ratio - Enhanced for large screens */}
				<div className="absolute inset-0 w-full h-full bg-transparent">
					<video
						autoPlay
						muted
						loop
						playsInline
						className="absolute inset-0 w-full h-full object-cover will-change-transform saturate-110 contrast-125 brightness-105"
						style={{
							filter:
								"brightness(1.08) contrast(1.25) saturate(1.2) drop-shadow(0 0 2px rgba(90, 127, 176, 0.1))",
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
				<div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/10 to-transparent" />

				{/* Refined vignette effect - more subtle for larger screens */}
				<div className="absolute inset-0 bg-radial-gradient(ellipse at center, transparent 0%, rgba(255,255,255,0.2) 100%)" />

				{/* Additional clarity enhancement for larger screens */}
				<div className="hidden xl:block absolute inset-0 bg-radial-gradient(circle at 50% 40%, transparent 0%, rgba(255,255,255,0.05) 100%)" />
			</div>

			{/* Subtle pattern overlay - very transparent */}
			<div className="absolute inset-0 opacity-[0.01] z-1 pointer-events-none">
				<div className="h-full w-full bg-[linear-gradient(45deg,transparent_48%,rgba(90,127,176,0.015)_48%,rgba(90,127,176,0.015)_52%,transparent_52%)] bg-size-[100px_100px]" />
			</div>

			<div className="relative z-20 w-full">
				<div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
					<div className="max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 xl:gap-24 items-center">
						<div className="text-center lg:text-left flex flex-col items-center lg:items-start">
							{/* Semi-transparent badge - Institutional Standard */}
							<div className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/40 backdrop-blur-xl rounded-full mb-10 border border-gray-200/50 shadow-sm">
								<span className="text-[10px] sm:text-[11px] font-black text-gray-900 uppercase tracking-[0.2em] sm:tracking-[0.4em] sm:whitespace-nowrap font-montserrat">
									Innovating Real Estate
								</span>
								<Shield className="w-3.5 h-3.5 text-blue-600/60" />
							</div>

							{/* Main Heading - Compliance Scaled */}
							<div className="relative mb-8 w-full">
								<h1
									className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tightest leading-[0.9] sm:leading-[0.85] mb-8 font-mclaren"
									style={{ textShadow: "0 2px 18px rgba(0, 0, 0, 0.25)" }}>
									<span className="block">Tokenizing Global</span>
									<span className="block bg-linear-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
										Real Estate Assets
									</span>
								</h1>

								{/* Subtitle - Compliance Refined */}
								<p
									className="text-sm lg:text-base text-gray-500 leading-relaxed font-medium max-w-2xl px-2 lg:px-0 font-montserrat"
									style={{ textShadow: "0 1px 12px rgba(0, 0, 0, 0.2)" }}>
									Verified digital deeds. Borderless ownership.{" "}
									<span className="text-blue-600 font-black">
										Unprecedented liquidity.
									</span>
								</p>
							</div>

							{/* Value Proposition - Compliance Styled */}
							<div className="w-full mb-12 px-2 lg:px-0">
								<div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 sm:gap-10">
									{[
										{
											icon: Shield,
											label: "Regulatory Compliance",
											color: "blue",
										},
										{
											icon: Globe,
											label: "Global Market Access",
											color: "blue",
										},
										{
											icon: Building,
											label: "Verified Properties",
											color: "blue",
										},
									].map((item, index) => (
										<div
											key={index}
											className="flex items-center gap-4 group transition-all duration-300">
											<div className="w-10 h-10 rounded-xl bg-white/50 flex items-center justify-center border border-gray-100 group-hover:border-blue-200 transition-all duration-300 backdrop-blur-sm shadow-sm group-hover:shadow-blue-900/5">
												<item.icon className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
											</div>
											<span className="text-[11px] font-black text-gray-900 uppercase tracking-[0.2em] font-montserrat">
												{item.label}
											</span>
										</div>
									))}
								</div>
							</div>

							{/* CTA Buttons - Capsule Institutional Standard */}
							<div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start items-center mb-16 px-4 lg:px-0 w-full max-w-md sm:max-w-none">
								<motion.div
									whileHover={{
										scale: 1.05,
										y: -5,
										backgroundColor: "#2563eb", // blue-600
										transition: { duration: 0.4 },
									}}
									whileTap={{ scale: 0.98 }}
									className="w-fit bg-gray-900 rounded-full">
									<Link
										href="/dashboard"
										className="group relative px-4 sm:px-6 py-3 sm:py-3.5 text-white rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] text-center flex items-center justify-center">
										<span className="relative flex items-center gap-2 text-[8px] sm:text-[9px] font-black uppercase tracking-[0.22em] sm:tracking-[0.3em] text-center leading-tight sm:whitespace-nowrap font-montserrat">
											Start Investing
											<ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
										</span>
									</Link>
								</motion.div>

								<motion.div
									whileHover={{
										scale: 1.05,
										y: -5,
										backgroundColor: "#f8fafc", // gray-50
										borderColor: "#bfdbfe", // blue-200
										transition: { duration: 0.4 },
									}}
									whileTap={{ scale: 0.98 }}
									className="w-fit bg-white border border-gray-200 rounded-full">
									<Link
										href="/mint"
										className="group relative px-4 sm:px-6 py-3 sm:py-3.5 text-gray-900 rounded-full transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] text-center flex items-center justify-center">
										<span className="relative flex items-center gap-2 text-[8px] sm:text-[9px] font-black uppercase tracking-[0.22em] sm:tracking-[0.3em] text-center leading-tight sm:whitespace-nowrap font-montserrat">
											List Property
											<ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
										</span>
									</Link>
								</motion.div>
							</div>

							{/* Trust Indicators - Standardized Grid */}
							<div className="w-full lg:max-w-xl px-4 lg:px-0">
								<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-16">
									{[
										{ value: "100%", label: "Compliance" },
										{ value: "24/7", label: "Settlement" },
										{ value: "YES", label: "Finality" },
									].map((item, index) => (
										<div
											key={index}
											className="text-center lg:text-left group">
											<div className="text-2xl sm:text-3xl xl:text-3xl font-black text-gray-900 tracking-tightest mb-3 group-hover:text-blue-600 transition-colors font-mclaren">
												{item.value}
											</div>
											<div className="text-[9px] sm:text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] font-montserrat">
												{item.label}
											</div>
											<div className="h-0.5 w-8 mt-4 bg-gray-100 group-hover:bg-blue-600 group-hover:w-12 transition-all duration-500" />
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Right column: floating card */}
						<div className="hidden lg:block relative group/card">
							<div className="absolute -inset-4 bg-linear-to-tr from-blue-500/10 via-mist-400/10 to-emerald-400/10 blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
							<div className="relative rounded-4xl border border-platinum-300/50 bg-white/70 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] p-8 space-y-6 transform transition-all duration-700 hover:-translate-y-2 hover:rotate-1">
								<div className="flex items-center justify-between gap-3">
									<div>
										<p className="text-xs font-semibold text-blue-700 uppercase tracking-[0.2em] font-montserrat">
											LIVE ON SUI
										</p>
										<p className="mt-1 text-sm text-gray-700 font-montserrat">
											ZK-powered property tokenization with real-time
											settlement.
										</p>
									</div>
									<div className="flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 border border-emerald-300">
										<div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
										<span className="text-xs font-medium text-emerald-900 font-montserrat">
											<Lock className="inline-block w-3 h-3 mr-1 align-[-2px]" />
											ZK Privacy
										</span>
									</div>
								</div>

								<div className="grid grid-cols-3 gap-4 text-center text-xs">
									<div className="rounded-2xl bg-platinum-100/60 border border-platinum-300/40 px-3 py-3">
										<p className="text-[11px] text-gray-700 mb-1 font-montserrat">
											Avg. Finality
										</p>
										<p className="text-lg font-semibold text-gray-900 font-mclaren">
											&lt;2s
										</p>
									</div>
									<div className="rounded-2xl bg-platinum-100/60 border border-platinum-300/40 px-3 py-3">
										<p className="text-[11px] text-gray-700 mb-1 font-montserrat">
											Properties Modeled
										</p>
										<p className="text-lg font-semibold text-gray-900 font-mclaren">
											25K+
										</p>
									</div>
									<div className="rounded-2xl bg-platinum-100/60 border border-platinum-300/40 px-3 py-3">
										<p className="text-[11px] text-gray-700 mb-1 font-montserrat">
											Global Investors
										</p>
										<p className="text-lg font-semibold text-gray-900 font-mclaren">
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
										<span className="font-montserrat">
											Trusted by leading RealFi teams
										</span>
									</div>
									<span className="text-gray-600 font-montserrat">
										Backed by on-chain compliance rails
									</span>
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
							<div className="w-1.5 h-3 sm:h-4 bg-linear-to-b from-blue-600 to-mist-600 rounded-full mt-3 sm:mt-4 animate-pulse" />
						</div>
					</div>
					<span className="text-xs text-gray-700 mt-2 sm:mt-3 tracking-wider font-medium font-montserrat">
						EXPLORE
					</span>
				</div>
			</div>

			{/* Subtle decorative elements - Hide on mobile */}
			<div className="absolute top-1/4 left-4 sm:left-8 w-0.5 h-20 sm:h-32 lg:h-40 bg-linear-to-b from-blue-500/15 via-mist-400/5 to-transparent hidden md:block" />
			<div className="absolute bottom-1/3 right-4 sm:right-8 w-0.5 h-16 sm:h-24 lg:h-32 bg-linear-to-b from-blue-500/15 via-mist-400/5 to-transparent hidden md:block" />

			{/* Corner accents for depth - Hide on mobile */}
			<div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-blue-500/3 to-transparent hidden lg:block" />
			<div className="absolute bottom-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-tl from-mist-500/3 to-transparent hidden lg:block" />
		</section>
	);
}
