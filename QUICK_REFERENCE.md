<!-- @format -->

# 🚀 StrataDeed Quick Reference

Quick commands and useful information for developers.

## 📦 Installation & Setup

```bash
# Clone repository
git clone https://github.com/yourusername/stratadeed.git
cd stratadeed

# Install frontend dependencies
pnpm install

# Install contract dependencies
cd contracts && pnpm install && cd ..

# Copy environment template
cp .env.local.example .env.local

# Start development server
pnpm dev
```

## 🛠️ Available Scripts

```bash
# Frontend Development
pnpm dev              # Start dev server (http://localhost:3000)
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint

# Smart Contracts (from contracts/ directory)
cd contracts
npx hardhat compile              # Compile Solidity contracts
npx hardhat test                 # Run contract tests
npx hardhat run scripts/deploy.js --network fuji       # Deploy to Fuji testnet
npx hardhat run scripts/deploy.js --network avalanche   # Deploy to mainnet
```

## 🔗 Avalanche CLI & Hardhat Commands

```bash
# Compile contracts
cd contracts
npx hardhat compile

# Run a local Hardhat node
npx hardhat node

# Deploy to local node
npx hardhat run scripts/deploy.js --network localhost

# Deploy to Avalanche Fuji Testnet
npx hardhat run scripts/deploy.js --network fuji

# Deploy to Avalanche C-Chain Mainnet
npx hardhat run scripts/deploy.js --network avalanche

# Verify contracts on Snowtrace
npx hardhat verify --network fuji <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS...>

# Open Hardhat console
npx hardhat console --network fuji
```

## 📝 Environment Variables

| Variable                                     | Description                        | Example                       |
| -------------------------------------------- | ---------------------------------- | ----------------------------- |
| `NEXT_PUBLIC_STRATA_DEED_NFT_ADDRESS`        | StrataDeedNFT contract address     | `0x1234...`                   |
| `NEXT_PUBLIC_STRATA_DEED_CORE_ADDRESS`       | StrataDeedCore contract address    | `0x5678...`                   |
| `NEXT_PUBLIC_FRACTIONAL_DEED_TOKEN_ADDRESS`  | FractionalDeedToken address        | `0x9abc...`                   |
| `NEXT_PUBLIC_ZK_COMPLIANCE_VERIFIER_ADDRESS` | ZKComplianceVerifier address       | `0xdef0...`                   |
| `PRIVATE_KEY`                                | Deployer wallet private key        | `0xabc123...` (never commit!) |
| `SNOWTRACE_API_KEY`                          | Snowtrace API key for verification | `ABC123...`                   |

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
│   │   └── useStrataDeed.ts    # StrataDeedCore interaction
│   ├── lib/                     # Utility libraries
│   ├── config/                  # Configuration files
│   │   ├── contracts.ts        # Contract addresses & ABIs
│   │   └── web3/               # Wagmi / RainbowKit config
│   └── providers/               # React context providers
├── contracts/                    # Solidity smart contracts (Hardhat)
│   ├── hardhat.config.js        # Hardhat config (Fuji & Mainnet)
│   ├── scripts/
│   │   └── deploy.js           # Deployment script
│   └── src/                     # Solidity source files
│       ├── StrataDeedCore.sol   # Orchestrator contract
│       ├── StrataDeedNFT.sol    # ERC-721 property deed NFTs
│       ├── FractionalDeedToken.sol # ERC-20 fractional ownership
│       └── ZKComplianceVerifier.sol # ZK compliance verification
├── public/                       # Static assets
├── .env.local.example           # Environment template
├── package.json                 # Node dependencies
├── tailwind.config.ts           # Tailwind CSS config
└── tsconfig.json                # TypeScript config
```

## 🎯 Key Files to Know

### Frontend

- **[src/app/mint/page.tsx](src/app/mint/page.tsx)** - Property minting form
- **[src/hooks/useStrataDeed.ts](src/hooks/useStrataDeed.ts)** - StrataDeedCore hook (wagmi)
- **[src/hooks/useTokenization.ts](src/hooks/useTokenization.ts)** - Minting hook
- **[src/config/contracts.ts](src/config/contracts.ts)** - Contract addresses & ABIs

### Smart Contracts

- **[contracts/src/StrataDeedCore.sol](contracts/src/StrataDeedCore.sol)** - Orchestrator (minting, fractionalization, compliance)
- **[contracts/src/StrataDeedNFT.sol](contracts/src/StrataDeedNFT.sol)** - ERC-721 property deed NFTs with ZK commitments
- **[contracts/src/FractionalDeedToken.sol](contracts/src/FractionalDeedToken.sol)** - ERC-20 fractional ownership tokens
- **[contracts/src/ZKComplianceVerifier.sol](contracts/src/ZKComplianceVerifier.sol)** - Merkle proof & ZK verification

## 🔐 Smart Contract Functions

### StrataDeedCore (Orchestrator)

```solidity
// Create a property and mint the deed NFT
function createProperty(
    string memory propertyId,     // e.g., "PROP-1234567890-abc123..."
    string memory metadataURI,    // IPFS or base64 URI
    bytes  memory privateCommitment, // ZK commitment hash
    address to                    // Recipient address
) external returns (uint256 tokenId);

