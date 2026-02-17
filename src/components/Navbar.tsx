/** @format */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import MobileSidebar from "./MobileSidebar";
import Image from "next/image";
import ConnectWalletButton from "./ConnectWalletButton";
// Icons (Hugeicons)
import {
	Menu,
	X,
	Home,
	Info,
	Building,
	Briefcase,
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
 * Handles desktop and mobile responsive layouts and wallet connection state.
 */
interface NavbarProps {
	placement?: "global" | "hero";
	hideOnHome?: boolean;
}

export default function Navbar({
	placement = "global",
	hideOnHome = false,
}: NavbarProps) {
	// =========================================
	// State & Hooks
	// =========================================
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const pathname = usePathname();

	// =========================================
	// Effects
	// =========================================

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

	const isActive = (href: string) => {
		if (href === "/") return pathname === href;
		return pathname === href || pathname?.startsWith(`${href}/`);
	};

	const isHome = pathname === "/";

	if (hideOnHome && isHome) {
		return null;
	}

	return (
		<>
			{/* Main Header  */}
			<header
				className={cn(
					"z-50 w-full transition-all duration-300",
					placement === "hero" ? "absolute top-0 left-0" : "sticky top-0",
					"bg-transparent border-b border-transparent backdrop-blur-0",
					"px-3 sm:px-4 md:px-6 lg:px-8",
				)}>
				<div className="relative mx-auto w-full max-w-screen-2xl">
					<div className="flex items-center justify-between h-14 sm:h-16 md:h-[72px] lg:h-20 relative">
						{/* Mobile Menu Toggle */}
						<div className="flex lg:hidden items-center flex-shrink-0 z-10">
							<button
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								className="p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 rounded-xl hover:scale-110"
								aria-label="Toggle menu"
								aria-expanded={isMobileMenuOpen}>
								{isMobileMenuOpen ? (
									<X className="w-6 h-6" />
								) : (
									<Menu className="w-6 h-6" />
								)}
							</button>
						</div>

						{/* Brand Logo - Centered on mobile/medium, left-aligned on large screens */}
						<div className="absolute left-1/2 transform -translate-x-1/2 md:left-1/2 md:transform md:-translate-x-1/2 lg:relative lg:left-0 lg:transform-none flex items-center gap-2 sm:gap-3 md:gap-3 lg:gap-4 flex-shrink-0 z-10">
							<Link
								href="/"
								className="flex items-center gap-2 sm:gap-3 md:gap-3 lg:gap-4 hover:opacity-90 transition-opacity duration-300"
								aria-label="StrataDeed Home">
								{/* Logo with optimal size */}
								<div className="relative w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-12 lg:h-12 xl:w-14 xl:h-14 flex-shrink-0">
									<Image
										src="/logo.png"
										alt="StrataDeed Logo"
										fill
										className="object-contain"
										priority
										sizes="(max-width: 640px) 40px, (max-width: 1024px) 44px, (max-width: 1280px) 48px, 56px"
									/>
								</div>

								{/* Text branding - improved typography - Hidden on small/medium screens */}
								<div className="hidden lg:flex flex-col">
									<span className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-black text-gray-900 leading-tight tracking-tight font-mclaren">
										StrataDeed
									</span>
									<span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.4em] leading-none mt-0.5 font-montserrat">
										Property Tokenization
									</span>
								</div>
							</Link>
						</div>
						{/* Desktop Navigation */}
						<nav className="hidden lg:flex items-center justify-center flex-1 mx-4 lg:mx-8 xl:mx-12 2xl:mx-16">
							<div className="relative">
								<div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-transparent to-cyan-400/10 rounded-full blur-sm" />
								<div className="relative flex items-center gap-4 lg:gap-6 xl:gap-8">
									{navItems.map((item) => {
										const Icon = item.icon;
										const active = isActive(item.href);

										return (
											<Link
												key={item.href}
												href={item.href}
												className={cn(
													"flex items-center gap-1.5 lg:gap-2 text-xs lg:text-sm font-medium transition-all duration-300 relative group/nav",
													active
														? "text-blue-600"
														: "text-gray-600 hover:text-blue-600",
												)}
												aria-current={active ? "page" : undefined}>
												<Icon
													className={cn(
														"w-3.5 h-3.5 lg:w-4 lg:h-4 transition-all duration-300",
														active
															? "text-blue-600"
															: "text-gray-500 group-hover/nav:text-blue-600",
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
						<div className="flex items-center gap-2 sm:gap-3 md:gap-3 lg:gap-3 xl:gap-4 flex-shrink-0 z-10">
							{/* Connect Wallet Button */}
							<div className="w-full max-w-[140px] sm:max-w-[200px]">
								<ConnectWalletButton />
							</div>
						</div>
					</div>
				</div>
			</header>

			<MobileSidebar
				isOpen={isMobileMenuOpen}
				onClose={() => setIsMobileMenuOpen(false)}
				navItems={navItems}
				isActive={isActive}
			/>
		</>
	);
}
