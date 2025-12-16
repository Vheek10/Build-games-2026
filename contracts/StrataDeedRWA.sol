// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/// @title StrataDeed Property Token & Escrow
/// @notice Manages fractional ownership of real estate assets with built-in compliance and escrow.
/// @dev Implements ERC20 with restricted transfers, funding escrow, and yield distribution.
contract StrataDeedRWA is ERC20, Ownable, Pausable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // =========================================
    // Constants & State Variables
    // =========================================

    uint256 public constant PROPERTY_TOKEN_SUPPLY = 1_000 * 10**18;
    uint256 public minDepositForTokens = 0.0001 ether;
    uint256 private constant TIMELOCK_DURATION = 2 days;

    // Compliance Mappings
    mapping(address => bytes32) private _credentialHashes;
    mapping(bytes32 => bool) public isCredentialRevoked;
    mapping(address => bool) public isWalletFrozen;

    // Escrow State
    enum EscrowState { Funding, Finalized, Cancelled }
    EscrowState public escrowState;
    uint256 public immutable fundingCap;
    uint256 public totalEscrowRaised;
    mapping(address => uint256) public escrowDeposits;
    uint256 public totalEscrowRaisedBeforeFinalization;

    // Escrow Cancellation Logic
    uint256 public escrowCancelTimestamp;
    string public escrowCancelReason;
    bool public escrowCancelPending;

    // Yield System
    uint256 public accYieldPerShare;
    mapping(address => uint256) public rewardDebt;
    uint256 public totalYieldDistributed;
    mapping(address => uint256) private _yieldBalances;

    // =========================================
    // Events
    // =========================================

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
    event MinDepositChanged(uint256 oldValue, uint256 newValue);

    // =========================================
    // Modifiers
    // =========================================

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

    // =========================================
    // Constructor
    // =========================================

    constructor(
        uint256 _fundingCap,
        address _initialOwner
    ) ERC20("StrataDeed Property Token 1", "SDPT-1") Ownable(_initialOwner) {
        require(_fundingCap > 0, "Funding cap must be > 0");
        fundingCap = _fundingCap;
        escrowState = EscrowState.Funding;
    }

    // =========================================
    // Compliance Functions
    // =========================================

    /// @notice Registers a credential hash for a wallet (ZK-KYC).
    /// @param wallet The address to register.
    /// @param credentialHash The ZK proof hash.
    function registerCredential(address wallet, bytes32 credentialHash) external onlyOwner {
        require(wallet != address(0), "Invalid wallet");
        require(credentialHash != bytes32(0), "Invalid hash");
        _credentialHashes[wallet] = credentialHash;
        emit CredentialApproved(wallet, credentialHash);
    }

    /// @notice Revokes a credential hash, making associated wallets non-compliant.
    function revokeCredentialHash(bytes32 credentialHash, string memory reason) external onlyOwner {
        isCredentialRevoked[credentialHash] = true;
        emit CredentialRevoked(credentialHash, reason);
    }

    /// @notice Freezes a specific wallet from transacting.
    function freezeWallet(address wallet) external onlyOwner {
        isWalletFrozen[wallet] = true;
        emit WalletFrozen(wallet);
    }

    /// @notice Unfreezes a wallet.
    function unfreezeWallet(address wallet) external onlyOwner {
        isWalletFrozen[wallet] = false;
        emit WalletUnfrozen(wallet);
    }

    /// @notice Checks if a wallet is compliant (not frozen, valid credential, not revoked).
    function isCompliant(address wallet) public view returns (bool) {
        if (isWalletFrozen[wallet]) return false;
        bytes32 hash = _credentialHashes[wallet];
        if (hash == bytes32(0)) return false;
        if (isCredentialRevoked[hash]) return false;
        return true;
    }

    // =========================================
    // ERC20 Overrides with Logic
    // =========================================

    /// @dev Overrides ERC20 _update to enforce compliance and accrue yield.
    function _update(address from, address to, uint256 amount) internal override {
        // Enforce compliance on transfers (skip for minting/burning if handled elsewhere, but safe to check)
        if (from != address(0) && to != address(0)) {
            require(!paused(), "Contract is paused");
            require(isCompliant(from), "Sender not compliant");
            require(isCompliant(to), "Receiver not compliant");
        }

        uint256 fromBalance = balanceOf(from);
        uint256 toBalance = balanceOf(to);

        // Capture rewards state before balance change
        rewardDebt[from] = (fromBalance * accYieldPerShare) / 1e18;
        rewardDebt[to] = (toBalance * accYieldPerShare) / 1e18;

        super._update(from, to, amount);

        // Update yield state after balance change
        if (from != address(0) && to != address(0)) {
            _accrueYield(from);
            _accrueYield(to);
        }
    }

    // =========================================
    // Escrow Functions
    // =========================================

    /// @notice Deposits ETH into the escrow during Funding state.
    /// @dev Requires the sender to be compliant and the contract not paused.
    function depositEscrow() external payable nonReentrant onlyWhenFunding onlyCompliant(msg.sender) whenNotPaused {
        require(totalEscrowRaised + msg.value <= fundingCap, "Cap exceeded");
        require(msg.value > 0, "Zero deposit");
        require(msg.value >= minDepositForTokens, "Deposit below minimum for tokens");

        escrowDeposits[msg.sender] += msg.value;
        totalEscrowRaised += msg.value;

        emit EscrowDeposit(msg.sender, msg.value);
    }

    /// @notice Finalizes the escrow, transferring funds to the owner.
    function finalizeEscrow() external onlyOwner nonReentrant onlyWhenFunding {
        require(totalEscrowRaised > 0, "No funds raised");

        escrowState = EscrowState.Finalized;
        totalEscrowRaisedBeforeFinalization = totalEscrowRaised;

        uint256 amountToRelease = totalEscrowRaised;
        totalEscrowRaised = 0;

        (bool success, ) = owner().call{value: amountToRelease}("");
        require(success, "Fund release failed");

        emit EscrowFinalized(amountToRelease, block.timestamp);
    }

    /// @notice Claims property tokens after escrow finalization.
    function claimTokens() external nonReentrant onlyWhenFinalized onlyCompliant(msg.sender) {
        uint256 depositAmount = escrowDeposits[msg.sender];
        require(depositAmount > 0, "No deposits");
        require(totalEscrowRaisedBeforeFinalization > 0, "Invalid total raised");

        // Calculate token share based on contribution
        uint256 tokenAmount = (depositAmount * PROPERTY_TOKEN_SUPPLY) / totalEscrowRaisedBeforeFinalization;
        require(tokenAmount > 0, "Deposit too small for any tokens");

        escrowDeposits[msg.sender] = 0;
        _mint(msg.sender, tokenAmount);
    }

    /// @notice Initiates the cancellation process (with a timelock).
    function requestCancelEscrow(string memory reason) external onlyOwner onlyWhenFunding {
        require(!escrowCancelPending, "Cancellation already pending");

        escrowCancelPending = true;
        escrowCancelReason = reason;
        escrowCancelTimestamp = block.timestamp + TIMELOCK_DURATION;

        emit EscrowCancellationRequested(block.timestamp, reason, escrowCancelTimestamp);
    }

    /// @notice Executes cancellation after timelock expires.
    function executeCancelEscrow() external onlyOwner onlyWhenFunding {
        require(escrowCancelPending, "No pending cancellation");
        require(block.timestamp >= escrowCancelTimestamp, "Timelock not expired");
        require(escrowState == EscrowState.Funding, "Invalid state");

        escrowState = EscrowState.Cancelled;
        escrowCancelPending = false;

        emit EscrowCancelled(totalEscrowRaised, escrowCancelReason);
    }

    /// @notice Withdraws deposited funds if escrow is cancelled.
    function withdrawRefund() external nonReentrant onlyWhenCancelled onlyCompliant(msg.sender) {
        uint256 amount = escrowDeposits[msg.sender];
        require(amount > 0, "Nothing to refund");

        escrowDeposits[msg.sender] = 0;

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Refund failed");

        emit RefundClaimed(msg.sender, amount);
    }

    // =========================================
    // Yield Functions
    // =========================================

    /// @notice Distributes yield (ETH) to all token holders.
    function depositYield() external payable onlyOwner {
        require(totalSupply() > 0, "No tokens minted yet");
        require(msg.value > 0, "Zero yield");

        accYieldPerShare += (msg.value * 1e18) / totalSupply();
        totalYieldDistributed += msg.value;

        emit YieldDeposited(msg.value, accYieldPerShare);
    }

    /// @dev Updates the yield balance for a user.
    function _accrueYield(address user) internal {
        uint256 balance = balanceOf(user);
        if (balance == 0) return;

        uint256 accumulatedYield = (balance * accYieldPerShare) / 1e18;
        uint256 userDebt = rewardDebt[user];

        if (accumulatedYield > userDebt) {
            uint256 pending = accumulatedYield - userDebt;

            rewardDebt[user] = accumulatedYield;
            _yieldBalances[user] += pending;

            emit YieldAccrued(user, pending);
        }
    }

    /// @notice Returns the pending yield for a user.
    function getPendingYield(address user) public view returns (uint256) {
        uint256 balance = balanceOf(user);
        if (balance == 0) return _yieldBalances[user];

        uint256 pending = (balance * accYieldPerShare) / 1e18 - rewardDebt[user];
        return _yieldBalances[user] + pending;
    }

    /// @notice Claims accumulated yield.
    function claimYield() external nonReentrant onlyCompliant(msg.sender) {
        _accrueYield(msg.sender);

        uint256 amount = _yieldBalances[msg.sender];
        require(amount > 0, "No yield to claim");

        _yieldBalances[msg.sender] = 0;

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Yield claim failed");

        emit YieldWithdrawn(msg.sender, amount);
    }

    /// @notice Claims yield for multiple users (Airdrop/Push mechanism).
    function claimYieldFor(address[] calldata users) external onlyOwner nonReentrant {
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

    // =========================================
    // Admin & Utility Functions
    // =========================================

    function pauseContract() external onlyOwner {
        _pause();
    }

    function unpauseContract() external onlyOwner {
        _unpause();
    }

    function setMinDeposit(uint256 newMinDeposit) external onlyOwner onlyWhenFunding {
        emit MinDepositChanged(minDepositForTokens, newMinDeposit);
        minDepositForTokens = newMinDeposit;
    }

    /// @notice Recovers accidentally sent ERC20 tokens.
    function recoverERC20(address tokenAddress, uint256 amount) external onlyOwner {
        require(tokenAddress != address(0), "Invalid token");
        require(tokenAddress != address(this), "Cannot recover property token");

        IERC20(tokenAddress).safeTransfer(owner(), amount);
    }

    /// @notice Recovers leftover ETH in the contract (use with caution).
    function recoverETH(uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance");
        (bool success, ) = owner().call{value: amount}("");
        require(success, "ETH recovery failed");
    }

    // =========================================
    // Getters / View Functions
    // =========================================

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
            fundingCap - totalEscrowRaised
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

    // =========================================
    // Receive & Fallback
    // =========================================

    receive() external payable {
        revert("Use depositYield() or depositEscrow()");
    }

    fallback() external payable {
        revert("Invalid call");
    }
}