/** @format */

"use client";

import { useState } from "react";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import {
	STRATA_DEED_CORE_ABI,
	STRATA_DEED_CORE_ADDRESS,
	FRACTIONAL_DEED_TOKEN_ABI,
} from "@/config/contracts";

/**
 * Hook for interacting with StrataDeed Solidity contracts on Avalanche C-Chain.
 */
export function useStrataDeed() {
	const { address } = useAccount();
	const [isDeploying, setIsDeploying] = useState(false);

	const { writeContract, data: txHash, isPending } = useWriteContract();

	/**
	 * Creates a property and mints the deed NFT via StrataDeedCore
	 * Calls: StrataDeedCore.createProperty(...)
	 */
	const deployStrataDeed = async (
		propertyId: string,
		metadataURI: string,
		privateCommitment: string,
		ownerAddress: string,
	) => {
		setIsDeploying(true);
		try {
			if (!address) throw new Error("Wallet not connected");
			if (!STRATA_DEED_CORE_ADDRESS) {
				throw new Error("StrataDeedCore contract address not configured");
			}

			const commitmentBytes = `0x${Array.from(
				new TextEncoder().encode(privateCommitment),
			)
				.map((b) => b.toString(16).padStart(2, "0"))
				.join("")}` as `0x${string}`;

			writeContract({
				address: STRATA_DEED_CORE_ADDRESS,
				abi: STRATA_DEED_CORE_ABI,
				functionName: "createProperty",
				args: [
					propertyId,
					metadataURI,
					commitmentBytes,
					ownerAddress as `0x${string}`,
				],
			});

			return txHash;
		} catch (error) {
			throw error;
		} finally {
			setIsDeploying(false);
		}
	};

	/**
	 * Fractionalizes a property deed into ERC-20 tokens
	 * Calls: StrataDeedCore.fractionalizeProperty(...)
	 */
	const fractionalizeProperty = async (
		deedTokenId: bigint,
		tokenName: string,
		tokenSymbol: string,
		totalShares: bigint,
		fundingCap: bigint,
	) => {
		if (!address) throw new Error("Wallet not connected");
		if (!STRATA_DEED_CORE_ADDRESS) {
			throw new Error("StrataDeedCore contract address not configured");
		}

		writeContract({
			address: STRATA_DEED_CORE_ADDRESS,
			abi: STRATA_DEED_CORE_ABI,
			functionName: "fractionalizeProperty",
			args: [deedTokenId, tokenName, tokenSymbol, totalShares, fundingCap],
		});

		return txHash;
	};

	/**
	 * Deposits AVAX into the escrow of a FractionalDeedToken
	 */
	const depositEscrow = async (
		fractionalTokenAddress: `0x${string}`,
		amount: bigint,
	) => {
		if (!address) throw new Error("Wallet not connected");

		writeContract({
			address: fractionalTokenAddress,
			abi: FRACTIONAL_DEED_TOKEN_ABI,
			functionName: "depositEscrow",
			value: amount,
		});

		return txHash;
	};

	return {
		deployStrataDeed,
		fractionalizeProperty,
		depositEscrow,
		isDeploying: isDeploying || isPending,
		txHash,
	};
}
