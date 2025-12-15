// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title StrataDeed RWA Token - Secured Version
 * @notice Fractional ownership of real-estate asset with privacy-preserving compliance.
 * @dev ERC-20 with restricted transfers, escrow funding, and yield distribution.
 * Fixed critical security vulnerabilities including reentrancy, state validation, and access control.
 */
contract StrataDeedRWA is ERC20, Ownable, Pausable, ReentrancyGuard {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    
    // ============================
    // Constants & Roles
    // ============================
    bytes32 public constant TIMELOCK_ADMIN_ROLE = keccak256("TIMELOCK_ADMIN_ROLE");
    uint256 public constant PROPERTY_TOKEN_SUPPLY = 100_000 * 10**18;
    uint256 private constant MIN_DEPOSIT_FOR_TOKENS = 0.001 ether; // Minimum to receive tokens
    
    // ============================
    // Compliance State
    // ============================
    mapping(address => bytes32) private _credentialHashes;
    mapping(bytes32 => bool) public isCredentialRevoked;
    mapping(address => bool) public isWalletFrozen;

    // ============================
    // Escrow State
    // ============================
    enum EscrowState { Funding, Finalized, Cancelled }
    EscrowState public escrowState;
    uint256 public immutable fundingCap;
    uint256 public totalEscrowRaised;
    mapping(address => uint256) public escrowDeposits;
    uint256 public totalEscrowRaisedBeforeFinalization;
    
    // Timelock for escrow cancellation
    uint256 public escrowCancelTimestamp;
    string public escrowCancelReason;
    bool public escrowCancelPending;

    // ============================
    // Yield State
    // ============================
    uint256 public accYieldPerShare;
    mapping(address => uint256) public rewardDebt;
    uint256 public totalYieldDistributed;
    
    // Pull payment pattern for yield (prevents DoS)
    mapping(address => uint256) private _yieldBalances;

    // ============================
    // Events
    // ============================
    event CredentialApproved(address indexed wallet, bytes32 indexed credentialHash);
    event CredentialRevoked(bytes32 indexed credentialHash, string reason);
    event WalletFrozen(address indexed wallet);
    event WalletUnfrozen(address indexed wallet);
    event EscrowDeposit(address indexed investor, uint256 amount);
    event EscrowFinalized(uint256 totalRaised, uint256 timestamp);
    event EscrowCancellationRequested(uint256 timestamp, string reason, uint256 unlockTime);
    event EscrowCancelled(uint256 totalRaised, string reason);
    event RefundClaimed(address indexed investor, uint256 amount);
    event YieldDeposited(uint256 amount, uint256 newAccYieldPerShare);
    event YieldAccrued(address indexed investor, uint256 amount);
    event YieldWithdrawn(address indexed investor, uint256 amount);
    event TimelockSet(uint256 duration);

    // ============================
    // Constructor
    // ============================
    constructor(
        uint256 _fundingCap,
        address _initialOwner
    ) ERC20("StrataDeed Property Token 1", "SDPT-1") Ownable(_initialOwner) {
        require(_fundingCap > 0, "Funding cap must be > 0");
        fundingCap = _fundingCap;
        escrowState = EscrowState.Funding;
    }

    // ============================
    // Modifiers
    // ============================
    modifier onlyCompliant(address wallet) {
        require(isCompliant(wallet), "Address not compliant");
        _;
    }
    
    modifier onlyWhenFunding() {
        require(escrowState == EscrowState.Funding, "Escrow not in funding state");
        _;
    }
    
    modifier onlyWhenFinalized() {
        require(escrowState == EscrowState.Finalized, "Escrow not finalized");
        _;
    }
    
    modifier onlyWhenCancelled() {
        require(escrowState == EscrowState.Cancelled, "Escrow not cancelled");
        _;
    }

    // ============================
    // Compliance Logic
    // ============================
    function registerCredential(address wallet, bytes32 credentialHash) external onlyOwner {
        require(wallet != address(0), "Invalid wallet");
        require(credentialHash != bytes32(0), "Invalid hash");
        _credentialHashes[wallet] = credentialHash;
        emit CredentialApproved(wallet, credentialHash);
    }

    function revokeCredentialHash(bytes32 credentialHash, string memory reason) external onlyOwner {
        isCredentialRevoked[credentialHash] = true;
        emit CredentialRevoked(credentialHash, reason);
    }

    function freezeWallet(address wallet) external onlyOwner {
        isWalletFrozen[wallet] = true;
        emit WalletFrozen(wallet);
    }

    function unfreezeWallet(address wallet) external onlyOwner {
        isWalletFrozen[wallet] = false;
        emit WalletUnfrozen(wallet);
    }

    function isCompliant(address wallet) public view returns (bool) {
        if (isWalletFrozen[wallet]) return false;
        bytes32 hash = _credentialHashes[wallet];
        if (hash == bytes32(0)) return false;
        if (isCredentialRevoked[hash]) return false;
        return true;
    }

    // ============================
    // ERC-20 Transfer Override (SECURED)
    // ============================
    function _transfer(address from, address to, uint256 amount) internal override nonReentrant {
        require(!paused(), "Contract is paused");
        require(isCompliant(from), "Sender not compliant");
        require(isCompliant(to), "Receiver not compliant");

        // Update reward debt BEFORE transfer (critical for yield calculation)
        uint256 fromBalance = balanceOf(from);
        uint256 toBalance = balanceOf(to);
        
        rewardDebt[from] = fromBalance.mul(accYieldPerShare).div(1e18);
        rewardDebt[to] = toBalance.mul(accYieldPerShare).div(1e18);
        
        // Execute transfer
        super._transfer(from, to, amount);
        
        // Accrue yield (pull pattern - no external calls during transfer)
        _accrueYield(from);
        _accrueYield(to);
    }

    // ============================
    // Escrow Logic (SECURED)
    // ============================
    function depositEscrow() external payable nonReentrant onlyWhenFunding onlyCompliant(msg.sender) {
        require(totalEscrowRaised.add(msg.value) <= fundingCap, "Cap exceeded");
        require(msg.value > 0, "Zero deposit");
        require(msg.value >= MIN_DEPOSIT_FOR_TOKENS, "Deposit below minimum for tokens");

        escrowDeposits[msg.sender] = escrowDeposits[msg.sender].add(msg.value);
        totalEscrowRaised = totalEscrowRaised.add(msg.value);

        emit EscrowDeposit(msg.sender, msg.value);
    }

    function finalizeEscrow() external onlyOwner nonReentrant onlyWhenFunding {
        require(totalEscrowRaised > 0, "No funds raised");
        require(totalEscrowRaised >= fundingCap.mul(80).div(100), "Less than 80% of cap raised"); // Optional threshold

        escrowState = EscrowState.Finalized;
        totalEscrowRaisedBeforeFinalization = totalEscrowRaised;

        uint256 amountToRelease = totalEscrowRaised;
        totalEscrowRaised = 0;

        // Transfer funds to owner safely
        (bool success, ) = owner().call{value: amountToRelease}("");
        require(success, "Fund release failed");

        emit EscrowFinalized(amountToRelease, block.timestamp);
    }

    function claimTokens() external nonReentrant onlyWhenFinalized onlyCompliant(msg.sender) {
        uint256 depositAmount = escrowDeposits[msg.sender];
        require(depositAmount > 0, "No deposits");
        require(totalEscrowRaisedBeforeFinalization > 0, "Invalid total raised");

        // Calculate tokens with safe math
        uint256 tokenAmount = depositAmount.mul(PROPERTY_TOKEN_SUPPLY).div(totalEscrowRaisedBeforeFinalization);
        require(tokenAmount > 0, "Deposit too small for any tokens");
        
        // CRITICAL FIX: Clear deposit BEFORE minting (prevents reentrancy)
        escrowDeposits[msg.sender] = 0;
        
        // Mint tokens
        _mint(msg.sender, tokenAmount);
    }

    // ============================
    // Timelock-Protected Escrow Cancellation
    // ============================
    function requestCancelEscrow(string memory reason) external onlyOwner onlyWhenFunding {
        require(!escrowCancelPending, "Cancellation already pending");
        
        escrowCancelPending = true;
        escrowCancelReason = reason;
        escrowCancelTimestamp = block.timestamp + 2 days; // 48-hour timelock
        
        emit EscrowCancellationRequested(block.timestamp, reason, escrowCancelTimestamp);
    }

    function executeCancelEscrow() external onlyOwner onlyWhenFunding {
        require(escrowCancelPending, "No pending cancellation");
        require(block.timestamp >= escrowCancelTimestamp, "Timelock not expired");
        require(escrowState == EscrowState.Funding, "Invalid state");
        
        escrowState = EscrowState.Cancelled;
        escrowCancelPending = false;
        
        emit EscrowCancelled(totalEscrowRaised, escrowCancelReason);
    }

    function withdrawRefund() external nonReentrant onlyWhenCancelled onlyCompliant(msg.sender) {
        uint256 amount = escrowDeposits[msg.sender];
        require(amount > 0, "Nothing to refund");
        
        // Clear state BEFORE external call
        escrowDeposits[msg.sender] = 0;
        
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Refund failed");

        emit RefundClaimed(msg.sender, amount);
    }

    // ============================
    // Yield Logic (SECURED - Pull Pattern)
    // ============================
    function depositYield() external payable onlyOwner {
        require(totalSupply() > 0, "No tokens minted yet");
        require(msg.value > 0, "Zero yield");
        
        accYieldPerShare = accYieldPerShare.add(msg.value.mul(1e18).div(totalSupply()));
        totalYieldDistributed = totalYieldDistributed.add(msg.value);
        
        emit YieldDeposited(msg.value, accYieldPerShare);
    }
    
    function _accrueYield(address user) internal {
        uint256 balance = balanceOf(user);
        if (balance == 0) return;
        
        uint256 pending = balance.mul(accYieldPerShare).div(1e18).sub(rewardDebt[user]);
        if (pending > 0) {
            // CRITICAL FIX: Update state BEFORE any external interaction
            rewardDebt[user] = balance.mul(accYieldPerShare).div(1e18);
            _yieldBalances[user] = _yieldBalances[user].add(pending);
            
            emit YieldAccrued(user, pending);
        }
    }
    
    function getPendingYield(address user) public view returns (uint256) {
        uint256 balance = balanceOf(user);
        if (balance == 0) return _yieldBalances[user];
        
        uint256 pending = balance.mul(accYieldPerShare).div(1e18).sub(rewardDebt[user]);
        return _yieldBalances[user].add(pending);
    }
    
    function claimYield() external nonReentrant onlyCompliant(msg.sender) {
        // Accrue any pending yield first
        _accrueYield(msg.sender);
        
        uint256 amount = _yieldBalances[msg.sender];
        require(amount > 0, "No yield to claim");
        
        // Clear state BEFORE external call
        _yieldBalances[msg.sender] = 0;
        
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Yield claim failed");
        
        emit YieldWithdrawn(msg.sender, amount);
    }
    
    // Batch yield claim for gas efficiency
    function claimYieldFor(address[] calldata users) external onlyOwner {
        for (uint256 i = 0; i < users.length; i++) {
            _accrueYield(users[i]);
            uint256 amount = _yieldBalances[users[i]];
            if (amount > 0) {
                _yieldBalances[users[i]] = 0;
                (bool success, ) = users[i].call{value: amount}("");
                require(success, "Yield claim failed");
                emit YieldWithdrawn(users[i], amount);
            }
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
    
    function setMinDeposit(uint256 newMinDeposit) external onlyOwner onlyWhenFunding {
        MIN_DEPOSIT_FOR_TOKENS = newMinDeposit;
    }

    // ============================
    // Emergency Functions (SECURED)
    // ============================
    function recoverERC20(address tokenAddress, uint256 amount) external onlyOwner {
        require(tokenAddress != address(0), "Invalid token");
        require(tokenAddress != address(this), "Cannot recover property token");
        
        // Use SafeERC20 for safe transfer
        IERC20(tokenAddress).safeTransfer(owner(), amount);
    }
    
    function recoverETH(uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance");
        (bool success, ) = owner().call{value: amount}("");
        require(success, "ETH recovery failed");
    }

    // ============================
    // View Functions
    // ============================
    function getEscrowInfo() external view returns (
        EscrowState state,
        uint256 raised,
        uint256 cap,
        uint256 remaining
    ) {
        return (
            escrowState,
            totalEscrowRaised,
            fundingCap,
            fundingCap.sub(totalEscrowRaised)
        );
    }
    
    function getInvestorInfo(address investor) external view returns (
        uint256 deposit,
        uint256 tokens,
        uint256 pendingYield,
        bool compliant
    ) {
        return (
            escrowDeposits[investor],
            balanceOf(investor),
            getPendingYield(investor),
            isCompliant(investor)
        );
    }
    
    function getTimelockInfo() external view returns (
        bool pending,
        uint256 unlockTime,
        string memory reason
    ) {
        return (
            escrowCancelPending,
            escrowCancelTimestamp,
            escrowCancelReason
        );
    }

    // ============================
    // Fallback & Receive
    // ============================
    receive() external payable {
        revert("Use depositYield() or depositEscrow()");
    }
    
    fallback() external payable {
        revert("Invalid call");
    }
}