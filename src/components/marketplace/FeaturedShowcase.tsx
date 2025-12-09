/** @format */
"use client";

import { ChevronRight } from "lucide-react";

interface FeaturedShowcaseProps {
	demoImages: string[];
}

export default function FeaturedShowcase({ demoImages }: FeaturedShowcaseProps) {
	return (
		<div className="mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className="flex items-center justify-between mb-6">
				<div>
					<h3 className="text-xl font-bold text-gray-900 dark:text-white">
						Featured Showcase
					</h3>
					<p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
						Exclusive properties from our premium collection
					</p>
				</div>
				<button className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-medium text-sm hover:gap-2 transition-all">
					View All
					<ChevronRight className="w-4 h-4" />
				</button>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
				{demoImages.map((image, index) => (
					<div
						key={index}
						className="relative h-32 rounded-lg overflow-hidden group">
						<img
							src={image}
							alt={`Property showcase ${index + 1}`}
							className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
							<div className="text-white">
								<div className="font-medium text-sm">Premium Property</div>
								<div className="text-xs text-gray-200 opacity-90">
									From $1.2M
								</div>
							</div>
						</div>
						<div className="absolute top-2 left-2">
							<div className="px-2 py-0.5 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium rounded">
								Featured
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}