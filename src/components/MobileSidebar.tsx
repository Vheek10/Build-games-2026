/** @format */
"use client";

import Link from "next/link";
import { X, Home, Info, Building, Users, Briefcase, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

// Icon mapping for navigation items
const navIcons = {
	home: Home,
	"about-us": Info,
	"for-investors": Briefcase,
	"for-developers": Building,
	company: Users,
	"contact-us": Phone,
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
}

export default function MobileSidebar({
	isOpen,
	onClose,
	navItems,
	isActive,
}: MobileSidebarProps) {
	if (!isOpen) return null;

	return (
		<>
			{/* Backdrop */}
			<div
				className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
				onClick={onClose}
				aria-hidden="true"
			/>

			{/* Mobile Menu Panel - Left Sidebar */}
			<div className="fixed inset-y-0 left-0 z-50 w-72 sm:w-76 lg:hidden animate-in slide-in-from-left-4 duration-300">
				<div className="h-full bg-white dark:bg-gray-900 shadow-3xl overflow-y-auto">
					<div className="p-5 sm:p-6">
						{/* Close Button at Top */}
						<div className="flex justify-end mb-6">
							<button
								onClick={onClose}
								className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
								aria-label="Close menu">
								<X className="w-5 h-5" />
							</button>
						</div>

						{/* Sidebar Header */}
						<div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
							<div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 rounded-xl flex items-center justify-center">
								<span className="text-white font-bold text-sm sm:text-base">
									SD
								</span>
							</div>
							<div className="flex flex-col">
								<span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
									StrataDeed
								</span>
								<span className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
									Property Tokenization
								</span>
							</div>
						</div>

						{/* Mobile Navigation */}
						<nav className="space-y-0.5 mb-8">
							{navItems.map((item) => {
								// Safely get the icon with fallback to Home icon
								const Icon = navIcons[item.key as IconKey] || Home;
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

						{/* Mobile Auth Section */}
						<div className="mt-auto">
							<div className="space-y-3">
								<Link
									href="/signup"
									className="flex items-center justify-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/40 rounded-lg"
									onClick={onClose}>
									Sign Up
								</Link>
								<Link
									href="/login"
									className="flex items-center justify-center px-6 py-2.5 border border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-500 text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-semibold transition-all duration-300 rounded-lg"
									onClick={onClose}>
									Log In
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
