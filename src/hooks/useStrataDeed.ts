/** @format */

"use client";

import { STRATA_DEED_ABI, STRATA_DEED_BYTECODE } from "@/config/contracts";
import { useState } from "react";

/**
 * Hook for interacting with the core StrataDeed Smart Contract.
 * Handles deployment and interaction with existing contracts (Escrow, Compliance).
 */
export function useStrataDeed() {
	// Wagmi/Ethereum-specific contract helpers removed — provide stubs for Sui mode
	const deployContractAsync = async () => {
		throw new Error(
			"Ethereum contract deployment is not available in Sui-only mode.",
		);
	};
	const writeContractAsync = async () => {
		throw new Error(
			"Ethereum contract write is not available in Sui-only mode.",
		);
	};

	// State for tracking deployment status
	const [isDeploying, setIsDeploying] = useState(false);

	/**
	 * Deploys and initializes a new StrataDeedRWA contract instance.
	 * @param {string} fundingCap - The funding cap in USD (calculated as ETH for the contract).
	 * @param {string} ownerAddress - The address that will own the contract.
	 * @param {address[]} additionalAdmins - Optional list of admins for the multisig.
	 * @returns {Promise<`0x${string}`>} The transaction hash of the deployment.
	 */
	const deployStrataDeed = async (
		fundingCap: string,
		ownerAddress: string,
		additionalAdmins: string[] = [],
	) => {
		setIsDeploying(true);
		try {
			console.log("Deploying StrataDeedRWA...", { fundingCap, ownerAddress });

			// StrataDeedRWA is UUPS Upgradeable and uses an initialize function.
			// For the demo, we ensure at least 3 admins (Owner + 2 placeholders if empty)
			const adminList = [...additionalAdmins];
			if (adminList.indexOf(ownerAddress) === -1) adminList.push(ownerAddress);

			// Add placeholders if we don't meet the MULTISIG_THRESHOLD (3)
			if (adminList.length < 3) {
				adminList.push("0x0000000000000000000000000000000000000001");
				if (adminList.length < 3)
					adminList.push("0x0000000000000000000000000000000000000002");
			}

			// For Sui-only mode we return a mock hash to keep UI flows functional.
			console.log("Simulating StrataDeedRWA deployment (Sui mode)", {
				fundingCap,
				ownerAddress,
				adminList,
			});
			await new Promise((r) => setTimeout(r, 800));
			const mockHash = `0xmockdeploy${Date.now().toString(16)}`;
			return mockHash;
		} catch (error) {
			console.error("Deployment failed:", error);
			throw error;
		} finally {
			setIsDeploying(false);
		}
	};

	/**
	 * Helper to get contract actions for a specific deployed address.
	 * @param {`0x${string}`} contractAddress - The address of the StrataDeed contract.
	 */
	const useStrataContract = (contractAddress: `0x${string}`) => {
		/**
		 * Deposits ETH into the escrow.
		 * @param {string} amount - Amount in ETH to deposit.
		 */
		const depositEscrow = async (amount: string) => {
			// Not available for Sui mode — act as a no-op/mock
			console.log("depositEscrow (mock)", { contractAddress, amount });
			return { status: "mocked", amount };
		};

		return { depositEscrow };
	};

	return {
		deployStrataDeed,
		useStrataContract,
		isDeploying,
	};
}
