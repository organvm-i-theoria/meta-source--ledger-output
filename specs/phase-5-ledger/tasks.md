# Tasks: Perpetual Ledger

**Input**: Design documents from `/specs/phase-5-ledger/`
**Prerequisites**: plan.md (required), spec.md (required)
**Source Extensions**: `extensions/phase-5-ledger/autonomous-source-protocol.md`

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, etc.)
- Include exact file paths in descriptions

---

## Phase 1: Setup & Infrastructure

**Purpose**: Smart contract development environment and tooling

- [ ] T001 Initialize Hardhat project at `/contracts/` with TypeScript
- [ ] T002 Install dependencies: @openzeppelin/contracts, @chainlink/contracts, ethers
- [ ] T003 [P] Configure TypeScript with strict mode and ethers type extensions
- [ ] T004 [P] Set up Solidity linting (solhint) and formatting (prettier-solidity)
- [ ] T005 [P] Create deployment scripts structure (`scripts/deploy/`, `scripts/verify/`)
- [ ] T006 Configure Hardhat network settings (hardhat, sepolia, base)
- [ ] T007 Set up environment variables template (.env.example)
- [ ] T008 Create gas reporting plugin configuration

**Checkpoint**: `npx hardhat compile` succeeds, tests can run locally

---

## Phase 2: User Story 1 - TheSource Contract (Priority: P1) 🎯 MVP

**Goal**: Deploy contract that holds universal state and advances via pulse()

**Independent Test**: Call pulse(), verify state transitions deterministically, Waterfall event emitted

### Implementation for User Story 1

#### Core Data Structures
- [ ] T009 [US1] Define UniversalState struct in `contracts/TheSource.sol`:
  ```solidity
  struct UniversalState {
      uint256 timestamp;
      uint256 blockNumber;
      bytes32 seed;
      uint8 activeCipher;
      uint8 chaosLevel;
      uint16 globalHarmonics;
  }
  ```
- [ ] T010 [US1] Define state variables: `currentState`, `lastPulseBlock`, `PULSE_INTERVAL`

#### Core Functions
- [ ] T011 [US1] Implement `pulse()` external function with interval validation
- [ ] T012 [US1] Implement entropy generation: `keccak256(abi.encodePacked(seed, blockhash(block.number - 1)))`
- [ ] T013 [US1] Implement `evolveState(UniversalState, bytes32)` pure function
- [ ] T014 [US1] Implement cipher rotation: `uint8(uint256(newEntropy) % 256)`
- [ ] T015 [US1] Implement harmonic resonance: detect `seed % 1000 == 618` for φ alignment
- [ ] T016 [US1] Implement chaos/order oscillation based on block height sine wave

#### Events and Views
- [ ] T017 [US1] Define `Waterfall` event: `event Waterfall(uint256 indexed blockNumber, bytes32 newSeed, uint8 activeCipher)`
- [ ] T018 [US1] Emit `Waterfall` at end of pulse()
- [ ] T019 [US1] Implement `getCurrentState()` view function
- [ ] T020 [US1] Implement `getStateAtBlock(uint256)` view (requires history storage or indexer)

#### Testing
- [ ] T021 [US1] Write unit tests for pulse() state transitions
- [ ] T022 [US1] Write unit tests for entropy determinism
- [ ] T023 [US1] Write unit tests for interval validation

**Checkpoint**: TheSource.sol compiles, all unit tests pass

---

## Phase 3: User Story 2 - Artifacts NFT Contract (Priority: P1)

**Goal**: Users can mint NFTs representing historical block states

**Independent Test**: Call manifest(blockNumber), receive NFT with correct metadata

### Implementation for User Story 2

#### Core Structure
- [ ] T024 [US2] Create `contracts/Artifacts.sol` implementing ERC-721 (OpenZeppelin)
- [ ] T025 [US2] Define ArtifactData struct:
  ```solidity
  struct ArtifactData {
      bytes32 seed;
      uint8 activeCipher;
      uint8 chaosLevel;
      uint16 globalHarmonics;
      uint256 manifestedBlock;
      uint256 manifestedAt;
  }
  ```
- [ ] T026 [US2] Add reference to TheSource contract address (immutable)

#### Manifestation Logic
- [ ] T027 [US2] Implement `manifest(uint256 targetBlock)` external function
- [ ] T028 [US2] Validate targetBlock has Waterfall event (query TheSource or use indexer)
- [ ] T029 [US2] Implement duplicate prevention: mapping(uint256 => bool) manifestedBlocks
- [ ] T030 [US2] Generate tokenId from block number (e.g., `tokenId = targetBlock`)
- [ ] T031 [US2] Store ArtifactData in mapping(uint256 => ArtifactData)
- [ ] T032 [US2] Mint ERC-721 token to caller

