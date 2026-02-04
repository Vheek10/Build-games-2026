#!/bin/bash

# Sui Move Contract Deployment Script
# This script compiles and publishes the StrataDeed Move modules to Sui network

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}StrataDeed Move Contract Deployment${NC}"
echo "====================================="

# Check if Sui CLI is installed
if ! command -v sui &> /dev/null; then
    echo -e "${RED}Error: Sui CLI is not installed${NC}"
    echo "Install it with: curl -fsSL https://sui-releases.s3-us-west-2.amazonaws.com/latest/sui-macos-latest-install.sh | bash"
    exit 1
fi

# Navigate to Move package directory
cd move/stratadeed

# Check for Move.toml
if [ ! -f "Move.toml" ]; then
    echo -e "${RED}Error: Move.toml not found${NC}"
    exit 1
fi

# Compile the Move modules
echo -e "${YELLOW}Compiling Move modules...${NC}"
if sui move build; then
    echo -e "${GREEN}✓ Compilation successful${NC}"
else
    echo -e "${RED}✗ Compilation failed${NC}"
    exit 1
fi

# Run tests (optional but recommended)
echo -e "${YELLOW}Running Move unit tests...${NC}"
if sui move test; then
    echo -e "${GREEN}✓ Tests passed${NC}"
else
    echo -e "${YELLOW}⚠ Tests failed (continuing with deployment)${NC}"
fi

# Get network from environment or default to testnet
NETWORK=${1:-testnet}
echo -e "${YELLOW}Publishing to ${NETWORK}...${NC}"

# Publish to network
if sui move publish --network ${NETWORK}; then
    echo -e "${GREEN}✓ Deployment successful${NC}"
    echo ""
    echo -e "${YELLOW}Next steps:${NC}"
    echo "1. Copy the Package ID from above output"
    echo "2. Update the package ID in src/config/contracts.ts"
    echo "3. Test the contract interaction on-chain"
else
    echo -e "${RED}✗ Deployment failed${NC}"
    exit 1
fi

cd - > /dev/null
