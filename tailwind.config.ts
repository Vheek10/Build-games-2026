/** @format */

import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: "class",
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		colors: {
			// Base colors - dark theme only
			black: "#000000",
			white: "#ffffff",
			transparent: "transparent",
			current: "currentColor",

			// Grays - standard Tailwind scale
			gray: {
				50: "#f9fafb",
				100: "#f3f4f6",
				200: "#e5e7eb",
				300: "#d1d5db",
				400: "#9ca3af",
				500: "#6b7280",
				600: "#4b5563",
				700: "#374151",
				800: "#1f2937",
				900: "#111827",
				950: "#030712",
			},

			// Blue palette
			blue: {
				50: "#eff6ff",
				100: "#dbeafe",
				200: "#bfdbfe",
				300: "#93c5fd",
				400: "#60a5fa",
				500: "#3b82f6",
				600: "#2563eb",
				700: "#1d4ed8",
				800: "#1e40af",
				900: "#1e3a8a",
				950: "#172554",
			},

			// Cyan palette
			cyan: {
				50: "#ecf8ff",
				100: "#cff9fe",
				200: "#a5f3fc",
				300: "#67e8f9",
				400: "#22d3ee",
				500: "#06b6d4",
				600: "#0891b2",
				700: "#0e7490",
				800: "#155e75",
				900: "#164e63",
				950: "#082f49",
			},

			// Emerald palette
			emerald: {
				50: "#f0fdf4",
				100: "#dcfce7",
				200: "#bbf7d0",
				300: "#86efac",
				400: "#4ade80",
				500: "#22c55e",
				600: "#16a34a",
				700: "#15803d",
				800: "#166534",
				900: "#145231",
				950: "#052e16",
			},

			// Amber palette
			amber: {
				50: "#fffbeb",
				100: "#fef3c7",
				200: "#fde68a",
				300: "#fcd34d",
				400: "#fbbf24",
				500: "#f59e0b",
				600: "#d97706",
				700: "#b45309",
				800: "#92400e",
				900: "#78350f",
				950: "#451a03",
			},

			// Red palette (for errors)
			red: {
				50: "#fef2f2",
				100: "#fee2e2",
				200: "#fecaca",
				300: "#fca5a5",
				400: "#f87171",
				500: "#ef4444",
				600: "#dc2626",
				700: "#b91c1c",
				800: "#991b1b",
				900: "#7f1d1d",
				950: "#450a0a",
			},

			// Green palette (for success)
			green: {
				50: "#f0fdf4",
				100: "#dcfce7",
				200: "#bbf7d0",
				300: "#86efac",
				400: "#4ade80",
				500: "#22c55e",
				600: "#16a34a",
				700: "#15803d",
				800: "#166534",
				900: "#145231",
				950: "#052e16",
			},
		},
		extend: {
			spacing: {},
			fontSize: {},
			fontFamily: {
				sans: ["Montserrat", "Inter", "system-ui", "sans-serif"],
				mono: ["JetBrains Mono", "SF Mono", "monospace"],
			},
		},
	},
	plugins: [],
};

export default config;