#### Metadata and Royalties
- [ ] T033 [US2] Implement `tokenURI(uint256)` with on-chain JSON metadata
- [ ] T034 [US2] Include seed, cipher, harmonics, timestamps in metadata
- [ ] T035 [US2] Implement EIP-2981 royalties: 5% to designated receiver
- [ ] T036 [US2] Implement `getArtifactData(uint256 tokenId)` view function

#### Testing
- [ ] T037 [US2] Write unit tests for manifest() success path
- [ ] T038 [US2] Write unit tests for duplicate prevention
- [ ] T039 [US2] Write unit tests for metadata generation
- [ ] T040 [US2] Write unit tests for royalty calculation

**Checkpoint**: Artifacts.sol compiles, all unit tests pass, mint produces valid NFT

---

## Phase 4: User Story 3 - Keeper Automation (Priority: P2)

**Goal**: Automated heartbeat via Chainlink Automation or Gelato

**Independent Test**: Keeper calls pulse() automatically at configured interval

### Implementation for User Story 3

#### Chainlink Integration
- [ ] T041 [US3] Implement `AutomationCompatibleInterface` in TheSource.sol
- [ ] T042 [US3] Implement `checkUpkeep(bytes)` returning (upkeepNeeded, performData):
  ```solidity
  function checkUpkeep(bytes calldata) external view returns (bool upkeepNeeded, bytes memory) {
      upkeepNeeded = block.number > lastPulseBlock + PULSE_INTERVAL;
      return (upkeepNeeded, "");
  }
  ```
- [ ] T043 [US3] Implement `performUpkeep(bytes)` calling internal pulse logic
- [ ] T044 [US3] Add access control: only Keeper or owner can call performUpkeep

#### Gelato Fallback
- [ ] T045 [US3] Create Gelato-compatible resolver contract
- [ ] T046 [US3] Implement `checker()` function for Gelato

#### Monitoring
- [ ] T047 [US3] Create Keeper balance monitoring script (`scripts/monitor-keeper.ts`)
- [ ] T048 [US3] Implement low-balance alert threshold (configurable)
- [ ] T049 [US3] Create top-up helper script (`scripts/topup-keeper.ts`)

#### Fallback Incentive
- [ ] T050 [US3] Implement open incentive fallback: tip model for manual pulse callers
- [ ] T051 [US3] Add tip pool and claim mechanism (optional, for decentralization)

#### Documentation
- [ ] T052 [US3] Document Chainlink Automation registration process
- [ ] T053 [US3] Document Gelato registration process

**Checkpoint**: Keeper automatically triggers pulse() on testnet

---

## Phase 5: User Story 4 - Testnet Deployment (Priority: P2)

**Goal**: Deploy and verify contracts on Sepolia, run 7-day autonomous test

**Independent Test**: Contracts verified on Etherscan, pulse() running via Keeper for 7 days

### Implementation for User Story 4

#### Deployment Scripts
- [ ] T054 [US4] Create Sepolia deployment script (`scripts/deploy/sepolia.ts`)
- [ ] T055 [US4] Deploy TheSource to Sepolia with initial configuration
- [ ] T056 [US4] Deploy Artifacts to Sepolia, linking to TheSource
- [ ] T057 [US4] Store deployment addresses in `deployments/sepolia.json`

#### Verification
- [ ] T058 [US4] Create verification script (`scripts/verify/sepolia.ts`)
- [ ] T059 [US4] Verify TheSource on Etherscan with constructor args
- [ ] T060 [US4] Verify Artifacts on Etherscan with constructor args

#### Keeper Setup
- [ ] T061 [US4] Register Chainlink Automation upkeep on Sepolia
- [ ] T062 [US4] Fund upkeep with test LINK
- [ ] T063 [US4] Configure upkeep interval

#### Frontend Integration
- [ ] T064 [US4] Create TypeScript SDK for contract interaction (`packages/ledger-sdk/`)
- [ ] T065 [US4] Implement getCurrentState() wrapper
- [ ] T066 [US4] Implement manifest() wrapper with transaction handling
- [ ] T067 [US4] Export ABIs and addresses for frontend consumption

#### Validation
- [ ] T068 [US4] Run 7-day autonomous test on Sepolia
- [ ] T069 [US4] Verify 168+ Waterfall events emitted (hourly)
- [ ] T070 [US4] Document testnet observations and any issues

**Checkpoint**: Contracts live on Sepolia, Keeper running, frontend can read state

---

## Phase 6: User Story 5 - Mainnet Launch (Priority: P1)

**Goal**: Deploy to Base L2 mainnet with production configuration

**Independent Test**: Contracts verified on Basescan, pulse() running, users can manifest NFTs

### Implementation for User Story 5

#### Deployment
- [ ] T071 [US5] Create Base L2 deployment script (`scripts/deploy/base.ts`)
- [ ] T072 [US5] Deploy TheSource to Base mainnet
- [ ] T073 [US5] Deploy Artifacts to Base mainnet
- [ ] T074 [US5] Verify contracts on Basescan

