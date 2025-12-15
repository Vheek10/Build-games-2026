# Deployment Instructions

1. **Install Dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Configure Environment**:
   Create a `.env` or check your existing `.env.local` file.
   Add the following variables:
   ```bash
   PRIVATE_KEY=your_wallet_private_key_without_0x
   # Optional
   USDC_ADDRESS=0x...existing_usdc_on_mantle...
   ```

3. **Deploy to Mantle Testnet**:
   ```bash
   npm run deploy:mantle
   ```
   This will:
   - Deploy a MockUSDC (if address not provided).
   - Deploy StrataDeedRWA.
   - Register the deployer as a compliant user (for testing).

4. **Run Tests**:
   ```bash
   npm run test:contracts
   ```
