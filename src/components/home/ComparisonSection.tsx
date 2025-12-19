/** @format */
"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";

const comparisons = [
	{
		title: "Traditional",
		features: [
			{ text: "Slow & manual", good: false },
			{ text: "Paper-heavy", good: false },
			{ text: "Local only", good: false },
		],
		image: "/images/unsplash-f200968a6e72.jpg",
		color: "red",
	},
	{
		title: "Speculative",
		features: [
			{ text: "High risk", good: false },
			{ text: "No verification", good: false },
			{ text: "Unregulated", good: false },
		],
		image: "/images/unsplash-e363dbe005cb.jpg",
		color: "orange",
	},
	{
		title: "StrataDeed",
		features: [
			{ text: "Verified ownership", good: true },
			{ text: "Blockchain-backed", good: true },
			{ text: "Global access", good: true },
		],
		image: "/images/unsplash-ce09059eeffa.jpg",
		color: "blue",
	},
];

export default function ComparisonSection() {
	const [active, setActive] = useState(2);

	return (
		<section className="py-20 px-4 sm:px-6 lg:px-8">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
						The Evolution of Real Estate
					</h2>
					<p className="text-lg text-gray-600 dark:text-gray-400">
						From traditional to transformative
					</p>
				</div>

				{/* Comparison Timeline */}
				<div className="relative mb-16">
					{/* Timeline Line */}
					<div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-red-400 via-orange-400 to-blue-400 transform -translate-y-1/2 z-0" />

					{/* Timeline Points */}
					<div className="relative flex justify-between z-10">
						{comparisons.map((item, index) => {
							const isActive = active === index;

							return (
								<button
									key={index}
									onClick={() => setActive(index)}
									className="relative flex flex-col items-center group">
									{/* Circle */}
									<div
										className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-all ${
											isActive
												? "bg-gradient-to-r from-blue-600 to-cyan-500 scale-125 shadow-lg"
												: `bg-${item.color}-500/20 hover:scale-110`
										}`}>
										<div className="w-8 h-8 rounded-full overflow-hidden">
											<Image
												src={item.image}
												alt={item.title}
												width={32}
												height={32}
												className="object-cover w-full h-full"
											/>
										</div>
									</div>

									{/* Label */}
									<span
										className={`font-semibold ${
											isActive
												? "text-blue-600 dark:text-blue-400"
												: "text-gray-600 dark:text-gray-400"
										}`}>
										{item.title}
									</span>
								</button>
							);
						})}
					</div>
				</div>

				{/* Active Comparison Display */}
				<div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-2xl p-8">
					<div className="flex flex-col lg:flex-row items-center gap-8">
						{/* Image */}
						<div className="lg:w-1/3">
							<div className="aspect-square rounded-xl overflow-hidden shadow-lg">
								<Image
									src={comparisons[active].image}
									alt={comparisons[active].title}
									width={400}
									height={400}
									className="object-cover w-full h-full"
								/>
							</div>
						</div>

						{/* Content */}
						<div className="lg:w-2/3">
							<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
								{comparisons[active].title} Approach
							</h3>

							<div className="space-y-4 mb-8">
								{comparisons[active].features.map((feature, i) => (
									<div
										key={i}
										className="flex items-center gap-3">
										<div
											className={`p-2 rounded-lg ${
												feature.good ? "bg-emerald-500/20" : "bg-red-500/20"
											}`}>
											{feature.good ? (
												<CheckCircle className="w-5 h-5 text-emerald-500" />
											) : (
												<XCircle className="w-5 h-5 text-red-500" />
											)}
										</div>
										<span className="text-lg">{feature.text}</span>
									</div>
								))}
							</div>

							{active === 2 && (
								<button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
									<span>Get Started</span>
									<ArrowRight className="w-5 h-5" />
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
