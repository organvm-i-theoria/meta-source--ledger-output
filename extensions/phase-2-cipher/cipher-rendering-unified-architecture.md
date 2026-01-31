# Cipher Rendering: Unified Architecture Specification

## Multi-Cipher Visualization Framework

**Document Type:** Technical Specification
**Version:** 1.0
**Extends:** `code & cipher/05_SYNTHESIS_REPORT_PREVIEW.md`
**Purpose:** Abstract cipher interface supporting 15+ cipher types with unified rendering pipeline

---

## Executive Summary

This specification defines a unified architecture for rendering diverse cipher systems through a common visualization framework. The core innovation is treating all ciphers as instances of a generic **State Transition Machine** that can be rendered through interchangeable **Visual Metaphor Layers**.

**Key Architectural Decisions:**
1. **Cipher-Agnostic Core:** Abstract state machine interface all ciphers implement
2. **Pluggable Visual Metaphors:** Matrix cascade, rotor mechanics, flow diagrams, etc.
3. **Unified Animation Framework:** Consistent timing, easing, and synchronization
4. **Mode Switching:** Same cipher data, multiple visual representations
5. **Comparative Views:** Side-by-side plaintext/key/ciphertext visualization

---

## System Architecture

### High-Level Component Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        CIPHER RENDERING SYSTEM                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐     │
│  │  CIPHER CORE    │───▶│  STATE MACHINE  │───▶│ VISUAL METAPHOR │     │
│  │  (Algorithm)    │    │  (Abstract)     │    │   (Renderer)    │     │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘     │
│         │                       │                       │               │
│         ▼                       ▼                       ▼               │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐     │
│  │ Caesar          │    │ State Snapshot  │    │ Matrix Cascade  │     │
│  │ Vigenère        │    │ Transition Log  │    │ Rotor Mechanics │     │
│  │ Enigma          │    │ Event Stream    │    │ Flow Diagram    │     │
│  │ RSA             │    │ Timeline        │    │ Grid Transform  │     │
│  │ AES             │    │ ...             │    │ ...             │     │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘     │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                     ANIMATION CONTROLLER                         │   │
│  │  • Timeline Management  • Easing Functions  • Sync Manager      │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                     INTERACTION LAYER                            │   │
│  │  • Parameter Sliders  • Timeline Scrubbing  • Mode Switching    │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Core Interfaces

### 1. Cipher Interface (Abstract)

```typescript
interface ICipher {
  // Identity
  readonly id: string;
  readonly name: string;
  readonly family: CipherFamily;
  readonly complexity: ComplexityLevel;

  // Configuration
  configure(config: CipherConfig): void;
  getConfig(): CipherConfig;
  validateConfig(config: CipherConfig): ValidationResult;

  // Core Operations
  encrypt(plaintext: string): EncryptionResult;
  decrypt(ciphertext: string): DecryptionResult;

  // State Machine Integration
  getInitialState(): CipherState;
  step(state: CipherState, input: string): StepResult;
  getStateDescription(state: CipherState): StateDescription;

  // Visualization Hooks
  getVisualHints(): VisualHints;
  getAnimationTimeline(input: string): AnimationTimeline;
}

enum CipherFamily {
  SUBSTITUTION_SIMPLE,      // Caesar, ROT13, Atbash
  SUBSTITUTION_POLY,        // Vigenère, Beaufort
  TRANSPOSITION,            // Rail Fence, Columnar
  MECHANICAL,               // Enigma, Lorenz
  STREAM,                   // RC4, ChaCha20
  BLOCK,                    // AES, DES
  ASYMMETRIC,               // RSA, ECC
  HASH                      // SHA, MD5 (one-way)
}

enum ComplexityLevel {
  ELEMENTARY,    // Single operation per character
  STANDARD,      // Multiple predictable operations
  COMPLEX,       // State-dependent operations
  ADVANCED       // Multi-round, key schedule
}
```

---

### 2. State Machine Interface

```typescript
interface CipherState {
  readonly id: string;
  readonly step: number;
  readonly timestamp: number;

  // Core state data (cipher-specific)
  data: Record<string, unknown>;

  // Visualization state
  visual: {
    focus: FocusTarget[];        // What to highlight
    annotations: Annotation[];    // Labels, guides
    transforms: Transform[];      // Position changes
  };

  // Transition metadata
  transition?: {
    from: string;                // Previous state ID
    trigger: string;             // What caused transition
    duration: number;            // Animation duration (ms)
  };
}

interface StepResult {
  nextState: CipherState;
  output: string;                // Character(s) produced
  events: CipherEvent[];         // Logged events for timeline
  complete: boolean;             // End of input?
}

interface CipherEvent {
  type: EventType;
  timestamp: number;
  data: Record<string, unknown>;
  visualizable: boolean;
}

enum EventType {
  INPUT_CHARACTER,
  SUBSTITUTION,
  TRANSPOSITION,
  KEY_APPLICATION,
  ROTOR_STEP,
  ROUND_COMPLETE,
  OUTPUT_CHARACTER,
  STATE_CHANGE,
  ERROR
}
```

---

### 3. Visual Metaphor Interface

