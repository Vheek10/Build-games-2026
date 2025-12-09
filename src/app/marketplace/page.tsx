/** @format */
"use client";

import { useState, useMemo } from "react";
import CartSidebar from "../../components/CartSidebar";
import { sampleProperties } from "../../lib/dummy-data";
import {
	Home,
	Building,
	Hotel,
	Castle,
	TreePine,
	Waves,
	Globe,
	Star,
	Search,
	X,
	Tag,
	Sparkles,
	CheckCircle,
	Eye,
} from "lucide-react";

// Components
import MarketplaceHeader from "../../components/marketplace/MarketplaceHeader";
import FilterSidebar from "../../components/marketplace/FilterSidebar";
import ControlsBar from "../../components/marketplace/ControlsBar";
import PropertyGrid from "../../components/marketplace/PropertyGrid";
import MarketInsights from "../../components/marketplace/MarketInsights";
import FeaturedShowcase from "../../components/marketplace/FeaturedShowcase";
import MarketplaceFooter from "../../components/marketplace/MarketplaceFooter";

// Data
const cities = [
	{ name: "All Cities", icon: Globe },
	{ name: "New York", icon: Building, properties: 45, country: "USA" },
	{ name: "London", icon: Castle, properties: 32, country: "UK" },
	{ name: "Tokyo", icon: Hotel, properties: 28, country: "Japan" },
	{ name: "Dubai", icon: Building, properties: 24, country: "UAE" },
	{ name: "Singapore", icon: Building, properties: 19, country: "Singapore" },
	{ name: "Sydney", icon: Waves, properties: 16, country: "Australia" },
	{ name: "Miami", icon: Home, properties: 22, country: "USA" },
	{ name: "Vancouver", icon: TreePine, properties: 14, country: "Canada" },
];

const propertyTypes = [
	{ label: "All Types", icon: Home },
	{ label: "Apartments", icon: Building },
	{ label: "Villas", icon: Castle },
	{ label: "Commercial", icon: Building },
	{ label: "Luxury", icon: Star },
	{ label: "Beachfront", icon: Waves },
];

const priceRanges = [
	{ label: "Any Price", min: 0, max: Infinity },
	{ label: "Under $100K", min: 0, max: 100000 },
	{ label: "$100K - $500K", min: 100000, max: 500000 },
	{ label: "$500K - $1M", min: 500000, max: 1000000 },
	{ label: "$1M - $5M", min: 1000000, max: 5000000 },
	{ label: "Over $5M", min: 5000000, max: Infinity },
];

const demoImages = [
	"https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1616587226154-91eab0a51dc7?w=800&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1613977257592-4871e5fcd7a4?w=800&auto=format&fit=crop",
];

interface CartItem {
	property: (typeof sampleProperties)[0];
	quantity: number;
}

