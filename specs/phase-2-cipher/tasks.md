# Tasks: Cipher Rendering Pipeline

**Input**: Design documents from `/specs/phase-2-cipher/`
**Prerequisites**: plan.md (required), spec.md (required)

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, etc.)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create project with Vite + React + TypeScript at `/cipher-rendering/`
- [ ] T002 Install dependencies: three, p5, zustand, framer-motion
- [ ] T003 [P] Configure TypeScript with path aliases (@core, @ciphers, @metaphors, etc.)
- [ ] T004 [P] Set up ESLint and Prettier configuration
- [ ] T005 [P] Create directory structure per plan.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure - cipher interfaces, event system, state machine base

- [ ] T006 Define ICipher interface in `src/core/CipherInterface.ts`
- [ ] T007 Define CipherState, StepResult, CipherEvent types in `src/core/types.ts`
- [ ] T008 Define IVisualMetaphor interface in `src/metaphors/VisualMetaphorInterface.ts`
- [ ] T009 Define event types (INPUT, SUBSTITUTION, ROTOR_STEP, OUTPUT) in `src/core/events.ts`
- [ ] T010 [P] Create cipher registry in `src/ciphers/registry.ts`
- [ ] T011 [P] Create metaphor registry in `src/metaphors/registry.ts`
- [ ] T012 [P] Set up Zustand stores: cipherStore, animationStore, viewStore
- [ ] T013 Create base App layout with cipher selector, config panel, canvas, controls

**Checkpoint**: Foundation ready - can register ciphers and metaphors

---

## Phase 3: User Story 1 - Visualize Caesar Cipher (Priority: P1) 🎯 MVP

**Goal**: User enters plaintext and shift, sees step-by-step wheel animation

**Independent Test**: Enter "ABC" with shift 3, watch A→D, B→E, C→F animate on wheel

### Implementation for User Story 1

- [ ] T014 [US1] Create CaesarCipher class implementing ICipher in `src/ciphers/CaesarCipher.ts`
- [ ] T015 [US1] Implement configure() accepting shift (0-25)
- [ ] T016 [US1] Implement getInitialState() returning CipherState with shift, empty text
- [ ] T017 [US1] Implement step() performing single character encryption with events
- [ ] T018 [US1] Implement encrypt() looping step() for full message
- [ ] T019 [US1] Implement getVisualHints() returning preferredMetaphors: ['wheel']
- [ ] T020 [US1] Create WheelRenderer implementing IVisualMetaphor in `src/metaphors/WheelRenderer.ts`
- [ ] T021 [US1] Implement initialize() creating Canvas 2D context with two alphabet rings
- [ ] T022 [US1] Implement render(state) drawing current state with focus highlights
- [ ] T023 [US1] Implement animate(from, to, duration) rotating inner ring smoothly
- [ ] T024 [US1] Create CipherSelector component in `src/components/CipherSelector.tsx`
- [ ] T025 [US1] Create ConfigPanel component with shift slider in `src/components/ConfigPanel.tsx`
- [ ] T026 [US1] Create InputPanel component with plaintext textarea in `src/components/InputPanel.tsx`
- [ ] T027 [US1] Create MetaphorCanvas component wrapping renderer in `src/components/MetaphorCanvas.tsx`
- [ ] T028 [US1] Create PlaybackControls with Play/Pause/Step buttons in `src/components/PlaybackControls.tsx`
- [ ] T029 [US1] Connect components: form → cipherStore → cipher.step() → renderer.animate()
- [ ] T030 [US1] Register CaesarCipher and WheelRenderer in their registries

**Checkpoint**: Caesar cipher encrypts with animated wheel - MVP complete

---

## Phase 4: User Story 2 - Visualize Vigenere with Tabula Recta (Priority: P1)

**Goal**: User enters plaintext and keyword, sees table highlighting

**Independent Test**: Encrypt "HELLO" with key "KEY", watch row/column/cell highlights

### Implementation for User Story 2

