/** @format */
"use client";

import {
	Building2,
	Shield,
	Globe,
	Users,
	Target,
	Eye,
	Zap,
	CheckCircle,
	ArrowRight,
	Sparkles,
	Lock,
	ArrowUpRight,
	TrendingUp,
	CheckCircle2,
	ChevronDown,
	HelpCircle,
} from "lucide-react";
import {
	motion,
	useMotionValue,
	useSpring,
	useTransform,
	AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const faqItems = [
	{
		question: "What is StrataDeed?",
		answer:
			"StrataDeed is a blockchain-powered real estate protocol that converts physical property titles into verifiable on-chain assets. It merges sovereign law with digital permanence, enabling fractional ownership, instant settlement, and transparent global property transactions.",
	},
	{
		question: "How does property tokenization work?",
		answer:
			"Properties are verified through our institutional-grade compliance layer, then minted as on-chain tokens on the Sui blockchain. Each token cryptographically represents legal ownership rights, enabling fractional purchases as small as 0.01% of a property while maintaining full legal enforceability.",
	},
	{
		question: "Is my investment legally protected?",
		answer:
			"Absolutely. Every tokenized property on StrataDeed is backed by real-world legal documentation and verified through zero-knowledge proofs via our Tier-1 Institutional Node framework — no KYC required. Smart contracts enforce ownership rights, and all transactions are immutably and privately recorded on-chain.",
	},
	{
		question: "What blockchain does StrataDeed use?",
		answer:
			"StrataDeed is built on the Sui blockchain, chosen for its sub-second finality, high throughput, and Move-based smart contract security. This enables near-instant settlement of property transactions with minimal gas fees.",
	},
	{
		question: "How do I get started with investing?",
		answer:
			"Simply connect your Sui-compatible wallet, browse verified properties on our marketplace, and purchase fractional or full ownership tokens. Thanks to our fully ZK-proof architecture, there's no KYC step — just connect your wallet and start investing in under five minutes.",
	},
	{
		question: "Can I sell my property tokens anytime?",
		answer:
			"Yes. Property tokens are fully liquid and can be listed on the StrataDeed marketplace at any time. Our protocol supports instant peer-to-peer transfers with on-chain settlement, eliminating traditional real estate sale timelines of weeks or months.",
	},
];

export default function About() {
	const [openFaq, setOpenFaq] = useState<number | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
	const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

	const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
	const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

	const bgX = useTransform(springX, [-0.5, 0.5], ["-5%", "5%"]);
	const bgY = useTransform(springY, [-0.5, 0.5], ["-5%", "5%"]);

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!containerRef.current) return;
		const rect = containerRef.current.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width - 0.5;
		const y = (e.clientY - rect.top) / rect.height - 0.5;
		mouseX.set(x);
		mouseY.set(y);
	};

	const handleMouseLeave = () => {
		mouseX.set(0);
		mouseY.set(0);
	};

	const staggerEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
	const staggerVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: i * 0.1,
				duration: 0.8,
				ease: staggerEase,
			},
		}),
	};

	return (
		<div className="min-h-screen bg-white">
			{/* Cinematic Hero Section */}
			<section
				ref={containerRef}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden bg-gray-50 pt-24 md:pt-32 pb-16 md:pb-24">
				{/* Background Layer with Parallax */}
				<motion.div
					style={{ x: bgX, y: bgY }}
					className="absolute inset-0 z-0 pointer-events-none">
					<Image
						src="/images/unsplash-c627a92ad1ab.jpg"
						alt="Architecture"
						fill
						className="object-cover opacity-60 scale-110"
						priority
					/>
					<div className="absolute inset-0 bg-linear-to-br from-blue-50/90 via-white/40 to-cyan-50/50" />
					<div className="absolute inset-0 bg-blue-100/5 mix-blend-overlay" />
				</motion.div>

				{/* Floating Glow Nodes */}
				<div className="absolute inset-0 pointer-events-none overflow-hidden">
					{[...Array(6)].map((_, i) => (
						<motion.div
							key={i}
							animate={{
								y: [0, -60, 0],
								opacity: [0.1, 0.2, 0.1],
								scale: [1, 1.3, 1],
							}}
							transition={{
								duration: 8 + i * 3,
								repeat: Infinity,
								ease: "easeInOut",
								delay: i * 1,
							}}
							className={cn(
								"absolute rounded-full blur-[60px] md:blur-[100px]",
								i % 2 === 0 ? "bg-blue-600/20" : "bg-cyan-500/20",
							)}
							style={{
								width: `${150 + i * 50}px`,
								height: `${150 + i * 50}px`,
								left: `${(i * 20) % 100}%`,
								top: `${(i * 15) % 100}%`,
							}}
						/>
					))}
				</div>

				{/* Grain/Noise Overlay */}
				<div
					className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
					style={{
						backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')`,
					}}
				/>

				<div className="max-w-7xl mx-auto relative z-10 w-full px-4">
					<div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-20 items-center">
						<motion.div
							initial="hidden"
							animate="visible"
							className="space-y-6 md:space-y-12">
							<motion.div
								custom={0}
								variants={staggerVariants}
								className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-1.5 md:py-2 bg-white/40 border border-gray-200 rounded-full backdrop-blur-xl md:backdrop-blur-2xl shadow-sm">
								<div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-500 rounded-full animate-pulse" />
								<span className="text-[9px] md:text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] md:tracking-[0.5em] font-montserrat">
									Institutional Standard
								</span>
							</motion.div>

							{/* Updated: Changed from font-secondary to font-mclaren */}
							<motion.h1
								custom={1}
								variants={staggerVariants}
								className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-[0.9] tracking-tighter font-mclaren">
								Beyond <br />
								<motion.span
									animate={{
										color: ["#2563eb", "#06b6d4", "#2563eb"],
									}}
									transition={{ duration: 6, repeat: Infinity }}
									className="text-blue-600">
									Ownership.
								</motion.span>
							</motion.h1>

							<motion.p
								custom={2}
								variants={staggerVariants}
								className="text-sm lg:text-base text-gray-600 max-w-xl leading-relaxed font-medium font-montserrat">
								We are rebuilding the trust architecture of global real estate.
								Merging sovereign law with digital permanence.
							</motion.p>

							<motion.div
								custom={3}
								variants={staggerVariants}
								className="flex flex-col sm:flex-row gap-4 md:gap-6">
								<motion.div
									whileHover={{
										scale: 1.05,
										y: -5,
										backgroundColor: "#2563eb",
									}}
									whileTap={{ scale: 0.95 }}
									className="bg-gray-900 rounded-full">
									<Link
										href="/dashboard"
										className="group relative px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-white rounded-full font-black flex items-center justify-center gap-2 md:gap-4 transition-all duration-500 shadow-xl hover:shadow-blue-600/30 text-xs sm:text-sm font-montserrat">
										<span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] md:tracking-[0.4em]">
											Initialize Access
										</span>
										<div className="relative overflow-hidden w-4 h-4 sm:w-5 sm:h-5">
											<ArrowUpRight className="w-full h-full absolute group-hover:-translate-y-full group-hover:translate-x-full duration-500 transition-transform" />
											<ArrowUpRight className="w-full h-full absolute -translate-x-full translate-y-full group-hover:translate-y-0 group-hover:translate-x-0 duration-500 transition-transform" />
										</div>
									</Link>
								</motion.div>

								<motion.div
									whileHover={{
										scale: 1.05,
										y: -5,
										backgroundColor: "#f8fafc",
									}}
									whileTap={{ scale: 0.95 }}
									className="bg-white border border-gray-200 rounded-full">
									<Link
										href="/contact"
										className="group relative px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-gray-900 rounded-full font-black flex items-center justify-center gap-2 md:gap-4 transition-all duration-500 shadow-sm hover:shadow-black/5 text-xs sm:text-sm font-montserrat">
										<span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] md:tracking-[0.4em]">
											Contact Team
										</span>
										<div className="relative overflow-hidden w-4 h-4 sm:w-5 sm:h-5">
											<ArrowUpRight className="w-full h-full absolute group-hover:-translate-y-full group-hover:translate-x-full duration-500 transition-transform" />
											<ArrowUpRight className="w-full h-full absolute -translate-x-full translate-y-full group-hover:translate-y-0 group-hover:translate-x-0 duration-500 transition-transform" />
										</div>
									</Link>
								</motion.div>
							</motion.div>
						</motion.div>

						<motion.div
							style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
							className="relative hidden lg:block">
							<div
								className="relative rounded-3xl lg:rounded-[4rem] border border-gray-200/50 shadow-2xl lg:shadow-3xl overflow-hidden bg-white/70 backdrop-blur-2xl lg:backdrop-blur-3xl p-8 lg:p-12"
								style={{ transform: "translateZ(100px)" }}>
								{/* Scanline Effect */}
								<div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-500/5 to-transparent h-[10%] w-full animate-scan pointer-events-none" />

								<div className="grid grid-cols-2 gap-6 lg:gap-12 relative z-10">
									{[
										{ label: "Assets", value: "Verified" },
										{ label: "Stability", value: "100%" },
										{ label: "Latency", value: "<1.5s" },
										{ label: "Uptime", value: "24/7" },
									].map((s, i) => (
										<div
											key={i}
											className="group">
											<p className="text-[9px] lg:text-[10px] font-black text-blue-500/60 uppercase tracking-[0.3em] lg:tracking-[0.5em] mb-1 lg:mb-2 font-montserrat">
												{s.label}
											</p>
											<motion.h4
												whileHover={{ x: 5 }}
												className="text-2xl lg:text-4xl font-black text-gray-900 tracking-widest font-mclaren">
												{s.value}
											</motion.h4>
										</div>
									))}
								</div>
								<div className="mt-8 lg:mt-12 h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent" />
								<div className="mt-8 lg:mt-10 flex items-center gap-4 lg:gap-6">
									<div className="w-12 h-12 lg:w-16 lg:h-16 rounded-2xl lg:rounded-3xl bg-blue-600 flex items-center justify-center text-white shadow-lg lg:shadow-xl shadow-blue-600/40">
										<Shield className="w-6 h-6 lg:w-8 lg:h-8" />
									</div>
									<div>
										<p className="text-[10px] lg:text-[11px] font-black uppercase text-gray-400 tracking-widest font-montserrat">
											Security Standard
										</p>
										<p className="text-xs lg:text-sm font-bold text-gray-900 font-montserrat">
											Tier-1 Institutional Node
										</p>
									</div>
								</div>
							</div>

							{/* Orbiting Elements */}
							<motion.div
								animate={{ rotate: 360 }}
								transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
								className="absolute inset-0 border border-blue-500/10 rounded-full -m-10 lg:-m-20 pointer-events-none"
							/>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Core Protocol Section - Enhanced Reveal */}
			<section className="py-16 md:py-24 lg:py-40 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white relative overflow-hidden">
				<div className="max-w-7xl mx-auto relative z-10">
					<div className="grid lg:grid-cols-2 gap-12 lg:gap-32 items-center">
						<motion.div
							initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
							whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 1.2 }}
							className="relative aspect-square rounded-3xl lg:rounded-[4rem] overflow-hidden shadow-2xl lg:shadow-3xl group">
							<Image
								src="/images/unsplash-cc1a3fa10c00.jpg"
								alt="Future Infrastructure"
								fill
								className="object-cover transition-transform duration-[10s] group-hover:scale-110"
							/>
							<div className="absolute inset-0 bg-linear-to-t from-gray-900/60 via-transparent to-transparent" />

							<div className="absolute bottom-6 left-6 right-6 lg:bottom-12 lg:left-12 lg:right-12 p-4 lg:p-8 bg-white/10 backdrop-blur-xl lg:backdrop-blur-2xl border border-white/20 rounded-2xl lg:rounded-3xl">
								<p className="text-white text-sm lg:text-lg font-medium font-montserrat">
									StrataDeed Protocol v2.5
								</p>
								<div className="flex gap-1 lg:gap-2 mt-2 lg:mt-4">
									<div className="h-1 flex-1 bg-blue-500 rounded-full" />
									<div className="h-1 flex-1 bg-white/20 rounded-full" />
									<div className="h-1 flex-1 bg-white/20 rounded-full" />
								</div>
							</div>
						</motion.div>

						<div className="mt-8 lg:mt-0">
							<motion.div
								initial={{ opacity: 0, x: 30 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								className="inline-flex items-center gap-2 lg:gap-3 px-4 lg:px-6 py-1.5 lg:py-2 bg-blue-50 rounded-full mb-6 lg:mb-10">
								<Target className="w-3 h-3 lg:w-4 lg:h-4 text-blue-600" />
								<span className="text-[9px] lg:text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] lg:tracking-[0.5em] font-montserrat">
									The Protocol
								</span>
							</motion.div>

							{/* Updated: Changed from font-secondary to font-mclaren */}
							<motion.h2
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6 lg:mb-10 leading-[0.9] tracking-tighter font-mclaren">
								Redefining <br />
								<span className="text-blue-600">Execution.</span>
							</motion.h2>

							<motion.p
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								className="text-sm lg:text-base text-gray-600 mb-8 lg:mb-16 leading-relaxed font-medium font-montserrat">
								Traditional settlement is bound by regional bureaucracy.
								StrataDeed protocols automate title verification and asset
								fractionalization.
							</motion.p>

							<div className="space-y-8 lg:space-y-12">
								{[
									{
										title: "RealFi Institutional Standard",
										icon: Shield,
										text: "Operating within high-rigor legal frameworks.",
									},
									{
										title: "On-Chain Finality",
										icon: Zap,
										text: "Settlement in seconds, not months.",
									},
									{
										title: "Global Sovereignty",
										icon: Globe,
										text: "Your property, indexed on the global ledger.",
									},
								].map((item, i) => (
									<motion.div
										key={i}
										initial={{ opacity: 0, x: 20 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ delay: i * 0.2 }}
										className="flex items-start gap-4 lg:gap-8 group">
										<div className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-4xl bg-gray-50 flex items-center justify-center text-blue-600 transition-all duration-500 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 shadow-sm group-hover:shadow-blue-600/30 shrink-0">
											<item.icon className="w-6 h-6 lg:w-8 lg:h-8" />
										</div>
										<div>
											<h4 className="text-[10px] lg:text-[11px] font-black uppercase tracking-[0.2em] lg:tracking-[0.3em] text-gray-400 group-hover:text-gray-900 transition-colors mb-1 lg:mb-2 font-montserrat">
												{item.title}
											</h4>
											<p className="text-sm lg:text-lg text-gray-600 font-medium font-montserrat">
												{item.text}
											</p>
										</div>
									</motion.div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Background Decoration */}
				<div className="absolute top-1/2 -right-32 lg:-right-64 w-[250px] h-[250px] lg:w-[500px] lg:h-[500px] bg-blue-500/5 rounded-full blur-[60px] lg:blur-[120px] pointer-events-none" />
			</section>

			{/* Mission/Vision - Institutional Cards with Parallax */}
			<section className="py-16 md:py-24 lg:py-40 px-4 sm:px-6 lg:px-8 xl:px-12 bg-gray-50 overflow-hidden relative">
				<div className="max-w-7xl mx-auto relative z-10">
					{/* Updated: Changed from font-secondary to font-mclaren */}
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-center mb-12 lg:mb-32">
						<h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter font-mclaren">
							Our <span className="text-blue-600">Purpose.</span>
						</h2>
					</motion.div>

					<div className="grid lg:grid-cols-2 gap-8 lg:gap-24">
						{/* Mission Card */}
						<motion.div
							whileHover={{ y: -15, rotateY: -5, scale: 1.01 }}
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className="relative rounded-3xl lg:rounded-[5rem] bg-gray-900 overflow-hidden p-6 lg:p-16 xl:p-24 shadow-xl lg:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] text-white min-h-[500px] lg:min-h-[750px] flex flex-col justify-end group cursor-default">
							{/* Background Image Layer */}
							<div className="absolute inset-0">
								<Image
									src="/images/unsplash-e363dbe005cb.jpg"
									alt="Mission"
									fill
									className="object-cover opacity-40 transition-transform duration-[20s] group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/40 to-transparent" />
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

							<div className="relative z-10 space-y-4 lg:space-y-8">
								<motion.div
									initial={{ opacity: 0, scale: 0.8 }}
									whileInView={{ opacity: 1, scale: 1 }}
									className="w-16 h-16 lg:w-24 lg:h-24 rounded-2xl lg:rounded-[2.5rem] bg-white/10 backdrop-blur-2xl lg:backdrop-blur-3xl border border-white/20 flex items-center justify-center mb-6 lg:mb-10 shadow-lg lg:shadow-2xl transition-transform duration-700 group-hover:rotate-12">
									<Target className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
								</motion.div>
								{/* Updated: Changed to font-mclaren */}
								<h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter leading-[0.9] font-mclaren">
									mission <br />
									<span className="text-blue-500">Statement</span>
								</h3>
								<p className="text-base lg:text-xl text-white/80 leading-relaxed font-medium max-w-sm font-montserrat">
									Merging legal rigor with digital permanence to rebuild trust
									in global property settlement.
								</p>

								<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6 cursor-pointer pt-4 lg:pt-6">
									<motion.div
										whileHover={{
											scale: 1.05,
											y: -5,
											backgroundColor: "#2563eb",
											color: "#ffffff",
											transition: { duration: 0.3 },
										}}
										whileTap={{ scale: 0.95 }}
										className="flex items-center gap-2 lg:gap-3 px-6 lg:px-10 py-3 lg:py-5 rounded-full bg-white text-gray-900 font-black text-[10px] lg:text-[11px] uppercase tracking-[0.3em] lg:tracking-[0.4em] shadow-lg lg:shadow-2xl transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(59,130,246,0.5)] font-montserrat">
										View Protocol
										<ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
									</motion.div>
									<div className="hidden sm:flex items-center gap-2 lg:gap-3 text-white/30">
										<Shield className="w-4 h-4 lg:w-5 lg:h-5" />
										<span className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.3em] lg:tracking-[0.4em] font-montserrat">
											Verified Framework
										</span>
									</div>
								</div>
							</div>
						</motion.div>

						{/* Vision Card */}
						<motion.div
							whileHover={{ y: -15, rotateY: 5, scale: 1.01 }}
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className="relative rounded-3xl lg:rounded-[5rem] bg-gray-900 overflow-hidden p-6 lg:p-16 xl:p-24 shadow-xl lg:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] text-white min-h-[500px] lg:min-h-[750px] flex flex-col justify-end group cursor-default">
							<div className="absolute inset-0">
								<Image
									src="/images/unsplash-9991f1c4c750.jpg"
									alt="Vision"
									fill
									className="object-cover opacity-40 transition-transform duration-[20s] group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/40 to-transparent" />
								<div className="absolute inset-0 bg-cyan-900/10 mix-blend-color group-hover:bg-cyan-600/20 transition-colors duration-1000" />
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
									repeatDelay: 3,
								}}
								className="absolute top-0 w-1/2 h-full bg-linear-to-r from-transparent via-white to-transparent -skew-x-12 z-20 pointer-events-none"
							/>

							<div className="relative z-10 space-y-4 lg:space-y-8">
								<motion.div
									initial={{ opacity: 0, scale: 0.8 }}
									whileInView={{ opacity: 1, scale: 1 }}
									className="w-16 h-16 lg:w-24 lg:h-24 rounded-2xl lg:rounded-[2.5rem] bg-white/10 backdrop-blur-2xl lg:backdrop-blur-3xl border border-white/20 flex items-center justify-center mb-6 lg:mb-10 shadow-lg lg:shadow-2xl transition-transform duration-700 group-hover:-rotate-12">
									<Eye className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
								</motion.div>
								{/* Updated: Changed to font-mclaren */}
								<h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter leading-[0.9] font-mclaren">
									future <br />
									<span className="text-cyan-400">Vision</span>
								</h3>
								<p className="text-base lg:text-xl text-white/80 leading-relaxed font-medium max-w-sm font-montserrat">
									A borderless world where property is liquid, transparent, and
									indexed for the next century.
								</p>

								<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6 cursor-pointer pt-4 lg:pt-6">
									<motion.div
										whileHover={{
											scale: 1.05,
											y: -5,
											backgroundColor: "#0891b2",
											color: "#ffffff",
											transition: { duration: 0.3 },
										}}
										whileTap={{ scale: 0.95 }}
										className="flex items-center gap-2 lg:gap-3 px-6 lg:px-10 py-3 lg:py-5 rounded-full bg-white text-gray-900 font-black text-[10px] lg:text-[11px] uppercase tracking-[0.3em] lg:tracking-[0.4em] shadow-lg lg:shadow-2xl transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(34,211,238,0.5)] font-montserrat">
										Global Roadmap
										<ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
									</motion.div>
									<div className="hidden sm:flex items-center gap-2 lg:gap-3 text-white/30">
										<Globe className="w-4 h-4 lg:w-5 lg:h-5" />
										<span className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.3em] lg:tracking-[0.4em] font-montserrat">
											Institutional Access
										</span>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>

				{/* Decorative Grid */}
				<div
					className="absolute inset-0 opacity-[0.05] pointer-events-none"
					style={{
						backgroundImage: `radial-gradient(circle at 1px 1px, #2563eb 1px, transparent 0)`,
						backgroundSize: "40px 40px",
					}}
				/>
			</section>

			{/* Animated FAQ Section — Split Layout */}
			<section className="py-16 md:py-24 lg:py-40 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white relative overflow-hidden">
				<div className="max-w-7xl mx-auto relative z-10">
					{/* Section Header */}
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
						className="text-center mb-12 lg:mb-20">
						<div className="inline-flex items-center gap-2 lg:gap-3 px-4 lg:px-6 py-1.5 lg:py-2 bg-blue-50 rounded-full mb-6 lg:mb-10">
							<HelpCircle className="w-3 h-3 lg:w-4 lg:h-4 text-blue-600" />
							<span className="text-[9px] lg:text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] lg:tracking-[0.5em] font-montserrat">
								Frequently Asked
							</span>
						</div>
						<h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter font-mclaren">
							Got <span className="text-blue-600">Questions?</span>
						</h2>
						<p className="mt-4 lg:mt-6 text-sm lg:text-base text-gray-500 font-medium font-montserrat max-w-xl mx-auto">
							Everything you need to know about StrataDeed, property
							tokenization, and getting started.
						</p>
					</motion.div>

					{/* Two-Column: Graphics Left / FAQs Right */}
					<div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-start">
						{/* Left — Illustrative Graphics */}
						<motion.div
							initial={{ opacity: 0, x: -60 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
							className="relative hidden lg:flex items-center justify-center min-h-[560px] sticky top-32">
							{/* Large glowing backdrop circle */}
							<motion.div
								animate={{
									scale: [1, 1.08, 1],
									opacity: [0.15, 0.25, 0.15],
								}}
								transition={{
									duration: 6,
									repeat: Infinity,
									ease: "easeInOut",
								}}
								className="absolute w-[380px] h-[380px] bg-blue-500 rounded-full blur-[100px]"
							/>

							{/* Central card */}
							<motion.div
								animate={{ y: [0, -12, 0] }}
								transition={{
									duration: 5,
									repeat: Infinity,
									ease: "easeInOut",
								}}
								className="relative z-10 w-[300px] bg-white/80 backdrop-blur-2xl rounded-[2.5rem] border border-gray-200/60 shadow-2xl p-8 space-y-5">
								{/* Platform badge */}
								<div className="flex items-center gap-3">
									<div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-600/30">
										<Building2 className="w-6 h-6 text-white" />
									</div>
									<div>
										<p className="text-[10px] font-black uppercase text-gray-400 tracking-widest font-montserrat">
											StrataDeed
										</p>
										<p className="text-sm font-bold text-gray-900 font-montserrat">
											Real Estate Protocol
										</p>
									</div>
								</div>
								<div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

								{/* Animated feature carousel */}
								<div className="space-y-4">
									{[
										{
											icon: Shield,
											label: "ZK-Proof",
											value: "Private",
											color: "text-blue-600",
										},
										{
											icon: Zap,
											label: "Settlement",
											value: "<1.5s",
											color: "text-cyan-600",
										},
										{
											icon: Users,
											label: "Fractional",
											value: "0.01%",
											color: "text-indigo-600",
										},
									].map((feat, idx) => (
										<motion.div
											key={idx}
											initial={{ opacity: 0, x: -20 }}
											whileInView={{ opacity: 1, x: 0 }}
											viewport={{ once: true }}
											transition={{ delay: 0.6 + idx * 0.2, duration: 0.5 }}
											className="flex items-center justify-between">
											<div className="flex items-center gap-2.5">
												<div
													className={cn(
														"w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center",
														feat.color,
													)}>
													<feat.icon className="w-4 h-4" />
												</div>
												<span className="text-[10px] font-black uppercase tracking-widest text-gray-400 font-montserrat">
													{feat.label}
												</span>
											</div>
											<span className="text-sm font-black text-gray-900 font-mclaren">
												{feat.value}
											</span>
										</motion.div>
									))}
								</div>

								<div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

								{/* Tokenization progress */}
								<div className="space-y-2">
									<div className="flex justify-between text-[9px] font-black uppercase tracking-widest font-montserrat">
										<span className="text-gray-400">Assets Tokenized</span>
										<span className="text-blue-600">Growing</span>
									</div>
									<div className="h-2 bg-gray-100 rounded-full overflow-hidden">
										<motion.div
											initial={{ width: "0%" }}
											whileInView={{ width: "85%" }}
											viewport={{ once: true }}
											transition={{
												duration: 2,
												delay: 0.5,
												ease: [0.16, 1, 0.3, 1],
											}}
											className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400 rounded-full"
										/>
									</div>
								</div>

								{/* Global status */}
								<div className="flex items-center gap-2 pt-1">
									<motion.div
										animate={{ scale: [1, 1.3, 1] }}
										transition={{ duration: 2, repeat: Infinity }}
										className="w-2 h-2 bg-emerald-500 rounded-full"
									/>
									<span className="text-[10px] font-bold text-gray-500 font-montserrat">
										Live on Sui Network — Global Access
									</span>
								</div>
							</motion.div>

							{/* Orbiting floating icons */}
							{[
								{
									icon: Globe,
									label: "Global",
									size: 48,
									delay: 0,
									x: -130,
									y: -170,
									color: "bg-cyan-500",
								},
								{
									icon: Lock,
									label: "Secure",
									size: 44,
									delay: 1.5,
									x: 140,
									y: -130,
									color: "bg-blue-600",
								},
								{
									icon: TrendingUp,
									label: "Yield",
									size: 40,
									delay: 0.8,
									x: -150,
									y: 90,
									color: "bg-indigo-500",
								},
								{
									icon: Sparkles,
									label: "Mint",
									size: 44,
									delay: 2,
									x: 150,
									y: 120,
									color: "bg-violet-500",
								},
								{
									icon: CheckCircle2,
									label: "Verified",
									size: 38,
									delay: 0.5,
									x: 10,
									y: 210,
									color: "bg-emerald-500",
								},
							].map((item, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, scale: 0 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true }}
									transition={{
										delay: 0.3 + item.delay * 0.3,
										duration: 0.6,
										ease: "backOut",
									}}
									animate={{
										y: [item.y, item.y - 15, item.y],
										x: [item.x, item.x + (i % 2 === 0 ? 8 : -8), item.x],
									}}
									className="absolute z-20 flex flex-col items-center"
									style={{
										transition: `transform ${3 + i}s ease-in-out`,
									}}>
									<motion.div
										animate={{
											y: [0, -14, 0],
											rotate: [0, i % 2 === 0 ? 8 : -8, 0],
										}}
										transition={{
											duration: 3 + i * 0.7,
											repeat: Infinity,
											ease: "easeInOut",
											delay: item.delay,
										}}
										className={cn(
											"rounded-2xl shadow-lg flex items-center justify-center text-white",
											item.color,
										)}
										style={{ width: item.size, height: item.size }}>
										<item.icon className="w-5 h-5" />
									</motion.div>
									<span className="text-[8px] font-black uppercase tracking-widest text-gray-400 font-montserrat mt-1.5 text-center whitespace-nowrap">
										{item.label}
									</span>
								</motion.div>
							))}

							{/* Rotating orbit ring */}
							<motion.div
								animate={{ rotate: 360 }}
								transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
								className="absolute w-[420px] h-[420px] rounded-full border border-dashed border-blue-200/40 pointer-events-none"
							/>
							<motion.div
								animate={{ rotate: -360 }}
								transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
								className="absolute w-[320px] h-[320px] rounded-full border border-blue-100/30 pointer-events-none"
							/>

							{/* Decorative dots */}
							{[...Array(8)].map((_, i) => {
								const angle = (i / 8) * Math.PI * 2;
								const radius = 200;
								return (
									<motion.div
										key={`dot-${i}`}
										animate={{
											opacity: [0.2, 0.6, 0.2],
											scale: [1, 1.5, 1],
										}}
										transition={{
											duration: 3,
											repeat: Infinity,
											delay: i * 0.4,
											ease: "easeInOut",
										}}
										className="absolute w-2 h-2 bg-blue-500 rounded-full"
										style={{
											left: `calc(50% + ${Math.cos(angle) * radius}px)`,
											top: `calc(50% + ${Math.sin(angle) * radius}px)`,
										}}
									/>
								);
							})}
						</motion.div>

						{/* Right — FAQ Accordion */}
						<div className="space-y-3 lg:space-y-4">
							{faqItems.map((faq, i) => {
								const isOpen = openFaq === i;
								return (
									<motion.div
										key={i}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{
											delay: i * 0.08,
											duration: 0.6,
											ease: [0.16, 1, 0.3, 1],
										}}
										className={cn(
											"rounded-2xl lg:rounded-3xl border transition-all duration-500",
											isOpen
												? "bg-blue-50/50 border-blue-200/60 shadow-lg shadow-blue-600/5"
												: "bg-gray-50/50 border-gray-200/60 hover:border-gray-300 hover:shadow-md",
										)}>
										<button
											onClick={() => setOpenFaq(isOpen ? null : i)}
											className="w-full flex items-center justify-between gap-4 px-5 lg:px-8 py-4 lg:py-6 text-left cursor-pointer group">
											<div className="flex items-center gap-3 lg:gap-4">
												<motion.div
													animate={{
														backgroundColor: isOpen ? "#2563eb" : "#f3f4f6",
														color: isOpen ? "#ffffff" : "#6b7280",
													}}
													transition={{ duration: 0.3 }}
													className="w-8 h-8 lg:w-9 lg:h-9 rounded-xl lg:rounded-xl flex items-center justify-center shrink-0 text-xs font-black font-montserrat">
													{String(i + 1).padStart(2, "0")}
												</motion.div>
												<span
													className={cn(
														"text-sm lg:text-[15px] font-bold transition-colors duration-300 font-montserrat",
														isOpen
															? "text-blue-900"
															: "text-gray-700 group-hover:text-gray-900",
													)}>
													{faq.question}
												</span>
											</div>
											<motion.div
												animate={{ rotate: isOpen ? 180 : 0 }}
												transition={{
													duration: 0.4,
													ease: [0.16, 1, 0.3, 1],
												}}
												className={cn(
													"shrink-0 w-8 h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center transition-colors duration-300",
													isOpen
														? "bg-blue-600 text-white"
														: "bg-white text-gray-400 border border-gray-200 group-hover:border-gray-300",
												)}>
												<ChevronDown className="w-4 h-4" />
											</motion.div>
										</button>
										<AnimatePresence initial={false}>
											{isOpen && (
												<motion.div
													initial={{ height: 0, opacity: 0 }}
													animate={{ height: "auto", opacity: 1 }}
													exit={{ height: 0, opacity: 0 }}
													transition={{
														height: {
															duration: 0.4,
															ease: [0.16, 1, 0.3, 1],
														},
														opacity: { duration: 0.25, delay: 0.1 },
													}}
													className="overflow-hidden">
													<div className="px-5 lg:px-8 pb-5 lg:pb-7 pl-16 lg:pl-[4.75rem]">
														<motion.p
															initial={{ y: -10 }}
															animate={{ y: 0 }}
															transition={{ duration: 0.3, delay: 0.15 }}
															className="text-sm lg:text-[15px] text-gray-600 leading-relaxed font-medium font-montserrat">
															{faq.answer}
														</motion.p>
													</div>
												</motion.div>
											)}
										</AnimatePresence>
									</motion.div>
								);
							})}

							{/* Bottom prompt */}
							<motion.div
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ delay: 0.5 }}
								className="text-center pt-8 lg:pt-12">
								<p className="text-xs lg:text-sm text-gray-400 font-medium font-montserrat">
									Still have questions?{" "}
									<Link
										href="/contact"
										className="text-blue-600 hover:text-blue-700 font-bold underline underline-offset-4 decoration-blue-600/30 hover:decoration-blue-600/60 transition-colors">
										Reach out to our team
									</Link>
								</p>
							</motion.div>
						</div>
					</div>
				</div>

				{/* Background decoration */}
				<div className="absolute top-1/2 -left-32 lg:-left-64 w-[250px] h-[250px] lg:w-[500px] lg:h-[500px] bg-blue-500/5 rounded-full blur-[60px] lg:blur-[120px] pointer-events-none" />
				<div
					className="absolute inset-0 opacity-[0.02] pointer-events-none"
					style={{
						backgroundImage: `radial-gradient(circle at 1px 1px, #2563eb 1px, transparent 0)`,
						backgroundSize: "32px 32px",
					}}
				/>
			</section>

			{/* Final CTA Redesigned - Deep Parallax */}
			<section className="relative py-20 md:py-32 lg:py-40 xl:py-64 bg-white overflow-hidden">
				<div className="max-w-5xl mx-auto relative z-10 text-center px-4">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="space-y-8 lg:space-y-16">
						<div className="inline-flex items-center gap-2 lg:gap-3 px-4 lg:px-8 py-2 lg:py-3 bg-blue-50 border border-blue-100 rounded-full mb-2 lg:mb-4 shadow-sm">
							<Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600 animate-spin-slow" />
							<span className="text-[10px] lg:text-[11px] font-black text-blue-600 uppercase tracking-[0.4em] lg:tracking-[0.6em] font-montserrat">
								Build with us
							</span>
						</div>

						{/* Updated: Changed from font-secondary to font-mclaren */}
						<h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-[0.9] tracking-tighter font-mclaren">
							join the <br />
							<motion.span
								animate={{ opacity: [1, 0.5, 1] }}
								transition={{ duration: 4, repeat: Infinity }}
								className="text-blue-600">
								evolution.
							</motion.span>
						</h2>

						<div className="flex flex-col sm:flex-row gap-4 lg:gap-8 justify-center items-center">
							<motion.div
								whileHover={{ scale: 1.05, y: -5 }}
								whileTap={{ scale: 0.95 }}
								className="group relative w-full sm:w-auto">
								<div className="absolute -inset-2 lg:-inset-4 bg-blue-600/20 blur-xl lg:blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
								<Link
									href="/dashboard"
									className="relative bg-gray-900 px-8 lg:px-16 py-4 lg:py-7 text-white rounded-full font-black flex items-center justify-center gap-4 lg:gap-6 transition-all duration-500 shadow-xl lg:shadow-2xl w-full text-sm lg:text-base font-montserrat">
									<span className="text-[11px] lg:text-[12px] uppercase tracking-[0.3em] lg:tracking-[0.5em]">
										Start Investing
									</span>
									<ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-2 transition-transform" />
								</Link>
							</motion.div>

							<motion.div
								whileHover={{ scale: 1.05, y: -5 }}
								whileTap={{ scale: 0.95 }}
								className="group relative w-full sm:w-auto">
								<Link
									href="/contact"
									className="relative bg-white border-2 border-gray-200 px-8 lg:px-16 py-4 lg:py-7 text-gray-900 rounded-full font-black flex items-center justify-center gap-4 lg:gap-6 transition-all duration-500 hover:border-blue-600/30 w-full text-sm lg:text-base font-montserrat">
									<span className="text-[11px] lg:text-[12px] uppercase tracking-[0.3em] lg:tracking-[0.5em]">
										Contact Team
									</span>
									<ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-2 transition-transform" />
								</Link>
							</motion.div>
						</div>
					</motion.div>
				</div>

				{/* Background Grid Lines */}
				<div className="absolute inset-x-0 bottom-0 h-48 lg:h-96 bg-linear-to-t from-blue-50/50 to-transparent pointer-events-none" />
				<div
					className="absolute inset-0 opacity-[0.03] pointer-events-none"
					style={{
						backgroundImage: `linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)`,
						backgroundSize: "40px 40px",
					}}
				/>
			</section>

			<ScrollToTopButton />
		</div>
	);
}
