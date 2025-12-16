/** @format */

import { PieChart, Shield, CheckCircle } from "lucide-react";
import { PortfolioDistribution as PortfolioDistributionType } from "./data/dashboard-data";

interface PortfolioDistributionProps {
	data: PortfolioDistributionType[];
}

export default function PortfolioDistribution({
	data,
}: PortfolioDistributionProps) {
	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
			<div className="flex items-center justify-between mb-4 md:mb-6">
				<div>
					<h3 className="font-bold text-gray-900 dark:text-white text-base md:text-lg">
						Property Types
					</h3>
					<p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
						Diversified real estate portfolio
					</p>
				</div>
				<PieChart className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
			</div>

			<div className="space-y-4 mb-6">
				{data.map((item) => (
					<div
						key={item.type}
						className="space-y-2">
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${item.color}`} />
								{item.type}
							</span>
							<span className="text-sm font-bold text-gray-900 dark:text-white">
								{item.value}%
							</span>
						</div>
						<div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
							<div
								className={`h-full ${item.color} rounded-full transition-all duration-500`}
								style={{ width: `${item.value}%` }}></div>
						</div>
					</div>
				))}
			</div>

			<div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800/50">
				<div className="flex items-start gap-2 text-sm text-emerald-700 dark:text-emerald-400">
					<CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
					<span className="text-xs">Your portfolio is well-balanced across residential, commercial, and mixed-use properties.</span>
				</div>
			</div>
		</div>
	);
}
