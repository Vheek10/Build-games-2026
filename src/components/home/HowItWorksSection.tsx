/** @format */
"use client";

import {
	FileCheck,
	Shield,
	Database,
	ArrowRight,
	CheckCircle,
	Zap,
	Globe,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getRandomImage } from "@/utils/realEstateImages";

const steps = [
	{
		number: "01",
		icon: FileCheck,
		title: "Digitize Property",
		description:
			"Transform real estate into secure digital tokens with automated verification",
		color: "blue",
		imageCategory: "modern-buildings",
		stats: ["<48h Verification", "99.8% Success"],
	},
	{
		number: "02",
		icon: Shield,
		title: "Secure Investment",
		description:
			"Fractional ownership through blockchain-powered smart contracts",
		color: "emerald",
		imageCategory: "blockchain-tech",
		stats: ["Global 24/7 Access", "0 Disputes"],
	},
	{
		number: "03",
		icon: Database,
		title: "Track & Manage",
		description: "Real-time transparency with immutable blockchain records",
		color: "cyan",
		imageCategory: "cityscapes",
		stats: ["<2min Transactions", "Bank-grade Security"],
	},
];

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

	const currentStep = steps[activeStep];
	const nextStep = steps[(activeStep + 1) % steps.length];
	const prevStep = steps[(activeStep - 1 + steps.length) % steps.length];

	const handleStepChange = (index: number) => {
		setActiveStep(index);
		setIsAutoPlay(false);
	};

	const handlePrevious = () => {
		setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
		setIsAutoPlay(false);
	};

	const handleNext = () => {
		setActiveStep((prev) => (prev + 1) % steps.length);
		setIsAutoPlay(false);
	};

	if (!images.length) {
		return (
			<section className="py-20 px-4 sm:px-6 bg-white">
				<div className="max-w-7xl mx-auto">
					<div className="animate-pulse space-y-8">
						<div className="h-12 bg-gray-200 rounded-lg w-1/3 mx-auto"></div>
						<div className="h-6 bg-gray-200 rounded w-2/3 mx-auto"></div>
					</div>
				</div>
			</section>
		);
	}

	const colorMap: {
		[key: string]: { bg: string; text: string; accent: string };
	} = {
		blue: {
			bg: "from-blue-600 to-blue-500",
			text: "text-blue-600",
			accent: "bg-blue-500",
		},
		emerald: {
			bg: "from-emerald-600 to-emerald-500",
			text: "text-emerald-600",
			accent: "bg-emerald-500",
		},
		cyan: {
			bg: "from-cyan-600 to-cyan-500",
			text: "text-cyan-600",
			accent: "bg-cyan-500",
		},
	};

	const getColor = (colorName: string) => colorMap[colorName] || colorMap.blue;

	return (
		<section className="py-16 sm:py-28 px-4 sm:px-6 bg-white">
			<style>{`
				/* Elementor-style animations */
				@keyframes slideInLeft {
					from {
						opacity: 0;
						transform: translateX(-100px) rotateY(45deg) skewY(5deg);
					}
					to {
						opacity: 1;
						transform: translateX(0) rotateY(0) skewY(0);
					}
				}
				@keyframes textSlideUp {
					from {
						opacity: 0;
						transform: translateY(60px) rotateX(15deg);
						filter: blur(10px);
					}
					to {
						opacity: 1;
						transform: translateY(0) rotateX(0);
						filter: blur(0);
					}
				}
				@keyframes textSlideDown {
					from {
						opacity: 0;
						transform: translateY(-30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				@keyframes glowPulse {
					0%, 100% { 
						box-shadow: 0 0 20px rgba(59, 130, 246, 0.3), 
						           0 0 40px rgba(59, 130, 246, 0.1);
					}
					50% { 
						box-shadow: 0 0 40px rgba(59, 130, 246, 0.6),
						           0 0 60px rgba(59, 130, 246, 0.3);
					}
				}
				@keyframes scale3dIn {
					from {
						opacity: 0;
						transform: scale(0.6) rotateX(30deg) rotateZ(-20deg);
						filter: blur(15px);
					}
					to {
						opacity: 1;
						transform: scale(1) rotateX(0) rotateZ(0);
						filter: blur(0);
					}
				}
				@keyframes floatElementor {
					0%, 100% { transform: translateY(0px) rotateZ(-1deg); }
					25% { transform: translateY(-12px) rotateZ(0.5deg); }
					50% { transform: translateY(-20px) rotateZ(1deg); }
					75% { transform: translateY(-12px) rotateZ(0.5deg); }
				}
				@keyframes zoomIn {
					from {
						opacity: 0;
						transform: scale(0.7);
					}
					to {
						opacity: 1;
						transform: scale(1);
					}
				}
				@keyframes imageZoom {
					from {
						transform: scale(1);
						filter: brightness(0.9) saturate(0.8);
					}
					to {
						transform: scale(1.08);
						filter: brightness(1.1) saturate(1.1);
					}
				}
				@keyframes borderGlow {
					0%, 100% {
						border-color: rgba(59, 130, 246, 0.3);
						box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
					}
					50% {
						border-color: rgba(59, 130, 246, 0.8);
						box-shadow: 0 0 40px rgba(59, 130, 246, 0.5);
					}
				}
				@keyframes slideDown {
					from {
						opacity: 0;
						transform: translateY(-30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				.cinema-slide-enter {
					animation: slideInLeft 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both;
				}
				.cinema-card-enter {
					animation: scale3dIn 1s cubic-bezier(0.34, 1.56, 0.64, 1);
				}
				.cinema-float {
					animation: floatElementor 3.5s ease-in-out infinite;
				}
				.cinema-container {
					perspective: 1200px;
					transform-style: preserve-3d;
				}
				.cinema-card {
					transform-style: preserve-3d;
					transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
				}
				.cinema-card:hover {
					transform: translateZ(40px) rotateX(-5deg) rotateY(-5deg);
				}
				.image-card {
					transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
					position: relative;
					overflow: hidden;
					cursor: pointer;
				}
				.image-card:hover {
					transform: scale(1.03) rotateY(-3deg) rotateX(3deg) translateZ(20px);
					filter: brightness(1.05);
				}
				.text-overlay {
					background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.85) 100%);
					position: absolute;
					inset: 0;
					z-index: 10;
					transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
				}
				.image-card:hover .text-overlay {
					background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.95) 100%);
				}
				.text-title {
					animation: textSlideUp 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s both;
					transition: all 0.7s ease;
					position: relative;
					z-index: 20;
				}
				.image-card:hover .text-title {
					transform: translateY(-8px);
					text-shadow: 0 10px 30px rgba(0,0,0,0.8);
				}
				.text-description {
					animation: textSlideUp 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) 0.25s both;
					opacity: 0;
					max-height: 0;
					transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
					position: relative;
					z-index: 20;
				}
				.text-stats {
					animation: textSlideUp 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) 0.35s both;
					opacity: 0;
					max-height: 0;
					transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
					position: relative;
					z-index: 20;
				}
				.image-card:hover .text-description,
				.image-card:hover .text-stats {
					opacity: 1;
					max-height: 200px;
					animation: textSlideUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
				}
				.step-badge {
					animation: slideDown 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both;
					position: absolute;
					top: 1.5rem;
					left: 1.5rem;
					z-index: 30;
					transition: all 0.5s ease;
				}
				.image-card:hover .step-badge {
					transform: scale(1.1) translateY(-5px);
					filter: drop-shadow(0 10px 25px rgba(59, 130, 246, 0.4));
				}
				.glow-effect {
					animation: glowPulse 2.5s ease-in-out infinite;
					transition: all 0.5s ease;
				}
				.image-card:hover .glow-effect {
					animation: glowPulse 1.5s ease-in-out infinite;
				}
				.step-icon {
					animation: zoomIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both;
					transition: all 0.6s ease;
				}
				.image-card:hover .step-icon {
					transform: scale(1.2) rotateZ(10deg);
					filter: drop-shadow(0 15px 35px rgba(59, 130, 246, 0.5));
				}
				.image-container {
					animation: imageZoom 0.7s ease-in-out;
					position: relative;
					z-index: 5;
				}
				.image-card:hover .image-container {
					filter: brightness(1.15) contrast(1.1);
				}
				.indicator-dot {
					transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
				}
				.indicator-dot:hover {
					transform: scale(1.3) !important;
					filter: drop-shadow(0 0 10px currentColor);
				}
				.stat-badge {
					animation: slideDown 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
					transition: all 0.5s ease;
					backdrop-filter: blur(10px);
				}
				.image-card:hover .stat-badge {
					transform: translateY(-5px) scale(1.05);
					background: rgba(255, 255, 255, 0.15) !important;
					box-shadow: 0 8px 20px rgba(0,0,0,0.3);
				}
				.text-content {
					position: absolute;
					inset: 0;
					display: flex;
					flex-direction: column;
					justify-content: flex-end;
					padding: 2rem;
					z-index: 20;
					pointer-events: none;
				}
			`}</style>

			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-16 sm:mb-20">
					<h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-gray-900 bg-clip-text text-transparent mb-6">
						How It Works
					</h2>
					<p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
						Transform real estate into accessible digital assets in three simple
						steps with cutting-edge blockchain technology
					</p>
				</div>

				{/* Cinematic 3D Cards Grid */}
				<div className="cinema-container grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-20">
					{steps.map((step, index) => (
						<div
							key={step.number}
							className={`cinema-card-enter ${index === activeStep ? "md:col-span-3 lg:col-span-1" : ""}`}>
							<div
								onClick={() => handleStepChange(index)}
								className="image-card relative h-96 sm:h-[500px] lg:h-[550px] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl cursor-pointer group">
								{/* Image */}
								<Image
									src={images[index]}
									alt={step.title}
									fill
									className="object-cover cinema-card transition-transform duration-700 group-hover:scale-110"
									sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
									priority={index === activeStep}
								/>

								{/* Text Overlay Gradient */}
								<div className="text-overlay" />

								{/* Step Badge - Top Left */}
								<div className="step-badge">
									<div
										className={`bg-gradient-to-r ${getColor(step.color).bg} px-5 py-3 rounded-full text-white font-bold text-lg shadow-2xl glow-effect`}>
										{step.number}
									</div>
								</div>

								{/* Icon - Top Right */}
								<div className="absolute top-6 right-6 z-30 step-icon">
									<div
										className={`bg-gradient-to-r ${getColor(step.color).bg} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-125`}>
										<step.icon className="w-7 h-7" />
									</div>
								</div>

								{/* Text Content - Inside Image */}
								<div className="text-content">
									{/* Title - Always visible */}
									<h3 className="text-title text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-2">
										{step.title}
									</h3>

									{/* Description - Animated on hover */}
									<p className="text-description text-sm sm:text-base text-gray-100 leading-relaxed mb-4">
										{step.description}
									</p>

									{/* Stats - Animated on hover */}
									<div className="text-stats grid grid-cols-2 gap-2">
										{step.stats.map((stat, i) => (
											<div
												key={i}
												className="stat-badge bg-white/10 backdrop-blur-md rounded-lg p-2 border border-white/20">
												<div className="text-sm font-bold text-white">
													{stat.split(" ")[0]}
												</div>
												<div className="text-[10px] text-gray-200">
													{stat.split(" ").slice(1).join(" ")}
												</div>
											</div>
										))}
									</div>
								</div>

								{/* Navigation Buttons - Show on hover */}
								{index === activeStep && (
									<>
										<button
											onClick={(e) => {
												e.stopPropagation();
												handlePrevious();
											}}
											className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100">
											<ChevronLeft className="w-6 h-6" />
										</button>
										<button
											onClick={(e) => {
												e.stopPropagation();
												handleNext();
											}}
											className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100">
											<ChevronRight className="w-6 h-6" />
										</button>
									</>
								)}
							</div>
						</div>
					))}
				</div>

				{/* Step Indicators */}
				<div className="flex justify-center gap-4 mb-16">
					{steps.map((step, index) => (
						<button
							key={index}
							onClick={() => handleStepChange(index)}
							className={`indicator-dot transition-all duration-500 rounded-full ${
								activeStep === index
									? `${getColor(step.color).accent} w-4 h-4 shadow-lg`
									: "bg-gray-300 hover:bg-gray-400 w-3 h-3"
							}`}
							aria-label={`Go to step ${index + 1}`}
						/>
					))}
				</div>

				{/* Bottom Stats - Enhanced */}
				<div className="mt-20 pt-16 border-t-2 border-gray-200">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
						{[
							{ icon: CheckCircle, value: "25K+", label: "Properties" },
							{ icon: Globe, value: "45+", label: "Countries" },
							{ icon: Zap, value: "<2s", label: "Transactions" },
							{ icon: Shield, value: "100%", label: "Secure" },
						].map((stat, index) => (
							<div
								key={index}
								className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-all duration-300 group">
								<stat.icon className="w-10 h-10 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
								<div className="text-3xl font-bold text-gray-900 mb-2">
									{stat.value}
								</div>
								<div className="text-sm text-gray-600">{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
