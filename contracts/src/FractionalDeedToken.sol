// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title FractionalDeedToken
 * @author StrataDeed Team
 * @notice ERC-20 token representing fractional ownership shares of a single
 *         real estate property deed on Avalanche.
 * @dev One FractionalDeedToken contract is deployed per fractionalized property.
 *      Ported from the Sui Move `property_rwa.move` module.
 *
 *      Key features:
 *        - Fixed total supply minted at construction (no further inflation).
 *        - Compliance whitelist: only whitelisted addresses may hold tokens.
 *        - Pausable transfers for emergency circuit breaker.
 *        - Yield distribution by the treasury admin.
 */
contract FractionalDeedToken is
    ERC20,
    ERC20Burnable,
    AccessControl,
    Pausable,
    ReentrancyGuard
{
    // =========================================================================
    // Roles
    // =========================================================================

    /// @notice Role for the treasury administrator (escrow, yield distribution).
    bytes32 public constant TREASURY_ADMIN_ROLE = keccak256("TREASURY_ADMIN_ROLE");

    /// @notice Role for compliance officers who manage the whitelist.
    bytes32 public constant COMPLIANCE_ROLE = keccak256("COMPLIANCE_ROLE");

    // =========================================================================
    // State
    // =========================================================================

    /// @notice The property identifier this token represents.
    string public propertyId;

    /// @notice The corresponding StrataDeedNFT token ID (the deed being fractionalized).
    uint256 public deedTokenId;

    /// @notice Total supply cap — set once at construction, never changes.
    uint256 public immutable supplyCap;

    // --- Escrow state machine (mirrors Move's 4-state model) ---

    enum EscrowState { Funding, Finalized, Cancelled, Emergency }

    /// @notice Current escrow state.
    EscrowState public escrowState;

    /// @notice Maximum funding this escrow will accept (in wei).
    uint256 public fundingCap;

    /// @notice Total AVAX raised so far.
    uint256 public totalEscrowRaised;

    /// @notice Total escrow processed after finalization.
    uint256 public totalEscrowProcessed;

    /// @notice Total yield distributed (in wei).
    uint256 public distributedYield;

    /// @notice Per-withdrawal limit = fundingCap / 10.
    uint256 public maxWithdrawalPerTx;

    // --- Per-depositor tracking (H-1 fix) ---

    /// @notice Individual deposit balances for refund tracking.
    mapping(address => uint256) public deposits;

    /// @notice Total AVAX withdrawn from treasury post-finalization.
    uint256 public totalWithdrawn;

    // --- Compliance whitelist ---

    /// @notice Whether an address is whitelisted for holding tokens.
    mapping(address => bool) public whitelisted;

    /// @notice If true, transfers are restricted to whitelisted addresses only.
    bool public whitelistEnforced;

    /// @notice Maximum batch size for whitelist operations.
    uint256 public constant MAX_BATCH_SIZE = 200;

    // =========================================================================
    // Events
    // =========================================================================

    event EscrowDeposit(address indexed depositor, uint256 amount);
    event EscrowStateChanged(EscrowState newState);
    event FundsWithdrawn(address indexed beneficiary, uint256 amount);
    event YieldDistributed(address indexed recipient, uint256 amount);
    event WhitelistUpdated(address indexed account, bool status);
    event WhitelistEnforcementChanged(bool enforced);

    // =========================================================================
    // Errors
    // =========================================================================

    error NotInFundingState();
    error NotInFinalizedState();
    error InvalidFundingCap();
    error ExceedsFundingCap(uint256 attempted, uint256 remaining);
    error InsufficientTreasuryBalance(uint256 requested, uint256 available);
    error ExceedsWithdrawalLimit(uint256 requested, uint256 limit);
    error InvalidEscrowStateForAction(EscrowState current);
    error NotWhitelisted(address account);
    error ZeroAmount();
    error ZeroAddress();
    error BatchTooLarge(uint256 size, uint256 max);
    error NoDepositToRefund(address account);

    // =========================================================================
    // Constructor
    // =========================================================================

    /**
     * @param name_          Token name (e.g. "StrataDeed PROP-001 Shares").
     * @param symbol_        Token symbol (e.g. "SD-001").
     * @param admin          Address receiving admin and treasury roles.
     * @param propertyId_    Human-readable property identifier.
     * @param deedTokenId_   The StrataDeedNFT token ID for the underlying deed.
     * @param totalSupply_   Total fractional shares to mint (with 18 decimals).
     * @param fundingCap_    Maximum AVAX the escrow will accept (in wei).
     */
    constructor(
        string memory name_,
        string memory symbol_,
        address admin,
        string memory propertyId_,
        uint256 deedTokenId_,
        uint256 totalSupply_,
        uint256 fundingCap_
    ) ERC20(name_, symbol_) {
        if (fundingCap_ == 0) revert InvalidFundingCap();

        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(TREASURY_ADMIN_ROLE, admin);
        _grantRole(COMPLIANCE_ROLE, admin);

        propertyId = propertyId_;
        deedTokenId = deedTokenId_;
        supplyCap = totalSupply_;
        fundingCap = fundingCap_;
        maxWithdrawalPerTx = fundingCap_ / 10 > 0 ? fundingCap_ / 10 : 1;
        escrowState = EscrowState.Funding;

        // Mint entire supply to admin (who will distribute / sell shares).
        _mint(admin, totalSupply_);
    }

    // =========================================================================
    // Escrow — Deposits
    // =========================================================================

    /**
     * @notice Deposit AVAX into the property escrow during the Funding phase.
     */
    function depositEscrow() external payable whenNotPaused nonReentrant {
        if (escrowState != EscrowState.Funding) revert NotInFundingState();
        if (msg.value == 0) revert ZeroAmount();
        uint256 remaining = fundingCap - totalEscrowRaised;
        if (msg.value > remaining) revert ExceedsFundingCap(msg.value, remaining);

        totalEscrowRaised += msg.value;
        deposits[msg.sender] += msg.value;
        emit EscrowDeposit(msg.sender, msg.value);
    }

    // =========================================================================
    // Escrow — State Transitions (Admin)
    // =========================================================================

    /// @notice Finalize the escrow — no more deposits accepted.
    function finalizeEscrow()
        external
        onlyRole(TREASURY_ADMIN_ROLE)
    {
        if (escrowState != EscrowState.Funding) revert NotInFundingState();
        escrowState = EscrowState.Finalized;
        totalEscrowProcessed = totalEscrowRaised;
        emit EscrowStateChanged(EscrowState.Finalized);
    }

    /// @notice Cancel the escrow — enables refund withdrawals.
    function cancelEscrow()
        external
        onlyRole(TREASURY_ADMIN_ROLE)
    {
        if (escrowState != EscrowState.Funding) revert NotInFundingState();
        escrowState = EscrowState.Cancelled;
        emit EscrowStateChanged(EscrowState.Cancelled);
    }

    /// @notice Trigger emergency mode — circuit breaker.
    function triggerEmergency()
        external
        onlyRole(TREASURY_ADMIN_ROLE)
    {
        escrowState = EscrowState.Emergency;
        emit EscrowStateChanged(EscrowState.Emergency);
    }

    // =========================================================================
    // Escrow — Withdrawals & Yield (Admin)
    // =========================================================================

    /**
     * @notice Withdraw AVAX from the treasury (admin-only, post-finalization).
     * @param amount  Amount in wei to withdraw.
     * @param to      Beneficiary address.
     */
    function withdrawFunds(uint256 amount, address payable to)
        external
        onlyRole(TREASURY_ADMIN_ROLE)
        nonReentrant
    {
        if (amount == 0) revert ZeroAmount();
        if (to == address(0)) revert ZeroAddress();
        if (escrowState == EscrowState.Funding)
            revert InvalidEscrowStateForAction(escrowState);
        if (escrowState == EscrowState.Emergency)
            revert InvalidEscrowStateForAction(escrowState);
        if (amount > address(this).balance)
            revert InsufficientTreasuryBalance(amount, address(this).balance);
        if (amount > maxWithdrawalPerTx)
            revert ExceedsWithdrawalLimit(amount, maxWithdrawalPerTx);

        // Effects before interaction (CEI)
        totalWithdrawn += amount;

        (bool success, ) = to.call{value: amount}("");
        require(success, "Transfer failed");

        emit FundsWithdrawn(to, amount);
    }

    /**
     * @notice Refund a depositor's full deposit (only in Cancelled state).
     * @param depositor The address to refund.
     */
    function refundDepositor(address payable depositor)
        external
        onlyRole(TREASURY_ADMIN_ROLE)
        nonReentrant
    {
        if (escrowState != EscrowState.Cancelled)
            revert InvalidEscrowStateForAction(escrowState);
        uint256 refundAmount = deposits[depositor];
        if (refundAmount == 0) revert NoDepositToRefund(depositor);

        // Effects before interaction (CEI)
        deposits[depositor] = 0;

        (bool success, ) = depositor.call{value: refundAmount}("");
        require(success, "Refund failed");

        emit FundsWithdrawn(depositor, refundAmount);
    }

    /**
     * @notice Distribute yield (rental income) to a token holder.
     * @param recipient  The holder to receive yield.
     * @param amount     Amount in wei.
     */
    function distributeYield(address payable recipient, uint256 amount)
        external
        onlyRole(TREASURY_ADMIN_ROLE)
        nonReentrant
    {
        if (amount == 0) revert ZeroAmount();
        if (escrowState != EscrowState.Finalized)
            revert NotInFinalizedState();
        if (amount > address(this).balance)
            revert InsufficientTreasuryBalance(amount, address(this).balance);

        distributedYield += amount;

        (bool success, ) = recipient.call{value: amount}("");
        require(success, "Transfer failed");

        emit YieldDistributed(recipient, amount);
    }

    // =========================================================================
    // Compliance Whitelist
    // =========================================================================

    /**
     * @notice Add or remove an address from the compliance whitelist.
     * @param account  The address.
     * @param status   true = whitelisted, false = removed.
     */
    function setWhitelisted(address account, bool status)
        external
        onlyRole(COMPLIANCE_ROLE)
    {
        whitelisted[account] = status;
        emit WhitelistUpdated(account, status);
    }

    /**
     * @notice Batch-whitelist multiple addresses.
     * @param accounts Array of addresses.
     * @param status   Whitelist status to set.
     */
    function batchWhitelist(address[] calldata accounts, bool status)
        external
        onlyRole(COMPLIANCE_ROLE)
    {
        if (accounts.length > MAX_BATCH_SIZE)
            revert BatchTooLarge(accounts.length, MAX_BATCH_SIZE);
        for (uint256 i = 0; i < accounts.length; i++) {
            whitelisted[accounts[i]] = status;
            emit WhitelistUpdated(accounts[i], status);
        }
    }

    /// @notice Toggle whether whitelist enforcement is active.
    function setWhitelistEnforced(bool enforced)
        external
        onlyRole(COMPLIANCE_ROLE)
    {
        whitelistEnforced = enforced;
        emit WhitelistEnforcementChanged(enforced);
    }

    // =========================================================================
    // Pausable
    // =========================================================================

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    // =========================================================================
    // View Functions
    // =========================================================================

    /// @notice Get the current treasury balance.
    function treasuryBalance() external view returns (uint256) {
        return address(this).balance;
    }

    // =========================================================================
    // Internal Overrides
    // =========================================================================

    /**
     * @dev Enforce pause + whitelist on every transfer (including mint/burn).
     */
    function _update(
        address from,
        address to,
        uint256 value
    ) internal override whenNotPaused {
        // Whitelist enforcement (skip for mints and burns)
        if (whitelistEnforced && from != address(0) && to != address(0)) {
            if (!whitelisted[from]) revert NotWhitelisted(from);
            if (!whitelisted[to]) revert NotWhitelisted(to);
        }
        super._update(from, to, value);
    }

    /// @notice Allow the contract to receive AVAX for yield deposits (only in Finalized state).
    receive() external payable {
        require(
            escrowState == EscrowState.Finalized,
            "Direct deposits only allowed in Finalized state"
        );
    }
}
