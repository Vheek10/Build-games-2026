/** @format */
"use client";

import {
	FileCheck,
	Shield,
	Database,
	CheckCircle,
	Zap,
	Globe,
	ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { getRandomImage } from "@/utils/realEstateImages";
import {
	motion,
	AnimatePresence,
	useMotionValue,
	useSpring,
	useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

const steps = [
	{
		number: "01",
		icon: FileCheck,
		title: "Digitize Property",
		description:
			"Transform real estate into secure digital tokens with automated verification",
		color: "blue",
		imageCategory: "modern-buildings",
		stats: ["< 48h Verification", "99.8% Success"],
	},
	{
		number: "02",
		icon: Shield,
		title: "Secure Investment",
		description:
			"Fractional ownership through blockchain-powered smart contracts",
		color: "emerald",
		imageCategory: "blockchain-tech",
		stats: ["Global 24/7 Access", "Zero Disputes"],
	},
	{
		number: "03",
		icon: Database,
		title: "Track and Manage",
		description: "Real-time transparency with immutable blockchain records",
		color: "cyan",
		imageCategory: "cityscapes",
		stats: ["< 2min Transactions", "Bank-Grade Security"],
	},
];

// 3D Tilt Card Component for Elementor-like effect
function TiltCard({ children, className, isActive }: any) {
	const ref = useRef<HTMLDivElement>(null);
	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
	const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

	const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
	const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!ref.current) return;
		const rect = ref.current.getBoundingClientRect();
		const width = rect.width;
		const height = rect.height;
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;
		const xPct = mouseX / width - 0.5;
		const yPct = mouseY / height - 0.5;
		x.set(xPct);
		y.set(yPct);
	};

	const handleMouseLeave = () => {
		x.set(0);
		y.set(0);
	};

	return (
		<motion.div
			ref={ref}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={{
				rotateX: isActive ? rotateX : 0,
				rotateY: isActive ? rotateY : 0,
				transformStyle: "preserve-3d",
			}}
			className={cn("relative w-full h-full", className)}>
			{children}
		</motion.div>
	);
}

