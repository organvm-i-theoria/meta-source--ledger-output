# Implementation Plan: Cipher Rendering Pipeline

**Branch**: `phase-2-cipher-rendering` | **Date**: 2026-01-31 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/phase-2-cipher/spec.md`

## Summary

Build a unified visualization framework for encryption/cipher systems that treats all ciphers as state machines with interchangeable visual renderers. Technical approach: TypeScript cipher implementations with pluggable Canvas/WebGL visual metaphors, timeline-based animation system.

## Technical Context

**Language/Version**: TypeScript 5.3+
**Primary Dependencies**: React 18, Three.js 0.160 (3D rotors), p5.js 1.9 (2D grids), Canvas API (wheel/cascade)
**Storage**: Session state only (no persistence required for P1)
**Testing**: Vitest for cipher logic, Playwright for visual regression
**Target Platform**: Modern browsers (Chrome 90+, Firefox 90+, Safari 15+)
**Project Type**: Single web application (can share codebase with Phase 1)
**Performance Goals**: 60fps animation, <50ms per character encryption
**Constraints**: Historical accuracy for Enigma, educational clarity for all ciphers
**Scale/Scope**: Up to 1000 character messages, 15+ cipher types eventually

## Project Structure

### Documentation (this feature)

```
specs/phase-2-cipher/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Cipher mechanics research
├── data-model.md        # State machine definitions
├── contracts/           # Cipher interfaces
└── tasks.md             # Task list
```

### Source Code (repository root)

```
cipher-rendering/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── core/
│   │   ├── types.ts                    # Core interfaces
│   │   ├── CipherInterface.ts          # ICipher abstract
│   │   └── events.ts                   # Event types
│   ├── ciphers/
│   │   ├── index.ts
│   │   ├── CaesarCipher.ts
│   │   ├── VigenereCipher.ts
│   │   ├── EnigmaCipher.ts
│   │   ├── enigma/
│   │   │   ├── Rotor.ts
│   │   │   ├── Reflector.ts
│   │   │   └── Plugboard.ts
│   │   └── registry.ts                 # Cipher registry
│   ├── metaphors/
│   │   ├── index.ts
│   │   ├── VisualMetaphorInterface.ts  # IVisualMetaphor
│   │   ├── WheelRenderer.ts            # Caesar wheel
│   │   ├── GridRenderer.ts             # Generic grid
│   │   ├── TabulaRectaRenderer.ts      # Vigenere table
│   │   ├── RotorMechanicsRenderer.ts   # Enigma 3D
│   │   ├── MatrixCascadeRenderer.ts    # Digital rain
│   │   └── registry.ts                 # Metaphor registry
│   ├── animation/
│   │   ├── index.ts
│   │   ├── AnimationController.ts
│   │   ├── Timeline.ts
│   │   ├── Easing.ts
│   │   └── StateInterpolator.ts
│   ├── store/
│   │   ├── cipherStore.ts
│   │   ├── animationStore.ts
│   │   └── viewStore.ts
│   ├── components/
│   │   ├── CipherSelector.tsx
│   │   ├── ConfigPanel.tsx
│   │   ├── InputPanel.tsx
│   │   ├── MetaphorCanvas.tsx
│   │   ├── PlaybackControls.tsx
│   │   ├── TimelineScrubber.tsx
│   │   └── ComparativeView.tsx
│   ├── hooks/
│   │   ├── useCipher.ts
│   │   ├── useAnimation.ts
│   │   └── useMetaphor.ts
│   └── utils/
│       ├── math.ts
│       └── alphabet.ts
└── tests/
    ├── unit/
    │   ├── caesar.test.ts
    │   ├── vigenere.test.ts
    │   └── enigma.test.ts
    └── e2e/
        └── encryption-flow.spec.ts
```

**Structure Decision**: Single project with clear separation: ciphers (logic), metaphors (rendering), animation (timing). Metaphors are pluggable per cipher family.

## Research Summary

### Cipher Implementations

**Caesar Cipher**:
- Shift alphabet by fixed amount (0-25)
- Formula: C = (P + k) mod 26
- Simple but validates architecture

**Vigenere Cipher**:
- Polyalphabetic using keyword
- Lookup via Tabula Recta (26x26 table)
- Key cycles: KEYKEYKEYKEY...

**Enigma Machine**:
- 3 rotors (I-V available), reflector (B or C), plugboard
- Signal path: Plugboard → ETW → Rotors → Reflector → Rotors → ETW → Plugboard → Lamp
- Double-stepping anomaly: middle rotor steps twice when at notch
- Historically accurate wiring tables required

### Visual Metaphors

| Cipher Family | Recommended Metaphors |
|---------------|----------------------|
| Simple Substitution | Wheel, Grid, Cascade |
| Polyalphabetic | Tabula Recta, Flow, Cascade |
| Mechanical | Rotor 3D, Signal Path, Schematic |

### Animation Approach

- State machine produces CipherState objects
- Timeline captures state snapshots at each step
- Renderers interpolate between states
- Easing functions control animation curves

## Data Model Summary

See `data-model.md` for full definitions. Key entities:

1. **CipherState**: Current encryption state (step, data, visual hints)
2. **CipherEvent**: Single transformation event (substitution, rotor step, etc.)
3. **AnimationTimeline**: Sequence of keyframes with timestamps
4. **VisualMetaphor**: Renderer that transforms state to visuals

## Key Interfaces

```typescript
// Abstract cipher interface
interface ICipher {
  readonly id: string;
  readonly name: string;
  readonly family: CipherFamily;

  configure(config: CipherConfig): void;
  getInitialState(): CipherState;
  step(state: CipherState, input: string): StepResult;
  encrypt(plaintext: string): EncryptionResult;
  getVisualHints(): VisualHints;
}

