<!-- @format -->

# Migration from Solidity/Hardhat/Foundry to Move/Sui

## Summary of Changes

This document outlines all the changes made to migrate StrataDeed from an Ethereum-based (Solidity/Hardhat/Foundry) architecture to a Sui blockchain with Move smart contracts.

## Files Removed

1. **hardhat.config.js** - Hardhat configuration (replaced with Move.toml)
2. **foundry.toml** - Foundry configuration (replaced with Move.toml)
3. **remappings.txt** - Solidity remappings (not needed for Move)
4. **contracts/StrataDeedNFT.sol** - Solidity contracts (replaced with Move modules)
5. **contracts/StrataDeedRWA.sol** - Solidity contracts (replaced with Move modules)
6. **test/StrataDeed.t.sol** - Foundry tests (Move tests use different structure)
7. **test/StrataDeedRWA.test.mjs** - Hardhat tests (replaced with Move tests)
8. **script/Deploy.s.sol** - Foundry deployment script (replaced with deploy-move.sh)
9. **scripts/deploy.js** - Hardhat deployment script (replaced with deploy-move.sh)
10. **scripts/check-balance.js** - Hardhat utility script (not needed)

## Files Created

1. **move/stratadeed/Move.toml** - Move package manifest
2. **move/stratadeed/sources/property.move** - Core property tokenization module
3. **MOVE_DEV_GUIDE.md** - Comprehensive guide for Move development
4. **deploy-move.sh** - Bash script for deploying to Sui network
5. **MIGRATION_NOTES.md** - This file

## Files Modified

### package.json

- **Removed scripts**: `deploy:mantle`, `test:contracts`, `compile`, `test`
- **Updated build script**: Removed `hardhat compile` from build command
- **Updated dependencies**: Removed Hardhat and Foundry related packages
- **Added**: `@mysten/sui.js` for Sui blockchain interaction

### .gitignore

- **Removed**: Foundry-specific patterns (broadcast/, cache_forge/, out/)
- **Added**: Move/Sui patterns (build/, dependencies/, .move/)

### README.md

- **Updated title**: Changed from "Mantle Network" to "Sui Network"
- **Removed badges**: Hardhat and Foundry badges replaced with Move/Sui
- **Updated tech stack**: Replaced Solidity with Move, Wagmi with Sui.js
- **Updated references**: All Mantle-specific documentation replaced with Sui

## Technology Mapping

| Old (Ethereum) | New (Sui)                           |
| -------------- | ----------------------------------- |
| Hardhat        | Sui CLI                             |
| Foundry        | Sui CLI                             |
| Solidity       | Move                                |
| Wagmi          | Sui.js                              |
| RainbowKit     | Suiet Wallet Kit (already in place) |
| EVM Mainnet    | Sui Mainnet                         |
| Mantle Sepolia | Sui Testnet                         |

## Move Module Structure

The property tokenization functionality has been refactored into a Move module with the following key structures:

```move
// Property struct - represents a tokenized real estate asset
public struct Property has key, store {
    id: UID,
    title: String,
    location: String,
    valuation: u64,
    total_tokens: u64,
    tokens_available: u64,
    owner: address,
}

// PropertyToken struct - represents fractional ownership
public struct PropertyToken has key, store {
    id: UID,
    property_id: address,
    tokens: u64,
    owner: address,
}
```

## Development Workflow

### Build

```bash
cd move/stratadeed
sui move build
```

### Test

```bash
sui move test
```

### Deploy

```bash
./deploy-move.sh testnet
# or
./deploy-move.sh mainnet
```

## Environment Configuration

Instead of network switching in Hardhat, use Sui CLI:

```bash
# Switch to testnet
sui client switch --env testnet

# Switch to mainnet
sui client switch --env mainnet

# Check active environment
sui client active-address
```

## Next Steps

1. **Install Sui CLI**:

   ```bash
   curl -fsSL https://sui-releases.s3-us-west-2.amazonaws.com/latest/sui-macos-latest-install.sh | bash
   ```

2. **Build the Move modules**:

   ```bash
   cd move/stratadeed
   sui move build
   ```

3. **Run tests**:

   ```bash
   sui move test
   ```

4. **Deploy to testnet**:

   ```bash
   ./deploy-move.sh testnet
   ```

5. **Update frontend configuration** with the published package ID

6. **Remove old Ethereum-related code** from frontend (already done in previous PR):
   - Wagmi hooks → Sui wallet hooks
   - RainbowKit → Suiet Wallet Kit
   - Contract ABIs → Move module references

## Frontend Integration

The frontend already uses Sui wallet integration via `@suiet/wallet-kit` and `@mysten/sui`. To interact with Move modules:

```typescript
import { JsonRpcProvider } from "@mysten/sui.js";

const provider = new JsonRpcProvider();

// Query property object
const property = await provider.getObject({
	id: propertyObjectId,
	options: { showContent: true },
});
```

## Removing Blockchain-Specific Code

The following have already been removed from the frontend in a previous update:

- Wagmi dependency and hooks
- RainbowKit integration
- Hardhat/Foundry contract ABIs
- Ethereum network configuration
- EVM-based wallet connections

The frontend now exclusively uses:

- Sui.js SDK
- Suiet Wallet Kit
- Move module references

## Build Verification

Before committing:

```bash
# Verify Next.js build (frontend only now)
pnpm run build

# Verify Move compilation
cd move/stratadeed && sui move build
```

## Git Status

Expected changes:

- ✅ Removed: `hardhat.config.js`, `foundry.toml`, `contracts/`, `script/`
- ✅ Modified: `package.json`, `README.md`, `.gitignore`
- ✅ Added: `move/` directory structure with Move.toml and .move files
- ✅ Added: `MOVE_DEV_GUIDE.md`, `deploy-move.sh`, `MIGRATION_NOTES.md`

Old files in `scripts/` that depend on Hardhat can be archived or removed.

## Support & Resources

- [Sui Documentation](https://docs.sui.io)
- [Move Language Guide](https://move-language.github.io/)
- [Sui CLI Reference](https://docs.sui.io/build/cli)
- [Sui.js API Reference](https://sdk.mysten.labs/typescript)
