/** @format */
"use client";

import { useState, useEffect } from "react";
import {
	Search,
	Filter,
	RefreshCw,
	Sparkles,
	TrendingUp,
	MapPin,
	Building,
	Home,
	Hotel,
	Castle,
	Waves,
	Globe,
} from "lucide-react";
import PropertyCard from "./PropertyCard";

interface PropertyGridProps {
	filteredProperties: Array<any>;
	demoImages: string[];
	wishlist: number[];
	cart: Array<{ property: any; quantity: number }>;
	addToCart: (property: any) => void;
	removeFromCart: (id: number) => void;
	toggleWishlist: (id: number) => void;
	clearFilters: () => void;
	viewMode?: "grid" | "list";
}

export default function PropertyGrid({
	filteredProperties,
	demoImages,
	wishlist,
	cart,
	addToCart,
	removeFromCart,
	toggleWishlist,
	clearFilters,
	viewMode = "grid", // Add default value
}: PropertyGridProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [currentViewMode, setCurrentViewMode] = useState<"grid" | "list">(
		viewMode,
	);

	// Simulate loading state
	useEffect(() => {
		if (filteredProperties.length === 0) return;
		setIsLoading(true);
		const timer = setTimeout(() => setIsLoading(false), 300);
		return () => clearTimeout(timer);
	}, [filteredProperties]);

	// Popular property types
	const popularPropertyTypes = [
		{ icon: Building, label: "Apartments", count: 24 },
		{ icon: Home, label: "Villas", count: 18 },
		{ icon: Hotel, label: "Hotels", count: 12 },
		{ icon: Castle, label: "Luxury", count: 8 },
		{ icon: Waves, label: "Beachfront", count: 6 },
	];

	// Recommended locations
	const recommendedLocations = [
		{ icon: MapPin, label: "New York, USA", properties: 15 },
		{ icon: Globe, label: "London, UK", properties: 12 },
		{ icon: MapPin, label: "Tokyo, Japan", properties: 10 },
		{ icon: MapPin, label: "Dubai, UAE", properties: 8 },
		{ icon: MapPin, label: "Sydney, AU", properties: 6 },
	];

	// Calculate portfolio metrics
	const portfolioValue = cart.reduce(
		(sum, item) => sum + item.property.price * item.quantity,
		0,
	);
	const averageROI =
		filteredProperties.length > 0
			? filteredProperties.reduce(
					(sum, prop) => sum + (prop.investmentReturn || 5),
					0,
			  ) / filteredProperties.length
			: 5;

	if (filteredProperties.length === 0) {
		return (
			<div className="min-h-[500px] flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
				<div className="relative mb-6">
					<Search className="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto" />
					<div className="absolute inset-0 flex items-center justify-center">
						<Filter className="w-10 h-10 text-blue-500 animate-pulse" />
					</div>
				</div>
				<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
					No Properties Match Your Search
				</h3>
				<p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8">
					We couldn't find any properties matching your current filters. Try
					adjusting your criteria or explore our popular options.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full mb-8">
					{/* Popular Property Types */}
					<div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5">
						<div className="flex items-center gap-2 mb-4">
							<Sparkles className="w-5 h-5 text-blue-500" />
							<h4 className="font-semibold text-gray-900 dark:text-white">
								Popular Types
							</h4>
						</div>
						<div className="space-y-3">
							{popularPropertyTypes.map((type, index) => {
								const Icon = type.icon;
								return (
									<button
										key={index}
										onClick={clearFilters}
										className="w-full flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-all duration-200 group">
										<div className="flex items-center gap-3">
											<Icon className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
											<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
												{type.label}
											</span>
										</div>
										<span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
											{type.count} properties
										</span>
									</button>
								);
							})}
						</div>
					</div>

					{/* Recommended Locations */}
					<div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5">
						<div className="flex items-center gap-2 mb-4">
							<MapPin className="w-5 h-5 text-emerald-500" />
							<h4 className="font-semibold text-gray-900 dark:text-white">
								Top Locations
							</h4>
						</div>
						<div className="space-y-3">
							{recommendedLocations.map((location, index) => {
								const Icon = location.icon;
								return (
									<button
										key={index}
										onClick={clearFilters}
										className="w-full flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-all duration-200 group">
										<div className="flex items-center gap-3">
											<Icon className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
											<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
												{location.label}
											</span>
										</div>
										<span className="text-xs px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full">
											{location.properties} properties
										</span>
									</button>
								);
							})}
						</div>
					</div>
				</div>

				<div className="flex gap-4">
					<button
						onClick={clearFilters}
						className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
						<RefreshCw className="w-4 h-4" />
						Clear All Filters
					</button>
					<button className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300">
						Contact Support
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Grid Header */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<div className="flex items-center gap-3 mb-1">
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
							Premium Properties
						</h2>
						<span className="px-2.5 py-1 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs font-bold rounded-full">
							{filteredProperties.length} found
						</span>
					</div>
					<p className="text-gray-600 dark:text-gray-400">
						Discover exclusive investment opportunities worldwide
					</p>
				</div>

				<div className="flex items-center gap-3">
					{/* Portfolio Summary */}
					{cart.length > 0 && (
						<div className="hidden md:flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
							<TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
							<div className="text-right">
								<div className="text-xs text-gray-600 dark:text-gray-400">
									Portfolio
								</div>
								<div className="text-sm font-bold text-gray-900 dark:text-white">
									${portfolioValue.toLocaleString()}
								</div>
							</div>
						</div>
					)}

					{/* View Mode Toggle */}
					<div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
						<button
							onClick={() => setViewMode("grid")}
							className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
								viewMode === "grid"
									? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
									: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
							}`}>
							Grid View
						</button>
						<button
							onClick={() => setViewMode("list")}
							className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
								viewMode === "list"
									? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
									: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
							}`}>
							List View
						</button>
					</div>

					{/* Sort Options */}
					<select className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
						<option>Sort by: Recommended</option>
						<option>Price: Low to High</option>
						<option>Price: High to Low</option>
						<option>ROI: High to Low</option>
						<option>Newest First</option>
					</select>
				</div>
			</div>

			{/* Market Insights Banner */}
			<div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-5 border border-blue-200 dark:border-blue-800">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
							<Sparkles className="w-5 h-5 text-white" />
						</div>
						<div>
							<h3 className="font-bold text-gray-900 dark:text-white">
								Market Insights
							</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Average ROI:{" "}
								<span className="font-bold text-emerald-600 dark:text-emerald-400">
									{averageROI.toFixed(1)}%
								</span>{" "}
								across {filteredProperties.length} properties
							</p>
						</div>
					</div>
					<button className="px-4 py-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm">
						View Analysis
					</button>
				</div>
			</div>

			{/* Loading State */}
			{isLoading && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
					{[1, 2, 3].map((i) => (
						<div
							key={i}
							className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse">
							<div className="h-48 bg-gray-300 dark:bg-gray-700" />
							<div className="p-5 space-y-4">
								<div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
								<div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full" />
								<div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3" />
								<div className="grid grid-cols-4 gap-3">
									{[1, 2, 3, 4].map((j) => (
										<div
											key={j}
											className="h-16 bg-gray-300 dark:bg-gray-700 rounded"
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
				<>
					{viewMode === "grid" ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{filteredProperties.map((property) => {
								const isInWishlist = wishlist.includes(property.id);
								const isInCart = cart.some(
									(item) => item.property.id === property.id,
								);

								return (
									<PropertyCard
										key={property.id}
										property={property}
										imageUrl={demoImages[property.id % demoImages.length]}
										isInWishlist={isInWishlist}
										isInCart={isInCart}
										onToggleWishlist={toggleWishlist}
										onAddToCart={addToCart}
										onRemoveFromCart={removeFromCart}
									/>
								);
							})}
						</div>
					) : (
						<div className="space-y-4">
							{filteredProperties.map((property) => {
								const isInWishlist = wishlist.includes(property.id);
								const isInCart = cart.some(
									(item) => item.property.id === property.id,
								);

								return (
									<div
										key={property.id}
										className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300">
										<div className="flex flex-col md:flex-row">
											<div className="md:w-1/3 h-48 md:h-auto relative">
												<img
													src={demoImages[property.id % demoImages.length]}
													alt={property.title}
													className="w-full h-full object-cover"
												/>
												{property.isFeatured && (
													<div className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold rounded">
														Premium
													</div>
												)}
											</div>
											<div className="md:w-2/3 p-5">
												{/* List view content - you can customize this */}
												<h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
													{property.title}
												</h3>
												<p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
													{property.description}
												</p>
												<div className="flex items-center justify-between">
													<div>
														<div className="text-xl font-bold text-gray-900 dark:text-white">
															${property.price.toLocaleString()}
														</div>
														<div className="text-sm text-gray-500">
															{property.location}
														</div>
													</div>
													<button
														onClick={() =>
															isInCart
																? removeFromCart(property.id)
																: addToCart(property)
														}
														className={`px-4 py-2 rounded-lg font-medium ${
															isInCart
																? "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400"
																: "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
														}`}>
														{isInCart ? "Remove from Cart" : "Add to Cart"}
													</button>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					)}

					{/* Pagination or Load More */}
					{filteredProperties.length > 6 && (
						<div className="flex justify-center pt-6">
							<button className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300">
								Load More Properties
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
}
