/** @format */
"use client";

import {
	FileCheck,
	Shield,
	Clock,
	ArrowRight,
	Globe,
	Database,
	Users,
	BadgeCheck,
	Lock,
	Zap,
	Sparkles,
	ChevronLeft,
	ChevronRight,
	Layers,
	Cpu,
	Network,
	ArrowLeftCircle,
	ArrowRightCircle,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

const steps = [
	{
		number: "01",
		icon: FileCheck,
		title: "Digitize & Verify",
		subtitle: "Property Tokenization",
		description:
			"Property owners submit legal documents for comprehensive compliance checks, title verification, and digital authentication on the blockchain.",
		keyPoints: [
			"Legal document verification",
			"Title authenticity check",
			"Compliance screening",
			"Digital deed creation",
		],
		color: "from-blue-500 to-cyan-400",
		bgColor:
			"bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10",
		iconBg: "bg-gradient-to-r from-blue-500 to-cyan-400",
		stats: [
			{ label: "Verification Time", value: "<48h", icon: Clock },
			{ label: "Success Rate", value: "99.8%", icon: BadgeCheck },
		],
		glowColor: "before:from-blue-500/20 before:to-cyan-500/20",
		image:
			"https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
		imageAlt: "Modern real estate building with digital interface overlay",
		iconElement: <Layers className="w-6 h-6 text-white" />,
	},
	{
		number: "02",
		icon: Shield,
		title: "Secure Investment",
		subtitle: "Fractional Ownership",
		description:
			"Investors purchase verified property fractions through blockchain smart contracts, protected by decentralized escrow technology.",
		keyPoints: [
			"Fractional investment options",
			"Smart contract escrow",
			"Secure payment processing",
			"Instant settlement",
		],
		color: "from-purple-500 to-pink-400",
		bgColor:
			"bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10",
		iconBg: "bg-gradient-to-r from-purple-500 to-pink-400",
		stats: [
			{ label: "Blockchain Network", value: "Polygon", icon: Globe },
			{ label: "Global Access", value: "24/7", icon: Globe },
		],
		glowColor: "before:from-purple-500/20 before:to-pink-500/20",
		image:
			"https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
		imageAlt: "Blockchain network visualization with real estate data",
		iconElement: <Network className="w-6 h-6 text-white" />,
	},
	{
		number: "03",
		icon: Database,
		title: "Track & Manage",
		subtitle: "On-chain Transparency",
		description:
			"All ownership changes are permanently recorded on-chain, providing real-time transparency and eliminating disputes through immutable records.",
		keyPoints: [
			"Real-time ownership tracking",
			"Immutable transaction logs",
			"Automated compliance reporting",
			"Transparent audit trail",
		],
		color: "from-emerald-500 to-teal-400",
		bgColor:
			"bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10",
		iconBg: "bg-gradient-to-r from-emerald-500 to-teal-400",
		stats: [
			{ label: "Transaction Speed", value: "<5min", icon: Zap },
			{ label: "Security Level", value: "Bank-grade", icon: Lock },
		],
		glowColor: "before:from-emerald-500/20 before:to-teal-500/20",
		image:
			"https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
		imageAlt:
			"Digital dashboard showing real estate analytics and blockchain data",
		iconElement: <Cpu className="w-6 h-6 text-white" />,
	},
];

export default function HowItWorksSection() {
	const [activeStep, setActiveStep] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const currentStep = steps[activeStep];

	const handleStepChange = (index: number) => {
		if (isAnimating || index === activeStep) return;

		setIsAnimating(true);
		setActiveStep(index);
		setTimeout(() => setIsAnimating(false), 500);
	};

	const nextStep = () => {
		if (activeStep < steps.length - 1) {
			handleStepChange(activeStep + 1);
		}
	};

	const prevStep = () => {
		if (activeStep > 0) {
			handleStepChange(activeStep - 1);
		}
	};

	// Auto-rotate steps
	useEffect(() => {
		const interval = setInterval(() => {
			nextStep();
		}, 8000);
		return () => clearInterval(interval);
	}, [activeStep]);

	return (
		<section className="relative py-24 lg:py-32 px-4 sm:px-6 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900 overflow-hidden">
			{/* Background Elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl" />
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl" />
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-96 bg-gradient-to-r from-blue-500/5 via-transparent to-cyan-500/5 dark:from-blue-500/10 dark:to-cyan-500/10 blur-3xl" />
			</div>

			<div className="relative max-w-7xl mx-auto">
				{/* Section Header - Improved Alignment */}
				<div className="text-center mb-20">
					<div className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-2xl mb-8 backdrop-blur-sm border border-blue-200/50 dark:border-blue-500/20">
						<Sparkles className="w-5 h-5 text-blue-500 dark:text-blue-400" />
						<span className="text-sm font-semibold text-blue-700 dark:text-blue-300 tracking-wider uppercase">
							Blockchain Real Estate Process
						</span>
						<div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-pulse" />
					</div>

					<div className="max-w-4xl mx-auto">
						<h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
							How{" "}
							<span className="relative inline-block">
								<span className="bg-gradient-to-r from-blue-600 via-purple-500 to-emerald-500 bg-clip-text text-transparent animate-gradient">
									StrataDeed
								</span>
								<span className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-500 to-emerald-500 blur-2xl opacity-30 -z-10 rounded-lg" />
							</span>{" "}
							Works
						</h2>
						<p className="text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
							Transforming real estate into liquid, transparent, and accessible
							digital assets powered by blockchain technology
						</p>
					</div>
				</div>

				{/* Main Content - Improved Alignment */}
				<div className="mb-24">
					<div className="relative group">
						{/* Glow Effect */}
						<div
							className={`absolute -inset-4 bg-gradient-to-r ${currentStep.color} rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
						/>

						<div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
							<div className="grid lg:grid-cols-2 gap-0 min-h-[600px]">
								{/* Left Column - Step-specific Image */}
								<div className="relative overflow-hidden order-1 lg:order-1">
									<div className="absolute inset-0">
										<Image
											src={currentStep.image}
											alt={currentStep.imageAlt}
											fill
											className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
											priority
											sizes="(max-width: 768px) 100vw, 50vw"
										/>
									</div>

									{/* Animated Overlay */}
									<div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/10 dark:from-black/40 dark:to-black/20" />

									{/* Step Number Card - Improved Alignment and Typography */}
									<div className="absolute top-8 left-8">
										<div
											className={`relative ${currentStep.iconBg} w-24 h-24 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-500`}>
											<div className="text-center">
												<div className="text-3xl font-bold text-white tracking-tight leading-none">
													{currentStep.number}
												</div>
												<div className="text-xs font-semibold text-white/90 tracking-wider uppercase mt-1">
													Step
												</div>
											</div>
											<div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl" />
										</div>
									</div>

									{/* Blockchain Network Visualization - Centered */}
									<div className="absolute bottom-8 left-8 right-8">
										<div className="bg-black/60 dark:bg-black/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
											<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
												<div className="flex-1">
													<div className="flex items-center gap-3 mb-2">
														<div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
														<span className="text-sm font-semibold text-white">
															Live Blockchain Integration
														</span>
													</div>
													<h4 className="text-xl font-bold text-white">
														{currentStep.subtitle}
													</h4>
													<p className="text-gray-300 text-sm mt-1">
														Secure • Transparent • Immutable
													</p>
												</div>
												<div className="text-center sm:text-right">
													<div className="text-3xl font-bold text-white">
														24/7
													</div>
													<div className="text-sm text-gray-300">Access</div>
												</div>
											</div>
										</div>
									</div>

									{/* Animated Dots - Better Distribution */}
									<div className="absolute top-1/4 right-8 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
									<div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-purple-500 rounded-full animate-ping delay-300" />
									<div className="absolute top-1/3 right-1/4 w-2 h-2 bg-cyan-500 rounded-full animate-ping delay-700" />
								</div>

								{/* Right Column - Content with Improved Alignment */}
								<div className="p-8 lg:p-12 order-2 lg:order-2 flex flex-col justify-center">
									{/* Step Navigation - Improved Alignment and Spacing */}
									<div className="flex flex-col sm:flex-row items-center gap-3 mb-10 lg:mb-12">
										{steps.map((step, index) => (
											<button
												key={step.number}
												onClick={() => handleStepChange(index)}
												className={`relative w-full sm:flex-1 flex items-center justify-center sm:justify-start gap-4 px-5 py-4 rounded-xl transition-all duration-500 ${
													activeStep === index
														? `${step.bgColor} border-2 ${step.color
																.replace("from-", "border-")
																.replace(" to-", "-to-")} shadow-lg scale-105`
														: "bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 border-2 border-transparent"
												} ${step.glowColor}`}>
												{/* Step Number Indicator */}
												<div
													className={`relative w-10 h-10 ${
														activeStep === index
															? step.iconBg
															: "bg-gray-300 dark:bg-gray-700"
													} rounded-lg flex items-center justify-center shadow-md`}>
													<div
														className={`text-sm font-bold ${
															activeStep === index
																? "text-white"
																: "text-gray-600 dark:text-gray-300"
														}`}>
														{step.number}
													</div>
													{activeStep === index && (
														<div className="absolute -inset-1 bg-gradient-to-r from-white/30 to-transparent rounded-lg" />
													)}
												</div>
												<div className="text-left flex-1 min-w-0">
													<div
														className={`text-sm font-semibold truncate ${
															activeStep === index
																? "text-gray-900 dark:text-white"
																: "text-gray-500 dark:text-gray-400"
														}`}>
														{step.title}
													</div>
													<div
														className={`text-xs truncate ${
															activeStep === index
																? "text-gray-600 dark:text-gray-300"
																: "text-gray-400 dark:text-gray-500"
														}`}>
														{step.subtitle}
													</div>
												</div>
											</button>
										))}
									</div>

									{/* Current Step Content - Better Spacing */}
									<div
										className={`space-y-8 transition-all duration-500 ${
											isAnimating
												? "opacity-0 scale-95"
												: "opacity-100 scale-100"
										}`}>
										<div className="space-y-4">
											<h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
												{currentStep.title}
											</h3>
											<div
												className={`text-xl font-bold ${currentStep.color} bg-clip-text text-transparent`}>
												{currentStep.subtitle}
											</div>
										</div>

										<p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
											{currentStep.description}
										</p>

										{/* Key Points - Improved Grid */}
										<div className="space-y-6 pt-6">
											<h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3">
												<Sparkles className="w-5 h-5 text-blue-500" />
												Key Features
											</h4>
											<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
												{currentStep.keyPoints.map((point, index) => (
													<div
														key={index}
														className="group/item relative p-4 rounded-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg">
														<div className="flex items-center gap-4">
															<div
																className={`w-10 h-10 ${currentStep.color.replace(
																	"from-",
																	"bg-gradient-to-r from-",
																)} rounded-lg flex items-center justify-center`}>
																<div className="w-2 h-2 bg-white rounded-full" />
															</div>
															<span className="text-gray-800 dark:text-gray-200 font-medium text-sm lg:text-base">
																{point}
															</span>
														</div>
													</div>
												))}
											</div>
										</div>

										{/* Stats - Better Alignment */}
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 pt-8 border-t border-gray-200 dark:border-gray-700">
											{currentStep.stats.map((stat, index) => {
												const StatIcon = stat.icon;
												return (
													<div
														key={index}
														className="text-center p-4 lg:p-6 rounded-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
														<div className="flex flex-col items-center">
															<StatIcon
																className={`w-8 h-8 mb-4 ${currentStep.color
																	.replace("from-", "text-")
																	.replace(" to-", "-to-")}`}
															/>
															<div className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
																{stat.value}
															</div>
															<div className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide">
																{stat.label}
															</div>
														</div>
													</div>
												);
											})}
										</div>
									</div>
								</div>
							</div>

							{/* Navigation Controls - Better Icons and Positioning */}
							<div className="absolute bottom-6 right-6 flex items-center gap-3">
								<button
									onClick={prevStep}
									disabled={activeStep === 0}
									className="group p-3 lg:p-4 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-300 dark:border-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-110">
									<ArrowLeftCircle className="w-6 h-6 lg:w-7 lg:h-7 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:scale-110 transition-transform" />
								</button>
								<button
									onClick={nextStep}
									disabled={activeStep === steps.length - 1}
									className="group p-3 lg:p-4 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-300 dark:border-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-110">
									<ArrowRightCircle className="w-6 h-6 lg:w-7 lg:h-7 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:scale-110 transition-transform" />
								</button>
							</div>

							{/* Progress Bar */}
							<div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 dark:bg-gray-800">
								<div
									className={`h-full ${currentStep.color.replace(
										"from-",
										"bg-gradient-to-r from-",
									)} transition-all duration-700 ease-out`}
									style={{ width: `${(activeStep + 1) * 33.33}%` }}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Blockchain Network Showcase - Improved Layout */}
				<div className="relative mb-24">
					<div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl p-8 lg:p-12 overflow-hidden">
						{/* Animated Background */}
						<div className="absolute inset-0">
							<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(120,119,198,0.1),transparent_50%)]" />
							<div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.1),transparent_50%)]" />
							<div
								className="absolute inset-0"
								style={{
									backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
								}}
							/>
						</div>

						<div className="relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
							<div className="space-y-6 lg:space-y-8">
								<div className="inline-flex items-center gap-3 px-5 py-2.5 bg-blue-500/20 rounded-full border border-blue-500/30">
									<Sparkles className="w-4 h-4 text-blue-400" />
									<span className="text-sm font-semibold text-blue-300">
										Blockchain-Powered
									</span>
								</div>

								<h3 className="text-4xl lg:text-5xl font-bold text-white">
									<span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent">
										Real Estate
									</span>{" "}
									on Blockchain
								</h3>

								<p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
									Every property transaction is cryptographically secured and
									permanently recorded on the Polygon blockchain, ensuring
									unparalleled transparency, security, and trust in real estate
									investments.
								</p>

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 pt-4">
									<div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 lg:p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
										<Lock className="w-9 h-9 lg:w-10 lg:h-10 text-cyan-400 mb-3 lg:mb-4" />
										<div className="text-2xl lg:text-3xl font-bold text-white">
											100%
										</div>
										<div className="text-sm text-gray-300 font-medium mt-2">
											Secure Transactions
										</div>
									</div>
									<div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 lg:p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
										<Zap className="w-9 h-9 lg:w-10 lg:h-10 text-purple-400 mb-3 lg:mb-4" />
										<div className="text-2xl lg:text-3xl font-bold text-white">
											&lt;2s
										</div>
										<div className="text-sm text-gray-300 font-medium mt-2">
											Transaction Speed
										</div>
									</div>
								</div>
							</div>

							<div className="relative">
								{/* 3D Card Effect */}
								<div className="relative transform perspective-1000 rotate-y-3 lg:rotate-y-6">
									<div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-xl rounded-2xl p-6 lg:p-8 border border-white/10 shadow-2xl">
										<div className="space-y-6">
											<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
												<div className="flex items-center gap-3">
													<div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
													<span className="text-white font-semibold">
														Live Blockchain Network
													</span>
												</div>
												<div className="px-3 py-1 bg-emerald-500/20 rounded-full border border-emerald-500/30">
													<span className="text-xs text-emerald-300 font-semibold">
														Polygon Mainnet
													</span>
												</div>
											</div>

											<div className="grid grid-cols-3 gap-3 lg:gap-4">
												<div className="text-center p-4 bg-black/30 rounded-xl border border-white/5">
													<div className="text-xl lg:text-2xl font-bold text-white">
														10K+
													</div>
													<div className="text-xs text-gray-400 mt-1">
														Properties
													</div>
												</div>
												<div className="text-center p-4 bg-black/30 rounded-xl border border-white/5">
													<div className="text-xl lg:text-2xl font-bold text-white">
														50M+
													</div>
													<div className="text-xs text-gray-400 mt-1">
														Transactions
													</div>
												</div>
												<div className="text-center p-4 bg-black/30 rounded-xl border border-white/5">
													<div className="text-xl lg:text-2xl font-bold text-white">
														99.9%
													</div>
													<div className="text-xs text-gray-400 mt-1">
														Uptime
													</div>
												</div>
											</div>

											<div className="space-y-3">
												<div className="h-2 bg-gray-800 rounded-full overflow-hidden">
													<div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-3/4" />
												</div>
												<div className="flex justify-between text-xs text-gray-400">
													<span>Real-time Network Load</span>
													<span>75%</span>
												</div>
											</div>
										</div>
									</div>

									{/* Reflection */}
									<div className="absolute -bottom-6 lg:-bottom-8 left-0 right-0 h-6 lg:h-8 bg-gradient-to-t from-black/50 to-transparent blur-sm" />
								</div>

								{/* Floating Elements */}
								<div className="absolute -top-4 lg:-top-6 -right-4 lg:-right-6 w-10 lg:w-12 h-10 lg:h-12 border border-cyan-400/20 rounded-full animate-spin-slow" />
								<div className="absolute -bottom-4 lg:-bottom-6 -left-4 lg:-left-6 w-12 lg:w-16 h-12 lg:h-16 border border-blue-400/20 rounded-full animate-spin-slow reverse" />
							</div>
						</div>
					</div>
				</div>

				{/* CTA Section - Improved Centering */}
				<div className="text-center">
					<div className="max-w-3xl mx-auto mb-8 lg:mb-12">
						<h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6">
							Ready to revolutionize your{" "}
							<span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
								real estate investments?
							</span>
						</h3>
						<p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300">
							Join thousands of investors already leveraging blockchain
							technology for secure, transparent, and accessible real estate
							ownership.
						</p>
					</div>

					<div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center items-center">
						<button className="group relative px-8 lg:px-12 py-4 lg:py-5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold rounded-xl lg:rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden w-full sm:w-auto">
							<span className="relative z-10">Start Investing Today</span>
							<ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
							<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
						</button>

						<button className="px-8 lg:px-12 py-4 lg:py-5 bg-transparent border-2 border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-cyan-400 text-gray-800 dark:text-gray-200 font-semibold rounded-xl lg:rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 backdrop-blur-sm w-full sm:w-auto">
							Schedule a Demo
						</button>
					</div>

					<div className="mt-8 lg:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-8 text-gray-500 dark:text-gray-400">
						<div className="flex items-center gap-3">
							<BadgeCheck className="w-5 h-5 text-emerald-500" />
							<span className="text-sm">No minimum investment</span>
						</div>
						<div className="flex items-center gap-3">
							<Globe className="w-5 h-5 text-blue-500" />
							<span className="text-sm">Global accessibility</span>
						</div>
						<div className="flex items-center gap-3">
							<Shield className="w-5 h-5 text-purple-500" />
							<span className="text-sm">Bank-grade security</span>
						</div>
					</div>
				</div>
			</div>

			{/* Custom Animations */}
			<style
				jsx
				global>{`
				@keyframes gradient {
					0% {
						background-position: 0% 50%;
					}
					50% {
						background-position: 100% 50%;
					}
					100% {
						background-position: 0% 50%;
					}
				}
				.animate-gradient {
					background-size: 200% 200%;
					animation: gradient 3s ease infinite;
				}
				@keyframes spin-slow {
					from {
						transform: rotate(0deg);
					}
					to {
						transform: rotate(360deg);
					}
				}
				.animate-spin-slow {
					animation: spin-slow 20s linear infinite;
				}
				.animate-spin-slow.reverse {
					animation-direction: reverse;
				}
				.perspective-1000 {
					perspective: 1000px;
				}
				.rotate-y-3 {
					transform: rotateY(3deg);
				}
				.rotate-y-6 {
					transform: rotateY(6deg);
				}
				@media (max-width: 640px) {
					.min-h-\[600px\] {
						min-height: 400px;
					}
				}
			`}</style>
		</section>
	);
}
