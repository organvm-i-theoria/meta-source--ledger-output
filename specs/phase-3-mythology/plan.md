# Implementation Plan: 4444jPP Symbolic System

**Branch**: `phase-3-mythology-system` | **Date**: 2026-01-31 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/phase-3-mythology/spec.md`

## Summary

Build a personal mythology framework implementing the 4444jPP identity system as design governance. Technical approach: TypeScript core library with React UI, exportable as standalone module for integration with Phase 1 and Phase 2.

## Technical Context

**Language/Version**: TypeScript 5.3+
**Primary Dependencies**: React 18, Zustand 4, date-fns (calendar), crypto.getRandomValues (seeding)
**Storage**: localStorage for mythology configuration, optional cloud sync later
**Testing**: Vitest for pure functions (φ-operators, numerology), Playwright for UI flows
**Target Platform**: Modern browsers, designed as embeddable library
**Project Type**: Library + Demo application
**Performance Goals**: <50ms token analysis, deterministic seed generation
**Constraints**: Must integrate cleanly with Phase 1 and Phase 2 without tight coupling
**Scale/Scope**: Single-user configuration, no multi-tenant

## Project Structure

### Documentation (this feature)

```
specs/phase-3-mythology/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Mythology system design
├── data-model.md        # Entity definitions
├── contracts/           # Public API
└── tasks.md             # Task list
```

### Source Code (repository root)

```
mythology-system/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html                      # Demo app entry
├── src/
│   ├── main.tsx                    # Demo app
│   ├── App.tsx
│   ├── lib/                        # Exportable library
│   │   ├── index.ts                # Public exports
│   │   ├── core/
│   │   │   ├── types.ts            # Core types
│   │   │   ├── constants.ts        # PHI, numerology maps
│   │   │   └── MythologyToken.ts   # Token class
│   │   ├── token/
│   │   │   ├── TokenAnalyzer.ts    # Decomposition logic
│   │   │   ├── NumerologyStack.ts  # 4-7-6 calculation
│   │   │   └── SeedGenerator.ts    # Deterministic seeds
│   │   ├── four-as/
│   │   │   ├── FourAsState.ts      # State tracking
│   │   │   ├── FourAsGovernor.ts   # Algorithm filtering
│   │   │   └── FourAsRecommender.ts# Workflow suggestions
│   │   ├── phi/
│   │   │   ├── PhiOperators.ts     # All 6 operators
│   │   │   ├── GoldenRatio.ts      # φ utilities
│   │   │   └── FibonacciUtils.ts   # Fibonacci helpers
│   │   ├── decision/
│   │   │   ├── DecisionMatrix.ts   # 4-7-6 framework
│   │   │   ├── Questions.ts        # 12 questions
│   │   │   └── Scorer.ts           # Scoring logic
│   │   ├── calendar/
│   │   │   ├── RitualCalendar.ts   # Cycle mapping
│   │   │   ├── DailyRitual.ts      # Day focus
│   │   │   └── CycleTracker.ts     # Current position
│   │   └── integration/
│   │       ├── IdentityBridge.ts   # Phase 1 integration
│   │       └── CipherBridge.ts     # Phase 2 integration
│   ├── store/
│   │   ├── mythologyStore.ts       # Zustand store
│   │   └── calendarStore.ts
│   ├── components/
│   │   ├── TokenInput.tsx
│   │   ├── TokenAnalysisPanel.tsx
│   │   ├── FourAsPanel.tsx
│   │   ├── PhiOperatorPanel.tsx
│   │   ├── DecisionMatrix.tsx
│   │   ├── CalendarView.tsx
│   │   └── SeedGenerator.tsx
│   └── hooks/
│       ├── useMythology.ts
│       ├── useFourAs.ts
│       └── useCalendar.ts
└── tests/
    ├── unit/
    │   ├── token-analyzer.test.ts
    │   ├── phi-operators.test.ts
    │   └── decision-matrix.test.ts
    └── integration/
        └── mythology-flow.test.ts
