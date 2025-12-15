/** @format */

import { http } from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mantle, mantleSepoliaTestnet } from "viem/chains";

export const config = getDefaultConfig({
	appName: "StrataDeed",
	projectId:
		process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ||
		"47828de378396c21a4fb4a2da529712a", // Fallback ID for build time
	chains: [mantleSepoliaTestnet, mantle],
	transports: {
		[mantleSepoliaTestnet.id]: http("https://rpc.sepolia.mantle.xyz"),
		[mantle.id]: http("https://rpc.mantle.xyz"),
	},
	ssr: true,
});
