/** @format */

import { Clock, Wallet, Eye, Target, Shield, Layers, Repeat, ArrowRight, ExternalLink } from "lucide-react";
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
			case "stake":
				return {
					icon: Layers,
					color: "text-emerald-600 dark:text-emerald-400",
                    bg: "bg-emerald-100 dark:bg-emerald-900/30"
				};
			case "harvest":
				return { icon: Wallet, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/30" };
			case "bridge":
				return { icon: Repeat, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30" };
			case "swap":
				return { icon: Repeat, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-100 dark:bg-purple-900/30" };
            case "liquidity":
                return { icon: Layers, color: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-100 dark:bg-cyan-900/30" };
            default:
                 return { icon: Clock, color: "text-gray-600 dark:text-gray-400", bg: "bg-gray-100 dark:bg-gray-800" };
		}
	};

	const getStatusColor = (status: RecentActivity["status"]) => {
		switch (status) {
			case "completed":
				return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400";
			case "processing":
				return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 animate-pulse";
			case "pending":
				return "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400";
		}
	};

	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
			<div className="flex items-center justify-between mb-6">
				<div>
					<h3 className="font-bold text-gray-900 dark:text-white">
						On-Chain Activity
					</h3>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						Recent contract interactions
					</p>
				</div>
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
				    <Clock className="w-4 h-4 text-gray-500" />
                </div>
			</div>

			<div className="space-y-4">
				{activities.map((activity) => {
					const { icon: Icon, color, bg } = getIcon(activity.type);
					return (
						<div
							key={activity.id}
							className="flex items-start gap-3 group">
							<div className={`p-2 rounded-lg ${bg} shrink-0`}>
								<Icon className={`w-4 h-4 ${color}`} />
							</div>

							<div className="flex-1 min-w-0">
								<div className="flex items-center justify-between mb-1">
									<span className="font-medium text-gray-900 dark:text-white capitalize truncate pr-2">
										{activity.type}
									</span>
									{activity.amount && (
										<span className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm whitespace-nowrap">
											{activity.amount}
										</span>
									)}
								</div>
								<p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1 truncate">
									{activity.property}
								</p>
								<div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center gap-2">
                                        <a href="#" className="flex items-center gap-1 text-[10px] text-blue-500 hover:text-blue-600 hover:underline">
                                            {activity.txHash} <ExternalLink className="w-2.5 h-2.5" />
                                        </a>
                                        <span className="text-[10px] text-gray-400">• {activity.date}</span>
                                    </div>
									<span
										className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${getStatusColor(
											activity.status,
										)}`}>
										{activity.status}
									</span>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			<button className="w-full mt-6 py-2.5 text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
				View on MantleScan
                <ExternalLink className="w-3.5 h-3.5" />
			</button>
		</div>
	);
}
