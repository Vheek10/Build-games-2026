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
    label: "Platform",
    key: "marketplace",
    icon: Building,
  },
  { href: "/mint", label: "Assets", key: "mint", icon: PlusCircle },
  { href: "/dashboard", label: "Blog", key: "dashboard", icon: Briefcase },
];

interface NavbarProps {
  hideOnHome?: boolean;
}

export default function Navbar({ hideOnHome = false }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  if (hideOnHome && pathname === "/") return null;

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 backdrop-blur-md">
        <div className="relative mx-auto w-full max-w-screen-2xl">
          <div className="flex items-center justify-between h-16 sm:h-[68px] md:h-[72px] lg:h-20 relative">
            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden items-center shrink-0 z-10">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 rounded-xl transition-all duration-300 text-gray-700 hover:text-teal-600 hover:bg-teal-50/80"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
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
                aria-label="StrataDeed Home"
              >
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 xl:w-[52px] xl:h-[52px] shrink-0">
                  <Image
                    src="/logo.png"
                    alt="StrataDeed Logo"
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 640px) 36px, (max-width: 1024px) 44px, 52px"
                  />
                </div>
                <div className="hidden lg:flex flex-col">
                  <span className="text-lg xl:text-xl 2xl:text-2xl font-black leading-tight tracking-tight font-mclaren text-white">
                    StrataDeed
                  </span>
                  <span className="text-[8px] xl:text-[9px] font-black text-primary-light uppercase tracking-[0.35em] leading-none mt-0.5 font-montserrat">
                    Property Tokenization
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-center flex-1 mx-6 xl:mx-10 2xl:mx-14">
              <div className="flex items-center gap-1 xl:gap-1.5 bg-white/20 backdrop-blur-md rounded-xl px-1 py-1">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "relative flex items-center gap-2 px-3.5 xl:px-4 py-2 rounded-lg text-xs font-black uppercase tracking-[0.15em] transition-all duration-300 font-montserrat group/nav",
                        active
                          ? "text-primary-light"
                          : "text-white hover:text-primary-light",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
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
