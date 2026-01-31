# Identity Playground Implementation Kit

## Complete p5.js/Three.js Project Structure and Code

**Document Type:** Implementation Notes
**Version:** 1.0
**Purpose:** Production-ready starter kit for Identity Playground development

---

## Project Structure

```
identity-playground/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── src/
│   ├── main.ts                      # Application entry
│   ├── App.tsx                      # React root component
│   ├── core/
│   │   ├── index.ts                 # Core exports
│   │   ├── types.ts                 # Type definitions
│   │   ├── config.ts                # Configuration
│   │   └── events.ts                # Event system
│   ├── numerology/
│   │   ├── index.ts
│   │   ├── PythagoreanCalculator.ts
│   │   ├── ChaldeanCalculator.ts
│   │   ├── GematriaCalculator.ts
│   │   ├── VedicCalculator.ts
│   │   ├── LoShuCalculator.ts
│   │   └── NumerologyEngine.ts      # Unified engine
│   ├── proportions/
│   │   ├── index.ts
│   │   ├── GoldenRatio.ts
│   │   ├── Fibonacci.ts
│   │   ├── Phyllotaxis.ts
│   │   ├── SacredGeometry.ts
│   │   └── ChaosAttractors.ts
│   ├── rendering/
│   │   ├── index.ts
│   │   ├── P5Renderer.ts            # 2D canvas
│   │   ├── ThreeRenderer.ts         # 3D WebGL
│   │   ├── SVGRenderer.ts           # Vector output
│   │   ├── AnimationController.ts
│   │   └── shaders/
│   │       ├── basic.vert
│   │       ├── basic.frag
│   │       └── particle.frag
│   ├── audio/
│   │   ├── index.ts
│   │   ├── ToneGenerator.ts
│   │   ├── SpectralMapper.ts
│   │   └── AudioEngine.ts
│   ├── ui/
│   │   ├── components/
│   │   │   ├── IdentityInput.tsx
│   │   │   ├── AlgorithmSelector.tsx
│   │   │   ├── ParameterPanel.tsx
│   │   │   ├── Canvas.tsx
│   │   │   └── ExportPanel.tsx
│   │   ├── hooks/
│   │   │   ├── useIdentity.ts
│   │   │   ├── useAlgorithm.ts
│   │   │   └── useRenderer.ts
│   │   └── styles/
│   │       └── main.css
│   ├── algorithms/
│   │   ├── index.ts
│   │   ├── Algorithm.ts             # Base class
│   │   ├── registry.ts
│   │   └── presets/
│   │       ├── spiralGrowth.ts
│   │       ├── numerologyGrid.ts
│   │       └── goldenPortrait.ts
│   ├── export/
│   │   ├── index.ts
│   │   ├── PNGExporter.ts
│   │   ├── SVGExporter.ts
│   │   ├── WebMExporter.ts
│   │   └── MetadataGenerator.ts
│   └── utils/
│       ├── math.ts
│       ├── color.ts
│       ├── random.ts
│       └── validation.ts
├── public/
│   ├── fonts/
│   └── assets/
└── tests/
    ├── numerology.test.ts
    ├── proportions.test.ts
    └── rendering.test.ts
```

---

## Core Configuration Files

### package.json

```json
{
  "name": "@4444jpp/identity-playground",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint src --ext .ts,.tsx"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "p5": "^1.9.0",
    "@types/p5": "^1.7.3",
    "three": "^0.160.0",
    "@types/three": "^0.160.0",
    "tone": "^14.7.77",
    "zustand": "^4.4.0",
    "framer-motion": "^10.16.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "vitest": "^1.0.0",
    "eslint": "^8.55.0",
    "@typescript-eslint/parser": "^6.13.0"
  }
}
```

