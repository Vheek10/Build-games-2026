/** @format */

import {
	DollarSign,
	Activity,
	TrendingUp,
	Zap,
	Plus,
	Download,
	BarChart3,
	Repeat, // For swap/bridge
	Layers, // For strategies
	Wallet // For wallet/assets
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
	type: "stake" | "harvest" | "bridge" | "swap" | "liquidity";
	property: string; // Used for "Strategy Name" or "Asset Pair"
	amount: string | null;
	date: string;
	status: "completed" | "pending" | "processing";
    txHash?: string; // Add optional txHash
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
		id: "tvl",
		title: "Total Tokenized Value",
		value: "$1.24M",
		description: "Real estate assets on-chain",
		change: 8.4,
		icon: DollarSign,
		color: "emerald", // Mantle Green-ish
		borderColor: "border-emerald-200 dark:border-emerald-800",
		gradientFrom:
			"from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20",
		gradientTo: "to-emerald-100 dark:to-emerald-800/20",
		iconColor: "text-emerald-600 dark:text-emerald-400",
	},
	{
		id: "active-strategies",
		title: "Properties Tokenized",
		value: 8,
		description: "3 pending tokenization",
		change: 1, // +1 active strategy
		icon: Layers,
		color: "blue",
		borderColor: "border-blue-200 dark:border-blue-800",
		gradientFrom:
			"from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
		gradientTo: "to-blue-100 dark:to-blue-800/20",
		iconColor: "text-blue-600 dark:text-blue-400",
	},
	{
		id: "avg-apy",
		title: "Average Rental Yield",
		value: "18.4%",
		description: "Annualized rental income",
		change: 2.1,
		icon: TrendingUp,
		color: "purple",
		borderColor: "border-purple-200 dark:border-purple-800",
		gradientFrom:
			"from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
		gradientTo: "to-purple-100 dark:to-purple-800/20",
		iconColor: "text-purple-600 dark:text-purple-400",
	},
	{
		id: "gas-saved",
		title: "Gas Saved vs ETH",
		value: "92%",
		description: "~$1,240 saved total",
		change: 0.5,
		icon: Zap,
		color: "amber",
		borderColor: "border-amber-200 dark:border-amber-800",
		gradientFrom:
			"from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20",
		gradientTo: "to-amber-100 dark:to-amber-800/20",
		iconColor: "text-amber-600 dark:text-amber-400",
	},
];

// Rebranded "Recent Activities" to "On-Chain Activity"
export const recentActivities: RecentActivity[] = [
	{
		id: 1,
		type: "stake",
		property: "Mantle Meth Staking",
		amount: "5,000 MNT",
		date: "10 mins ago",
		status: "completed",
        txHash: "0x3a...8f21"
	},
	{
		id: 2,
		type: "harvest",
		property: "USDC/MNT LP Farm",
		amount: "$1,250 USDC",
		date: "2 hours ago",
		status: "completed",
         txHash: "0x7b...9c33"
	},
	{
		id: 3,
		type: "bridge",
		property: "Ethereum -> Mantle",
		amount: "2.5 ETH",
		date: "5 hours ago",
		status: "processing",
         txHash: "0x1d...4e55"
	},
	{
		id: 4,
		type: "swap",
		property: "USDT -> MNT",
		amount: "10,000 USDT",
		date: "1 day ago",
		status: "completed",
         txHash: "0x9f...2a11"
	},
];

// Rebranded "Portfolio Distribution" to "Asset Allocation"
export const portfolioDistribution: PortfolioDistribution[] = [
	{ type: "MNT", value: 45, color: "bg-emerald-500" }, // Mantle Token
	{ type: "ETH", value: 30, color: "bg-blue-500" },       // Ether
	{ type: "Stablecoins", value: 15, color: "bg-purple-500" }, // USDC/USDT
    { type: "Other", value: 10, color: "bg-gray-400" }, // Governance/Misc
];

export const quickActions: QuickAction[] = [
	{ id: "new-strategy", label: "Create Strategy", icon: Plus, color: "blue" },
	{ id: "harvest-all", label: "Harvest All", icon: Download, color: "emerald" },
	{ id: "analytics", label: "Yield Analytics", icon: BarChart3, color: "purple" },
	{ id: "bridge", label: "Bridge Funds", icon: Repeat, color: "amber" },
];
