/** @format */

"use client";

import { useState } from "react";
import { parseEther } from "viem";
import { useAccount, useWriteContract, useReadContract, useChainId } from "wagmi";
import { StrataDeedNFTABI } from "@/contracts/abis/StrataDeedNFT";
import { STRATA_DEED_NFT_ADDRESS } from "@/contracts/addresses";

/**
 * Hook for managing Property NFT Tokenization.
 * Handles minting and transferring of Property Deeds (NFTs).
 */
export function useTokenization() {
	const { address } = useAccount();
	const chainId = useChainId();
	
    // Determine the correct contract address based on chainId, defaulting to Mantle Sepolia (5003)
	const currentChainId = chainId && STRATA_DEED_NFT_ADDRESS[chainId] ? chainId : 5003; 
    const contractAddress = STRATA_DEED_NFT_ADDRESS[currentChainId] as `0x${string}`;

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// =========================================
	// READ Operations
	// =========================================

    // Get total number of tokens minted
	const { data: tokenCounter } = useReadContract({
		address: contractAddress,
		abi: StrataDeedNFTABI,
		functionName: "tokenCounter",
	});

    // Get tokens owned by the current user
	const { data: userTokens } = useReadContract({
		address: contractAddress,
		abi: StrataDeedNFTABI,
		functionName: "tokensOfOwner",
		args: [address!],
		query: {
			enabled: !!address,
		},
	});

	// =========================================
	// WRITE Operations
	// =========================================
    
	const { writeContractAsync } = useWriteContract();

    /**
     * Mints a new Property Deed NFT.
     * @param {string} propertyId - The unique ID of the property.
     * @param {string} metadataURI - The IPFS/Arweave URI for the metadata.
     * @param {string} price - The listing price in ETH (required value sent with transaction).
     */
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

    /**
     * Transfers a Property Deed NFT to another address.
     * @param {string} to - The recipient address.
     * @param {bigint} tokenId - The ID of the token to transfer.
     */
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
