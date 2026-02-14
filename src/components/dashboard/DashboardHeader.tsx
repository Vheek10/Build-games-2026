/** @format */

import { motion } from "framer-motion";
import { Bell, Wifi, Zap } from "lucide-react";
import ConnectWalletButton from "@/components/ConnectWalletButton";

interface DashboardHeaderProps {
	title: string;
	subtitle: string;
}

export default function DashboardHeader({
	title,
	subtitle,
}: DashboardHeaderProps) {
	return (
		<motion.div
			className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8"
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}>
			<motion.div
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.4, delay: 0.1 }}>
				<div className="flex items-center gap-3 mb-1">
					<h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight font-mclaren">
						STRATADEED
					</h1>
					<motion.span
						className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider border border-emerald-200 font-montserrat"
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ delay: 0.2 }}>
						Sui Network
					</motion.span>
				</div>
				<p className="text-gray-600 text-sm font-montserrat">{subtitle}</p>
			</motion.div>

			<motion.div
				className="flex flex-col sm:flex-row items-end sm:items-center gap-3 w-full lg:w-auto"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.4, delay: 0.1 }}>
				<motion.div
					className="flex items-center gap-4 text-xs font-medium text-gray-500 bg-gray-100 rounded-lg px-3 py-1.5 border border-gray-200 font-montserrat"
					whileHover={{ boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
					transition={{ duration: 0.2 }}>
					<div className="flex items-center gap-1.5">
						<Zap className="w-3.5 h-3.5 text-amber-500" />
						<span>
							Gas: <span className="text-gray-700">0.001 Gwei</span>
						</span>
					</div>
					<div className="w-px h-3 bg-gray-300" />
					<div className="flex items-center gap-1.5">
						<motion.div
							animate={{ scale: [1, 1.1, 1] }}
							transition={{ duration: 2, repeat: Infinity }}>
							<Wifi className="w-3.5 h-3.5 text-emerald-500" />
						</motion.div>
						<span className="text-emerald-600">Mainnet</span>
					</div>
				</motion.div>

				<div className="flex items-center gap-3">
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2 }}>
						<ConnectWalletButton />
					</motion.div>
					<motion.div
						className="relative"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.25 }}>
						<motion.button
							className="p-2 hover:bg-gray-100 rounded-lg transition-colors border border-transparent hover:border-gray-200"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}>
							<Bell className="w-5 h-5 text-gray-600" />
							<motion.span
								className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"
								animate={{ scale: [1, 1.2, 1] }}
								transition={{ duration: 2, repeat: Infinity }}
							/>
						</motion.button>
					</motion.div>
				</div>
			</motion.div>
		</motion.div>
	);
}
