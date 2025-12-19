/** @format */

import {
	Plus,
	TrendingUp,
	Layers,
	MoreVertical,
	ChevronRight,
	Activity,
	DollarSign,
	Clock,
	Home,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Property } from "./types"; // We will alias this or assume types are updated separately, or just treat 'Property' as 'Strategy' object structurally for now.

interface PropertiesListProps {
	properties: Property[];
}

export default function PropertiesList({ properties }: PropertiesListProps) {
	const router = useRouter();

	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
				<div>
					<h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Layers className="w-5 h-5 text-blue-500" />
						Tokenized Properties
					</h3>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						Fractional real estate ownership
					</p>
				</div>
				<button 
					onClick={() => router.push("/mint")}
					className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors text-sm shadow-lg shadow-emerald-500/20"
				>
					<Plus className="w-4 h-4" />
					Tokenize Property
				</button>
			</div>

			<div className="space-y-4">
				{properties.slice(0, 3).map((property, index) => (
					<div
						key={property.id}
						className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300 hover:shadow-md group">
						<div className="flex w-full sm:w-auto items-center gap-4">
							<div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                                {/* Placeholder for Token/Strategy Icon since we don't have strategy images yet */}
								<Home className="w-8 h-8 text-gray-400" />
                                {/* Status Indicator */}
								<div className="absolute top-1 left-1 px-1.5 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded shadow-sm">
									LIVE
								</div>
							</div>
							
							{/* Mobile: Title & Value shown here */}
							<div className="sm:hidden flex-1">
								<h4 className="font-bold text-gray-900 dark:text-white text-sm">
									{property.title} {/* Strategy Name */}
								</h4>
								<div className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                                    {/* Using price as 'Staked Amount' */}
									${property.price.toLocaleString()} Tokenized
								</div>
							</div>

							<button className="sm:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
								<MoreVertical className="w-5 h-5 text-gray-400" />
							</button>
						</div>

						<div className="flex-1 w-full">
							{/* Desktop: Title & Value */}
							<div className="hidden sm:flex items-center justify-between mb-1">
								<h4 className="font-bold text-gray-900 dark:text-white text-base">
									{property.title}
								</h4>
								<div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                    <span className="text-xs text-gray-500 font-normal uppercase mr-1">Tokenized:</span>
									${property.price.toLocaleString()}
								</div>
							</div>

							{/* Strategy Details: APY, TVL, Earned */}
							<div className="flex items-center gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 dark:border-gray-700 w-full sm:w-auto mt-2">
								<div className="flex items-center gap-1.5 text-xs sm:text-sm bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md text-blue-700 dark:text-blue-300 font-medium">
									<TrendingUp className="w-3.5 h-3.5" />
                                    {/* Mock APY based on bedrooms :) */}
									<span>{property.bedrooms * 4.2}% Rental Yield</span>
								</div>
								<div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
									<Activity className="w-3.5 h-3.5 text-gray-400" />
                                    {/* Mock Risk Score based on bathrooms */}
									<span>Occupancy: 100%</span>
								</div>
								<div className="flex items-center gap-1.5 text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-medium ml-auto sm:ml-0">
									<DollarSign className="w-3.5 h-3.5" />
									<span>Annual Rent: ${(property.price * 0.05).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
								</div>
							</div>
						</div>

						<button className="hidden sm:block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-gray-600">
							<MoreVertical className="w-5 h-5" />
						</button>
					</div>
				))}
			</div>

			<div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
				<button className="w-full flex items-center justify-center gap-2 py-2 text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
					View All Properties
					<ChevronRight className="w-4 h-4" />
				</button>
			</div>
		</div>
	);
}
