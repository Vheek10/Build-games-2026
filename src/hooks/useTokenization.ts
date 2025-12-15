/** @format */

"use client";

import { useState } from "react";
import { parseEther } from "viem";
import { useAccount, useWriteContract, useReadContract, useChainId } from "wagmi";
import { StrataDeedNFTABI } from "@/contracts/abis/StrataDeedNFT";
import { STRATA_DEED_NFT_ADDRESS } from "@/contracts/addresses";

export function useTokenization() {
	const { address } = useAccount();
	const chainId = useChainId();
	const currentChainId = chainId && STRATA_DEED_NFT_ADDRESS[chainId] ? chainId : 5003; // Default to testnet if mismatch
    const contractAddress = STRATA_DEED_NFT_ADDRESS[currentChainId] as `0x${string}`;

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Read functions
	const { data: tokenCounter } = useReadContract({
		address: contractAddress,
		abi: StrataDeedNFTABI,
		functionName: "tokenCounter",
	});

	const { data: userTokens } = useReadContract({
		address: contractAddress,
		abi: StrataDeedNFTABI,
		functionName: "tokensOfOwner",
		args: [address!],
		query: {
			enabled: !!address,
		},
	});

	// Write functions
	const { writeContractAsync } = useWriteContract();

	const tokenizeProperty = async (
		propertyId: string,
		metadataURI: string,
		price: string,
	) => {
		setLoading(true);
		setError(null);

		try {
			const hash = await writeContractAsync({
				address: contractAddress,
				abi: StrataDeedNFTABI,
				functionName: "mintPropertyDeed",
				args: [propertyId, metadataURI],
				value: parseEther(price),
			});

			return { hash, success: true };
		} catch (err: any) {
			setError(err.message || "Failed to tokenize property");
			return { hash: null, success: false };
		} finally {
			setLoading(false);
		}
	};

	const transferDeed = async (to: string, tokenId: bigint) => {
		setLoading(true);
		setError(null);

		try {
			const hash = await writeContractAsync({
				address: contractAddress,
				abi: StrataDeedNFTABI,
				functionName: "safeTransferFrom",
				args: [address!, to, tokenId],
			});

			return { hash, success: true };
		} catch (err: any) {
			setError(err.message || "Failed to transfer deed");
			return { hash: null, success: false };
		} finally {
			setLoading(false);
		}
	};

	return {
		tokenizeProperty,
		transferDeed,
		tokenCounter,
		userTokens,
		loading,
		error,
	};
}
