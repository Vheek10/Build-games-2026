/** @format */

import "./globals.css";
import { Montserrat, Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Web3Provider } from "@/providers/suiet-provider";
import Footer from "@/components/Footer";

// Configure Montserrat font from Google Fonts with optimization
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

// Configure Outfit font from Google Fonts with optimization
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-outfit",
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
    <html lang="en" className={`${montserrat.variable} ${outfit.variable}`}>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body className="font-montserrat antialiased bg-bg text-text">
        <Web3Provider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </div>
        </Web3Provider>
      </body>
    </html>
  );
}
