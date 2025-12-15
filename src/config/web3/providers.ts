/** @format */

import { http } from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mantle, mantleSepoliaTestnet } from "viem/chains";

export const config = getDefaultConfig({
	appName: "StrataDeed",
	projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
	chains: [mantle, mantleSepoliaTestnet],
	transports: {
		[mantle.id]: http("https://rpc.mantle.xyz"),
		[mantleSepoliaTestnet.id]: http("https://rpc.sepolia.mantle.xyz"),
	},
	ssr: true,
});
