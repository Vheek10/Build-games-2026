/** @format */

import {
	DollarSign,
	Home,
	Target,
	Eye,
	Plus,
	Download,
	BarChart3,
	Users,
} from "lucide-react";

export interface DashboardMetric {
	id: string;
	title: string;
	value: string | number;
	description: string;
	change: number;
	icon: React.ComponentType<{ className?: string }>;
	color: string;
	borderColor: string;
	gradientFrom: string;
	gradientTo: string;
	iconColor: string;
}

export interface RecentActivity {
	id: number;
	type: "purchase" | "viewing" | "offer" | "document";
	property: string;
	amount: string | null;
	date: string;
	status: "completed" | "pending" | "scheduled";
}

export interface PortfolioDistribution {
	type: string;
	value: number;
	color: string;
}

export interface QuickAction {
	id: string;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
	color: string;
}

export const metrics: DashboardMetric[] = [
	{
		id: "portfolio-value",
		title: "Portfolio Value",
		value: "$15.87M",
		description: "Total portfolio value",
		change: 12.5,
		icon: DollarSign,
		color: "blue",
		borderColor: "border-blue-200 dark:border-blue-800",
		gradientFrom:
			"from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
		gradientTo: "to-blue-100 dark:to-blue-800/20",
		iconColor: "text-blue-600 dark:text-blue-400",
	},
	{
		id: "properties-owned",
		title: "Properties Owned",
		value: 24,
		description: "Total properties",
		change: 3,
		icon: Home,
		color: "emerald",
		borderColor: "border-emerald-200 dark:border-emerald-800",
		gradientFrom:
			"from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20",
		gradientTo: "to-emerald-100 dark:to-emerald-800/20",
		iconColor: "text-emerald-600 dark:text-emerald-400",
	},
	{
		id: "roi",
		title: "Average ROI",
		value: "24.8%",
		description: "Return on investment",
		change: 5.2,
		icon: Target,
		color: "purple",
		borderColor: "border-purple-200 dark:border-purple-800",
		gradientFrom:
			"from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
		gradientTo: "to-purple-100 dark:to-purple-800/20",
		iconColor: "text-purple-600 dark:text-purple-400",
	},
	{
		id: "active-viewers",
		title: "Active Viewers",
		value: "1,542",
		description: "Current viewers",
		change: 18,
		icon: Eye,
		color: "amber",
		borderColor: "border-amber-200 dark:border-amber-800",
		gradientFrom:
			"from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20",
		gradientTo: "to-amber-100 dark:to-amber-800/20",
		iconColor: "text-amber-600 dark:text-amber-400",
	},
];

export const recentActivities: RecentActivity[] = [
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

export const portfolioDistribution: PortfolioDistribution[] = [
	{ type: "Residential", value: 65, color: "bg-blue-500" },
	{ type: "Commercial", value: 25, color: "bg-emerald-500" },
	{ type: "Luxury", value: 10, color: "bg-purple-500" },
];

export const quickActions: QuickAction[] = [
	{ id: "new-listing", label: "New Listing", icon: Plus, color: "blue" },
	{ id: "reports", label: "Reports", icon: Download, color: "emerald" },
	{ id: "analytics", label: "Analytics", icon: BarChart3, color: "purple" },
	{ id: "consult", label: "Consult", icon: Users, color: "amber" },
];
