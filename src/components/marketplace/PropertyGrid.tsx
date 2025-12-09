/** @format */
"use client";

import { Search } from "lucide-react";
import PropertyCard from "./PropertyCard";

interface PropertyGridProps {
	filteredProperties: Array<any>;
	demoImages: string[];
	wishlist: number[];
	cart: Array<{ property: any; quantity: number }>;
	addToCart: (property: any) => void;
	removeFromCart: (id: number) => void;
	toggleWishlist: (id: number) => void;
	clearFilters: () => void;
}

export default function PropertyGrid({
	filteredProperties,
	demoImages,
	wishlist,
	cart,
	addToCart,
	removeFromCart,
	toggleWishlist,
	clearFilters,
}: PropertyGridProps) {
	if (filteredProperties.length === 0) {
		return (
			<div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
				<Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
				<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
					No properties found
				</h3>
				<p className="text-gray-600 dark:text-gray-400 mb-6">
					Try adjusting your search criteria
				</p>
				<button
					onClick={clearFilters}
					className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
					Clear Filters
				</button>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
			{filteredProperties.map((property) => {
				const isInWishlist = wishlist.includes(property.id);
				const isInCart = cart.some(
					(item) => item.property.id === property.id,
				);

				return (
					<PropertyCard
						key={property.id}
						property={property}
						imageUrl={demoImages[property.id % demoImages.length]}
						isInWishlist={isInWishlist}
						isInCart={isInCart}
						onToggleWishlist={toggleWishlist}
						onAddToCart={addToCart}
						onRemoveFromCart={removeFromCart}
					/>
				);
			})}
		</div>
	);
}