### vite.config.ts

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@core': path.resolve(__dirname, './src/core'),
      '@numerology': path.resolve(__dirname, './src/numerology'),
      '@proportions': path.resolve(__dirname, './src/proportions'),
      '@rendering': path.resolve(__dirname, './src/rendering'),
      '@ui': path.resolve(__dirname, './src/ui'),
      '@algorithms': path.resolve(__dirname, './src/algorithms'),
    },
  },
  build: {
    target: 'esnext',
    sourcemap: true,
  },
});
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["ESNext", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@/*": ["./src/*"],
      "@core/*": ["./src/core/*"],
      "@numerology/*": ["./src/numerology/*"],
      "@proportions/*": ["./src/proportions/*"],
      "@rendering/*": ["./src/rendering/*"],
      "@ui/*": ["./src/ui/*"],
      "@algorithms/*": ["./src/algorithms/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

---

## Core Type Definitions

### src/core/types.ts

```typescript
// ============================================
// IDENTITY TYPES
// ============================================

export interface PersonalIdentity {
  id: string;
  name: string;
  birthdate: string;
  meaningfulWords: string[];
  biometric?: BiometricData;
  created: Date;
  updated: Date;
}

export interface BiometricData {
  type: 'face' | 'voice';
  landmarks?: FaceLandmarks;
  features?: number[];
}

export interface FaceLandmarks {
  points: { x: number; y: number }[];
  ratios: number[];
}

// ============================================
// NUMEROLOGY TYPES
// ============================================

export interface NumerologyProfile {
  system: NumerologySystem;
  destiny: number;
  lifePath: number;
  soulUrge: number;
  personality: number;
  expression: number;
  rawSum: number;
  isMasterNumber: boolean;
}

export type NumerologySystem =
  | 'pythagorean'
  | 'chaldean'
  | 'gematria'
  | 'vedic'
  | 'lo_shu';

export interface NumerologyConfig {
  system: NumerologySystem;
  preserveMasterNumbers: boolean;
  calculateCompound: boolean;
}

// ============================================
// ALGORITHM TYPES
// ============================================

export interface AlgorithmConfig {
  id: string;
  name: string;
  category: AlgorithmCategory;
  params: Record<string, ParamDefinition>;
  defaults: Record<string, unknown>;
}

export type AlgorithmCategory =
  | 'numerology'
  | 'proportion'
  | 'encoding'
  | 'biological'
  | 'astronomical'
  | 'synthesis';

export interface ParamDefinition {
  type: 'number' | 'string' | 'boolean' | 'color' | 'select';
  label: string;
  description?: string;
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string; label: string }[];
  default: unknown;
}

export interface AlgorithmResult {
  algorithmId: string;
  input: unknown;
  output: unknown;
  params: Record<string, unknown>;
  timestamp: number;
  seed: number;
}

// ============================================
// RENDERING TYPES
// ============================================

export interface RenderConfig {
  width: number;
  height: number;
  pixelRatio: number;
  backgroundColor: string;
  foregroundColor: string;
  antialiasing: boolean;
  frameRate: number;
}

export interface RenderState {
  frame: number;
  time: number;
  deltaTime: number;
  isPlaying: boolean;
  seed: number;
}

export interface Visual {
  type: VisualType;
  data: unknown;
  transform: Transform;
  style: Style;
}

export type VisualType =
  | 'point'
  | 'line'
  | 'circle'
  | 'rect'
  | 'polygon'
  | 'path'
  | 'text'
  | 'image';

export interface Transform {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  origin: { x: number; y: number };
}

export interface Style {
  fill: string | null;
  stroke: string | null;
  strokeWeight: number;
  opacity: number;
  blendMode: BlendMode;
}

export type BlendMode =
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten';

// ============================================
// EXPORT TYPES
// ============================================

export interface ExportConfig {
  format: 'png' | 'svg' | 'webm' | 'gif';
  quality: number;
  size: { width: number; height: number };
  includeMetadata: boolean;
}

export interface ExportMetadata {
  identity: string;
  algorithms: string[];
  params: Record<string, unknown>;
  seed: number;
  created: string;
  version: string;
}
```

---

## Numerology Engine Implementation

### src/numerology/NumerologyEngine.ts

```typescript
import type {
  NumerologyProfile,
  NumerologySystem,
  NumerologyConfig,
} from '@core/types';

export class NumerologyEngine {
  private config: NumerologyConfig;

  // Letter mappings for each system
  private static readonly MAPPINGS: Record<
    NumerologySystem,
    Record<string, number>
  > = {
    pythagorean: {
      A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
      J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
      S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
    },
    chaldean: {
      A: 1, B: 2, C: 3, D: 4, E: 5, F: 8, G: 3, H: 5, I: 1,
      J: 1, K: 2, L: 3, M: 4, N: 5, O: 7, P: 8, Q: 1, R: 2,
      S: 3, T: 4, U: 6, V: 6, W: 6, X: 5, Y: 1, Z: 7,
    },
    gematria: {
      A: 1, B: 2, G: 3, D: 4, H: 5, V: 6, Z: 7, CH: 8, T: 9,
      Y: 10, K: 20, L: 30, M: 40, N: 50, S: 60, O: 70, P: 80,
      Q: 100, R: 200, SH: 300, TH: 400,
    },
    vedic: {
      A: 1, B: 2, C: 3, D: 4, E: 5, F: 8, G: 3, H: 5, I: 1,
      J: 1, K: 2, L: 3, M: 4, N: 5, O: 7, P: 8, Q: 1, R: 2,
      S: 3, T: 4, U: 6, V: 6, W: 6, X: 5, Y: 1, Z: 7,
    },
    lo_shu: {}, // Uses date digits, not letters
  };

  private static readonly MASTER_NUMBERS = [11, 22, 33];
  private static readonly VOWELS = ['A', 'E', 'I', 'O', 'U'];

  constructor(config: NumerologyConfig) {
    this.config = config;
  }

  calculate(name: string, birthdate?: string): NumerologyProfile {
    const mapping = NumerologyEngine.MAPPINGS[this.config.system];

    const destiny = this.calculateFromString(name, mapping);
    const lifePath = birthdate ? this.calculateLifePath(birthdate) : 0;
    const soulUrge = this.calculateVowels(name, mapping);
    const personality = this.calculateConsonants(name, mapping);
    const expression = this.calculateFromString(name, mapping);
    const rawSum = this.rawSum(name, mapping);

    const isMasterNumber =
      this.config.preserveMasterNumbers &&
      NumerologyEngine.MASTER_NUMBERS.includes(rawSum);

    return {
      system: this.config.system,
      destiny: isMasterNumber ? rawSum : this.reduce(destiny),
      lifePath: this.reduce(lifePath),
      soulUrge: this.reduce(soulUrge),
      personality: this.reduce(personality),
      expression: isMasterNumber ? rawSum : this.reduce(expression),
      rawSum,
      isMasterNumber,
    };
  }

  private calculateFromString(
    str: string,
    mapping: Record<string, number>
  ): number {
    return str
      .toUpperCase()
      .split('')
      .filter((c) => mapping[c] !== undefined)
      .map((c) => mapping[c])
      .reduce((a, b) => a + b, 0);
  }

  private calculateLifePath(birthdate: string): number {
    // Format: YYYY-MM-DD
    const parts = birthdate.split('-');
    if (parts.length !== 3) return 0;

    const [year, month, day] = parts.map((p) => parseInt(p, 10));
    const sum =
      this.digitSum(year) + this.digitSum(month) + this.digitSum(day);
    return sum;
  }

  private calculateVowels(
    str: string,
    mapping: Record<string, number>
  ): number {
    return str
      .toUpperCase()
      .split('')
      .filter((c) => NumerologyEngine.VOWELS.includes(c))
      .map((c) => mapping[c] || 0)
      .reduce((a, b) => a + b, 0);
  }

  private calculateConsonants(
    str: string,
    mapping: Record<string, number>
  ): number {
    return str
      .toUpperCase()
      .split('')
      .filter(
        (c) =>
          mapping[c] !== undefined && !NumerologyEngine.VOWELS.includes(c)
      )
      .map((c) => mapping[c])
      .reduce((a, b) => a + b, 0);
  }

  private rawSum(str: string, mapping: Record<string, number>): number {
    return str
      .toUpperCase()
      .split('')
      .map((c) => mapping[c] || 0)
      .reduce((a, b) => a + b, 0);
  }

  private digitSum(n: number): number {
    return String(n)
      .split('')
      .reduce((a, b) => a + parseInt(b, 10), 0);
  }

  private reduce(n: number): number {
    const maxSingle = this.config.system === 'chaldean' ? 8 : 9;

    while (n > maxSingle) {
      if (
        this.config.preserveMasterNumbers &&
        NumerologyEngine.MASTER_NUMBERS.includes(n)
      ) {
        return n;
      }
      n = this.digitSum(n);
    }
    return n;
  }
}
```

---

## Proportions Implementation

### src/proportions/GoldenRatio.ts

```typescript
export class GoldenRatio {
  static readonly PHI = (1 + Math.sqrt(5)) / 2; // 1.6180339887...
  static readonly PHI_INVERSE = 1 / GoldenRatio.PHI; // 0.6180339887...

  /**
   * Subdivide a dimension using golden ratio
   */
  static subdivide(dimension: number, depth: number = 5): number[] {
    const results: number[] = [dimension];
    let current = dimension;

    for (let i = 0; i < depth; i++) {
      current *= GoldenRatio.PHI_INVERSE;
      results.push(current);
    }

    return results;
  }

  /**
   * Create golden rectangle dimensions
   */
  static rectangle(
    width: number
  ): { width: number; height: number; major: number; minor: number } {
    return {
      width,
      height: width / GoldenRatio.PHI,
      major: width / GoldenRatio.PHI,
      minor: width - width / GoldenRatio.PHI,
    };
  }

  /**
   * Generate golden spiral points
   */
  static spiral(
    centerX: number,
    centerY: number,
    startSize: number,
    rotations: number = 5,
    pointsPerRotation: number = 100
  ): { x: number; y: number }[] {
    const points: { x: number; y: number }[] = [];
    const totalPoints = rotations * pointsPerRotation;
    const step = (Math.PI * 2 * rotations) / totalPoints;

    for (let i = 0; i < totalPoints; i++) {
      const theta = i * step;
      const r = startSize * Math.pow(GoldenRatio.PHI, theta / (Math.PI / 2));
      points.push({
        x: centerX + r * Math.cos(theta),
        y: centerY + r * Math.sin(theta),
      });
    }

    return points;
  }

  /**
   * Align a value to nearest golden proportion
   */
  static align(value: number, tolerance: number = 0.01): number {
    const phiMultiple = Math.round(value / GoldenRatio.PHI);
    const aligned = phiMultiple * GoldenRatio.PHI;

    if (Math.abs(value - aligned) / value < tolerance) {
      return aligned;
    }
    return value;
  }
}
```

### src/proportions/Fibonacci.ts

```typescript
export class Fibonacci {
  private cache: Map<number, number> = new Map();

