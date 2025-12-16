/** @format */
"use client";

import { Search, X } from "lucide-react";

interface MarketplaceHeaderProps {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	showSearch: boolean;
	setShowSearch: (show: boolean) => void;
}

export default function MarketplaceHeader({
	searchQuery,
	setSearchQuery,
	showSearch,
	setShowSearch,
}: MarketplaceHeaderProps) {
	return (
		<div className="mb-8">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
				<div>
					<h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
						Asset Marketplace
					</h1>
					<p className="text-gray-600 dark:text-gray-400">
						Discover high-yield tokenized real estate opportunities worldwide
					</p>
				</div>

				{/* Desktop Search */}
				<div className="hidden md:block">
					<div className="relative w-80">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
						<input
							type="text"
							placeholder="Search properties..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full pl-10 pr-10 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						{searchQuery && (
							<button
								onClick={() => setSearchQuery("")}
								className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
								<X className="w-4 h-4 text-gray-400" />
							</button>
						)}
					</div>
				</div>

				{/* Mobile Search Toggle */}
				<button
					onClick={() => setShowSearch(!showSearch)}
					className="md:hidden p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all">
					<Search className="w-5 h-5 text-gray-700 dark:text-gray-300" />
				</button>
			</div>
		</div>
	);
}