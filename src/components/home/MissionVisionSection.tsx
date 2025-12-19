/** @format */
"use client";

import { Target, Eye, Globe, Home, Lock, Shield } from "lucide-react";
import Image from "next/image";

export default function MissionVisionSection() {
	return (
		<section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12 lg:mb-16">
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-6">
						<Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
						<span className="text-sm font-medium text-blue-600 dark:text-blue-400">
							OUR PURPOSE
						</span>
					</div>

					<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
						Building the Future of{" "}
						<span className="text-blue-600 dark:text-blue-400">
							Real Estate
						</span>
					</h2>

					<p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
						Transforming how the world owns, invests in, and manages property
					</p>
				</div>

				{/* Mission & Vision Cards */}
				<div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
					{/* Mission Card */}
					<div className="relative overflow-hidden rounded-2xl group">
						{/* Background Image */}
						<div className="absolute inset-0">
							<Image
								src="/images/unsplash-f24b0cae1224.jpg"
								alt="Modern home interior with natural light"
								fill
								className="object-cover group-hover:scale-105 transition-transform duration-700"
								sizes="(max-width: 768px) 100vw, 50vw"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
						</div>

						{/* Content Overlay */}
						<div className="relative p-8 lg:p-12 h-full min-h-[400px] flex flex-col justify-end">
							<div className="flex items-center gap-3 mb-6">
								<div className="w-12 h-12 rounded-xl bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 flex items-center justify-center">
									<Target className="w-6 h-6 text-blue-400" />
								</div>
								<div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 to-transparent" />
							</div>

							<h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
								Our Mission
							</h3>

							<p className="text-lg text-gray-200 leading-relaxed mb-6">
								To rebuild trust in global real estate by merging legal rigor
								with modern blockchain technology, creating secure and
								accessible property ownership.
							</p>

							<div className="flex items-center gap-3 text-blue-300">
								<Home className="w-4 h-4" />
								<span className="text-sm font-medium">
									Trust | Security | Innovation
								</span>
							</div>
						</div>
					</div>

					{/* Vision Card */}
					<div className="relative overflow-hidden rounded-2xl group">
						{/* Background Image */}
						<div className="absolute inset-0">
							<Image
								src="/images/unsplash-9991f1c4c750.jpg"
								alt="Global real estate development with skyscrapers"
								fill
								className="object-cover group-hover:scale-105 transition-transform duration-700"
								sizes="(max-width: 768px) 100vw, 50vw"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-cyan-900/70 via-cyan-900/40 to-transparent" />
						</div>

						{/* Content Overlay */}
						<div className="relative p-8 lg:p-12 h-full min-h-[400px] flex flex-col justify-end">
							<div className="flex items-center gap-3 mb-6">
								<div className="w-12 h-12 rounded-xl bg-cyan-600/20 backdrop-blur-sm border border-cyan-500/30 flex items-center justify-center">
									<Eye className="w-6 h-6 text-cyan-400" />
								</div>
								<div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
							</div>

							<h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
								Our Vision
							</h3>

							<p className="text-lg text-gray-200 leading-relaxed mb-6">
								A world where property ownership is liquid, transparent, and
								accessible to anyone with a mobile phone—democratizing real
								estate for the digital age.
							</p>

							<div className="flex items-center gap-3 text-cyan-300">
								<Globe className="w-4 h-4" />
								<span className="text-sm font-medium">
									Accessibility | Transparency | Global
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Values Section */}
				<div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
					<div className="text-center mb-12">
						<h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
							Core Values
						</h3>
						<p className="text-gray-600 dark:text-gray-400">
							The principles that guide everything we do
						</p>
					</div>

					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{[
							{
								icon: Shield,
								title: "Security First",
								description:
									"Bank-grade encryption and smart contract protection",
								color: "blue",
							},
							{
								icon: Lock,
								title: "Transparency",
								description: "Clear ownership records and transaction history",
								color: "cyan",
							},
							{
								icon: Globe,
								title: "Global Access",
								description: "Borderless property investment opportunities",
								color: "emerald",
							},
							{
								icon: Home,
								title: "Real Value",
								description: "Tangible assets with verified ownership",
								color: "violet",
							},
						].map((value, index) => {
							const Icon = value.icon;
							return (
								<div
									key={value.title}
									className="text-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300">
									<div
										className={`inline-flex p-3 rounded-xl bg-${value.color}-100 dark:bg-${value.color}-900/30 mb-4`}>
										<Icon
											className={`w-6 h-6 text-${value.color}-600 dark:text-${value.color}-400`}
										/>
									</div>
									<h4 className="font-bold text-gray-900 dark:text-white mb-2">
										{value.title}
									</h4>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										{value.description}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
