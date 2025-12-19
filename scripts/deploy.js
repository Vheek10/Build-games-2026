import hre from "hardhat";

const main = async () => {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance));

   const fundingCap = hre.ethers.parseUnits("0.1", 18);  
  
  // 1. Deploy NFT Registry
  const StrataDeedNFT = await hre.ethers.getContractFactory("StrataDeedNFT");
  const nftDeed = await StrataDeedNFT.deploy(deployer.address);
  await nftDeed.waitForDeployment();
  const nftAddress = await nftDeed.getAddress();
  console.log(`StrataDeedNFT deployed to: ${nftAddress}`);

  // 2. Deploy RWA Token for a specific property (linked to a deed ID in real logic)
  const StrataDeedRWA = await hre.ethers.getContractFactory("StrataDeedRWA");
  const strataDeed = await StrataDeedRWA.deploy(fundingCap, deployer.address);

  await strataDeed.waitForDeployment();
  const strataAddress = await strataDeed.getAddress();

  console.log(`StrataDeedRWA deployed to: ${strataAddress}`);
  console.log(`- Note: NFT handles deeds, RWA handles fractional investment.`);

  const dummyHash = hre.ethers.keccak256(hre.ethers.toUtf8Bytes("DEPLOYER_CREDENTIAL"));
  
  const tx = await strataDeed.registerCredential(deployer.address, dummyHash);
  await tx.wait();
  
  console.log(`Registered Identity for Deployer. Hash: ${dummyHash}`);

  const isCompliant = await strataDeed.isCompliant(deployer.address);
  console.log(`Deployer Compliance Check: ${isCompliant}`);

  console.log("\nDeployment script finished.");
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
