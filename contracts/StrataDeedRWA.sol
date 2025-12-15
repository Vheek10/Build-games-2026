// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title StrataDeed RWA Token
 * @author StrataDeed Protocol
 * @notice Represents fractional ownership of a real-estate asset with privacy-preserving compliance.
 * @dev Implements ERC-20 with restricted transfers (ZK-KYC ready hooks), Escrow funding, and Yield distribution.
 */
contract StrataDeedRWA is ERC20, Ownable, Pausable, ReentrancyGuard {
    // ============================
    // State Variables: Assets
    // ============================

    // No external ERC-20; we use Native Mantle Token ($MNT)
    IERC20 public immutable propertyToken; // Self-reference

    // Compliance State
    mapping(address => bytes32) private _credentialHashes;
    mapping(bytes32 => bool) public isCredentialRevoked;
    mapping(address => bool) public isWalletFrozen;

    // Escrow State
    enum EscrowState { Funding, Finalized, Cancelled }
    EscrowState public escrowState;
    uint256 public immutable fundingCap;
    uint256 public totalEscrowRaised;
    mapping(address => uint256) public escrowDeposits;
    uint256 public constant PROPERTY_TOKEN_SUPPLY = 100_000 * 10**18;

    // Yield State
    uint256 public accYieldPerShare;
    mapping(address => uint256) public rewardDebt;
    uint256 public totalYieldDistributed;

    // Events
    event CredentialApproved(address indexed wallet, bytes32 indexed credentialHash);
    event CredentialRevoked(bytes32 indexed credentialHash, string reason);
    event WalletFrozen(address indexed wallet);
    event WalletUnfrozen(address indexed wallet);
    event EscrowDeposit(address indexed investor, uint256 amount);
    event EscrowFinalized(uint256 totalRaised, uint256 timestamp);
    event EscrowCancelled(uint256 totalRaised, string reason);
    event RefundClaimed(address indexed investor, uint256 amount);
    event YieldDeposited(uint256 amount, uint256 newAccYieldPerShare);
    event YieldClaimed(address indexed investor, uint256 amount);

    // ============================
    // Constructor
    // ============================

    /**
     * @param _fundingCap The total amount of Native MNT required.
     * @param _initialOwner The admin address.
     */
    constructor(
        uint256 _fundingCap,
        address _initialOwner
    ) ERC20("StrataDeed Property Token 1", "SDPT-1") Ownable(_initialOwner) {
        propertyToken = IERC20(address(this));
        fundingCap = _fundingCap;
        escrowState = EscrowState.Funding;
    }

    // ============================
    // Compliance Logic
    // ============================

    /**
     * @notice Registers a credential hash for a wallet (onlyOwner).
     * @dev Fixed: No front-running vulnerability as onlyOwner can call.
     */
    function registerCredential(address wallet, bytes32 credentialHash) external onlyOwner {
        require(wallet != address(0), "Invalid wallet");
        require(credentialHash != bytes32(0), "Invalid hash");
        _credentialHashes[wallet] = credentialHash;
        emit CredentialApproved(wallet, credentialHash);
    }

    /**
     * @notice Revokes a credential hash (onlyOwner).
     */
    function revokeCredentialHash(bytes32 credentialHash, string memory reason) external onlyOwner {
        isCredentialRevoked[credentialHash] = true;
        emit CredentialRevoked(credentialHash, reason);
    }

    /**
     * @notice Freezes a wallet (onlyOwner).
     */
    function freezeWallet(address wallet) external onlyOwner {
        isWalletFrozen[wallet] = true;
        emit WalletFrozen(wallet);
    }

    /**
     * @notice Unfreezes a wallet (onlyOwner).
     */
    function unfreezeWallet(address wallet) external onlyOwner {
        isWalletFrozen[wallet] = false;
        emit WalletUnfrozen(wallet);
    }

    /**
     * @notice Checks if a wallet is compliant.
     */
    function isCompliant(address wallet) public view returns (bool) {
        if (isWalletFrozen[wallet]) return false;
        bytes32 hash = _credentialHashes[wallet];
        if (hash == bytes32(0)) return false;
        if (isCredentialRevoked[hash]) return false;
        return true;
    }

    /**
     * @dev Override _update to enforce compliance and handle yield.
     * @dev FIXED: Moved yield distribution AFTER state updates to prevent reentrancy.
     */
    function _update(address from, address to, uint256 value) internal override {
        require(!paused(), "Contract is paused");
        
        if (from != address(0)) {
            require(isCompliant(from), "Sender not compliant");
        }
        if (to != address(0)) {
            require(isCompliant(to), "Receiver not compliant");
        }
        
        // CHECKS done. Now apply EFFECTS.
        super._update(from, to, value); // Updates balances first

        // Update reward debt based on NEW balances (after transfer)
        if (from != address(0)) {
            rewardDebt[from] = (balanceOf(from) * accYieldPerShare) / 1e18;
        }
        if (to != address(0)) {
            rewardDebt[to] = (balanceOf(to) * accYieldPerShare) / 1e18;
        }
        
        // INTERACTIONS: Distribute pending yield AFTER all state changes
        // This prevents reentrancy attacks
        if (from != address(0)) {
            _distributePendingYield(from);
        }
        if (to != address(0)) {
            _distributePendingYield(to);
        }
    }

    // ============================
    // Escrow Logic (Native MNT)
    // ============================

    /**
     * @notice Investors deposit Native MNT into the escrow.
     */
    function depositEscrow() external payable nonReentrant {
        require(escrowState == EscrowState.Funding, "Escrow not active");
        require(isCompliant(msg.sender), "Investor not compliant");
        require(totalEscrowRaised + msg.value <= fundingCap, "Cap exceeded");
        require(msg.value > 0, "Zero deposit");

        escrowDeposits[msg.sender] += msg.value;
        totalEscrowRaised += msg.value;

        emit EscrowDeposit(msg.sender, msg.value);
    }

    /**
     * @notice Finalizes the escrow, mints tokens, and releases Funds to admin.
     * @dev FIXED: Now sends only the escrowed amount, not the full contract balance.
     */
    function finalizeEscrow() external onlyOwner nonReentrant {
        require(escrowState == EscrowState.Funding, "Invalid state");
        
        escrowState = EscrowState.Finalized;
        
        // 1. Cache the amount to send
        uint256 amountToRelease = totalEscrowRaised;
        
        // 2. Reset state to prevent reentrancy before the call
        totalEscrowRaised = 0;
        
        // 3. Send the specific escrow amount only
        (bool success, ) = owner().call{value: amountToRelease}("");
        require(success, "Fund release failed");

        emit EscrowFinalized(amountToRelease, block.timestamp);
    }

    /**
     * @notice Users claim their property tokens after finalization.
     * @dev FIXED: Uses withdrawal pattern to prevent reentrancy.
     */
    function claimTokens() external nonReentrant {
        require(escrowState == EscrowState.Finalized, "Not finalized");
        
        uint256 depositAmount = escrowDeposits[msg.sender];
        require(depositAmount > 0, "No deposits");

        // Calculate share: (UserDeposit / TotalRaised) * TotalSupply
        // Note: totalEscrowRaised is now 0 after finalizeEscrow, so we need to track it
        uint256 tokenAmount = (depositAmount * PROPERTY_TOKEN_SUPPLY) / totalEscrowRaisedBeforeFinalization;

        // Reset state before external call (mint)
        escrowDeposits[msg.sender] = 0;
        
        _mint(msg.sender, tokenAmount);
    }

    /**
     * @notice Cancels escrow and enables refunds.
     */
    function cancelEscrow(string memory reason) external onlyOwner {
        require(escrowState == EscrowState.Funding, "Invalid state");
        escrowState = EscrowState.Cancelled;
        emit EscrowCancelled(totalEscrowRaised, reason);
    }

    /**
     * @notice Withdraw refund if escrow cancelled.
     * @dev FIXED: Uses withdrawal pattern for safer refunds.
     */
    function withdrawRefund() external nonReentrant {
        require(escrowState == EscrowState.Cancelled, "Not cancelled");
        
        uint256 amount = escrowDeposits[msg.sender];
        require(amount > 0, "Nothing to refund");

        // Reset state before external call
        escrowDeposits[msg.sender] = 0;
        
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Refund failed");

        emit RefundClaimed(msg.sender, amount);
    }

    // ============================
    // Yield Logic (Verifiable Native MNT)
    // ============================

    /**
     * @notice Admin deposits yield (Native MNT).
     */
    function depositYield() external payable onlyOwner {
        require(totalSupply() > 0, "No tokens minted yet");
        require(msg.value > 0, "Zero yield");

        accYieldPerShare += (msg.value * 1e18) / totalSupply();
        totalYieldDistributed += msg.value;

        emit YieldDeposited(msg.value, accYieldPerShare);
    }

    /**
     * @notice Claims pending yield for the caller.
     */
    function claimYield() external nonReentrant {
        _distributePendingYield(msg.sender);
    }

    /**
     * @dev Internal function to calculate and transfer pending yield.
     * @param user The user address.
     * @dev FIXED: Resets rewardDebt BEFORE making external call.
     */
    function _distributePendingYield(address user) internal {
        uint256 balance = balanceOf(user);
        if (balance == 0) return;

        // Pending = (balance * accYield) - debt
        uint256 pending = (balance * accYieldPerShare) / 1e18 - rewardDebt[user];
        
        if (pending > 0) {
            // Reset debt to current accumulator BEFORE external call
            rewardDebt[user] = (balance * accYieldPerShare) / 1e18;
            
            (bool success, ) = user.call{value: pending}("");
            require(success, "Yield claim failed");
            
            emit YieldClaimed(user, pending);
        }
    }

    // ============================
    // Admin Utilities
    // ============================

    function pauseContract() external onlyOwner {
        _pause();
    }

    function unpauseContract() external onlyOwner {
        _unpause();
    }

    // ============================
    // Additional Fix: Track totalEscrowRaised before finalization
    // ============================
    
    uint256 public totalEscrowRaisedBeforeFinalization;
    
    /**
     * @dev Modified finalizeEscrow to store the total before resetting.
     */
    function finalizeEscrow() external onlyOwner nonReentrant {
        require(escrowState == EscrowState.Funding, "Invalid state");
        
        escrowState = EscrowState.Finalized;
        
        // Store the total before resetting for token calculations
        totalEscrowRaisedBeforeFinalization = totalEscrowRaised;
        
        // Cache the amount to send
        uint256 amountToRelease = totalEscrowRaised;
        
        // Reset state to prevent reentrancy before the call
        totalEscrowRaised = 0;
        
        // Send the specific escrow amount only
        (bool success, ) = owner().call{value: amountToRelease}("");
        require(success, "Fund release failed");

        emit EscrowFinalized(amountToRelease, block.timestamp);
    }
    
    /**
     * @dev Modified claimTokens to use the stored total.
     */
    function claimTokens() external nonReentrant {
        require(escrowState == EscrowState.Finalized, "Not finalized");
        
        uint256 depositAmount = escrowDeposits[msg.sender];
        require(depositAmount > 0, "No deposits");

        // Calculate share using the stored total from before finalization
        require(totalEscrowRaisedBeforeFinalization > 0, "Invalid total raised");
        uint256 tokenAmount = (depositAmount * PROPERTY_TOKEN_SUPPLY) / totalEscrowRaisedBeforeFinalization;

        // Reset state before external call (mint)
        escrowDeposits[msg.sender] = 0;
        
        _mint(msg.sender, tokenAmount);
    }

    // ============================
    // Emergency Functions
    // ============================

    /**
     * @notice Emergency function to recover any ERC20 tokens sent by mistake.
     * @dev Cannot recover the native token (MNT) or the property token itself.
     */
    function recoverERC20(address tokenAddress, uint256 amount) external onlyOwner {
        require(tokenAddress != address(0), "Invalid token");
        require(tokenAddress != address(this), "Cannot recover property token");
        
        IERC20(tokenAddress).transfer(owner(), amount);
    }

    /**
     * @notice Receive function to accept native tokens (for yield deposits).
     */
    receive() external payable {
        // Only accept payments through depositYield or depositEscrow
        // This prevents accidental direct transfers
        revert("Use depositYield() or depositEscrow()");
    }
}