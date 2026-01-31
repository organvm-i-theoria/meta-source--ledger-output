# Tasks: 4444jPP Symbolic System

**Input**: Design documents from `/specs/phase-3-mythology/`
**Prerequisites**: plan.md (required), spec.md (required)

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, etc.)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization with library-first architecture

- [ ] T001 Create project with Vite + React + TypeScript at `/mythology-system/`
- [ ] T002 Install dependencies: zustand, date-fns
- [ ] T003 [P] Configure TypeScript with path aliases (@lib, @core, etc.)
- [ ] T004 [P] Set up ESLint and Prettier configuration
- [ ] T005 [P] Create directory structure per plan.md (lib/ for library, components/ for UI)
- [ ] T006 Configure package.json exports for library usage

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core types, constants, and base classes for library

- [ ] T007 Define core types in `src/lib/core/types.ts` (MythologyToken, FourAsState, PhiOperator)
- [ ] T008 Define PHI constant and Pythagorean mapping in `src/lib/core/constants.ts`
- [ ] T009 Create MythologyToken class in `src/lib/core/MythologyToken.ts`
- [ ] T010 [P] Set up Zustand stores: mythologyStore, calendarStore
- [ ] T011 Create library entry point in `src/lib/index.ts` with public exports
- [ ] T012 Create base demo App layout in `src/App.tsx`

**Checkpoint**: Library structure ready, can import from @4444jpp/mythology

---

## Phase 3: User Story 1 - Configure 4444jPP Token (Priority: P1) 🎯 MVP

**Goal**: User enters token, sees decomposition (BLOCK-HINGE-POSTS) and numerology stack

**Independent Test**: Enter "4444jPP", see BLOCK=4444, HINGE=j, POSTS=PP, stack=4-7-6

### Implementation for User Story 1

- [ ] T013 [US1] Create TokenAnalyzer in `src/lib/token/TokenAnalyzer.ts`
- [ ] T014 [US1] Implement getCharType() classifying digit/lower/upper/other
- [ ] T015 [US1] Implement analyzeToken() grouping consecutive char classes
- [ ] T016 [US1] Implement decompose() labeling groups as BLOCK/HINGE/POSTS
- [ ] T017 [US1] Create NumerologyStack in `src/lib/token/NumerologyStack.ts`
- [ ] T018 [US1] Implement calculateDigitSum() for numeric portions
- [ ] T019 [US1] Implement calculateLetterSum() using Pythagorean mapping
- [ ] T020 [US1] Implement reduce() for digit reduction (preserve master numbers optionally)
- [ ] T021 [US1] Implement calculateStack() producing Core/Engine/Interface
- [ ] T022 [US1] Create SeedGenerator in `src/lib/token/SeedGenerator.ts`
- [ ] T023 [US1] Implement deterministic hash from token string
- [ ] T024 [US1] Implement deriveSeed() for visual/audio/cipher sub-seeds
- [ ] T025 [US1] Create TokenInput component in `src/components/TokenInput.tsx`
- [ ] T026 [US1] Create TokenAnalysisPanel component in `src/components/TokenAnalysisPanel.tsx`
- [ ] T027 [US1] Display decomposition visual (BLOCK + HINGE + POSTS boxes)
- [ ] T028 [US1] Display numerological stack values with labels
- [ ] T029 [US1] Connect input → mythologyStore → analyzer → display

**Checkpoint**: Token analysis works with visual feedback

---

## Phase 4: User Story 2 - Activate Four As States (Priority: P1)

**Goal**: User can toggle Four As domains, see workflow recommendations

**Independent Test**: Toggle Auctor + Ars active, see "Creation workflow" recommendation

### Implementation for User Story 2