```

**Structure Decision**: Library-first architecture. Core logic in `/lib` is framework-agnostic TypeScript. React components in `/components` provide UI. Library can be imported by Phase 1/2/4.

## Research Summary

### Token Analysis

The 4444jPP token decomposes as:
- **BLOCK**: Repeated digits/letters at start (4444)
- **HINGE**: Lowercase letters connecting segments (j)
- **POSTS**: Uppercase letters at end (PP)

General algorithm for any token:
1. Identify character class transitions
2. Group consecutive same-class characters
3. Label as BLOCK (digits/initial), HINGE (lowercase), POSTS (uppercase)

### Numerological Stack

For "4444jPP":
- Digits sum: 4+4+4+4 = 16 → 1+6 = 7 (but full reduction = 4)
- Letters: j=1, P=7, P=7 → 15 → 6
- Combined: 4 (Core), 7 (Engine), 6 (Interface)

Pythagorean mapping used for letter values.

### Phi Operators

| Operator | Operation | Mathematical Basis |
|----------|-----------|-------------------|
| φ+ | Expand | multiply by φ (1.618...) |
| φ- | Contract | divide by φ |
| φ≈ | Align | snap to nearest φ-multiple if within tolerance |
| φ// | Recalibrate | snap to nearest Fibonacci number |
| φ🌀 | Recurse | expand with interpolated φ-proportioned values |
| φ⊕ | Blend | requires two inputs, weighted average by φ |

### Four As Framework

| A | Full Name | Domain | Active Focus |
|---|-----------|--------|--------------|
| 4₁ | AUCTOR | Author-Self | Vision, decisions, intent |
| 4₂ | ARS | Craft/Practice | Technical execution, tools |
| 4₃ | ARCHIVE | Corpus/Records | Documentation, preservation |
| 4₄ | APPARATUS | Machines/OS | Infrastructure, systems |

### Ritual Calendar

Mapping time periods to Four As:
- **Daily**: Mon=Auctor, Tue/Wed=Ars, Thu=Archive, Fri=Apparatus
- **Monthly**: Week 1=Launch, Week 2=Build, Week 3=Reflect, Week 4=Complete
- **Yearly**: Q1=Auctor, Q2=Ars, Q3=Archive, Q4=Apparatus

## Data Model Summary

See `data-model.md` for full definitions. Key entities:

1. **MythologyToken**: Identity string with decomposition metadata
2. **FourAsState**: Active/inactive states for each domain
3. **NumerologicalStack**: Core, Engine, Interface values
4. **PhiOperation**: Function transforming values by φ
5. **DecisionMatrix**: 12-question framework with scoring

## Key Interfaces

```typescript
// Core token type
interface MythologyToken {
  raw: string;
  decomposition: {
    block: string;
    hinge: string;
    posts: string;
  };
  numerology: NumerologicalStack;
  seeds: {
    master: number;
    visual: number;
    audio: number;
    cipher: number;
  };
}

// Four As state
interface FourAsState {
  auctor: { vision: string; intent: string; active: boolean };
  ars: { currentCraft: string; tools: string[]; active: boolean };
  archive: { lastUpdate: Date; entryCount: number; active: boolean };
  apparatus: { environment: string; status: string; active: boolean };
}

// Phi operator type
type PhiOperator = 'φ+' | 'φ-' | 'φ≈' | 'φ//' | 'φ🌀' | 'φ⊕';

// Decision matrix result
interface DecisionResult {
  scores: { core: number; engine: number; interface: number };
  total: number;
  recommendation: 'proceed' | 'monitor' | 'caution' | 'reconsider';
  failedFilters: string[];
}
```

## Token Analysis Algorithm

```typescript
function analyzeToken(token: string): TokenDecomposition { // allow-secret: code example
  const parts: { type: string; value: string }[] = [];
  let currentType = getCharType(token[0]);
  let currentValue = '';

  for (const char of token) {
    const type = getCharType(char);
    if (type !== currentType) {
      parts.push({ type: currentType, value: currentValue });
      currentType = type;
      currentValue = char;
    } else {
      currentValue += char;
    }
  }
  parts.push({ type: currentType, value: currentValue });

  // Label: first group = BLOCK, lowercase = HINGE, uppercase = POSTS
  return {
    block: parts.find(p => p.type === 'digit' || p.type === 'initial')?.value || '',
    hinge: parts.find(p => p.type === 'lower')?.value || '',
    posts: parts.find(p => p.type === 'upper')?.value || ''
  };
}