// Cipher state representation
interface CipherState {
  id: string;
  step: number;
  timestamp: number;
  data: Record<string, unknown>;
  visual: {
    focus: FocusTarget[];
    annotations: Annotation[];
    transforms: Transform[];
  };
  transition?: TransitionMeta;
}

// Visual renderer interface
interface IVisualMetaphor {
  readonly id: string;
  readonly supportedFamilies: CipherFamily[];

  initialize(container: HTMLElement, config: RenderConfig): void;
  render(state: CipherState): void;
  animate(from: CipherState, to: CipherState, duration: number): Promise<void>;
  destroy(): void;
}
```

## Cipher Implementations

### Caesar Cipher

```
Configuration: { shift: number (0-25), alphabet?: string }
State: { shift, processedChars, plaintext, ciphertext }
Visual hints: Prefer wheel, grid, cascade metaphors

Step process:
1. Get character from input
2. Find index in alphabet
3. Add shift (mod 26)
4. Output character at new index
5. Emit SUBSTITUTION event
```

### Vigenere Cipher

```
Configuration: { keyword: string }
State: { keyword, keyIndex, processedChars, plaintext, ciphertext }
Visual hints: Prefer tabula_recta, flow metaphors

Step process:
1. Get plaintext character
2. Get key character at keyIndex
3. Look up intersection in Tabula Recta
4. Emit KEY_APPLICATION + SUBSTITUTION events
5. Increment keyIndex (mod keyword.length)
```

### Enigma Machine

```
Configuration: {
  rotorOrder: string[] (e.g., ['III', 'II', 'I']),
  reflector: 'B' | 'C',
  ringSettings: number[],
  startPositions: number[],
  plugboard: string (e.g., 'AB CD EF')
}

State: {
  rotorPositions: number[],
  signalPath: SignalPathPoint[],
  processedChars,
  plaintext,
  ciphertext
}

Step process:
1. Step rotors (check double-stepping)
2. Apply plugboard swap
3. Pass through rotors right-to-left
4. Reflect
5. Pass through rotors left-to-right
6. Apply plugboard swap
7. Emit ROTOR_STEP + SUBSTITUTION events
```

## Visual Metaphor Architecture

### Metaphor Registry

```typescript
class MetaphorRegistry {
  register(metaphor: IVisualMetaphor): void;
  get(id: string): IVisualMetaphor | undefined;
  getCompatible(family: CipherFamily): IVisualMetaphor[];
}
```

### Wheel Renderer (Caesar)

- Two concentric rings: outer (plaintext), inner (ciphertext)
- Inner ring rotates by shift amount
- Highlights connected letters during substitution
- Technologies: Canvas 2D

### Tabula Recta Renderer (Vigenere)

- 26x26 grid with header row/column
- Highlights current row (plaintext), column (key), cell (output)
- Row highlighting follows key cycling
- Technologies: Canvas 2D

### Rotor Mechanics Renderer (Enigma)

- 3D cylinders for rotors with letter engravings
- Animated rotation on stepping
- Signal path traced as light beam
- Technologies: Three.js with custom shaders

### Matrix Cascade Renderer (Universal)

- Digital rain columns with glyphs
- Character transformations animate as falling particles
- Matrix-style phosphorescent green on black
- Technologies: Canvas 2D with requestAnimationFrame

## Animation System

### Timeline Management

```typescript
interface AnimationTimeline {
  duration: number;
  keyframes: Keyframe[];
}

interface Keyframe {
  time: number;
  state: CipherState;
  easing: EasingFunction;
}
```

### Easing Functions

- linear: t → t
- easeIn: t → t²
- easeOut: t → t(2-t)
- easeInOut: t → t < 0.5 ? 2t² : -1 + (4-2t)t
- elastic: Bouncy overshoot for mechanical feel

### State Interpolation

For smooth transitions, interpolate between states:
- Numeric values: linear interpolation
- Rotor angles: angular interpolation (shortest path)
- Focus targets: blend opacity

## Playback Controls

| Control | Function |
|---------|----------|
| Play | Start/resume animation |
| Pause | Freeze at current state |
| Step Forward | Advance one encryption step |
| Step Back | Rewind one encryption step |
| Speed | 0.25x, 0.5x, 1x, 2x, 4x |
| Scrubber | Drag to any point in timeline |

## State Management (Zustand)

```typescript
// cipherStore
- cipher: ICipher | null
- state: CipherState | null
- setCipher(cipher)
- configure(config)
- step(input)
- reset()

// animationStore
- timeline: AnimationTimeline | null
- currentTime: number
- isPlaying: boolean
- speed: number
- play() / pause() / seek(time) / setSpeed(speed)

// viewStore
- metaphorId: string
- comparativeMode: boolean
- setMetaphor(id)
- toggleComparative()
```

## Performance Optimizations

1. **Event batching**: Collect multiple events before triggering render
2. **Canvas reuse**: Don't recreate canvas on metaphor switch
3. **WebGL for 3D**: Enigma rotor renderer uses GPU acceleration
4. **Frame skipping**: If animation falls behind, skip to catch up
5. **State diffing**: Only re-render changed visual elements

## Quickstart Validation

After implementation, verify:

1. Caesar "ABC" shift 3 → "DEF" with wheel animation
2. Vigenere "HELLO" key "KEY" → "RIJVS" with table highlighting
3. Enigma basic config → Historically accurate output
4. Switch metaphor mid-animation → State preserved, visual changes
5. Scrub timeline → All renderers respond synchronously
6. Speed 0.5x → Animation slows, maintains smoothness
