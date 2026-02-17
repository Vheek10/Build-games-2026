/** @format */
"use client";

import {
	ArrowRight,
	ArrowUpRight,
	Shield,
	CheckCircle,
	Zap,
	Globe,
	Building2,
	Check,
	Target,
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function FinalCTASection() {
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

	const benefits = [
		{ icon: Shield, text: "Bank-grade security", color: "blue" },
		{ icon: CheckCircle, text: "Verified ownership", color: "cyan" },
		{ icon: Zap, text: "Instant transactions", color: "amber" },
		{ icon: Globe, text: "Global accessibility", color: "blue" },
	];

	return (
		<section
			ref={containerRef}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			className="relative py-16 sm:py-24 lg:py-40 px-4 sm:px-6 lg:px-12 overflow-hidden bg-gray-50">
			{/* Cinematic Background Layer */}
			<motion.div
				style={{ x: bgX, y: bgY }}
				className="absolute inset-0 z-0 pointer-events-none">
				<Image
					src="/images/unsplash-c627a92ad1ab.jpg"
					alt="Cinematic Infrastructure"
					fill
					className="object-cover opacity-70 scale-110"
					priority
				/>
				<div className="absolute inset-0 bg-linear-to-br from-blue-50/80 via-white/40 to-cyan-50/50" />
				<div className="absolute inset-0 bg-blue-100/10 mix-blend-overlay" />
			</motion.div>

			{/* Floating Ambient Nodes */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden h-full">
				{[...Array(5)].map((_, i) => (
					<motion.div
						key={i}
						animate={{
							y: [0, -40, 0],
							opacity: [0.05, 0.15, 0.05],
							scale: [1, 1.2, 1],
						}}
						transition={{
							duration: 10 + i * 2,
							repeat: Infinity,
							ease: "easeInOut",
							delay: i * 1.5,
						}}
						className={cn(
							"absolute rounded-full blur-3xl",
							i % 2 === 0 ? "bg-blue-600/10" : "bg-cyan-600/10",
						)}
						style={{
							width: `${200 + i * 50}px`,
							height: `${200 + i * 50}px`,
							left: `${10 + i * 20}%`,
							top: `${20 + i * 15}%`,
						}}
					/>
				))}
			</div>

			{/* Grid Lines Pattern */}
			<div
				className="absolute inset-0 opacity-[0.05] pointer-events-none"
				style={{
					backgroundImage: `radial-gradient(circle at 1px 1px, #2563eb 1px, transparent 0)`,
					backgroundSize: "40px 40px",
				}}
			/>

			<div className="max-w-7xl mx-auto relative z-10">
				<motion.div
					style={{
						rotateX,
						rotateY,
						transformStyle: "preserve-3d",
					}}
					className="relative">
					{/* Badge */}
					<div
						className="flex justify-center mb-12"
						style={{ transform: "translateZ(50px)" }}>
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							className="inline-flex items-center gap-3 px-6 py-2 bg-white/40 border border-gray-200 rounded-full backdrop-blur-2xl shadow-sm">
							<div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse blur-[1px]" />
							<span className="text-[9px] sm:text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] sm:tracking-[0.5em] font-montserrat">
								Future of Ownership
							</span>
							<Shield className="w-3.5 h-3.5 text-blue-600/40" />
						</motion.div>
					</div>

					{/* Heading Group */}
					<div
						className="text-center mb-20"
						style={{ transform: "translateZ(80px)" }}>
						<motion.h2
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8 }}
							className="text-3xl sm:text-4xl lg:text-7xl font-black text-gray-900 mb-8 sm:mb-10 leading-[1.05] tracking-tightest font-mclaren">
							The Secure <span className="text-blue-600">Gateway</span> <br />
							to Institutional Assets.
						</motion.h2>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8, delay: 0.1 }}
							className="text-sm lg:text-lg text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed font-montserrat">
							No hidden processes. No manual errors. No silent title issues.
							Just secure, transparent, and accessible real estate ownership for
							everyone.
						</motion.p>
					</div>

					{/* Benefits Grid */}
					<div
						className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 px-4"
						style={{ transform: "translateZ(40px)" }}>
						{benefits.map((benefit, idx) => (
							<motion.div
								key={idx}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: idx * 0.1 }}
								whileHover={{ y: -10, transition: { duration: 0.3 } }}
								className="group p-6 sm:p-8 bg-white/60 border border-gray-100 rounded-4xl sm:rounded-[2.5rem] hover:bg-white hover:border-blue-100 backdrop-blur-3xl transition-all duration-500 text-center shadow-sm hover:shadow-xl hover:shadow-blue-900/5">
								<div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-500">
									<benefit.icon className="w-6 h-6 text-blue-600" />
								</div>
								<h4 className="text-[9px] font-black text-gray-400 group-hover:text-gray-900 uppercase tracking-[0.3em] transition-colors font-montserrat">
									{benefit.text}
								</h4>
							</motion.div>
						))}
					</div>

					{/* CTA Buttons */}
					<div
						className="flex flex-col sm:flex-row gap-6 justify-center mb-24"
						style={{ transform: "translateZ(100px)" }}>
						<motion.div
							whileHover={{
								scale: 1.1,
								y: -5,
								backgroundColor: "#f8fafc", // off-white
								transition: { duration: 0.4 },
							}}
							whileTap={{ scale: 0.95 }}
							className="bg-white rounded-full">
							<Link
								href="/dashboard"
								className="group relative px-8 sm:px-14 py-4 sm:py-6 text-gray-900 rounded-full font-black overflow-hidden transition-all duration-500 hover:shadow-[0_40px_80px_-15px_rgba(255,255,255,0.4)] text-center flex items-center justify-center gap-4">
								<span className="text-[9px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.4em] text-center leading-tight sm:whitespace-nowrap font-montserrat">
									Initialize Access
								</span>
								<ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
							</Link>
						</motion.div>

						<motion.div
							whileHover={{
								scale: 1.1,
								y: -5,
								backgroundColor: "rgba(255, 255, 255, 0.15)",
								borderColor: "rgba(255, 255, 255, 0.4)",
								transition: { duration: 0.4 },
							}}
							whileTap={{ scale: 0.95 }}
							className="bg-white/5 border border-white/20 rounded-full backdrop-blur-2xl">
							<Link
								href="/mint"
								className="group relative px-8 sm:px-14 py-4 sm:py-6 text-white rounded-full font-black transition-all duration-500 hover:shadow-[0_40px_80px_-15px_rgba(255,255,255,0.1)] text-center flex items-center justify-center gap-4">
								<span className="text-[9px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.4em] text-center leading-tight sm:whitespace-nowrap font-montserrat">
									Deploy Asset
								</span>
								<ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
							</Link>
						</motion.div>
					</div>

					{/* Unified Stats Row */}
					<div
						className="pt-20 border-t border-gray-200"
						style={{ transform: "translateZ(30px)" }}>
						<div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
							{[
								{ label: "Finality", value: "< 2.0s" },
								{ label: "Accuracy", value: "100%" },
								{ label: "Uptime", value: "24/7" },
								{ label: "Assets", value: "Verified" },
							].map((s, i) => (
								<div
									key={i}
									className="text-center group">
									<p className="text-[8px] sm:text-[9px] font-black text-blue-500/60 uppercase tracking-[0.3em] sm:tracking-[0.5em] mb-2 font-montserrat">
										{s.label}
									</p>
									<h4 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-widest group-hover:text-blue-600 transition-colors uppercase font-mclaren">
										{s.value}
									</h4>
								</div>
							))}
						</div>
					</div>
				</motion.div>
			</div>

			{/* Corner Accents */}
			<div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/5 blur-[150px] pointer-events-none" />
			<div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-cyan-500/5 blur-[150px] pointer-events-none" />
		</section>
	);
}