```typescript
interface IVisualMetaphor {
  readonly id: string;
  readonly name: string;
  readonly supportedFamilies: CipherFamily[];

  // Lifecycle
  initialize(container: HTMLElement, config: RenderConfig): void;
  destroy(): void;

  // Rendering
  render(state: CipherState): void;
  animate(from: CipherState, to: CipherState, duration: number): Promise<void>;

  // State
  setHighlight(targets: FocusTarget[]): void;
  clearHighlight(): void;

  // Configuration
  setTheme(theme: VisualTheme): void;
  setScale(scale: number): void;
  setViewport(viewport: Viewport): void;

  // Export
  exportFrame(): ImageData;
  exportSVG(): string;
}

interface RenderConfig {
  width: number;
  height: number;
  dpr: number;           // Device pixel ratio
  theme: VisualTheme;
  animationSpeed: number;
  showLabels: boolean;
  showGuides: boolean;
}

interface VisualTheme {
  background: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  highlight: string;
  error: string;
  fontFamily: string;
  fontSize: number;
}
```

---

## Supported Cipher Implementations

### Tier 1: Core Ciphers (Priority Implementation)

| Cipher | Family | Complexity | Visual Metaphors |
|--------|--------|------------|------------------|
| Caesar | SUBSTITUTION_SIMPLE | ELEMENTARY | Wheel, Grid, Cascade |
| ROT13 | SUBSTITUTION_SIMPLE | ELEMENTARY | Wheel, Grid |
| Atbash | SUBSTITUTION_SIMPLE | ELEMENTARY | Mirror, Grid |
| Vigenère | SUBSTITUTION_POLY | STANDARD | Tabula Recta, Flow |
| Beaufort | SUBSTITUTION_POLY | STANDARD | Tabula Recta |
| Enigma | MECHANICAL | COMPLEX | Rotor 3D, Signal Path |
| Rail Fence | TRANSPOSITION | STANDARD | Zigzag Path |

### Tier 2: Extended Ciphers

| Cipher | Family | Complexity | Visual Metaphors |
|--------|--------|------------|------------------|
| Playfair | SUBSTITUTION_SIMPLE | STANDARD | 5×5 Grid |
| Hill | SUBSTITUTION_SIMPLE | STANDARD | Matrix Transform |
| Columnar | TRANSPOSITION | STANDARD | Column Reorder |
| RC4 | STREAM | STANDARD | Byte Stream |
| AES | BLOCK | ADVANCED | State Matrix, Rounds |
| RSA | ASYMMETRIC | ADVANCED | Number Theory |

### Tier 3: Historical/Educational

| Cipher | Family | Complexity | Visual Metaphors |
|--------|--------|------------|------------------|
| Polybius | SUBSTITUTION_SIMPLE | ELEMENTARY | 5×5 Grid |
| ADFGVX | SUBSTITUTION_POLY | COMPLEX | Grid + Columnar |
| Lorenz | MECHANICAL | ADVANCED | Teleprinter Wheels |
| Scytale | TRANSPOSITION | ELEMENTARY | Cylinder Wrap |
| Book Cipher | SUBSTITUTION_SIMPLE | STANDARD | Text Reference |

---

## Cipher Implementations

### Caesar Cipher

```typescript
class CaesarCipher implements ICipher {
  readonly id = 'caesar';
  readonly name = 'Caesar Cipher';
  readonly family = CipherFamily.SUBSTITUTION_SIMPLE;
  readonly complexity = ComplexityLevel.ELEMENTARY;

  private shift: number = 3;
  private alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  configure(config: CipherConfig): void {
    if (config.shift !== undefined) {
      this.shift = ((config.shift % 26) + 26) % 26;
    }
    if (config.alphabet) {
      this.alphabet = config.alphabet.toUpperCase();
    }
  }

  getConfig(): CipherConfig {
    return { shift: this.shift, alphabet: this.alphabet };
  }

  getInitialState(): CipherState {
    return {
      id: crypto.randomUUID(),
      step: 0,
      timestamp: Date.now(),
      data: {
        shift: this.shift,
        processedChars: 0,
        plaintext: '',
        ciphertext: ''
      },
      visual: {
        focus: [],
        annotations: [
          { type: 'label', text: `Shift: ${this.shift}`, position: 'top-right' }
        ],
        transforms: []
      }
    };
  }

  step(state: CipherState, input: string): StepResult {
    const char = input[0].toUpperCase();
    const index = this.alphabet.indexOf(char);
    let output: string;
    let events: CipherEvent[] = [];

    if (index !== -1) {
      const newIndex = (index + this.shift) % this.alphabet.length;
      output = this.alphabet[newIndex];

      events = [
        {
          type: EventType.INPUT_CHARACTER,
          timestamp: Date.now(),
          data: { char, index },
          visualizable: true
        },
        {
          type: EventType.SUBSTITUTION,
          timestamp: Date.now(),
          data: {
            from: char,
            to: output,
            fromIndex: index,
            toIndex: newIndex,
            shift: this.shift
          },
          visualizable: true
        },
        {
          type: EventType.OUTPUT_CHARACTER,
          timestamp: Date.now(),
          data: { char: output },
          visualizable: true
        }
      ];
    } else {
      output = char; // Pass through non-alphabetic
      events = [{
        type: EventType.INPUT_CHARACTER,
        timestamp: Date.now(),
        data: { char, passThrough: true },
        visualizable: false
      }];
    }

    const nextState: CipherState = {
      id: crypto.randomUUID(),
      step: state.step + 1,
      timestamp: Date.now(),
      data: {
        ...state.data,
        processedChars: (state.data.processedChars as number) + 1,
        plaintext: (state.data.plaintext as string) + char,
        ciphertext: (state.data.ciphertext as string) + output
      },
      visual: {
        focus: [
          { type: 'character', value: char, ring: 'outer' },
          { type: 'character', value: output, ring: 'inner' }
        ],
        annotations: state.visual.annotations,
        transforms: [
          { type: 'rotate', target: 'outerRing', angle: 0 },
          { type: 'rotate', target: 'innerRing', angle: -this.shift * (360 / 26) }
        ]
      },
      transition: {
        from: state.id,
        trigger: `encrypt('${char}')`,
        duration: 300
      }
    };

    return {
      nextState,
      output,
      events,
      complete: false
    };
  }

  getVisualHints(): VisualHints {
    return {
      preferredMetaphors: ['wheel', 'grid', 'cascade'],
      keyElements: ['alphabet_ring', 'shift_indicator'],
      animationCues: {
        substitution: { type: 'highlight_pair', duration: 300 }
      }
    };
  }
}
```

