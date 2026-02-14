/** @format */
"use client";

import { motion, AnimatePresence } from "framer-motion";
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

	const pageVariants = {
		initial: { opacity: 0, y: 20 },
		in: { opacity: 1, y: 0 },
		out: { opacity: 0, y: -20 },
	};

	const pageTransition = {
		type: "tween",
		ease: "anticipate",
		duration: 0.5,
	};

	return (
		<div className="min-h-screen bg-gray-50 font-montserrat">
			<motion.div
				className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8"
				initial="initial"
				animate="in"
				exit="out"
				variants={pageVariants}
				transition={pageTransition}>
				{/* Page Badge */}
				<motion.div
					className="inline-flex items-center gap-3 px-5 py-2 bg-blue-600/5 rounded-full mb-4 border border-blue-600/10"
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.1, duration: 0.3 }}>
					<motion.span
						className="text-[10px] font-black text-blue-700 uppercase tracking-[0.4em] font-montserrat"
						animate={{ opacity: [0.7, 1, 0.7] }}
						transition={{ duration: 2, repeat: Infinity }}>
						Portfolio Dashboard
					</motion.span>
				</motion.div>

				{/* Page Header */}
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.15, duration: 0.4 }}>
					<h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tighter leading-[1.1] font-mclaren">
						Dashboard
					</h1>
					<p className="text-sm text-gray-500 mb-6 font-medium leading-relaxed font-montserrat">
						Monitor your real estate investments and portfolio performance
					</p>
				</motion.div>

				{/* Tabs */}
				<DashboardTabs
					activeTab={activeTab}
					onTabChange={setActiveTab}
				/>

				{/* Overview Tab */}
				<AnimatePresence mode="wait">
					{activeTab === "overview" && (
						<motion.div
							key="overview"
							variants={pageVariants}
							initial="initial"
							animate="in"
							exit="out"
							transition={pageTransition}
							className="space-y-8">
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
						</motion.div>
					)}

					{/* Properties Tab */}
					{activeTab === "properties" && (
						<motion.div
							key="properties"
							variants={pageVariants}
							initial="initial"
							animate="in"
							exit="out"
							transition={pageTransition}
							className="space-y-6">
							<PropertiesList properties={sampleProperties} />
						</motion.div>
					)}

					{/* Activity Tab */}
					{activeTab === "activity" && (
						<motion.div
							key="activity"
							variants={pageVariants}
							initial="initial"
							animate="in"
							exit="out"
							transition={pageTransition}
							className="space-y-6">
							<RecentActivities activities={recentActivities} />
						</motion.div>
					)}

					{/* Analytics Tab */}
					{activeTab === "analytics" && (
						<motion.div
							key="analytics"
							variants={pageVariants}
							initial="initial"
							animate="in"
							exit="out"
							transition={pageTransition}
							className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<PerformanceChart
								timeRange={timeRange}
								onTimeRangeChange={setTimeRange}
								monthlyGrowth={monthlyGrowth}
								portfolioValue={portfolioValue}
							/>
							<PortfolioDistribution data={portfolioDistribution} />
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</div>
	);
}
