// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import {StrataDeedNFT} from "../contracts/StrataDeedNFT.sol";
import {StrataDeedRWA} from "../contracts/StrataDeedRWA.sol";
import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

contract DeployScript is Script {
    function run() external {
        vm.startBroadcast();

        address deployer = msg.sender;
        console.log("Deploying contracts with account:", deployer);

        // 1. Deploy StrataDeedNFT
        StrataDeedNFT nftImpl = new StrataDeedNFT();
        bytes memory nftInitData = abi.encodeWithSelector(
            StrataDeedNFT.initialize.selector,
            deployer
        );
        ERC1967Proxy nftProxy = new ERC1967Proxy(address(nftImpl), nftInitData);
        StrataDeedNFT nft = StrataDeedNFT(address(nftProxy));

        console.log("StrataDeedNFT Implementation deployed at:", address(nftImpl));
        console.log("StrataDeedNFT Proxy deployed at:", address(nftProxy));

        // 2. Deploy StrataDeedRWA
        StrataDeedRWA rwaImpl = new StrataDeedRWA();
        
        // Define admins for RWA Multisig (Minimum 3 required)
        address[] memory admins = new address[](3);
        admins[0] = deployer;
        admins[1] = address(0x0000000000000000000000000000000000000001); // Demo Placeholder 1
        admins[2] = address(0x0000000000000000000000000000000000000002); // Demo Placeholder 2

        uint256 fundingCap = 1000 ether; // Example: 1000 USD/Tokens

        bytes memory rwaInitData = abi.encodeWithSelector(
            StrataDeedRWA.initialize.selector,
            fundingCap,
            deployer,
            admins
        );
        ERC1967Proxy rwaProxy = new ERC1967Proxy(address(rwaImpl), rwaInitData);
        StrataDeedRWA rwa = StrataDeedRWA(payable(address(rwaProxy)));

        console.log("StrataDeedRWA Implementation deployed at:", address(rwaImpl));
        console.log("StrataDeedRWA Proxy deployed at:", address(rwaProxy));

        vm.stopBroadcast();
    }
}
