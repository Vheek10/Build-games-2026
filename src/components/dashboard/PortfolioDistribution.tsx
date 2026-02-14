/** @format */

import { motion } from "framer-motion";
import { PieChart, Shield, CheckCircle } from "lucide-react";
import { PortfolioDistribution as PortfolioDistributionType } from "./data/dashboard-data";

interface PortfolioDistributionProps {
	data: PortfolioDistributionType[];
}

export default function PortfolioDistribution({
	data,
}: PortfolioDistributionProps) {
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
		hidden: { opacity: 0, x: -10 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { duration: 0.3 },
		},
	};

	return (
		<motion.div
			className="bg-white rounded-xl border border-gray-200 p-5"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}>
			<motion.div
				className="flex items-center justify-between mb-4 md:mb-6"
				initial={{ opacity: 0, x: -10 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.3 }}>
				<div>
					<h3 className="font-bold text-gray-900 text-base md:text-lg font-mclaren">
						Property Types
					</h3>
					<p className="text-xs md:text-sm text-gray-600 font-montserrat">
						Diversified real estate portfolio
					</p>
				</div>
				<motion.div
					animate={{ rotate: 360 }}
					transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
					<PieChart className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
				</motion.div>
			</motion.div>

			<motion.div
				className="space-y-4 mb-6"
				variants={containerVariants}
				initial="hidden"
				animate="visible">
				{data.map((item, index) => (
					<motion.div
						key={item.type}
						variants={itemVariants}
						className="space-y-2">
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium text-gray-900 flex items-center gap-2 font-montserrat">
								<motion.span
									className={`w-2 h-2 rounded-full ${item.color}`}
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ delay: 0.15 + index * 0.1 }}
								/>
								{item.type}
							</span>
							<motion.span
								className="text-sm font-bold text-gray-900 font-mclaren"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.2 + index * 0.1 }}>
								{item.value}%
							</motion.span>
						</div>
						<div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
							<motion.div
								className={`h-full ${item.color} rounded-full`}
								initial={{ width: 0 }}
								animate={{ width: `${item.value}%` }}
								transition={{
									duration: 0.8,
									delay: 0.2 + index * 0.1,
									ease: "easeOut",
								}}
							/>
						</div>
					</motion.div>
				))}
			</motion.div>

			<motion.div
				className="p-3 bg-emerald-50 rounded-lg border border-emerald-100"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3, delay: 0.5 }}>
				<div className="flex items-start gap-2 text-sm text-emerald-700 font-montserrat">
					<CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
					<span className="text-xs">
						Your portfolio is well-balanced across residential, commercial, and
						mixed-use properties.
					</span>
				</div>
			</motion.div>
		</motion.div>
	);
}
