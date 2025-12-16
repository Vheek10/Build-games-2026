/** @format */
"use client";

import { useState } from "react";
import {
	DashboardHeader,
	DashboardTabs,
	MetricsGrid,
	PerformanceChart,
	PropertiesList,
	PortfolioDistribution,
	RecentActivities,
	metrics,
	recentActivities,
	portfolioDistribution,
} from "../../components/dashboard";
import AuthGuard from "@/components/AuthGuard";
import { sampleProperties } from "../../lib/dummy-data";

export default function Dashboard() {
	const [timeRange, setTimeRange] = useState("monthly");
	const [activeTab, setActiveTab] = useState("overview");

	const portfolioValue = sampleProperties.reduce(
		(sum, prop) => sum + prop.price,
		0,
	);
	const monthlyGrowth = 12.5;

	return (
		<AuthGuard>
			<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
					<DashboardHeader
						title="Investment Dashboard"
						subtitle="Monitor your real estate portfolio and market performance"
					/>

					<DashboardTabs
						activeTab={activeTab}
						onTabChange={setActiveTab}
					/>

					<MetricsGrid metrics={metrics} />

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						<div className="lg:col-span-2 space-y-6">
							<PerformanceChart
								timeRange={timeRange}
								onTimeRangeChange={setTimeRange}
								monthlyGrowth={monthlyGrowth}
								portfolioValue={portfolioValue}
							/>

							<PropertiesList properties={sampleProperties} />
						</div>

						<div className="space-y-6">
							<PortfolioDistribution data={portfolioDistribution} />

							<RecentActivities activities={recentActivities} />
						</div>
					</div>
				</div>
			</div>
		</AuthGuard>
	);
}
