# Tasks: Identity Playground

**Input**: Design documents from `/specs/phase-1-identity/`
**Prerequisites**: plan.md (required), spec.md (required)

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, etc.)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create project with Vite + React + TypeScript at `/identity-playground/`
- [ ] T002 Install dependencies: p5.js, three, tone, zustand, framer-motion
- [ ] T003 [P] Configure TypeScript with path aliases (@core, @numerology, etc.)
- [ ] T004 [P] Set up ESLint and Prettier configuration
- [ ] T005 [P] Create directory structure per plan.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story

- [ ] T006 Define core types in `src/core/types.ts` (PersonalIdentity, NumerologyProfile, VisualConfig)
- [ ] T007 Create event system in `src/core/events.ts` for cross-component communication
- [ ] T008 [P] Set up Zustand stores: identityStore, visualStore, appStore
- [ ] T009 [P] Create utility functions in `src/utils/` (math, color, validation)
- [ ] T010 Create base App layout component with header, main, sidebar structure

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Generate Basic Numerology Profile (Priority: P1) 🎯 MVP

**Goal**: User enters name/birthdate, system calculates Pythagorean numerology and renders visualization

**Independent Test**: Enter "Jane Doe" + "1990-04-15", see destiny=9, life path calculated, phyllotaxis spiral rendered

### Implementation for User Story 1

- [ ] T011 [P] [US1] Create PythagoreanCalculator in `src/numerology/PythagoreanCalculator.ts`
- [ ] T012 [P] [US1] Create letter-to-number mapping (A=1..I=9 cycling) as constant
- [ ] T013 [US1] Implement digitSum and reduce functions for number reduction
- [ ] T014 [US1] Implement calculateDestiny, calculateLifePath, calculateSoulUrge, calculatePersonality, calculateExpression
- [ ] T015 [US1] Create NumerologyEngine in `src/numerology/NumerologyEngine.ts` to orchestrate calculations
- [ ] T016 [P] [US1] Create Phyllotaxis module in `src/proportions/Phyllotaxis.ts` with golden angle generation
- [ ] T017 [P] [US1] Create GoldenRatio module in `src/proportions/GoldenRatio.ts` with PHI constant and utilities
- [ ] T018 [US1] Create P5Renderer in `src/rendering/P5Renderer.ts` with initialize, render, destroy methods
- [ ] T019 [US1] Implement phyllotaxis spiral rendering in P5Renderer
- [ ] T020 [US1] Create IdentityForm component in `src/components/IdentityForm.tsx`
- [ ] T021 [US1] Implement form validation (name required, birthdate optional but valid)
- [ ] T022 [US1] Create NumerologyPanel component in `src/components/NumerologyPanel.tsx`
- [ ] T023 [US1] Create Canvas2D component in `src/components/Canvas2D.tsx` wrapping P5Renderer
- [ ] T024 [US1] Connect form submission to identityStore → numerologyEngine → renderer
- [ ] T025 [US1] Add useNumerology hook in `src/hooks/useNumerology.ts`

**Checkpoint**: User Story 1 should be fully functional - enter name, see numerology + visualization

---

## Phase 4: User Story 2 - Switch Between Numerology Systems (Priority: P2)

**Goal**: User can switch between Pythagorean, Chaldean, Gematria systems

**Independent Test**: With profile generated, toggle system dropdown, see values and visualization change

### Implementation for User Story 2

- [ ] T026 [P] [US2] Create ChaldeanCalculator in `src/numerology/ChaldeanCalculator.ts`
- [ ] T027 [P] [US2] Create GematriaCalculator in `src/numerology/GematriaCalculator.ts`
- [ ] T028 [US2] Implement Chaldean mapping (different values, max 8 not 9)
- [ ] T029 [US2] Implement Gematria mapping (Hebrew-style larger values)
- [ ] T030 [US2] Update NumerologyEngine to accept system parameter
- [ ] T031 [US2] Add system selector to IdentityForm component
- [ ] T032 [US2] Update visualStore to trigger re-render on system change
- [ ] T033 [US2] Add system indicator to NumerologyPanel showing current mode

**Checkpoint**: User Story 2 complete - system switching works with visual feedback

---

## Phase 5: User Story 3 - Customize Visual Parameters (Priority: P2)

**Goal**: User can adjust color, point count, animation speed with real-time updates

**Independent Test**: Drag point count slider, see visualization update in real-time

### Implementation for User Story 3

