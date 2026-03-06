/** @format */
"use client";

import { ArrowUpDown } from "lucide-react";

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
		<div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm mb-6">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				{/* Property Count */}
				<div className="flex items-center gap-2">
					<span className="text-sm text-gray-600">
						Showing
					</span>
					<span className="px-2.5 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full">
						{filteredProperties.length}
					</span>
					<span className="text-sm text-gray-600">
						{filteredProperties.length === 1 ? 'property' : 'properties'}
					</span>
				</div>

				{/* Sort Dropdown */}
				<div className="flex items-center gap-2">
					<ArrowUpDown className="w-4 h-4 text-gray-400" />
					<select
						value={sortBy}
						onChange={(e) => setSortBy(e.target.value)}
						className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500">
						<option value="featured">Featured First</option>
						<option value="price-low">Price: Low to High</option>
						<option value="price-high">Price: High to Low</option>
						<option value="newest">Newest First</option>
					</select>
				</div>
			</div>
		</div>
	);
}
