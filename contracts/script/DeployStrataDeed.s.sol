// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/ZKComplianceVerifier.sol";
import "../src/StrataDeedNFT.sol";
import "../src/StrataDeedCore.sol";

/**
 * @title DeployStrataDeed
 * @notice Foundry script to deploy the full StrataDeed contract suite to Avalanche C-Chain.
 *
 * Usage (Fuji testnet):
 *   forge script script/DeployStrataDeed.s.sol:DeployStrataDeed \
 *     --rpc-url fuji \
 *     --private-key $PRIVATE_KEY \
 *     --broadcast \
 *     --verify
 *
 * Usage (Mainnet):
 *   forge script script/DeployStrataDeed.s.sol:DeployStrataDeed \
 *     --rpc-url avalanche \
 *     --private-key $PRIVATE_KEY \
 *     --broadcast \
 *     --verify
 */
contract DeployStrataDeed is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        console.log("=== StrataDeed Deployment ===");
        console.log("Deployer:", deployer);

        vm.startBroadcast(deployerPrivateKey);

        // 1. Deploy ZKComplianceVerifier
        ZKComplianceVerifier complianceVerifier = new ZKComplianceVerifier(deployer);
        console.log("1/4 ZKComplianceVerifier:", address(complianceVerifier));

        // 2. Deploy StrataDeedNFT
        StrataDeedNFT deedNFT = new StrataDeedNFT(deployer);
        console.log("2/4 StrataDeedNFT:      ", address(deedNFT));

        // 3. Deploy StrataDeedCore (orchestrator)
        StrataDeedCore core = new StrataDeedCore(
            deployer,
            address(deedNFT),
            address(complianceVerifier)
        );
        console.log("3/4 StrataDeedCore:     ", address(core));

        // 4. Grant MINTER_ROLE on StrataDeedNFT to StrataDeedCore
        bytes32 MINTER_ROLE = deedNFT.MINTER_ROLE();
        deedNFT.grantRole(MINTER_ROLE, address(core));
        console.log("4/4 MINTER_ROLE granted to StrataDeedCore");

        vm.stopBroadcast();

        // Summary
        console.log("");
        console.log("========================================");
        console.log("  StrataDeed - Deployment Complete");
        console.log("========================================");
        console.log("  ZKComplianceVerifier:", address(complianceVerifier));
        console.log("  StrataDeedNFT:      ", address(deedNFT));
        console.log("  StrataDeedCore:     ", address(core));
        console.log("========================================");
        console.log("");
        console.log("Add these to your .env:");
        console.log("NEXT_PUBLIC_ZK_COMPLIANCE_VERIFIER_ADDRESS=");
        console.log(address(complianceVerifier));
        console.log("NEXT_PUBLIC_STRATA_DEED_NFT_ADDRESS=");
        console.log(address(deedNFT));
        console.log("NEXT_PUBLIC_STRATA_DEED_CORE_ADDRESS=");
        console.log(address(core));
    }
}
