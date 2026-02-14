/** @format */

"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, Layers, Activity, BarChart3 } from "lucide-react";

interface DashboardTabsProps {
	activeTab: string;
	onTabChange: (tab: string) => void;
}

export default function DashboardTabs({
	activeTab,
	onTabChange,
}: DashboardTabsProps) {
	const tabs = [
		{
			id: "overview",
			label: "Overview",
			icon: LayoutDashboard,
			color: "text-emerald-600",
		},
		{
			id: "properties",
			label: "Properties",
			icon: Layers,
			color: "text-blue-600",
		},
		{
			id: "activity",
			label: "History",
			icon: Activity,
			color: "text-amber-600",
		},
		{
			id: "analytics",
			label: "Analytics",
			icon: BarChart3,
			color: "text-purple-600",
		},
	];

	return (
		<div className="mb-6 md:mb-8 sticky top-14 md:top-20 z-10 bg-gradient-to-b from-gray-50/95 to-gray-50/95 backdrop-blur-sm -mx-4 px-4 py-2 md:mx-0 md:px-0 md:py-0 md:static md:bg-none">
			{/* Desktop Tabs */}
			<motion.div
				className="hidden md:flex items-center gap-1 p-1 bg-white rounded-xl border border-gray-200 shadow-sm"
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}>
				{tabs.map((tab, index) => {
					const Icon = tab.icon;
					return (
						<motion.button
							key={tab.id}
							onClick={() => onTabChange(tab.id)}
							initial={{ opacity: 0, y: -5 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.2, delay: index * 0.05 }}
							className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
								activeTab === tab.id
									? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
									: "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
							}`}>
							<Icon className="w-4 h-4" />
							<span className="font-montserrat">{tab.label}</span>
						</motion.button>
					);
				})}
			</motion.div>

			{/* Mobile Tabs - Horizontal Scroll */}
			<div className="md:hidden">
				<motion.div
					className="flex overflow-x-auto scrollbar-hide gap-3 py-1"
					initial={{ opacity: 0, x: -10 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.3 }}>
					{tabs.map((tab, index) => {
						const Icon = tab.icon;
						const isActive = activeTab === tab.id;
						return (
							<motion.button
								key={tab.id}
								onClick={() => onTabChange(tab.id)}
								initial={{ opacity: 0, x: -10 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.2, delay: index * 0.05 }}
								className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium border transition-all ${
									isActive
										? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-500/25"
										: "bg-white border-gray-200 text-gray-600"
								}`}>
								<Icon className={`w-4 h-4 ${isActive ? "text-white" : ""}`} />
								<span className="font-montserrat">{tab.label}</span>
							</motion.button>
						);
					})}
				</motion.div>
			</div>
		</div>
	);
}
