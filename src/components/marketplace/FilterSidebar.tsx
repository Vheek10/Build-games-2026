/** @format */
"use client";

import { useState } from "react";
import { Filter, X, ChevronDown, Sparkles, Tag, MapPin, Home, DollarSign, TrendingUp, Zap, Check } from "lucide-react";
import FilterSection from "./FilterSection";

interface FilterSidebarProps {
	showFilters: boolean;
	setShowFilters: (show: boolean) => void;
	filteredProperties: Array<any>;
	totalValue: number;
	averagePrice: string;
	cities: Array<any>;
	selectedCity: string;
	setSelectedCity: (city: string) => void;
	propertyTypes: Array<any>;
	selectedType: string;
	setSelectedType: (type: string) => void;
	priceRanges: Array<any>;
	selectedPrice: string;
	setSelectedPrice: (price: string) => void;
	searchQuery: string;
	clearFilters: () => void;
}

export default function FilterSidebar({
	showFilters,
	setShowFilters,
	filteredProperties,
	totalValue,
	averagePrice,
	cities,
	selectedCity,
	setSelectedCity,
	propertyTypes,
	selectedType,
	setSelectedType,
	priceRanges,
	selectedPrice,
	setSelectedPrice,
	searchQuery,
	clearFilters,
}: FilterSidebarProps) {
	const [activeFilters] = useState([
		searchQuery ? "Search" : null,
		selectedCity !== "All Cities" ? selectedCity : null,
		selectedType !== "All Types" ? selectedType : null,
		selectedPrice !== "Any Price" ? selectedPrice : null,
	].filter(Boolean));

	const hasActiveFilters = activeFilters.length > 0;

	return (
		<div className="lg:w-1/4">
			<div className="sticky top-6 space-y-6">
				{/* Mobile Filter Toggle */}
				<button
					onClick={() => setShowFilters(!showFilters)}
					className="lg:hidden w-full flex items-center justify-between px-4 py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all duration-200 group">
					<div className="flex items-center gap-3">
						<div className="p-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg group-hover:scale-105 transition-transform">
							<Filter className="w-4 h-4 text-white" />
						</div>
						<div className="text-left">
							<span className="font-semibold text-gray-900 dark:text-white block">
								Filters & Options
							</span>
							<span className="text-xs text-gray-500 dark:text-gray-400">
								{hasActiveFilters ? `${activeFilters.length} active` : "Customize view"}
							</span>
						</div>
					</div>
					<ChevronDown
						className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
							showFilters ? "rotate-180" : ""
						}`}
					/>
				</button>

				{/* Filter Panel */}
				<div
					className={`${
						showFilters ? "block animate-in slide-in-from-left-4" : "hidden lg:block"
					} space-y-6`}>
					{/* Active Filters Badge */}
					{hasActiveFilters && (
						<div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
							<div className="flex items-center justify-between mb-3">
								<div className="flex items-center gap-2">
									<TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
									<h3 className="font-semibold text-gray-900 dark:text-white text-sm">
										Active Filters ({activeFilters.length})
									</h3>
								</div>
								<button
									onClick={clearFilters}
									className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
									Clear all
								</button>
							</div>
							<div className="flex flex-wrap gap-2">
								{activeFilters.map((filter, index) => (
									<div
										key={index}
										className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 rounded-lg text-xs text-blue-700 dark:text-blue-400">
										<Check className="w-3 h-3" />
										<span className="font-medium">{filter}</span>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Market Insights Card */}
					<div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300">
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center gap-2">
								<div className="p-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
									<Sparkles className="w-4 h-4 text-white" />
								</div>
								<h3 className="font-bold text-gray-900 dark:text-white">
									Market Insights
								</h3>
							</div>
							<span className="text-xs px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full font-medium">
								Live
							</span>
						</div>
						<div className="space-y-4">
							<div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors">
								<div className="flex items-center gap-3">
									<div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
										<span className="text-blue-600 dark:text-blue-400 font-bold text-sm">
											{filteredProperties.length}
										</span>
									</div>
									<div>
										<div className="text-sm font-medium text-gray-900 dark:text-white">
											Properties
										</div>
										<div className="text-xs text-gray-500 dark:text-gray-400">
											Available now
										</div>
									</div>
								</div>
								<TrendingUp className="w-4 h-4 text-emerald-500" />
							</div>
							<div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors">
								<div className="flex items-center gap-3">
									<div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
										<DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
									</div>
									<div>
										<div className="text-sm font-medium text-gray-900 dark:text-white">
											Avg. Price
										</div>
										<div className="text-xs text-gray-500 dark:text-gray-400">
											Market rate
										</div>
									</div>
								</div>
								<div className="text-right">
									<div className="text-sm font-bold text-gray-900 dark:text-white">
										{averagePrice}
									</div>
									<div className="text-xs text-emerald-600 dark:text-emerald-400">
										+2.4% ↑
									</div>
								</div>
							</div>
							<div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors">
								<div className="flex items-center gap-3">
									<div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
										<Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
									</div>
									<div>
										<div className="text-sm font-medium text-gray-900 dark:text-white">
											Total Value
										</div>
										<div className="text-xs text-gray-500 dark:text-gray-400">
											Portfolio
										</div>
									</div>
								</div>
								<div className="text-right">
									<div className="text-sm font-bold text-gray-900 dark:text-white">
										${(totalValue / 1000000).toFixed(1)}M
									</div>
									<div className="text-xs text-purple-600 dark:text-purple-400">
										Premium assets
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Premium Offers */}
					<div className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 rounded-xl p-5 text-white shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
						<div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
						<div className="relative z-10">
							<div className="flex items-center gap-2 mb-3">
								<div className="p-1.5 bg-white/20 backdrop-blur-sm rounded-lg">
									<Tag className="w-4 h-4" />
								</div>
								<h3 className="font-bold text-lg">Premium Offers</h3>
							</div>
							<p className="text-sm text-blue-100 mb-4 leading-relaxed">
								Exclusive 0% financing on premium properties. Limited time offer for qualified investors.
							</p>
							<div className="flex gap-2">
								<button className="flex-1 px-4 py-2.5 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center gap-2 text-sm">
									<Zap className="w-4 h-4" />
									View Offers
								</button>
								<button className="px-4 py-2.5 bg-white/20 backdrop-blur-sm text-white font-medium rounded-lg hover:bg-white/30 transition-colors duration-200 text-sm">
									Learn More
								</button>
							</div>
						</div>
					</div>

					{/* Global Cities */}
					<FilterSection
						title="Global Cities"
						icon={MapPin}
						options={cities.map(city => ({
							label: city.name,
							icon: city.icon,
							properties: city.properties,
							country: city.country
						}))}
						selectedValue={selectedCity}
						onSelect={setSelectedCity}
						type="city"
					/>

					{/* Property Type */}
					<FilterSection
						title="Property Type"
						icon={Home}
						options={propertyTypes}
						selectedValue={selectedType}
						onSelect={setSelectedType}
						type="type"
					/>

					{/* Price Range */}
					<FilterSection
						title="Price Range"
						icon={DollarSign}
						options={priceRanges.map(range => ({ label: range.label }))}
						selectedValue={selectedPrice}
						onSelect={setSelectedPrice}
						type="price"
					/>

					{/* Quick Actions */}
					<div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
						<h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">
							Quick Actions
						</h3>
						<div className="grid grid-cols-2 gap-2">
							<button
								onClick={clearFilters}
								className="flex items-center justify-center gap-2 px-3 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors text-sm">
								<X className="w-4 h-4" />
								Reset All
							</button>
							<button className="flex items-center justify-center gap-2 px-3 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all text-sm">
								<TrendingUp className="w-4 h-4" />
								Save Search
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}