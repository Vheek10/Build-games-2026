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
	Wallet, // For wallet/assets
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
	type: "mint" | "harvest" | "bridge" | "transfer" | "escrow";
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
	href?: string;
}

export const metrics: DashboardMetric[] = [
	{
		id: "tvl",
		title: "Total Tokenized Value",
		value: "$1.24M",
		description: "Real estate assets on-chain",
		change: 8.4,
		icon: DollarSign,
		color: "emerald", // Avalanche Red-Green
		borderColor: "border-emerald-200",
		gradientFrom: "from-emerald-50 to-emerald-100",
		gradientTo: "to-emerald-100",
		iconColor: "text-emerald-600",
	},
	{
		id: "active-strategies",
		title: "Properties Tokenized",
		value: 8,
		description: "3 pending tokenization",
		change: 1, // +1 active strategy
		icon: Layers,
		color: "blue",
		borderColor: "border-blue-200",
		gradientFrom: "from-blue-50 to-blue-100",
		gradientTo: "to-blue-100",
		iconColor: "text-blue-600",
	},
	{
		id: "avg-apy",
		title: "Average Rental Yield",
		value: "18.4%",
		description: "Annualized rental income",
		change: 2.1,
		icon: TrendingUp,
		color: "purple",
		borderColor: "border-purple-200",
		gradientFrom: "from-purple-50 to-purple-100",
		gradientTo: "to-purple-100",
		iconColor: "text-purple-600",
	},
	{
		id: "gas-saved",
		title: "Gas Saved vs ETH",
		value: "92%",
		description: "~$1,240 saved total",
		change: 0.5,
		icon: Zap,
		color: "amber",
		borderColor: "border-amber-200",
		gradientFrom: "from-amber-50 to-amber-100",
		gradientTo: "to-amber-100",
		iconColor: "text-amber-600",
	},
];

// Rebranded "Recent Activities" to "On-Chain Activity"
export const recentActivities: RecentActivity[] = [
	{
		id: 1,
		type: "mint",
		property: "Property NFT Minted",
		amount: "1 Deed",
		date: "10 mins ago",
		status: "completed",
		txHash: "0x3a...8f21",
	},
	{
		id: 2,
		type: "harvest",
		property: "RWA Token Purchase",
		amount: "500 RWA",
		date: "2 hours ago",
		status: "completed",
		txHash: "0x7b...9c33",
	},
	{
		id: 3,
		type: "transfer",
		property: "Property Deed Transfer",
		amount: "1 Deed",
		date: "5 hours ago",
		status: "completed",
		txHash: "0x1d...4e55",
	},
	{
		id: 4,
		type: "escrow",
		property: "Escrow Settlement",
		amount: "5000 AVAX",
		date: "1 day ago",
		status: "completed",
		txHash: "0x9f...2a11",
	},
];

// Rebranded "Portfolio Distribution" to "Asset Allocation"
export const portfolioDistribution: PortfolioDistribution[] = [
	{ type: "AVAX", value: 45, color: "bg-blue-600" }, // AVAX Coin
	{ type: "RWA", value: 35, color: "bg-emerald-500" }, // RWA Token
	{ type: "NFTs", value: 15, color: "bg-purple-500" }, // Property Deeds
	{ type: "Other", value: 5, color: "bg-gray-400" }, // Governance/Misc
];

export const quickActions: QuickAction[] = [
	{
		id: "new-strategy",
		label: "Create Strategy",
		icon: Plus,
		color: "blue",
		href: "/mint",
	},
	{
		id: "harvest-all",
		label: "Harvest All",
		icon: Download,
		color: "emerald",
		href: "/dashboard",
	},
	{
		id: "analytics",
		label: "Yield Analytics",
		icon: BarChart3,
		color: "purple",
		href: "/dashboard",
	},
	{
		id: "bridge",
		label: "Bridge Funds",
		icon: Repeat,
		color: "amber",
		href: "/vault",
	},
];
