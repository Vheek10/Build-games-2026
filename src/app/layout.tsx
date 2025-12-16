/** @format */

import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Web3Provider } from "@/providers/web3-provider";

const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["400", "600", "700", "800"],
});

export const metadata = {
	title: "StrataDeed — Tokenized Property Deeds on Mantle",
	description: "Mint, list, and discover tokenized property deeds on the Mantle Network.",
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
		<html lang="en" className="dark">
			<body className={montserrat.className + " antialiased"}>
				<Web3Provider>
					<div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
						<Navbar />
						<main className="flex-1 w-full">{children}</main>
						<Footer />
					</div>
				</Web3Provider>
			</body>
		</html>
	);
}
