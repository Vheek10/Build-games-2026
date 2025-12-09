/** @format */
"use client";

import { useState, useEffect } from "react";
import { sampleProperties } from "../../lib/dummy-data";
import {
	TrendingUp,
	DollarSign,
	Home,
	Building,
	MapPin,
	Eye,
	Users,
	Calendar,
	ArrowUpRight,
	ArrowDownRight,
	MoreVertical,
	Download,
	Filter,
	ChevronRight,
	Shield,
	BarChart3,
	Target,
	Clock,
	Star,
	Wallet,
	PieChart,
	Bell,
	Settings,
	Plus,
} from "lucide-react";
import Image from "next/image";

const demoImages = [
	"https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1616587226154-91eab0a51dc7?w=800&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&auto=format&fit=crop",
];

export default function Dashboard() {
	const [timeRange, setTimeRange] = useState("monthly");
	const [activeTab, setActiveTab] = useState("overview");

	// Mock data for charts and metrics
	const portfolioValue = sampleProperties.reduce(
		(sum, prop) => sum + prop.price,
		0,
	);
	const monthlyGrowth = 12.5;
	const propertyCount = sampleProperties.length;
	const activeViewers = 1542;
	const roi = 24.8;

	const recentActivities = [
		{
			id: 1,
			type: "purchase",
			property: "Luxury Villa",
			amount: "$2.5M",
			date: "Today",
			status: "completed",
		},
		{
			id: 2,
			type: "viewing",
			property: "Downtown Loft",
			amount: null,
			date: "Yesterday",
			status: "scheduled",
		},
		{
			id: 3,
			type: "offer",
			property: "Beachfront Property",
			amount: "$3.2M",
			date: "2 days ago",
			status: "pending",
		},
		{
			id: 4,
			type: "document",
			property: "All Properties",
			amount: null,
			date: "1 week ago",
			status: "completed",
		},
	];

	const portfolioDistribution = [
		{ type: "Residential", value: 65, color: "bg-blue-500" },
		{ type: "Commercial", value: 25, color: "bg-emerald-500" },
		{ type: "Luxury", value: 10, color: "bg-purple-500" },
	];

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
				{/* Dashboard Header */}
				<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
					<div>
						<h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
							Investment Dashboard
						</h1>
						<p className="text-gray-600 dark:text-gray-400 mt-1">
							Monitor your real estate portfolio and market performance
						</p>
					</div>

					<div className="flex items-center gap-3">
						<button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow transition-all">
							<Filter className="w-4 h-4" />
							<span className="text-sm font-medium">Filter</span>
						</button>
						<button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow transition-all">
							<Download className="w-4 h-4" />
							<span className="text-sm font-medium">Export</span>
						</button>
						<div className="relative">
							<Bell className="w-5 h-5 text-gray-600 dark:text-gray-400 cursor-pointer" />
							<span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
						</div>
						<button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
							<Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
						</button>
					</div>
				</div>

				{/* Dashboard Tabs */}
				<div className="flex items-center gap-1 mb-8 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg max-w-md">
					{["overview", "portfolio", "analytics", "transactions"].map((tab) => (
						<button
							key={tab}
							onClick={() => setActiveTab(tab)}
							className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all capitalize ${
								activeTab === tab
									? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
									: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
							}`}>
							{tab}
						</button>
					))}
				</div>

				{/* Key Metrics Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
					{/* Portfolio Value Card */}
					<div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-5 border border-blue-200 dark:border-blue-800">
						<div className="flex items-center justify-between mb-4">
							<div className="p-2 bg-blue-500/10 rounded-lg">
								<DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
							</div>
							<div className="flex items-center gap-2">
								<div className="flex items-center gap-1 px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs">
									<ArrowUpRight className="w-3 h-3" />
									{monthlyGrowth}%
								</div>
								<MoreVertical className="w-4 h-4 text-gray-400 cursor-pointer" />
							</div>
						</div>
						<div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
							${(portfolioValue / 1000000).toFixed(2)}M
						</div>
						<div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
							Portfolio Value
						</div>
						<div className="text-xs text-gray-500">
							<span className="text-emerald-600 dark:text-emerald-400">
								↑ {monthlyGrowth}%
							</span>{" "}
							this month
						</div>
					</div>

					{/* Properties Owned Card */}
					<div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl p-5 border border-emerald-200 dark:border-emerald-800">
						<div className="flex items-center justify-between mb-4">
							<div className="p-2 bg-emerald-500/10 rounded-lg">
								<Home className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
							</div>
							<MoreVertical className="w-4 h-4 text-gray-400 cursor-pointer" />
						</div>
						<div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
							{propertyCount}
						</div>
						<div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
							Properties Owned
						</div>
						<div className="text-xs text-gray-500">Across 4 countries</div>
					</div>

					{/* ROI Card */}
					<div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-5 border border-purple-200 dark:border-purple-800">
						<div className="flex items-center justify-between mb-4">
							<div className="p-2 bg-purple-500/10 rounded-lg">
								<Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
							</div>
							<div className="flex items-center gap-2">
								<div className="flex items-center gap-1 px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs">
									<ArrowUpRight className="w-3 h-3" />
									5.2%
								</div>
								<MoreVertical className="w-4 h-4 text-gray-400 cursor-pointer" />
							</div>
						</div>
						<div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
							{roi}%
						</div>
						<div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
							Average ROI
						</div>
						<div className="text-xs text-gray-500">
							<span className="text-emerald-600 dark:text-emerald-400">
								↑ 5.2%
							</span>{" "}
							vs last quarter
						</div>
					</div>

					{/* Active Viewers Card */}
					<div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-xl p-5 border border-amber-200 dark:border-amber-800">
						<div className="flex items-center justify-between mb-4">
							<div className="p-2 bg-amber-500/10 rounded-lg">
								<Eye className="w-5 h-5 text-amber-600 dark:text-amber-400" />
							</div>
							<MoreVertical className="w-4 h-4 text-gray-400 cursor-pointer" />
						</div>
						<div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
							{activeViewers.toLocaleString()}
						</div>
						<div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
							Active Viewers
						</div>
						<div className="text-xs text-gray-500">
							<span className="text-emerald-600 dark:text-emerald-400">
								↑ 18%
							</span>{" "}
							this week
						</div>
					</div>
				</div>

				{/* Main Content Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Left Column - Portfolio */}
					<div className="lg:col-span-2 space-y-6">
						{/* Performance Chart */}
						<div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
							<div className="flex items-center justify-between mb-6">
								<div>
									<h3 className="font-bold text-gray-900 dark:text-white">
										Portfolio Performance
									</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										Monthly growth and trends
									</p>
								</div>
								<div className="flex items-center gap-2">
									{["weekly", "monthly", "quarterly", "yearly"].map((range) => (
										<button
											key={range}
											onClick={() => setTimeRange(range)}
											className={`px-3 py-1 rounded-lg text-sm capitalize ${
												timeRange === range
													? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
													: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
											}`}>
											{range}
										</button>
									))}
								</div>
							</div>

							{/* Chart Placeholder */}
							<div className="h-64 relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center">
								<div className="text-center">
									<BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
									<p className="text-gray-600 dark:text-gray-400">
										Performance chart visualization
									</p>
									<p className="text-sm text-gray-500 dark:text-gray-500">
										Interactive chart would appear here
									</p>
								</div>
							</div>

							<div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
								<div>
									<div className="text-sm text-gray-600 dark:text-gray-400">
										Avg. Monthly Growth
									</div>
									<div className="text-lg font-bold text-gray-900 dark:text-white">
										+{monthlyGrowth}%
									</div>
								</div>
								<div>
									<div className="text-sm text-gray-600 dark:text-gray-400">
										Peak Value
									</div>
									<div className="text-lg font-bold text-gray-900 dark:text-white">
										${((portfolioValue * 1.2) / 1000000).toFixed(2)}M
									</div>
								</div>
								<div>
									<div className="text-sm text-gray-600 dark:text-gray-400">
										Market Rank
									</div>
									<div className="text-lg font-bold text-gray-900 dark:text-white">
										Top 8%
									</div>
								</div>
							</div>
						</div>

						{/* Recent Properties */}
						<div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
							<div className="flex items-center justify-between mb-6">
								<div>
									<h3 className="font-bold text-gray-900 dark:text-white">
										Your Properties
									</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										Recent acquisitions and listings
									</p>
								</div>
								<button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
									<Plus className="w-4 h-4" />
									Add Property
								</button>
							</div>

							<div className="space-y-4">
								{sampleProperties.slice(0, 3).map((property, index) => (
									<div
										key={property.id}
										className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
										<div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
											<img
												src={demoImages[index % demoImages.length]}
												alt={property.title}
												className="w-full h-full object-cover"
											/>
											{property.isFeatured && (
												<div className="absolute top-1 left-1 px-1.5 py-0.5 bg-blue-600 text-white text-xs rounded">
													<Star className="w-3 h-3" />
												</div>
											)}
										</div>

										<div className="flex-1">
											<div className="flex items-center justify-between mb-1">
												<h4 className="font-semibold text-gray-900 dark:text-white">
													{property.title}
												</h4>
												<div className="text-lg font-bold text-gray-900 dark:text-white">
													${property.price.toLocaleString()}
												</div>
											</div>

											<div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
												<div className="flex items-center gap-1">
													<MapPin className="w-3.5 h-3.5" />
													{property.location}
												</div>
												<div className="flex items-center gap-1">
													<Building className="w-3.5 h-3.5" />
													{property.type}
												</div>
											</div>

											<div className="flex items-center gap-4">
												<div className="flex items-center gap-1 text-sm">
													<Home className="w-3.5 h-3.5 text-gray-400" />
													<span className="font-medium text-gray-900 dark:text-white">
														{property.bedrooms}
													</span>
													<span className="text-gray-500">beds</span>
												</div>
												<div className="flex items-center gap-1 text-sm">
													<div className="w-3.5 h-3.5 text-gray-400">○</div>
													<span className="font-medium text-gray-900 dark:text-white">
														{property.bathrooms}
													</span>
													<span className="text-gray-500">baths</span>
												</div>
												<div className="flex items-center gap-1 text-sm">
													<div className="w-3.5 h-3.5 text-gray-400">□</div>
													<span className="font-medium text-gray-900 dark:text-white">
														{property.squareFeet.toLocaleString()}
													</span>
													<span className="text-gray-500">sqft</span>
												</div>
											</div>
										</div>

										<button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
											<MoreVertical className="w-5 h-5 text-gray-400" />
										</button>
									</div>
								))}
							</div>

							<div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
								<button className="w-full flex items-center justify-center gap-2 py-2 text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
									View All Properties
									<ChevronRight className="w-4 h-4" />
								</button>
							</div>
						</div>
					</div>

					{/* Right Column - Insights & Activities */}
					<div className="space-y-6">
						{/* Portfolio Distribution */}
						<div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
							<div className="flex items-center justify-between mb-6">
								<div>
									<h3 className="font-bold text-gray-900 dark:text-white">
										Portfolio Distribution
									</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										By property type
									</p>
								</div>
								<PieChart className="w-5 h-5 text-gray-400" />
							</div>

							{/* Distribution Chart */}
							<div className="space-y-4 mb-6">
								{portfolioDistribution.map((item) => (
									<div
										key={item.type}
										className="space-y-2">
										<div className="flex items-center justify-between">
											<span className="text-sm font-medium text-gray-900 dark:text-white">
												{item.type}
											</span>
											<span className="text-sm font-bold text-gray-900 dark:text-white">
												{item.value}%
											</span>
										</div>
										<div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
											<div
												className={`h-full ${item.color} rounded-full transition-all duration-500`}
												style={{ width: `${item.value}%` }}></div>
										</div>
									</div>
								))}
							</div>

							<div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
								<div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-400">
									<Shield className="w-4 h-4" />
									<span>
										Your portfolio is well-diversified across property types
									</span>
								</div>
							</div>
						</div>

						{/* Recent Activities */}
						<div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
							<div className="flex items-center justify-between mb-6">
								<div>
									<h3 className="font-bold text-gray-900 dark:text-white">
										Recent Activities
									</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										Latest transactions and updates
									</p>
								</div>
								<Clock className="w-5 h-5 text-gray-400" />
							</div>

							<div className="space-y-4">
								{recentActivities.map((activity) => (
									<div
										key={activity.id}
										className="flex items-start gap-3">
										<div
											className={`p-2 rounded-lg ${
												activity.status === "completed"
													? "bg-emerald-100 dark:bg-emerald-900/20"
													: activity.status === "pending"
													? "bg-amber-100 dark:bg-amber-900/20"
													: "bg-blue-100 dark:bg-blue-900/20"
											}`}>
											{activity.type === "purchase" && (
												<Wallet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
											)}
											{activity.type === "viewing" && (
												<Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
											)}
											{activity.type === "offer" && (
												<Target className="w-4 h-4 text-amber-600 dark:text-amber-400" />
											)}
											{activity.type === "document" && (
												<Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />
											)}
										</div>

										<div className="flex-1">
											<div className="flex items-center justify-between mb-1">
												<span className="font-medium text-gray-900 dark:text-white capitalize">
													{activity.type}
												</span>
												{activity.amount && (
													<span className="font-bold text-gray-900 dark:text-white">
														{activity.amount}
													</span>
												)}
											</div>
											<p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
												{activity.property}
											</p>
											<div className="flex items-center justify-between">
												<span className="text-xs text-gray-500">
													{activity.date}
												</span>
												<span
													className={`text-xs px-2 py-1 rounded-full capitalize ${
														activity.status === "completed"
															? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
															: activity.status === "pending"
															? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
															: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
													}`}>
													{activity.status}
												</span>
											</div>
										</div>
									</div>
								))}
							</div>

							<button className="w-full mt-6 py-2 text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
								View All Activities
							</button>
						</div>

						{/* Quick Actions */}
						<div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5 text-white">
							<h3 className="font-bold mb-4">Quick Actions</h3>
							<div className="grid grid-cols-2 gap-3">
								<button className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex flex-col items-center justify-center">
									<Plus className="w-5 h-5 mb-2" />
									<span className="text-xs font-medium">New Listing</span>
								</button>
								<button className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex flex-col items-center justify-center">
									<Download className="w-5 h-5 mb-2" />
									<span className="text-xs font-medium">Reports</span>
								</button>
								<button className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex flex-col items-center justify-center">
									<BarChart3 className="w-5 h-5 mb-2" />
									<span className="text-xs font-medium">Analytics</span>
								</button>
								<button className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex flex-col items-center justify-center">
									<Users className="w-5 h-5 mb-2" />
									<span className="text-xs font-medium">Consult</span>
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Section - Market Insights */}
				<div className="mt-8">
					<div className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl p-6 text-white">
						<div className="flex flex-col lg:flex-row items-center justify-between gap-6">
							<div>
								<h3 className="text-xl font-bold mb-2">Market Insights</h3>
								<p className="text-blue-100 mb-4 max-w-lg">
									Real estate market is trending upward with a projected 15%
									growth in premium properties this quarter.
								</p>
								<button className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
									View Market Report
								</button>
							</div>
							<div className="grid grid-cols-3 gap-4">
								<div className="text-center">
									<div className="text-2xl font-bold">+8.5%</div>
									<div className="text-xs text-blue-200">Property Value</div>
								</div>
								<div className="text-center">
									<div className="text-2xl font-bold">+22%</div>
									<div className="text-xs text-blue-200">Investor Demand</div>
								</div>
								<div className="text-center">
									<div className="text-2xl font-bold">4.2%</div>
									<div className="text-xs text-blue-200">Avg. Yield</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
