/** @format */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import MobileSidebar from "./MobileSidebar";
import Image from "next/image";
import ConnectWalletButton from "./ConnectWalletButton";
import {
	Menu,
	X,
	Home,
	Info,
	Building,
	Briefcase,
	PlusCircle,
} from "lucide-react";

const navItems = [
	{ href: "/", label: "Home", key: "home", icon: Home },
	{ href: "/about", label: "Why Us", key: "about", icon: Info },
	{
		href: "/marketplace",
		label: "Marketplace",
		key: "marketplace",
		icon: Building,
	},
	{ href: "/mint", label: "Mint", key: "mint", icon: PlusCircle },
	{ href: "/dashboard", label: "Assets", key: "dashboard", icon: Briefcase },
];

interface NavbarProps {
	hideOnHome?: boolean;
}

export default function Navbar({ hideOnHome = false }: NavbarProps) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const pathname = usePathname();
	const isHome = pathname === "/";
	const [isOnHero, setIsOnHero] = useState(isHome);

	useEffect(() => {
		document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isMobileMenuOpen]);

	// Track when the hero section is in view on the homepage
	useEffect(() => {
		if (!isHome) {
			return;
		}

		const hero = document.getElementById("hero-section");
		if (!hero) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsOnHero(entry.isIntersecting && entry.intersectionRatio > 0.3);
			},
			{ threshold: [0.3, 0.5] },
		);

		observer.observe(hero);

		return () => {
			observer.disconnect();
		};
	}, [isHome]);

	const isActive = (href: string) => {
		if (href === "/") return pathname === href;
		return pathname === href || pathname?.startsWith(`${href}/`);
	};

	if (hideOnHome && pathname === "/") return null;

	const showDarkNavbar = isHome && isOnHero;

	return (
		<>
			<header
				className={cn(
					"fixed top-0 left-0 z-50 w-full px-4 sm:px-6 lg:px-8 backdrop-blur-md transition-colors duration-300",
					showDarkNavbar ? "bg-transparent" : "bg-white/80 shadow-sm",
				)}>
				<div className="relative w-full max-w-7xl mx-auto">
					<div className="flex items-center justify-between h-16 sm:h-[68px] md:h-[72px] lg:h-20 relative">
						{/* Mobile Menu Toggle */}
						<div className="flex lg:hidden items-center shrink-0 z-10">
							<button
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								className={cn(
									"p-2.5 rounded-xl transition-all duration-300",
									showDarkNavbar
										? "text-white hover:text-teal-300 hover:bg-white/10"
										: "text-black hover:text-teal-600 hover:bg-teal-50/80",
								)}
								aria-label="Toggle menu"
								aria-expanded={isMobileMenuOpen}>
								{isMobileMenuOpen ? (
									<X className="w-5 h-5 sm:w-6 sm:h-6" />
								) : (
									<Menu className="w-5 h-5 sm:w-6 sm:h-6" />
								)}
							</button>
						</div>

						{/* Brand Logo */}
						<div className="absolute left-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0 flex items-center gap-2.5 sm:gap-3 lg:gap-3.5 shrink-0 z-10">
							<Link
								href="/"
								className="flex items-center gap-2.5 sm:gap-3 lg:gap-3.5 hover:opacity-90 transition-opacity duration-300"
								aria-label="StrataDeed Home">
								<div className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 xl:w-[52px] xl:h-[52px] shrink-0">
									<Image
										src="/logo.png"
										alt="StrataDeed Logo"
										fill
										className={cn(
											"object-contain transition-all duration-300",
											showDarkNavbar ? "" : "brightness-0",
										)}
										priority
										sizes="(max-width: 640px) 36px, (max-width: 1024px) 44px, 52px"
									/>
								</div>
								<div className="hidden lg:flex flex-col">
									<span
										className={cn(
											"text-lg xl:text-xl 2xl:text-2xl font-black leading-tight tracking-tight font-mclaren",
											showDarkNavbar ? "text-white" : "text-black",
										)}>
										StrataDeed
									</span>
									<span
										className={cn(
											"text-[8px] xl:text-[9px] font-black uppercase tracking-[0.35em] leading-none mt-0.5 font-montserrat",
											showDarkNavbar ? "text-primary-light" : "text-primary",
										)}>
										Property Tokenization
									</span>
								</div>
							</Link>
						</div>

						{/* Desktop Navigation */}
						<nav className="hidden lg:flex items-center justify-center flex-1 mx-6 xl:mx-10 2xl:mx-14">
							<div
								className={cn(
									"flex items-center gap-1 xl:gap-1.5 rounded-xl px-1 py-1 backdrop-blur-md transition-colors duration-300",
									showDarkNavbar ? "bg-white/10" : "bg-black/5",
								)}>
								{navItems.map((item) => {
									const active = isActive(item.href);
									return (
										<Link
											key={item.href}
											href={item.href}
											className={cn(
												"relative flex items-center gap-2 px-3.5 xl:px-4 py-2 rounded-lg text-xs font-black uppercase tracking-[0.15em] transition-all duration-300 font-montserrat group/nav",
												active
													? showDarkNavbar
														? "text-primary-light"
														: "text-primary"
													: showDarkNavbar
														? "text-white hover:text-primary-light"
														: "text-black/70 hover:text-primary",
											)}
											aria-current={active ? "page" : undefined}>
											<span>{item.label}</span>
											{active && (
												<span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-light" />
											)}
											{!active && (
												<span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover/nav:w-4 h-0.5 bg-linear-to-r from-primary to-primary-light rounded-full transition-all duration-300" />
											)}
										</Link>
									);
								})}
							</div>
						</nav>

						{/* Actions */}
						<div className="flex items-center gap-2 sm:gap-3 lg:gap-3 shrink-0 z-10">
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
