/** @format */

// hooks/useTokenization.ts - Fix the BigInt issue
"use client";

import { useState } from "react";
import { useSuiWallet } from "@/providers/suiet-provider";
import { createSuiClient } from "@/lib/sui/client";
import { tokenizePropertyOnSui } from "@/lib/sui/tokenization";

export function useTokenization() {
	const { address } = useSuiWallet();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [txDigest, setTxDigest] = useState<string | undefined>();

	const tokenizeProperty = async (
		propertyId: string,
		metadataURI: string,
		mintFee: string,
		privateCommitment: string,
		owner: string,
	) => {
		setLoading(true);
		setError(null);

		try {
			if (!address) {
				throw new Error("Wallet not connected");
			}

			// Basic validation
			if (!propertyId || propertyId.trim().length === 0) {
				throw new Error("Property ID cannot be empty");
			}
			if (!metadataURI || metadataURI.trim().length === 0) {
				throw new Error("Metadata URI cannot be empty");
			}

			const client = createSuiClient();

			const result = await tokenizePropertyOnSui(client, address, {
				propertyId,
				metadataUrl: metadataURI,
				privateCommitment,
				ownerAddress: owner,
				mintFee,
			});

			const digest = result.digest;
			setTxDigest(digest);

			return {
				success: true,
				hash: digest,
				message: "Sui transaction submitted successfully",
			};
		} catch (err: any) {
			let errorMessage = "Failed to tokenize property on Sui";

			if (err?.message?.includes("User rejected")) {
				errorMessage = "Transaction rejected by user";
			} else if (err?.message) {
				errorMessage = err.message;
			}

			setError(errorMessage);

			return {
				success: false,
				hash: undefined,
				message: errorMessage,
			};
		} finally {
			setLoading(false);
		}
	};

	return {
		tokenizeProperty,
		loading,
		error,
		txHash: txDigest,
		receipt: undefined,
		isSuccess: !!txDigest,
		eventData: null,
	};
}

