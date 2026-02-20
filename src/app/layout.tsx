/** @format */

import "./globals.css";
import { Montserrat, McLaren } from "next/font/google";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import { Web3Provider } from "@/providers/suiet-provider";

// Dynamically import Footer to reduce initial bundle size
const Footer = dynamic(() => import("@/components/Footer"), {
	ssr: true,
});

// Configure Montserrat font from Google Fonts with optimization
const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800", "900"],
	variable: "--font-sans",
	display: "swap",
	preload: true,
});

// Configure McLaren font from Google Fonts with optimization
const mclaren = McLaren({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-mclaren",
	display: "swap",
	preload: true,
});

export const metadata = {
	title: "StrataDeed — Tokenized Property Deeds on Avalanche",
	description:
		"Mint, list, and discover tokenized property deeds on Avalanche C-Chain.",
	keywords: [
		"real estate",
		"blockchain",
		"tokenization",
		"property",
		"Avalanche",
		"AVAX",
		"RWA",
		"NFT",
	],
	authors: [{ name: "StrataDeed" }],
	viewport: "width=device-width, initial-scale=1",
	themeColor: "#E84142",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${montserrat.variable} ${mclaren.variable}`}>
			<head>
				<link
					rel="icon"
					href="/logo.png"
					type="image/png"
				/>
			</head>
			<body className="font-montserrat antialiased bg-bg text-text">
				<Web3Provider>
					<div className="min-h-screen flex flex-col">
						<Navbar
							placement="hero"
							hideOnHome
						/>
						<main className="flex-1 w-full">{children}</main>
						<Footer />
					</div>
				</Web3Provider>
			</body>
		</html>
	);
}