- [ ] T031 [P] [US2] Create VigenereCipher class in `src/ciphers/VigenereCipher.ts`
- [ ] T032 [US2] Implement configure() accepting keyword
- [ ] T033 [US2] Implement step() with KEY_APPLICATION and SUBSTITUTION events
- [ ] T034 [US2] Implement key index cycling (mod keyword.length)
- [ ] T035 [US2] Create TabulaRectaRenderer in `src/metaphors/TabulaRectaRenderer.ts`
- [ ] T036 [US2] Implement drawTable() rendering 26x26 grid with headers
- [ ] T037 [US2] Implement highlightRow(index) for plaintext row
- [ ] T038 [US2] Implement highlightColumn(index) for key column
- [ ] T039 [US2] Implement highlightCell(row, col) for intersection
- [ ] T040 [US2] Implement animate() tracing path from row→cell→output
- [ ] T041 [US2] Add keyword input to ConfigPanel when Vigenere selected
- [ ] T042 [US2] Add key indicator showing current key letter position
- [ ] T043 [US2] Register VigenereCipher and TabulaRectaRenderer

**Checkpoint**: Vigenere with animated table lookup works

---

## Phase 5: User Story 3 - Visualize Enigma in 3D (Priority: P2)

**Goal**: User configures Enigma, sees 3D rotor animation and signal path

**Independent Test**: Configure rotors III-II-I, encrypt "HELLO", watch rotors turn

### Implementation for User Story 3

- [ ] T044 [P] [US3] Create Rotor class in `src/ciphers/enigma/Rotor.ts`
- [ ] T045 [P] [US3] Create Reflector class in `src/ciphers/enigma/Reflector.ts`
- [ ] T046 [P] [US3] Create Plugboard class in `src/ciphers/enigma/Plugboard.ts`
- [ ] T047 [US3] Add historical rotor wirings (I-V) as constants
- [ ] T048 [US3] Add historical reflector wirings (B, C) as constants
- [ ] T049 [US3] Implement Rotor.forward() and Rotor.reverse() signal paths
- [ ] T050 [US3] Implement Rotor.step() and Rotor.atNotch() for stepping logic
- [ ] T051 [US3] Implement double-stepping anomaly in stepRotors()
- [ ] T052 [US3] Create EnigmaCipher class in `src/ciphers/EnigmaCipher.ts`
- [ ] T053 [US3] Implement full signal path: plugboard→rotors→reflector→rotors→plugboard
- [ ] T054 [US3] Log SignalPathPoint[] for each encryption step
- [ ] T055 [US3] Create RotorMechanicsRenderer in `src/metaphors/RotorMechanicsRenderer.ts`
- [ ] T056 [US3] Initialize Three.js scene with camera, lighting, controls
- [ ] T057 [US3] Create rotor cylinder meshes with letter engravings
- [ ] T058 [US3] Implement rotor rotation animation on stepping
- [ ] T059 [US3] Draw signal path as glowing line through machine
- [ ] T060 [US3] Add Enigma config panel (rotor order, rings, start, plugboard)
- [ ] T061 [US3] Validate config (no duplicate rotors)
- [ ] T062 [US3] Register EnigmaCipher and RotorMechanicsRenderer

**Checkpoint**: Enigma works with 3D visualization

---

## Phase 6: User Story 4 - Switch Visual Metaphors (Priority: P2)

**Goal**: User can change rendering style without changing cipher

**Independent Test**: With Caesar mid-encryption, switch Wheel→Grid→Cascade

### Implementation for User Story 4

- [ ] T063 [P] [US4] Create GridRenderer in `src/metaphors/GridRenderer.ts`
- [ ] T064 [P] [US4] Create MatrixCascadeRenderer in `src/metaphors/MatrixCascadeRenderer.ts`
- [ ] T065 [US4] Implement GridRenderer showing 26-character substitution mapping
- [ ] T066 [US4] Implement MatrixCascadeRenderer with falling glyph columns
- [ ] T067 [US4] Create metaphor dropdown in view controls
- [ ] T068 [US4] Implement getCompatible(cipherFamily) in metaphor registry
- [ ] T069 [US4] Implement metaphor switching preserving cipher state
- [ ] T070 [US4] Add smooth transition effect when switching metaphors

**Checkpoint**: Metaphor switching works for all ciphers

---

## Phase 7: User Story 5 - Timeline Scrubbing (Priority: P3)

**Goal**: User can scrub timeline to any encryption step

**Independent Test**: Complete encryption, drag timeline to step 5, see state at step 5

### Implementation for User Story 5

