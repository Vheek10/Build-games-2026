/** @format */
"use client";
import Link from "next/link";
import Image from "next/image";
import {
	X,
	Users,
	Phone,
	Store,
	Building2,
	FileText,
	PlusCircle,
	Shield,
	Sparkles,
	ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, Variants } from "framer-motion";
import ConnectWalletButton from "./ConnectWalletButton";

// Updated icon mapping for navigation items
const navIcons = {
	home: Building2,
	"about-us": FileText,
	about: FileText,
	marketplace: Store,
	company: Users,
	"contact-us": Phone,
	mint: PlusCircle,
	dashboard: Store,
} as const;

// Type for icon keys
type IconKey = keyof typeof navIcons;

const sidebarVariants: Variants = {
	closed: { x: "-100%", opacity: 0 },
	open: {
		x: 0,
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 30,
			staggerChildren: 0.06,
			delayChildren: 0.12,
		},
	},
	exit: {
		x: "-100%",
		opacity: 0,
		transition: { duration: 0.2, ease: "easeInOut" },
	},
};

const itemVariants: Variants = {
	closed: { opacity: 0, x: -16 },
	open: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.35, ease: "easeOut" },
	},
};

const backdropVariants: Variants = {
	closed: { opacity: 0 },
	open: { opacity: 1 },
	exit: { opacity: 0 },
};

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
	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						variants={backdropVariants}
						initial="closed"
						animate="open"
						exit="exit"
						className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
						onClick={onClose}
						aria-hidden="true"
					/>

					{/* Sidebar Panel */}
					<motion.div
						variants={sidebarVariants}
						initial="closed"
						animate="open"
						exit="exit"
						className="fixed inset-y-0 left-0 z-50 w-[280px] sm:w-[320px] lg:hidden">
						<div className="h-full bg-white/95 backdrop-blur-xl border-r border-gray-200/80 shadow-2xl overflow-y-auto flex flex-col">
							{/* Header */}
							<div className="p-5 pb-3">
								<div className="flex items-center justify-between">
									<motion.div
										variants={itemVariants}
										className="flex items-center gap-2.5">
										<div className="relative w-9 h-9 flex-shrink-0">
											<Image
												src="/logo.png"
												alt="StrataDeed Logo"
												fill
												className="object-contain"
												sizes="36px"
											/>
										</div>
										<div className="flex flex-col">
											<span className="text-base font-black text-gray-900 leading-tight tracking-tight font-mclaren">
												StrataDeed
											</span>
											<span className="text-[8px] font-black text-red-600 uppercase tracking-[0.35em] leading-none mt-0.5 font-montserrat">
												Tokenization
											</span>
										</div>
									</motion.div>

									<motion.button
										variants={itemVariants}
										onClick={onClose}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className="p-2 text-gray-400 hover:text-gray-700 bg-gray-100/80 hover:bg-gray-200/80 rounded-lg transition-colors duration-200"
										aria-label="Close menu">
										<X className="w-4 h-4" />
									</motion.button>
								</div>

								<div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent mt-4" />
							</div>

							{/* Navigation */}
							<nav className="flex-1 px-3 pb-3">
								<motion.div variants={itemVariants}>
									<p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.4em] px-3 mb-2 font-montserrat">
										Navigate
									</p>
								</motion.div>

								<div className="space-y-0.5">
									{navItems.map((item, index) => {
										const Icon = navIcons[item.key as IconKey] || Building2;
										const active = isActive(item.href);

										return (
											<motion.div
												key={item.href}
												variants={itemVariants}
												custom={index}>
												<Link
													href={item.href}
													className={cn(
														"group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 relative",
														active
															? "bg-red-600 shadow-lg shadow-red-600/20"
															: "hover:bg-gray-50",
													)}
													onClick={onClose}>
													<div
														className={cn(
															"w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 flex-shrink-0",
															active
																? "bg-white/20 text-white"
																: "bg-gray-100 text-gray-500 group-hover:text-red-600 group-hover:bg-red-50",
														)}>
														<Icon className="w-4 h-4" />
													</div>

													<span
														className={cn(
															"text-[11px] font-black uppercase tracking-[0.18em] transition-colors duration-200 font-montserrat flex-1",
															active
																? "text-white"
																: "text-gray-600 group-hover:text-gray-900",
														)}>
														{item.label}
													</span>

													{active && (
														<ChevronRight className="w-3.5 h-3.5 text-white/60" />
													)}
												</Link>
											</motion.div>
										);
									})}
								</div>
							</nav>

							{/* Wallet Section */}
							<div className="mt-auto p-4 pt-0">
								<div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4" />

								<motion.div
									variants={itemVariants}
									className="space-y-3">
									<div className="w-full">
										<ConnectWalletButton />
									</div>

									<div className="flex items-center justify-center gap-1.5 px-3 py-1.5">
										<Shield className="w-3 h-3 text-gray-400" />
										<span className="text-[7px] font-black text-gray-400 uppercase tracking-[0.3em] font-montserrat">
											Zero-Knowledge Privacy
										</span>
									</div>
								</motion.div>

								<div className="mt-3 pt-3 border-t border-gray-100">
									<div className="flex items-center justify-center gap-1.5">
										<Sparkles className="w-2.5 h-2.5 text-gray-300" />
										<span className="text-[7px] font-black text-gray-300 uppercase tracking-[0.5em] font-montserrat">
											Institutional Standard
										</span>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