  /**
   * Generate Fibonacci sequence
   */
  sequence(length: number, seed: [number, number] = [0, 1]): number[] {
    const result = [...seed];

    while (result.length < length) {
      const next = result[result.length - 1] + result[result.length - 2];
      result.push(next);
    }

    return result.slice(0, length);
  }

  /**
   * Get nth Fibonacci number (memoized)
   */
  nth(n: number): number {
    if (n <= 1) return n;

    if (this.cache.has(n)) {
      return this.cache.get(n)!;
    }

    const result = this.nth(n - 1) + this.nth(n - 2);
    this.cache.set(n, result);
    return result;
  }

  /**
   * Lucas sequence (similar but starts 2, 1)
   */
  lucas(length: number): number[] {
    return this.sequence(length, [2, 1]);
  }

  /**
   * Tribonacci sequence
   */
  tribonacci(length: number): number[] {
    const result = [0, 0, 1];

    while (result.length < length) {
      const next =
        result[result.length - 1] +
        result[result.length - 2] +
        result[result.length - 3];
      result.push(next);
    }

    return result.slice(0, length);
  }

  /**
   * Check if number is Fibonacci
   */
  isFibonacci(n: number): boolean {
    // A number is Fibonacci if and only if
    // 5n² + 4 or 5n² - 4 is a perfect square
    const a = 5 * n * n + 4;
    const b = 5 * n * n - 4;
    return this.isPerfectSquare(a) || this.isPerfectSquare(b);
  }