export default function MarketplacePage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCity, setSelectedCity] = useState("All Cities");
	const [selectedType, setSelectedType] = useState("All Types");
	const [selectedPrice, setSelectedPrice] = useState("Any Price");
	const [showFilters, setShowFilters] = useState(false);
	const [sortBy, setSortBy] = useState("featured");
	const [cart, setCart] = useState<CartItem[]>([]);
	const [showCart, setShowCart] = useState(false);
	const [wishlist, setWishlist] = useState<number[]>([]);
	const [showSearch, setShowSearch] = useState(false);
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	// Cart functionality
	const addToCart = (property: (typeof sampleProperties)[0]) => {
		setCart((prev) => {
			const existing = prev.find((item) => item.property.id === property.id);
			if (existing) {
				return prev.map((item) =>
					item.property.id === property.id
						? { ...item, quantity: item.quantity + 1 }
						: item,
				);
			}
			return [...prev, { property, quantity: 1 }];
		});
	};

	const removeFromCart = (propertyId: number) => {
		setCart((prev) => prev.filter((item) => item.property.id !== propertyId));
	};

	const updateQuantity = (propertyId: number, quantity: number) => {
		if (quantity < 1) {
			removeFromCart(propertyId);
			return;
		}
		setCart((prev) =>
			prev.map((item) =>
				item.property.id === propertyId ? { ...item, quantity } : item,
			),
		);
	};

	const toggleWishlist = (propertyId: number) => {
		setWishlist((prev) =>
			prev.includes(propertyId)
				? prev.filter((id) => id !== propertyId)
				: [...prev, propertyId],
		);
	};

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

		if (selectedCity !== "All Cities") {
			filtered = filtered.filter((property) =>
				property.location.toLowerCase().includes(selectedCity.toLowerCase()),
			);
		}

		if (selectedType !== "All Types") {
			filtered = filtered.filter(
				(property) =>
					property.type.toLowerCase() === selectedType.toLowerCase(),
			);
		}

		if (selectedPrice !== "Any Price") {
			const priceRange = priceRanges.find(
				(range) => range.label === selectedPrice,
			);
			if (priceRange) {
				filtered = filtered.filter(
					(property) =>
						property.price >= priceRange.min &&
						property.price <= priceRange.max,
				);
			}
		}

		switch (sortBy) {
			case "price-low":
				filtered.sort((a, b) => a.price - b.price);
				break;
			case "price-high":
				filtered.sort((a, b) => b.price - a.price);
				break;
			case "newest":
				filtered.sort(
					(a, b) =>
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
				);
				break;
			case "featured":
				filtered.sort(
					(a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0),
				);
				break;
		}

		return filtered;
	}, [searchQuery, selectedCity, selectedType, selectedPrice, sortBy]);

	// Calculations
	const totalValue = filteredProperties.reduce(
		(sum, prop) => sum + prop.price,
		0,
	);
	const averagePrice =
		filteredProperties.length > 0
			? (totalValue / filteredProperties.length).toLocaleString("en-US", {
					style: "currency",
					currency: "USD",
					maximumFractionDigits: 0,
			  })
			: "$0";

	const cartTotal = cart.reduce(
		(sum, item) => sum + item.property.price * item.quantity,
		0,
	);

	const clearFilters = () => {
		setSearchQuery("");
		setSelectedCity("All Cities");
		setSelectedType("All Types");
		setSelectedPrice("Any Price");
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
				{/* Header */}
				<MarketplaceHeader
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					showSearch={showSearch}
					setShowSearch={setShowSearch}
					cart={cart}
					setShowCart={setShowCart}
					totalValue={totalValue}
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
				<div className="flex flex-col lg:flex-row gap-8">
					{/* Filters Sidebar */}
					<FilterSidebar
						showFilters={showFilters}
						setShowFilters={setShowFilters}
						filteredProperties={filteredProperties}
						totalValue={totalValue}
						averagePrice={averagePrice}
						cities={cities}
						selectedCity={selectedCity}
						setSelectedCity={setSelectedCity}
						propertyTypes={propertyTypes}
						selectedType={selectedType}
						setSelectedType={setSelectedType}
						priceRanges={priceRanges}
						selectedPrice={selectedPrice}
						setSelectedPrice={setSelectedPrice}
						searchQuery={searchQuery}
						clearFilters={clearFilters}
					/>

					{/* Property Grid */}
					<div className="lg:w-3/4">
						{/* Page Header */}
						<div className="mb-6">
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
								Premium Properties
							</h2>
							<p className="text-gray-600 dark:text-gray-400 mt-1">
								Discover exclusive real estate investments worldwide
							</p>
						</div>

						{/* Controls */}
						<ControlsBar
							filteredProperties={filteredProperties}
							sortBy={sortBy}
							setSortBy={setSortBy}
							viewMode={viewMode}
							setViewMode={setViewMode}
						/>

						{/* Property Grid */}
						<PropertyGrid
							filteredProperties={filteredProperties}
							demoImages={demoImages}
							wishlist={wishlist}
							cart={cart}
							addToCart={addToCart}
							removeFromCart={removeFromCart}
							toggleWishlist={toggleWishlist}
							clearFilters={clearFilters}
						/>

						{/* Market Insights */}
						{filteredProperties.length > 0 && (
							<MarketInsights
								filteredProperties={filteredProperties}
								averagePrice={averagePrice}
								totalValue={totalValue}
							/>
						)}
					</div>
				</div>
			</div>

			{/* Featured Showcase */}
			<FeaturedShowcase demoImages={demoImages} />

			{/* Footer */}
			<MarketplaceFooter />

			{/* Cart Sidebar */}
			<CartSidebar
				isOpen={showCart}
				onClose={() => setShowCart(false)}
				cart={cart}
				onUpdateQuantity={updateQuantity}
				onRemoveItem={removeFromCart}
				cartTotal={cartTotal}
			/>
		</div>
	);
}