function getCharType(char: string): string {
  if (/[0-9]/.test(char)) return 'digit';
  if (/[a-z]/.test(char)) return 'lower';
  if (/[A-Z]/.test(char)) return 'upper';
  return 'other';
}
```

## Phi Operators Implementation

```typescript
const PHI = (1 + Math.sqrt(5)) / 2; // 1.6180339887...

function phiExpand(value: number): number {
  return value * PHI;
}

function phiContract(value: number): number {
  return value / PHI;
}

function phiAlign(value: number, tolerance = 0.01): number {
  const multiple = Math.round(value / PHI);
  const aligned = multiple * PHI;
  return Math.abs(value - aligned) / value < tolerance ? aligned : value;
}

function phiRecalibrate(value: number): number {
  const fibs = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987];
  return fibs.reduce((closest, f) =>
    Math.abs(f - value) < Math.abs(closest - value) ? f : closest
  );
}

function phiRecurse(arr: unknown[]): unknown[] {
  const result = [...arr];
  const insertCount = Math.ceil(arr.length / PHI);
  for (let i = 0; i < insertCount; i++) {
    const idx = Math.floor(i * PHI) % arr.length;
    result.push(interpolateAt(arr, idx));
  }
  return result;
}

function phiBlend(a: number, b: number): number {
  return a * (1 / PHI) + b * (1 - 1 / PHI);
}
```

## Decision Matrix Implementation

12 questions across 3 filters:

**Filter 1: Core 4 (Stability)**
1. Does this build stable foundation?
2. Is the structure sound?
3. Does it support the system?
4. Will it endure?

**Filter 2: Engine 7 (Analysis)**
5. Have I analyzed the implications?
6. Is this based on research/evidence?
7. Have hidden patterns been considered?
8. Does introspection confirm this path?

**Filter 3: Interface 6 (Harmony)**
9. Is the output aesthetically coherent?
10. Does it harmonize with existing work?
11. Is it caring toward users/audience?
12. Does it serve the greater whole?

Scoring: Count Y answers per filter and total.
- 12/12: Proceed with confidence
- 9-11: Proceed with monitoring
- 6-8: Proceed with caution
- <6: Reconsider or pause

## State Management

```typescript
// mythologyStore
- token: MythologyToken | null  # allow-secret: type definition
- fourAs: FourAsState
- setToken(raw: string)
- toggleFourAs(key: keyof FourAsState)
- updateFourAs(key: keyof FourAsState, partial: Partial<...>)
- generateSeeds()
- reset()

// calendarStore
- currentCycle: { daily: string; weekly: number; monthly: string }
- rituals: RitualReminder[]
- getCurrentFocus(): string
- scheduleReminder(ritual: RitualConfig)
```

## Integration Hooks

For Phase 1 (Identity Playground):
```typescript
function bridgeToIdentity(identity: PersonalIdentity, mythology: MythologyToken): CreativeIdentity {
  return {
    ...identity,
    mythology: {
      token: mythology.raw, // allow-secret: code example
      fourAs: mythology.fourAs,
      numerologicalStack: mythology.numerology,
      activeOperators: []
    },
    seeds: mythology.seeds
  };
}
```

For Phase 2 (Cipher Rendering):
```typescript
function bridgeToCipher(mythology: MythologyToken, cipherFamily: CipherFamily): CipherConfig {
  // Four As → rotor selection for Enigma
  // Numerology → shift/key values
  // Seeds → plugboard generation
}
```

## Quickstart Validation

After implementation, verify:

1. Enter "4444jPP" → Decomposition shows BLOCK=4444, HINGE=j, POSTS=PP
2. View numerology → Stack shows Core=4, Engine=7, Interface=6
3. Apply φ+ to 100 → Result is 161.8
4. Toggle Auctor active → Recommendations change to vision focus
5. Run decision with 8 Y answers → Shows "Proceed with caution"
6. View calendar on Monday → Shows "AUCTOR day: Vision and decisions"
7. Generate seed twice → Same value both times (deterministic)