---

### Vigenère Cipher

```typescript
class VigenereCipher implements ICipher {
  readonly id = 'vigenere';
  readonly name = 'Vigenère Cipher';
  readonly family = CipherFamily.SUBSTITUTION_POLY;
  readonly complexity = ComplexityLevel.STANDARD;

  private keyword: string = 'KEY';
  private alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  configure(config: CipherConfig): void {
    if (config.keyword) {
      this.keyword = config.keyword.toUpperCase().replace(/[^A-Z]/g, '');
    }
  }

  getInitialState(): CipherState {
    return {
      id: crypto.randomUUID(),
      step: 0,
      timestamp: Date.now(),
      data: {
        keyword: this.keyword,
        keyIndex: 0,
        processedChars: 0,
        plaintext: '',
        ciphertext: ''
      },
      visual: {
        focus: [],
        annotations: [
          { type: 'label', text: `Key: ${this.keyword}`, position: 'top-center' }
        ],
        transforms: []
      }
    };
  }

  step(state: CipherState, input: string): StepResult {
    const char = input[0].toUpperCase();
    const plainIndex = this.alphabet.indexOf(char);
    let output: string;
    let events: CipherEvent[] = [];
    let keyIndex = state.data.keyIndex as number;

    if (plainIndex !== -1) {
      const keyChar = this.keyword[keyIndex % this.keyword.length];
      const keyShift = this.alphabet.indexOf(keyChar);
      const cipherIndex = (plainIndex + keyShift) % 26;
      output = this.alphabet[cipherIndex];

      events = [
        {
          type: EventType.INPUT_CHARACTER,
          timestamp: Date.now(),
          data: { char, index: plainIndex },
          visualizable: true
        },
        {
          type: EventType.KEY_APPLICATION,
          timestamp: Date.now(),
          data: {
            keyChar,
            keyShift,
            keyPosition: keyIndex % this.keyword.length
          },
          visualizable: true
        },
        {
          type: EventType.SUBSTITUTION,
          timestamp: Date.now(),
          data: {
            from: char,
            to: output,
            fromIndex: plainIndex,
            toIndex: cipherIndex,
            shift: keyShift
          },
          visualizable: true
        }
      ];

      keyIndex++;
    } else {
      output = char;
      events = [{
        type: EventType.INPUT_CHARACTER,
        timestamp: Date.now(),
        data: { char, passThrough: true },
        visualizable: false
      }];
    }

    const nextState: CipherState = {
      id: crypto.randomUUID(),
      step: state.step + 1,
      timestamp: Date.now(),
      data: {
        ...state.data,
        keyIndex,
        processedChars: (state.data.processedChars as number) + 1,
        plaintext: (state.data.plaintext as string) + char,
        ciphertext: (state.data.ciphertext as string) + output
      },
      visual: {
        focus: [
          { type: 'row', value: char },
          { type: 'column', value: this.keyword[keyIndex % this.keyword.length] },
          { type: 'cell', value: output }
        ],
        annotations: state.visual.annotations,
        transforms: []
      },
      transition: {
        from: state.id,
        trigger: `encrypt('${char}')`,
        duration: 400
      }
    };

    return { nextState, output, events, complete: false };
  }

  getVisualHints(): VisualHints {
    return {
      preferredMetaphors: ['tabula_recta', 'flow', 'cascade'],
      keyElements: ['plaintext_row', 'key_column', 'cipher_cell', 'key_indicator'],
      animationCues: {
        key_application: { type: 'pulse_column', duration: 200 },
        substitution: { type: 'trace_path', duration: 400 }
      }
    };
  }
}
```

---

### Enigma Machine

