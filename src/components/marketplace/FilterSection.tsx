/** @format */
"use client";

import { LucideIcon } from "lucide-react";

interface FilterOption {
	label: string;
	value?: string;
	icon?: LucideIcon;
	properties?: number;
	country?: string;
	min?: number;
	max?: number;
}

interface FilterSectionProps {
	title: string;
	icon: LucideIcon;
	options: FilterOption[];
	selectedValue: string;
	onSelect: (value: string) => void;
	type?: "city" | "type" | "price";
}

export default function FilterSection({
	title,
	icon: Icon,
	options,
	selectedValue,
	onSelect,
	type = "city",
}: FilterSectionProps) {
	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
			<div className="flex items-center gap-2 mb-4">
				<Icon className="w-4 h-4 text-blue-600" />
				<h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
			</div>

			{type === "type" ? (
				<div className="grid grid-cols-2 gap-2">
					{options.map((option) => {
						const OptionIcon = option.icon;
						return (
							<button
								key={option.label}
								onClick={() => onSelect(option.label)}
								className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all text-xs ${
									selectedValue === option.label
										? "bg-blue-50 dark:bg-blue-900/30 border border-blue-500 text-blue-700 dark:text-blue-400"
										: "border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 text-gray-700 dark:text-gray-300"
								}`}>
								{OptionIcon && <OptionIcon className="w-4 h-4 mb-1" />}
								<span className="font-medium">{option.label}</span>
							</button>
						);
					})}
				</div>
			) : (
				<div className="space-y-2 max-h-60 overflow-y-auto pr-2">
					{options.map((option) => {
						const OptionIcon = option.icon;
						return (
							<button
								key={option.label}
								onClick={() => onSelect(option.label)}
								className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all text-sm ${
									selectedValue === option.label
										? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
										: "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
								}`}>
								<div className="flex items-center gap-3">
									{OptionIcon && <OptionIcon className="w-3.5 h-3.5" />}
									<span>{option.label}</span>
									{option.country && (
										<span className="text-xs text-gray-500">
											({option.country})
										</span>
									)}
								</div>
								{option.properties !== undefined && (
									<span className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
										{option.properties}
									</span>
								)}
							</button>
						);
					})}
				</div>
			)}
		</div>
	);
}