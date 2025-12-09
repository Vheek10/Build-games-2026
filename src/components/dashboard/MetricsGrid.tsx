/** @format */

import { MoreVertical, ArrowUpRight } from "lucide-react";

interface DashboardMetric {
	id: string;
	title: string;
	value: string | number;
	change: number;
	icon: React.ComponentType<{ className?: string }>;
	gradientFrom: string;
	borderColor: string;
	iconColor: string;
}

interface MetricsGridProps {
	metrics: DashboardMetric[];
}

export default function MetricsGrid({ metrics }: MetricsGridProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
			{metrics.map((metric) => {
				const Icon = metric.icon;
				return (
					<div
						key={metric.id}
						className={`bg-gradient-to-br ${metric.gradientFrom} rounded-xl p-5 border ${metric.borderColor}`}>
						<div className="flex items-center justify-between mb-4">
							<div
								className="p-2 rounded-lg bg-opacity-10"
								style={{
									backgroundColor: `${metric.iconColor.replace("text-", "")}20`,
								}}>
								<Icon className={`w-5 h-5 ${metric.iconColor}`} />
							</div>
							<div className="flex items-center gap-2">
								<div className="flex items-center gap-1 px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs">
									<ArrowUpRight className="w-3 h-3" />
									{metric.change}%
								</div>
								<MoreVertical className="w-4 h-4 text-gray-400 cursor-pointer" />
							</div>
						</div>
						<div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
							{metric.value}
						</div>
						<div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
							{metric.title}
						</div>
						<div className="text-xs text-gray-500">
							<span className="text-emerald-600 dark:text-emerald-400">
								↑ {metric.change}%
							</span>{" "}
							this month
						</div>
					</div>
				);
			})}
		</div>
	);
}
