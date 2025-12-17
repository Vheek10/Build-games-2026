/** @format */
"use client";

import { useState, useMemo } from "react";
import { sampleProperties } from "../../lib/dummy-data";
import { Search, X } from "lucide-react";

import AuthGuard from "@/components/AuthGuard";

// Components
import MarketplaceHeader from "../../components/marketplace/MarketplaceHeader";
import PropertyGrid from "../../components/marketplace/PropertyGrid";
import MarketplaceFooter from "../../components/marketplace/MarketplaceFooter";

const demoImages = [
	"https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1616587226154-91eab0a51dc7?w=800&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1613977257592-4871e5fcd7a4?w=800&auto=format&fit=crop",
];

export default function MarketplacePage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [showSearch, setShowSearch] = useState(false);

	// Filter properties
	const filteredProperties = useMemo(() => {
		let filtered = [...sampleProperties];

		if (searchQuery) {
			filtered = filtered.filter(
				(property) =>
					property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
					property.description
						.toLowerCase()
						.includes(searchQuery.toLowerCase()),
			);
		}

		return filtered.slice(0, 9);
	}, [searchQuery]);

	const clearFilters = () => {
		setSearchQuery("");
	};

	return (
		<AuthGuard>
			<div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					{/* Header */}
					<MarketplaceHeader
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						showSearch={showSearch}
						setShowSearch={setShowSearch}
					/>

					{/* Mobile Search */}
					{showSearch && (
						<div className="md:hidden mb-6">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
								<input
									type="text"
									placeholder="Search properties..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="w-full pl-10 pr-10 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
					)}

					{/* Main Content */}
					<div className="flex flex-col gap-8">
						{/* Property Grid */}
						<PropertyGrid
							filteredProperties={filteredProperties}
							demoImages={demoImages}
							clearFilters={clearFilters}
						/>
					</div>
				</div>

				{/* Footer */}
				<MarketplaceFooter />
			</div>
		</AuthGuard>
	);
}
