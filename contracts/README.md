# StrataDeed Smart Contract Design

This directory contains the `StrataDeedRWA` smart contract, designed for the Mantle Testnet. It implements a privacy-preserving Real World Asset (RWA) token with compliance, escrow, and verifiable yield features.

## 1. Privacy-Preserving Compliance & Selective Disclosure

StrataDeed ensures regulatory compliance without exposing user's Personally Identifiable Information (PII) on-chain.

*   **Credential Hashing**: Instead of storing names or passport numbers, we store a `bytes32` hash of the user's verified credential (e.g., `SHA256(Name + ID + Salt)`). The Admin (or a ZK-Verifier in future versions) verifies the off-chain documents and registers this hash.
*   **Compliance Check**: The `isCompliant(wallet)` function checks:
    1.  Is the wallet **NOT frozen**?
    2.  Is the credential hash **registered**?
    3.  Is the credential hash **NOT revoked**?
*   **Selective Disclosure**:
    *   **Wallets**: The public only sees wallet addresses and hashes.
    *   **Regulators**: Upon request, the Admin can freeze specific wallets or revoke credentials using the `revokeCredentialHash` or `freezeWallet` functions. This allows for targeted enforcement without a backdoor that exposes everyone.

## 2. Verifiable Yield Distribution

The yield distribution mechanism is designed to be fully auditable on-chain.

*   **Dividend Algorithm**: We use a "points per share" system (similar to MasterChef).
    *   `accYieldPerShare` tracks the total cumulative yield explicitly per token.
*   **Transparency**:
    *   When the Admin deposits yield via `depositYield(amount)`, the `YieldDeposited` event is emitted with the exact amount and the new `accYieldPerShare`.
    *   Investors can verify the formula: `MyClaimableYield = (MyTokenBalance * accYieldPerShare) - MyRewardDebt`.
*   **Auditability**: Anyone can query the contract's `totalYieldDistributed` and sum up `YieldClaimed` events to verify that the math holds up and no funds are siphoned.

## 3. Escrow & Tokenization Flow

1.  **Fund**: Whitelisted investors call `depositEscrow(amount)`. USDC is locked.
2.  **Finalize**: Once the cap is reached, Admin calls `finalizeEscrow()`.
    *   USDC is sent to the Treasury.
    *   Investors can strictly call `claimTokens()` to mint their share of the Property Tokens.
3.  **Trade**: Tokens can be transferred, but ONLY between compliant wallets (`_update` hook enforces this).
4.  **Earn**: Admin deposits yield. Holders call `claimYield()`.
