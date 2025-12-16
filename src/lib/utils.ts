/** @format */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to merge Tailwind CSS classes conditionally.
 * Combines `clsx` for conditional logic and `tailwind-merge` for conflict resolution.
 * 
 * @param inputs - List of classes or conditional class objects.
 * @returns - Merged class string.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
