/** @format */
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
	Menu,
	X,
	Rocket,
	Home,
	Info,
	Building,
	Users,
	Briefcase,
	Phone,
} from "lucide-react";
import MobileSidebar from "./MobileSidebar";
import { cn } from "@/lib/utils";

// Icon mapping for navigation items
const navIcons = {
	home: Home,
	"about-us": Info,
	"for-investors": Briefcase,
	"for-developers": Building,
	company: Users,
	"contact-us": Phone,
};

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const pathname = usePathname();

	const navItems = [
		{ href: "/", label: "Home", key: "home" },
		{ href: "/about-us", label: "About Us", key: "about-us" },
		{ href: "/for-investors", label: "For Investors", key: "for-investors" },
		{ href: "/for-developers", label: "For Developers", key: "for-developers" },
		{ href: "/company", label: "Company", key: "company" },
		{ href: "/contact-us", label: "Contact Us", key: "contact-us" },
	];

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		setIsMobileMenuOpen(false);
	}, [pathname]);

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

	return (
		<>
			{/* Main Navigation */}
			<header
				className={cn(
					"sticky top-0 z-50 w-full transition-all duration-500 ease-out",
					isScrolled
						? "bg-gray-900/95 backdrop-blur-xl shadow-2xl shadow-black/20"
						: "bg-gradient-to-b from-gray-900/95 to-gray-900/90 backdrop-blur-lg",
					"border-b border-gray-800/50",
					"px-4 sm:px-6 lg:px-8 xl:px-10",
				)}>
				{/* Animated Background Element */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-r from-blue-400/5 to-cyan-400/5 rounded-full blur-3xl" />
					<div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 rounded-full blur-3xl" />
				</div>

				<div className="relative mx-auto w-full max-w-screen-2xl">
					<div className="flex items-center justify-between h-16 lg:h-20">
						{/* Left Section: Mobile Menu Button + Logo */}
						<div className="flex items-center gap-3 lg:gap-4 flex-shrink-0">
							{/* Mobile Menu Button */}
							<button
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								className="lg:hidden p-2 text-gray-300 hover:text-blue-400 transition-all duration-300 hover:scale-110"
								aria-label="Toggle menu"
								aria-expanded={isMobileMenuOpen}>
								{isMobileMenuOpen ? (
									<X className="w-5 h-5" />
								) : (
									<Menu className="w-5 h-5" />
								)}
							</button>

							{/* Logo Section */}
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
								<div className="flex flex-col">
									<span className="text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-white via-blue-300 to-cyan-400 bg-clip-text text-transparent leading-tight tracking-tight">
										StrataDeed
									</span>
									<span className="hidden sm:block text-xs text-gray-400 font-medium uppercase tracking-[0.2em] leading-none mt-0.5">
										Property <span className="text-blue-400">Tokenization</span>
									</span>
								</div>
							</Link>
						</div>

						{/* Desktop Navigation - Centered */}
						<nav className="hidden lg:flex items-center justify-center flex-1 mx-8 xl:mx-12 2xl:mx-16">
							<div className="relative">
								{/* Decorative border */}
								<div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-transparent to-cyan-400/10 rounded-full blur-sm" />
								<div className="relative flex items-center gap-6 xl:gap-8">
									{navItems.map((item) => {
										const Icon = navIcons[item.key as keyof typeof navIcons];
										const active = isActive(item.href);

										return (
											<Link
												key={item.href}
												href={item.href}
												className={cn(
													"flex items-center gap-2 text-sm font-medium transition-all duration-300 relative group/nav",
													active
														? "text-blue-400"
														: "text-gray-300 hover:text-blue-400",
												)}
												aria-current={active ? "page" : undefined}>
												<Icon
													className={cn(
														"w-4 h-4 transition-all duration-300",
														active
															? "text-blue-400"
															: "text-gray-400 group-hover/nav:text-blue-400",
													)}
												/>
												<span className="relative">
													{item.label}
													{/* Underline on active */}
													{active && (
														<div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
													)}
													{/* Hover underline effect */}
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

						{/* Right Section: Signup Buttons */}
						<div className="flex items-center gap-3 lg:gap-4 xl:gap-5 flex-shrink-0">
							{/* Mobile/Tablet Signup Button (Visible on small and medium screens) */}
							<div className="flex lg:hidden items-center">
								<Link
									href="/signup"
									className="group px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-sm font-medium rounded-full shadow-lg shadow-blue-400/10 hover:shadow-xl hover:shadow-blue-400/20 hover:scale-105 active:scale-95 transition-all duration-300">
									<span className="flex items-center gap-1.5">
										<Rocket className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
										<span className="hidden sm:inline">Sign Up</span>
										<span className="sm:hidden">Join</span>
									</span>
								</Link>
							</div>

							{/* Desktop Signup Button */}
							<div className="hidden lg:flex items-center">
								<Link
									href="/signup"
									className="group px-5 py-2.5 xl:px-6 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-sm font-medium rounded-full shadow-lg shadow-blue-400/10 hover:shadow-xl hover:shadow-blue-400/20 hover:scale-105 active:scale-95 transition-all duration-300">
									<span className="flex items-center gap-2">
										<Rocket className="w-4 h-4 group-hover:rotate-12 transition-transform" />
										Sign Up
									</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</header>

			{/* Mobile Sidebar Component */}
			<MobileSidebar
				isOpen={isMobileMenuOpen}
				onClose={() => setIsMobileMenuOpen(false)}
				navItems={navItems}
				isActive={isActive}
			/>
		</>
	);
}
