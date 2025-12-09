/** @format */
"use client";

import { Building, DollarSign, TrendingUp } from "lucide-react";

interface MarketInsightsProps {
	filteredProperties: Array<any>;
	averagePrice: string;
	totalValue: number;
}

export default function MarketInsights({
	filteredProperties,
	averagePrice,
	totalValue,
}: MarketInsightsProps) {
	const uniqueCountries = new Set(filteredProperties.map((p) => p.country)).size;

	return (
		<div className="mt-10">
			<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
				Market Insights
			</h3>
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
					<div className="flex items-center justify-between mb-2">
						<div className="text-sm font-medium text-gray-700 dark:text-gray-300">
							Properties Available
						</div>
						<Building className="w-4 h-4 text-blue-500" />
					</div>
					<div className="text-2xl font-bold text-gray-900 dark:text-white">
						{filteredProperties.length}
					</div>
					<div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
						Across {uniqueCountries} countries
					</div>
				</div>
				<div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
					<div className="flex items-center justify-between mb-2">
						<div className="text-sm font-medium text-gray-700 dark:text-gray-300">
							Average Price
						</div>
						<DollarSign className="w-4 h-4 text-emerald-500" />
					</div>
					<div className="text-2xl font-bold text-gray-900 dark:text-white">
						{averagePrice}
					</div>
					<div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
						Market competitive rate
					</div>
				</div>
				<div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
					<div className="flex items-center justify-between mb-2">
						<div className="text-sm font-medium text-gray-700 dark:text-gray-300">
							Portfolio Value
						</div>
						<TrendingUp className="w-4 h-4 text-purple-500" />
					</div>
					<div className="text-2xl font-bold text-gray-900 dark:text-white">
						${(totalValue / 1000000).toFixed(1)}M
					</div>
					<div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
						Total market exposure
					</div>
				</div>
			</div>
		</div>
	);
}