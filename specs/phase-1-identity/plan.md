# Implementation Plan: Identity Playground

**Branch**: `phase-1-identity-playground` | **Date**: 2026-01-31 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/phase-1-identity/spec.md`

## Summary

Build a web-based generative art platform that transforms personal identity data into visual representations using numerology algorithms and sacred geometry patterns. Technical approach: React/TypeScript frontend with p5.js/Three.js rendering, Zustand state management, Vite build tooling.

## Technical Context

**Language/Version**: TypeScript 5.3+
**Primary Dependencies**: React 18, p5.js 1.9, Three.js 0.160, Tone.js 14, Zustand 4, Framer Motion 10
**Storage**: localStorage for identity persistence, IndexedDB for large exports
**Testing**: Vitest for unit tests, Playwright for E2E
**Target Platform**: Modern browsers (Chrome 90+, Firefox 90+, Safari 15+)
**Project Type**: Single web application
**Performance Goals**: 60fps 2D rendering, <100ms parameter response
**Constraints**: 16GB RAM development machine, no server-side required
**Scale/Scope**: Single-user local application, no auth needed

## Project Structure

### Documentation (this feature)

```
specs/phase-1-identity/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Technology decisions
├── data-model.md        # Entity definitions
├── contracts/           # API specifications (internal interfaces)
└── tasks.md             # Task list
```

### Source Code (repository root)

```
identity-playground/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── src/
│   ├── main.tsx                    # Application entry
│   ├── App.tsx                     # React root
│   ├── core/
│   │   ├── types.ts                # Core type definitions
│   │   ├── config.ts               # App configuration
│   │   └── events.ts               # Event bus
│   ├── numerology/
│   │   ├── index.ts
│   │   ├── PythagoreanCalculator.ts
│   │   ├── ChaldeanCalculator.ts
│   │   ├── GematriaCalculator.ts
│   │   └── NumerologyEngine.ts     # Unified engine
│   ├── proportions/
│   │   ├── index.ts
│   │   ├── GoldenRatio.ts
│   │   ├── Fibonacci.ts
│   │   ├── Phyllotaxis.ts
│   │   └── SacredGeometry.ts
│   ├── rendering/
│   │   ├── index.ts
│   │   ├── P5Renderer.ts           # 2D canvas
│   │   ├── ThreeRenderer.ts        # 3D WebGL
│   │   ├── AnimationController.ts
│   │   └── shaders/
│   ├── store/
│   │   ├── identityStore.ts        # Identity state
│   │   ├── visualStore.ts          # Visual params
│   │   └── appStore.ts             # App-level state
│   ├── components/
│   │   ├── IdentityForm.tsx
│   │   ├── NumerologyPanel.tsx
│   │   ├── ParameterPanel.tsx
│   │   ├── Canvas2D.tsx
│   │   ├── Canvas3D.tsx
│   │   ├── ExportPanel.tsx
│   │   └── IdentityList.tsx
│   ├── hooks/
│   │   ├── useIdentity.ts
│   │   ├── useNumerology.ts
│   │   └── useRenderer.ts
│   ├── export/
│   │   ├── PNGExporter.ts
│   │   ├── SVGExporter.ts
│   │   └── MetadataGenerator.ts
│   └── utils/
│       ├── math.ts
│       ├── color.ts
│       └── validation.ts
└── tests/
    ├── unit/
    │   ├── numerology.test.ts
    │   └── proportions.test.ts
    └── e2e/
        └── identity-flow.spec.ts
