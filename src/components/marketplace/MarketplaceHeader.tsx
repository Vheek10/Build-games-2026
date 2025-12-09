/** @format */
"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Bell, ShoppingCart, TrendingUp, Award, Zap, ArrowUpRight, Building } from "lucide-react";

interface MarketplaceHeaderProps {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	showSearch: boolean;
	setShowSearch: (show: boolean) => void;
	cart: Array<any>;
	setShowCart: (show: boolean) => void;
	totalValue: number;
}

export default function MarketplaceHeader({
	searchQuery,
	setSearchQuery,
	cart,
	setShowCart,
	totalValue,
}: MarketplaceHeaderProps) {
	const [isSearchFocused, setIsSearchFocused] = useState(false);
	const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
	const searchInputRef = useRef<HTMLInputElement>(null);

	// Sample search suggestions
	const sampleSuggestions = [
		"Luxury apartments in Manhattan",
		"Waterfront villas in Miami",
		"Commercial spaces in London",
		"Modern lofts in Tokyo",
		"Beach houses in Bali",
		"Penthouse in Dubai",
	];

	// Simulate search suggestions
	useEffect(() => {
		if (searchQuery.length > 0) {
			const filtered = sampleSuggestions.filter(suggestion =>
				suggestion.toLowerCase().includes(searchQuery.toLowerCase())
			);
			setSearchSuggestions(filtered);
		} else {
			setSearchSuggestions([]);
		}
	}, [searchQuery]);

	const handleSuggestionClick = (suggestion: string) => {
		setSearchQuery(suggestion);
		setSearchSuggestions([]);
		if (searchInputRef.current) {
			searchInputRef.current.focus();
		}
	};

	const handleClearSearch = () => {
		setSearchQuery("");
		setSearchSuggestions([]);
		if (searchInputRef.current) {
			searchInputRef.current.focus();
		}
	};

	return (
		<div className="flex flex-col gap-4 mb-8">
			{/* Top Bar - Logo & Actions */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					{/* Logo/App Name */}
					<div className="flex items-center gap-2">
						<div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
							<Building className="w-4 h-4 text-white" />
						</div>
						<div>
							<h1 className="text-lg font-bold text-gray-900 dark:text-white">
								Marketplace
							</h1>
							<p className="text-xs text-gray-600 dark:text-gray-400">
								Premium Real Estate
							</p>
						</div>
					</div>

					{/* Navigation Items - Desktop */}
					<div className="hidden md:flex items-center gap-5 ml-8">
						<button className="flex items-center gap-2 px-3 py-1.5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200">
							<TrendingUp className="w-4 h-4" />
							<span className="font-medium text-sm">Trending</span>
						</button>
						<button className="flex items-center gap-2 px-3 py-1.5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200">
							<Award className="w-4 h-4" />
							<span className="font-medium text-sm">Premium</span>
						</button>
						<button className="flex items-center gap-2 px-3 py-1.5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200">
							<Zap className="w-4 h-4" />
							<span className="font-medium text-sm">Deals</span>
							<span className="px-1.5 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs rounded-full">
								New
							</span>
						</button>
					</div>
				</div>

				{/* Right side actions */}
				<div className="flex items-center gap-3">
					{/* Notification */}
					<button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors relative">
						<Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
						<span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
					</button>

					{/* Cart */}
					<button
						onClick={() => setShowCart(true)}
						className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors relative group">
						<ShoppingCart className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600" />
						{cart.length > 0 && (
							<span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
								{cart.length}
							</span>
						)}
					</button>

					{/* Portfolio Balance - Compact */}
					<div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 cursor-pointer group">
						<div className="text-white">
							<div className="text-xs opacity-90 font-medium">Portfolio</div>
							<div className="font-bold text-sm">
								${(totalValue / 1000000).toFixed(1)}M
							</div>
						</div>
						<ArrowUpRight className="w-3.5 h-3.5 text-white/90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
					</div>
				</div>
			</div>

			{/* Search Section */}
			<div className="relative">
				{/* Search Bar */}
				<div className="relative">
					<div className="relative group">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
						<input
							ref={searchInputRef}
							type="text"
							placeholder="Search properties, locations, or features..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							onFocus={() => setIsSearchFocused(true)}
							onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
							className={`w-full pl-10 pr-10 py-3 bg-white dark:bg-gray-800 border ${
								isSearchFocused || searchQuery
									? 'border-blue-500 dark:border-blue-400 shadow-lg shadow-blue-500/10'
									: 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
							} rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition-all duration-200 text-sm`}
						/>
						{searchQuery && (
							<button
								onClick={handleClearSearch}
								className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
								<X className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
							</button>
						)}
					</div>
				</div>

				{/* Search Suggestions Dropdown */}
				{(isSearchFocused || searchQuery) && searchSuggestions.length > 0 && (
					<div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
						<div className="p-2">
							<div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
								Popular Searches
							</div>
							{searchSuggestions.map((suggestion, index) => (
								<button
									key={index}
									onClick={() => handleSuggestionClick(suggestion)}
									className="w-full text-left px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors flex items-center gap-3 group">
									<Search className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
									<span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
										{suggestion}
									</span>
								</button>
							))}
						</div>
						<div className="border-t border-gray-100 dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-900/50">
							<div className="text-xs text-gray-500 dark:text-gray-400 px-3 py-2">
								Try searching for: "luxury", "waterfront", "penthouse", "investment"
							</div>
						</div>
					</div>
				)}

				{/* Quick Stats - Mobile */}
				<div className="md:hidden flex items-center justify-between mt-3">
					<div className="flex items-center gap-4">
						<div className="text-center">
							<div className="text-sm font-semibold text-gray-900 dark:text-white">
								{cart.length}
							</div>
							<div className="text-xs text-gray-500">Properties</div>
						</div>
						<div className="text-center">
							<div className="text-sm font-semibold text-gray-900 dark:text-white">
								${(totalValue / 1000000).toFixed(1)}M
							</div>
							<div className="text-xs text-gray-500">Value</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}