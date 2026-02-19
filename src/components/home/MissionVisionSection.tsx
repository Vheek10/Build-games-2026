/** @format */
"use client";

import {
	Target,
	Eye,
	Globe,
	Home,
	Lock,
	Shield,
	Sparkles,
	ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function MissionVisionSection() {
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"],
	});

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.3,
			},
		},
	};

	const itemVariants: any = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
		},
	};

	return (
		<section
			ref={containerRef}
			className="py-10 sm:py-14 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden"
			style={{ perspective: "3000px" }}>
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={containerVariants}
					className="text-center mb-16 lg:mb-24">
					<motion.div
						variants={itemVariants}
						className="inline-flex items-center gap-3 px-6 py-2.5 bg-blue-600/5 rounded-full mb-6 sm:mb-8 border border-blue-600/10">
						<Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
						<span className="text-[9px] sm:text-[10px] font-black text-blue-700 uppercase tracking-[0.3em] sm:tracking-[0.5em] font-montserrat">
							The StrataDeed North Star
						</span>
					</motion.div>

					<motion.h2
						variants={itemVariants}
						className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-6 sm:mb-8 tracking-tighter leading-[1.1] font-mclaren">
						Reimagining <br />
						<span className="text-blue-600">Property Ownership</span>
					</motion.h2>

					<motion.p
						variants={itemVariants}
						className="text-sm lg:text-base text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed font-montserrat">
						We aren't just building a platform; we're establishing the legal and
						social protocols for the global RealFi economy.
					</motion.p>
				</motion.div>

				{/* Mission & Vision Giga-Cards */}
				<div className="grid lg:grid-cols-2 gap-10 lg:gap-20 mb-24 sm:mb-32">
					{/* Mission Card */}
					<motion.div
						initial={{ opacity: 0, y: 100 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
						whileHover={{
							y: -20,
							rotateY: -3,
							transition: { duration: 0.8 },
						}}
						className="relative overflow-hidden rounded-[3rem] sm:rounded-[4rem] group cursor-default shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] bg-gray-900 h-[520px] sm:h-[600px] lg:h-[750px]">
						{/* Background Image Layer */}
						<div className="absolute inset-0">
							<Image
								src="/images/unsplash-f24b0cae1224.jpg"
								alt="Mission"
								fill
								className="object-cover transition-transform duration-[20s] group-hover:scale-110"
							/>
							<div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
							<div className="absolute inset-0 bg-blue-900/10 mix-blend-color group-hover:bg-blue-600/20 transition-colors duration-1000" />
						</div>

						{/* Dynamic Light Sweep */}
						<motion.div
							animate={{
								left: ["-100%", "200%"],
								opacity: [0, 0.2, 0],
							}}
							transition={{
								duration: 4,
								repeat: Infinity,
								ease: "linear",
								repeatDelay: 2,
							}}
							className="absolute top-0 w-1/2 h-full bg-linear-to-r from-transparent via-white to-transparent -skew-x-12 z-20 pointer-events-none"
						/>

						{/* Floating Content Glassmorphism */}
						<div className="absolute inset-0 p-8 sm:p-10 lg:p-24 flex flex-col justify-end z-10">
							<div className="relative">
								<motion.div
									initial={{ opacity: 0, scale: 0.8 }}
									whileInView={{ opacity: 1, scale: 1 }}
									className="w-14 h-14 sm:w-20 sm:h-20 rounded-4xl bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center mb-8 sm:mb-10 shadow-2xl">
									<Target className="w-7 h-7 sm:w-9 sm:h-9 text-white" />
								</motion.div>

								<h3 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white mb-6 sm:mb-8 tracking-tightest leading-[0.95] sm:leading-[0.9] lowercase font-mclaren">
									our <br />
									<span className="text-blue-400">Mission</span>
								</h3>

								<p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed mb-10 sm:mb-12 font-medium max-w-md opacity-80 group-hover:opacity-100 transition-opacity font-montserrat">
									To rebuild trust in global real estate by merging legal rigor
									with blockchain permanence.
								</p>

								<div className="flex items-center gap-6 group/btn cursor-pointer">
									<motion.div
										whileHover={{
											scale: 1.1,
											y: -5,
											backgroundColor: "#2563eb",
											color: "#ffffff",
											transition: { duration: 0.3 },
										}}
										whileTap={{ scale: 0.95 }}
										className="flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white text-gray-900 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.4em] shadow-2xl transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(59,130,246,0.5)] font-montserrat">
										View Protocol
										<ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
									</motion.div>
									<div className="hidden sm:flex items-center gap-3 text-white/30">
										<Shield className="w-4 h-4" />
										<span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] sm:tracking-[0.4em] font-montserrat">
											Verified Framework
										</span>
									</div>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Vision Card */}
					<motion.div
						initial={{ opacity: 0, y: 100 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
						whileHover={{
							y: -20,
							rotateY: 3,
							transition: { duration: 0.8 },
						}}
						className="relative overflow-hidden rounded-[3rem] sm:rounded-[4rem] group cursor-default shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] bg-gray-900 h-[520px] sm:h-[600px] lg:h-[750px]">
						{/* Background Image Layer */}
						<div className="absolute inset-0">
							<Image
								src="/images/unsplash-9991f1c4c750.jpg"
								alt="Vision"
								fill
								className="object-cover transition-transform duration-[20s] group-hover:scale-110"
							/>
							<div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/40 to-transparent" />
							<div className="absolute inset-0 bg-cyan-900/10 mix-blend-color group-hover:bg-cyan-600/20 transition-colors duration-1000" />
						</div>

						{/* Content Overlay */}
						<div className="absolute inset-0 p-8 sm:p-10 lg:p-24 flex flex-col justify-end z-10">
							<div className="relative">
								<motion.div
									initial={{ opacity: 0, scale: 0.8 }}
									whileInView={{ opacity: 1, scale: 1 }}
									className="w-14 h-14 sm:w-20 sm:h-20 rounded-4xl bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center mb-8 sm:mb-10 shadow-2xl">
									<Eye className="w-7 h-7 sm:w-9 sm:h-9 text-white" />
								</motion.div>

								<h3 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white mb-6 sm:mb-8 tracking-tightest leading-[0.95] sm:leading-[0.9] lowercase font-mclaren">
									our <br />
									<span className="text-cyan-400">Vision</span>
								</h3>

								<p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed mb-10 sm:mb-12 font-medium max-w-md opacity-80 group-hover:opacity-100 transition-opacity font-montserrat">
									A borderless world where property is liquid, transparent, and
									accessible to everyone.
								</p>

								<div className="flex items-center gap-6 group/btn cursor-pointer">
									<motion.div
										whileHover={{
											scale: 1.1,
											y: -5,
											backgroundColor: "#0891b2", // cyan-600
											color: "#ffffff",
											transition: { duration: 0.3 },
										}}
										whileTap={{ scale: 0.95 }}
										className="flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white text-gray-900 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.4em] shadow-2xl transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(34,211,238,0.5)] font-montserrat">
										Global Roadmap
										<ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
									</motion.div>
									<div className="hidden sm:flex items-center gap-3 text-white/30">
										<Globe className="w-4 h-4" />
										<span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] sm:tracking-[0.4em] font-montserrat">
											Institutional Access
										</span>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Accelerated Core Values */}
				<div className="relative">
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						className="text-center mb-16">
						<h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.5em] mb-4 font-montserrat">
							The RealFi Advantage
						</h3>
						<div className="h-0.5 w-12 bg-blue-600 mx-auto" />
					</motion.div>

					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
						{[
							{
								icon: Shield,
								title: "Security first",
								description:
									"Bank-grade encryption, ZK-proofs, and battle-tested smart contracts.",
								color: "blue",
							},
							{
								icon: Lock,
								title: "Transparency",
								description:
									"Immutable ownership records synced with sovereign property registries.",
								color: "cyan",
							},
							{
								icon: Globe,
								title: "Global Access",
								description:
									"Border-neutral capital flows for the world's most stable asset class.",
								color: "emerald",
							},
							{
								icon: Home,
								title: "Real Value",
								description:
									"Direct legal link between digital tokens and physical titles.",
								color: "indigo",
							},
						].map((value, index) => {
							const Icon = value.icon;
							return (
								<motion.div
									key={value.title}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.1 }}
									whileHover={{ y: -10, transition: { duration: 0.3 } }}
									className="group p-6 sm:p-8 lg:p-10 bg-gray-50 rounded-[2.5rem] sm:rounded-[3rem] border border-gray-100 hover:border-blue-100 hover:bg-white hover:shadow-[0_40px_80px_-15px_rgba(37,99,235,0.1)] transition-all duration-700">
									<div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
										<Icon className="w-7 h-7 text-gray-900" />
									</div>
									<h4 className="text-[10px] sm:text-[11px] font-black text-gray-900 uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4 sm:mb-6 font-montserrat">
										{value.title}
									</h4>
									<p className="text-sm text-gray-500 font-medium leading-[1.8] font-montserrat">
										{value.description}
									</p>
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
