# Autonomous Source Protocol: Technical Details

## 1. The Cascade Mechanism

The "Cascade" is the heartbeat of the Perpetual Ledger. It is a deterministic state transition function that advances the universe's internal clock.

### 1.1 The `pulse()` Function
The core function exposed by the smart contract.

```solidity
function pulse() external {
    // 1. Validation
    require(block.number > lastPulseBlock + PULSE_INTERVAL, "Too soon for next pulse");

    // 2. Entropy Generation
    // Combine previous seed with current block hash to ensure continuity + unpredictability
    bytes32 newEntropy = keccak256(abi.encodePacked(currentState.seed, blockhash(block.number - 1)));

    // 3. State Evolution
    // The "Physics" of the universe evolve based on the new entropy
    UniversalState memory nextState = evolveState(currentState, newEntropy);

    // 4. Storage Update
    currentState = nextState;
    lastPulseBlock = block.number;

    // 5. Emission
    emit Waterfall(nextState.blockNumber, nextState.seed, nextState.activeCipher);
}
```

### 1.2 State Evolution Logic (`evolveState`)
This pure function dictates *how* the universe changes. It implements the "Governing Codes."

*   **Cipher Rotation:** The `activeCipher` rotates based on modulo arithmetic of the seed.
    *   `nextCipher = uint8(uint256(newEntropy) % 256);`
*   **Harmonic Resonance (Golden Ratio):**
    *   The system checks if the new entropy aligns with Phi (approximations).
    *   If `seed % 1000 == 618` (approx 0.618), a "Harmonic Event" is flagged.
*   **Chaos vs. Order:**
    *   A `chaosLevel` parameter fluctuates over time (e.g., following a sine wave based on block height).
    *   High Chaos = Random cipher switching, high visual noise.
    *   High Order = Stable cipher, clear patterns, low noise.

## 2. The Keeper Incentive

To ensure `pulse()` is called, we use a "Carrot and Stick" model or a prepaid automation service.

### 2.1 Prepaid Automation (Recommended for Reliability)
*   **Provider:** Chainlink Automation or Gelato.
*   **Mechanism:** We deposit funds (ETH/LINK) into a subscription balance.
*   **Logic:** The Automation Network checks `checkUpkeep()` (is it time to pulse?). If true, it performs `performUpkeep()` (calls `pulse()`).
*   **Advantage:** Guaranteed execution as long as funds exist.

### 2.2 Open Incentives (The "Runner" Model)
*   **Mechanism:** `pulse()` refunds the caller's gas cost + a small tip (in native token or project token).
*   **Advantage:** True decentralization. Anyone can be the Keeper.
*   **Risk:** If the "tip" value drops below gas cost, the universe freezes.

*Decision:* We will use **Prepaid Automation** as the primary driver, with **Open Incentives** as a fallback protocol if the automation fund runs dry.

## 3. Artifact Manifestation (Minting)

Users capture the stream. They do not generate; they witness and preserve.

### 3.1 The `manifest(uint256 targetBlock)` Function
*   **Input:** The user specifies a past block number.
*   **Verification:** The contract checks if a `Waterfall` event exists for that block (or reconstructs it if we use sparse storage).
*   **Output:** An NFT (ERC-721) is minted.
    *   `TokenID`: Derived from the Block Number.
    *   `Metadata`: Contains the `seed`, `cipher`, and `harmonics` of that specific moment.
*   **Visuals:** The NFT's `tokenURI` points to the on-chain renderer (or an immutable IPFS pointer to the renderer code) which accepts the *Seed* as input and regenerates the exact visual state of that moment.

## 4. On-Chain "Source" Storage
To be truly "The Source," the rendering logic (the algorithms from Phase 2) must ideally live on-chain or be cryptographically pinned.

*   **Approach:** "Scripty" or similar techniques to store the minified JS rendering engine in contract storage chunks.
*   **Assembly:** A `Viewer` contract reassembles the chunks into a standard HTML/JS blob that the browser executes.
*   **Result:** The "Source" is fully contained within the blockchain. If the website goes down, the code can still be extracted directly from the ledger.