```typescript
class EnigmaCipher implements ICipher {
  readonly id = 'enigma';
  readonly name = 'Enigma Machine';
  readonly family = CipherFamily.MECHANICAL;
  readonly complexity = ComplexityLevel.COMPLEX;

  private rotors: Rotor[] = [];
  private reflector: Reflector;
  private plugboard: Plugboard;
  private ringSettings: number[] = [0, 0, 0];
  private startPositions: number[] = [0, 0, 0];

  // Rotor wirings (historically accurate)
  static readonly ROTORS: Record<string, RotorConfig> = {
    I:   { wiring: 'EKMFLGDQVZNTOWYHXUSPAIBRCJ', notch: 'Q' },
    II:  { wiring: 'AJDKSIRUXBLHWTMCQGZNPYFVOE', notch: 'E' },
    III: { wiring: 'BDFHJLCPRTXVZNYEIWGAKMUSQO', notch: 'V' },
    IV:  { wiring: 'ESOVPZJAYQUIRHXLNFTGKDCMWB', notch: 'J' },
    V:   { wiring: 'VZBRGITYUPSDNHLXAWMJQOFECK', notch: 'Z' }
  };

  static readonly REFLECTORS: Record<string, string> = {
    B: 'YRUHQSLDPXNGOKMIEBFZCWVJAT',
    C: 'FVPJIAOYEDRZXWGCTKUQSBNMHL'
  };

  configure(config: CipherConfig): void {
    const { rotorOrder = ['III', 'II', 'I'], reflector = 'B', ringSettings = [0, 0, 0], startPositions = [0, 0, 0], plugboard = '' } = config;

    this.rotors = rotorOrder.map((id, i) => new Rotor(
      EnigmaCipher.ROTORS[id],
      ringSettings[i],
      startPositions[i]
    ));

    this.reflector = new Reflector(EnigmaCipher.REFLECTORS[reflector]);
    this.plugboard = new Plugboard(plugboard);
    this.ringSettings = ringSettings;
    this.startPositions = startPositions;
  }

  getInitialState(): CipherState {
    return {
      id: crypto.randomUUID(),
      step: 0,
      timestamp: Date.now(),
      data: {
        rotorPositions: [...this.startPositions],
        processedChars: 0,
        plaintext: '',
        ciphertext: '',
        signalPath: []
      },
      visual: {
        focus: [],
        annotations: [
          {
            type: 'rotor_display',
            positions: this.startPositions.map(p => String.fromCharCode(65 + p))
          }
        ],
        transforms: this.rotors.map((r, i) => ({
          type: 'rotor_rotation',
          rotorIndex: i,
          angle: r.position * (360 / 26)
        }))
      }
    };
  }

  step(state: CipherState, input: string): StepResult {
    const char = input[0].toUpperCase();
    if (!/[A-Z]/.test(char)) {
      return {
        nextState: { ...state, step: state.step + 1 },
        output: char,
        events: [],
        complete: false
      };
    }

    const events: CipherEvent[] = [];
    const signalPath: SignalPathPoint[] = [];

    // 1. Rotor stepping (before encryption)
    this.stepRotors();
    events.push({
      type: EventType.ROTOR_STEP,
      timestamp: Date.now(),
      data: { positions: this.rotors.map(r => r.position) },
      visualizable: true
    });

    // 2. Plugboard (input)
    let signal = this.plugboard.swap(char);
    signalPath.push({ stage: 'plugboard_in', char: signal });

    // 3. Rotors (right to left)
    for (let i = this.rotors.length - 1; i >= 0; i--) {
      signal = this.rotors[i].forward(signal);
      signalPath.push({ stage: `rotor_${i}_forward`, char: signal });
    }

    // 4. Reflector
    signal = this.reflector.reflect(signal);
    signalPath.push({ stage: 'reflector', char: signal });

    // 5. Rotors (left to right)
    for (let i = 0; i < this.rotors.length; i++) {
      signal = this.rotors[i].reverse(signal);
      signalPath.push({ stage: `rotor_${i}_reverse`, char: signal });
    }

    // 6. Plugboard (output)
    signal = this.plugboard.swap(signal);
    signalPath.push({ stage: 'plugboard_out', char: signal });

    events.push({
      type: EventType.SUBSTITUTION,
      timestamp: Date.now(),
      data: { from: char, to: signal, signalPath },
      visualizable: true
    });

    const nextState: CipherState = {
      id: crypto.randomUUID(),
      step: state.step + 1,
      timestamp: Date.now(),
      data: {
        rotorPositions: this.rotors.map(r => r.position),
        processedChars: (state.data.processedChars as number) + 1,
        plaintext: (state.data.plaintext as string) + char,
        ciphertext: (state.data.ciphertext as string) + signal,
        signalPath
      },
      visual: {
        focus: signalPath.map(p => ({ type: 'signal', stage: p.stage, char: p.char })),
        annotations: [
          {
            type: 'rotor_display',
            positions: this.rotors.map(r => String.fromCharCode(65 + r.position))
          }
        ],
        transforms: this.rotors.map((r, i) => ({
          type: 'rotor_rotation',
          rotorIndex: i,
          angle: r.position * (360 / 26)
        }))
      },
      transition: {
        from: state.id,
        trigger: `encrypt('${char}')`,
        duration: 800
      }
    };

    return { nextState, output: signal, events, complete: false };
  }

  private stepRotors(): void {
    // Double-stepping anomaly
    if (this.rotors[1].atNotch()) {
      this.rotors[1].step();
      this.rotors[0].step();
    } else if (this.rotors[2].atNotch()) {
      this.rotors[1].step();
    }
    this.rotors[2].step();
  }

  getVisualHints(): VisualHints {
    return {
      preferredMetaphors: ['rotor_3d', 'signal_path', 'schematic'],
      keyElements: [
        'rotors',
        'reflector',
        'plugboard',
        'signal_trace',
        'position_display'
      ],
      animationCues: {
        rotor_step: { type: 'rotate', duration: 200 },
        signal_trace: { type: 'path_follow', duration: 600 }
      }
    };
  }
}

// Supporting classes
class Rotor {
  private wiring: number[];
  private reverseWiring: number[];
  private notchPosition: number;
  public position: number;
  private ring: number;

  constructor(config: RotorConfig, ring: number, start: number) {
    this.wiring = config.wiring.split('').map(c => c.charCodeAt(0) - 65);
    this.reverseWiring = Array(26);
    this.wiring.forEach((w, i) => this.reverseWiring[w] = i);
    this.notchPosition = config.notch.charCodeAt(0) - 65;
    this.ring = ring;
    this.position = start;
  }

  forward(char: string): string {
    const index = (char.charCodeAt(0) - 65 + this.position - this.ring + 26) % 26;
    const output = (this.wiring[index] - this.position + this.ring + 26) % 26;
    return String.fromCharCode(output + 65);
  }

  reverse(char: string): string {
    const index = (char.charCodeAt(0) - 65 + this.position - this.ring + 26) % 26;
    const output = (this.reverseWiring[index] - this.position + this.ring + 26) % 26;
    return String.fromCharCode(output + 65);
  }

  step(): void {
    this.position = (this.position + 1) % 26;
  }

  atNotch(): boolean {
    return this.position === this.notchPosition;
  }
}

class Reflector {
  private wiring: number[];

  constructor(wiring: string) {
    this.wiring = wiring.split('').map(c => c.charCodeAt(0) - 65);
  }

  reflect(char: string): string {
    const index = char.charCodeAt(0) - 65;
    return String.fromCharCode(this.wiring[index] + 65);
  }
}

class Plugboard {
  private swaps: Map<string, string>;

  constructor(pairs: string) {
    this.swaps = new Map();
    const pairList = pairs.toUpperCase().match(/[A-Z]{2}/g) || [];
    for (const pair of pairList) {
      this.swaps.set(pair[0], pair[1]);
      this.swaps.set(pair[1], pair[0]);
    }
  }

  swap(char: string): string {
    return this.swaps.get(char) || char;
  }
}
```

