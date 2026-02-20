/** @format */

"use client";

import { useState } from "react";
import {
	useAccount,
	useWriteContract,
	useWaitForTransactionReceipt,
} from "wagmi";
import {
	STRATA_DEED_NFT_ABI,
	STRATA_DEED_NFT_ADDRESS,
} from "@/config/contracts";

/**
 * Hook for minting Property Deed NFTs on Avalanche C-Chain
 * Interacts with StrataDeedNFT.sol :: mintPropertyDeed
 */
export function useTokenization() {
	const { address } = useAccount();
	const [error, setError] = useState<string | null>(null);

	const {
		data: txHash,
		writeContract,
		isPending: loading,
		error: writeError,
	} = useWriteContract();

	const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
		hash: txHash,
	});

	/**
	 * Mints a Property Deed NFT
	 * @param propertyId - Unique property identifier
	 * @param metadataURI - IPFS or HTTP metadata URI
	 * @param mintFee - Fee for minting (unused in current contract)
	 * @param privateCommitment - ZK commitment hash (hex string)
	 * @param owner - Owner address (recipient)
	 */
	const tokenizeProperty = async (
		propertyId: string,
		metadataURI: string,
		mintFee: string,
		privateCommitment: string,
		owner: string,
	) => {
		setError(null);

		try {
			if (!address) {
				throw new Error("Wallet not connected");
			}

			if (!STRATA_DEED_NFT_ADDRESS) {
				throw new Error(
					"StrataDeedNFT contract address not configured. Deploy contracts first.",
				);
			}

			// Input validation
			if (!propertyId || propertyId.trim().length === 0) {
				throw new Error("Property ID cannot be empty");
			}
			if (!metadataURI || metadataURI.trim().length === 0) {
				throw new Error("Metadata URI cannot be empty");
			}
			if (!privateCommitment || privateCommitment.length === 0) {
				throw new Error("Private commitment is required for ZK proofs");
			}

			// Convert commitment string to bytes
			const commitmentBytes = `0x${Array.from(
				new TextEncoder().encode(privateCommitment),
			)
				.map((b) => b.toString(16).padStart(2, "0"))
				.join("")}` as `0x${string}`;

			writeContract({
				address: STRATA_DEED_NFT_ADDRESS,
				abi: STRATA_DEED_NFT_ABI,
				functionName: "mintPropertyDeed",
				args: [
					propertyId,
					metadataURI,
					commitmentBytes,
					owner as `0x${string}`,
				],
			});

			return {
				success: true,
				hash: txHash,
				message: "Transaction submitted to Avalanche C-Chain",
			};
		} catch (err: any) {
			let errorMessage = "Failed to tokenize property";

			if (
				err?.message?.includes("User rejected") ||
				err?.message?.includes("denied")
			) {
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
		}
	};

	return {
		tokenizeProperty,
		loading: loading || isConfirming,
		error: error || writeError?.message || null,
		txHash,
		receipt: undefined,
		isSuccess,
		eventData: null,
	};
}
