// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title IZKVerifier
 * @notice Interface for pluggable ZK proof verification backends.
 * @dev Implement this interface with a Groth16, PLONK, or other SNARK verifier
 *      and register it with ZKComplianceVerifier via `setExternalVerifier()`.
 */
interface IZKVerifier {
    /**
     * @notice Verify a ZK proof.
     * @param proof       The serialized proof bytes.
     * @param publicInputs The public inputs to the circuit.
     * @return valid       True if the proof is valid.
     */
    function verifyProof(
        bytes calldata proof,
        uint256[] calldata publicInputs
    ) external view returns (bool valid);
}

/**
 * @title ZKComplianceVerifier
 * @author StrataDeed Team
 * @notice On-chain compliance verification using Merkle proofs and an optional
 *         pluggable ZK-SNARK verifier backend.
 * @dev This contract provides two verification paths:
 *
 *      1. **Merkle Proof Verification** (lightweight, gas-efficient):
 *         A compliance Merkle root is maintained by a compliance officer.
 *         Users prove inclusion in the whitelist by submitting a Merkle proof
 *         against their leaf = keccak256(abi.encodePacked(address)).
 *
 *      2. **ZK-SNARK Verification** (privacy-preserving, heavier):
 *         An external `IZKVerifier` contract can be registered to verify
 *         Groth16 / PLONK proofs. This allows users to prove KYC compliance
 *         without revealing any personal data on-chain.
 *
 *      Both paths result in the address being marked as "compliant" for use
 *      by StrataDeedCore when gating transfers and fractional ownership.
 *
 *      **Why not a full Groth16 verifier inline?**
 *      A Groth16 verifier for a real circuit with many constraints can cost
 *      200k-300k+ gas per verification. For the Build Games 2026 MVP we ship
 *      Merkle proofs (< 50k gas) and expose the IZKVerifier interface so a
 *      production SNARK verifier can be hot-swapped later.
 */