---

## Visual Metaphor Implementations

### 1. Matrix Cascade Renderer

```typescript
class MatrixCascadeRenderer implements IVisualMetaphor {
  readonly id = 'matrix_cascade';
  readonly name = 'Matrix Digital Rain';
  readonly supportedFamilies = [
    CipherFamily.SUBSTITUTION_SIMPLE,
    CipherFamily.SUBSTITUTION_POLY,
    CipherFamily.STREAM
  ];

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private columns: CascadeColumn[] = [];
  private theme: VisualTheme;

  initialize(container: HTMLElement, config: RenderConfig): void {
    this.canvas = document.createElement('canvas');
    this.canvas.width = config.width * config.dpr;
    this.canvas.height = config.height * config.dpr;
    this.canvas.style.width = `${config.width}px`;
    this.canvas.style.height = `${config.height}px`;
    this.ctx = this.canvas.getContext('2d')!;
    this.ctx.scale(config.dpr, config.dpr);
    container.appendChild(this.canvas);

    this.theme = config.theme;
    this.initializeColumns(config.width);
  }

  private initializeColumns(width: number): void {
    const charWidth = 14;
    const columnCount = Math.floor(width / charWidth);

    this.columns = Array(columnCount).fill(null).map((_, i) => ({
      x: i * charWidth,
      y: 0,
      speed: 50 + Math.random() * 100,
      chars: [],
      active: false,
      highlight: null
    }));
  }

  render(state: CipherState): void {
    const { plaintext, ciphertext } = state.data as { plaintext: string; ciphertext: string };

    // Background fade
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Render cascade columns
    this.ctx.font = '14px monospace';

    for (const column of this.columns) {
      if (column.active) {
        this.renderColumn(column);
      }
    }

    // Highlight current transformation
    if (state.visual.focus.length > 0) {
      this.renderHighlights(state.visual.focus);
    }
  }

  private renderColumn(column: CascadeColumn): void {
    for (let i = 0; i < column.chars.length; i++) {
      const char = column.chars[i];
      const y = column.y - i * 16;

      if (y < 0) continue;
      if (y > this.canvas.height) continue;

      // Fade based on position
      const alpha = 1 - (i / column.chars.length);
      const isHead = i === 0;

      if (isHead) {
        this.ctx.fillStyle = this.theme.accent;
        this.ctx.shadowColor = this.theme.accent;
        this.ctx.shadowBlur = 10;
      } else {
        this.ctx.fillStyle = `rgba(0, 255, 70, ${alpha})`;
        this.ctx.shadowBlur = 0;
      }

      this.ctx.fillText(char, column.x, y);
    }
  }

  async animate(from: CipherState, to: CipherState, duration: number): Promise<void> {
    const startTime = performance.now();

    return new Promise(resolve => {
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Interpolate state
        this.renderInterpolated(from, to, progress);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };

      requestAnimationFrame(animate);
    });
  }

  private renderInterpolated(from: CipherState, to: CipherState, t: number): void {
    // Clear with fade
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Animate character transformation
    const events = to.transition ? [to] : [];
    const eased = this.easeOutCubic(t);

    // ... animation logic
  }

  private easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }
}
```

---

### 2. Rotor Mechanics Renderer (3D)

