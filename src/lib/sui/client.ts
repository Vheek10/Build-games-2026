/** @format */

import { SuiClient } from "@mysten/sui/client";

export const SUI_NETWORK = "suiTestnet" as const;

export function createSuiClient() {
	return new SuiClient({
		url:
			process.env.NEXT_PUBLIC_SUI_RPC_URL ||
			"https://fullnode.testnet.sui.io:443",
	});
}