- [ ] T034 [P] [US3] Create ParameterPanel component in `src/components/ParameterPanel.tsx`
- [ ] T035 [P] [US3] Create color picker sub-component for primary hue
- [ ] T036 [US3] Create slider for point count (range 50-1000)
- [ ] T037 [US3] Create slider for animation speed (range 0.1-2)
- [ ] T038 [US3] Implement 100ms debounce on slider changes
- [ ] T039 [US3] Connect parameters to visualStore
- [ ] T040 [US3] Update P5Renderer to accept dynamic parameters without recreating canvas
- [ ] T041 [P] [US3] Create ThreeRenderer in `src/rendering/ThreeRenderer.ts` for 3D mode
- [ ] T042 [US3] Create Canvas3D component in `src/components/Canvas3D.tsx`
- [ ] T043 [US3] Add 2D/3D mode toggle to ParameterPanel
- [ ] T044 [US3] Implement mode switching logic in visualStore

**Checkpoint**: User Story 3 complete - real-time parameter control works in both modes

---

## Phase 6: User Story 4 - Export Artwork (Priority: P3)

**Goal**: User can export PNG, SVG, WebM with metadata

**Independent Test**: Click Export PNG, file downloads with correct dimensions and embedded metadata

### Implementation for User Story 4

- [ ] T045 [P] [US4] Create PNGExporter in `src/export/PNGExporter.ts`
- [ ] T046 [P] [US4] Create SVGExporter in `src/export/SVGExporter.ts`
- [ ] T047 [P] [US4] Create MetadataGenerator in `src/export/MetadataGenerator.ts`
- [ ] T048 [US4] Implement canvas.toBlob() for PNG export at configurable resolutions
- [ ] T049 [US4] Implement path generation for SVG export (convert visual to vector)
- [ ] T050 [US4] Implement identity hashing for safe metadata (no raw personal data)
- [ ] T051 [US4] Create ExportPanel component in `src/components/ExportPanel.tsx`
- [ ] T052 [US4] Add resolution selector (1x, 2x, 4x) to ExportPanel
- [ ] T053 [US4] Implement WebM export using MediaRecorder API (bonus)

**Checkpoint**: User Story 4 complete - all export formats work

---

## Phase 7: User Story 5 - Save and Load Identities (Priority: P3)

**Goal**: User can save identities to localStorage and reload them

**Independent Test**: Save identity, refresh page, load identity, see all settings restored

### Implementation for User Story 5

- [ ] T054 [US5] Implement save function in appStore using localStorage
- [ ] T055 [US5] Implement load function in appStore with identity restoration
- [ ] T056 [US5] Implement delete function in appStore
- [ ] T057 [US5] Create IdentityList component in `src/components/IdentityList.tsx`
- [ ] T058 [US5] Add save button with name input modal
- [ ] T059 [US5] Display list of saved identities with load/delete options
- [ ] T060 [US5] Handle localStorage quota errors gracefully

**Checkpoint**: User Story 5 complete - persistence works across sessions

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements across all user stories

- [ ] T061 [P] Add loading states during calculations and renders
- [ ] T062 [P] Add error boundaries around components
- [ ] T063 Implement keyboard shortcuts (Space=play/pause, S=save, E=export)
- [ ] T064 Add responsive layout for mobile (sidebar becomes bottom sheet)
- [ ] T065 Performance optimization: memoize expensive calculations
- [ ] T066 Add tooltips/help text for numerology terms
- [ ] T067 Run quickstart validation scenarios from plan.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup
- **User Stories (Phase 3-7)**: All depend on Foundational
  - US1 (P1): Can start after Foundational
  - US2 (P2): Can start after US1 (uses same profile data)
  - US3 (P2): Can start after US1 (needs visualization)
  - US4 (P3): Can start after US3 (needs canvas reference)
  - US5 (P3): Can start after US1 (needs identity model)
- **Polish (Phase 8)**: Depends on all user stories complete

### Parallel Opportunities

- T003, T004, T005 in Setup
- T008, T009 in Foundational
- T011, T012, T016, T017 in US1 (different files)
- T026, T027 in US2 (different files)
- T034, T035, T041 in US3 (different files)
- T045, T046, T047 in US4 (different files)
- T061, T062 in Polish

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup (T001-T005)
2. Complete Foundational (T006-T010)
3. Complete US1 (T011-T025)
4. **STOP and VALIDATE**: Enter name/birthdate, see numerology profile + phyllotaxis spiral
5. Demo/ship if viable

### Incremental Delivery

After MVP, add features in priority order:
- US2 → Multi-system numerology (enhances MVP)
- US3 → Visual customization (engages users)
- US4 → Export (enables sharing)
- US5 → Persistence (improves retention)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to user story for traceability
- Verify tests fail before implementing (TDD optional but encouraged)
- Commit after each task or logical group