contract ZKComplianceVerifier is AccessControl, Pausable {
    // =========================================================================
    // Roles
    // =========================================================================

    /// @notice Role for compliance officers who manage the Merkle root.
    bytes32 public constant COMPLIANCE_ROLE = keccak256("COMPLIANCE_ROLE");

    // =========================================================================
    // State
    // =========================================================================

    /// @notice The current Merkle root of the compliance whitelist.
    bytes32 public complianceMerkleRoot;

    /// @notice Optional external ZK verifier contract.
    IZKVerifier public externalVerifier;

    /// @notice Mapping: address → whether it has been verified as compliant.
    mapping(address => bool) public isCompliant;

    /// @notice Mapping: address → the commitment hash stored on verification.
    mapping(address => bytes32) public commitments;

    /// @notice Counter of total verified addresses.
    uint256 public totalVerified;

    // =========================================================================
    // Events
    // =========================================================================

    event MerkleRootUpdated(bytes32 indexed oldRoot, bytes32 indexed newRoot);
    event AddressVerifiedByMerkle(address indexed account);
    event AddressVerifiedByZKProof(address indexed account);
    event ComplianceRevoked(address indexed account);
    event CommitmentStored(address indexed account, bytes32 commitment);
    event ExternalVerifierUpdated(address indexed verifier);

    // =========================================================================
    // Errors
    // =========================================================================

    error InvalidMerkleProof();
    error AlreadyCompliant(address account);
    error ZKVerifierNotSet();
    error ZKProofInvalid();
    error ZeroAddress();
    error EmptyProof();

    // =========================================================================
    // Constructor
    // =========================================================================

    /**
     * @param admin The address receiving DEFAULT_ADMIN_ROLE and COMPLIANCE_ROLE.
     */
    constructor(address admin) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(COMPLIANCE_ROLE, admin);
    }

    // =========================================================================
    // Merkle Root Management
    // =========================================================================

    /**
     * @notice Update the compliance Merkle root.
     * @param newRoot The new Merkle root.
     */
    function setMerkleRoot(bytes32 newRoot)
        external
        onlyRole(COMPLIANCE_ROLE)
    {
        bytes32 oldRoot = complianceMerkleRoot;
        complianceMerkleRoot = newRoot;
        emit MerkleRootUpdated(oldRoot, newRoot);
    }

    // =========================================================================
    // Merkle Proof Verification
    // =========================================================================

    /**
     * @notice Verify your inclusion in the compliance whitelist via Merkle proof.
     * @param proof  Array of sibling hashes forming the Merkle proof.
     * @dev The leaf is computed as keccak256(abi.encodePacked(msg.sender)).
     */
    function verifyByMerkleProof(bytes32[] calldata proof)
        external
        whenNotPaused
    {
        if (proof.length == 0) revert EmptyProof();
        if (isCompliant[msg.sender]) revert AlreadyCompliant(msg.sender);

        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        if (!_verifyMerkle(proof, complianceMerkleRoot, leaf)) {
            revert InvalidMerkleProof();
        }

        isCompliant[msg.sender] = true;
        totalVerified++;
        emit AddressVerifiedByMerkle(msg.sender);
    }

    /**
     * @notice Check a Merkle proof without changing state (view helper).
     * @param account The address to check.
     * @param proof   Merkle proof.
     * @return valid  Whether the proof is valid for the given account.
     */
    function checkMerkleProof(address account, bytes32[] calldata proof)
        external
        view
        returns (bool valid)
    {
        bytes32 leaf = keccak256(abi.encodePacked(account));
        return _verifyMerkle(proof, complianceMerkleRoot, leaf);
    }

    // =========================================================================
    // ZK-SNARK Verification
    // =========================================================================

    /**
     * @notice Register an external ZK verifier contract (e.g. Groth16 verifier).
     * @param verifier The IZKVerifier-compatible contract address.
     */
    function setExternalVerifier(address verifier)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        if (verifier == address(0)) revert ZeroAddress();
        externalVerifier = IZKVerifier(verifier);
        emit ExternalVerifierUpdated(verifier);
    }

    /**
     * @notice Verify compliance via an external ZK proof.
     * @param proof        Serialized proof bytes.
     * @param publicInputs Public inputs to the ZK circuit.
     * @dev The first public input is expected to encode the caller's address.
     */
    function verifyByZKProof(
        bytes calldata proof,
        uint256[] calldata publicInputs
    ) external whenNotPaused {
        if (address(externalVerifier) == address(0)) revert ZKVerifierNotSet();
        if (isCompliant[msg.sender]) revert AlreadyCompliant(msg.sender);

        bool valid = externalVerifier.verifyProof(proof, publicInputs);
        if (!valid) revert ZKProofInvalid();

        isCompliant[msg.sender] = true;
        totalVerified++;
        emit AddressVerifiedByZKProof(msg.sender);
    }

    // =========================================================================
    // Commitment Storage
    // =========================================================================

    /**
     * @notice Store a commitment hash for private data (ZK-ready).
     * @param commitment The keccak256 hash of the user's private data.
     */
    function storeCommitment(bytes32 commitment) external whenNotPaused {
        commitments[msg.sender] = commitment;
        emit CommitmentStored(msg.sender, commitment);
    }

    // =========================================================================
    // Compliance Administration
    // =========================================================================

    /**
     * @notice Manually grant compliance status (for off-chain KYC flows).
     * @param account The address to approve.
     */
    function grantCompliance(address account)
        external
        onlyRole(COMPLIANCE_ROLE)
    {
        if (account == address(0)) revert ZeroAddress();
        if (!isCompliant[account]) {
            isCompliant[account] = true;
            totalVerified++;
        }
        emit AddressVerifiedByMerkle(account); // reuse event for admin grant
    }

    /**
     * @notice Revoke compliance status of an address.
     * @param account The address to revoke.
     */
    function revokeCompliance(address account)
        external
        onlyRole(COMPLIANCE_ROLE)
    {
        if (isCompliant[account]) {
            isCompliant[account] = false;
            if (totalVerified > 0) totalVerified--;
        }
        emit ComplianceRevoked(account);
    }

    /**
     * @notice Batch-grant compliance for multiple addresses.
     * @param accounts Array of addresses.
     */
    function batchGrantCompliance(address[] calldata accounts)
        external
        onlyRole(COMPLIANCE_ROLE)
    {
        for (uint256 i = 0; i < accounts.length; i++) {
            if (!isCompliant[accounts[i]] && accounts[i] != address(0)) {
                isCompliant[accounts[i]] = true;
                totalVerified++;
                emit AddressVerifiedByMerkle(accounts[i]);
            }
        }
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
    // Internal — Merkle Proof Verification
    // =========================================================================

    /**
     * @dev Standard Merkle inclusion proof verification.
     *      Sorts pairs before hashing (OpenZeppelin-compatible approach).
     */
    function _verifyMerkle(
        bytes32[] calldata proof,
        bytes32 root,
        bytes32 leaf
    ) internal pure returns (bool) {
        bytes32 computedHash = leaf;
        for (uint256 i = 0; i < proof.length; i++) {
            bytes32 proofElement = proof[i];
            if (computedHash <= proofElement) {
                computedHash = keccak256(
                    abi.encodePacked(computedHash, proofElement)
                );
            } else {
                computedHash = keccak256(
                    abi.encodePacked(proofElement, computedHash)
                );
            }
        }
        return computedHash == root;
    }
}
