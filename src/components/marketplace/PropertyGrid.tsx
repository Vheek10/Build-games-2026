/** @format */
"use client";

import { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, RefreshCw } from "lucide-react";
import PropertyCard from "./PropertyCard";

interface PropertyGridProps {
	filteredProperties: Array<any>;
	demoImages: string[];
	clearFilters: () => void;
}

function PropertyGrid({
	filteredProperties,
	demoImages,
	clearFilters,
}: PropertyGridProps) {
	const [isLoading, setIsLoading] = useState(false);

	// Simulate loading state
	useEffect(() => {
		if (filteredProperties.length === 0) return;
		setIsLoading(true);
		const timer = setTimeout(() => setIsLoading(false), 300);
		return () => clearTimeout(timer);
	}, [filteredProperties]);

	if (filteredProperties.length === 0) {
		return (
			<div className="min-h-[500px] flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-200 p-8">
				<div className="relative mb-6">
					<Search className="w-20 h-20 text-gray-300 mx-auto" />
					<div className="absolute inset-0 flex items-center justify-center">
						<Filter className="w-10 h-10 text-blue-500 animate-pulse" />
					</div>
				</div>
				<h3 className="text-2xl font-bold text-gray-900 mb-3">
					No Properties Match Your Search
				</h3>
				<p className="text-gray-600 text-center max-w-md mb-8">
					We couldn't find any properties matching your current filters. Try
					adjusting your criteria or clearing all filters.
				</p>

				<button
					onClick={clearFilters}
					className="px-8 py-4 bg-gray-900 text-white font-black rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-3">
					<span className="text-[10px] uppercase tracking-[0.4em] font-montserrat">
						Clear All Filters
					</span>
					<RefreshCw className="w-4 h-4" />
				</button>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Loading State */}
			{isLoading && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
					{[1, 2, 3].map((i) => (
						<div
							key={i}
							className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
							<div className="h-48 bg-gray-300" />
							<div className="p-5 space-y-4">
								<div className="h-4 bg-gray-300 rounded w-3/4" />
								<div className="h-3 bg-gray-300 rounded w-full" />
								<div className="h-3 bg-gray-300 rounded w-2/3" />
								<div className="grid grid-cols-4 gap-3">
									{[1, 2, 3, 4].map((j) => (
										<div
											key={j}
											className="h-16 bg-gray-300 rounded"
										/>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			)}

			{/* Property Grid */}
			{!isLoading && (
				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "0px 0px -100px 0px" }}
					variants={{
						hidden: { opacity: 0 },
						visible: {
							opacity: 1,
							transition: {
								staggerChildren: 0.1,
								delayChildren: 0.2,
							},
						},
					}}>
					{filteredProperties.map((property) => (
						<PropertyCard
							key={property.id}
							property={property}
							imageUrl={
								property.image || demoImages[property.id % demoImages.length]
							}
						/>
					))}
				</motion.div>
			)}
		</div>
	);
}
// Export memoized version to prevent unnecessary re-renders
export default memo(PropertyGrid);