- [ ] T071 [US5] Create Timeline class in `src/animation/Timeline.ts`
- [ ] T072 [US5] Implement keyframe storage with timestamps
- [ ] T073 [US5] Create StateInterpolator in `src/animation/StateInterpolator.ts`
- [ ] T074 [US5] Implement state interpolation for smooth seeking
- [ ] T075 [US5] Create AnimationController in `src/animation/AnimationController.ts`
- [ ] T076 [US5] Implement play(), pause(), seek(time), setSpeed(speed)
- [ ] T077 [US5] Create TimelineScrubber component in `src/components/TimelineScrubber.tsx`
- [ ] T078 [US5] Display event markers on timeline
- [ ] T079 [US5] Implement drag-to-seek functionality
- [ ] T080 [US5] Add speed selector (0.25x, 0.5x, 1x, 2x, 4x)
- [ ] T081 [US5] Connect scrubber to animationStore → renderer

**Checkpoint**: Timeline scrubbing works across all ciphers

---

## Phase 8: User Story 6 - Comparative Views (Priority: P3)

**Goal**: User can view plaintext/key/ciphertext side-by-side synchronized

**Independent Test**: Enable 3-panel view, scrub timeline, all panels update together

### Implementation for User Story 6

- [ ] T082 [US6] Create ComparativeView component in `src/components/ComparativeView.tsx`
- [ ] T083 [US6] Implement 3-panel layout (plaintext, key, ciphertext)
- [ ] T084 [US6] Synchronize highlighting across panels
- [ ] T085 [US6] Connect timeline events to panel highlighting
- [ ] T086 [US6] Add toggle for comparative mode in view controls

**Checkpoint**: Comparative views work with synchronization

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements across all user stories

- [ ] T087 [P] Implement easing functions (linear, easeIn, easeOut, easeInOut, elastic)
- [ ] T088 [P] Add keyboard shortcuts (Space=play/pause, Left/Right=step)
- [ ] T089 Create frame exporter (PNG snapshot, WebM recording)
- [ ] T090 Add loading states during cipher initialization
- [ ] T091 Add error handling for invalid inputs
- [ ] T092 Performance optimization: frame skipping, state diffing
- [ ] T093 Run quickstart validation scenarios from plan.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup
- **User Stories (Phase 3-8)**: All depend on Foundational
  - US1 (P1): Can start after Foundational
  - US2 (P1): Can start parallel with US1 (different cipher)
  - US3 (P2): Can start after US1/US2 (validates architecture)
  - US4 (P2): Can start after US1 (needs working renderer)
  - US5 (P3): Can start after US3 (needs animation system)
  - US6 (P3): Can start after US5 (needs timeline)
- **Polish (Phase 9)**: After all user stories

### Parallel Opportunities

- T003, T004, T005 in Setup
- T010, T011, T012 in Foundational
- T031 in US2 can run parallel with US1 completion
- T044, T045, T046 in US3 (different files)
- T063, T064 in US4 (different files)
- T087, T088 in Polish

---

## Implementation Strategy

### MVP First (User Stories 1+2)

1. Complete Setup (T001-T005)
2. Complete Foundational (T006-T013)
3. Complete US1 (T014-T030) - Caesar + Wheel
4. Complete US2 (T031-T043) - Vigenere + Tabula Recta
5. **STOP and VALIDATE**: Both simple ciphers work with animation
6. Demo/ship basic cipher visualizer

### Incremental Enhancement

After MVP:
- US3 → Enigma (complexity showcase)
- US4 → Metaphor switching (flexibility)
- US5 → Timeline (educational depth)
- US6 → Comparative (understanding)

---

# Cipher Alchemy Extension Tasks

**Source**: `extensions/phase-2-cipher/cipher-alchemy-extension.md`
**Priority**: P3 (After core MVP complete)

---

## Phase 10: User Story 7 - Astrological Ciphers (Priority: P3)

**Goal**: User can encode messages using zodiac-based cipher systems

**Independent Test**: Encode "HELLO" with Zodiac12, see ♌♌♎♓♓ output with animated wheel

### Implementation for User Story 7

