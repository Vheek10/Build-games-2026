/** @format */
"use client";

import { CheckCircle, Eye } from "lucide-react";

interface ControlsBarProps {
	filteredProperties: Array<any>;
	sortBy: string;
	setSortBy: (sort: string) => void;
}

export default function ControlsBar({
	filteredProperties,
	sortBy,
	setSortBy,
}: ControlsBarProps) {
	return (
		<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
			<div className="flex items-center gap-4">
				<div className="flex items-center gap-2">
					<CheckCircle className="w-4 h-4 text-emerald-500" />
					<span className="text-sm text-gray-600 dark:text-gray-400">
						{filteredProperties.length} Verified Properties
					</span>
				</div>
				<div className="hidden sm:block w-px h-4 bg-gray-300 dark:bg-gray-700" />
				<div className="flex items-center gap-2">
					<Eye className="w-4 h-4 text-blue-500" />
					<span className="text-sm text-gray-600 dark:text-gray-400">
						{Math.floor(Math.random() * 1000) + 500} Views
					</span>
				</div>
			</div>

			<div className="flex items-center gap-3">
				<span className="text-sm text-gray-600 dark:text-gray-400">
					Sort:
				</span>
				<select
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value)}
					className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
					<option value="featured">Featured</option>
					<option value="price-low">Price: Low to High</option>
					<option value="price-high">Price: High to Low</option>
					<option value="newest">Newest First</option>
				</select>
			</div>
		</div>
	);
}