/** @format */
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
	Building2,
	Home,
	Info,
	Building,
	PlusCircle,
	Briefcase,
	Mail,
	Phone,
	MapPin,
	Twitter,
	Linkedin,
	Github,
	Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Footer() {
	return (
		<footer className="bg-gradient-to-b from-white via-slate-50 to-white border-t border-gray-200 relative overflow-hidden">
			<div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0" />
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
				<div className="flex flex-col lg:flex-row justify-between items-center gap-8">
					{/* Brand Section */}
					<div className="flex items-center gap-4">
						<div className="relative w-10 h-10">
							<Image
								src="/logo.png"
								alt="StrataDeed Logo"
								fill
								className="object-contain"
								sizes="40px"
							/>
						</div>
						<div>
							<h2 className="text-xl font-black text-gray-900 font-mclaren">
								StrataDeed
							</h2>
							<p className="text-[9px] font-black text-blue-600 uppercase tracking-[0.4em] leading-none mt-0.5 font-montserrat">
								Property Tokenization
							</p>
						</div>
					</div>

					{/* Links */}
					<div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 font-montserrat">
						{[
							{ label: "About", href: "/about" },
							{ label: "Marketplace", href: "/marketplace" },
							{ label: "Mint", href: "/mint" },
							{ label: "Dashboard", href: "/dashboard" },
							{ label: "Contact", href: "/contact" },
						].map((link) => (
							<Link
								key={link.label}
								href={link.href}
								className="hover:text-blue-600 hover:tracking-[0.3em] transition-all duration-300">
								{link.label}
							</Link>
						))}
					</div>

					{/* Social */}
					<div className="flex items-center gap-6">
						{[
							{ icon: Twitter, href: "#" },
							{ icon: Linkedin, href: "#" },
							{ icon: Github, href: "#" },
						].map((social, i) => (
							<a
								key={i}
								href={social.href}
								className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 hover:scale-110 hover:rotate-3 transition-all duration-500 shadow-sm hover:shadow-[0_15px_30px_-5px_rgba(37,99,235,0.3)]">
								<social.icon className="w-5 h-5" />
							</a>
						))}
					</div>
				</div>

				{/* Copyright */}
				<div className="text-center mt-8 pt-6 border-t border-gray-200">
					<p className="text-gray-500 text-sm font-montserrat">
						© {new Date().getFullYear()} StrataDeed. Revolutionizing real estate
						investment.
					</p>
				</div>
			</div>
		</footer>
	);
}