```typescript
class RotorMechanicsRenderer implements IVisualMetaphor {
  readonly id = 'rotor_3d';
  readonly name = 'Rotor Mechanics (3D)';
  readonly supportedFamilies = [CipherFamily.MECHANICAL];

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private rotorMeshes: THREE.Mesh[] = [];
  private reflectorMesh: THREE.Mesh;
  private signalLine: THREE.Line;

  initialize(container: HTMLElement, config: RenderConfig): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(config.theme.background);

    this.camera = new THREE.PerspectiveCamera(
      45,
      config.width / config.height,
      0.1,
      1000
    );
    this.camera.position.set(0, 5, 15);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(config.width, config.height);
    this.renderer.setPixelRatio(config.dpr);
    container.appendChild(this.renderer.domElement);

    this.createRotors();
    this.createReflector();
    this.createPlugboard();
    this.addLighting();
  }

  private createRotors(): void {
    const rotorGeometry = new THREE.CylinderGeometry(2, 2, 0.5, 26);
    const rotorMaterial = new THREE.MeshPhongMaterial({
      color: 0x444444,
      specular: 0x111111,
      shininess: 30
    });

    for (let i = 0; i < 3; i++) {
      const rotor = new THREE.Mesh(rotorGeometry, rotorMaterial.clone());
      rotor.position.x = (i - 1) * 3;
      rotor.rotation.z = Math.PI / 2;

      // Add letter engravings
      this.addLetterRing(rotor);

      this.rotorMeshes.push(rotor);
      this.scene.add(rotor);
    }
  }

  private addLetterRing(rotor: THREE.Mesh): void {
    const loader = new THREE.FontLoader();
    // Font loading and text geometry for each letter...
  }

  render(state: CipherState): void {
    const { rotorPositions, signalPath } = state.data as {
      rotorPositions: number[];
      signalPath: SignalPathPoint[];
    };

    // Update rotor rotations
    this.rotorMeshes.forEach((rotor, i) => {
      rotor.rotation.x = rotorPositions[i] * (Math.PI * 2 / 26);
    });

    // Draw signal path
    if (signalPath && signalPath.length > 0) {
      this.drawSignalPath(signalPath);
    }

    this.renderer.render(this.scene, this.camera);
  }

  private drawSignalPath(path: SignalPathPoint[]): void {
    const points: THREE.Vector3[] = [];

    for (const point of path) {
      const pos = this.getPositionForStage(point.stage, point.char);
      points.push(pos);
    }

    if (this.signalLine) {
      this.scene.remove(this.signalLine);
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: 0xffff00,
      linewidth: 2
    });

    this.signalLine = new THREE.Line(geometry, material);
    this.scene.add(this.signalLine);
  }

  async animate(from: CipherState, to: CipherState, duration: number): Promise<void> {
    const startPositions = (from.data.rotorPositions as number[]) || [0, 0, 0];
    const endPositions = (to.data.rotorPositions as number[]) || [0, 0, 0];

    return new Promise(resolve => {
      const startTime = performance.now();

      const animateFrame = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const t = Math.min(elapsed / duration, 1);
        const eased = this.easeOutQuad(t);

        // Interpolate rotor positions
        this.rotorMeshes.forEach((rotor, i) => {
          const startAngle = startPositions[i] * (Math.PI * 2 / 26);
          const endAngle = endPositions[i] * (Math.PI * 2 / 26);
          rotor.rotation.x = startAngle + (endAngle - startAngle) * eased;
        });

        this.renderer.render(this.scene, this.camera);

        if (t < 1) {
          requestAnimationFrame(animateFrame);
        } else {
          resolve();
        }
      };

      requestAnimationFrame(animateFrame);
    });
  }
}
```

---

### 3. Tabula Recta Renderer