#### Keeper Setup
- [ ] T075 [US5] Register Chainlink Automation upkeep on Base
- [ ] T076 [US5] Fund upkeep with production LINK/ETH (3+ months runway)
- [ ] T077 [US5] Configure production upkeep interval

#### Security Hardening
- [ ] T078 [US5] Implement emergency pause mechanism (owner-only)
- [ ] T079 [US5] Configure pause conditions documentation
- [ ] T080 [US5] Set up multi-sig for emergency actions (optional)

#### Operations
- [ ] T081 [US5] Configure gas optimization parameters
- [ ] T082 [US5] Set up monitoring dashboard (Dune/custom)
- [ ] T083 [US5] Set up alerting (PagerDuty/Discord webhooks)
- [ ] T084 [US5] Document mainnet addresses in `deployments/base-mainnet.json`

**Checkpoint**: Contracts live on Base mainnet, Keeper funded, monitoring active

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Security, optimization, and operational readiness

- [ ] T085 [P] Gas optimization audit (storage patterns, loops)
- [ ] T086 [P] Reentrancy analysis and protection verification
- [ ] T087 Static analysis with Slither
- [ ] T088 Formal verification of critical functions (optional)
- [ ] T089 Create operational runbook (`docs/operations/ledger-runbook.md`)
- [ ] T090 Implement The Graph protocol indexer for event history (optional)
- [ ] T091 Create emergency contact procedures
- [ ] T092 Run final validation checklist against spec.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **User Stories (Phase 2-6)**: All depend on Setup
  - US1 (P1): Can start after Setup - TheSource core
  - US2 (P1): Depends on US1 - needs TheSource deployed for linking
  - US3 (P2): Depends on US1 - needs TheSource with Automation interface
  - US4 (P2): Depends on US1, US2, US3 - full testnet deployment
  - US5 (P1): Depends on US4 validation - mainnet deployment
- **Polish (Phase 7)**: After US4, before US5

### Parallel Opportunities

- T003, T004, T005 in Setup (different files)
- T021, T022, T023 in US1 (different test files)
- T037, T038, T039, T040 in US2 (different test files)
- T054-T056 in US4 (sequential deployment but scripts parallel)
- T085, T086 in Polish (different analyses)

---

## Implementation Strategy

### MVP First (User Stories 1+2)

1. Complete Setup (T001-T008)
2. Complete US1 (T009-T023) - TheSource contract
3. Complete US2 (T024-T040) - Artifacts NFT
4. **STOP and VALIDATE**: Both contracts compile, all tests pass
5. Manual pulse() works, manifest() creates NFT

### Automation Next (User Story 3)

6. Complete US3 (T041-T053) - Keeper integration
7. **VALIDATE**: Keeper triggers pulse() automatically

### Testnet Validation (User Story 4)

8. Complete US4 (T054-T070) - Sepolia deployment
9. **7-DAY TEST**: Autonomous operation validation
10. Fix any issues discovered

### Production Launch (User Story 5)

11. Complete Polish (T085-T092) - Security and operations
12. Complete US5 (T071-T084) - Base mainnet
13. **LAUNCH**: Public announcement

---

## Gas Optimization Notes

Target gas costs (Base L2):

| Operation | Target | Notes |
|-----------|--------|-------|
| pulse() | < 50,000 gas | ~$0.01-0.03 on L2 |
| manifest() | < 150,000 gas | ~$0.10-0.30 on L2 |
| tokenURI() | N/A (view) | On-chain, no gas for read |

Optimization strategies:
- Pack UniversalState struct efficiently (fit in 2 slots)
- Use events for history instead of storage (cheaper)
- Minimize string operations in tokenURI()
- Consider SSTORE2 for large data if needed

---

## Security Considerations

### Critical Functions

| Function | Risk | Mitigation |
|----------|------|------------|
| pulse() | Manipulation | Interval validation, deterministic logic |
| manifest() | Reentrancy | ReentrancyGuard, CEI pattern |
| evolveState() | Predictability | Block hash entropy, multi-block mixing |

### Access Control

- `pulse()`: Public (anyone can call if interval passed)
- `performUpkeep()`: Restricted to Keeper
- `manifest()`: Public (anyone can mint)
- Emergency pause: Owner-only (multi-sig recommended)

### Audit Requirements

Before mainnet:
- [ ] Internal security review
- [ ] External audit (recommended: OpenZeppelin, Trail of Bits, or similar)
- [ ] Bug bounty program (Immunefi)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to user story for traceability
- PULSE_INTERVAL: Start with ~50 blocks (~10 minutes on L2), adjust based on costs
- All entropy must be deterministic (reproducible from chain state)
- NFT metadata should be fully on-chain or IPFS-pinned
- Commit after each task or logical group
- Document all deployed addresses in version control
