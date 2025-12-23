/** @format */
"use client";
import Link from "next/link";
import Image from "next/image";
import {
	X,
	Home,
	Info,
	Building,
	Users,
	Briefcase,
	Phone,
	Wallet,
	CheckCircle,
	LogOut,
	Settings,
	User,
	Store,
	LineChart,
	Building2,
	FileText,
	PlusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAccount, useDisconnect } from "wagmi";

// Updated icon mapping for navigation items with more varied icons
const navIcons = {
	home: Building2,
	"about-us": FileText,
	marketplace: Store,
	company: Users,
	"contact-us": Phone,
	mint: PlusCircle,
	dashboard: Briefcase,
} as const;

// Type for icon keys
type IconKey = keyof typeof navIcons;

interface MobileSidebarProps {
	isOpen: boolean;
	onClose: () => void;
	navItems: {
		href: string;
		label: string;
		key: string;
	}[];
	isActive: (href: string) => boolean;
	isConnected?: boolean;
	address?: string;
}

export default function MobileSidebar({
	isOpen,
	onClose,
	navItems,
	isActive,
	isConnected,
	address,
}: MobileSidebarProps) {
	const { disconnect } = useDisconnect();

	if (!isOpen) return null;

	const handleDisconnect = () => {
		disconnect();
		onClose();
	};

	return (
		<>
			{/* Backdrop */}
			<div
				className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
				onClick={onClose}
				aria-hidden="true"
			/>

			{/* Mobile Menu Panel - Clean & Consistent */}
			<div className="fixed inset-y-0 left-0 z-50 w-72 sm:w-80 lg:hidden animate-in slide-in-from-left-4 duration-300">
				<div className="h-full bg-gray-900 border-r border-gray-800 shadow-2xl overflow-y-auto">
					<div className="p-5 sm:p-6">
						{/* Header Section */}
						<div className="flex items-center justify-between mb-8">
							{/* Logo/Brand - Exactly matching navbar */}
							<div className="flex items-center gap-3">
								<div className="relative w-10 h-10">
									<Image
										src="/logo.png"
										alt="StrataDeed Logo"
										fill
										className="object-contain"
										sizes="40px"
									/>
								</div>
								<div className="flex flex-col">
									<span className="text-xl font-bold text-white leading-tight">
										StrataDeed
									</span>
									<span className="text-xs text-blue-300/90 font-medium uppercase tracking-[0.15em] leading-none mt-0.5">
										Tokenization
									</span>
								</div>
							</div>

							{/* Close Button */}
							<button
								onClick={onClose}
								className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
								aria-label="Close menu">
								<X className="w-5 h-5" />
							</button>
						</div>

						{/* Mobile Navigation */}
						<nav className="space-y-0.5 mb-8">
							{navItems.map((item) => {
								// Safely get the icon with fallback
								const Icon = navIcons[item.key as IconKey] || Building2;
								const active = isActive(item.href);

								return (
									<Link
										key={item.href}
										href={item.href}
										className={cn(
											"flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 rounded-xl",
											active
												? "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20"
												: "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800",
										)}
										onClick={onClose}>
										<Icon
											className={cn(
												"w-4 h-4",
												active
													? "text-blue-700 dark:text-blue-300"
													: "text-gray-500 dark:text-gray-400",
											)}
										/>
										<span>{item.label}</span>
									</Link>
								);
							})}
						</nav>

						{/* Mobile Auth Section - Dynamic based on connection state */}
						<div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
							{isConnected && address ? (
								// User is connected - Show wallet info and options
								<div className="space-y-4">
									{/* Wallet Info */}
									<div className="px-4 py-3 bg-gradient-to-r from-emerald-900/10 to-green-900/10 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-800/30 dark:border-emerald-800/50 rounded-lg">
										<div className="flex items-center gap-2 mb-2">
											<CheckCircle className="w-4 h-4 text-emerald-500" />
											<span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
												Wallet Connected
											</span>
										</div>
										<div className="text-xs text-emerald-700 dark:text-emerald-300 font-mono bg-emerald-900/10 dark:bg-emerald-900/20 px-2 py-1 rounded">
											{address.slice(0, 8)}...{address.slice(-6)}
										</div>
									</div>

									{/* Connected User Options */}
									<div className="space-y-2">
										<Link
											href="/vault"
											className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
											onClick={onClose}>
											<User className="w-4 h-4" />
											Vault
										</Link>

										<Link
											href="/settings"
											className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
											onClick={onClose}>
											<Settings className="w-4 h-4" />
											Settings
										</Link>

										<button
											onClick={handleDisconnect}
											className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-left">
											<LogOut className="w-4 h-4" />
											Disconnect Wallet
										</button>
									</div>
								</div>
							) : (
								// User is not connected - Show sign in/up options
								<div className="space-y-3">
									<Link
										href="/signup"
										className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/40 rounded-lg group"
										onClick={onClose}>
										<Wallet className="w-4 h-4 group-hover:scale-110 transition-transform" />
										Connect Wallet
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
