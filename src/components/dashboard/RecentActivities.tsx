/** @format */

import { motion } from "framer-motion";
import {
	Clock,
	Wallet,
	Eye,
	Target,
	Shield,
	Layers,
	Repeat,
	ArrowRight,
	ExternalLink,
} from "lucide-react";
import { RecentActivity } from "./data/dashboard-data";
import Link from "next/link";

interface RecentActivitiesProps {
	activities: RecentActivity[];
}

export default function RecentActivities({
	activities,
}: RecentActivitiesProps) {
	const getIcon = (type: RecentActivity["type"]) => {
		switch (type) {
			case "mint":
				return {
					icon: Layers,
					color: "text-emerald-600",
					bg: "bg-emerald-100",
				};
			case "harvest":
				return {
					icon: Wallet,
					color: "text-amber-600",
					bg: "bg-amber-100",
				};
			case "bridge":
				return {
					icon: Repeat,
					color: "text-blue-600",
					bg: "bg-blue-100",
				};
			case "transfer":
				return {
					icon: Repeat,
					color: "text-purple-600",
					bg: "bg-purple-100",
				};
			case "escrow":
				return {
					icon: Shield,
					color: "text-cyan-600",
					bg: "bg-cyan-100",
				};
			default:
				return {
					icon: Clock,
					color: "text-gray-600",
					bg: "bg-gray-100",
				};
		}
	};

	const getStatusColor = (status: RecentActivity["status"]) => {
		switch (status) {
			case "completed":
				return "bg-emerald-100 text-emerald-700";
			case "processing":
				return "bg-blue-100 text-blue-700 animate-pulse";
			case "pending":
				return "bg-amber-100 text-amber-700";
		}
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.08,
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
				className="flex items-center justify-between mb-6"
				initial={{ opacity: 0, x: -10 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.3 }}>
				<div>
					<h3 className="font-bold text-gray-900 font-mclaren text-lg">
						On-Chain Activity
					</h3>
					<p className="text-sm text-gray-600 font-montserrat">
						Recent contract interactions
					</p>
				</div>
				<motion.div
					className="p-2 bg-gray-100 rounded-lg"
					animate={{ rotate: 360 }}
					transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
					<Clock className="w-4 h-4 text-gray-500" />
				</motion.div>
			</motion.div>

			<motion.div
				className="space-y-4"
				variants={containerVariants}
				initial="hidden"
				animate="visible">
				{activities.map((activity) => {
					const { icon: Icon, color, bg } = getIcon(activity.type);
					return (
						<motion.div
							key={activity.id}
							variants={itemVariants}
							whileHover={{ x: 4, backgroundColor: "rgba(249, 250, 251, 0.5)" }}
							className="flex items-start gap-3 group p-2 rounded-lg transition-all">
							<motion.div
								className={`p-2 rounded-lg ${bg} shrink-0`}
								whileHover={{ scale: 1.1 }}
								transition={{ type: "spring", stiffness: 400 }}>
								<Icon className={`w-4 h-4 ${color}`} />
							</motion.div>

							<div className="flex-1 min-w-0">
								<div className="flex items-center justify-between mb-1">
									<span className="font-medium text-gray-900 capitalize truncate pr-2 font-montserrat">
										{activity.type}
									</span>
									{activity.amount && (
										<motion.span
											className="font-bold text-gray-900 text-xs sm:text-sm whitespace-nowrap font-montserrat"
											initial={{ opacity: 0, scale: 0.8 }}
											animate={{ opacity: 1, scale: 1 }}
											transition={{ delay: 0.2 }}>
											{activity.amount}
										</motion.span>
									)}
								</div>
								<p className="text-xs sm:text-sm text-gray-500 mb-1 truncate font-montserrat">
									{activity.property}
								</p>
								<motion.div
									className="flex items-center justify-between mt-2"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.1 }}>
									<div className="flex items-center gap-2">
										<a
											href="#"
											className="flex items-center gap-1 text-[10px] text-blue-500 hover:text-blue-600 hover:underline font-montserrat">
											{activity.txHash} <ExternalLink className="w-2.5 h-2.5" />
										</a>
										<span className="text-[10px] text-gray-400 font-montserrat">
											• {activity.date}
										</span>
									</div>
									<motion.span
										initial={{ scale: 0.8 }}
										animate={{ scale: 1 }}
										transition={{ delay: 0.15 }}
										className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${getStatusColor(
											activity.status,
										)} font-montserrat`}>
										{activity.status}
									</motion.span>
								</motion.div>
							</div>
						</motion.div>
					);
				})}
			</motion.div>

			<motion.button
				className="w-full mt-6 py-3 text-blue-600 font-black hover:bg-blue-50 rounded-full transition-colors flex items-center justify-center gap-3 font-montserrat"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.4 }}
				whileHover={{ backgroundColor: "rgba(219, 234, 254, 1)" }}
				whileTap={{ scale: 0.98 }}>
				<span className="text-[10px] uppercase tracking-[0.4em] font-montserrat">
					View on SuiScan
				</span>
				<motion.div
					animate={{ x: [0, 3, 0] }}
					transition={{ duration: 2, repeat: Infinity }}>
					<ExternalLink className="w-3.5 h-3.5" />
				</motion.div>
			</motion.button>
		</motion.div>
	);
}
