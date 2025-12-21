/** @format */

import StrataDeedArtifact from "../contracts/artifacts/contracts/StrataDeedRWA.sol/StrataDeedRWA.json";

/**
 * Centralized configuration for Smart Contracts.
 * Exports ABI, Bytecode, and deployed addresses for easy access across the app.
 */

export const STRATA_DEED_ABI = StrataDeedArtifact.abi;
export const STRATA_DEED_BYTECODE = StrataDeedArtifact.bytecode as `0x${string}`;

// Default to the most recently deployed address from env, or a zero address fallback
export const STRATA_DEED_ADDRESS = (process.env.NEXT_PUBLIC_STRATA_DEED_ADDRESS as `0x${string}`) || "0x4C7e8Cd47EE5782c948Ee65F0D93F4D4e27EF93C";
export const STRATA_DEED_RWA_ADDRESS = "0x4C7e8Cd47EE5782c948Ee65F0D93F4D4e27EF93C" as `0x${string}`;
/**
 * Convenience object for Wagmi hooks
 */
export const STRATA_DEED_CONFIG = {
  address: STRATA_DEED_ADDRESS,
  abi: STRATA_DEED_ABI,
  bytecode: STRATA_DEED_BYTECODE, // Typically needed for deployment, not interaction
} as const;