// Fractionalize a property deed into ERC-20 shares
function fractionalizeProperty(
    uint256 deedTokenId,          // Token ID of the minted deed NFT
    string memory tokenName,      // e.g., "StrataDeed PROP-123 Shares"
    string memory tokenSymbol,    // e.g., "SD-123"
    uint256 totalShares,          // Total fractional shares to mint
    uint256 pricePerShare         // Price per share in wei (AVAX)
) external returns (address fractionalToken);
```

### StrataDeedNFT (ERC-721)

```solidity
// Mint a property deed NFT
function mintPropertyDeed(
    string memory propertyId,
    string memory metadataURI,
    bytes  memory privateCommitment,
    address to
) external returns (uint256 tokenId);

// Update ZK commitment on an existing deed
function updatePrivateCommitment(
    uint256 tokenId,
    bytes memory newCommitment
) external;
```

### FractionalDeedToken (ERC-20)

```solidity
// Purchase fractional shares (payable)
function buyShares(uint256 amount) external payable;

// Deposit yield for distribution (payable)
function depositYield() external payable;

// Claim accumulated yield
function claimYield() external;
```

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module 'wagmi'" or "'viem'"

**Solution:**

```bash
pnpm install wagmi viem @rainbow-me/rainbowkit
```

### Issue: "Wallet not connected"

**Solution:**

1. Install [MetaMask](https://metamask.io/) or [Core Wallet](https://core.app/)
2. Add Avalanche Fuji Testnet (Chain ID: 43113, RPC: `https://api.avax-test.network/ext/bc/C/rpc`)
3. Import or create a wallet
4. Refresh the page and click "Connect Wallet"

### Issue: "Contract address not configured"

**Solution:**

1. Deploy contracts: `cd contracts && npx hardhat run scripts/deploy.js --network fuji`
2. Copy deployed addresses from the console output
3. Update `.env.local` with the contract addresses
4. Restart dev server: `pnpm dev`

### Issue: "Insufficient funds" or transaction reverts

**Solution:**

```bash
# Request testnet AVAX from the Avalanche faucet
# Visit: https://faucet.avax.network/
# Paste your wallet address and request Fuji AVAX

# Or use Core faucet:
# Visit: https://core.app/tools/testnet-faucet/
```

### Issue: Hardhat compilation errors

**Solution:**

```bash
cd contracts

# Clean artifacts and recompile
npx hardhat clean
npx hardhat compile

# If OpenZeppelin imports fail
pnpm install @openzeppelin/contracts
```

## 📚 Useful Links

- **Avalanche Documentation**: https://docs.avax.network/
- **Avalanche C-Chain Explorer (Snowtrace)**: https://snowtrace.io/
- **Fuji Testnet Explorer**: https://testnet.snowtrace.io/
- **Avalanche Faucet (Fuji)**: https://faucet.avax.network/
- **Hardhat Documentation**: https://hardhat.org/docs
- **OpenZeppelin Contracts**: https://docs.openzeppelin.com/contracts/
- **Wagmi (React Hooks for EVM)**: https://wagmi.sh/
- **Viem (TypeScript EVM Client)**: https://viem.sh/

## 🎓 Learning Resources

### Next.js

- [Next.js Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 💡 Tips & Best Practices

### Smart Contract Development

- Always test on devnet/testnet before mainnet
- Use `npx hardhat test` to run unit tests
- Keep gas costs reasonable on Fuji testnet
- Validate all inputs in Solidity functions
- Use role-based access control (OpenZeppelin AccessControl)

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

- [ ] Deploy contracts to Avalanche Fuji testnet
- [ ] Update `.env.local` with contract addresses
- [ ] Test all user flows end-to-end
- [ ] Verify transactions on Snowtrace
- [ ] Get community feedback

### Mainnet Deployment

- [ ] Legal compliance review
- [ ] Insurance coverage confirmed
- [ ] Backup strategies in place
- [ ] Monitoring and alerts configured
- [ ] Deploy contracts to Avalanche mainnet
- [ ] Update production environment variables
- [ ] Announce launch

## 🆘 Getting Help

- **Documentation**: Check [README.md](./README.md) and [MIGRATION_NOTES.md](./MIGRATION_NOTES.md)
- **Security Fixes**: See [SMART_CONTRACT_FIXES_SUMMARY.md](./SMART_CONTRACT_FIXES_SUMMARY.md)
- **Issues**: Open an issue on GitHub
- **Email**: support@stratadeed.com

---

**Last Updated**: February 15, 2026