```typescript
class TabulaRectaRenderer implements IVisualMetaphor {
  readonly id = 'tabula_recta';
  readonly name = 'Vigenère Table';
  readonly supportedFamilies = [CipherFamily.SUBSTITUTION_POLY];

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private cellSize = 20;
  private theme: VisualTheme;

  initialize(container: HTMLElement, config: RenderConfig): void {
    this.canvas = document.createElement('canvas');
    const size = this.cellSize * 27; // 26 letters + header
    this.canvas.width = size * config.dpr;
    this.canvas.height = size * config.dpr;
    this.ctx = this.canvas.getContext('2d')!;
    this.ctx.scale(config.dpr, config.dpr);
    this.theme = config.theme;
    container.appendChild(this.canvas);

    this.drawTable();
  }

  private drawTable(): void {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Background
    this.ctx.fillStyle = this.theme.background;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.font = '12px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    // Draw grid
    for (let row = 0; row <= 26; row++) {
      for (let col = 0; col <= 26; col++) {
        const x = col * this.cellSize;
        const y = row * this.cellSize;

        // Header row/column
        if (row === 0 && col > 0) {
          this.ctx.fillStyle = this.theme.secondary;
          this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
          this.ctx.fillStyle = this.theme.text;
          this.ctx.fillText(alphabet[col - 1], x + this.cellSize / 2, y + this.cellSize / 2);
        } else if (col === 0 && row > 0) {
          this.ctx.fillStyle = this.theme.secondary;
          this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
          this.ctx.fillStyle = this.theme.text;
          this.ctx.fillText(alphabet[row - 1], x + this.cellSize / 2, y + this.cellSize / 2);
        } else if (row > 0 && col > 0) {
          // Cipher table cell
          const shift = row - 1;
          const letter = alphabet[(col - 1 + shift) % 26];

          this.ctx.fillStyle = this.theme.background;
          this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
          this.ctx.strokeStyle = this.theme.secondary;
          this.ctx.strokeRect(x, y, this.cellSize, this.cellSize);
          this.ctx.fillStyle = this.theme.text;
          this.ctx.fillText(letter, x + this.cellSize / 2, y + this.cellSize / 2);
        }
      }
    }
  }

  render(state: CipherState): void {
    this.drawTable();

    const focus = state.visual.focus;
    if (focus.length === 0) return;

    // Highlight row (key letter)
    const keyFocus = focus.find(f => f.type === 'column');
    if (keyFocus) {
      const keyIndex = keyFocus.value.charCodeAt(0) - 65;
      this.highlightRow(keyIndex + 1);
    }

    // Highlight column (plaintext letter)
    const plainFocus = focus.find(f => f.type === 'row');
    if (plainFocus) {
      const plainIndex = plainFocus.value.charCodeAt(0) - 65;
      this.highlightColumn(plainIndex + 1);
    }

    // Highlight intersection (ciphertext)
    const cellFocus = focus.find(f => f.type === 'cell');
    if (cellFocus && keyFocus && plainFocus) {
      const row = keyFocus.value.charCodeAt(0) - 65 + 1;
      const col = plainFocus.value.charCodeAt(0) - 65 + 1;
      this.highlightCell(row, col);
    }
  }

  private highlightRow(row: number): void {
    this.ctx.fillStyle = 'rgba(255, 255, 0, 0.3)';
    this.ctx.fillRect(0, row * this.cellSize, this.canvas.width, this.cellSize);
  }

  private highlightColumn(col: number): void {
    this.ctx.fillStyle = 'rgba(0, 255, 255, 0.3)';
    this.ctx.fillRect(col * this.cellSize, 0, this.cellSize, this.canvas.height);
  }

  private highlightCell(row: number, col: number): void {
    this.ctx.fillStyle = this.theme.highlight;
    this.ctx.fillRect(
      col * this.cellSize,
      row * this.cellSize,
      this.cellSize,
      this.cellSize
    );
  }
}
```

---

## Animation Framework

### Animation Controller

```typescript
class AnimationController {
  private timeline: AnimationTimeline;
  private currentTime: number = 0;
  private playing: boolean = false;
  private speed: number = 1;
  private onFrame: (state: CipherState) => void;

  constructor(onFrame: (state: CipherState) => void) {
    this.onFrame = onFrame;
  }

  loadTimeline(timeline: AnimationTimeline): void {
    this.timeline = timeline;
    this.currentTime = 0;
  }

  play(): void {
    this.playing = true;
    this.tick();
  }

  pause(): void {
    this.playing = false;
  }

  seek(time: number): void {
    this.currentTime = Math.max(0, Math.min(time, this.timeline.duration));
    const state = this.getStateAtTime(this.currentTime);
    this.onFrame(state);
  }

  setSpeed(speed: number): void {
    this.speed = speed;
  }

  private tick(): void {
    if (!this.playing) return;

    const state = this.getStateAtTime(this.currentTime);
    this.onFrame(state);

    this.currentTime += 16 * this.speed; // ~60fps

    if (this.currentTime >= this.timeline.duration) {
      this.playing = false;
      return;
    }

    requestAnimationFrame(() => this.tick());
  }

  private getStateAtTime(time: number): CipherState {
    // Find the keyframes before and after current time
    const keyframes = this.timeline.keyframes;
    let before = keyframes[0];
    let after = keyframes[0];

    for (let i = 0; i < keyframes.length; i++) {
      if (keyframes[i].time <= time) {
        before = keyframes[i];
        after = keyframes[i + 1] || before;
      }
    }

    if (before === after) {
      return before.state;
    }

    // Interpolate between keyframes
    const t = (time - before.time) / (after.time - before.time);
    return this.interpolateStates(before.state, after.state, t);
  }

  private interpolateStates(from: CipherState, to: CipherState, t: number): CipherState {
    // Interpolation logic for visual transforms
    return {
      ...to,
      visual: {
        ...to.visual,
        transforms: to.visual.transforms.map((transform, i) => {
          const fromTransform = from.visual.transforms[i];
          if (!fromTransform) return transform;

          if (transform.type === 'rotate' && fromTransform.type === 'rotate') {
            return {
              ...transform,
              angle: fromTransform.angle + (transform.angle - fromTransform.angle) * t
            };
          }

          return transform;
        })
      }
    };
  }
}

interface AnimationTimeline {
  duration: number;
  keyframes: Keyframe[];
}

interface Keyframe {
  time: number;
  state: CipherState;
  easing: EasingFunction;
}

type EasingFunction = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'elastic';
```

---

### Easing Functions

```typescript
const EASING_FUNCTIONS: Record<EasingFunction, (t: number) => number> = {
  linear: t => t,

  easeIn: t => t * t,

  easeOut: t => t * (2 - t),

  easeInOut: t => t < 0.5
    ? 2 * t * t
    : -1 + (4 - 2 * t) * t,

  elastic: t => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0
      : t === 1 ? 1
      : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  }
};
```

---

## Mode Switching & Comparative Views

### View Mode Controller

