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

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to user story for traceability
- Historical accuracy required for Enigma rotor wirings
- Commit after each task or logical group
