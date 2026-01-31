# Tasks: Integrated Creative Platform

**Input**: Design documents from `/specs/phase-4-synthesis/`
**Prerequisites**: plan.md (required), spec.md (required), Phase 1-3 packages

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, etc.)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Mono-Repo Infrastructure)

**Purpose**: Create workspace structure integrating all phases

- [ ] T001 Initialize pnpm workspace at `/integrated-creative-platform/`
- [ ] T002 Create `pnpm-workspace.yaml` defining packages/* and apps/*
- [ ] T003 [P] Configure Turborepo with `turbo.json` for build orchestration
- [ ] T004 [P] Create shared TypeScript config at root with project references
- [ ] T005 Create directory structure per plan.md

---

## Phase 2: Package Migration (Import Existing Phases)

**Purpose**: Migrate Phase 1-3 code into mono-repo packages

- [ ] T006 [P] Create `packages/core/` with shared types from all phases
- [ ] T007 [P] Migrate Phase 1 code to `packages/identity/`
- [ ] T008 [P] Migrate Phase 2 code to `packages/cipher/`
- [ ] T009 [P] Migrate Phase 3 code to `packages/mythology/`
- [ ] T010 Update imports in each package to use @platform/core
- [ ] T011 Verify each package builds and tests pass independently

**Checkpoint**: All phases exist as packages in mono-repo

---

## Phase 3: Foundational (New Packages)

**Purpose**: Create new integration infrastructure packages

- [ ] T012 Create `packages/bridges/` package scaffold
- [ ] T013 Create `packages/rendering/` package scaffold
- [ ] T014 Create `packages/pipeline/` package scaffold
- [ ] T015 Create `packages/archive/` package scaffold
- [ ] T016 Define unified types in `packages/core/src/types/unified.ts`
- [ ] T017 Define CreativeIdentity interface combining all phase types
- [ ] T018 Create main web app at `apps/web/` with Vite + React

**Checkpoint**: All packages scaffolded, unified types defined

---

## Phase 4: User Story 1 - Unified Identity Creation (Priority: P1) 🎯 MVP

**Goal**: Create CreativeIdentity combining personal data + numerology + mythology

**Independent Test**: Fill unified form, see identity with all three systems populated

### Implementation for User Story 1

- [ ] T019 [US1] Define CreativeIdentity type with personal, numerology, mythology, seeds fields
- [ ] T020 [US1] Create IdentityFactory in `packages/core/` to construct CreativeIdentity
- [ ] T021 [US1] Implement combineIdentity(personal, mythology) function
- [ ] T022 [US1] Implement calculateAllNumerology(name, birthdate) returning multi-system profiles
- [ ] T023 [US1] Implement deriveAllSeeds(token, numerology) for master/visual/audio/cipher seeds
- [ ] T024 [US1] Create unifiedStore in `apps/web/src/store/unifiedStore.ts`
- [ ] T025 [US1] Create UnifiedIdentityForm component with name, birthdate, words, token inputs
- [ ] T026 [US1] Display unified identity summary showing all three systems
- [ ] T027 [US1] Create useUnifiedIdentity hook orchestrating creation flow
- [ ] T028 [US1] Verify mythology changes propagate seed updates

**Checkpoint**: Unified identity creates successfully with all data

---

## Phase 5: User Story 2 - Derive Cipher from Identity (Priority: P1)

**Goal**: Cipher configurations derive automatically from identity data

**Independent Test**: Select Vigenere, see keyword auto-populated from meaningful words

### Implementation for User Story 2

- [ ] T029 [US2] Create IdentityCipherBridge in `packages/bridges/src/IdentityCipherBridge.ts`
- [ ] T030 [US2] Implement deriveCaesarConfig(identity) returning shift from destiny
- [ ] T031 [US2] Implement deriveVigenereConfig(identity) returning keyword from words
- [ ] T032 [US2] Implement deriveEnigmaConfig(identity) with full mapping:
  - Four As → rotor order
  - soulUrge/personality/expression → ring settings
  - destiny/lifePath → start positions
  - seed → plugboard
- [ ] T033 [US2] Create "Derive from Identity" toggle in cipher config panel
- [ ] T034 [US2] Auto-populate config fields when toggle enabled
- [ ] T035 [US2] Allow manual override with visual indicator

**Checkpoint**: All cipher types can derive config from identity

---

## Phase 6: User Story 3 - Cross-Domain Pipeline (Priority: P1)

**Goal**: Define and execute pipelines chaining algorithms across domains

**Independent Test**: Run 4-step pipeline, see data flow through all steps

### Implementation for User Story 3

- [ ] T036 [US3] Define Pipeline and PipelineStep interfaces in `packages/pipeline/`
- [ ] T037 [US3] Create AlgorithmRegistry in `packages/pipeline/` aggregating all algorithms
- [ ] T038 [US3] Implement topologicalSort() for step dependency ordering
- [ ] T039 [US3] Create StepRunner in `packages/pipeline/src/StepRunner.ts`
- [ ] T040 [US3] Implement executeStep() with input resolution and param resolution
- [ ] T041 [US3] Create PipelineExecutor in `packages/pipeline/src/PipelineExecutor.ts`
- [ ] T042 [US3] Implement execute() looping through sorted steps
- [ ] T043 [US3] Apply φ-operators between steps when configured
- [ ] T044 [US3] Apply Four As governance filtering when configured
- [ ] T045 [US3] Create pipelineStore in `apps/web/src/store/pipelineStore.ts`
- [ ] T046 [US3] Create PipelineBuilder component with step adding/removing UI
- [ ] T047 [US3] Display execution progress and intermediate results
- [ ] T048 [US3] Create usePipeline hook for execution management

**Checkpoint**: Pipelines execute with proper data flow and governance

---

## Phase 7: User Story 4 - Multi-Renderer Synchronization (Priority: P2)

**Goal**: p5.js, Three.js, Tone.js respond to same state synchronously

**Independent Test**: Change identity, watch 2D, 3D, and audio all update together

### Implementation for User Story 4

- [ ] T049 [US4] Define IRenderer interface in `packages/rendering/`
- [ ] T050 [US4] Create RenderCoordinator in `packages/rendering/src/RenderCoordinator.ts`
- [ ] T051 [US4] Implement registerRenderer() and activateRenderer()
- [ ] T052 [US4] Create SyncManager for timing coordination
- [ ] T053 [US4] Implement renderAll(state) distributing to active renderers
- [ ] T054 [US4] Implement animateAll(from, to, duration) with sync
- [ ] T055 [US4] Wrap P5Renderer from Phase 1 to implement IRenderer
- [ ] T056 [US4] Wrap ThreeRenderer from Phase 2 to implement IRenderer
- [ ] T057 [US4] Create AudioRenderer wrapping Tone.js in `packages/rendering/`
- [ ] T058 [US4] Implement numerologyToScale() mapping profile to musical scale
- [ ] T059 [US4] Create MultiRendererView component with layout for all renderers
- [ ] T060 [US4] Add renderer toggle buttons (2D/3D/Audio)
- [ ] T061 [US4] Verify <50ms drift between renderers

**Checkpoint**: All renderers stay synchronized

---

## Phase 8: User Story 5 - Cipher-to-Visual Bridge (Priority: P2)

**Goal**: Cipher events map to generative visual parameters

**Independent Test**: Encrypt message, see hue derived from average shift

### Implementation for User Story 5

- [ ] T062 [US5] Create CipherVisualBridge in `packages/bridges/src/CipherVisualBridge.ts`
- [ ] T063 [US5] Implement avgShiftToHue() for substitution events
- [ ] T064 [US5] Implement eventsToComplexity() based on event count
- [ ] T065 [US5] Implement eventsToRhythm() based on event timing
- [ ] T066 [US5] Implement charFrequencyToDensity() from output text
- [ ] T067 [US5] Create VisualParams type with hue, complexity, rhythm, density
- [ ] T068 [US5] Connect bridge to rendering pipeline
- [ ] T069 [US5] Visualize parameter derivation in UI (show mapping)

**Checkpoint**: Cipher events drive visual aesthetics

---

## Phase 9: User Story 6 - Mythology Algorithm Filtering (Priority: P3)

**Goal**: Active Four As filter recommended algorithms

**Independent Test**: Activate only Archive, see archival algorithms prioritized

### Implementation for User Story 6

- [ ] T070 [US6] Add FourAsAlignment property to all algorithms
- [ ] T071 [US6] Create FourAsGovernor in `packages/mythology/`
- [ ] T072 [US6] Implement filterByAlignment(algorithms, activeAs) prioritizing matches
- [ ] T073 [US6] Integrate filtering into algorithm selection UI
- [ ] T074 [US6] Show alignment indicator on each algorithm option

**Checkpoint**: Algorithm selection respects mythology governance

---

## Phase 10: User Story 7 - Archive Export/Import (Priority: P3)

**Goal**: Export complete session as archive, import and reproduce

**Independent Test**: Export archive, import on fresh browser, get identical output

### Implementation for User Story 7

- [ ] T075 [US7] Define ArchivePackage type in `packages/archive/`
- [ ] T076 [US7] Create ArchivePackager in `packages/archive/src/ArchivePackager.ts`
- [ ] T077 [US7] Implement packSession() creating ZIP with:
  - manifest.json
  - identity.json
  - pipeline.json
  - outputs/*
  - metadata.json
- [ ] T078 [US7] Create ArchiveLoader in `packages/archive/src/ArchiveLoader.ts`
- [ ] T079 [US7] Implement loadArchive() parsing ZIP and restoring state
- [ ] T080 [US7] Implement validateArchive() checking integrity
- [ ] T081 [US7] Create ArchivePanel component with export/import buttons
- [ ] T082 [US7] Show archive history with load/delete options
- [ ] T083 [US7] Verify deterministic reproduction (same seeds → same output)

**Checkpoint**: Archives enable full session portability

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Final integration and quality improvements

- [ ] T084 [P] Add comprehensive error handling across all bridges
- [ ] T085 [P] Add loading states for pipeline execution
- [ ] T086 Create DashboardLayout with navigation between modes
- [ ] T087 Add keyboard shortcuts for common actions
- [ ] T088 Performance optimization: lazy load packages, code split
- [ ] T089 Create comprehensive E2E tests for full workflow
- [ ] T090 Run quickstart validation scenarios from plan.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Migration (Phase 2)**: Depends on Setup - parallelize package migrations
- **Foundational (Phase 3)**: Depends on Migration
- **User Stories (Phase 4-10)**: All depend on Foundational
  - US1 (P1): Can start after Foundational
  - US2 (P1): Depends on US1 (needs identity)
  - US3 (P1): Depends on US1 (needs identity for pipeline input)
  - US4 (P2): Can start after US1 (needs renderable state)
  - US5 (P2): Can start after Phase 2 cipher migration
  - US6 (P3): Can start after US1 mythology integration
  - US7 (P3): Depends on US3 (needs pipeline results to archive)
- **Polish (Phase 11)**: After all user stories

### Parallel Opportunities

- T003, T004 in Setup
- T006, T007, T008, T009 in Migration (all different directories)
- US4 and US5 can run in parallel
- US6 and US7 can run in parallel
- T084, T085 in Polish

---

## Implementation Strategy

### MVP First (User Stories 1+2+3)

1. Complete Setup (T001-T005)
2. Complete Migration (T006-T011)
3. Complete Foundational (T012-T018)
4. Complete US1 (T019-T028) - Unified identity
5. Complete US2 (T029-T035) - Identity-derived cipher
6. Complete US3 (T036-T048) - Cross-domain pipeline
7. **STOP and VALIDATE**: Full pipeline from identity → cipher → visual works
8. Platform delivers integrated creative workflow

### Incremental Enhancement

After MVP:
- US4 → Multi-renderer (multimedia experience)
- US5 → Cipher-visual bridge (emergent aesthetics)
- US6 → Mythology filtering (governance in action)
- US7 → Archiving (persistence and sharing)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to user story for traceability
- Mono-repo requires careful dependency management
- Each package should build independently before integration
- Commit after each task or logical group
- Integration tests critical for cross-package functionality