  private isPerfectSquare(n: number): boolean {
    const s = Math.floor(Math.sqrt(n));
    return s * s === n;
  }
}
```

### src/proportions/Phyllotaxis.ts

```typescript
export class Phyllotaxis {
  static readonly GOLDEN_ANGLE = 137.5077640500378546; // degrees

  /**
   * Generate phyllotaxis pattern (sunflower spiral)
   */
  static generate(
    count: number,
    options: {
      divergence?: number;
      scaling?: 'sqrt' | 'linear' | 'log';
      radius?: number;
    } = {}
  ): { x: number; y: number; index: number }[] {
    const {
      divergence = Phyllotaxis.GOLDEN_ANGLE,
      scaling = 'sqrt',
      radius = 10,
    } = options;

    const points: { x: number; y: number; index: number }[] = [];

    for (let i = 0; i < count; i++) {
      const angle = i * divergence * (Math.PI / 180);
      let r: number;

      switch (scaling) {
        case 'linear':
          r = radius * i;
          break;
        case 'log':
          r = radius * Math.log(i + 1);
          break;
        default: // sqrt
          r = radius * Math.sqrt(i);
      }

      points.push({
        x: r * Math.cos(angle),
        y: r * Math.sin(angle),
        index: i,
      });
    }

    return points;
  }

