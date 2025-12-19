// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../contracts/StrataDeedRWA.sol";
import "../contracts/StrataDeedNFT.sol";

contract StrataDeedTest is Test {
    StrataDeedRWA public rwa;
    StrataDeedNFT public nft;
    address public owner = address(1);
    address public admin = address(2);
    address[] public admins;

    function setUp() public {
        admins.push(admin);
        admins.push(address(3));
        admins.push(address(4));

        rwa = new StrataDeedRWA();
        nft = new StrataDeedNFT();

        vm.prank(owner);
        // Note: Upgradeable contracts need to be initialized if not done via proxy here
        // For a simple unitary test, we just deploy and initialize
        rwa.initialize(1000 ether, owner, admins);
        nft.initialize(owner);
    }

    function testInitialization() public {
        assertEq(rwa.owner(), owner);
        assertEq(nft.name(), "StrataDeed Property Deed");
    }
}