```

**Structure Decision**: Single project structure with clear domain separation (numerology, proportions, rendering). No backend needed—all processing client-side.

## Research Summary

### Numerology Systems

- **Pythagorean**: Most common Western system. A=1 through I=9, cycling. Master numbers 11, 22, 33 preserved.
- **Chaldean**: Babylonian origin. Different mapping, no 9 (sacred number excluded). Considered more accurate by practitioners.
- **Gematria**: Hebrew-origin with larger values. Used for word-to-number encoding.

### Rendering Approach

- **p5.js**: Best for 2D generative art. Simple API, good for phyllotaxis/spirals. CPU-bound but sufficient for <10K particles.
- **Three.js**: Required for 3D. Scene graph abstraction over WebGL. Orbit controls built-in.
- **Hybrid approach**: p5.js for 2D mode, Three.js for 3D. Both share parameter state via Zustand.

### Golden Ratio in Generation

- φ = 1.6180339887... (PHI)
- Golden angle = 137.5077640500378546° (optimal phyllotaxis)
- Fibonacci-based sizing creates natural proportion hierarchy

## Data Model Summary

See `data-model.md` for full definitions. Key entities:

1. **PersonalIdentity**: Core input data (name, birthdate, words)
2. **NumerologyProfile**: Calculated values per system
3. **VisualConfig**: Rendering parameters
4. **GeneratedOutput**: Exportable artifact with metadata

## Key Interfaces

```typescript
// Core identity input
interface PersonalIdentity {
  id: string;
  name: string;
  birthdate: string;
  meaningfulWords: string[];
  created: Date;
  updated: Date;
}

// Numerology calculation result
interface NumerologyProfile {
  system: 'pythagorean' | 'chaldean' | 'gematria';
  destiny: number;
  lifePath: number;
  soulUrge: number;
  personality: number;
  expression: number;
  rawSum: number;
  isMasterNumber: boolean;
}

// Visual generation parameters
interface VisualConfig {
  mode: '2d' | '3d';
  width: number;
  height: number;
  pointCount: number;
  colorPrimary: string;
  animationSpeed: number;
  seed: number;
}
```

## Algorithm Selection

| Use Case | Algorithm | Rationale |
|----------|-----------|-----------|
| Name encoding | Pythagorean (default) | Most familiar to users, well-documented |
| Pattern generation | Phyllotaxis | Golden angle produces natural spirals |
| Proportions | Fibonacci series | Direct φ relationship, recursive beauty |
| Color mapping | HSL color space | Intuitive hue control, easy harmony |
| Animation | requestAnimationFrame | Browser-native, efficient |

## Component Architecture

```
App
├── Header (title, mode toggle)
├── IdentityForm (input controls)
├── MainView
│   ├── Canvas2D (p5.js) OR Canvas3D (Three.js)
│   └── NumerologyPanel (calculated values)
├── Sidebar
│   ├── ParameterPanel (visual controls)
│   └── ExportPanel (export buttons)
└── IdentityList (saved identities)
```

## State Management

Using Zustand for simplicity and React integration:

```typescript
// identityStore
- identity: PersonalIdentity | null
- profile: NumerologyProfile | null
- setIdentity(identity)
- calculateProfile(system)
- clear()

// visualStore
- config: VisualConfig
- isPlaying: boolean
- setConfig(partial)
- play() / pause() / reset()

// appStore
- savedIdentities: PersonalIdentity[]
- currentSystem: NumerologySystem
- save() / load(id) / delete(id)
```

## Performance Strategy

1. **Memoization**: useMemo for expensive calculations (numerology, pattern generation)
2. **Debouncing**: 100ms debounce on parameter sliders during drag
3. **Canvas optimization**: p5.js instance mode, avoid recreating on parameter change
4. **3D optimization**: Reuse geometries, limit draw calls, instanced rendering for particles

## Export Strategy

| Format | Method | Use Case |
|--------|--------|----------|
| PNG | canvas.toBlob() | Static artwork |
| SVG | Custom path generation | Scalable vectors |
| WebM | MediaRecorder API | Animated exports |
| JSON | Structured metadata | Reproducibility |

## Validation Rules

- Name: Required, 1-100 characters, A-Z only (with warning for filtered chars)
- Birthdate: Optional, valid date, not future
- Meaningful words: Optional, comma-separated, max 10 words

## Quickstart Validation

After implementation, verify:

1. Enter "Jane Doe" + "1990-04-15" → Pythagorean destiny = 9
2. Switch to Chaldean → Destiny value changes, max digit = 8
3. Adjust point count slider → Visualization updates <100ms
4. Export PNG → File downloads with correct dimensions
5. Save identity → Reload page → Identity restored from localStorage
