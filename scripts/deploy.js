const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  // Optional: Check balance to ensure gas
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance));

  // 1. Deploy StrataDeedRWA (Native MNT Version)
  // Funding Cap: 5,000 MNT
  const fundingCap = hre.ethers.parseUnits("5000", 18); 
  
  const StrataDeedRWA = await hre.ethers.getContractFactory("StrataDeedRWA");
  // Constructor only takes fundingCap and owner now
  const strataDeed = await StrataDeedRWA.deploy(fundingCap, deployer.address);

  await strataDeed.waitForDeployment();
  const strataAddress = await strataDeed.getAddress();

  console.log(`StrataDeedRWA deployed to: ${strataAddress}`);
  console.log(`- Note: Accepts NATIVE MNT for Escrow and Yield.`);

  // 3. Setup Basic Compliance for Deployer (Self-Verify for Demo)
  // Create a dummy hash: 0x123...
  const dummyHash = hre.ethers.keccak256(hre.ethers.toUtf8Bytes("DEPLOYER_CREDENTIAL"));
  
  const tx = await strataDeed.registerCredential(deployer.address, dummyHash);
  await tx.wait();
  
  console.log(`Registered Identity for Deployer. Hash: ${dummyHash}`);
  
  // 4. Verify Compliance Status
  const isCompliant = await strataDeed.isCompliant(deployer.address);
  console.log(`Deployer Compliance Check: ${isCompliant}`);
  
  console.log("\nDeployment script finished.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
