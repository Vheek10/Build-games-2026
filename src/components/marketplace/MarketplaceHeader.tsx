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
					<div className="inline-flex items-center gap-3 px-5 py-2 bg-red-600/5 rounded-full mb-4 border border-red-600/10">
						<span className="text-[10px] font-black text-red-700 uppercase tracking-[0.4em] font-montserrat">
							Asset Marketplace
						</span>
					</div>
					<h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tighter leading-[1.1] font-mclaren">
						Asset Marketplace
					</h1>
					<p className="text-sm text-gray-500 font-medium leading-relaxed font-montserrat">
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
							className="w-full pl-10 pr-10 py-3 bg-white/60 backdrop-blur-xl border border-gray-200 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 font-montserrat text-sm"
						/>
						{searchQuery && (
							<button
								onClick={() => setSearchQuery("")}
								className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded">
								<X className="w-4 h-4 text-gray-400" />
							</button>
						)}
					</div>
				</div>

				{/* Mobile Search Toggle */}
				<button
					onClick={() => setShowSearch(!showSearch)}
					className="md:hidden p-3 bg-white/60 backdrop-blur-xl border border-gray-200 rounded-full hover:shadow-md transition-all">
					<Search className="w-5 h-5 text-gray-700" />
				</button>
			</div>
		</div>
	);
}