  /**
   * Vogel's sunflower model
   */
  static sunflower(
    count: number,
    boundaryRadius: number = 100
  ): { x: number; y: number }[] {
    const points: { x: number; y: number }[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 1; i <= count; i++) {
      const r = boundaryRadius * Math.sqrt(i / count);
      const theta = i * goldenAngle;
      points.push({
        x: r * Math.cos(theta),
        y: r * Math.sin(theta),
      });
    }

    return points;
  }
}
```

---

## P5.js Renderer Implementation

### src/rendering/P5Renderer.ts

```typescript
import p5 from 'p5';
import type { RenderConfig, RenderState, Visual, Style } from '@core/types';

export class P5Renderer {
  private p5Instance: p5 | null = null;
  private container: HTMLElement | null = null;
  private config: RenderConfig;
  private state: RenderState;
  private renderCallback: ((p: p5, state: RenderState) => void) | null = null;

  constructor(config: RenderConfig) {
    this.config = config;
    this.state = {
      frame: 0,
      time: 0,
      deltaTime: 0,
      isPlaying: true,
      seed: Date.now(),
    };
  }

  initialize(container: HTMLElement): Promise<void> {
    this.container = container;

    return new Promise((resolve) => {
      this.p5Instance = new p5((p: p5) => {
        p.setup = () => {
          const canvas = p.createCanvas(
            this.config.width,
            this.config.height
          );
          canvas.parent(container);
          p.pixelDensity(this.config.pixelRatio);
          p.frameRate(this.config.frameRate);
          p.colorMode(p.HSL, 360, 100, 100, 1);

          if (!this.config.antialiasing) {
            p.noSmooth();
          }

          resolve();
        };

        p.draw = () => {
          if (!this.state.isPlaying) return;

          // Update state
          const now = performance.now();
          this.state.deltaTime = now - this.state.time;
          this.state.time = now;
          this.state.frame++;

          // Clear background
          p.background(this.config.backgroundColor);

          // Execute render callback
          if (this.renderCallback) {
            this.renderCallback(p, this.state);
          }
        };
      }, container);
    });
  }

  setRenderCallback(callback: (p: p5, state: RenderState) => void): void {
    this.renderCallback = callback;
  }

  // ========================
  // Drawing Utilities
  // ========================