- [ ] T094 [P] [US7] Define IAstrologicalCipher interface extending ICipher in `src/ciphers/astrological/AstrologicalInterface.ts`
- [ ] T095 [P] [US7] Define CelestialSystem, CelestialPosition, ZodiacSign enums in `src/ciphers/astrological/types.ts`
- [ ] T096 [US7] Create Zodiac12Cipher class in `src/ciphers/astrological/Zodiac12Cipher.ts`
- [ ] T097 [US7] Implement letter-to-sign mapping (26→12 with 2-3 letters per sign)
- [ ] T098 [US7] Implement getCelestialVisualHints() with wheel configuration
- [ ] T099 [US7] Create ZodiacWheelRenderer in `src/metaphors/ZodiacWheelRenderer.ts`
- [ ] T100 [US7] Draw 12-segment zodiac wheel with glyphs (♈♉♊♋♌♍♎♏♐♑♒♓)
- [ ] T101 [US7] Implement sign highlighting during encryption
- [ ] T102 [US7] Animate wheel rotation during letter encoding
- [ ] T103 [P] [US7] Create PlanetaryCipher class in `src/ciphers/astrological/PlanetaryCipher.ts`
- [ ] T104 [US7] Implement Agrippa planetary tables (7 planets, letter groups)
- [ ] T105 [US7] Create OrbitalRenderer in `src/metaphors/OrbitalRenderer.ts`
- [ ] T106 [US7] Draw planetary orbits with letter positions
- [ ] T107 [US7] Animate orbital motion during encryption
- [ ] T108 [P] [US7] Create DecanCipher class in `src/ciphers/astrological/DecanCipher.ts`
- [ ] T109 [P] [US7] Create DegreeCipher class in `src/ciphers/astrological/DegreeCipher.ts`
- [ ] T110 [US7] Register all astrological ciphers and renderers

**Checkpoint**: Astrological cipher family works with zodiac wheel visualization

---

## Phase 11: User Story 8 - Historical Cipher Compendium (Priority: P3)

**Goal**: User can explore and use ciphers from different historical eras

**Independent Test**: Select "Ancient" era, use Scytale cipher, see cylinder visualization

### Implementation for User Story 8

- [ ] T111 [P] [US8] Define IHistoricalCipher interface in `src/ciphers/historical/HistoricalInterface.ts`
- [ ] T112 [P] [US8] Define HistoricalContext, Vulnerability, EvolutionLink types in `src/ciphers/historical/types.ts`
- [ ] T113 [US8] Add HistoricalEra enum (ANCIENT, CLASSICAL, RENAISSANCE, ENLIGHTENMENT, WWI_WWII)

### Ancient Era (Pre-500 CE)
- [ ] T114 [P] [US8] Create ScytaleCipher class in `src/ciphers/historical/ancient/ScytaleCipher.ts`
- [ ] T115 [US8] Implement transposition by rod diameter (simulate leather strip)
- [ ] T116 [US8] Create CylinderRenderer in `src/metaphors/CylinderRenderer.ts`
- [ ] T117 [P] [US8] Create AtbashCipher class in `src/ciphers/historical/ancient/AtbashCipher.ts`
- [ ] T118 [US8] Implement mirror alphabet (A↔Z, B↔Y, etc.)
- [ ] T119 [P] [US8] Create PolybiusCipher class in `src/ciphers/historical/ancient/PolybiusCipher.ts`
- [ ] T120 [US8] Implement 5×5 grid encoding

### Renaissance Era (1400-1700)
- [ ] T121 [P] [US8] Create AlbertiDiskCipher class in `src/ciphers/historical/renaissance/AlbertiDiskCipher.ts`
- [ ] T122 [US8] Implement dual-disc polyalphabetic precursor
- [ ] T123 [US8] Create DualDiscRenderer in `src/metaphors/DualDiscRenderer.ts`
- [ ] T124 [P] [US8] Create TrithemiusTableauCipher in `src/ciphers/historical/renaissance/TrithemiusTableauCipher.ts`
- [ ] T125 [US8] Implement progressive shift (A→A, B→C, C→E, etc.)
- [ ] T126 [P] [US8] Create BaconBilateralCipher in `src/ciphers/historical/renaissance/BaconBilateralCipher.ts`
- [ ] T127 [US8] Implement steganographic a/b encoding

