/** @format */
"use client";

import { useState } from "react";
import { Filter, X, ChevronDown, MapPin, Home, DollarSign } from "lucide-react";
import FilterSection from "./FilterSection";

interface FilterSidebarProps {
	showFilters: boolean;
	setShowFilters: (show: boolean) => void;
	filteredProperties: Array<any>;
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
					className="lg:hidden w-full flex items-center justify-between px-4 py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all duration-200 group min-h-[48px]">
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
					{/* Results Summary */}
					<div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
						<div className="text-center">
							<div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
								{filteredProperties.length}
							</div>
							<div className="text-sm text-gray-600 dark:text-gray-400">
								Assets Listed
							</div>
						</div>
					</div>

					{/* Clear Filters */}
					{hasActiveFilters && (
						<div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
							<div className="flex items-center justify-between">
								<div className="text-sm font-medium text-gray-900 dark:text-white">
									{activeFilters.length} filter{activeFilters.length > 1 ? 's' : ''} active
								</div>
								<button
									onClick={clearFilters}
									className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium flex items-center gap-1">
									<X className="w-3 h-3" />
									Clear all
								</button>
							</div>
						</div>
					)}

					{/* Global Cities -> Global Markets */}
					<FilterSection
						title="Global Markets"
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

					{/* Property Type -> Asset Class */}
					<FilterSection
						title="Asset Class"
						icon={Home}
						options={propertyTypes}
						selectedValue={selectedType}
						onSelect={setSelectedType}
						type="type"
					/>

					{/* Price Range -> Valuation Range */}
					<FilterSection
						title="Valuation Range"
						icon={DollarSign}
						options={priceRanges.map(range => ({ label: range.label }))}
						selectedValue={selectedPrice}
						onSelect={setSelectedPrice}
						type="price"
					/>
				</div>
			</div>
		</div>
	);
}