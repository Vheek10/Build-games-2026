// hooks/useTokenization.ts - Fixed version
"use client";

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEventLogs } from 'viem';

// Your contract ABI - Make sure this matches your actual contract
const TOKENIZATION_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "propertyId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "metadataURI",
        "type": "string"
      }
    ],
    "name": "PropertyTokenized",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "propertyId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "metadataURI",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "mintFee",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "privateCommitment",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "tokenizeProperty",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  }
] as const;

// Replace with your actual contract address
const TOKENIZATION_CONTRACT_ADDRESS = '0x4C7e8Cd47EE5782c948Ee65F0D93F4D4e27EF93C'; // Your contract address

export function useTokenization() {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();

  const { 
    writeContractAsync,
    isPending: isWriting,
    error: writeError 
  } = useWriteContract();

  const { 
    data: receipt,
    isLoading: isWaiting,
    error: waitError
  } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const tokenizeProperty = async (
    propertyId: string,
    metadataURI: string,
    mintFee: string,
    privateCommitment: `0x${string}`,
    owner: `0x${string}`
  ) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Starting tokenization with params:', {
        propertyId,
        metadataURI: metadataURI.substring(0, 50) + '...',
        mintFee,
        privateCommitment,
        owner
      });

      // Convert mintFee to Wei (if needed)
      const feeWei = BigInt(mintFee) || 0n;

      // Call the contract
      const hash = await writeContractAsync({
        address: TOKENIZATION_CONTRACT_ADDRESS,
        abi: TOKENIZATION_ABI,
        functionName: 'tokenizeProperty',
        args: [propertyId, metadataURI, feeWei, privateCommitment, owner],
        value: feeWei,
      });

      console.log('Transaction submitted:', hash);
      setTxHash(hash);

      // Wait for transaction receipt
      if (hash) {
        // The receipt will be fetched by useWaitForTransactionReceipt hook
        return {
          success: true,
          hash,
          message: 'Transaction submitted successfully',
        };
      }

      throw new Error('Transaction failed to submit');

    } catch (err: any) {
      console.error('Tokenization error:', err);
      
      let errorMessage = 'Failed to tokenize property';
      
      if (err.message?.includes('User rejected')) {
        errorMessage = 'Transaction rejected by user';
      } else if (err.message?.includes('insufficient funds')) {
        errorMessage = 'Insufficient funds for transaction';
      } else if (err.message?.includes('network changed')) {
        errorMessage = 'Please check your network connection';
      } else if (err.message) {
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

  // Parse events from receipt
  const getTokenizedEvent = () => {
    if (!receipt) return null;

    try {
      const logs = parseEventLogs({
        abi: TOKENIZATION_ABI,
        logs: receipt.logs,
        eventName: 'PropertyTokenized',
      });

      if (logs.length > 0) {
        return logs[0];
      }
    } catch (err) {
      console.error('Error parsing event logs:', err);
    }

    return null;
  };

  // Check if transaction was successful
  const isSuccess = receipt?.status === 'success';
  const eventData = getTokenizedEvent();

  return {
    tokenizeProperty,
    loading: loading || isWriting || isWaiting,
    error: error || writeError?.message || waitError?.message,
    txHash,
    receipt,
    isSuccess,
    eventData,
  };
}