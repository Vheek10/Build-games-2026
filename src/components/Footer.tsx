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
		<footer className="bg-gray-900 border-t border-gray-800">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
							<h2 className="text-xl font-bold text-white">StrataDeed</h2>
							<p className="text-xs text-blue-300/90 font-medium uppercase tracking-[0.15em] mt-0.5">
								Property Tokenization
							</p>
						</div>
					</div>

					{/* Links */}
					<div className="flex flex-wrap justify-center gap-6 text-sm">
						<Link
							href="/about"
							className="text-gray-400 hover:text-white transition-colors">
							About
						</Link>
						<Link
							href="/marketplace"
							className="text-gray-400 hover:text-white transition-colors">
							Marketplace
						</Link>
						<Link
							href="/mint"
							className="text-gray-400 hover:text-white transition-colors">
							Mint
						</Link>
						<Link
							href="/dashboard"
							className="text-gray-400 hover:text-white transition-colors">
							Dashboard
						</Link>
						<Link
							href="/contact"
							className="text-gray-400 hover:text-white transition-colors">
							Contact
						</Link>
					</div>

					{/* Social */}
					<div className="flex items-center gap-4">
						<a
							href="#"
							className="text-gray-400 hover:text-white transition-colors">
							<Twitter className="w-5 h-5" />
						</a>
						<a
							href="#"
							className="text-gray-400 hover:text-white transition-colors">
							<Linkedin className="w-5 h-5" />
						</a>
						<a
							href="#"
							className="text-gray-400 hover:text-white transition-colors">
							<Github className="w-5 h-5" />
						</a>
					</div>
				</div>

				{/* Copyright */}
				<div className="text-center mt-8 pt-6 border-t border-gray-800">
					<p className="text-gray-500 text-sm">
						© {new Date().getFullYear()} StrataDeed. Revolutionizing real estate
						investment.
					</p>
				</div>
			</div>
		</footer>
	);
}
