/** @format */

import Link from "next/link";

interface MarketInsightsProps {
	title?: string;
	description?: string;
	metrics?: Array<{ label: string; value: string }>;
}

export default function MarketInsights({
	title = "Market Insights",
	description = "Real estate market is trending upward with a projected 15% growth in premium properties this quarter.",
	metrics = [
		{ label: "Property Value", value: "+8.5%" },
		{ label: "Investor Demand", value: "+22%" },
		{ label: "Avg. Yield", value: "4.2%" },
	],
}: MarketInsightsProps) {
	return (
		<div className="bg-linear-to-r from-red-500 to-red-400 rounded-xl p-6 text-white">
			<div className="flex flex-col lg:flex-row items-center justify-between gap-6">
				<div>
					<h3 className="text-xl font-bold mb-2">{title}</h3>
					<p className="text-red-100 mb-4 max-w-lg">{description}</p>
					<Link
						href="/marketplace"
						className="px-6 py-3 bg-white text-red-600 font-black rounded-full hover:bg-red-50 transition-colors inline-flex items-center">
						<span className="text-[10px] uppercase tracking-[0.4em] font-montserrat">
							View Market Report
						</span>
					</Link>
				</div>
				<div className="grid grid-cols-3 gap-4">
					{metrics.map((metric, index) => (
						<div
							key={index}
							className="text-center">
							<div className="text-2xl font-bold">{metric.value}</div>
							<div className="text-xs text-red-200">{metric.label}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
