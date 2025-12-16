/** @format */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAccount, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { cn } from "@/lib/utils";
import MobileSidebar from "./MobileSidebar";

// Icons
import {
	Menu,
	X,
	Home,
	Info,
	Building,
	Briefcase,
	User,
	LogOut,
	Settings,
	CheckCircle,
	ChevronDown,
} from "lucide-react";

// Navigation configuration
const navItems = [
	{ href: "/", label: "Home", key: "home", icon: Home },
	{ href: "/about", label: "About", key: "about", icon: Info },
	{ href: "/marketplace", label: "Marketplace", key: "marketplace", icon: Building },
	{ href: "/dashboard", label: "Dashboard", key: "dashboard", icon: Briefcase },
];

/**
 * Main Navigation Bar Component.
 * Handles desktop and mobile responsive layouts, wallet connection state, and user menu.
 */
export default function Navbar() {
	// =========================================
	// State & Hooks
	// =========================================
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	
	const pathname = usePathname();
	const { address, isConnected } = useAccount();
	const { disconnect } = useDisconnect();

	// =========================================
	// Effects
	// =========================================

	// Handle scroll effect for sticky navbar transparency
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Reset mobile menu on route change
	useEffect(() => {
		setIsMobileMenuOpen(false);
	}, [pathname]);

	// Lock body scroll when mobile menu is open
	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isMobileMenuOpen]);

	// =========================================
	// Helpers
	// =========================================

	const isActive = (href: string) => {
		if (href === "/") return pathname === href;
		return pathname === href || pathname?.startsWith(`${href}/`);
	};

	// =========================================
	// Render
	// =========================================

	return (
		<>
			{/* Main Header */}
			<header
				className={cn(
					"sticky top-0 z-50 w-full transition-all duration-500 ease-out",
					isScrolled
						? "bg-gray-900/95 backdrop-blur-xl shadow-2xl shadow-black/20"
						: "bg-gradient-to-b from-gray-900/95 to-gray-900/90 backdrop-blur-lg",
					"border-b border-gray-800/50",
					"px-4 sm:px-6 lg:px-8 xl:px-10",
				)}>
				
				{/* Background Glow Effects */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-r from-blue-400/5 to-cyan-400/5 rounded-full blur-3xl" />
					<div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 rounded-full blur-3xl" />
				</div>

				<div className="relative mx-auto w-full max-w-screen-2xl">
					<div className="flex items-center justify-between h-16 lg:h-20">
						
						{/* Mobile Menu Toggle */}
						<div className="flex lg:hidden items-center flex-shrink-0">
							<button
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								className="p-2 text-gray-300 hover:text-blue-400 transition-all duration-300 hover:scale-110"
								aria-label="Toggle menu"
								aria-expanded={isMobileMenuOpen}>
								{isMobileMenuOpen ? (
									<X className="w-5 h-5" />
								) : (
									<Menu className="w-5 h-5" />
								)}
							</button>
						</div>

						{/* Brand Logo */}
						<div className="lg:flex items-center gap-3 lg:gap-4 flex-shrink-0 absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
							<Link
								href="/"
								className="flex items-center gap-3 group"
								aria-label="StrataDeed Home">
								<div className="relative">
									<div className="w-10 h-10 lg:w-11 lg:h-11 bg-gradient-to-br from-blue-500 via-cyan-500 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-400/20 group-hover:shadow-xl group-hover:shadow-blue-400/30 transition-all duration-500 group-hover:scale-105">
										<span className="text-white font-bold text-lg relative z-10">
											SD
										</span>
									</div>
								</div>
								<div className="hidden lg:flex flex-col">
									<span className="text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-white via-blue-300 to-cyan-400 bg-clip-text text-transparent leading-tight tracking-tight">
										StrataDeed
									</span>
									<span className="hidden sm:block text-xs text-gray-400 font-medium uppercase tracking-[0.2em] leading-none mt-0.5">
										Property <span className="text-blue-400">Tokenization</span>
									</span>
								</div>
							</Link>
						</div>

						{/* Desktop Navigation */}
						<nav className="hidden lg:flex items-center justify-center flex-1 mx-8 xl:mx-12 2xl:mx-16">
							<div className="relative">
								<div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-transparent to-cyan-400/10 rounded-full blur-sm" />
								<div className="relative flex items-center gap-6 xl:gap-8">
									{navItems.map((item) => {
										const Icon = item.icon;
										const active = isActive(item.href);

										return (
											<Link
												key={item.href}
												href={item.href}
												className={cn(
													"flex items-center gap-2 text-sm font-medium transition-all duration-300 relative group/nav",
													active
														? "text-blue-600 dark:text-blue-400"
														: "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400",
												)}
												aria-current={active ? "page" : undefined}>
												<Icon
													className={cn(
														"w-4 h-4 transition-all duration-300",
														active
															? "text-blue-600 dark:text-blue-400"
															: "text-gray-500 dark:text-gray-400 group-hover/nav:text-blue-600 dark:group-hover/nav:text-blue-400",
													)}
												/>
												<span className="relative">
													{item.label}
													{active && (
														<div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
													)}
													{!active && (
														<div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-cyan-400/0 rounded-full scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-300 origin-center" />
													)}
												</span>
											</Link>
										);
									})}
								</div>
							</div>
						</nav>

						{/* User & Wallet Actions */}
						<div className="flex items-center gap-3 lg:gap-4 xl:gap-5 flex-shrink-0">
							{isConnected ? (
								<div className="flex items-center gap-3">
									{/* Connected State (Desktop) */}
									<div className="hidden lg:flex items-center gap-3">
										<div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-900/30 to-green-900/30 border border-emerald-800/50 rounded-lg backdrop-blur-sm">
											<CheckCircle className="w-4 h-4 text-emerald-400" />
											<span className="text-sm font-medium text-emerald-400">
												{address?.slice(0, 6)}...{address?.slice(-4)}
											</span>
										</div>

										<div className="relative">
											<button
												onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
												className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-lg backdrop-blur-sm transition-colors">
												<User className="w-4 h-4 text-gray-300" />
												<ChevronDown className="w-3 h-3 text-gray-400" />
											</button>

											{/* Dropdown Menu */}
											{isUserMenuOpen && (
												<>
													<div
														className="fixed inset-0 z-40"
														onClick={() => setIsUserMenuOpen(false)}
													/>
													<div className="absolute right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-xl border border-gray-800/50 rounded-lg shadow-2xl shadow-black/20 z-50 overflow-hidden">
														<div className="p-4 border-b border-gray-800/50">
															<div className="text-sm font-medium text-gray-300">
																Connected Wallet
															</div>
															<div className="text-xs text-gray-400 mt-1">
																{address?.slice(0, 8)}...{address?.slice(-6)}
															</div>
														</div>
														<div className="p-1">
															<Link
																href="/dashboard"
																className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-blue-400 hover:bg-gray-800/50 rounded transition-colors"
																onClick={() => setIsUserMenuOpen(false)}>
																<Briefcase className="w-4 h-4" />
																Dashboard
															</Link>
															<Link
																href="/settings"
																className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-blue-400 hover:bg-gray-800/50 rounded transition-colors"
																onClick={() => setIsUserMenuOpen(false)}>
																<Settings className="w-4 h-4" />
																Settings
															</Link>
															<button
																onClick={() => {
																	disconnect();
																	setIsUserMenuOpen(false);
																}}
																className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors">
																<LogOut className="w-4 h-4" />
																Disconnect
															</button>
														</div>
													</div>
												</>
											)}
										</div>
									</div>

									{/* Mobile: RainbowKit Button */}
									<div className="lg:hidden">
										<ConnectButton.Custom>
											{({ account, openAccountModal, authenticationStatus, mounted }) => {
												const ready = mounted && authenticationStatus !== "loading";
												const connected = ready && account;

												if (!ready) return <div className="w-24 h-9 bg-gray-800 rounded-lg animate-pulse" />;
												if (connected) {
													return (
														<button
															onClick={openAccountModal}
															className="px-3 py-1.5 bg-emerald-900/30 border border-emerald-800/50 text-emerald-400 rounded-lg text-sm font-medium">
															{account.displayName.slice(0, 8)}...
														</button>
													);
												}
												return null;
											}}
										</ConnectButton.Custom>
									</div>
								</div>
							) : (
								<>
									{/* Desktop: Auth Buttons */}
									<div className="hidden lg:flex items-center gap-3">
										<Link
											href="/signin"
											className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
											Sign In
										</Link>
										<Link
											href="/signup"
											className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-600/40 transition-all duration-300 hover:scale-105">
											Sign Up
										</Link>
									</div>

									{/* Mobile: Connect Button */}
									<div className="lg:hidden">
										<ConnectButton.Custom>
											{({ openConnectModal, authenticationStatus, mounted }) => {
												const ready = mounted && authenticationStatus !== "loading";
												if (!ready) return <div className="w-20 h-9 bg-gray-800 rounded-lg animate-pulse" />;
												
												return (
													<button
														onClick={openConnectModal}
														className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-600/40 transition-all duration-300">
														Connect
													</button>
												);
											}}
										</ConnectButton.Custom>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</header>

			<MobileSidebar
				isOpen={isMobileMenuOpen}
				onClose={() => setIsMobileMenuOpen(false)}
				navItems={navItems}
				isActive={isActive}
				isConnected={isConnected}
				address={address}
			/>
		</>
	);
}
