/** @format */

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

export interface Property {
	id: string | number;
	title: string;
	price: number;
	location: string;
	type: string;
	bedrooms: number;
	bathrooms: number;
	squareFeet: number;
	isFeatured: boolean;
	image: string;
}
