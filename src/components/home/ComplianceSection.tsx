/** @format */
"use client";

import {
	FileCheck,
	Shield,
	Globe,
	Lock,
	ArrowRight,
	ArrowUpRight,
	Sparkles,
	Target,
	Scaling,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const complianceFeatures = [
	{
		icon: FileCheck,
		title: "Protocol Verification",
		subtitle: "Automated checks against global registries",
		metric: "100% On-Chain",
		color: "blue",
		description:
			"Every asset undergoes a multi-layer verification process, cross-referencing digital deeds with sovereign property registries in real-time.",
		image: "/images/unsplash-ce09059eeffa.jpg",
	},
	{
		icon: Shield,
		title: "Escrow Integrity",
		subtitle: "Multi-signature autonomous security",
		metric: "Institutional Grade",
		color: "indigo",
		description:
			"Capital is protected by decentralized escrow protocols, ensuring that transfer of value only occurs upon cryptographic confirmation of deed delivery.",
		image: "/images/unsplash-cc1a3fa10c00.jpg",
	},
	{
		icon: Lock,
		title: "ZKP Privacy",
		subtitle: "Identity-masking regulatory rigor",
		metric: "EAL6+ Security",
		color: "cyan",
		description:
			"Utilizing Zero-Knowledge Proofs to validate investor accreditation and KYC status without exposing sensitive personal data to the public ledger.",
		image: "/images/unsplash-fcd25c85cd64.jpg",
	},
];

const metrics = [
	{ label: "Verification Speed", value: "< 1.5s", icon: Target, color: "blue" },
	{
		label: "Compliance Coverage",
		value: "45+ Jurisdictions",
		icon: Globe,
		color: "indigo",
	},
	{
		label: "System Reliability",
		value: "99.99%",
		icon: Scaling,
		iconColor: "text-blue-600",
	},
];

export default function ComplianceSection() {
	const [active, setActive] = useState(0);

	return (
		<section className="relative py-10 sm:py-14 lg:py-20 px-4 sm:px-6 lg:px-12 bg-gray-50/50 overflow-hidden">
			{/* Soft Ambient Effects */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-1/4 -left-[10%] w-[50%] h-[50%] bg-blue-600/3 rounded-full blur-[150px]" />
				<div className="absolute bottom-1/4 -right-[10%] w-[50%] h-[50%] bg-indigo-600/3 rounded-full blur-[150px]" />
			</div>

			<div className="max-w-7xl mx-auto relative z-10">
				{/* Top Label */}
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="flex justify-center mb-10">
					<div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-600/5 border border-blue-600/10 backdrop-blur-md">
						<Shield className="w-3.5 h-3.5 text-blue-600" />
						<span className="text-[9px] sm:text-[10px] font-black text-blue-700 uppercase tracking-[0.3em] sm:tracking-[0.4em] font-montserrat">
							Regulatory Infrastructure
						</span>
					</div>
				</motion.div>

				<div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-12 lg:gap-20 items-start">
					{/* Left: Console-style Selection */}
					<div className="space-y-4 lg:sticky lg:top-32 order-2 lg:order-1">
						<div className="mb-8 hidden lg:block">
							<h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-3 font-montserrat">
								Select Protocol Layer
							</h3>
							<div className="h-px w-20 bg-blue-600/20" />
						</div>

						{complianceFeatures.map((feature, idx) => {
							const isActive = active === idx;
							const Icon = feature.icon;

							return (
								<motion.button
									key={idx}
									onClick={() => setActive(idx)}
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ delay: idx * 0.1 }}
									className={`w-full group relative p-5 sm:p-6 rounded-2xl border transition-all duration-700 text-left ${
										isActive
											? "bg-white border-blue-100 shadow-xl shadow-blue-900/5"
											: "bg-white/40 border-gray-100 hover:border-blue-100 hover:bg-white hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-900/5"
									}`}>
									<div className="flex items-center gap-5">
										<div
											className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-700 ${
												isActive
													? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
													: "bg-gray-100 text-gray-400 group-hover:text-blue-600"
											}`}>
											<Icon className="w-5 h-5" />
										</div>
										<div>
											<h3
												className={`text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-widest mb-1 transition-colors ${
													isActive ? "text-gray-900" : "text-gray-400"
												} font-montserrat`}>
												{feature.title}
											</h3>
											<p
												className={`text-[9px] sm:text-[10px] font-medium tracking-tight transition-colors ${
													isActive ? "text-gray-500" : "text-gray-400"
												} font-montserrat`}>
												Layer 0{idx + 1}
											</p>
										</div>
									</div>

									{isActive && (
										<motion.div
											layoutId="active-pill-compliance"
											className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-full"
										/>
									)}
								</motion.button>
							);
						})}
					</div>

					{/* Right: Immersive Unified Card */}
					<div className="relative order-1 lg:order-2">
						<AnimatePresence mode="wait">
							<motion.div
								key={active}
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -30 }}
								transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
								className="relative p-1 rounded-[3.5rem] overflow-hidden group/card">
								<div className="relative bg-white border border-gray-100 shadow-2xl rounded-[2.9rem] overflow-hidden">
									<div className="grid lg:grid-cols-[1.1fr_0.9fr] min-h-[420px] sm:min-h-[500px] lg:min-h-[550px]">
										{/* Text Side - Now Inside the Card */}
										<div className="p-6 sm:p-8 lg:p-14 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-50">
											<div className="mb-10">
												<div className="flex items-center gap-3 mb-6">
													<Sparkles className="w-3.5 h-3.5 text-blue-600" />
													<span className="text-[9px] font-black text-blue-600 uppercase tracking-widest font-montserrat">
														Autonomous Compliance
													</span>
												</div>

												<h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tighter mb-6 leading-[1.1] font-mclaren">
													digitalized <br />
													<span className="text-blue-600">
														Legal Rigor
													</span>{" "}
													<br />
													at scale.
												</h2>

												<p className="text-sm lg:text-base text-gray-600 font-medium leading-relaxed opacity-80 max-w-sm mb-10 font-montserrat">
													{complianceFeatures[active].description}
												</p>

												<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
													{metrics.slice(0, 2).map((m, i) => (
														<div
															key={i}
															className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
															<div className="flex items-center gap-2 mb-2">
																<m.icon className="w-3 h-3 text-blue-600" />
																<span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter font-montserrat">
																	{m.label}
																</span>
															</div>
															<p className="text-sm font-black text-gray-900 font-mclaren">
																{m.value}
															</p>
														</div>
													))}
												</div>
											</div>

											{active === 2 && (
												<motion.div
													whileHover={{
														scale: 1.05,
														y: -5,
														backgroundColor: "#2563eb",
														transition: { duration: 0.3 },
													}}
													whileTap={{ scale: 0.95 }}
													className="bg-gray-900 rounded-full">
													<Link
														href="/dashboard"
														className="group inline-flex items-center gap-4 px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-2xl transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)]">
														<span className="text-[9px] sm:text-[10px] font-black text-white uppercase tracking-[0.25em] sm:tracking-[0.4em] font-montserrat">
															Review Framework
														</span>
														<ArrowUpRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
													</Link>
												</motion.div>
											)}
										</div>

										{/* Visual Side */}
										<div className="relative min-h-[260px] sm:min-h-[300px] lg:min-h-full overflow-hidden">
											<Image
												src={complianceFeatures[active].image}
												alt={complianceFeatures[active].title}
												fill
												className="object-cover transition-transform duration-[10s] group-hover/card:scale-110"
											/>
											<div className="absolute inset-0 bg-linear-to-r from-white via-transparent to-transparent lg:opacity-100 opacity-0" />
											<div className="absolute inset-0 bg-linear-to-t from-gray-900/10 to-transparent" />

											{/* Feature Identification */}
											<div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 text-right">
												<p className="text-[8px] sm:text-[9px] font-black text-white/60 uppercase tracking-[0.3em] sm:tracking-[0.5em] mb-1 font-montserrat">
													{complianceFeatures[active].subtitle}
												</p>
												<h4 className="text-xl sm:text-2xl font-black text-white tracking-widest uppercase font-mclaren">
													{complianceFeatures[active].metric}
												</h4>
											</div>
										</div>
									</div>
								</div>
							</motion.div>
						</AnimatePresence>
					</div>
				</div>

				{/* Global CTA */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mt-16 p-1 rounded-[2.5rem] bg-linear-to-r from-blue-600/10 via-indigo-600/10 to-cyan-600/10 border border-gray-100 overflow-hidden">
					<div className="bg-white rounded-[2.4rem] p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left shadow-lg shadow-blue-900/5">
						<div>
							<h3 className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tighter mb-4 font-mclaren">
								Institutional-Grade{" "}
								<span className="text-blue-600">Security.</span>
							</h3>
							<p className="text-sm lg:text-base text-gray-600 font-medium opacity-70 max-w-xl font-montserrat">
								Our framework is built to satisfy the world's most rigorous
								regulatory requirements, enabling institutional participation in
								the RealFi economy.
							</p>
						</div>

						<motion.div
							whileHover={{
								scale: 1.05,
								y: -5,
								backgroundColor: "#2563eb",
								transition: { duration: 0.3 },
							}}
							whileTap={{ scale: 0.95 }}
							className="bg-gray-900 rounded-full">
							<Link
								href="/dashboard"
								className="group relative flex items-center justify-center gap-4 px-10 py-5 text-white rounded-full font-black transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] text-center leading-tight sm:whitespace-nowrap">
								<span className="text-[10px] uppercase tracking-[0.4em] font-montserrat">
									Institutional Access
								</span>
								<ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
							</Link>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