- [ ] T030 [US2] Create FourAsState class in `src/lib/four-as/FourAsState.ts`
- [ ] T031 [US2] Implement default state (all inactive)
- [ ] T032 [US2] Implement toggle(domain) method
- [ ] T033 [US2] Implement getActive() returning active domain list
- [ ] T034 [US2] Create FourAsRecommender in `src/lib/four-as/FourAsRecommender.ts`
- [ ] T035 [US2] Implement recommendation logic based on active combinations
- [ ] T036 [US2] Create FourAsPanel component in `src/components/FourAsPanel.tsx`
- [ ] T037 [US2] Create toggle buttons for each domain (Auctor, Ars, Archive, Apparatus)
- [ ] T038 [US2] Display current recommendation text
- [ ] T039 [US2] Add vision/intent/tools input fields for each domain
- [ ] T040 [US2] Connect toggles → mythologyStore → recommender → display

**Checkpoint**: Four As toggling and recommendations work

---

## Phase 5: User Story 3 - Apply Phi Operators (Priority: P2)

**Goal**: User can apply φ-operators to values, see before/after

**Independent Test**: Apply φ+ to 100, see result 161.8 with explanation

### Implementation for User Story 3

- [ ] T041 [US3] Create PhiOperators module in `src/lib/phi/PhiOperators.ts`
- [ ] T042 [US3] Implement phiExpand (φ+): value × PHI
- [ ] T043 [US3] Implement phiContract (φ-): value / PHI
- [ ] T044 [US3] Implement phiAlign (φ≈): snap to nearest φ-multiple within tolerance
- [ ] T045 [US3] Implement phiRecalibrate (φ//): snap to nearest Fibonacci
- [ ] T046 [US3] Implement phiRecurse (φ🌀): expand array with φ-interpolated values
- [ ] T047 [US3] Implement phiBlend (φ⊕): weighted average of two values
- [ ] T048 [US3] Create FibonacciUtils in `src/lib/phi/FibonacciUtils.ts`
- [ ] T049 [US3] Implement getFibonacciSequence(n) and nearestFibonacci(value)
- [ ] T050 [US3] Create PhiOperatorPanel component in `src/components/PhiOperatorPanel.tsx`
- [ ] T051 [US3] Create value input field
- [ ] T052 [US3] Create operator buttons (6 operators)
- [ ] T053 [US3] Display result with explanation text
- [ ] T054 [US3] Add array input mode for φ🌀 and φ⊕

**Checkpoint**: All phi operators work with visual feedback

---

## Phase 6: User Story 4 - Decision Framework (Priority: P2)

**Goal**: User runs decisions through 4-7-6 matrix, gets recommendation

**Independent Test**: Answer 12 questions, score 8/12, see "Proceed with caution"

### Implementation for User Story 4

- [ ] T055 [US4] Create Questions constant in `src/lib/decision/Questions.ts`
- [ ] T056 [US4] Define 12 questions grouped by filter (Core/Engine/Interface)
- [ ] T057 [US4] Create Scorer in `src/lib/decision/Scorer.ts`
- [ ] T058 [US4] Implement score() calculating Y count per filter
- [ ] T059 [US4] Implement getRecommendation() based on total score
- [ ] T060 [US4] Create DecisionMatrix class in `src/lib/decision/DecisionMatrix.ts`
- [ ] T061 [US4] Implement runDecision() orchestrating Q&A and scoring
- [ ] T062 [US4] Create DecisionMatrix component in `src/components/DecisionMatrix.tsx`
- [ ] T063 [US4] Display questions grouped by filter with Y/N buttons
- [ ] T064 [US4] Calculate and display running score
- [ ] T065 [US4] Display final recommendation with failed filters highlighted

**Checkpoint**: Decision framework provides actionable recommendations

---

## Phase 7: User Story 5 - Ritual Calendar (Priority: P3)

**Goal**: User sees ritual calendar with daily/weekly/monthly cycles

**Independent Test**: View Monday, see "AUCTOR day: Vision and decisions"

### Implementation for User Story 5

- [ ] T066 [US5] Create RitualCalendar in `src/lib/calendar/RitualCalendar.ts`
- [ ] T067 [US5] Implement getDailyFocus(dayOfWeek) mapping to Four As
- [ ] T068 [US5] Implement getWeeklyPhase(weekOfMonth)
- [ ] T069 [US5] Implement getMonthlyTheme(month)
- [ ] T070 [US5] Implement getYearlyEvent(date) for special dates (4/4, solstices)
- [ ] T071 [US5] Create CycleTracker in `src/lib/calendar/CycleTracker.ts`
- [ ] T072 [US5] Implement getCurrentCycle() returning current focus at all levels
- [ ] T073 [US5] Create CalendarView component in `src/components/CalendarView.tsx`
- [ ] T074 [US5] Display current day's focus with prompt
- [ ] T075 [US5] Display weekly/monthly overview
- [ ] T076 [US5] Highlight special dates (4/4 celebration)

**Checkpoint**: Calendar shows current ritual focus

---

## Phase 8: User Story 6 - Generate Seeds (Priority: P3)

**Goal**: User generates deterministic seeds for creative processes

**Independent Test**: Generate seed twice, same value both times

### Implementation for User Story 6

- [ ] T077 [US6] Enhance SeedGenerator with comprehensive hashing
- [ ] T078 [US6] Implement combineWithNumerology() adding stack values to seed
- [ ] T079 [US6] Create SeedGenerator component in `src/components/SeedGenerator.tsx`
- [ ] T080 [US6] Display master seed and derived sub-seeds
- [ ] T081 [US6] Add "Copy to Clipboard" functionality
- [ ] T082 [US6] Show seed stability notice (same input = same output)

**Checkpoint**: Seeds are deterministic and copyable

---

## Phase 9: Integration Bridges (Cross-Phase)

**Purpose**: Connect to Phase 1 and Phase 2

- [ ] T083 Create IdentityBridge in `src/lib/integration/IdentityBridge.ts`
- [ ] T084 Implement bridgeToCreativeIdentity() combining personal + mythology
- [ ] T085 Create CipherBridge in `src/lib/integration/CipherBridge.ts`
- [ ] T086 Implement deriveCipherConfig() using Four As and numerology
- [ ] T087 Document bridge APIs in README

**Checkpoint**: Library can integrate with Phase 1 and Phase 2

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements

- [ ] T088 [P] Add loading states for calculations
- [ ] T089 [P] Add input validation with error messages
- [ ] T090 Export library as standalone package
- [ ] T091 Add comprehensive JSDoc comments for public API
- [ ] T092 Create usage examples in demo app
- [ ] T093 Run quickstart validation scenarios from plan.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup
- **User Stories (Phase 3-8)**: All depend on Foundational
  - US1 (P1): Can start after Foundational - token analysis
  - US2 (P1): Can start parallel with US1 - Four As
  - US3 (P2): Can start after Foundational - phi operators (standalone)
  - US4 (P2): Can start after Foundational - decision framework (standalone)
  - US5 (P3): Can start after US2 - needs Four As mapping
  - US6 (P3): Can start after US1 - needs token + numerology
- **Integration (Phase 9)**: After US1, US2, US3
- **Polish (Phase 10)**: After all features

### Parallel Opportunities

- T003, T004, T005 in Setup
- T010 in Foundational (parallel with core types)
- US1 and US2 can run in parallel (different domains)
- US3 and US4 can run in parallel (standalone features)
- T088, T089 in Polish

---

## Implementation Strategy

### MVP First (User Stories 1+2)

1. Complete Setup (T001-T006)
2. Complete Foundational (T007-T012)
3. Complete US1 (T013-T029) - Token analysis
4. Complete US2 (T030-T040) - Four As
5. **STOP and VALIDATE**: Token decomposes, Four As toggles, recommendations show
6. Library is usable for basic mythology

### Incremental Enhancement

After MVP:
- US3 → Phi operators (adds transformation capability)
- US4 → Decision framework (actionable governance)
- US5 → Calendar (ritual operationalization)
- US6 → Seeds (reproducibility)
- Integration → Connect to other phases

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to user story for traceability
- Library-first: core logic must work without React
- Commit after each task or logical group
- PHI = (1 + Math.sqrt(5)) / 2 = 1.6180339887...
