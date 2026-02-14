/** @format */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import InvestNowModal from "./InvestNowModal";
import {
	MapPin,
	Eye,
	Bed,
	Bath,
	Square,
	Users,
	ArrowUpRight,
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
			<motion.div
				className="group h-full"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "0px 0px -100px 0px" }}
				transition={{ duration: 0.5, ease: "easeOut" }}
				whileHover={{ y: -8, transition: { duration: 0.3 } }}>
				<motion.div
					className="bg-white rounded-xl border border-gray-200 overflow-hidden h-full flex flex-col"
					whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
					transition={{ duration: 0.3 }}>
					<div className="relative h-48 sm:h-52 overflow-hidden">
						<motion.img
							src={imageUrl}
							alt={property.title}
							className="w-full h-full object-cover"
							whileHover={{ scale: 1.12 }}
							transition={{ duration: 0.6 }}
						/>

						{/* Overlays */}
						<div className="absolute top-3 left-3 flex flex-wrap gap-2 max-w-[90%]">
							{property.isFeatured && (
								<div className="px-2 py-1 bg-linear-to-r from-blue-600 to-cyan-500 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded shadow-sm backdrop-blur-sm">
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
								<MapPin className="w-3 h-3 shrink-0 text-gray-300" />
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
						<motion.div
							className="mb-4"
							initial={{ opacity: 0, x: -10 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.1 }}>
							<h3 className="font-black text-gray-900 text-base sm:text-lg mb-1.5 line-clamp-1 group-hover:text-blue-600 transition-colors tracking-tight font-mclaren">
								{property.title}
							</h3>
							<p className="text-gray-500 text-xs sm:text-sm line-clamp-2 leading-relaxed font-montserrat">
								{property.description}
							</p>
						</motion.div>

						{/* Stats Grid */}
						<motion.div
							className="grid grid-cols-3 gap-2 mb-5 p-3 bg-gray-50 rounded-xl border border-gray-100"
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.2 }}>
							{property.type !== "Commercial" ? (
								<>
									<div className="text-center border-r border-gray-200">
										<div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-xs text-gray-500 uppercase font-medium mb-0.5">
											<Bed className="w-3.5 h-3.5" />
											<span>Beds</span>
										</div>
										<div className="font-bold text-gray-900 text-sm">
											{property.bedrooms}
										</div>
									</div>
									<div className="text-center border-r border-gray-200">
										<div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-xs text-gray-500 uppercase font-medium mb-0.5">
											<Bath className="w-3.5 h-3.5" />
											<span>Baths</span>
										</div>
										<div className="font-bold text-gray-900 text-sm">
											{property.bathrooms}
										</div>
									</div>
								</>
							) : (
								<div className="col-span-2 text-center border-r border-gray-200">
									<div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-xs text-gray-500 uppercase font-medium mb-0.5">
										<Users className="w-3.5 h-3.5" />
										<span>Capacity</span>
									</div>
									<div className="font-bold text-gray-900 text-sm">
										{property.capacity}
									</div>
								</div>
							)}
							<div className="text-center">
								<div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-xs text-gray-500 uppercase font-medium mb-0.5">
									<Square className="w-3.5 h-3.5" />
									<span>Sqft</span>
								</div>
								<div className="font-bold text-gray-900 text-sm">
									{property.squareFeet.toLocaleString()}
								</div>
							</div>
						</motion.div>

						{/* Funding Progress Bar */}
						<div className="mb-5">
							<motion.div
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: 0.2 }}>
								<div className="flex justify-between items-center text-xs mb-1.5">
									<span className="text-gray-600 font-medium">
										Tokenization Progress
									</span>
									<span className="text-blue-600 font-bold">
										{fundingProgress}% Funded
									</span>
								</div>
								<div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
									<motion.div
										className="h-full bg-linear-to-r from-blue-500 to-cyan-400 rounded-full"
										initial={{ width: 0 }}
										whileInView={{ width: `${fundingProgress}%` }}
										viewport={{ once: true }}
										transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
									/>
								</div>
							</motion.div>

							<div className="mt-auto">
								<div className="flex justify-between items-end mb-4">
									<div>
										<div className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-0.5 font-black font-montserrat">
											Asset Value
										</div>
										<div className="text-lg sm:text-xl font-black text-gray-900 font-mclaren">
											${property.price.toLocaleString()}
										</div>
									</div>
								</div>

								<motion.button
									onClick={handleInvestClick}
									whileHover={{
										scale: 1.05,
										y: -5,
										backgroundColor: "#2563eb",
										color: "#ffffff",
										transition: { duration: 0.4 },
									}}
									whileTap={{ scale: 0.98 }}
									className="w-full px-6 py-4 bg-gray-900 text-white rounded-full transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] flex items-center justify-center gap-3">
									<span className="text-[10px] font-black uppercase tracking-[0.4em] font-montserrat">
										Invest Now
									</span>
									<ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
								</motion.button>
							</div>
						</div>
					</div>
				</motion.div>
			</motion.div>

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
