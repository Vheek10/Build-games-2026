/** @format */

import "./globals.css";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["400", "600", "700", "800"],
});

export const metadata = {
	title: "StrataDeed — Tokenized Property Deeds",
	description:
		"Mint, list, and discover tokenized property deeds (UI-only prototype)",
	colorScheme: "dark",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className="dark">
			<body className={montserrat.className + " antialiased dark"}>
				<div className="min-h-screen flex flex-col bg-gray-950">
					<Navbar />
					<main className="flex-1 w-full">{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
