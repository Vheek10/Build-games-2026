/** @format */

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { DashboardMetric } from "./data/dashboard-data";

interface MetricsGridProps {
	metrics: DashboardMetric[];
}

export default function MetricsGrid({ metrics }: MetricsGridProps) {
	const getIconBgColor = (color: string) => {
		switch (color) {
			case "blue":
				return "bg-blue-500/10";
			case "emerald":
				return "bg-emerald-500/10";
			case "purple":
				return "bg-purple-500/10";
			case "amber":
				return "bg-amber-500/10";
			default:
				return "bg-gray-500/10";
		}
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.4, ease: "easeOut" },
		},
	};

	return (
		<motion.div
			className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8"
			variants={containerVariants}
			initial="hidden"
			animate="visible">
			{metrics.map((metric) => {
				const Icon = metric.icon;
				const iconBgClass = getIconBgColor(metric.color);

				return (
					<motion.div
						key={metric.id}
						variants={itemVariants}
						whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
						className={`relative overflow-hidden bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-pointer`}>
						<div
							className={`absolute top-0 right-0 p-3 opacity-5 md:opacity-10 group-hover:opacity-20 transition-opacity`}>
							<Icon
								className={`w-16 h-16 md:w-24 md:h-24 ${metric.color === "blue" ? "text-blue-500" : metric.color === "emerald" ? "text-emerald-500" : metric.color === "purple" ? "text-purple-500" : "text-amber-500"}`}
							/>
						</div>

						<div className="relative z-10">
							<div className="flex items-center justify-between mb-3 md:mb-4">
								<div
									className={`p-2 md:p-3 rounded-lg md:rounded-xl ${iconBgClass}`}>
									<Icon
										className={`w-4 h-4 md:w-6 md:h-6 ${metric.iconColor}`}
									/>
								</div>
								<motion.div
									initial={{ scale: 0.8, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									transition={{ duration: 0.3, delay: 0.2 }}
									className="flex items-center gap-0.5 md:gap-1 px-1.5 py-0.5 md:px-2.5 md:py-1 bg-emerald-50 text-emerald-600 rounded-md md:rounded-lg text-[10px] md:text-xs font-semibold font-montserrat">
									<ArrowUpRight className="w-2.5 h-2.5 md:w-3 md:h-3" />
									{metric.change}%
								</motion.div>
							</div>

							<div>
								<div className="text-xs md:text-sm font-medium text-gray-500 mb-0.5 md:mb-1 truncate font-montserrat">
									{metric.title}
								</div>
								<div className="text-lg md:text-3xl font-bold text-gray-900 tracking-tight font-mclaren">
									{metric.value}
								</div>
							</div>
						</div>
					</motion.div>
				);
			})}
		</motion.div>
	);
}
