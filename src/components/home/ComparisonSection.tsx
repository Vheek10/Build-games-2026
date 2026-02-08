/** @format */
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Layers, ShieldCheck, Zap } from "lucide-react";

const comparisons = [
	{
		title: "Traditional",
		subtitle: "Vested Friction",
		header: "Legacy Infrastructure",
		description: "The legacy method: human-reliant, fragmented, and geographically constrained equity.",
		features: [
			{ text: "Manual processing (2-6 months)", good: false },
			{ text: "Physical deed dependencies", good: false },
			{ text: "High intermediary overhead", good: false },
		],
		image: "/images/unsplash-f200968a6e72.jpg",
		color: "#ef4444",
	},
	{
		title: "Speculative",
		subtitle: "Digital Chaos",
		header: "Intermediate Gap",
		description: "The intermediate gap: unverified digital shadows and high-volatility friction.",
		features: [
			{ text: "Extreme capital volatility", good: false },
			{ text: "Opaque legal execution", good: false },
			{ text: "Zero regulatory recourse", good: false },
		],
		image: "/images/unsplash-e363dbe005cb.jpg",
		color: "#f97316",
	},
	{
		title: "StrataDeed",
		subtitle: "The Final State",
		header: "Digital Liquidity",
		description: "True RealFi: institutional-grade verification meets hyper-liquid global liquidity.",
		features: [
			{ text: "Instant T+0 settlement", good: true },
			{ text: "Autonomous legal rigor", good: true },
			{ text: "Universal market parity", good: true },
		],
		image: "/images/unsplash-ce09059eeffa.jpg",
		color: "#3b82f6",
	},
];

export default function ComparisonSection() {
	const [active, setActive] = useState(2);

	useEffect(() => {
		const interval = setInterval(() => {
			setActive((prev) => (prev + 1) % comparisons.length);
		}, 20000);
		return () => clearInterval(interval);
	}, []);

	return (
		<section className="relative py-32 px-6 lg:px-12 bg-[#020617] overflow-hidden">
			{/* Cinematic Background Artifacts */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				<div className="absolute -top-1/4 -right-1/4 w-3/4 h-3/4 bg-blue-600/5 rounded-full blur-[200px]" />
				<div className="absolute -bottom-1/4 -left-1/4 w-3/4 h-3/4 bg-indigo-600/5 rounded-full blur-[200px]" />
			</div>

			<div className="max-w-[1200px] mx-auto relative z-10">
				{/* Top Global Label */}
				<motion.div 
					initial={{ opacity: 0, y: -10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="flex justify-center mb-12"
				>
					<div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
						<Layers className="w-3 h-3 text-blue-400" />
						<span className="text-[9px] font-black text-white/60 uppercase tracking-[0.3em]">Institutional Evolution</span>
					</div>
				</motion.div>

				<div className="relative">
					<AnimatePresence mode="wait">
						<motion.div
							key={active}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 1.2, ease: "easeInOut" }}
							className="relative rounded-[3.5rem] bg-[#0b1120]/60 border border-white/5 shadow-2xl overflow-hidden backdrop-blur-3xl"
						>
							<div className="absolute inset-0 opacity-10 blur-[100px] pointer-events-none" style={{ backgroundColor: comparisons[active].color }} />
							
							<div className="relative grid lg:grid-cols-[1.1fr_1fr] min-h-[500px]">
								{/* Text Side - Now Inside the Card */}
								<div className="p-8 lg:p-14 flex flex-col justify-center border-r border-white/5">
									<motion.div
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.2 }}
									>
										<div className="flex items-center gap-2 mb-6">
											<Sparkles className="w-3.5 h-3.5 text-blue-400" />
											<span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Stage 0{active + 1}</span>
										</div>
										
										<h2 className="text-3xl lg:text-4xl font-black text-white tracking-tighter mb-4 leading-none lowercase">
											the evolution of <br/>
											<span className="text-blue-500">{comparisons[active].header}</span>
										</h2>
										
										<p className="text-sm text-gray-400 font-medium mb-10 leading-relaxed opacity-80 max-w-sm">
											{comparisons[active].description}
										</p>

										<div className="space-y-4 mb-12">
											{comparisons[active].features.map((feature, i) => (
												<div key={i} className="flex flex-col gap-1.5 group/feat">
													<div className="flex items-center gap-3">
														<div className={`w-1 h-1 rounded-full ${feature.good ? 'bg-blue-500' : 'bg-red-500/50'}`} />
														<span className="text-[10px] font-black text-white/70 uppercase tracking-widest">{feature.text}</span>
													</div>
													<div className="h-[1px] w-full bg-white/5 overflow-hidden">
														<motion.div 
															initial={{ width: "0%" }}
															animate={{ width: "100%" }}
															transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
															className={`h-full ${feature.good ? 'bg-blue-500/20' : 'bg-red-500/10'}`} 
														/>
													</div>
												</div>
											))}
										</div>

										{active === 2 && (
											<Link 
												href="/dashboard" 
												className="group inline-flex items-center gap-6 text-[10px] font-black text-white uppercase tracking-[0.3em] border-b border-white/20 pb-2 hover:border-blue-500 transition-colors"
											>
												Initialize the Future
												<ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
											</Link>
										)}
									</motion.div>
								</div>

								{/* Visual Side */}
								<div className="relative min-h-[400px] lg:min-h-full overflow-hidden">
									<Image
										src={comparisons[active].image}
										alt={comparisons[active].title}
										fill
										className="object-cover opacity-80 transition-transform duration-[10s] hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-r from-[#0b1120] via-transparent to-transparent lg:opacity-100 opacity-60" />
									
									{/* Floating Labels */}
									<div className="absolute bottom-8 right-8 text-right">
										<p className="text-[9px] font-black text-white/40 uppercase tracking-[0.5em] mb-1">{comparisons[active].subtitle}</p>
										<p className="text-xl font-black text-white tracking-widest uppercase">{comparisons[active].title}</p>
									</div>

									{/* Badge */}
									<div className="absolute top-8 right-8">
										<div className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center">
											{active === 2 ? <ShieldCheck className="w-5 h-5 text-blue-400" /> : <Zap className="w-5 h-5 text-red-400/50" />}
										</div>
									</div>
								</div>
							</div>

							{/* Active Timeline Dots */}
							<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
								{comparisons.map((_, i) => (
									<button key={i} onClick={() => setActive(i)} className="p-2 group">
										<div className={`h-1 rounded-full transition-all duration-500 ${active === i ? 'w-8 bg-blue-500' : 'w-2 bg-white/20 group-hover:bg-white/40'}`} />
									</button>
								))}
							</div>

							{/* Progress Bar */}
							<div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/5">
								<motion.div 
									key={active}
									initial={{ width: "0%" }}
									animate={{ width: "100%" }}
									transition={{ duration: 20, ease: "linear" }}
									className="h-full bg-blue-500/40"
								/>
							</div>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</section>
	);
}
