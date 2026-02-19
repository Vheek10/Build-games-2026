/** @format */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
	Shield,
	Zap,
	Globe,
	ArrowRight,
	ArrowUpRight,
	CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const comparisons = [
	{
		id: "traditional",
		title: "Traditional Real Estate",
		subtitle: "The Legacy Fragmented Model",
		description:
			"Bureaucratic, slow, and restricted. High entry barriers and geographic silos define the status quo.",
		metrics: [
			{ label: "Settlement Time", value: "30-90 Days" },
			{ label: "Minimum Entry", value: "$50,000+" },
			{ label: "Liquidity", value: "Near Zero" },
		],
		features: ["Physical Deeds", "Manual Escrow", "High Fees"],
		color: "gray",
		icon: Globe,
		image: "/images/unsplash-cc1a3fa10c00.jpg",
	},
	{
		id: "speculative",
		title: "Web3 Speculation",
		subtitle: "The Unregulated Digital Wild West",
		description:
			"High velocity but high risk. Volatile assets often detached from physical legal title and real-world utility.",
		metrics: [
			{ label: "Settlement Time", value: "Instant" },
			{ label: "Minimum Entry", value: "$10" },
			{ label: "Liquidity", value: "High (Volatile)" },
		],
		features: ["No Legal Link", "Smart Contract Only", "Unregulated"],
		color: "red",
		icon: Zap,
		image: "/images/unsplash-fcd25c85cd64.jpg",
	},
	{
		id: "stratadeed",
		title: "StrataDeed Protocol",
		subtitle: "The RealFi Institutional Standard",
		description:
			"The efficiency of digital settlement meets the rigor of sovereign property law. Fractional ownership with legal finality.",
		metrics: [
			{ label: "Settlement Time", value: "< 1.5s" },
			{ label: "Minimum Entry", value: "$100" },
			{ label: "Liquidity", value: "Instant Exit" },
		],
		features: ["On-Chain Deeds", "Legal Finality", "Yield-Bearing"],
		color: "blue",
		icon: Shield,
		image: "/images/unsplash-ce09059eeffa.jpg",
	},
];

