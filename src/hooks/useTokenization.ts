/** @format */

"use client";

import { useState, useEffect } from "react";
import { parseEther } from "viem";
import { 
    useAccount, 
    useWriteContract, 
    useReadContract, 
    useChainId,
    usePublicClient,
    useWaitForTransactionReceipt 
} from "wagmi";
import { StrataDeedNFTABI } from "@/contracts/abis/StrataDeedNFT";
import { STRATA_DEED_NFT_ADDRESS } from "@/contracts/addresses";

/**
 * Hook for managing Property NFT Tokenization.
 * Handles minting and transferring of Property Deeds (NFTs).
 */
export function useTokenization() { // Fixed typo in function name
    const { address } = useAccount();
    const chainId = useChainId();
    const publicClient = usePublicClient();
    
    // Determine the correct contract address based on chainId, defaulting to Mantle Sepolia (5003)
    const currentChainId = chainId && STRATA_DEED_NFT_ADDRESS[chainId] ? chainId : 5003; 
    const contractAddress = STRATA_DEED_NFT_ADDRESS[currentChainId] as `0x${string}`;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [txHash, setTxHash] = useState<`0x${string}` | null>(null);

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
        address: contractAddress as `0x${string}`,
        abi: StrataDeedNFTABI,
        functionName: "balanceOf",
        args: address ? [address] : undefined,
        query: {
            enabled: !!address && !!contractAddress && contractAddress !== "0x0000000000000000000000000000000000000000",
        },
    });

    // =========================================
    // WRITE Operations
    // =========================================
    
    const { writeContractAsync } = useWriteContract();

    // Wait for transaction receipt when txHash is set
    const { data: receipt, isLoading: isWaiting } = useWaitForTransactionReceipt({
        hash: txHash as `0x${string}`,
    });

    // Parse the PropertyTokenized event from transaction receipt
    useEffect(() => {
        const parseEventFromReceipt = async () => {
            if (!receipt || !publicClient) return;

            try {
                // Parse logs from the transaction receipt
                const logs = receipt.logs;
                
                // Find the PropertyTokenized event log
                const eventLog = logs.find(log => 
                    log.address.toLowerCase() === contractAddress.toLowerCase()
                );

                if (!eventLog) {
                    setError("PropertyTokenized event not found in transaction logs");
                    return;
                }

                // Parse the event data using the contract ABI
                // IMPORTANT: Make sure your StrataDeedNFTABI includes the event definition
                const decodedEvent = publicClient.decodeEventLog({
                    abi: StrataDeedNFTABI,
                    data: eventLog.data,
                    topics: eventLog.topics,
                });

                // Handle the decoded event
                if (decodedEvent && decodedEvent.eventName === "PropertyTokenized") {
                    console.log("PropertyTokenized event parsed:", decodedEvent.args);
                    // Here you can access the event arguments:
                    // decodedEvent.args.owner, decodedEvent.args.tokenId, 
                    // decodedEvent.args.propertyId, decodedEvent.args.metadataURI
                }

            } catch (err: any) {
                console.error("Failed to parse event from receipt:", err);
                // Check if the transaction reverted
                if (receipt.status === "reverted") {
                    setError("Transaction reverted. Check contract requirements or gas limits.");
                } else {
                    setError(err.message || "Failed to parse transaction event");
                }
            }
        };

        parseEventFromReceipt();
    }, [receipt, publicClient, contractAddress]);

    /**
     * Mints a new Property Deed NFT.
     * @param {string} propertyId - The unique ID of the property.
     * @param {string} metadataURI - The IPFS/Arweave URI for the metadata.
     * @param {string} mintFee - The fee to pay for minting (defaults to "0").
     * @param {`0x${string}`} privateCommitment - ZK-ready hash commitment (optional).
     */
    const tokenizeProperty = async (
        propertyId: string,
        metadataURI: string,
        mintFee: string = "0",
        privateCommitment: `0x${string}` = "0x0000000000000000000000000000000000000000000000000000000000000000",
        toAddress?: `0x${string}`
    ) => {
        setLoading(true);
        setError(null);
        setTxHash(null);

        try {
            // Validate inputs
            if (!address && !toAddress) {
                throw new Error("No recipient address provided");
            }

            if (!propertyId || !metadataURI) {
                throw new Error("Missing required parameters: propertyId and metadataURI");
            }

            console.log("Minting property with:", {
                propertyId,
                metadataURI,
                mintFee,
                toAddress: toAddress || address,
                contractAddress
            });

            const hash = await writeContractAsync({
                address: contractAddress,
                abi: StrataDeedNFTABI,
                functionName: "mintPropertyDeed",
                args: [toAddress || address!, propertyId, metadataURI, privateCommitment],
                value: parseEther(mintFee),
            });

            // Store the transaction hash for event parsing
            setTxHash(hash);

            return { 
                hash, 
                success: true,
                message: "Transaction submitted. Waiting for confirmation..."
            };
        } catch (err: any) {
            console.error("Tokenization error:", err);
            
            // Provide more specific error messages
            let errorMessage = "Failed to tokenize property";
            if (err.message?.includes("rejected")) {
                errorMessage = "Transaction was rejected by user";
            } else if (err.message?.includes("insufficient funds")) {
                errorMessage = "Insufficient funds for transaction";
            } else if (err.message?.includes("chain mismatch")) {
                errorMessage = "Wrong network. Please switch to Mantle Sepolia (5003)";
            }
            
            setError(errorMessage);
            return { 
                hash: null, 
                success: false,
                message: errorMessage
            };
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
        setTxHash(null);

        try {
            const hash = await writeContractAsync({
                address: contractAddress,
                abi: StrataDeedNFTABI,
                functionName: "safeTransferFrom",
                args: [address!, to, tokenId],
            });

            setTxHash(hash);
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
        loading: loading || isWaiting,
        error,
        txHash,
        receipt
    };
}