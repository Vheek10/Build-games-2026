// hooks/useTokenization.ts - Fix the BigInt issue
"use client";

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEventLogs } from 'viem';

// Your contract ABI - Updated to match actual StrataDeedNFT contract
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
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
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
        "internalType": "bytes32",
        "name": "privateCommitment",
        "type": "bytes32"
      }
    ],
    "name": "mintPropertyDeed",
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
      console.log('=== TOKENIZATION DEBUG START ===');
      console.log('Contract Address:', TOKENIZATION_CONTRACT_ADDRESS);
      console.log('Starting tokenization with params:', {
        to: owner,
        propertyId,
        metadataURI: metadataURI.substring(0, 100) + '...',
        metadataURILength: metadataURI.length,
        privateCommitment,
        mintFee,
      });

      // Validate inputs
      if (!propertyId || propertyId.trim().length === 0) {
        throw new Error('Property ID cannot be empty');
      }

      if (!metadataURI || metadataURI.trim().length === 0) {
        throw new Error('Metadata URI cannot be empty');
      }

      if (!owner || owner === '0x0000000000000000000000000000000000000000') {
        throw new Error('Invalid owner address');
      }

      // Convert mintFee to Wei (using BigInt constructor without literal)
      const feeWei = BigInt(mintFee) || BigInt(0);
      console.log('Fee in Wei:', feeWei.toString());

      // Call the contract with correct function name and parameter order
      console.log('Calling mintPropertyDeed...');
      const hash = await writeContractAsync({
        address: TOKENIZATION_CONTRACT_ADDRESS,
        abi: TOKENIZATION_ABI,
        functionName: 'mintPropertyDeed',
        args: [owner, propertyId, metadataURI, privateCommitment],
        value: feeWei,
      });

      console.log('Transaction submitted successfully!');
      console.log('Transaction hash:', hash);
      console.log('=== TOKENIZATION DEBUG END ===');
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
      console.error('=== TOKENIZATION ERROR ===');
      console.error('Full error:', err);
      console.error('Error message:', err.message);
      console.error('Error details:', err.details);
      console.error('Error cause:', err.cause);
      
      let errorMessage = 'Failed to tokenize property';
      
      // Enhanced error messages
      if (err.message?.includes('User rejected') || err.message?.includes('User denied')) {
        errorMessage = 'Transaction rejected by user';
      } else if (err.message?.includes('insufficient funds')) {
        errorMessage = 'Insufficient funds for transaction. Please add more MNT to your wallet.';
      } else if (err.message?.includes('network changed')) {
        errorMessage = 'Network changed. Please ensure you are on Mantle Sepolia.';
      } else if (err.message?.includes('Property already tokenized')) {
        errorMessage = 'This property ID has already been tokenized. Please use a different property ID.';
      } else if (err.message?.includes('Empty property ID')) {
        errorMessage = 'Property ID cannot be empty';
      } else if (err.message?.includes('execution reverted') || err.message?.includes('reverted')) {
        // Contract revert - provide more context
        errorMessage = 'Contract execution failed. This could be due to:\n' +
          '1. The contract may not be properly initialized\n' +
          '2. The property ID might already exist\n' +
          '3. There may be insufficient gas\n' +
          '4. The contract address might be incorrect\n\n' +
          'Please check the browser console for more details.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      console.error('Final error message:', errorMessage);
      console.error('=== ERROR DEBUG END ===');
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