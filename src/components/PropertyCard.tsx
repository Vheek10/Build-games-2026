/** @format */
"use client";

import { useState } from "react";
import {
	MapPin,
	Heart,
	Share2,
	ShoppingCart,
	X,
	Eye,
	Bed,
	Bath,
	Square,
	Users,
	Star,
	TrendingUp,
	ArrowUpRight,
	Calendar,
	Building,
	CheckCircle,
	Info,
} from "lucide-react";

interface Property {
	id: number;
	title: string;
	description: string;
	location: string;
	price: number;
	bedrooms: number;
	bathrooms: number;
	squareFeet: number;
	capacity: number;
	views: number;
	isFeatured: boolean;
	country: string;
	createdAt: string;
	type: string;
	rating?: number;
	investmentReturn?: number;
}

interface PropertyCardProps {
	property: Property;
	imageUrl: string;
	isInWishlist: boolean;
	isInCart: boolean;
	onToggleWishlist: (id: number) => void;
	onAddToCart: (property: Property) => void;
	onRemoveFromCart: (id: number) => void;
}

export default function PropertyCard({
	property,
	imageUrl,
	isInWishlist,
	isInCart,
	onToggleWishlist,
	onAddToCart,
	onRemoveFromCart,
}: PropertyCardProps) {
	const [isHovered, setIsHovered] = useState(false);
	const [showShareOptions, setShowShareOptions] = useState(false);

	const calculatePricePerSqFt = (price: number, sqft: number) => {
		return (price / sqft).toLocaleString("en-US", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
	};

	const getReturnColor = (returnRate?: number) => {
		if (!returnRate) return "text-gray-500";
		if (returnRate >= 10) return "text-emerald-500";
		if (returnRate >= 5) return "text-blue-500";
		return "text-amber-500";
	};

	return (
		<div
			className="group"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			<div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 h-full flex flex-col">
				{/* Image Container */}
				<div className="relative h-48 overflow-hidden">
					{/* Main Image */}
					<img
						src={imageUrl}
						alt={property.title}
						className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
					/>

					{/* Overlay Gradient */}
					<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

					{/* Top Badges */}
					<div className="absolute top-4 left-4 flex flex-col gap-2">
						{property.isFeatured && (
							<div className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1.5">
								<Star className="w-3 h-3 fill-current" />
								Premium
							</div>
						)}
						{property.investmentReturn && (
							<div className="px-3 py-1.5 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm text-gray-900 dark:text-white text-xs font-semibold rounded-full shadow-lg">
								<span className={getReturnColor(property.investmentReturn)}>
									↑ {property.investmentReturn}% ROI
								</span>
							</div>
						)}
					</div>

					{/* Action Buttons */}
					<div className="absolute top-4 right-4 flex flex-col gap-2">
						<button
							onClick={() => onToggleWishlist(property.id)}
							className={`p-2 backdrop-blur-md rounded-full transition-all duration-300 transform hover:scale-110 ${
								isInWishlist
									? "bg-red-500/20 hover:bg-red-500/30"
									: "bg-white/10 hover:bg-white/20"
							}`}>
							<Heart
								className={`w-4 h-4 ${
									isInWishlist
										? "fill-red-500 text-red-500"
										: "text-white"
								}`}
							/>
						</button>

						<div className="relative">
							<button
								onClick={() => setShowShareOptions(!showShareOptions)}
								className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110">
								<Share2 className="w-4 h-4 text-white" />
							</button>

							{showShareOptions && (
								<div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-2 w-40 z-10 animate-in fade-in slide-in-from-top-2">
									<button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
										Copy Link
									</button>
									<button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
										Share on Twitter
									</button>
									<button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
										Share on LinkedIn
									</button>
								</div>
							)}
						</div>
					</div>

					{/* Location Badge */}
					<div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
						<div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm text-white px-3 py-2 rounded-full">
							<MapPin className="w-3.5 h-3.5" />
							<span className="text-xs font-medium">
								{property.location.split(",")[0]}
							</span>
						</div>
						<div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white px-2.5 py-1.5 rounded-full">
							<Eye className="w-3 h-3" />
							<span className="text-xs font-medium">{property.views}</span>
						</div>
					</div>
				</div>

				{/* Content Container */}
				<div className="p-5 flex-1 flex flex-col">
					{/* Header */}
					<div className="mb-4">
						<div className="flex items-start justify-between gap-2 mb-2">
							<h3 className="font-bold text-gray-900 dark:text-white text-lg line-clamp-1 flex-1">
								{property.title}
							</h3>
							<div className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded">
								<CheckCircle className="w-3 h-3 text-emerald-500" />
								<span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
									Verified
								</span>
							</div>
						</div>
						<p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
							{property.description}
						</p>
						<div className="flex items-center gap-3 text-xs text-gray-500">
							<div className="flex items-center gap-1">
								<Building className="w-3 h-3" />
								<span>{property.type}</span>
							</div>
							<div className="flex items-center gap-1">
								<Calendar className="w-3 h-3" />
								<span>Listed {formatDate(property.createdAt)}</span>
							</div>
						</div>
					</div>

					{/* Property Features */}
					<div className="grid grid-cols-4 gap-3 mb-6">
						<div className="text-center p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
							<Bed className="w-5 h-5 text-blue-500 mx-auto mb-1.5" />
							<div className="text-base font-bold text-gray-900 dark:text-white">
								{property.bedrooms}
							</div>
							<div className="text-xs text-gray-500 font-medium">Beds</div>
						</div>
						<div className="text-center p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
							<Bath className="w-5 h-5 text-cyan-500 mx-auto mb-1.5" />
							<div className="text-base font-bold text-gray-900 dark:text-white">
								{property.bathrooms}
							</div>
							<div className="text-xs text-gray-500 font-medium">Baths</div>
						</div>
						<div className="text-center p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
							<Square className="w-5 h-5 text-emerald-500 mx-auto mb-1.5" />
							<div className="text-base font-bold text-gray-900 dark:text-white">
								{property.squareFeet.toLocaleString()}
							</div>
							<div className="text-xs text-gray-500 font-medium">Sqft</div>
						</div>
						<div className="text-center p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
							<Users className="w-5 h-5 text-purple-500 mx-auto mb-1.5" />
							<div className="text-base font-bold text-gray-900 dark:text-white">
								{property.capacity}
							</div>
							<div className="text-xs text-gray-500 font-medium">Capacity</div>
						</div>
					</div>

					{/* Price & Actions */}
					<div className="mt-auto">
						{/* Price Info */}
						<div className="flex justify-between items-center mb-4 p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 rounded-xl">
							<div>
								<div className="flex items-center gap-2">
									<div className="text-2xl font-bold text-gray-900 dark:text-white">
										${property.price.toLocaleString()}
									</div>
									{property.rating && (
										<div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded">
											<Star className="w-3 h-3 fill-amber-500 text-amber-500" />
											<span className="text-xs font-bold text-amber-700 dark:text-amber-400">
												{property.rating.toFixed(1)}
											</span>
										</div>
									)}
								</div>
								<div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
									${calculatePricePerSqFt(property.price, property.squareFeet)}/sqft
								</div>
							</div>
							{property.investmentReturn && (
								<div className="text-right">
									<div className="text-xs text-gray-500">Est. ROI</div>
									<div className="flex items-center gap-1">
										<TrendingUp className="w-4 h-4 text-emerald-500" />
										<div className={`text-lg font-bold ${getReturnColor(property.investmentReturn)}`}>
											{property.investmentReturn}%
										</div>
									</div>
								</div>
							)}
						</div>

						{/* Action Buttons */}
						<div className="flex gap-2">
							{isInCart ? (
								<button
									onClick={() => onRemoveFromCart(property.id)}
									className="flex-1 px-4 py-3 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 text-red-600 dark:text-red-400 font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
									<X className="w-4 h-4" />
									Remove from Cart
								</button>
							) : (
								<button
									onClick={() => onAddToCart(property)}
									className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-[1.02] hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 flex items-center justify-center gap-2 group">
									<ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
									Add to Portfolio
								</button>
							)}
							<button className="px-4 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
								<Info className="w-4 h-4" />
								Details
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}