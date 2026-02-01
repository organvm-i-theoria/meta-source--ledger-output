# Phase 5: The Perpetual Ledger - Specification

## 1. System Overview
**The Source** is an autonomous, on-chain generative state machine. Unlike typical generative art projects that wait for a user to "mint" to generate an output, The Source exists in a state of constant, perpetual evolution. It is a "Clockwork Universe" that ticks forward block by block, driven by an autonomous **Keeper** mechanism.

## 2. Core Components

### 2.1 The Source Contract (The Matrix)
*   **Role:** Holds the "Universal State" (current cipher rules, entropy pools, global parameters).
*   **Mechanism:** Contains a `cascade()` function. When called, it reads the current state + new block entropy -> calculates the *next* state.
*   **Immutability:** The logic for how the universe evolves is locked. No admin can change the laws of physics once deployed.

### 2.2 The Keeper (The Prime Mover)
*   **Role:** Ensures the `cascade()` function is called at regular intervals (The "Heartbeat").
*   **Implementation:** Utilization of decentralized automation networks (e.g., Chainlink Automation, Gelato Network) to act as the "heart" that keeps the blood pumping.
*   **Redundancy:** If the automated keeper fails, the protocol effectively "pauses" until *any* actor (human or bot) calls `cascade()`, restarting the flow exactly where it left off.

### 2.3 The Waterfall (State History)
*   **Concept:** The history of all state transitions is stored (or indexed) on-chain.
*   **Data:** Each step in the waterfall contains:
    *   `BlockHeight`: Time.
    *   `Entropy`: Randomness source.
    *   `CipherMode`: The active algorithm (from Phase 2).
    *   `IdentityMatrix`: The active parameters for identity generation (from Phase 1).

### 2.4 Artifact Manifestation (The Tapping In)
*   **Concept:** Users do not "create" art; they "discover" or "capture" it from the ongoing stream.
*   **Mechanism:** A user creates a "Manifestation Transaction." They point to a specific `BlockHeight` (past or current) and "crystallize" that moment into an NFT.
*   **Result:** The NFT is a permanent record of what The Source *was doing* at that exact moment.

## 3. Data Structure (Simplified)

```solidity
struct UniversalState {
    uint256 timestamp;
    uint256 blockNumber;
    bytes32 seed;           // The "DNA" of this moment
    uint8 activeCipher;     // Which algorithm is dominant? (0-255)
    uint8 chaosLevel;       // How much entropy is injected?
    uint16 globalHarmonics; // Golden Ratio alignment index
}

// The Event emitted on every Pulse
event Cascade(uint256 indexed blockNumber, bytes32 newSeed, uint8 activeCipher);
```

## 4. Integration with Prior Phases
*   **Phase 1 (Identity):** The *Source* dictates the global "weather" for identity generation. If the Source is in a "High Chaos" state, new Identities generated in Phase 1 applications will reflect that.
*   **Phase 2 (Cipher):** The WebGL Renderer listens to the `Cascade` events. It visualizes the *current* state of the blockchain in real-time. The visualizer is a window into the machine.
*   **Phase 3 (Mythology):** The `4444jPP` protocols are encoded into the state transition logic (e.g., every 4444 blocks, a "Grand Cycle" event occurs).

## 5. Success Criteria
*   **Autonomy:** The system runs for at least 1 week without human intervention during testing.
*   **Perpetuity:** The contract is non-upgradeable and has no "kill switch."
*   **Interoperability:** A frontend (Phase 4) can successfully reconstruct the visual state solely from on-chain events.
