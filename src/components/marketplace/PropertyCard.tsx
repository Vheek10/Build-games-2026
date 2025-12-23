/** @format */
"use client";

import { useState } from "react";
import InvestNowModal from "./InvestNowModal";
import {
	MapPin,
	Eye,
	Bed,
	Bath,
	Square,
	Users,
	ArrowRight,
	TrendingUp,
	Star,
} from "lucide-react";
import { useRouter } from "next/navigation";

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
	investmentReturn?: number;
	rating?: number;
	isMinted?: boolean;
	txHash?: string;
}

interface PropertyCardProps {
	property: Property;
	imageUrl: string;
}

export default function PropertyCard({
	property,
	imageUrl,
}: PropertyCardProps) {
	const router = useRouter();
	const [showInvestModal, setShowInvestModal] = useState(false);

	// Simulate funding progress based on ID (just for demo)
	const fundingProgress = Math.min(100, Math.max(15, (property.id * 13) % 100));

	const handleInvestClick = () => {
		console.log("Opening investment modal for property:", property.id);
		setShowInvestModal(true);
	};

	return (
		<>
			<div className="group h-full">
				<div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
					<div className="relative h-48 sm:h-52 overflow-hidden">
						<img
							src={imageUrl}
							alt={property.title}
							className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
						/>

						{/* Overlays */}
						<div className="absolute top-3 left-3 flex flex-wrap gap-2 max-w-[90%]">
							{property.isFeatured && (
								<div className="px-2 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded shadow-sm backdrop-blur-sm">
									Premium
								</div>
							)}
							{property.investmentReturn && (
								<div className="px-2 py-1 bg-emerald-500 text-white text-[10px] sm:text-xs font-bold rounded shadow-sm flex items-center gap-1 backdrop-blur-sm">
									<TrendingUp className="w-3 h-3" />
									{property.investmentReturn}% Yield
								</div>
							)}
							{property.isMinted && (
								<div className="px-2 py-1 bg-purple-600 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded shadow-sm backdrop-blur-sm">
									Minted
								</div>
							)}
						</div>

						<div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
							<div className="flex items-center gap-1 bg-black/70 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs truncate max-w-[65%] border border-white/10">
								<MapPin className="w-3 h-3 flex-shrink-0 text-gray-300" />
								<span className="truncate font-medium">
									{property.location.split(",")[0]}
								</span>
							</div>
							{property.rating && (
								<div className="flex items-center gap-1 bg-black/70 backdrop-blur-md text-yellow-400 px-2 py-1 rounded-lg text-xs font-bold border border-white/10 shadow-sm">
									<Star className="w-3 h-3 fill-yellow-400" />
									<span>{property.rating}</span>
								</div>
							)}
						</div>
					</div>

					<div className="p-4 sm:p-5 flex-1 flex flex-col">
						<div className="mb-4">
							<h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg mb-1.5 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
								{property.title}
							</h3>
							<p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm line-clamp-2 leading-relaxed">
								{property.description}
							</p>
						</div>

						{/* Stats Grid */}
						<div className="grid grid-cols-3 gap-2 mb-5 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
							{property.type !== "Commercial" ? (
								<>
									<div className="text-center border-r border-gray-200 dark:border-gray-800">
										<div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-xs text-gray-500 uppercase font-medium mb-0.5">
											<Bed className="w-3.5 h-3.5" />
											<span>Beds</span>
										</div>
										<div className="font-bold text-gray-900 dark:text-white text-sm">
											{property.bedrooms}
										</div>
									</div>
									<div className="text-center border-r border-gray-200 dark:border-gray-800">
										<div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-xs text-gray-500 uppercase font-medium mb-0.5">
											<Bath className="w-3.5 h-3.5" />
											<span>Baths</span>
										</div>
										<div className="font-bold text-gray-900 dark:text-white text-sm">
											{property.bathrooms}
										</div>
									</div>
								</>
							) : (
								<div className="col-span-2 text-center border-r border-gray-200 dark:border-gray-800">
									<div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-xs text-gray-500 uppercase font-medium mb-0.5">
										<Users className="w-3.5 h-3.5" />
										<span>Capacity</span>
									</div>
									<div className="font-bold text-gray-900 dark:text-white text-sm">
										{property.capacity}
									</div>
								</div>
							)}
							<div className="text-center">
								<div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-xs text-gray-500 uppercase font-medium mb-0.5">
									<Square className="w-3.5 h-3.5" />
									<span>Sqft</span>
								</div>
								<div className="font-bold text-gray-900 dark:text-white text-sm">
									{property.squareFeet.toLocaleString()}
								</div>
							</div>
						</div>

						{/* Funding Progress Bar */}
						<div className="mb-5">
							<div className="flex justify-between items-center text-xs mb-1.5">
								<span className="text-gray-600 dark:text-gray-400 font-medium">
									Tokenization Progress
								</span>
								<span className="text-blue-600 dark:text-blue-400 font-bold">
									{fundingProgress}% Funded
								</span>
							</div>
							<div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
								<div
									className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000 ease-out"
									style={{ width: `${fundingProgress}%` }}
								/>
							</div>

							<div className="mt-auto">
								<div className="flex justify-between items-end mb-4">
									<div>
										<div className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-0.5 font-medium">
											Asset Value
										</div>
										<div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
											${property.price.toLocaleString()}
										</div>
									</div>
									
								</div>

								<button
									onClick={handleInvestClick}
									className="w-full px-4 py-3 bg-white text-gray-900  font-bold rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm shadow-sm border border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
									Invest Now
									<ArrowRight className="w-4 h-4" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Invest Now Modal */}
			{showInvestModal && (
				<InvestNowModal
					isOpen={showInvestModal}
					onClose={() => setShowInvestModal(false)}
					property={property}
					imageUrl={imageUrl}
				/>
			)}
		</>
	);
}
