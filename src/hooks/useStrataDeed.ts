"use client";

import { useDeployContract, useWriteContract } from "wagmi";
import { parseEther } from "viem";
import { STRATA_DEED_ABI, STRATA_DEED_BYTECODE } from "@/config/contracts";
import { useState } from "react";

/**
 * Hook for interacting with the core StrataDeed Smart Contract.
 * Handles deployment and interaction with existing contracts (Escrow, Compliance).
 */
export function useStrataDeed() {
    const { deployContractAsync } = useDeployContract();
    const { writeContractAsync } = useWriteContract();
    
    // State for tracking deployment status
    const [isDeploying, setIsDeploying] = useState(false);
    
    /**
     * Deploys a new StrataDeedRWA contract instance.
     * @param {string} fundingCap - The funding cap in ETH (as a string, e.g., "1.5").
     * @param {string} ownerAddress - The address that will own the contract.
     * @returns {Promise<`0x${string}`>} The transaction hash of the deployment.
     */
    const deployStrataDeed = async (fundingCap: string, ownerAddress: string) => {
        setIsDeploying(true);
        try {
            console.log("Deploying StrataDeedRWA...", { fundingCap, ownerAddress });
            
            const hash = await deployContractAsync({
                abi: STRATA_DEED_ABI,
                bytecode: STRATA_DEED_BYTECODE,
                args: [parseEther(fundingCap), ownerAddress],
            });

            console.log("Deployment transaction hash:", hash);
            return hash;
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
             return writeContractAsync({
                address: contractAddress,
                abi: STRATA_DEED_ABI,
                functionName: "depositEscrow",
                value: parseEther(amount),
            });
        };

        return { depositEscrow };
    };

    return {
        deployStrataDeed,
        useStrataContract,
        isDeploying,
    };
}