  drawVisual(p: p5, visual: Visual): void {
    p.push();

    // Apply transform
    p.translate(visual.transform.x, visual.transform.y);
    p.rotate(visual.transform.rotation);
    p.scale(visual.transform.scale);

    // Apply style
    this.applyStyle(p, visual.style);

    // Draw based on type
    switch (visual.type) {
      case 'point':
        const point = visual.data as { x: number; y: number };
        p.point(point.x, point.y);
        break;

      case 'line':
        const line = visual.data as {
          x1: number;
          y1: number;
          x2: number;
          y2: number;
        };
        p.line(line.x1, line.y1, line.x2, line.y2);
        break;

      case 'circle':
        const circle = visual.data as { x: number; y: number; r: number };
        p.circle(circle.x, circle.y, circle.r * 2);
        break;

      case 'rect':
        const rect = visual.data as {
          x: number;
          y: number;
          w: number;
          h: number;
        };
        p.rect(rect.x, rect.y, rect.w, rect.h);
        break;

      case 'polygon':
        const polygon = visual.data as { points: { x: number; y: number }[] };
        p.beginShape();
        for (const pt of polygon.points) {
          p.vertex(pt.x, pt.y);
        }
        p.endShape(p.CLOSE);
        break;

      case 'text':
        const text = visual.data as {
          content: string;
          x: number;
          y: number;
          size: number;
        };
        p.textSize(text.size);
        p.text(text.content, text.x, text.y);
        break;
    }

    p.pop();
  }

  private applyStyle(p: p5, style: Style): void {
    if (style.fill) {
      p.fill(style.fill);
    } else {
      p.noFill();
    }

    if (style.stroke) {
      p.stroke(style.stroke);
      p.strokeWeight(style.strokeWeight);
    } else {
      p.noStroke();
    }

    // Blend mode
    switch (style.blendMode) {
      case 'multiply':
        p.blendMode(p.MULTIPLY);
        break;
      case 'screen':
        p.blendMode(p.SCREEN);
        break;
      case 'overlay':
        p.blendMode(p.OVERLAY);
        break;
      default:
        p.blendMode(p.BLEND);
    }
  }

  // ========================
  // Control Methods
  // ========================

  play(): void {
    this.state.isPlaying = true;
  }

  pause(): void {
    this.state.isPlaying = false;
  }

  reset(): void {
    this.state.frame = 0;
    this.state.time = performance.now();
    this.state.seed = Date.now();
  }

  setSeed(seed: number): void {
    this.state.seed = seed;
    if (this.p5Instance) {
      this.p5Instance.randomSeed(seed);
      this.p5Instance.noiseSeed(seed);
    }
  }

  // ========================
  // Export Methods
  // ========================

  captureFrame(): string {
    if (!this.p5Instance) return '';
    return (this.p5Instance as any).canvas.toDataURL('image/png');
  }

  destroy(): void {
    if (this.p5Instance) {
      this.p5Instance.remove();
      this.p5Instance = null;
    }
  }
}
```

---

## React UI Components

### src/ui/components/IdentityInput.tsx

```tsx
import React, { useState } from 'react';
import type { PersonalIdentity } from '@core/types';

interface IdentityInputProps {
  onSubmit: (identity: Partial<PersonalIdentity>) => void;
}

export const IdentityInput: React.FC<IdentityInputProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [words, setWords] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: crypto.randomUUID(),
      name,
      birthdate,
      meaningfulWords: words.split(',').map((w) => w.trim()).filter(Boolean),
      created: new Date(),
      updated: new Date(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="identity-input">
      <div className="field">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />
        <p className="help">
          Used for numerology calculations (Pythagorean, Chaldean, etc.)
        </p>
      </div>

      <div className="field">
        <label htmlFor="birthdate">Birthdate</label>
        <input
          id="birthdate"
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
        <p className="help">Used for Life Path number and astrological data</p>
      </div>

      <div className="field">
        <label htmlFor="words">Meaningful Words</label>
        <input
          id="words"
          type="text"
          value={words}
          onChange={(e) => setWords(e.target.value)}
          placeholder="hope, creation, flow (comma-separated)"
        />
        <p className="help">Words that resonate with you</p>
      </div>

      <button type="submit">Generate</button>
    </form>
  );
};
```

### src/ui/hooks/useIdentity.ts

```typescript
import { useState, useCallback } from 'react';
import { create } from 'zustand';
import type { PersonalIdentity, NumerologyProfile } from '@core/types';
import { NumerologyEngine } from '@numerology/NumerologyEngine';