```typescript
class ViewModeController {
  private modes: Map<string, IVisualMetaphor> = new Map();
  private currentMode: string;
  private container: HTMLElement;
  private config: RenderConfig;

  registerMode(mode: IVisualMetaphor): void {
    this.modes.set(mode.id, mode);
  }

  setMode(modeId: string): void {
    const current = this.modes.get(this.currentMode);
    if (current) {
      current.destroy();
    }

    const next = this.modes.get(modeId);
    if (next) {
      next.initialize(this.container, this.config);
      this.currentMode = modeId;
    }
  }

  getAvailableModes(cipherFamily: CipherFamily): string[] {
    return Array.from(this.modes.values())
      .filter(m => m.supportedFamilies.includes(cipherFamily))
      .map(m => m.id);
  }
}
```

### Comparative View

```typescript
class ComparativeView {
  private panels: ViewPanel[] = [];

  addPanel(config: PanelConfig): void {
    this.panels.push(new ViewPanel(config));
  }

  synchronize(): void {
    // Link all panels to same timeline
    const controller = new AnimationController(state => {
      for (const panel of this.panels) {
        panel.render(state);
      }
    });
  }

  layout(arrangement: 'horizontal' | 'vertical' | 'grid'): void {
    // Arrange panels according to layout
  }
}

interface PanelConfig {
  type: 'plaintext' | 'key' | 'ciphertext' | 'cipher_state';
  metaphor: string;
  showLabels: boolean;
}
```

---

## Performance Considerations

### Rendering Optimization

```typescript
class RenderOptimizer {
  private frameQueue: CipherState[] = [];
  private isRendering: boolean = false;
  private renderer: IVisualMetaphor;

  queueState(state: CipherState): void {
    // Debounce rapid state changes
    this.frameQueue.push(state);

    if (!this.isRendering) {
      this.processQueue();
    }
  }

  private processQueue(): void {
    if (this.frameQueue.length === 0) {
      this.isRendering = false;
      return;
    }

    this.isRendering = true;

    // Take only the latest state if queue is backing up
    const state = this.frameQueue.length > 3
      ? this.frameQueue.pop()!
      : this.frameQueue.shift()!;

    // Clear old states if we're behind
    if (this.frameQueue.length > 3) {
      this.frameQueue.length = 0;
    }

    requestAnimationFrame(() => {
      this.renderer.render(state);
      this.processQueue();
    });
  }
}
```

### Memory Management

```typescript
class StateHistory {
  private maxSize: number = 100;
  private states: CipherState[] = [];

  push(state: CipherState): void {
    this.states.push(state);

    if (this.states.length > this.maxSize) {
      // Remove oldest states
      this.states = this.states.slice(-this.maxSize);
    }
  }

  getRecent(count: number): CipherState[] {
    return this.states.slice(-count);
  }

  clear(): void {
    this.states = [];
  }
}
```

---

## Export Capabilities

### Frame Export

```typescript
class FrameExporter {
  exportPNG(canvas: HTMLCanvasElement): Blob {
    return new Promise(resolve => {
      canvas.toBlob(blob => resolve(blob!), 'image/png');
    });
  }

  exportSVG(metaphor: IVisualMetaphor): string {
    return metaphor.exportSVG();
  }

  exportWebM(timeline: AnimationTimeline, metaphor: IVisualMetaphor): Promise<Blob> {
    // Use MediaRecorder API
    const stream = this.canvas.captureStream(60);
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

    // ... recording logic
  }
}
```

---

## Configuration Schema

```typescript
interface SystemConfig {
  cipher: {
    id: string;
    config: CipherConfig;
  };
  visual: {
    metaphor: string;
    theme: VisualTheme;
    showLabels: boolean;
    showGuides: boolean;
  };
  animation: {
    speed: number;
    easing: EasingFunction;
    autoPlay: boolean;
  };
  export: {
    format: 'PNG' | 'SVG' | 'WebM' | 'GIF';
    quality: number;
    size: { width: number; height: number };
  };
}
```

---

## Usage Example

```typescript
// Initialize system
const cipherSystem = new CipherRenderingSystem();

// Configure cipher
const enigma = new EnigmaCipher();
enigma.configure({
  rotorOrder: ['III', 'II', 'I'],
  reflector: 'B',
  ringSettings: [0, 0, 0],
  startPositions: [0, 0, 0],
  plugboard: 'AB CD EF'
});

// Configure visualization
const renderer = new RotorMechanicsRenderer();
renderer.initialize(document.getElementById('canvas')!, {
  width: 800,
  height: 600,
  dpr: window.devicePixelRatio,
  theme: DARK_THEME,
  animationSpeed: 1,
  showLabels: true,
  showGuides: true
});

// Run encryption with visualization
async function encryptWithVisualization(plaintext: string) {
  let state = enigma.getInitialState();
  renderer.render(state);

  for (const char of plaintext) {
    const result = enigma.step(state, char);
    await renderer.animate(state, result.nextState, 800);
    state = result.nextState;
  }

  return state.data.ciphertext;
}

// Execute
encryptWithVisualization('HELLO WORLD');
```

---

## Future Extensions

1. **Additional Ciphers:** AES rounds visualization, RSA key generation
2. **Collaborative Mode:** Shared encryption sessions
3. **Educational Layer:** Step-by-step explanations, quiz mode
4. **VR/AR Support:** Immersive rotor manipulation
5. **Sound Design:** Auditory feedback for state transitions

---

*This document is part of the Cipher Rendering Pipeline Extension Project, Phase 2.*
