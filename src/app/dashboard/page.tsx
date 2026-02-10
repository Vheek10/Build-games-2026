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
		<div className="min-h-screen bg-gray-50 font-montserrat">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-2 font-mclaren">
					Dashboard
				</h1>
				<p className="text-gray-600 mb-6 font-montserrat">
					Monitor your real estate investments and portfolio performance
				</p>

				<DashboardTabs
					activeTab={activeTab}
					onTabChange={setActiveTab}
				/>

				{activeTab === "overview" && (
					<>
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
					</>
				)}

				{activeTab === "properties" && (
					<div className="space-y-6">
						{/* Showing properties in a full width layout */}
						<PropertiesList properties={sampleProperties} />
					</div>
				)}

				{activeTab === "activity" && (
					<div className="space-y-6">
						<RecentActivities activities={recentActivities} />
					</div>
				)}

				{activeTab === "analytics" && (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<PerformanceChart
							timeRange={timeRange}
							onTimeRangeChange={setTimeRange}
							monthlyGrowth={monthlyGrowth}
							portfolioValue={portfolioValue}
						/>
						<PortfolioDistribution data={portfolioDistribution} />
					</div>
				)}
			</div>
		</div>
	);
}
