/** @format */

"use client";

import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

interface PerformanceChartProps {
	timeRange: string;
	onTimeRangeChange: (range: string) => void;
	monthlyGrowth: number;
	portfolioValue: number;
}

export default function PerformanceChart({
	timeRange,
	onTimeRangeChange,
	monthlyGrowth,
	portfolioValue,
}: PerformanceChartProps) {
	const timeRanges = ["weekly", "monthly", "quarterly", "yearly"];

	return (
		<motion.div
			className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}>
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
				<motion.div
					initial={{ opacity: 0, x: -10 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.3, delay: 0.1 }}>
					<h3 className="font-bold text-gray-900 font-mclaren text-lg">
						Portfolio Performance
					</h3>
					<p className="text-sm text-gray-600 font-montserrat">
						Value growth and rental yield trends
					</p>
				</motion.div>
				<motion.div
					className="flex flex-wrap items-center gap-2"
					initial={{ opacity: 0, x: 10 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.3, delay: 0.1 }}>
					{timeRanges.map((range, index) => (
						<motion.button
							key={range}
							onClick={() => onTimeRangeChange(range)}
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.2, delay: 0.15 + index * 0.05 }}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className={`px-3 py-1 rounded-lg text-xs sm:text-sm capitalize font-montserrat transition-all ${
								timeRange === range
									? "bg-blue-100 text-blue-600 font-medium shadow-md"
									: "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
							}`}>
							{range}
						</motion.button>
					))}
				</motion.div>
			</div>

			<motion.div
				className="h-64 relative bg-gradient-to-b from-gray-50 to-white rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.2 }}>
				{/* Animated background grid */}
				<motion.div
					className="absolute inset-0 opacity-20"
					initial={{ backgroundPosition: "0 0" }}
					animate={{ backgroundPosition: "40px 40px" }}
					transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
					style={{
						backgroundImage:
							"linear-gradient(45deg, transparent 48%, #3b82f6 49%, #3b82f6 51%, transparent 52%)",
						backgroundSize: "40px 40px",
					}}
				/>

				<motion.div
					className="text-center relative z-10"
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.4, delay: 0.3 }}>
					<motion.div
						animate={{ y: [0, -8, 0] }}
						transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
						<BarChart3 className="w-12 h-12 text-blue-400 mx-auto mb-3" />
					</motion.div>
					<p className="text-gray-600 font-montserrat">
						Performance chart visualization
					</p>
					<p className="text-sm text-gray-500 font-montserrat">
						Real-time value tracking
					</p>
				</motion.div>
			</motion.div>

			<motion.div
				className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.4, delay: 0.4 }}>
				{[
					{ label: "Avg. Rental Yield", value: `+${monthlyGrowth}%` },
					{
						label: "Peak Value",
						value: `$${((portfolioValue * 1.2) / 1000000).toFixed(2)}M`,
					},
					{ label: "Market Rank", value: "Top 5%" },
				].map((stat, index) => (
					<motion.div
						key={stat.label}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, delay: 0.45 + index * 0.1 }}>
						<div className="text-sm text-gray-600 font-montserrat">
							{stat.label}
						</div>
						<div className="text-lg font-bold text-gray-900 font-mclaren">
							{stat.value}
						</div>
					</motion.div>
				))}
			</motion.div>
		</motion.div>
	);
}
