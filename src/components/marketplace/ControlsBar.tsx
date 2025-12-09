/** @format */
"use client";

import { useState } from "react";
import {
	CheckCircle,
	Eye,
	TrendingUp,
	Filter,
	Grid,
	List,
	Download,
	Share2,
	Sparkles,
	Zap,
	ArrowUpDown,
} from "lucide-react";

interface ControlsBarProps {
	filteredProperties: Array<any>;
	sortBy: string;
	setSortBy: (sort: string) => void;
	viewMode: "grid" | "list";
	setViewMode: (mode: "grid" | "list") => void;
	onExport?: () => void;
	onShare?: () => void;
}

export default function ControlsBar({
	filteredProperties,
	sortBy,
	setSortBy,
	viewMode,
	setViewMode,
	onExport,
	onShare,
}: ControlsBarProps) {
	const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

	// Calculate portfolio statistics
	const totalValue = filteredProperties.reduce(
		(sum, prop) => sum + prop.price,
		0,
	);
	const averageROI =
		filteredProperties.length > 0
			? filteredProperties.reduce(
					(sum, prop) => sum + (prop.investmentReturn || 5),
					0,
			  ) / filteredProperties.length
			: 0;
	const averagePrice =
		filteredProperties.length > 0
			? (totalValue / filteredProperties.length).toLocaleString("en-US", {
					style: "currency",
					currency: "USD",
					maximumFractionDigits: 0,
			  })
			: "$0";

	return (
		<div className="space-y-4">
			{/* Main Controls Bar */}
			<div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
					{/* Left Section - Stats */}
					<div className="flex flex-wrap items-center gap-4">
						{/* Verified Properties */}
						<div className="flex items-center gap-2.5 px-3 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
							<CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
							<div>
								<div className="text-sm font-semibold text-gray-900 dark:text-white">
									{filteredProperties.length}
								</div>
								<div className="text-xs text-emerald-700 dark:text-emerald-400">
									Verified
								</div>
							</div>
						</div>

						{/* Total Views */}
						<div className="flex items-center gap-2.5 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
							<Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
							<div>
								<div className="text-sm font-semibold text-gray-900 dark:text-white">
									{Math.floor(Math.random() * 1000) + 500}
								</div>
								<div className="text-xs text-blue-700 dark:text-blue-400">
									Views
								</div>
							</div>
						</div>

						{/* Average ROI */}
						{averageROI > 0 && (
							<div className="flex items-center gap-2.5 px-3 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
								<TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
								<div>
									<div className="text-sm font-semibold text-gray-900 dark:text-white">
										{averageROI.toFixed(1)}%
									</div>
									<div className="text-xs text-purple-700 dark:text-purple-400">
										Avg ROI
									</div>
								</div>
							</div>
						)}

						{/* Average Price */}
						<div className="flex items-center gap-2.5 px-3 py-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
							<Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
							<div>
								<div className="text-sm font-semibold text-gray-900 dark:text-white">
									{averagePrice}
								</div>
								<div className="text-xs text-amber-700 dark:text-amber-400">
									Avg Price
								</div>
							</div>
						</div>
					</div>

					{/* Right Section - Controls */}
					<div className="flex flex-wrap items-center gap-3">
						{/* View Mode Toggle */}
						<div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
							<button
								onClick={() => setViewMode("grid")}
								className={`p-1.5 rounded-md transition-all ${
									viewMode === "grid"
										? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
										: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
								}`}>
								<Grid className="w-4 h-4" />
							</button>
							<button
								onClick={() => setViewMode("list")}
								className={`p-1.5 rounded-md transition-all ${
									viewMode === "list"
										? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
										: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
								}`}>
								<List className="w-4 h-4" />
							</button>
						</div>

						{/* Sort Dropdown */}
						<div className="relative">
							<div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
								<ArrowUpDown className="w-4 h-4 text-gray-400" />
								<select
									value={sortBy}
									onChange={(e) => setSortBy(e.target.value)}
									className="bg-transparent text-gray-900 dark:text-white text-sm focus:outline-none appearance-none">
									<option value="featured">Featured First</option>
									<option value="price-low">Price: Low to High</option>
									<option value="price-high">Price: High to Low</option>
									<option value="newest">Newest First</option>
									<option value="views">Most Viewed</option>
								</select>
							</div>
						</div>

						{/* Action Buttons */}
						<button
							onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
							className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors text-sm">
							<Filter className="w-4 h-4" />
							Filters
						</button>

						{onExport && (
							<button
								onClick={onExport}
								className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg transition-colors text-sm">
								<Download className="w-4 h-4" />
								Export
							</button>
						)}

						{onShare && (
							<button
								onClick={onShare}
								className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg transition-colors text-sm">
								<Share2 className="w-4 h-4" />
								Share
							</button>
						)}
					</div>
				</div>

				{/* Advanced Filters */}
				{showAdvancedFilters && (
					<div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 animate-in fade-in">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div>
								<label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
									Property Type
								</label>
								<select className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white">
									<option>All Types</option>
									<option>Apartments</option>
									<option>Villas</option>
									<option>Luxury</option>
									<option>Commercial</option>
								</select>
							</div>
							<div>
								<label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
									Bedrooms
								</label>
								<select className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white">
									<option>Any</option>
									<option>1+</option>
									<option>2+</option>
									<option>3+</option>
									<option>4+</option>
								</select>
							</div>
							<div>
								<label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
									Min. ROI %
								</label>
								<select className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white">
									<option>Any</option>
									<option>5%+</option>
									<option>8%+</option>
									<option>10%+</option>
									<option>12%+</option>
								</select>
							</div>
						</div>
						<div className="flex justify-end gap-3 mt-4">
							<button
								onClick={() => setShowAdvancedFilters(false)}
								className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 text-sm">
								Cancel
							</button>
							<button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all text-sm">
								Apply Filters
							</button>
						</div>
					</div>
				)}
			</div>

			{/* Quick Stats Banner */}
			<div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
				<div className="flex flex-wrap items-center justify-between gap-4">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
							<Sparkles className="w-4 h-4 text-white" />
						</div>
						<div>
							<h4 className="text-sm font-semibold text-gray-900 dark:text-white">
								Market Insights
							</h4>
							<p className="text-xs text-gray-600 dark:text-gray-400">
								{filteredProperties.length} premium properties • $
								{(totalValue / 1000000).toFixed(1)}M total value
							</p>
						</div>
					</div>
					<div className="flex items-center gap-4">
						<div className="text-center">
							<div className="text-xs text-gray-500">Countries</div>
							<div className="text-sm font-bold text-gray-900 dark:text-white">
								{new Set(filteredProperties.map((p) => p.country)).size}
							</div>
						</div>
						<div className="text-center">
							<div className="text-xs text-gray-500">Featured</div>
							<div className="text-sm font-bold text-gray-900 dark:text-white">
								{filteredProperties.filter((p) => p.isFeatured).length}
							</div>
						</div>
						<div className="text-center">
							<div className="text-xs text-gray-500">High ROI</div>
							<div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
								{
									filteredProperties.filter((p) => p.investmentReturn > 10)
										.length
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
