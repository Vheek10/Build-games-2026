// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";


interface IZKVerifier {
    function verifyProof(bytes calldata proof, bytes32[] calldata publicInputs) external view returns (bool);
}

/**
 * @title StrataDeedRWA_V10
 * @notice Ultimate RWA fractionalization platform: UUPS Upgradeable, Multi-Sig Governed, and ZK-Compliance Hardened.
 */
contract StrataDeedRWA is 
    Initializable, 
    ERC20Upgradeable, 
    OwnableUpgradeable, 
    PausableUpgradeable, 
    ReentrancyGuardUpgradeable, 
    UUPSUpgradeable 
{

    // Constants (Storage Slot-Safe)

    uint256 public constant SCALE = 1e18;
    uint256 public constant PROPERTY_TOKEN_SUPPLY = 1_000 * SCALE;
    uint256 public constant MULTISIG_THRESHOLD = 3;
    uint256 public constant EMERGENCY_WINDOW = 90 days;
    uint256 public constant CLAIM_PERIOD = 90 days;

    // Errors
    error InvalidArgs();
    error Unauthorized();
    error QuorumNotMet();
    error StateLocked();
    error CapExceeded();
    error NoDeposit();
    error RefundFailed();
    error PayoutFailed();
    error WindowNotOpen();
    error Slippage();
    error SystemPaused();
    error Replay();
    error IdentityReuse();
    error ZKInactive();
    error ZKFail();
    error NonCompliant();
    error NoTokensLeft();
    error AlreadyAdmin();
    error MinThreshold();

    // =========================================
    // State Variables (DO NOT REORDER)
    // =========================================

    uint256 public fundingCap;
    uint256 public totalEscrowLiability;
    uint256 public totalEscrowRaisedBeforeFinalization;
    uint256 public totalEscrowProcessed; 
    uint256 public totalTokensMinted;
    uint256 public lastActivityTimestamp;

    // Governance
    uint256 public governanceNonce;
    address[] public admins;
    mapping(address => bool) public isAdmin;
    mapping(address => uint256) private _adminIndex; // 1-based index
    mapping(bytes32 => mapping(address => bool)) public confirmations;

    // State Machine
    enum EscrowState { Funding, Finalized, Cancelled, Emergency }
    EscrowState public escrowState;
    uint256 public claimDeadline;
    uint256 public yieldDeadline;

    // Yield System
    uint256 public totalYieldUnclaimed;
    uint256 public accYieldPerShare;
    mapping(address => uint256) public rewardDebt;
    mapping(address => uint256) private _yieldBalances;
    mapping(address => uint256) public lastHoldingBlock;
    uint256 public minHoldingBlocks; 
    bool public yieldPaused;

    // Compliance
    mapping(address => uint256) public escrowDeposits;
    mapping(address => bytes32) private _credentialHashes;
    mapping(bytes32 => bool) public isCredentialRevoked;
    mapping(address => bool) public isWalletFrozen;
    mapping(bytes32 => bool) public credentialHashUsed;

    // ZK Privacy
    address public zkVerifier;
    mapping(bytes32 => bool) public usedNullifiers;

    // =========================================
    // Events
    // =========================================

    event ActionConfirmed(bytes32 indexed actionId, address indexed admin);
    event ActionExecuted(bytes32 indexed actionId, uint256 nonce);
    event EscrowStateUpdate(EscrowState state);
    event YieldAccrued(address indexed user, uint256 amount);
    event ZKVerifierUpdated(address indexed newVerifier);
    event EmergencyRefundTriggered(uint256 timestamp);
    event SafetyTriggered(string mechanism, bool active);
    event AdminAdded(address indexed admin);
    event AdminRemoved(address indexed admin);
    event ComplianceAction(address indexed wallet, string action);
    event TokensClaimed(address indexed user, uint256 amount);
    event YieldClaimed(address indexed user, uint256 amount);
    event UnclaimedTokensRecovered(uint256 amount);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    // =========================================
    // Initializer
    // =========================================

    function initialize(
        uint256 _cap, 
        address _owner, 
        address[] memory _admins
    ) public initializer {
        __ERC20_init("StrataDeedRWA", "SDRWA");
        __Ownable_init(_owner);
        __Pausable_init();
        __ReentrancyGuard_init();
        __UUPSUpgradeable_init();

        if (_cap == 0 || _admins.length < MULTISIG_THRESHOLD) revert InvalidArgs();
        fundingCap = _cap;
        for (uint256 i = 0; i < _admins.length; i++) {
            if (_admins[i] == address(0)) revert InvalidArgs();
            if (isAdmin[_admins[i]]) revert AlreadyAdmin();
            admins.push(_admins[i]);
            isAdmin[_admins[i]] = true;
            _adminIndex[_admins[i]] = admins.length;
        }
        
        minHoldingBlocks = 300; 
        lastActivityTimestamp = block.timestamp;
        escrowState = EscrowState.Funding;
    }

    // =========================================
    // Multi-Sig Engine
    // =========================================

    function getActionId(string memory action, address target, uint256 value) public view returns (bytes32) {
        return keccak256(abi.encode(action, target, value, governanceNonce));
    }

    function confirmAction(bytes32 actionId) external {
        if (!isAdmin[msg.sender]) revert Unauthorized();
        if (confirmations[actionId][msg.sender]) revert AlreadyAdmin();
        confirmations[actionId][msg.sender] = true;
        emit ActionConfirmed(actionId, msg.sender);
    }

    function _isReady(bytes32 actionId) internal view returns (bool) {
        uint256 count = 0;
        for (uint256 i = 0; i < admins.length; i++) {
            if (confirmations[actionId][admins[i]]) count++;
        }
        return count >= MULTISIG_THRESHOLD;
    }

    function _clearConfirmations(bytes32 actionId) internal {
        for (uint256 i = 0; i < admins.length; i++) {
            delete confirmations[actionId][admins[i]];
        }
    }

    function _incrementNonce() internal {
        unchecked { governanceNonce++; }
    }

    // =========================================
    // Governance Executions
    // =========================================

    function executeFinalizeEscrow() external nonReentrant {
        bytes32 actionId = getActionId("FINALIZE", address(this), 0);
        if (!_isReady(actionId)) revert QuorumNotMet();
        if (escrowState != EscrowState.Funding) revert StateLocked();

        totalEscrowRaisedBeforeFinalization = totalEscrowLiability;
        escrowState = EscrowState.Finalized;
        claimDeadline = block.timestamp + CLAIM_PERIOD;
        
        uint256 payout = totalEscrowLiability;
        totalEscrowLiability = 0;
        
        _clearConfirmations(actionId);
        _incrementNonce();
        
        (bool success, ) = owner().call{value: payout}("");
        if (!success) revert PayoutFailed();
        
        emit ActionExecuted(actionId, governanceNonce - 1);
        emit EscrowStateUpdate(EscrowState.Finalized);
    }

    function executeCancelEscrow() external {
        bytes32 actionId = getActionId("CANCEL", address(this), 0);
        if (!_isReady(actionId)) revert QuorumNotMet();
        if (escrowState != EscrowState.Funding) revert StateLocked();
        
        escrowState = EscrowState.Cancelled;
        _clearConfirmations(actionId);
        _incrementNonce();
        emit ActionExecuted(actionId, governanceNonce - 1);
        emit EscrowStateUpdate(EscrowState.Cancelled);
    }

    function executeSetYieldPaused(bool _paused) external {
        bytes32 actionId = getActionId(_paused ? "YIELD_PAUSE" : "YIELD_UNPAUSE", address(this), 0);
        if (!_isReady(actionId)) revert QuorumNotMet();

        yieldPaused = _paused;
        _clearConfirmations(actionId);
        _incrementNonce();
        emit SafetyTriggered("YIELD_PAUSE", _paused);
    }

    function executeSetMinHoldingBlocks(uint256 _blocks) external {
        bytes32 actionId = getActionId("SET_HOLDING_BLOCKS", address(this), _blocks);
        if (!_isReady(actionId)) revert QuorumNotMet();

        minHoldingBlocks = _blocks;
        _clearConfirmations(actionId);
        _incrementNonce();
    }

    function executeSetYieldDeadline(uint256 _deadline) external {
        bytes32 actionId = getActionId("SET_YIELD_DEADLINE", address(this), _deadline);
        if (!_isReady(actionId)) revert QuorumNotMet();

        yieldDeadline = _deadline;
        _clearConfirmations(actionId);
        _incrementNonce();
    }

    function executeSetZKVerifier(address _verifier) external {
        bytes32 actionId = getActionId("SET_VERIFIER", _verifier, 0);
        if (!_isReady(actionId)) revert QuorumNotMet();
        
        zkVerifier = _verifier;
        _clearConfirmations(actionId);
        _incrementNonce();
        emit ZKVerifierUpdated(_verifier);
    }

    function executeAddAdmin(address _newAdmin) external {
        if (_newAdmin == address(0)) revert InvalidArgs();
        if (isAdmin[_newAdmin]) revert AlreadyAdmin();
        bytes32 actionId = getActionId("ADD_ADMIN", _newAdmin, 0);
        if (!_isReady(actionId)) revert QuorumNotMet();
        
        admins.push(_newAdmin);
        isAdmin[_newAdmin] = true;
        _adminIndex[_newAdmin] = admins.length;
        _clearConfirmations(actionId);
        _incrementNonce();
        emit AdminAdded(_newAdmin);
    }

    function executeRemoveAdmin(address _admin) external {
        if (!isAdmin[_admin]) revert InvalidArgs();
        if (admins.length <= MULTISIG_THRESHOLD) revert MinThreshold();
        bytes32 actionId = getActionId("REMOVE_ADMIN", _admin, 0);
        if (!_isReady(actionId)) revert QuorumNotMet();

        isAdmin[_admin] = false;
        uint256 idx = _adminIndex[_admin] - 1;
        address lastAdmin = admins[admins.length - 1];
        
        admins[idx] = lastAdmin;
        _adminIndex[lastAdmin] = idx + 1;
        admins.pop();
        delete _adminIndex[_admin];

        _clearConfirmations(actionId);
        _incrementNonce();
        emit AdminRemoved(_admin);
    }

    function executeCompliance(address wallet, string calldata action) external {
        bytes32 actionId = getActionId(action, wallet, 0);
        if (!_isReady(actionId)) revert QuorumNotMet();

        if (keccak256(bytes(action)) == keccak256("FREEZE")) {
            isWalletFrozen[wallet] = true;
        } else if (keccak256(bytes(action)) == keccak256("UNFREEZE")) {
            isWalletFrozen[wallet] = false;
        } else if (keccak256(bytes(action)) == keccak256("REVOKE")) {
            bytes32 hash = _credentialHashes[wallet];
            isCredentialRevoked[hash] = true;
        }
        
        _clearConfirmations(actionId);
        _incrementNonce();
        emit ComplianceAction(wallet, action);
    }

    function pause() external {
        bytes32 actionId = getActionId("PAUSE", address(this), 0);
        if (!_isReady(actionId)) revert QuorumNotMet();
        _pause();
        _clearConfirmations(actionId);
        _incrementNonce();
    }

    function unpause() external {
        bytes32 actionId = getActionId("UNPAUSE", address(this), 0);
        if (!_isReady(actionId)) revert QuorumNotMet();
        _unpause();
        _clearConfirmations(actionId);
        _incrementNonce();
    }

    // =========================================
    // Upgradability
    // =========================================

    function _authorizeUpgrade(address newImplementation) internal override {
        bytes32 actionId = getActionId("UPGRADE_PROTOCOL", newImplementation, 0);
        if (!_isReady(actionId)) revert QuorumNotMet();
        _clearConfirmations(actionId);
        _incrementNonce();
    }

    // =========================================
    // Escrow & Corrected Pro-Rata Minting
    // =========================================

    function depositEscrow() external payable nonReentrant whenNotPaused {
        if (escrowState != EscrowState.Funding) revert StateLocked();
        if (!isCompliant(msg.sender)) revert NonCompliant();
        if (totalEscrowLiability + msg.value > fundingCap) revert CapExceeded();

        escrowDeposits[msg.sender] += msg.value;
        totalEscrowLiability += msg.value;
        lastActivityTimestamp = block.timestamp;
    }

    function refundOnCancel() external nonReentrant {
        if (escrowState != EscrowState.Cancelled) revert StateLocked();
        uint256 amount = escrowDeposits[msg.sender];
        if (amount == 0) revert NoDeposit();
        
        escrowDeposits[msg.sender] = 0;
        totalEscrowLiability -= amount;
        (bool success, ) = msg.sender.call{value: amount}("");
        if (!success) revert RefundFailed();
    }

    function executeEmergencyRefund() external {
        bytes32 actionId = getActionId("EMERGENCY_REFUND", address(this), 0);
        if (!_isReady(actionId)) revert QuorumNotMet();
        if (block.timestamp <= lastActivityTimestamp + EMERGENCY_WINDOW) revert WindowNotOpen();
        
        escrowState = EscrowState.Emergency;
        _clearConfirmations(actionId);
        _incrementNonce();
        emit EmergencyRefundTriggered(block.timestamp);
    }

    function claimEmergencyRefund() external nonReentrant {
        if (escrowState != EscrowState.Emergency) revert StateLocked();
        uint256 deposit = escrowDeposits[msg.sender];
        if (deposit == 0) revert NoDeposit();
        if (totalEscrowLiability == 0) revert InvalidArgs();
        
        uint256 bal = address(this).balance;
        uint256 availableEth = (bal > totalYieldUnclaimed) ? (bal - totalYieldUnclaimed) : 0;
        
        if (availableEth == 0 && bal > 0) {
            availableEth = bal; 
        }

        uint256 refundAmount = (deposit * availableEth) / totalEscrowLiability;
        
        escrowDeposits[msg.sender] = 0;
        totalEscrowLiability -= deposit;
        (bool success, ) = msg.sender.call{value: refundAmount}("");
        if (!success) revert RefundFailed();
    }

    function claimTokens(uint256 minTokensExpected) external nonReentrant {
        if (escrowState != EscrowState.Finalized) revert StateLocked();
        if (block.timestamp > claimDeadline) revert WindowNotOpen();
        if (!isCompliant(msg.sender)) revert NonCompliant();
        uint256 deposit = escrowDeposits[msg.sender];
        if (deposit == 0) revert NoDeposit();

        uint256 remainingTokens = PROPERTY_TOKEN_SUPPLY - totalTokensMinted;
        uint256 remainingEscrow = totalEscrowRaisedBeforeFinalization - totalEscrowProcessed;
        
        uint256 tokenAmount = (deposit == remainingEscrow) ? 
            remainingTokens : 
            (deposit * PROPERTY_TOKEN_SUPPLY) / totalEscrowRaisedBeforeFinalization;

        if (tokenAmount < minTokensExpected) revert Slippage();
        if (tokenAmount > remainingTokens) revert CapExceeded();

        escrowDeposits[msg.sender] = 0;
        totalEscrowProcessed += deposit;
        totalTokensMinted += tokenAmount;
        
        _mint(msg.sender, tokenAmount);
        rewardDebt[msg.sender] = (balanceOf(msg.sender) * accYieldPerShare) / SCALE;
        lastHoldingBlock[msg.sender] = block.number;
        emit TokensClaimed(msg.sender, tokenAmount);
    }

    function claimUnclaimedTokens() external {
        if (escrowState != EscrowState.Finalized) revert StateLocked();
        if (block.timestamp <= claimDeadline) revert WindowNotOpen();
        bytes32 actionId = getActionId("CLAIM_UNCLAIMED", address(this), 0);
        if (!_isReady(actionId)) revert QuorumNotMet();

        uint256 remainingTokens = PROPERTY_TOKEN_SUPPLY - totalTokensMinted;
        if (remainingTokens == 0) revert NoTokensLeft();

        totalTokensMinted += remainingTokens;
        _mint(owner(), remainingTokens);
        
        _clearConfirmations(actionId);
        _incrementNonce();
        emit UnclaimedTokensRecovered(remainingTokens);
    }

    // =========================================
    // Yield System (Circuit Breaker)
    // =========================================

    function depositYield() external payable onlyOwner {
        if (yieldPaused) revert SystemPaused();
        if (totalSupply() == 0) revert InvalidArgs();
        accYieldPerShare += (msg.value * SCALE) / totalSupply();
        totalYieldUnclaimed += msg.value;
    }

    function _update(address from, address to, uint256 amount) internal override {
        if (amount == 0) return;
        if (from != address(0)) {
            if (!isCompliant(from)) revert NonCompliant();
            _accrueYield(from);
        }
        if (to != address(0)) {
            if (!isCompliant(to)) revert NonCompliant();
            _accrueYield(to);
            lastHoldingBlock[to] = block.number;
        }
        super._update(from, to, amount);
        if (from != address(0)) rewardDebt[from] = (balanceOf(from) * accYieldPerShare) / SCALE;
        if (to != address(0)) rewardDebt[to] = (balanceOf(to) * accYieldPerShare) / SCALE;
    }

    function _accrueYield(address user) internal {
        if (yieldPaused) return;
        if (block.number < lastHoldingBlock[user] + minHoldingBlocks) return;
        uint256 balance = balanceOf(user);
        if (balance == 0) return;

        uint256 pending = (balance * accYieldPerShare) / SCALE;
        if (pending > rewardDebt[user]) {
            uint256 amount = pending - rewardDebt[user];
            _yieldBalances[user] += amount;
            rewardDebt[user] = pending;
            emit YieldAccrued(user, amount);
        }
    }

    function claimYield(uint256 minAmountExpected) external nonReentrant {
        if (yieldPaused) revert SystemPaused();
        if (yieldDeadline > 0 && block.timestamp > yieldDeadline) revert WindowNotOpen();
        if (!isCompliant(msg.sender)) revert NonCompliant();
        _accrueYield(msg.sender);
        uint256 amount = _yieldBalances[msg.sender];
        if (amount < minAmountExpected) revert Slippage();
        if (amount == 0) revert InvalidArgs();
        _yieldBalances[msg.sender] = 0;
        totalYieldUnclaimed -= amount;
        (bool success, ) = msg.sender.call{value: amount}("");
        if (!success) revert PayoutFailed();
        emit YieldClaimed(msg.sender, amount);
    }

    // =========================================
    // ZK Identity Helpers
    // =========================================

    function registerWithZKProof(bytes32 credHash, bytes calldata proof, bytes32 nullifier) external nonReentrant {
        if (zkVerifier == address(0)) revert ZKInactive();
        if (usedNullifiers[nullifier]) revert Replay();
        if (credentialHashUsed[credHash]) revert IdentityReuse();
        
        bytes32[] memory publicInputs = new bytes32[](2);
        publicInputs[0] = credHash;
        publicInputs[1] = nullifier;
        
        if (!IZKVerifier(zkVerifier).verifyProof(proof, publicInputs)) revert ZKFail();
        
        _credentialHashes[msg.sender] = credHash;
        credentialHashUsed[credHash] = true;
        usedNullifiers[nullifier] = true;
    }

    function isCompliant(address wallet) public view returns (bool) {
        if (isWalletFrozen[wallet]) return false;
        bytes32 hash = _credentialHashes[wallet];
        return hash != bytes32(0) && !isCredentialRevoked[hash];
    }

    function getInvestorInfo(address inv) external view returns (uint256 dep, uint256 bal, uint256 yield, bool comp) {
        uint256 pending = 0;
        if (block.number >= lastHoldingBlock[inv] + minHoldingBlocks) {
            uint256 balance = balanceOf(inv);
            uint256 raw = (balance * accYieldPerShare) / SCALE;
            pending = _yieldBalances[inv] + (raw > rewardDebt[inv] ? raw - rewardDebt[inv] : 0);
        } else {
            pending = _yieldBalances[inv];
        }
        return (escrowDeposits[inv], balanceOf(inv), pending, isCompliant(inv));
    }

    receive() external payable {
        if (msg.sender != owner()) revert Unauthorized();
    }

    uint256[50] private __gap;
}
