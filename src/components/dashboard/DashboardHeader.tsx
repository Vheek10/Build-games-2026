/** @format */

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
		<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
			<div>
				<div className="flex items-center gap-3 mb-1">
					<h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
						STRATADEED
					</h1>
					<span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
						Mantle L2
					</span>
				</div>
				<p className="text-gray-600 dark:text-gray-400 text-sm">{subtitle}</p>
			</div>

			<div className="flex flex-col sm:flex-row items-end sm:items-center gap-3 w-full lg:w-auto">
				<div className="flex items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-1.5 border border-gray-200 dark:border-gray-700">
					<div className="flex items-center gap-1.5">
						<Zap className="w-3.5 h-3.5 text-amber-500" />
						<span>
							Gas:{" "}
							<span className="text-gray-700 dark:text-gray-200">
								0.001 Gwei
							</span>
						</span>
					</div>
					<div className="w-px h-3 bg-gray-300 dark:bg-gray-600" />
					<div className="flex items-center gap-1.5">
						<Wifi className="w-3.5 h-3.5 text-emerald-500" />
						<span className="text-emerald-600 dark:text-emerald-400">
							Mainnet
						</span>
					</div>
				</div>

				<div className="flex items-center gap-3">
					<ConnectWalletButton />
					<div className="relative">
						<button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
							<Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
							<span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