### WWI/WWII Era (1914-1945)
- [ ] T128 [P] [US8] Create ADFGVXCipher class in `src/ciphers/historical/wwii/ADFGVXCipher.ts`
- [ ] T129 [US8] Implement fractionation + columnar transposition
- [ ] T130 [US8] Create FractionationGridRenderer in `src/metaphors/FractionationGridRenderer.ts`
- [ ] T131 [P] [US8] Create LorenzCipher class in `src/ciphers/historical/wwii/LorenzCipher.ts`
- [ ] T132 [US8] Implement teleprinter wheel simulation (SZ40/42)

### UI Components
- [ ] T133 [US8] Create HistoricalEraSelector component in `src/components/HistoricalEraSelector.tsx`
- [ ] T134 [US8] Create CipherContextPanel showing historical info, vulnerabilities
- [ ] T135 [US8] Create EvolutionChainViewer showing cipher lineage
- [ ] T136 [US8] Register all historical ciphers with metadata

**Checkpoint**: Historical compendium browsable with era navigation

---

## Phase 12: User Story 9 - Cryptanalysis Tools (Priority: P3)

**Goal**: User can run analysis algorithms on ciphertext to detect cipher type

**Independent Test**: Paste unknown ciphertext, get "likely polyalphabetic, key length ~5" result

### Implementation for User Story 9

- [ ] T137 [P] [US9] Define ICryptanalysisEngine interface in `src/analysis/CryptanalysisInterface.ts`
- [ ] T138 [P] [US9] Define AnalysisResult, Finding, Recommendation types in `src/analysis/types.ts`

### Frequency Analysis Engine
- [ ] T139 [US9] Create FrequencyAnalysisEngine in `src/analysis/FrequencyAnalysisEngine.ts`
- [ ] T140 [US9] Implement calculateFrequencies() for single characters
- [ ] T141 [US9] Implement calculateBigramFrequencies()
- [ ] T142 [US9] Implement calculateIC() for Index of Coincidence
- [ ] T143 [US9] Implement inferCipherType() from IC value
- [ ] T144 [US9] Create FrequencyHistogram component in `src/components/analysis/FrequencyHistogram.tsx`
- [ ] T145 [US9] Create DistributionComparison component (observed vs expected English)

### Kasiski Examination Engine
- [ ] T146 [US9] Create KasiskiExaminationEngine in `src/analysis/KasiskiExaminationEngine.ts`
- [ ] T147 [US9] Implement findRepeatedSequences() for patterns 3-10 chars
- [ ] T148 [US9] Implement calculateDistances() between occurrences
- [ ] T149 [US9] Implement findGCDCandidates() for key length estimation
- [ ] T150 [US9] Create SequenceMapVisualization showing repeated patterns

### Index of Coincidence Engine
- [ ] T151 [US9] Create IndexOfCoincidenceEngine in `src/analysis/IndexOfCoincidenceEngine.ts`
- [ ] T152 [US9] Implement estimateKeyLength() via coset IC averaging
- [ ] T153 [US9] Implement findPeaks() for key length candidates
- [ ] T154 [US9] Create KeyLengthGraph component showing IC by length

### Analysis Dashboard
- [ ] T155 [US9] Create AnalysisDashboard component in `src/components/analysis/AnalysisDashboard.tsx`
- [ ] T156 [US9] Create CiphertextInput component for analysis paste
- [ ] T157 [US9] Implement runAllEngines() combining results
- [ ] T158 [US9] Display recommendations and next steps

**Checkpoint**: Cryptanalysis dashboard working with visualization

---

## Phase 13: User Story 10 - Unsolved Cipher Toolkit (Priority: P4)

**Goal**: User can explore unsolved ciphers and apply experimental attacks

**Independent Test**: Select Voynich, view known facts, apply experimental cipher

### Implementation for User Story 10

- [ ] T159 [P] [US10] Define IUnsolvedCipher interface in `src/ciphers/unsolved/UnsolvedInterface.ts`
- [ ] T160 [P] [US10] Define UnsolvedCipherFacts, Theory, AnalysisSubmission types

### Voynich Manuscript
- [ ] T161 [US10] Create VoynichManuscript in `src/ciphers/unsolved/VoynichManuscript.ts`
- [ ] T162 [US10] Add known facts database (MS 408, 170K chars, 30 symbols)
- [ ] T163 [US10] Implement getCommunityTheories() with scored theories
- [ ] T164 [US10] Implement applyExperimentalDecryption() with coherence scoring

