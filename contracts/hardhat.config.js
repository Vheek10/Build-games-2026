/** @format */

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: {
		version: "0.8.20",
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
			viaIR: true,
		},
	},

	networks: {
		// Avalanche Fuji Testnet
		fuji: {
			url: "https://api.avax-test.network/ext/bc/C/rpc",
			chainId: 43113,
			accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
		},

		// Avalanche Mainnet
		avalanche: {
			url: "https://api.avax.network/ext/bc/C/rpc",
			chainId: 43114,
			accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
		},

		// Local Hardhat node (for testing)
		hardhat: {
			chainId: 31337,
		},
	},

	etherscan: {
		apiKey: {
			avalancheFujiTestnet: process.env.SNOWTRACE_API_KEY || "",
			avalanche: process.env.SNOWTRACE_API_KEY || "",
		},
	},

	paths: {
		sources: "./", // contracts are in this folder root
		scripts: "./scripts",
		tests: "./test",
		cache: "./cache",
		artifacts: "./artifacts",
	},
};