export default function HowItWorksSection() {
	const [activeStep, setActiveStep] = useState(0);
	const [images, setImages] = useState<string[]>([]);
	const [isAutoPlay, setIsAutoPlay] = useState(true);

	useEffect(() => {
		const loadedImages = steps.map(
			(step) => getRandomImage(step.imageCategory as any).url,
		);
		setImages(loadedImages);
	}, []);

	useEffect(() => {
		if (!isAutoPlay || !images.length) return;
		const interval = setInterval(() => {
			setActiveStep((prev) => (prev + 1) % steps.length);
		}, 5000);
		return () => clearInterval(interval);
	}, [isAutoPlay, images]);

	const colorMap: {
		[key: string]: {
			bg: string;
			text: string;
			bgLight: string;
			border: string;
			from: string;
			to: string;
		};
	} = {
		blue: {
			bg: "bg-blue-600",
			text: "text-blue-400",
			bgLight: "bg-blue-500/20",
			border: "border-blue-500/50",
			from: "from-blue-600",
			to: "to-blue-400",
		},
		emerald: {
			bg: "bg-emerald-600",
			text: "text-emerald-400",
			bgLight: "bg-emerald-500/20",
			border: "border-emerald-500/50",
			from: "from-emerald-600",
			to: "to-emerald-400",
		},
		cyan: {
			bg: "bg-cyan-600",
			text: "text-cyan-400",
			bgLight: "bg-cyan-500/20",
			border: "border-cyan-500/50",
			from: "from-cyan-600",
			to: "to-cyan-400",
		},
	};

	const getColor = (colorName: string) => colorMap[colorName] || colorMap.blue;

	if (!images.length) {
		return (
			<section className="py-20 px-4 sm:px-6 bg-white">
				<div className="max-w-7xl mx-auto">
					<div className="animate-pulse space-y-8">
						<div className="h-12 bg-gray-200 rounded-lg w-1/3 mx-auto"></div>
						<div className="h-[500px] bg-gray-200 rounded-2xl w-full"></div>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="py-12 sm:py-20 bg-gray-50 overflow-hidden relative">
			{/* Decorative Background Elements */}
			<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
				<div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-100/30 rounded-full blur-3xl opacity-60" />
				<div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-emerald-100/30 rounded-full blur-3xl opacity-60" />
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
				{/* Header - Staggered Entrance */}
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
					variants={{
						hidden: { opacity: 0, y: 30 },
						visible: {
							opacity: 1,
							y: 0,
							transition: { staggerChildren: 0.15, duration: 0.6 },
						},
					}}
					className="text-center mb-16 lg:mb-24">
					<motion.div
						variants={{
							hidden: { opacity: 0, y: 10 },
							visible: { opacity: 1, y: 0 },
						}}
						className="inline-flex items-center gap-3 px-6 py-2 bg-blue-600/5 rounded-full mb-10 border border-blue-600/10">
						<Zap className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
						<span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.4em] font-montserrat">
							The StrataDeed Protocol
						</span>
					</motion.div>

					<motion.h2
						variants={{
							hidden: { opacity: 0, y: 30 },
							visible: { opacity: 1, y: 0 },
						}}
						className="text-3xl lg:text-4xl font-black text-gray-900 mb-8 tracking-tighter leading-[1.1] font-mclaren">
						How we digitize <br />
						<span className="text-blue-600">Global Assets.</span>
					</motion.h2>

					<motion.p
						variants={{
							hidden: { opacity: 0, y: 20 },
							visible: { opacity: 1, y: 0 },
						}}
						className="text-sm lg:text-base text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed font-montserrat">
						We've collapsed months of legal friction into seconds of
						cryptographic finality. Own the world in three institutional-grade
						layers.
					</motion.p>
				</motion.div>

				{/* Accordion Cards */}
				<div className="flex flex-col lg:flex-row gap-6 h-[800px] lg:h-[600px] mb-12 perspective-1000">
					{steps.map((step, index) => {
						const isActive = activeStep === index;
						const colors = getColor(step.color);

						return (
							<motion.div
								key={step.number}
								layout
								onMouseEnter={() => {
									setActiveStep(index);
									setIsAutoPlay(false);
								}}
								onClick={() => {
									setActiveStep(index);
									setIsAutoPlay(false);
								}}
								className={cn(
									"relative rounded-3xl overflow-hidden cursor-pointer shadow-xl",
									"lg:h-full",
									isActive ? "flex-3 lg:flex-3" : "flex-1 lg:flex-1",
								)}
								animate={{
									flex: isActive ? 3 : 1,
								}}
								transition={{
									type: "spring",
									stiffness: 280,
									damping: 24,
								}}>
								<TiltCard
									isActive={isActive}
									className="w-full h-full">
									{/* Background Image */}
									<Image
										src={images[index]}
										alt={step.title}
										fill
										className={cn(
											"object-cover transition-transform duration-1000 ease-out",
											isActive
												? "scale-110"
												: "scale-100 grayscale hover:grayscale-0",
										)}
										priority={index === 0}
									/>

									{/* Animated Overlay */}
									<div
										className={cn(
											"absolute inset-0 transition-all duration-500",
											isActive
												? "bg-linear-to-t from-gray-900 via-gray-900/40 to-transparent opacity-90"
												: "bg-black/60 hover:bg-black/40",
										)}
									/>

									{/* Floating Elements for Active State */}
									{isActive && (
										<motion.div
											className="absolute inset-0 pointer-events-none"
											animate={{
												background: [
													"radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
													"radial-gradient(circle at 60% 40%, rgba(255,255,255,0.1) 0%, transparent 50%)",
													"radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
												],
											}}
											transition={{
												duration: 5,
												repeat: Infinity,
												ease: "easeInOut",
											}}
										/>
									)}

									{/* Content Container */}
									<div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between z-10 translate-z-20">
										{/* Top Section */}
										<div className="flex justify-between items-start">
											<motion.div
												animate={
													isActive
														? {
																y: [0, -10, 0],
																transition: {
																	duration: 4,
																	repeat: Infinity,
																	ease: "easeInOut",
																},
															}
														: {}
												}
												className={cn(
													"w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-white backdrop-blur-md border border-white/20 shadow-lg transition-all duration-500",
													isActive
														? `bg-linear-to-br ${colors.from} ${colors.to}`
														: "bg-white/10",
												)}>
												<step.icon className="w-6 h-6 sm:w-7 sm:h-7" />
											</motion.div>
											<span className="text-4xl sm:text-5xl font-bold text-white/10 select-none font-mclaren">
												{step.number}
											</span>
										</div>

										{/* Bottom Section */}
										<div className="space-y-4">
											<motion.h3
												layout="position"
												className={cn(
													"text-3xl lg:text-4xl font-black text-white leading-tight transition-all duration-300 drop-shadow-lg tracking-tighter font-mclaren",
													!isActive &&
														"lg:-rotate-90 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:whitespace-nowrap",
												)}>
												{step.title}
											</motion.h3>

											<AnimatePresence mode="wait">
												{isActive && (
													<motion.div
														initial={{ opacity: 0, y: 20, height: 0 }}
														animate={{ opacity: 1, y: 0, height: "auto" }}
														exit={{ opacity: 0, y: 10, height: 0 }}
														transition={{ duration: 0.3, ease: "easeOut" }}
														className="space-y-6 overflow-hidden">
														<p className="text-white/80 text-base leading-relaxed max-w-lg font-medium drop-shadow-md font-montserrat">
															{step.description}
														</p>

														<div className="flex flex-wrap gap-4">
															{step.stats.map((stat, i) => (
																<motion.div
																	key={i}
																	initial={{ opacity: 0, x: -10 }}
																	animate={{ opacity: 1, x: 0 }}
																	transition={{ delay: 0.1 + i * 0.1 }}
																	className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-2xl px-5 py-2 text-[10px] sm:text-xs text-white font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl">
																	<div
																		className={cn(
																			"w-1.5 h-1.5 rounded-full shadow-[0_0_10px_currentColor]",
																			colors.bg,
																		)}
																	/>
																	<span className="font-montserrat">
																		{stat}
																	</span>
																</motion.div>
															))}
														</div>
													</motion.div>
												)}
											</AnimatePresence>
										</div>
									</div>

									{/* Border Glow for Active State */}
									{isActive && (
										<motion.div
											layoutId="activeBorder"
											className={cn(
												"absolute inset-0 border-[3px] rounded-[2.2rem] pointer-events-none z-20",
												colors.border,
											)}
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{ duration: 0.3 }}
										/>
									)}
								</TiltCard>
							</motion.div>
						);
					})}
				</div>

				{/* Steps Navigation (Mobile/Tablet) */}
				<div className="flex justify-center gap-3 lg:hidden mb-12">
					{steps.map((_, index) => (
						<button
							key={index}
							onClick={() => {
								setActiveStep(index);
								setIsAutoPlay(false);
							}}
							className={cn(
								"h-2 rounded-full transition-all duration-300",
								activeStep === index
									? "w-8 bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]"
									: "w-2 bg-gray-300 hover:bg-gray-400",
							)}
							aria-label={`Go to step ${index + 1}`}
						/>
					))}
				</div>

				{/* Bottom Stats Grid - Floating Hover Effect */}
				{/* Minimalist Stats Bar - Classy & Simple */}
				<div className="relative max-w-5xl mx-auto mt-10 px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-gray-100">
						<div className="flex flex-col sm:flex-row items-center justify-between divide-y sm:divide-y-0 sm:divide-x divide-gray-50">
							{/* Stats Bar Items */}
							{[
								{
									value: "25K+",
									label: "Properties",
									color: "text-gray-900",
								},
								{
									value: "45+",
									label: "Countries",
									color: "text-gray-900",
								},
								{
									value: "<2s",
									label: "Transactions",
									color: "text-gray-900",
								},
								{
									value: "100%",
									label: "Security",
									color: "text-blue-600",
								},
							].map((stat, index) => (
								<motion.div
									key={index}
									whileHover={{ backgroundColor: "rgba(239, 246, 255, 0.5)" }}
									className="flex-1 flex flex-col items-center justify-center py-10 px-6 w-full transition-all duration-500 first:rounded-t-[2.5rem] sm:first:rounded-l-[2.5rem] sm:first:rounded-tr-none last:rounded-b-[2.5rem] sm:last:rounded-r-[2.5rem] sm:last:rounded-bl-none group cursor-default">
									<motion.h3
										whileHover={{ scale: 1.1 }}
										className={cn(
											"text-3xl lg:text-4xl font-black mb-3 tracking-tightest transition-colors duration-500",
											stat.color,
											"font-mclaren",
										)}>
										{stat.value}
									</motion.h3>
									<p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] font-montserrat">
										{stat.label}
									</p>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
