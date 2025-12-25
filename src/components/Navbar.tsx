/** @format */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAccount, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { cn } from "@/lib/utils";
import MobileSidebar from "./MobileSidebar";
import Image from "next/image";
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
	PlusCircle,
} from "lucide-react";

// Navigation configuration
const navItems = [
	{ href: "/", label: "Home", key: "home", icon: Home },
	{ href: "/about", label: "About", key: "about", icon: Info },
	{
		href: "/marketplace",
		label: "Marketplace",
		key: "marketplace",
		icon: Building,
	},
	{ href: "/mint", label: "Mint", key: "mint", icon: PlusCircle },
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
			{/* Main Header - REMOVED GLASS EFFECT */}
			<header
				className={cn(
					"sticky top-0 z-50 w-full transition-all duration-300",
					isScrolled ? "bg-gray-900 shadow-lg" : "bg-gray-900",
					"border-b border-gray-700",
					"px-4 sm:px-6 lg:px-8",
				)}>
				{/* REMOVED background glow effects */}

				<div className="relative mx-auto w-full max-w-screen-2xl">
					<div className="flex items-center justify-between h-16 lg:h-20">
						{/* Mobile Menu Toggle */}
						<div className="flex lg:hidden items-center flex-shrink-0">
							<button
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								className="p-2 text-gray-300 hover:text-blue-400 transition-all duration-300"
								aria-label="Toggle menu"
								aria-expanded={isMobileMenuOpen}>
								{isMobileMenuOpen ? (
									<X className="w-6 h-6" />
								) : (
									<Menu className="w-6 h-6" />
								)}
							</button>
						</div>

						{/* Brand Logo - REFINED SIZE & TYPOGRAPHY */}
						<div className="lg:flex items-center gap-3 lg:gap-4 flex-shrink-0 absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
							<Link
								href="/"
								className="flex items-center gap-3 lg:gap-4 hover:opacity-90 transition-opacity duration-300"
								aria-label="StrataDeed Home">
								{/* Logo with optimal size */}
								<div className="relative w-10 h-10 lg:w-12 lg:h-12">
									<Image
										src="/logo.png"
										alt="StrataDeed Logo"
										fill
										className="object-contain"
										priority
										sizes="(max-width: 1024px) 40px, 48px"
									/>
								</div>

								{/* Text branding - improved typography */}
								<div className="hidden lg:flex flex-col">
									<span className="text-2xl xl:text-3xl font-bold text-white leading-tight tracking-tight">
										StrataDeed
									</span>
									<span className="text-xs xl:text-sm text-blue-300/90 font-medium uppercase tracking-[0.15em] leading-none mt-0.5">
										Property Tokenization
									</span>
								</div>

								{/* Mobile: Only show brand name without tagline */}
								<div className="lg:hidden flex flex-col">
									<span className="text-lg font-bold text-white leading-tight">
										StrataDeed
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
						{/* User & Wallet Actions - SOLID STYLING */}
						<div className="flex items-center gap-3 lg:gap-4 flex-shrink-0">
							{isConnected ? (
								<div className="flex items-center gap-3">
									{/* Connected State (Desktop) */}
									<div className="hidden lg:flex items-center gap-3">
										<div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-700 text-white rounded-lg border border-emerald-600 shadow-md">
											<CheckCircle className="w-4 h-4" />
											<span className="text-sm font-semibold">
												{address?.slice(0, 6)}...{address?.slice(-4)}
											</span>
										</div>

										<div className="relative">
											<button
												onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
												className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 text-gray-200 hover:bg-gray-700 rounded-lg border border-gray-700 transition-colors shadow-md">
												<User className="w-4 h-4" />
												<ChevronDown className="w-3 h-3" />
											</button>

											{/* Dropdown Menu */}
											{isUserMenuOpen && (
												<>
													<div
														className="fixed inset-0 z-40"
														onClick={() => setIsUserMenuOpen(false)}
													/>
													<div className="absolute right-0 mt-2 w-52 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
														<div className="p-4 border-b border-gray-700 bg-gray-900">
															<div className="text-sm font-semibold text-gray-200">
																Connected Wallet
															</div>
															<div className="text-xs text-emerald-300 font-medium mt-1">
																{address?.slice(0, 8)}...{address?.slice(-6)}
															</div>
														</div>
														<div className="p-2 bg-gray-800">
															<Link
																href="/vault"
																className="flex items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
																onClick={() => setIsUserMenuOpen(false)}>
																<User className="w-4 h-4" />
																Vault
															</Link>

															<Link
																href="/settings"
																className="flex items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
																onClick={() => setIsUserMenuOpen(false)}>
																<Settings className="w-4 h-4" />
																Settings
															</Link>
															<button
																onClick={() => {
																	disconnect();
																	setIsUserMenuOpen(false);
																}}
																className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-300 hover:text-red-200 hover:bg-red-900/30 rounded-md transition-colors">
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
											{({
												account,
												openAccountModal,
												authenticationStatus,
												mounted,
											}) => {
												const ready =
													mounted && authenticationStatus !== "loading";
												const connected = ready && account;

												if (!ready)
													return (
														<div className="w-24 h-9 bg-gray-800 rounded-lg animate-pulse" />
													);
												if (connected) {
													return (
														<button
															onClick={openAccountModal}
															className="px-4 py-2 bg-emerald-700 text-emerald-100 rounded-lg text-sm font-semibold border border-emerald-600">
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
									{/* Desktop & Mobile: Connect Button */}
									<ConnectButton.Custom>
										{({ openConnectModal, authenticationStatus, mounted }) => {
											const ready =
												mounted && authenticationStatus !== "loading";
											if (!ready)
												return (
													<div className="w-24 h-10 bg-gray-800 rounded-lg animate-pulse" />
												);

											return (
												<button
													onClick={openConnectModal}
													className="px-6 py-3 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-md border border-blue-500">
													<span className="hidden sm:inline">
														Connect Wallet
													</span>
													<span className="sm:hidden">Connect</span>
												</button>
											);
										}}
									</ConnectButton.Custom>
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
