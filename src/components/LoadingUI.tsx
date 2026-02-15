/** @format */

import React from "react";

/**
 * Loading component with optimized skeleton UI
 */
export default function LoadingUI() {
	return (
		<div className="min-h-screen bg-white animate-pulse">
			{/* Header skeleton */}
			<div className="h-16 bg-gray-200"></div>

			{/* Hero skeleton */}
			<div className="max-w-7xl mx-auto px-4 py-20">
				<div className="h-12 bg-gray-300 rounded w-3/4 mb-4"></div>
				<div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
				<div className="h-12 bg-gray-300 rounded w-1/4"></div>
			</div>

			{/* Content skeleton */}
			<div className="max-w-7xl mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{[1, 2, 3].map((i) => (
						<div
							key={i}
							className="bg-gray-200 h-64 rounded-lg"></div>
					))}
				</div>
			</div>
		</div>
	);
}
