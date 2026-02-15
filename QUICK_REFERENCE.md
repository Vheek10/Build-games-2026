<!-- @format -->

# 🚀 StrataDeed Quick Reference

Quick commands and useful information for developers.

## 📦 Installation & Setup

```bash
# Clone repository
git clone https://github.com/yourusername/stratadeed.git
cd stratadeed

# Install dependencies
pnpm install

# Copy environment template
cp .env.local.example .env.local

# Start development server
pnpm dev
```

## 🛠️ Available Scripts

```bash
# Development
pnpm dev              # Start dev server (http://localhost:3000)
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint

# Smart Contracts
cd move/stratadeed
sui move build        # Build Move contracts
sui move test         # Run Move tests
sui client publish    # Deploy to Sui network
```

## 🔗 Sui CLI Commands

```bash
# Setup Sui CLI
sui client envs                    # List available networks
sui client switch --env testnet    # Switch to testnet
sui client active-address          # Show current wallet address

# Get testnet tokens
sui client faucet                  # Request testnet SUI
sui client gas                     # Check gas objects

# Deploy contracts
sui client publish --gas-budget 100000000

# Query objects
sui client object <OBJECT_ID>      # View object details
sui client objects                 # List all owned objects
```

## 📝 Environment Variables

| Variable                              | Description                 | Example                        |
| ------------------------------------- | --------------------------- | ------------------------------ |
| `NEXT_PUBLIC_SUI_NETWORK`             | Sui network to connect to   | `testnet`, `devnet`, `mainnet` |
| `NEXT_PUBLIC_PROPERTY_NFT_PACKAGE_ID` | Property NFT package ID     | `0x1234...`                    |
| `NEXT_PUBLIC_PROPERTY_RWA_PACKAGE_ID` | Property RWA package ID     | `0x5678...`                    |
| `NEXT_PUBLIC_SUI_GAS_BUDGET`          | Gas budget for transactions | `50000000` (0.05 SUI)          |

## 🏗️ Project Structure

```
stratadeed/
├── src/                          # Frontend source code
│   ├── app/                      # Next.js app router pages
│   │   ├── page.tsx             # Homepage
│   │   ├── mint/                # Property minting page
│   │   ├── marketplace/         # Property marketplace
│   │   └── dashboard/           # User dashboard
│   ├── components/              # React components
│   ├── hooks/                   # Custom React hooks
│   │   ├── useTokenization.ts  # Property NFT minting
│   │   └── useStrataDeed.ts    # RWA treasury creation
│   ├── lib/                     # Utility libraries
│   │   └── sui/                # Sui blockchain utilities
│   │       ├── tokenization.ts # Transaction builders
│   │       └── client.ts       # Sui client factory
│   ├── config/                  # Configuration files
│   │   ├── contracts.ts        # Smart contract addresses
│   │   └── web3/               # Web3 configuration
│   └── providers/               # React context providers
├── move/                         # Move smart contracts
│   └── stratadeed/
│       ├── Move.toml            # Move package manifest
│       └── sources/             # Move source files
│           ├── property.move    # Property creation (145 lines)
│           ├── property_nft.move # Property deed NFTs (198 lines)
│           └── property_rwa.move # RWA tokens (370 lines)
├── public/                       # Static assets
├── .env.local.example           # Environment template
├── package.json                 # Node dependencies
├── tailwind.config.ts           # Tailwind CSS config
└── tsconfig.json                # TypeScript config
```

## 🎯 Key Files to Know

### Frontend

- **[src/app/mint/page.tsx](src/app/mint/page.tsx)** - Property minting form (1400+ lines)
- **[src/lib/sui/tokenization.ts](src/lib/sui/tokenization.ts)** - Sui transaction builders
- **[src/hooks/useTokenization.ts](src/hooks/useTokenization.ts)** - Minting hook
- **[src/config/contracts.ts](src/config/contracts.ts)** - Contract configuration

### Smart Contracts

- **[move/stratadeed/sources/property.move](move/stratadeed/sources/property.move)** - Core property tokenization
- **[move/stratadeed/sources/property_nft.move](move/stratadeed/sources/property_nft.move)** - NFT deed implementation
- **[move/stratadeed/sources/property_rwa.move](move/stratadeed/sources/property_rwa.move)** - RWA token & treasury

## 🔐 Smart Contract Functions

### Property NFT Module

