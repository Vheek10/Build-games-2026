/** @format */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
	X,
	MapPin,
	Calendar,
	Building2,
	ShieldCheck,
	TrendingUp,
} from "lucide-react";
import propertyDetailsById from "@/data/marketplace-property-details.json";

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

interface PropertyDetails {
	overview: string;
	investmentHighlights: string[];
	amenities: string[];
	neighborhood: string;
	legalStatus: string;
	riskProfile: "Low" | "Medium" | "High";
}

interface PropertyDetailsModalProps {
	isOpen: boolean;
	onClose: () => void;
	property: Property;
	imageUrl: string;
}

const fallbackDetails: PropertyDetails = {
	overview:
		"A premium real estate opportunity with strong long-term fundamentals and attractive fractional ownership potential.",
	investmentHighlights: [
		"Prime location with resilient demand",
		"Token-ready ownership model",
		"Balanced growth and yield potential",
	],
	amenities: [
		"24/7 Security",
		"Smart Access",
		"Parking",
		"High-speed Connectivity",
	],
	neighborhood:
		"Well-connected district with access to transit, retail, and lifestyle infrastructure.",
	legalStatus: "Pre-verified for demo showcase.",
	riskProfile: "Medium",
};

export default function PropertyDetailsModal({
	isOpen,
	onClose,
	property,
	imageUrl,
}: PropertyDetailsModalProps) {
	const details =
		(propertyDetailsById as Record<string, PropertyDetails>)[
			String(property.id)
		] || fallbackDetails;

	const riskColor =
		details.riskProfile === "Low"
			? "text-emerald-700 bg-emerald-100"
			: details.riskProfile === "Medium"
				? "text-amber-700 bg-amber-100"
				: "text-red-700 bg-red-100";

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="fixed inset-0 z-9999 bg-black/60 backdrop-blur-sm"
					/>

					<div className="fixed inset-0 z-10000 flex items-center justify-center p-4">
						<motion.div
							initial={{ opacity: 0, y: 24, scale: 0.96 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: 18, scale: 0.98 }}
							transition={{ duration: 0.25, ease: "easeOut" }}
							className="w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
							<div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-6 sm:py-5">
								<div>
									<p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.22em] text-gray-400 mb-1">
										Marketplace
									</p>
									<h3 className="font-mclaren text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
										Property Details
									</h3>
									<p className="font-montserrat text-sm sm:text-base text-gray-600 mt-1 leading-snug">
										{property.title}
									</p>
								</div>
								<button
									onClick={onClose}
									className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100"
									aria-label="Close details modal">
									<X className="h-5 w-5" />
								</button>
							</div>

							<div className="max-h-[calc(90vh-84px)] overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
								<div className="mb-5 grid gap-4 sm:grid-cols-[1.2fr_1fr]">
									<img
										src={imageUrl}
										alt={property.title}
										className="h-52 w-full rounded-xl object-cover sm:h-full"
									/>
									<div className="rounded-xl border border-gray-100 bg-gray-50 p-4 sm:p-5">
										<div className="mb-3 flex items-center gap-2 text-gray-700">
											<MapPin className="h-4 w-4" />
											<span className="font-montserrat text-sm leading-relaxed">
												{property.location}
											</span>
										</div>
										<div className="mb-3 flex items-center gap-2 text-gray-700">
											<Calendar className="h-4 w-4" />
											<span className="font-montserrat text-sm leading-relaxed">
												Listed {property.createdAt}
											</span>
										</div>
										<div className="mb-3 flex items-center gap-2 text-gray-700">
											<Building2 className="h-4 w-4" />
											<span className="font-montserrat text-sm leading-relaxed">
												{property.type} - {property.country}
											</span>
										</div>
										<p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gray-400 mt-4">
											Asset Value
										</p>
										<div className="mt-1 text-2xl sm:text-3xl font-black text-gray-900 font-mclaren leading-none">
											${property.price.toLocaleString()}
										</div>
										<div
											className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-bold tracking-wide ${riskColor}`}>
											Risk: {details.riskProfile}
										</div>
									</div>
								</div>

								<div className="mb-5 rounded-xl border border-gray-100 p-4 sm:p-5">
									<h4 className="mb-2 font-mclaren text-lg font-bold text-gray-900">
										Overview
									</h4>
									<p className="font-montserrat text-sm sm:text-[15px] leading-7 text-gray-600">
										{details.overview}
									</p>
								</div>

								<div className="grid gap-4 md:grid-cols-2">
									<div className="rounded-xl border border-gray-100 p-4 sm:p-5">
										<h4 className="mb-3 flex items-center gap-2 font-mclaren text-lg font-bold text-gray-900">
											<TrendingUp className="h-4 w-4 text-emerald-600" />
											Investment Highlights
										</h4>
										<ul className="space-y-2 list-disc pl-4 marker:text-gray-400">
											{details.investmentHighlights.map((item) => (
												<li
													key={item}
													className="font-montserrat text-sm sm:text-[15px] leading-relaxed text-gray-600">
													{item}
												</li>
											))}
										</ul>
									</div>

									<div className="rounded-xl border border-gray-100 p-4 sm:p-5">
										<h4 className="mb-3 flex items-center gap-2 font-mclaren text-lg font-bold text-gray-900">
											<ShieldCheck className="h-4 w-4 text-blue-600" />
											Amenities
										</h4>
										<ul className="space-y-2 list-disc pl-4 marker:text-gray-400">
											{details.amenities.map((item) => (
												<li
													key={item}
													className="font-montserrat text-sm sm:text-[15px] leading-relaxed text-gray-600">
													{item}
												</li>
											))}
										</ul>
									</div>
								</div>

								<div className="mt-4 grid gap-4 md:grid-cols-2">
									<div className="rounded-xl border border-gray-100 p-4 sm:p-5">
										<h4 className="mb-2 font-mclaren text-lg font-bold text-gray-900">
											Neighborhood
										</h4>
										<p className="font-montserrat text-sm sm:text-[15px] leading-relaxed text-gray-600">
											{details.neighborhood}
										</p>
									</div>
									<div className="rounded-xl border border-gray-100 p-4 sm:p-5">
										<h4 className="mb-2 font-mclaren text-lg font-bold text-gray-900">
											Legal Status
										</h4>
										<p className="font-montserrat text-sm sm:text-[15px] leading-relaxed text-gray-600">
											{details.legalStatus}
										</p>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</>
			)}
		</AnimatePresence>
	);
}
