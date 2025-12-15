require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env.local" }); // Use .env.local to match Next.js conventions if present, or just standard

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    mantleTestnet: {
      url: "https://rpc.sepolia.mantle.xyz",
      chainId: 5003,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    hardhat: {
      chainId: 31337,
    },
  },
  paths: {
    artifacts: "./src/contracts/artifacts", // Place artifacts where Next.js can see them easily if needed, or just default
    // But standard hardhat is ./artifacts. Let's keep it standard to avoid confusion, 
    // unless user specifically wants frontend integration. 
    // The user has `src/contracts`. Let's output there? 
    // Actually, normally we copy abi. Let's stick to default ./artifacts and user can import from there.
  }
};
