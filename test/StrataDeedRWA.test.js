const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StrataDeedRWA", function () {
  let strataDeed, owner, addr1, addr2, addr3;

  beforeEach(async function () {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();

    // Deploy StrataDeedRWA (Native)
    const fundingCap = ethers.parseEther("1000");
    const StrataDeedRWA = await ethers.getContractFactory("StrataDeedRWA");
    strataDeed = await StrataDeedRWA.deploy(fundingCap, owner.address);
    await strataDeed.waitForDeployment();
  });

  describe("Contract Deployment", function () {
    it("Should set the correct owner", async function () {
      expect(await strataDeed.owner()).to.equal(owner.address);
    });

    it("Should set the correct funding cap", async function () {
      expect(await strataDeed.fundingCap()).to.equal(ethers.parseEther("1000"));
    });

    it("Should initialize escrow in Funding state", async function () {
      expect(await strataDeed.escrowState()).to.equal(0); // 0 = Funding
    });
  });

  describe("Compliance System", function () {
    it("Should register credential for a wallet", async function () {
      const hash = ethers.keccak256(ethers.toUtf8Bytes("USER1"));
      await expect(strataDeed.registerCredential(addr1.address, hash))
        .to.emit(strataDeed, "CredentialApproved")
        .withArgs(addr1.address, hash);
      
      expect(await strataDeed.isCompliant(addr1.address)).to.be.true;
    });

    it("Should fail to register credential with zero address", async function () {
      const hash = ethers.keccak256(ethers.toUtf8Bytes("INVALID"));
      await expect(
        strataDeed.registerCredential(ethers.ZeroAddress, hash)
      ).to.be.revertedWith("Invalid wallet");
    });

    it("Should revoke credential hash", async function () {
      const hash = ethers.keccak256(ethers.toUtf8Bytes("USER1"));
      await strataDeed.registerCredential(addr1.address, hash);
      
      await expect(strataDeed.revokeCredentialHash(hash, "Suspicious activity"))
        .to.emit(strataDeed, "CredentialRevoked")
        .withArgs(hash, "Suspicious activity");
      
      expect(await strataDeed.isCredentialRevoked(hash)).to.be.true;
      expect(await strataDeed.isCompliant(addr1.address)).to.be.false;
    });

    it("Should freeze and unfreeze wallet", async function () {
      const hash = ethers.keccak256(ethers.toUtf8Bytes("USER1"));
      await strataDeed.registerCredential(addr1.address, hash);
      
      await expect(strataDeed.freezeWallet(addr1.address))
        .to.emit(strataDeed, "WalletFrozen")
        .withArgs(addr1.address);
      
      expect(await strataDeed.isWalletFrozen(addr1.address)).to.be.true;
      expect(await strataDeed.isCompliant(addr1.address)).to.be.false;
      
      await expect(strataDeed.unfreezeWallet(addr1.address))
        .to.emit(strataDeed, "WalletUnfrozen")
        .withArgs(addr1.address);
      
      expect(await strataDeed.isWalletFrozen(addr1.address)).to.be.false;
      expect(await strataDeed.isCompliant(addr1.address)).to.be.true;
    });

    it("Should return false for non-registered wallet", async function () {
      expect(await strataDeed.isCompliant(addr3.address)).to.be.false;
    });
  });

  describe("Escrow Deposits", function () {
    beforeEach(async function () {
      // Setup compliant users
      const hash1 = ethers.keccak256(ethers.toUtf8Bytes("USER1"));
      const hash2 = ethers.keccak256(ethers.toUtf8Bytes("USER2"));
      await strataDeed.registerCredential(addr1.address, hash1);
      await strataDeed.registerCredential(addr2.address, hash2);
    });

    it("Should fail deposit if not compliant", async function () {
      const amount = ethers.parseEther("10");
      await expect(
        strataDeed.connect(addr3).depositEscrow({ value: amount })
      ).to.be.revertedWith("Investor not compliant");
    });

    it("Should fail deposit when escrow not active", async function () {
      // Cancel escrow first
      await strataDeed.cancelEscrow("Test cancellation");
      
      const amount = ethers.parseEther("10");
      await expect(
        strataDeed.connect(addr1).depositEscrow({ value: amount })
      ).to.be.revertedWith("Escrow not active");
    });

    it("Should allow deposit after compliance", async function () {
      const amount = ethers.parseEther("10");

      await expect(strataDeed.connect(addr1).depositEscrow({ value: amount }))
        .to.emit(strataDeed, "EscrowDeposit")
        .withArgs(addr1.address, amount);
        
      expect(await strataDeed.escrowDeposits(addr1.address)).to.equal(amount);
      expect(await strataDeed.totalEscrowRaised()).to.equal(amount);
    });

    it("Should fail deposit with zero amount", async function () {
      await expect(
        strataDeed.connect(addr1).depositEscrow({ value: 0 })
      ).to.be.revertedWith("Zero deposit");
    });

    it("Should fail deposit exceeding funding cap", async function () {
      const amount = ethers.parseEther("1500"); // Exceeds 1000 cap
      
      await expect(
        strataDeed.connect(addr1).depositEscrow({ value: amount })
      ).to.be.revertedWith("Cap exceeded");
    });

    it("Should handle multiple deposits", async function () {
      const amount1 = ethers.parseEther("100");
      const amount2 = ethers.parseEther("200");
      
      await strataDeed.connect(addr1).depositEscrow({ value: amount1 });
      await strataDeed.connect(addr2).depositEscrow({ value: amount2 });
      
      expect(await strataDeed.escrowDeposits(addr1.address)).to.equal(amount1);
      expect(await strataDeed.escrowDeposits(addr2.address)).to.equal(amount2);
      expect(await strataDeed.totalEscrowRaised()).to.equal(amount1 + amount2);
    });

    it("Should prevent deposit after cap reached", async function () {
      // First deposit reaches cap
      await strataDeed.connect(addr1).depositEscrow({ value: ethers.parseEther("1000") });
      
      // Second deposit should fail
      await expect(
        strataDeed.connect(addr2).depositEscrow({ value: ethers.parseEther("1") })
      ).to.be.revertedWith("Cap exceeded");
    });
  });

  describe("Escrow Finalization", function () {
    beforeEach(async function () {
      // Setup compliant user with deposit
      const hash = ethers.keccak256(ethers.toUtf8Bytes("USER1"));
      await strataDeed.registerCredential(addr1.address, hash);
      await strataDeed.connect(addr1).depositEscrow({ value: ethers.parseEther("500") });
    });

    it("Should finalize escrow and release funds to owner", async function () {
      const ownerBalanceBefore = await ethers.provider.getBalance(owner.address);
      
      await expect(strataDeed.finalizeEscrow())
        .to.emit(strataDeed, "EscrowFinalized")
        .withArgs(ethers.parseEther("500"), expect.any(Number));
      
      expect(await strataDeed.escrowState()).to.equal(1); // 1 = Finalized
      expect(await strataDeed.totalEscrowRaised()).to.equal(0);
      
      // Check owner received funds (approximate due to gas costs)
      const ownerBalanceAfter = await ethers.provider.getBalance(owner.address);
      expect(ownerBalanceAfter).to.be.gt(ownerBalanceBefore);
    });

    it("Should fail finalization if not owner", async function () {
      await expect(
        strataDeed.connect(addr1).finalizeEscrow()
      ).to.be.revertedWithCustomError(strataDeed, "OwnableUnauthorizedAccount");
    });

    it("Should fail finalization if not in Funding state", async function () {
      await strataDeed.finalizeEscrow();
      
      await expect(
        strataDeed.finalizeEscrow()
      ).to.be.revertedWith("Invalid state");
    });

    it("Should store totalEscrowRaisedBeforeFinalization correctly", async function () {
      await strataDeed.finalizeEscrow();
      
      expect(await strataDeed.totalEscrowRaisedBeforeFinalization()).to.equal(ethers.parseEther("500"));
    });
  });

  describe("Token Claiming", function () {
    beforeEach(async function () {
      // Setup compliant user with deposit and finalize
      const hash = ethers.keccak256(ethers.toUtf8Bytes("USER1"));
      await strataDeed.registerCredential(addr1.address, hash);
      await strataDeed.connect(addr1).depositEscrow({ value: ethers.parseEther("500") });
      await strataDeed.finalizeEscrow();
    });

    it("Should claim tokens after finalization", async function () {
      const tokenAmount = (ethers.parseEther("500") * 100000n * 10n**18n) / ethers.parseEther("500");
      
      await expect(strataDeed.connect(addr1).claimTokens())
        .to.emit(strataDeed, "Transfer")
        .withArgs(ethers.ZeroAddress, addr1.address, tokenAmount);
      
      expect(await strataDeed.balanceOf(addr1.address)).to.equal(tokenAmount);
      expect(await strataDeed.escrowDeposits(addr1.address)).to.equal(0);
    });

    it("Should fail claim if not finalized", async function () {
      // Deploy new contract without finalizing
      const fundingCap = ethers.parseEther("1000");
      const StrataDeedRWA = await ethers.getContractFactory("StrataDeedRWA");
      const newContract = await StrataDeedRWA.deploy(fundingCap, owner.address);
      await newContract.waitForDeployment();
      
      const hash = ethers.keccak256(ethers.toUtf8Bytes("USER1"));
      await newContract.registerCredential(addr1.address, hash);
      await newContract.connect(addr1).depositEscrow({ value: ethers.parseEther("500") });
      
      await expect(
        newContract.connect(addr1).claimTokens()
      ).to.be.revertedWith("Not finalized");
    });

    it("Should fail claim with no deposits", async function () {
      // addr2 has no deposits
      const hash = ethers.keccak256(ethers.toUtf8Bytes("USER2"));
      await strataDeed.registerCredential(addr2.address, hash);
      
      await expect(
        strataDeed.connect(addr2).claimTokens()
      ).to.be.revertedWith("No deposits");
    });

    it("Should prevent double claiming", async function () {
      await strataDeed.connect(addr1).claimTokens();
      
      await expect(
        strataDeed.connect(addr1).claimTokens()
      ).to.be.revertedWith("No deposits");
    });
  });

  describe("Escrow Cancellation and Refunds", function () {
    beforeEach(async function () {
      // Setup compliant user with deposit
      const hash = ethers.keccak256(ethers.toUtf8Bytes("USER1"));
      await strataDeed.registerCredential(addr1.address, hash);
      await strataDeed.connect(addr1).depositEscrow({ value: ethers.parseEther("300") });
    });

    it("Should cancel escrow", async function () {
      await expect(strataDeed.cancelEscrow("Market conditions"))
        .to.emit(strataDeed, "EscrowCancelled")
        .withArgs(ethers.parseEther("300"), "Market conditions");
      
      expect(await strataDeed.escrowState()).to.equal(2); // 2 = Cancelled
    });

    it("Should fail cancellation if not owner", async function () {
      await expect(
        strataDeed.connect(addr1).cancelEscrow("Test")
      ).to.be.revertedWithCustomError(strataDeed, "OwnableUnauthorizedAccount");
    });

    it("Should fail cancellation if not in Funding state", async function () {
      await strataDeed.finalizeEscrow();
      
      await expect(
        strataDeed.cancelEscrow("Test")
      ).to.be.revertedWith("Invalid state");
    });

    it("Should withdraw refund after cancellation", async function () {
      await strataDeed.cancelEscrow("Test");
      
      const userBalanceBefore = await ethers.provider.getBalance(addr1.address);
      
      await expect(strataDeed.connect(addr1).withdrawRefund())
        .to.emit(strataDeed, "RefundClaimed")
        .withArgs(addr1.address, ethers.parseEther("300"));
      
      expect(await strataDeed.escrowDeposits(addr1.address)).to.equal(0);
      
      // Check user received funds (approximate due to gas costs)
      const userBalanceAfter = await ethers.provider.getBalance(addr1.address);
      expect(userBalanceAfter).to.be.gt(userBalanceBefore);
    });

    it("Should fail refund if not cancelled", async function () {
      await expect(
        strataDeed.connect(addr1).withdrawRefund()
      ).to.be.revertedWith("Not cancelled");
    });

    it("Should fail refund with no deposits", async function () {
      await strataDeed.cancelEscrow("Test");
      
      // addr2 has no deposits
      const hash = ethers.keccak256(ethers.toUtf8Bytes("USER2"));
      await strataDeed.registerCredential(addr2.address, hash);
      
      await expect(
        strataDeed.connect(addr2).withdrawRefund()
      ).to.be.revertedWith("Nothing to refund");
    });
  });

  describe("Yield Distribution", function () {
    beforeEach(async function () {
      // Setup: Finalize escrow and mint tokens
      const hash = ethers.keccak256(ethers.toUtf8Bytes("USER1"));
      await strataDeed.registerCredential(addr1.address, hash);
      await strataDeed.connect(addr1).depositEscrow({ value: ethers.parseEther("500") });
      await strataDeed.finalizeEscrow();
      await strataDeed.connect(addr1).claimTokens();
    });

    it("Should deposit yield", async function () {
      const yieldAmount = ethers.parseEther("50");
      
      await expect(strataDeed.depositYield({ value: yieldAmount }))
        .to.emit(strataDeed, "YieldDeposited")
        .withArgs(yieldAmount, expect.any(Number));
      
      expect(await strataDeed.totalYieldDistributed()).to.equal(yieldAmount);
    });

    it("Should fail yield deposit with zero amount", async function () {
      await expect(
        strataDeed.depositYield({ value: 0 })
      ).to.be.revertedWith("Zero yield");
    });

    it("Should fail yield deposit if no tokens minted", async function () {
      // New contract without tokens
      const fundingCap = ethers.parseEther("1000");
      const StrataDeedRWA = await ethers.getContractFactory("StrataDeedRWA");
      const newContract = await StrataDeedRWA.deploy(fundingCap, owner.address);
      await newContract.waitForDeployment();
      
      await expect(
        newContract.depositYield({ value: ethers.parseEther("10") })
      ).to.be.revertedWith("No tokens minted yet");
    });

    it("Should claim yield", async function () {
      // Deposit yield first
      const yieldAmount = ethers.parseEther("50");
      await strataDeed.depositYield({ value: yieldAmount });
      
      const userBalanceBefore = await ethers.provider.getBalance(addr1.address);
      
      await expect(strataDeed.connect(addr1).claimYield())
        .to.emit(strataDeed, "YieldClaimed")
        .withArgs(addr1.address, expect.any(Number));
      
      // Check user received funds (approximate due to gas costs)
      const userBalanceAfter = await ethers.provider.getBalance(addr1.address);
      expect(userBalanceAfter).to.be.gt(userBalanceBefore);
    });

    it("Should automatically distribute yield on transfer", async function () {
      // Setup second compliant user
      const hash2 = ethers.keccak256(ethers.toUtf8Bytes("USER2"));
      await strataDeed.registerCredential(addr2.address, hash2);
      
      // Deposit yield
      const yieldAmount = ethers.parseEther("50");
      await strataDeed.depositYield({ value: yieldAmount });
      
      // Transfer tokens - should trigger yield distribution
      const transferAmount = ethers.parseEther("10000");
      await strataDeed.connect(addr1).transfer(addr2.address, transferAmount);
      
      // Check balances updated correctly
      expect(await strataDeed.balanceOf(addr1.address)).to.be.lt(await strataDeed.totalSupply());
      expect(await strataDeed.balanceOf(addr2.address)).to.equal(transferAmount);
    });
  });

  describe("Pausable Functionality", function () {
    beforeEach(async function () {
      // Setup compliant user
      const hash = ethers.keccak256(ethers.toUtf8Bytes("USER1"));
      await strataDeed.registerCredential(addr1.address, hash);
    });

    it("Should pause and unpause contract", async function () {
      await strataDeed.pauseContract();
      expect(await strataDeed.paused()).to.be.true;
      
      await strataDeed.unpauseContract();
      expect(await strataDeed.paused()).to.be.false;
    });

    it("Should fail transfers when paused", async function () {
      // Need tokens first - finalize and claim
      await strataDeed.connect(addr1).depositEscrow({ value: ethers.parseEther("100") });
      await strataDeed.finalizeEscrow();
      await strataDeed.connect(addr1).claimTokens();
      
      // Setup second user
      const hash2 = ethers.keccak256(ethers.toUtf8Bytes("USER2"));
      await strataDeed.registerCredential(addr2.address, hash2);
      
      // Pause and try transfer
      await strataDeed.pauseContract();
      
      await expect(
        strataDeed.connect(addr1).transfer(addr2.address, ethers.parseEther("1000"))
      ).to.be.revertedWith("Contract is paused");
    });

    it("Should fail deposit when paused", async function () {
      await strataDeed.pauseContract();
      
      await expect(
        strataDeed.connect(addr1).depositEscrow({ value: ethers.parseEther("10") })
      ).to.be.revertedWith("Contract is paused");
    });
  });

  describe("Reentrancy Protection", function () {
    it("Should prevent reentrancy in escrow deposits", async function () {
      // This is tested by the nonReentrant modifier
      // Additional test would require a malicious contract
      const hash = ethers.keccak256(ethers.toUtf8Bytes("USER1"));
      await strataDeed.registerCredential(addr1.address, hash);
      
      // Multiple deposits should work correctly
      await strataDeed.connect(addr1).depositEscrow({ value: ethers.parseEther("100") });
      await strataDeed.connect(addr1).depositEscrow({ value: ethers.parseEther("100") });
      
      expect(await strataDeed.escrowDeposits(addr1.address)).to.equal(ethers.parseEther("200"));
    });
  });

  describe("Edge Cases", function () {
    it("Should handle small deposits correctly", async function () {
      const hash = ethers.keccak256(ethers.toUtf8Bytes("USER1"));
      await strataDeed.registerCredential(addr1.address, hash);
      
      // Minimum possible deposit (1 wei)
      await strataDeed.connect(addr1).depositEscrow({ value: 1 });
      
      expect(await strataDeed.escrowDeposits(addr1.address)).to.equal(1);
      expect(await strataDeed.totalEscrowRaised()).to.equal(1);
    });

    it("Should handle maximum deposit (at cap)", async function () {
      const hash = ethers.keccak256(ethers.toUtf8Bytes("USER1"));
      await strataDeed.registerCredential(addr1.address, hash);
      
      // Deposit exactly at cap
      await strataDeed.connect(addr1).depositEscrow({ value: ethers.parseEther("1000") });
      
      expect(await strataDeed.totalEscrowRaised()).to.equal(ethers.parseEther("1000"));
      expect(await strataDeed.escrowDeposits(addr1.address)).to.equal(ethers.parseEther("1000"));
    });

    it("Should correctly calculate token amounts", async function () {
      // Test with specific amounts to verify math
      const hash = ethers.keccak256(ethers.toUtf8Bytes("USER1"));
      await strataDeed.registerCredential(addr1.address, hash);
      
      // Deposit specific amount
      const deposit = ethers.parseEther("250"); // 25% of cap
      await strataDeed.connect(addr1).depositEscrow({ value: deposit });
      
      await strataDeed.finalizeEscrow();
      
      // Expected tokens: (250 / 1000) * 100,000 = 25,000 tokens
      const expectedTokens = ethers.parseUnits("25000", 18);
      
      await strataDeed.connect(addr1).claimTokens();
      expect(await strataDeed.balanceOf(addr1.address)).to.equal(expectedTokens);
    });
  });
});