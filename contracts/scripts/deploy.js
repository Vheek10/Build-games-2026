/** @format */

// SPDX-License-Identifier: MIT
//
// StrataDeed — Hardhat Deployment Script for Avalanche C-Chain
//
// Usage:
//   npx hardhat run scripts/deploy.js --network fuji
//   npx hardhat run scripts/deploy.js --network avalanche

const hre = require("hardhat");

async function main() {
	const [deployer] = await hre.ethers.getSigners();
	console.log("Deploying StrataDeed contracts with account:", deployer.address);
	console.log(
		"Account balance:",
		hre.ethers.formatEther(
			await hre.ethers.provider.getBalance(deployer.address),
		),
		"AVAX",
	);

	// =========================================================================
	// 1. Deploy ZKComplianceVerifier
	// =========================================================================
	console.log("\n1/4 — Deploying ZKComplianceVerifier...");
	const ZKComplianceVerifier = await hre.ethers.getContractFactory(
		"ZKComplianceVerifier",
	);
	const complianceVerifier = await ZKComplianceVerifier.deploy(
		deployer.address,
	);
	await complianceVerifier.waitForDeployment();
	const complianceAddress = await complianceVerifier.getAddress();
	console.log("   ZKComplianceVerifier deployed to:", complianceAddress);

	// =========================================================================
	// 2. Deploy StrataDeedNFT
	// =========================================================================
	console.log("\n2/4 — Deploying StrataDeedNFT...");
	const StrataDeedNFT = await hre.ethers.getContractFactory("StrataDeedNFT");
	const deedNFT = await StrataDeedNFT.deploy(deployer.address);
	await deedNFT.waitForDeployment();
	const deedNFTAddress = await deedNFT.getAddress();
	console.log("   StrataDeedNFT deployed to:", deedNFTAddress);

	// =========================================================================
	// 3. Deploy StrataDeedCore (orchestrator)
	// =========================================================================
	console.log("\n3/4 — Deploying StrataDeedCore...");
	const StrataDeedCore = await hre.ethers.getContractFactory("StrataDeedCore");
	const core = await StrataDeedCore.deploy(
		deployer.address,
		deedNFTAddress,
		complianceAddress,
	);
	await core.waitForDeployment();
	const coreAddress = await core.getAddress();
	console.log("   StrataDeedCore deployed to:", coreAddress);

	// =========================================================================
	// 4. Grant MINTER_ROLE on StrataDeedNFT to StrataDeedCore
	// =========================================================================
	console.log(
		"\n4/4 — Granting MINTER_ROLE on StrataDeedNFT to StrataDeedCore...",
	);
	const MINTER_ROLE = await deedNFT.MINTER_ROLE();
	const tx = await deedNFT.grantRole(MINTER_ROLE, coreAddress);
	await tx.wait();
	console.log("   MINTER_ROLE granted to StrataDeedCore.");

	// =========================================================================
	// Summary
	// =========================================================================
	console.log("\n========================================");
	console.log("  StrataDeed — Deployment Complete");
	console.log("========================================");
	console.log("  ZKComplianceVerifier:", complianceAddress);
	console.log("  StrataDeedNFT:      ", deedNFTAddress);
	console.log("  StrataDeedCore:     ", coreAddress);
	console.log("========================================");
	console.log("\nAdd these to your .env:");
	console.log(`COMPLIANCE_VERIFIER_ADDRESS=${complianceAddress}`);
	console.log(`DEED_NFT_ADDRESS=${deedNFTAddress}`);
	console.log(`STRATA_DEED_CORE_ADDRESS=${coreAddress}`);
	console.log(
		"\nNote: FractionalDeedToken contracts are deployed per-property",
	);
	console.log("      via StrataDeedCore.fractionalizeProperty().");
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