export default function ComparisonSection() {
	const [active, setActive] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setActive((prev) => (prev + 1) % comparisons.length);
		}, 10000);
		return () => clearInterval(interval);
	}, []);

	return (
		<section
			className="relative py-10 sm:py-14 lg:py-20 px-4 sm:px-6 lg:px-12 bg-gray-50 overflow-hidden"
			style={{ perspective: "2000px" }}>
			{/* Background Effects */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-600/3 rounded-full blur-[180px]" />
			</div>

			<div className="max-w-7xl mx-auto relative z-10">
				{/* Section Header */}
				<div className="text-center mb-16">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}>
						<h2 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tighter mb-6 lowercase leading-[1.1] font-mclaren">
							Beyond <span className="text-blue-600">Tradition.</span>
						</h2>
						<p className="text-gray-400 text-[9px] sm:text-[10px] lg:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] opacity-60 font-montserrat">
							The Evolution of Asset Settlement
						</p>
					</motion.div>
				</div>

				{/* Navigation Pips */}
				<div className="flex justify-center gap-3 sm:gap-6 mb-12 sm:mb-16 flex-wrap">
					{comparisons.map((_, idx) => (
						<button
							key={idx}
							onClick={() => setActive(idx)}
							className="group relative px-2 py-4">
							<div
								className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] transition-all duration-500 ${active === idx ? "text-blue-600 scale-110" : "text-gray-400 hover:text-gray-600"} font-montserrat`}>
								{comparisons[idx].id}
							</div>
							{active === idx && (
								<motion.div
									layoutId="nav-line-comparison"
									className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.3)]"
								/>
							)}
						</button>
					))}
				</div>

				{/* Card Display */}
				<div className="relative max-w-5xl mx-auto">
					<AnimatePresence mode="wait">
						<motion.div
							key={active}
							initial={{ opacity: 0, y: 40, scale: 0.98 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -40, scale: 1.02 }}
							transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
							whileHover={{
								scale: 1.01,
								rotateY: 1,
								rotateX: -0.5,
								transition: { duration: 0.8, ease: "easeOut" },
							}}
							className="relative rounded-[4rem] border border-gray-100 shadow-2xl overflow-hidden cursor-default group/card min-h-[480px] sm:min-h-[520px] lg:min-h-[550px] bg-white">
							{/* Cinematic Background Image Layer */}
							<div className="absolute inset-0 z-0">
								<motion.div
									initial={{ scale: 1.15, filter: "blur(4px) grayscale(30%)" }}
									animate={{ scale: 1, filter: "blur(0px) grayscale(0%)" }}
									transition={{ duration: 15, ease: "linear" }}
									className="relative w-full h-full">
									<Image
										src={comparisons[active].image}
										alt={comparisons[active].title}
										fill
										className="object-cover transition-transform duration-[20s] group-hover/card:scale-110"
									/>
									{/* Gradients Layer */}
									<div className="absolute inset-0 bg-linear-to-r from-white via-white/85 to-white/10" />
									<div
										className={`absolute inset-0 opacity-10 mix-blend-color ${
											active === 2
												? "bg-blue-600"
												: active === 1
													? "bg-red-600"
													: "bg-gray-600"
										}`}
									/>
								</motion.div>
							</div>

							<div className="relative z-10 p-6 sm:p-10 lg:p-24 grid lg:grid-cols-[1.1fr_0.9fr] gap-8 sm:gap-12 lg:gap-20 items-center">
								{/* Content Side */}
								<div>
									<div className="flex items-center gap-6 mb-10">
										<div
											className={`p-5 rounded-3xl bg-gray-50 border border-gray-100 backdrop-blur-2xl shadow-sm ${
												active === 2
													? "text-blue-600"
													: active === 1
														? "text-red-600"
														: "text-gray-600"
											}`}>
											{(() => {
												const Icon = comparisons[active].icon;
												return <Icon className="w-8 h-8" />;
											})()}
										</div>
										<div>
											<h3 className="text-2xl sm:text-3xl lg:text-5xl font-black text-gray-900 tracking-tightest mb-2 leading-none font-mclaren">
												{comparisons[active].title}
											</h3>
											<p className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.25em] sm:tracking-[0.4em] text-blue-600/90 font-montserrat">
												{comparisons[active].subtitle}
											</p>
										</div>
									</div>

									<p className="text-sm lg:text-base text-gray-600 font-medium leading-relaxed mb-16 max-w-lg font-montserrat">
										{comparisons[active].description}
									</p>

									<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10">
										{comparisons[active].metrics.map((m, i) => (
											<div
												key={i}
												className="group/metric">
												<p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-3 group-hover/metric:text-gray-900 transition-colors font-montserrat">
													{m.label}
												</p>
												<p className="text-xl lg:text-3xl font-black text-gray-900 tracking-tighter font-mclaren">
													{m.value}
												</p>
											</div>
										))}
									</div>
								</div>

								{/* Features Side */}
								<div className="relative">
									<div className="space-y-6 p-6 sm:p-8 lg:p-10 rounded-[3rem] bg-white/60 border border-gray-100 backdrop-blur-3xl shadow-xl shadow-blue-900/5">
										<div className="mb-6">
											<p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.5em] font-montserrat">
												Protocol Features
											</p>
											<div className="h-px w-12 bg-gray-200 mt-2" />
										</div>
										{comparisons[active].features.map((f, i) => (
											<div
												key={i}
												className="flex items-center gap-5 group/item">
												<div
													className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] ${
														active === 2
															? "bg-blue-500 text-blue-500"
															: active === 1
																? "bg-red-500 text-red-500"
																: "bg-gray-300 text-gray-300"
													}`}
												/>
												<span className="text-xs lg:text-sm font-black uppercase tracking-[0.2em] text-gray-600 group-hover/item:text-gray-900 transition-colors font-montserrat">
													{f}
												</span>
											</div>
										))}
									</div>

									{active === 2 && (
										<motion.div
											whileHover={{
												scale: 1.1,
												y: -5,
												backgroundColor: "#3b82f6", // blue-500
												transition: { duration: 0.3 },
											}}
											whileTap={{ scale: 0.95 }}
											className="mt-10 bg-blue-600 rounded-full">
											<Link
												href="/dashboard"
												className="flex items-center justify-between gap-4 sm:gap-6 px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-full transition-all duration-500 group/btn shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_30px_60px_-15px_rgba(37,99,235,0.6)]">
												<span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] sm:tracking-[0.4em] text-white text-center leading-tight sm:whitespace-nowrap font-montserrat">
													Institutional Access
												</span>
												<ArrowUpRight className="w-4 h-4 text-white transition-transform duration-500 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
											</Link>
										</motion.div>
									)}
								</div>
							</div>

							{/* Progress Bar (Synchronized with 10s interval) */}
							<div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-100 backdrop-blur-md">
								<motion.div
									key={active}
									initial={{ width: "0%" }}
									animate={{ width: "100%" }}
									transition={{ duration: 10, ease: "linear" }}
									className={`h-full relative ${
										active === 2
											? "bg-blue-600 shadow-[0_0_30px_rgba(37,99,235,0.5)]"
											: active === 1
												? "bg-red-600 shadow-[0_0_30px_rgba(220,38,38,0.5)]"
												: "bg-gray-400 shadow-[0_0_30px_rgba(156,163,175,0.5)]"
									}`}>
									{/* Glow tip */}
									<div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-full bg-white blur-sm opacity-50" />
								</motion.div>
							</div>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</section>
	);
}
