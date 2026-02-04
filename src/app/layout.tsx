/** @format */

import "./globals.css";

import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SuietProvider } from "@/providers/suiet-provider";
const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["400", "600", "700", "800"],
});

export const metadata = {
	title: "StrataDeed — Tokenized Property Deeds on Sui",
	description:
		"Mint, list, and discover tokenized property deeds on the Sui Network.",
};

/**
 * Root Layout Component.
 * Wraps the entire application with necessary providers and global structure.
 *
 * Structure:
 * - HTML/Body with font configuration
 * - Web3Provider (Wagmi/RainbowKit/QueryClient)
 * - Flexible flex-col layout (Navbar, Main Content, Footer)
 */
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<link
					rel="icon"
					href="/logo.png"
					type="image/png"
				/>
			</head>
			<body className={montserrat.className + " antialiased bg-white text-slate-900"}>
				<SuietProvider>
					<div className="min-h-screen flex flex-col bg-white text-slate-900">
						<Navbar />
						<main className="flex-1 w-full">{children}</main>
						<Footer />
					</div>
				</SuietProvider>
			</body>
		</html>
	);
}