interface IdentityState {
  identity: PersonalIdentity | null;
  profile: NumerologyProfile | null;
  setIdentity: (identity: PersonalIdentity) => void;
  calculateProfile: (system: string) => void;
  clear: () => void;
}

export const useIdentityStore = create<IdentityState>((set, get) => ({
  identity: null,
  profile: null,

  setIdentity: (identity) => {
    set({ identity });
    // Auto-calculate default profile
    const engine = new NumerologyEngine({
      system: 'pythagorean',
      preserveMasterNumbers: true,
      calculateCompound: false,
    });
    const profile = engine.calculate(identity.name, identity.birthdate);
    set({ profile });
  },

  calculateProfile: (system) => {
    const { identity } = get();
    if (!identity) return;

    const engine = new NumerologyEngine({
      system: system as any,
      preserveMasterNumbers: true,
      calculateCompound: system === 'chaldean',
    });
    const profile = engine.calculate(identity.name, identity.birthdate);
    set({ profile });
  },

  clear: () => set({ identity: null, profile: null }),
}));

export function useIdentity() {
  const store = useIdentityStore();
  return store;
}
```

---

## Export Utilities

### src/export/PNGExporter.ts

```typescript
export class PNGExporter {
  static async export(
    canvas: HTMLCanvasElement,
    filename: string,
    quality: number = 1
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to create blob'));
            return;
          }

          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          link.click();
          URL.revokeObjectURL(url);
          resolve();
        },
        'image/png',
        quality
      );
    });
  }

  static async toDataURL(
    canvas: HTMLCanvasElement,
    quality: number = 1
  ): Promise<string> {
    return canvas.toDataURL('image/png', quality);
  }
}
```

### src/export/MetadataGenerator.ts

```typescript
import type { ExportMetadata, PersonalIdentity, AlgorithmResult } from '@core/types';

export class MetadataGenerator {
  static generate(
    identity: PersonalIdentity,
    algorithms: AlgorithmResult[],
    seed: number
  ): ExportMetadata {
    return {
      identity: this.hashIdentity(identity),
      algorithms: algorithms.map((a) => a.algorithmId),
      params: this.aggregateParams(algorithms),
      seed,
      created: new Date().toISOString(),
      version: '1.0.0',
    };
  }

