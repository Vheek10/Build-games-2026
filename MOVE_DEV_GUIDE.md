<!-- @format -->

# Sui Move Smart Contract Development Guide

## Project Structure

```
move/
└── stratadeed/
    ├── Move.toml           # Move package manifest
    └── sources/
        └── property.move   # Property tokenization module
```

## Prerequisites

Install the Sui CLI:

```bash
curl -fsSL https://sui-releases.s3-us-west-2.amazonaws.com/latest/sui-macos-latest-install.sh | bash
# or for Linux/Windows, visit https://docs.sui.io/build/install
```

## Development Commands

### Compile Move Modules

```bash
cd move/stratadeed
sui move build
```

### Test Smart Contracts

```bash
sui move test
```

### Publish to Sui Testnet

```bash
sui move publish --network testnet
```

### Publish to Sui Mainnet

```bash
sui move publish --network mainnet
```

## Move Language Basics

### Property Module

The `property.move` module implements:

- **Property struct**: Represents a tokenized real estate asset
- **PropertyToken struct**: Ownership token with specific token count
- `create_property`: Initializes a new property on-chain
- `mint_property_token`: Mints tokens representing fractional ownership
- `get_property_info`: Retrieves property details
- `transfer_token`: Transfers tokens between addresses

### Key Concepts

**Objects (has key, store)**:

- `key`: Makes the struct a unique asset on-chain
- `store`: Allows the struct to be stored in other objects

**TxContext**: Provides sender address and transaction context

**UID**: Unique identifier for objects

## Integration with Frontend

The frontend uses `@mysten/sui.js` to interact with published contracts:

```typescript
import { JsonRpcProvider } from "@mysten/sui.js";

const provider = new JsonRpcProvider();
const property = await provider.getObject({
	id: propertyId,
	options: { showContent: true },
});
```

## Deployment

1. **Build locally**:

   ```bash
   sui move build
   ```

2. **Run unit tests**:

   ```bash
   sui move test
   ```

3. **Publish to testnet** (with testnet SUI):

   ```bash
   sui client switch --env testnet
   sui move publish --network testnet
   ```

4. **Record published package ID** in frontend config after deployment

## Environment Setup

Configure Sui CLI for different networks:

```bash
sui client switch --env devnet
sui client switch --env testnet
sui client switch --env mainnet
```

Check active environment:

```bash
sui client active-address
```

## Debugging

Enable verbose output:

```bash
sui move build --verbose
sui move test --verbose
```

View transaction effects:

```bash
sui client call <PACKAGE>::<MODULE>::<FUNCTION> <ARGS> --gas-budget 100000000
```

## References

- [Sui Move Documentation](https://docs.sui.io/build/move)
- [Move Language Guide](https://move-language.github.io/)
- [Sui Framework Docs](https://docs.sui.io/references/framework)
- [Sui CLI Reference](https://docs.sui.io/build/cli)
