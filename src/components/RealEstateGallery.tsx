import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import Image from "next/image";
import {
	REAL_ESTATE_IMAGES,
	ImageCategory,
	CATEGORY_DESCRIPTIONS,
} from "@/utils/realEstateImages";
import { Search, Filter, X, Grid, List, ChevronRight, Sparkles } from "lucide-react";

const categories = [
	{ id: "all", label: "All Assets", color: "blue" },
	{ id: "modern-buildings", label: "Modern Architecture", color: "indigo" },
	{ id: "interiors", label: "Luxury Interiors", color: "emerald" },
	{ id: "cityscapes", label: "Prime Cityscapes", color: "cyan" },
	{ id: "blockchain-tech", label: "Web3 Infrastructure", color: "purple" },
	{ id: "office-spaces", label: "Workspace Equity", color: "orange" },
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20, scale: 0.95 },
	visible: { 
		opacity: 1, 
		y: 0, 
		scale: 1,
		transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
	},
};

export default function RealEstateGallery() {
	const [selectedCategory, setSelectedCategory] = useState<
		ImageCategory | "all"
	>("all");
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

	const filteredImages = useMemo(() => {
		return REAL_ESTATE_IMAGES.filter((image) => {
			const matchesCategory =
				selectedCategory === "all" || image.category === selectedCategory;
			const matchesSearch =
				searchTerm === "" ||
				image.tags.some((tag) =>
					tag.toLowerCase().includes(searchTerm.toLowerCase()),
				) ||
				image.alt.toLowerCase().includes(searchTerm.toLowerCase());
			return matchesCategory && matchesSearch;
		});
	}, [selectedCategory, searchTerm]);

	const handleCategorySelect = (category: ImageCategory | "all") => {
		setSelectedCategory(category);
		setSearchTerm("");
	};

	return (
		<section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/30 overflow-hidden">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<motion.div 
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-6">
						<Sparkles className="w-4 h-4 text-blue-600" />
						<span className="text-xs font-black text-blue-600 uppercase tracking-[0.2em]">Curated Portfolio</span>
					</div>
					<h1 className="text-4xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight">
						Explore <span className="text-blue-600">Digital Equity</span>
					</h1>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
						Discover tokenized real estate assets from global markets, verified and ready for fractional ownership.
					</p>
				</motion.div>

				{/* Quick Stats - Animated Grid */}
				<motion.div 
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
				>
					{[
						{ label: "On-Chain Assets", value: REAL_ESTATE_IMAGES.length, color: "blue" },
						{ label: "Market Sectors", value: categories.length - 1, color: "emerald" },
						{ label: "Verified Data Points", value: REAL_ESTATE_IMAGES.reduce((acc, img) => acc + img.tags.length, 0), color: "purple" },
						{ label: "Active Verifiers", value: 12, color: "cyan" },
					].map((stat, idx) => (
						<motion.div 
							key={idx}
							whileHover={{ y: -5 }}
							className={`bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-${stat.color}-500/5 transition-all duration-300 group`}
						>
							<div className={`text-4xl font-black text-${stat.color}-600 mb-1 group-hover:scale-105 transition-transform`}>
								{stat.value}
							</div>
							<div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
						</motion.div>
					))}
				</motion.div>

				{/* Filters Section */}
				<div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-gray-200 p-8 mb-12 shadow-2xl shadow-gray-200/50">
					{/* Category Tabs */}
					<div className="flex flex-wrap gap-2 mb-8">
						{categories.map((category) => {
							const isActive = selectedCategory === category.id;
							return (
								<motion.button
									key={category.id}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => handleCategorySelect(category.id as any)}
									className={`relative px-6 py-2.5 rounded-2xl transition-all font-bold text-sm flex items-center gap-2 overflow-hidden ${
										isActive 
											? `bg-gray-900 text-white` 
											: `bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 shadow-sm`
									}`}
								>
									{isActive && (
										<motion.div 
											layoutId="active-bg"
											className="absolute inset-0 bg-blue-600 -z-10"
										/>
									)}
									<span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-white" : `bg-${category.color}-500`}`} />
									{category.label}
								</motion.button>
							);
						})}
					</div>

					<div className="flex flex-col lg:flex-row gap-6">
						<div className="flex-1 relative">
							<div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
								<Search className="w-5 h-5 text-gray-400" />
								<div className="h-4 w-[1px] bg-gray-200" />
							</div>
							<input
								type="text"
								placeholder="Search properties by location, tags, or category..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-14 pr-6 py-4 bg-gray-50/50 border border-gray-100 rounded-[1.5rem] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all font-medium"
							/>
						</div>

						<div className="flex gap-2 bg-gray-50 flex-shrink-0 p-1.5 rounded-[1.25rem] border border-gray-100">
							<button
								onClick={() => setViewMode("grid")}
								className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${viewMode === "grid" ? "bg-white shadow-md text-blue-600 font-bold" : "text-gray-400 hover:text-gray-600"}`}
							>
								<Grid className="w-4 h-4" />
								<span className="text-xs uppercase tracking-wider">Grid</span>
							</button>
							<button
								onClick={() => setViewMode("list")}
								className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${viewMode === "list" ? "bg-white shadow-md text-blue-600 font-bold" : "text-gray-400 hover:text-gray-600"}`}
							>
								<List className="w-4 h-4" />
								<span className="text-xs uppercase tracking-wider">List</span>
							</button>
						</div>
					</div>
				</div>

				{/* Gallery Grid/List */}
				<AnimatePresence mode="popLayout">
					{filteredImages.length === 0 ? (
						<motion.div 
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.9 }}
							className="text-center py-24"
						>
							<div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
								<Search className="w-10 h-10 text-gray-300" />
							</div>
							<h3 className="text-2xl font-black text-gray-900 mb-2">No Properties Found</h3>
							<p className="text-gray-500 font-medium">Try adjusting your filters to find suitable assets.</p>
						</motion.div>
					) : (
						<motion.div
							key={`${selectedCategory}-${searchTerm}-${viewMode}`}
							variants={containerVariants}
							initial="hidden"
							animate="visible"
							className={viewMode === "grid" 
								? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" 
								: "space-y-6"
							}
						>
							{filteredImages.map((image) => (
								<motion.div
									layout
									variants={itemVariants}
									key={image.id}
									whileHover={{ y: -10 }}
									className={cn(
										"group relative transition-all duration-500",
										viewMode === "grid" 
											? "flex flex-col bg-white rounded-[2.5rem] border border-gray-200 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 cursor-pointer overflow-hidden p-3" 
											: "flex flex-col sm:flex-row gap-8 bg-white rounded-[2.5rem] border border-gray-200 shadow-sm hover:shadow-2xl p-5 hover:border-blue-200 cursor-pointer"
									)}
									onClick={() => setSelectedImage(image.url)}
								>
									{/* Thumbnail */}
									<div className={cn(
										"relative overflow-hidden rounded-[1.8rem]",
										viewMode === "grid" ? "aspect-[4/3]" : "sm:w-80 aspect-video flex-shrink-0"
									)}>
										<Image
											src={image.url}
											alt={image.alt}
											fill
											className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
											sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
										
										{/* Badges */}
										<div className="absolute top-4 left-4 flex gap-2">
											<span className="px-3 py-1 bg-white/10 backdrop-blur-md text-[10px] font-black text-white uppercase tracking-widest rounded-lg border border-white/20">
												{categories.find((c) => c.id === image.category)?.label.split(' ')[0]}
											</span>
										</div>
										
										<div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
											<div className="flex items-center justify-between text-white">
												<span className="text-xs font-bold uppercase tracking-widest">Verify Ownership</span>
												<ChevronRight className="w-4 h-4" />
											</div>
										</div>
									</div>

									{/* Info */}
									<div className={cn("flex flex-col justify-center", viewMode === "grid" ? "p-5" : "flex-1 py-2 pr-6")}>
										<div className="flex items-center gap-2 mb-3">
											<span className="w-2 h-2 rounded-full bg-emerald-500" />
											<span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Available for Listing</span>
										</div>
										<h4 className="text-lg font-black text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight mb-3">
											{image.alt}
										</h4>
										
										<div className="flex flex-wrap gap-2 mb-4">
											{image.tags.slice(0, 3).map((tag) => (
												<span key={tag} className="px-2.5 py-1 text-[10px] font-bold bg-gray-100 text-gray-400 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors uppercase tracking-tight">
													#{tag}
												</span>
											))}
										</div>

										<div className="flex items-center justify-between pt-4 border-t border-gray-100">
											<div className="flex items-center gap-2">
												<div className="w-6 h-6 rounded-full bg-gray-200" />
												<span className="text-[10px] font-bold text-gray-500 truncate max-w-[100px] uppercase">
													{image.photographer || "Verified Agent"}
												</span>
											</div>
											<div className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform">
												Details <ArrowRight className="w-3 h-3" />
											</div>
										</div>
									</div>
								</motion.div>
							))}
						</motion.div>
					)}
				</AnimatePresence>

				{/* Image Modal - Enhanced with Motion */}
				<AnimatePresence>
					{selectedImage && (
						<motion.div 
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 bg-gray-900/95 z-50 flex items-center justify-center p-4 backdrop-blur-3xl" 
							onClick={() => setSelectedImage(null)}
						>
							<motion.button 
								initial={{ scale: 0, rotate: -90 }}
								animate={{ scale: 1, rotate: 0 }}
								className="absolute top-8 right-8 text-white hover:text-blue-400 transition-colors z-50 p-2 bg-white/5 rounded-full border border-white/10" 
								onClick={() => setSelectedImage(null)}
							>
								<X className="w-8 h-8" />
							</motion.button>

							<motion.div 
								initial={{ scale: 0.9, opacity: 0, y: 50 }}
								animate={{ scale: 1, opacity: 1, y: 0 }}
								exit={{ scale: 0.9, opacity: 0, y: 50 }}
								className="relative w-full max-w-6xl h-[75vh]"
								onClick={(e) => e.stopPropagation()}
							>
								<Image 
									src={selectedImage} 
									alt="Full size preview" 
									fill 
									className="object-contain rounded-[3rem]" 
									sizes="100vw" 
									priority 
								/>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</section>
	);
}