### Zodiac Killer Ciphers
- [ ] T165 [US10] Create ZodiacCiphers in `src/ciphers/unsolved/ZodiacCiphers.ts`
- [ ] T166 [US10] Add Z408 (solved), Z340 (solved 2020), Z13, Z32 data
- [ ] T167 [US10] Document solution methods for Z408 and Z340

### Kryptos
- [ ] T168 [US10] Create KryptosSculpture in `src/ciphers/unsolved/KryptosSculpture.ts`
- [ ] T169 [US10] Add K1-K3 solutions, K4 ciphertext (97 chars)
- [ ] T170 [US10] Add Sanborn clues (BERLIN, CLOCK, NORTHEAST)

### UI Components
- [ ] T171 [US10] Create UnsolvedCipherExplorer component
- [ ] T172 [US10] Create KnownFactsPanel showing ciphertext stats
- [ ] T173 [US10] Create TheoryBrowser with community scoring
- [ ] T174 [US10] Create ExperimentalAttackPanel for cipher application

**Checkpoint**: Unsolved cipher research toolkit functional

---

## Phase 14: Polycosm Integration (Priority: P4)

**Goal**: All ciphers integrate with Polycosm Reality Engine for multi-prism analysis

**Independent Test**: Analyze ciphertext, see Oracle/Poet/Historical prisms simultaneously

### Implementation for Polycosm

- [ ] T175 [P] Create IPolycosmoEngine interface in `src/polycosm/PolycosmoEngine.ts`
- [ ] T176 [P] Create RealityPrism abstract class in `src/polycosm/RealityPrism.ts`
- [ ] T177 Create ConvergenceDetector in `src/polycosm/ConvergenceDetector.ts`
- [ ] T178 Implement findConvergence() across active prisms

### Standard Prism Library
- [ ] T179 [P] Create OraclePrism (analytical) in `src/polycosm/prisms/OraclePrism.ts`
- [ ] T180 [P] Create PoetPrism (aesthetic) in `src/polycosm/prisms/PoetPrism.ts`
- [ ] T181 [P] Create CelestialPrism (cosmic) in `src/polycosm/prisms/CelestialPrism.ts`
- [ ] T182 [P] Create HistoricalPrism (temporal) in `src/polycosm/prisms/HistoricalPrism.ts`
- [ ] T183 [P] Create ContrarianPrism (inverse) in `src/polycosm/prisms/ContrarianPrism.ts`

### Multi-View Rendering
- [ ] T184 Create MultiverseRenderer in `src/polycosm/MultiverseRenderer.ts`
- [ ] T185 Implement multi-panel layout for simultaneous prism display
- [ ] T186 Create ConvergenceOverlay showing where prisms agree
- [ ] T187 Create PrismSelector component for activation/deactivation

### Integration
- [ ] T188 Connect cryptanalysis engines to Polycosm prisms
- [ ] T189 Connect historical ciphers to HistoricalPrism
- [ ] T190 Connect astrological ciphers to CelestialPrism

**Checkpoint**: Polycosm multi-prism analysis working

---

## Dependencies & Execution Order (Extended)

### Cipher Alchemy Dependencies

- **Phase 10 (Astrological)**: Depends on Phase 9 (Polish)
- **Phase 11 (Historical)**: Can run parallel with Phase 10
- **Phase 12 (Cryptanalysis)**: Can run parallel with Phase 10-11
- **Phase 13 (Unsolved)**: Depends on Phase 12 (needs analysis tools)
- **Phase 14 (Polycosm)**: Depends on Phase 10-13 (integrates all)

### Parallel Opportunities (Extended)

- T094, T095 in Phase 10 (interfaces)
- T103, T108, T109 in Phase 10 (different cipher files)
- T114, T117, T119, T121, T124, T126, T128, T131 in Phase 11 (different era files)
- T137, T138 in Phase 12 (interfaces)
- T159, T160 in Phase 13 (interfaces)
- T175, T176, T179-T183 in Phase 14 (different files)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to user story for traceability
- Historical accuracy required for Enigma rotor wirings
- Historical accuracy required for Agrippa planetary tables
- Unsolved cipher data must cite academic sources
- Polycosm prisms should produce actionable recommendations
- Commit after each task or logical group
