/** @format */

import { motion } from "framer-motion";
import {
	Plus,
	TrendingUp,
	Layers,
	MoreVertical,
	ChevronRight,
	Activity,
	DollarSign,
	Clock,
	Home,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Property } from "./types";

interface PropertiesListProps {
	properties: Property[];
}

export default function PropertiesList({ properties }: PropertiesListProps) {
	const router = useRouter();

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.3 },
		},
	};

	return (
		<motion.div
			className="bg-white rounded-xl border border-gray-200 p-5"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}>
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
				<motion.div
					initial={{ opacity: 0, x: -10 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.3 }}>
					<h3 className="text-lg md:text-xl font-black text-gray-900 flex items-center gap-2 tracking-tight font-mclaren">
						<Layers className="w-5 h-5 text-blue-500" />
						Tokenized Properties
					</h3>
					<p className="text-sm text-gray-500 font-medium font-montserrat">
						Fractional real estate ownership
					</p>
				</motion.div>
				<motion.button
					onClick={() => router.push("/mint")}
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.3, delay: 0.1 }}
					whileHover={{
						scale: 1.05,
						boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)",
					}}
					whileTap={{ scale: 0.95 }}
					className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-gray-900 hover:bg-blue-600 text-white font-black rounded-full transition-all shadow-lg shadow-emerald-500/20">
					<span className="text-[10px] uppercase tracking-[0.4em] font-montserrat">
						Tokenize Property
					</span>
					<Plus className="w-4 h-4" />
				</motion.button>
			</div>

			<motion.div
				className="space-y-4"
				variants={containerVariants}
				initial="hidden"
				animate="visible">
				{properties.slice(0, 3).map((property, index) => (
					<motion.div
						key={property.id}
						variants={itemVariants}
						whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.5)", x: 4 }}
						className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 group">
						<div className="flex w-full sm:w-auto items-center gap-4">
							<motion.div
								className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center border border-gray-200"
								whileHover={{ scale: 1.05 }}
								transition={{ duration: 0.2 }}>
								{/* Placeholder for Token/Strategy Icon since we don't have strategy images yet */}
								<Home className="w-8 h-8 text-gray-400" />
								{/* Status Indicator */}
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ delay: 0.2 }}
									className="absolute top-1 left-1 px-1.5 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded shadow-sm font-montserrat">
									LIVE
								</motion.div>
							</motion.div>

							{/* Mobile: Title & Value shown here */}
							<div className="sm:hidden flex-1">
								<h4 className="font-bold text-gray-900 text-sm font-mclaren">
									{property.title}
								</h4>
								<div className="text-base font-bold text-emerald-600 font-montserrat">
									{/* Using price as 'Staked Amount' */}$
									{property.price.toLocaleString()} Tokenized
								</div>
							</div>

							<button className="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
								<MoreVertical className="w-5 h-5 text-gray-400" />
							</button>
						</div>

						<div className="flex-1 w-full">
							{/* Desktop: Title & Value */}
							<div className="hidden sm:flex items-center justify-between mb-1">
								<h4 className="font-bold text-gray-900 text-base font-mclaren">
									{property.title}
								</h4>
								<div className="text-lg font-bold text-emerald-600 font-montserrat flex items-center gap-1">
									<span className="text-xs text-gray-500 font-normal uppercase mr-1 font-montserrat">
										Tokenized:
									</span>
									${property.price.toLocaleString()}
								</div>
							</div>

							{/* Strategy Details: APY, TVL, Earned */}
							<motion.div
								className="flex items-center gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 w-full sm:w-auto mt-2"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.2 }}>
								<div className="flex items-center gap-1.5 text-xs sm:text-sm bg-blue-50 px-2 py-1 rounded-md text-blue-700 font-medium font-montserrat">
									<TrendingUp className="w-3.5 h-3.5" />
									{/* Mock APY based on bedrooms :) */}
									<span>{property.bedrooms * 4.2}% Rental Yield</span>
								</div>
								<div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600 font-montserrat">
									<Activity className="w-3.5 h-3.5 text-gray-400" />
									{/* Mock Risk Score based on bathrooms */}
									<span>Occupancy: 100%</span>
								</div>
								<div className="flex items-center gap-1.5 text-xs sm:text-sm text-emerald-600 font-medium ml-auto sm:ml-0 font-montserrat">
									<DollarSign className="w-3.5 h-3.5" />
									<span>
										Annual Rent: $
										{(property.price * 0.05).toLocaleString(undefined, {
											maximumFractionDigits: 0,
										})}
									</span>
								</div>
							</motion.div>
						</div>

						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
							className="hidden sm:block p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600">
							<MoreVertical className="w-5 h-5" />
						</motion.button>
					</motion.div>
				))}
			</motion.div>

			<motion.div
				className="mt-6 pt-6 border-t border-gray-200"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.4 }}>
				<motion.button
					whileHover={{ backgroundColor: "rgba(219, 234, 254, 1)" }}
					whileTap={{ scale: 0.98 }}
					className="w-full flex items-center justify-center gap-3 py-3 text-blue-600 font-black hover:bg-blue-50 rounded-full transition-colors font-montserrat">
					<span className="text-[10px] uppercase tracking-[0.4em] font-montserrat">
						View All Properties
					</span>
					<motion.div
						animate={{ x: [0, 4, 0] }}
						transition={{ duration: 2, repeat: Infinity }}>
						<ChevronRight className="w-4 h-4" />
					</motion.div>
				</motion.button>
			</motion.div>
		</motion.div>
	);
}