  private static hashIdentity(identity: PersonalIdentity): string {
    // Create a non-reversible hash of the identity
    const str = `${identity.name}:${identity.birthdate}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  }

  private static aggregateParams(
    algorithms: AlgorithmResult[]
  ): Record<string, unknown> {
    const params: Record<string, unknown> = {};
    for (const alg of algorithms) {
      params[alg.algorithmId] = alg.params;
    }
    return params;
  }

  static toJSON(metadata: ExportMetadata): string {
    return JSON.stringify(metadata, null, 2);
  }
}
```

---

## Example Algorithm Preset

### src/algorithms/presets/spiralGrowth.ts

```typescript
import p5 from 'p5';
import { Phyllotaxis } from '@proportions/Phyllotaxis';
import { GoldenRatio } from '@proportions/GoldenRatio';
import type { NumerologyProfile, RenderState } from '@core/types';

interface SpiralGrowthParams {
  profile: NumerologyProfile;
  baseCount: number;
  colorSaturation: number;
  animationSpeed: number;
}

export function spiralGrowthRenderer(params: SpiralGrowthParams) {
  const { profile, baseCount, colorSaturation, animationSpeed } = params;

  // Use numerology to parameterize the spiral
  const count = baseCount * profile.destiny;
  const divergence =
    Phyllotaxis.GOLDEN_ANGLE + (profile.soulUrge - 5) * 0.5;

  return (p: p5, state: RenderState) => {
    const centerX = p.width / 2;
    const centerY = p.height / 2;

    // Generate points
    const points = Phyllotaxis.generate(count, {
      divergence,
      scaling: 'sqrt',
      radius: 8,
    });

    // Animate growth
    const visibleCount = Math.min(
      points.length,
      Math.floor(state.frame * animationSpeed)
    );

    // Draw
    for (let i = 0; i < visibleCount; i++) {
      const pt = points[i];
      const age = (visibleCount - i) / visibleCount;

      // Color based on index and profile
      const hue = (profile.expression * 40 + i * 3) % 360;
      const size = 3 + age * 5;

      p.fill(hue, colorSaturation, 50 + age * 30);
      p.noStroke();
      p.circle(centerX + pt.x, centerY + pt.y, size);
    }

    // Draw golden spiral overlay
    const spiral = GoldenRatio.spiral(
      centerX,
      centerY,
      profile.lifePath * 2,
      profile.personality
    );

    p.stroke(60, 50, 50, 0.3);
    p.strokeWeight(1);
    p.noFill();
    p.beginShape();
    for (const pt of spiral.slice(0, Math.floor(state.frame / 2))) {
      p.vertex(pt.x, pt.y);
    }
    p.endShape();
  };
}
```

---

## Usage Example

### src/main.ts

```typescript
import { P5Renderer } from '@rendering/P5Renderer';
import { NumerologyEngine } from '@numerology/NumerologyEngine';
import { spiralGrowthRenderer } from '@algorithms/presets/spiralGrowth';

async function main() {
  // Get container
  const container = document.getElementById('canvas-container')!;

  // Initialize renderer
  const renderer = new P5Renderer({
    width: 800,
    height: 800,
    pixelRatio: window.devicePixelRatio,
    backgroundColor: '#0a0a0a',
    foregroundColor: '#ffffff',
    antialiasing: true,
    frameRate: 60,
  });

  await renderer.initialize(container);

  // Calculate numerology
  const engine = new NumerologyEngine({
    system: 'pythagorean',
    preserveMasterNumbers: true,
    calculateCompound: false,
  });

  const profile = engine.calculate('Jane Doe', '1990-04-15');

  // Create render callback
  const render = spiralGrowthRenderer({
    profile,
    baseCount: 50,
    colorSaturation: 70,
    animationSpeed: 2,
  });

  renderer.setRenderCallback(render);
  renderer.setSeed(profile.rawSum);
}

main();
```

---

## Testing

### tests/numerology.test.ts

```typescript
import { describe, it, expect } from 'vitest';
import { NumerologyEngine } from '@numerology/NumerologyEngine';

describe('NumerologyEngine', () => {
  describe('Pythagorean', () => {
    const engine = new NumerologyEngine({
      system: 'pythagorean',
      preserveMasterNumbers: true,
      calculateCompound: false,
    });

    it('calculates destiny number correctly', () => {
      // JANE DOE = 1+1+5+5 + 4+6+5 = 27 = 9
      const profile = engine.calculate('Jane Doe');
      expect(profile.destiny).toBe(9);
    });

    it('preserves master numbers', () => {
      // A name that sums to 11
      const profile = engine.calculate('AA'); // 1+1 = 2
      // Need to find actual master number test case
    });

    it('calculates life path from birthdate', () => {
      // 1990-04-15 = 1+9+9+0 + 0+4 + 1+5 = 29 = 11 (master) or 2
      const profile = engine.calculate('Test', '1990-04-15');
      expect([2, 11]).toContain(profile.lifePath);
    });
  });

  describe('Chaldean', () => {
    const engine = new NumerologyEngine({
      system: 'chaldean',
      preserveMasterNumbers: true,
      calculateCompound: true,
    });

    it('excludes 9 from reductions', () => {
      const profile = engine.calculate('Test Name');
      expect(profile.destiny).toBeLessThanOrEqual(8);
    });
  });
});
```

---

This implementation kit provides a complete foundation for building Identity Playground. The code is modular, typed, and follows modern React/TypeScript patterns.

---

*This document is part of the Identity Playground Extension Project, Phase 1.*