```typescript
// Mint a property deed NFT
property_nft::mint_property_deed(
  property_id: string,      // e.g., "PROP-1234567890-abc123..."
  metadata_uri: string,     // Base64 or IPFS URI
  private_commitment: u8[], // ZK commitment hash
  to: address              // Recipient address
)
```

### Property RWA Module

```typescript
// Mint RWA tokens (fractional ownership)
property_rwa::mint_rwa_token(
  property_id: string,  // Same as NFT property_id
  tokens: number,       // Amount of tokens to mint
  to: address          // Recipient address
)

// Create RWA treasury
property_rwa::create_treasury(
  funding_cap: number  // Maximum funding amount in SUI
)
```

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module '@mysten/sui'"

**Solution:**

```bash
pnpm install @mysten/sui@latest
```

### Issue: "Wallet not connected"

**Solution:**

1. Install [Suiet Wallet](https://chrome.google.com/webstore/detail/suiet-sui-wallet/khpkpbbcccdmmclmpigdgddabeilkdpd)
2. Create/import wallet
3. Switch to testnet in wallet settings
4. Refresh page and click "Connect Wallet"

### Issue: "Package ID not configured"

**Solution:**

1. Deploy contracts to Sui: `sui client publish --gas-budget 100000000`
2. Copy package IDs from deployment output
3. Update `.env.local` with package IDs
4. Restart dev server: `pnpm dev`

### Issue: "Insufficient gas"

**Solution:**

```bash
# Request testnet SUI tokens
sui client faucet

# Check balance
sui client gas
```

### Issue: Move compilation errors about "public struct"

**Solution:** The Move contracts use legacy edition syntax. This is a TypeScript language server warning only - the contracts compile and deploy successfully. You can safely ignore these warnings or update Move.toml to use edition = "2024" and remove `public` keywords from structs.

## 📚 Useful Links

- **Sui Documentation**: https://docs.sui.io/
- **Move Language Book**: https://move-language.github.io/move/
- **Sui TypeScript SDK**: https://sdk.mystenlabs.com/typescript
- **Suiet Wallet Docs**: https://suiet.app/docs
- **Sui Explorer (Testnet)**: https://suiscan.xyz/testnet
- **Sui Discord**: https://discord.gg/sui

## 🎓 Learning Resources

### Sui Development

- [Sui Move by Example](https://examples.sui.io/)
- [Sui Move Tutorial](https://docs.sui.io/guides/developer/first-app)
- [Programmable Transaction Blocks](https://docs.sui.io/concepts/transactions/prog-txn-blocks)

### Next.js

- [Next.js Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 💡 Tips & Best Practices

### Smart Contract Development

- Always test on devnet/testnet before mainnet
- Use `sui move test` to run unit tests
- Keep gas budgets reasonable (0.05-0.1 SUI)
- Validate all inputs in Move functions
- Use capability-based access control

### Frontend Development

- Always check wallet connection before transactions
- Validate user inputs before submitting
- Show loading states during transactions
- Handle transaction errors gracefully
- Use TypeScript strict mode

### Security

- Never commit private keys or mnemonics
- Store admin capabilities securely
- Validate all on-chain data
- Use ZK commitments for sensitive data
- Regular security audits

## 🚀 Deployment Checklist

### Pre-deployment

- [ ] All tests passing
- [ ] Security audit completed
- [ ] Environment variables configured
- [ ] Smart contracts built successfully
- [ ] Frontend builds without errors

### Testnet Deployment

- [ ] Deploy contracts to Sui testnet
- [ ] Update `.env.local` with package IDs
- [ ] Test all user flows end-to-end
- [ ] Verify transactions on Sui Explorer
- [ ] Get community feedback

### Mainnet Deployment

- [ ] Legal compliance review
- [ ] Insurance coverage confirmed
- [ ] Backup strategies in place
- [ ] Monitoring and alerts configured
- [ ] Deploy contracts to Sui mainnet
- [ ] Update production environment variables
- [ ] Announce launch

## 🆘 Getting Help

- **Documentation**: Check [README.md](./README.md) and [MIGRATION_NOTES.md](./MIGRATION_NOTES.md)
- **Security Fixes**: See [SMART_CONTRACT_FIXES_SUMMARY.md](./SMART_CONTRACT_FIXES_SUMMARY.md)
- **Issues**: Open an issue on GitHub
- **Email**: support@stratadeed.com

---

**Last Updated**: February 15, 2026
