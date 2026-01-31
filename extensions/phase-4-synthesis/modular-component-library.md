# Modular Component Library

## Shared Components Across Identity, Cipher, and Mythology Systems

**Document Type:** Implementation Notes
**Version:** 1.0
**Purpose:** Reusable React/p5.js components, utilities, and state management patterns

---

## Overview

This document defines the modular component library shared across all platform systems:

1. **React Components** — UI primitives and composites
2. **Numerology Utilities** — Shared calculation engines
3. **Cipher Engines** — Abstract cipher interfaces
4. **Rendering Abstractions** — Platform-agnostic graphics
5. **State Management** — Zustand patterns

---

## Part I: Project Structure

```
@4444jpp/components/
├── package.json
├── src/
│   ├── index.ts                    # Main exports
│   ├── react/                      # React components
│   │   ├── index.ts
│   │   ├── primitives/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Slider.tsx
│   │   │   ├── Toggle.tsx
│   │   │   └── Select.tsx
│   │   ├── composites/
│   │   │   ├── IdentityForm.tsx
│   │   │   ├── NumerologyDisplay.tsx
│   │   │   ├── CipherVisualizer.tsx
│   │   │   ├── ParameterPanel.tsx
│   │   │   └── ExportControls.tsx
│   │   └── layouts/
│   │       ├── SplitPane.tsx
│   │       ├── Canvas.tsx
│   │       └── Dashboard.tsx
│   ├── numerology/                 # Shared numerology
│   │   ├── index.ts
│   │   ├── calculators/
│   │   │   ├── base.ts
│   │   │   ├── pythagorean.ts
│   │   │   ├── chaldean.ts
│   │   │   └── unified.ts
│   │   └── mappings.ts
│   ├── cipher/                     # Shared cipher engines
│   │   ├── index.ts
│   │   ├── interfaces.ts
│   │   ├── caesar.ts
│   │   ├── vigenere.ts
│   │   └── enigma.ts
│   ├── rendering/                  # Rendering abstractions
│   │   ├── index.ts
│   │   ├── interfaces.ts
│   │   ├── p5-adapter.ts
│   │   ├── three-adapter.ts
│   │   └── canvas-adapter.ts
│   ├── state/                      # State management
│   │   ├── index.ts
│   │   ├── identity-store.ts
│   │   ├── cipher-store.ts
│   │   └── render-store.ts
│   └── utils/                      # Utilities
│       ├── index.ts
│       ├── math.ts
│       ├── color.ts
│       ├── random.ts
│       └── export.ts
└── tests/
```

---

## Part II: React Components

### Primitives

#### Button.tsx

```tsx
import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

    const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-500',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
    };

    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-6 text-lg',
    };

    return (
      <button
        ref={ref}
        className={clsx(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="mr-2 h-4 w-4 animate-spin\" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

#### Slider.tsx

```tsx
import React, { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  showValue?: boolean;
  valueFormatter?: (value: number) => string;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      label,
      showValue = true,
      valueFormatter = (v) => v.toString(),
      value,
      min = 0,
      max = 100,
      step = 1,
      ...props
    },
    ref
  ) => {
    const numericValue = typeof value === 'number' ? value : parseFloat(value as string) || 0;
    const percentage = ((numericValue - Number(min)) / (Number(max) - Number(min))) * 100;

    return (
      <div className={clsx('flex flex-col gap-1', className)}>
        {(label || showValue) && (
          <div className="flex justify-between text-sm">
            {label && <span className="text-gray-600">{label}</span>}
            {showValue && (
              <span className="text-gray-900 font-mono">
                {valueFormatter(numericValue)}
              </span>
            )}
          </div>
        )}
        <div className="relative h-2 w-full">
          <div className="absolute inset-0 rounded-full bg-gray-200" />
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-blue-600"
            style={{ width: `${percentage}%` }}
          />
          <input
            ref={ref}
            type="range"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            value={value}
            min={min}
            max={max}
            step={step}
            {...props}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-blue-600 shadow"
            style={{ left: `calc(${percentage}% - 8px)` }}
          />
        </div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';
```

### Composites

#### IdentityForm.tsx

```tsx
import React, { useState, useCallback } from 'react';
import { Button } from '../primitives/Button';
import type { PersonalIdentity } from '../../types';

export interface IdentityFormProps {
  onSubmit: (identity: Partial<PersonalIdentity>) => void;
  onClear?: () => void;
  initialValues?: Partial<PersonalIdentity>;
  loading?: boolean;
}

export const IdentityForm: React.FC<IdentityFormProps> = ({
  onSubmit,
  onClear,
  initialValues = {},
  loading = false,
}) => {
  const [name, setName] = useState(initialValues.name || '');
  const [birthdate, setBirthdate] = useState(initialValues.birthdate || '');
  const [meaningfulWords, setMeaningfulWords] = useState(
    initialValues.meaningfulWords?.join(', ') || ''
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({
        id: initialValues.id || crypto.randomUUID(),
        name,
        birthdate,
        meaningfulWords: meaningfulWords
          .split(',')
          .map((w) => w.trim())
          .filter(Boolean),
        created: initialValues.created || new Date(),
        updated: new Date(),
      });
    },
    [name, birthdate, meaningfulWords, initialValues, onSubmit]
  );

  const handleClear = useCallback(() => {
    setName('');
    setBirthdate('');
    setMeaningfulWords('');
    onClear?.();
  }, [onClear]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <p className="text-xs text-gray-500">
          Used for numerology calculations
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">
          Birthdate
        </label>
        <input
          id="birthdate"
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500">
          Used for Life Path number
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="words" className="block text-sm font-medium text-gray-700">
          Meaningful Words
        </label>
        <input
          id="words"
          type="text"
          value={meaningfulWords}
          onChange={(e) => setMeaningfulWords(e.target.value)}
          placeholder="hope, creation, flow (comma-separated)"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500">
          Words that resonate with you
        </p>
      </div>

      <div className="flex gap-2 pt-2">
        <Button type="submit" loading={loading} className="flex-1">
          Generate
        </Button>
        <Button type="button" variant="ghost" onClick={handleClear}>
          Clear
        </Button>
      </div>
    </form>
  );
};
```

#### NumerologyDisplay.tsx

```tsx
import React from 'react';
import { clsx } from 'clsx';
import type { NumerologyProfile } from '../../types';

export interface NumerologyDisplayProps {
  profile: NumerologyProfile;
  showDescriptions?: boolean;
  variant?: 'compact' | 'full';
}

const NUMBER_DESCRIPTIONS: Record<number, string> = {
  1: 'Independence, leadership, initiative',
  2: 'Partnership, diplomacy, sensitivity',
  3: 'Expression, creativity, communication',
  4: 'Stability, structure, discipline',
  5: 'Freedom, change, adventure',
  6: 'Responsibility, harmony, nurturing',
  7: 'Analysis, spirituality, introspection',
  8: 'Power, abundance, achievement',
  9: 'Wisdom, completion, humanitarianism',
  11: 'Intuition, inspiration, illumination',
  22: 'Master builder, vision, power',
  33: 'Master teacher, compassion, blessing',
};

export const NumerologyDisplay: React.FC<NumerologyDisplayProps> = ({
  profile,
  showDescriptions = true,
  variant = 'full',
}) => {
  const entries = [
    { label: 'Destiny', value: profile.destiny, primary: true },
    { label: 'Life Path', value: profile.lifePath, primary: true },
    { label: 'Soul Urge', value: profile.soulUrge, primary: false },
    { label: 'Personality', value: profile.personality, primary: false },
    { label: 'Expression', value: profile.expression, primary: false },
  ];

  if (variant === 'compact') {
    return (
      <div className="flex gap-4 flex-wrap">
        {entries.filter(e => e.primary).map((entry) => (
          <div key={entry.label} className="text-center">
            <div className="text-3xl font-bold text-gray-900">{entry.value}</div>
            <div className="text-xs text-gray-500">{entry.label}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-500 uppercase tracking-wide">
        {profile.system} Numerology
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {entries.map((entry) => (
          <div
            key={entry.label}
            className={clsx(
              'p-4 rounded-lg border',
              entry.primary ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
            )}
          >
            <div className="text-4xl font-bold text-center mb-1">
              {entry.value}
              {profile.isMasterNumber && [11, 22, 33].includes(entry.value) && (
                <span className="text-sm text-blue-600 ml-1">✧</span>
              )}
            </div>
            <div className="text-sm font-medium text-center text-gray-700">
              {entry.label}
            </div>
            {showDescriptions && (
              <div className="text-xs text-center text-gray-500 mt-2">
                {NUMBER_DESCRIPTIONS[entry.value] || ''}
              </div>
            )}
          </div>
        ))}
      </div>

      {profile.isMasterNumber && (
        <div className="text-sm text-blue-600 text-center">
          ✧ Master Number detected
        </div>
      )}
    </div>
  );
};
```

#### ParameterPanel.tsx

```tsx
import React from 'react';
import { Slider } from '../primitives/Slider';
import { Select } from '../primitives/Select';
import { Toggle } from '../primitives/Toggle';

export interface Parameter {
  id: string;
  type: 'number' | 'select' | 'boolean' | 'color';
  label: string;
  description?: string;
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string; label: string }[];
  default: unknown;
}

export interface ParameterPanelProps {
  parameters: Parameter[];
  values: Record<string, unknown>;
  onChange: (id: string, value: unknown) => void;
  onReset?: () => void;
}

export const ParameterPanel: React.FC<ParameterPanelProps> = ({
  parameters,
  values,
  onChange,
  onReset,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Parameters</h3>
        {onReset && (
          <button
            onClick={onReset}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Reset
          </button>
        )}
      </div>

      <div className="space-y-4">
        {parameters.map((param) => (
          <div key={param.id} className="space-y-1">
            {param.type === 'number' && (
              <Slider
                label={param.label}
                value={values[param.id] as number}
                min={param.min}
                max={param.max}
                step={param.step}
                onChange={(e) => onChange(param.id, parseFloat(e.target.value))}
              />
            )}

            {param.type === 'select' && (
              <Select
                label={param.label}
                value={values[param.id] as string}
                options={param.options || []}
                onChange={(e) => onChange(param.id, e.target.value)}
              />
            )}

            {param.type === 'boolean' && (
              <Toggle
                label={param.label}
                checked={values[param.id] as boolean}
                onChange={(checked) => onChange(param.id, checked)}
              />
            )}

            {param.type === 'color' && (
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">{param.label}</label>
                <input
                  type="color"
                  value={values[param.id] as string}
                  onChange={(e) => onChange(param.id, e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer"
                />
              </div>
            )}

            {param.description && (
              <p className="text-xs text-gray-500">{param.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

## Part III: Numerology Utilities

### Base Calculator

```typescript
// numerology/calculators/base.ts

export interface NumerologyResult {
  raw: number;
  reduced: number;
  isMaster: boolean;
  breakdown: { char: string; value: number }[];
}

export abstract class BaseNumerologyCalculator {
  abstract readonly id: string;
  abstract readonly name: string;
  abstract readonly letterMapping: Record<string, number>;

  protected masterNumbers = [11, 22, 33];
  protected preserveMasters = true;

  setPreserveMasters(preserve: boolean): void {
    this.preserveMasters = preserve;
  }

  calculate(input: string): NumerologyResult {
    const breakdown = input
      .toUpperCase()
      .split('')
      .filter((c) => this.letterMapping[c] !== undefined)
      .map((c) => ({ char: c, value: this.letterMapping[c] }));

    const raw = breakdown.reduce((sum, item) => sum + item.value, 0);
    const reduced = this.reduce(raw);
    const isMaster = this.masterNumbers.includes(raw) && this.preserveMasters;

    return {
      raw,
      reduced: isMaster ? raw : reduced,
      isMaster,
      breakdown,
    };
  }

  protected reduce(n: number): number {
    while (n > 9) {
      if (this.preserveMasters && this.masterNumbers.includes(n)) {
        return n;
      }
      n = this.digitSum(n);
    }
    return n;
  }

  protected digitSum(n: number): number {
    return String(n)
      .split('')
      .reduce((sum, d) => sum + parseInt(d, 10), 0);
  }

  calculateLifePath(birthdate: string): NumerologyResult {
    // Format: YYYY-MM-DD
    const [year, month, day] = birthdate.split('-').map((s) => parseInt(s, 10));

    const yearSum = this.digitSum(year);
    const monthSum = this.digitSum(month);
    const daySum = this.digitSum(day);
    const raw = yearSum + monthSum + daySum;

    return {
      raw,
      reduced: this.reduce(raw),
      isMaster: this.masterNumbers.includes(raw) && this.preserveMasters,
      breakdown: [
        { char: 'Y', value: yearSum },
        { char: 'M', value: monthSum },
        { char: 'D', value: daySum },
      ],
    };
  }
}
```

### Pythagorean Calculator

```typescript
// numerology/calculators/pythagorean.ts

import { BaseNumerologyCalculator } from './base';

export class PythagoreanCalculator extends BaseNumerologyCalculator {
  readonly id = 'pythagorean';
  readonly name = 'Pythagorean Numerology';

  readonly letterMapping: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
  };

  private readonly vowels = ['A', 'E', 'I', 'O', 'U'];

  calculateSoulUrge(name: string): number {
    const vowelSum = name
      .toUpperCase()
      .split('')
      .filter((c) => this.vowels.includes(c))
      .reduce((sum, c) => sum + (this.letterMapping[c] || 0), 0);
    return this.reduce(vowelSum);
  }

  calculatePersonality(name: string): number {
    const consonantSum = name
      .toUpperCase()
      .split('')
      .filter((c) => this.letterMapping[c] && !this.vowels.includes(c))
      .reduce((sum, c) => sum + this.letterMapping[c], 0);
    return this.reduce(consonantSum);
  }

  getFullProfile(name: string, birthdate?: string) {
    const destiny = this.calculate(name);
    const lifePath = birthdate ? this.calculateLifePath(birthdate) : null;
    const soulUrge = this.calculateSoulUrge(name);
    const personality = this.calculatePersonality(name);

    return {
      destiny: destiny.reduced,
      lifePath: lifePath?.reduced ?? 0,
      soulUrge,
      personality,
      expression: destiny.reduced,
      rawSum: destiny.raw,
      isMasterNumber: destiny.isMaster || (lifePath?.isMaster ?? false),
    };
  }
}
```

### Unified Calculator

```typescript
// numerology/calculators/unified.ts

import { PythagoreanCalculator } from './pythagorean';
import { ChaldeanCalculator } from './chaldean';
import type { NumerologySystem, NumerologyProfile } from '../../types';

const CALCULATORS: Record<NumerologySystem, new () => any> = {
  pythagorean: PythagoreanCalculator,
  chaldean: ChaldeanCalculator,
  // Add more as needed
};

export class UnifiedNumerologyCalculator {
  private calculators: Map<NumerologySystem, any> = new Map();

  constructor() {
    // Lazy initialization
  }

  private getCalculator(system: NumerologySystem) {
    if (!this.calculators.has(system)) {
      const Calculator = CALCULATORS[system];
      if (!Calculator) {
        throw new Error(`Unknown numerology system: ${system}`);
      }
      this.calculators.set(system, new Calculator());
    }
    return this.calculators.get(system);
  }

  calculate(
    name: string,
    birthdate: string | undefined,
    system: NumerologySystem
  ): NumerologyProfile {
    const calculator = this.getCalculator(system);
    const profile = calculator.getFullProfile(name, birthdate);

    return {
      system,
      ...profile,
    };
  }

  calculateMultiple(
    name: string,
    birthdate: string | undefined,
    systems: NumerologySystem[]
  ): Record<NumerologySystem, NumerologyProfile> {
    const results: Record<string, NumerologyProfile> = {};

    for (const system of systems) {
      results[system] = this.calculate(name, birthdate, system);
    }

    return results as Record<NumerologySystem, NumerologyProfile>;
  }
}
```

---

## Part IV: Cipher Engines

### Cipher Interface

```typescript
// cipher/interfaces.ts

export interface CipherConfig {
  [key: string]: unknown;
}

export interface CipherState {
  step: number;
  input: string;
  output: string;
  data: Record<string, unknown>;
}

export interface CipherEvent {
  type: string;
  timestamp: number;
  data: Record<string, unknown>;
}

export interface ICipher {
  readonly id: string;
  readonly name: string;

  configure(config: CipherConfig): void;
  getConfig(): CipherConfig;

  encrypt(plaintext: string): string;
  decrypt(ciphertext: string): string;

  // Step-by-step for visualization
  getInitialState(): CipherState;
  step(state: CipherState): { nextState: CipherState; events: CipherEvent[] };
}
```

### Caesar Cipher

```typescript
// cipher/caesar.ts

import type { ICipher, CipherConfig, CipherState, CipherEvent } from './interfaces';

export class CaesarCipher implements ICipher {
  readonly id = 'caesar';
  readonly name = 'Caesar Cipher';

  private shift = 3;
  private alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  configure(config: CipherConfig): void {
    if (typeof config.shift === 'number') {
      this.shift = ((config.shift % 26) + 26) % 26;
    }
  }

  getConfig(): CipherConfig {
    return { shift: this.shift };
  }

  encrypt(plaintext: string): string {
    return this.transform(plaintext, this.shift);
  }

  decrypt(ciphertext: string): string {
    return this.transform(ciphertext, -this.shift);
  }

  private transform(text: string, shift: number): string {
    return text
      .toUpperCase()
      .split('')
      .map((char) => {
        const index = this.alphabet.indexOf(char);
        if (index === -1) return char;
        return this.alphabet[(index + shift + 26) % 26];
      })
      .join('');
  }

  getInitialState(): CipherState {
    return {
      step: 0,
      input: '',
      output: '',
      data: { shift: this.shift },
    };
  }

  step(state: CipherState): { nextState: CipherState; events: CipherEvent[] } {
    const inputChar = state.input[state.step] || '';
    const outputChar = this.transform(inputChar, this.shift);

    const events: CipherEvent[] = [
      {
        type: 'substitution',
        timestamp: Date.now(),
        data: {
          from: inputChar,
          to: outputChar,
          shift: this.shift,
          position: state.step,
        },
      },
    ];

    return {
      nextState: {
        step: state.step + 1,
        input: state.input,
        output: state.output + outputChar,
        data: state.data,
      },
      events,
    };
  }
}
```

---

## Part V: Rendering Abstractions

### Renderer Interface

```typescript
// rendering/interfaces.ts

export interface RenderConfig {
  width: number;
  height: number;
  pixelRatio?: number;
  backgroundColor?: string;
  frameRate?: number;
}

export interface RenderState {
  frame: number;
  time: number;
  deltaTime: number;
  isPlaying: boolean;
}

export interface IRenderer {
  readonly id: string;

  initialize(container: HTMLElement, config: RenderConfig): Promise<void>;
  destroy(): void;

  render(callback: (state: RenderState) => void): void;
  play(): void;
  pause(): void;
  reset(): void;

  captureFrame(): Promise<string | Blob>;
}
```

### p5.js Adapter

```typescript
// rendering/p5-adapter.ts

import p5 from 'p5';
import type { IRenderer, RenderConfig, RenderState } from './interfaces';

export class P5Adapter implements IRenderer {
  readonly id = 'p5';

  private instance: p5 | null = null;
  private container: HTMLElement | null = null;
  private config: RenderConfig | null = null;
  private renderCallback: ((state: RenderState) => void) | null = null;
  private state: RenderState = {
    frame: 0,
    time: 0,
    deltaTime: 0,
    isPlaying: true,
  };

  async initialize(container: HTMLElement, config: RenderConfig): Promise<void> {
    this.container = container;
    this.config = config;

    return new Promise((resolve) => {
      this.instance = new p5((p: p5) => {
        p.setup = () => {
          p.createCanvas(config.width, config.height);
          p.pixelDensity(config.pixelRatio || 1);
          if (config.frameRate) p.frameRate(config.frameRate);
          resolve();
        };

        p.draw = () => {
          if (!this.state.isPlaying) return;

          const now = performance.now();
          this.state.deltaTime = now - this.state.time;
          this.state.time = now;
          this.state.frame++;

          if (config.backgroundColor) {
            p.background(config.backgroundColor);
          }

          if (this.renderCallback) {
            this.renderCallback(this.state);
          }
        };
      }, container);
    });
  }

  destroy(): void {
    if (this.instance) {
      this.instance.remove();
      this.instance = null;
    }
  }

  render(callback: (state: RenderState) => void): void {
    this.renderCallback = callback;
  }

  play(): void {
    this.state.isPlaying = true;
    if (this.instance) this.instance.loop();
  }

  pause(): void {
    this.state.isPlaying = false;
    if (this.instance) this.instance.noLoop();
  }

  reset(): void {
    this.state.frame = 0;
    this.state.time = performance.now();
  }

  async captureFrame(): Promise<string> {
    if (!this.instance) return '';
    return (this.instance as any).canvas.toDataURL('image/png');
  }

  // Expose p5 instance for direct drawing
  getP5(): p5 | null {
    return this.instance;
  }
}
```

---

## Part VI: State Management

### Identity Store

```typescript
// state/identity-store.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PersonalIdentity, NumerologyProfile } from '../types';
import { UnifiedNumerologyCalculator } from '../numerology/calculators/unified';

interface IdentityState {
  identity: PersonalIdentity | null;
  profiles: Record<string, NumerologyProfile>;
  calculator: UnifiedNumerologyCalculator;

  // Actions
  setIdentity: (identity: PersonalIdentity) => void;
  calculateProfile: (system: string) => void;
  calculateAllProfiles: () => void;
  clear: () => void;
}

export const useIdentityStore = create<IdentityState>()(
  persist(
    (set, get) => ({
      identity: null,
      profiles: {},
      calculator: new UnifiedNumerologyCalculator(),

      setIdentity: (identity) => {
        set({ identity, profiles: {} });
        // Auto-calculate default profile
        get().calculateProfile('pythagorean');
      },

      calculateProfile: (system) => {
        const { identity, calculator, profiles } = get();
        if (!identity) return;

        const profile = calculator.calculate(
          identity.name,
          identity.birthdate,
          system as any
        );

        set({ profiles: { ...profiles, [system]: profile } });
      },

      calculateAllProfiles: () => {
        const systems = ['pythagorean', 'chaldean'];
        systems.forEach((s) => get().calculateProfile(s));
      },

      clear: () => set({ identity: null, profiles: {} }),
    }),
    {
      name: 'identity-storage',
      partialize: (state) => ({ identity: state.identity }),
    }
  )
);
```

### Render Store

```typescript
// state/render-store.ts

import { create } from 'zustand';
import type { RenderConfig, RenderState } from '../rendering/interfaces';

interface RenderStoreState {
  config: RenderConfig;
  state: RenderState;
  seed: number;
  parameters: Record<string, unknown>;

  // Actions
  setConfig: (config: Partial<RenderConfig>) => void;
  setParameter: (key: string, value: unknown) => void;
  setParameters: (params: Record<string, unknown>) => void;
  setSeed: (seed: number) => void;
  randomizeSeed: () => void;
  updateState: (state: Partial<RenderState>) => void;
  reset: () => void;
}

const DEFAULT_CONFIG: RenderConfig = {
  width: 800,
  height: 800,
  pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1,
  backgroundColor: '#000000',
  frameRate: 60,
};

export const useRenderStore = create<RenderStoreState>((set) => ({
  config: DEFAULT_CONFIG,
  state: { frame: 0, time: 0, deltaTime: 0, isPlaying: true },
  seed: Date.now(),
  parameters: {},

  setConfig: (config) =>
    set((s) => ({ config: { ...s.config, ...config } })),

  setParameter: (key, value) =>
    set((s) => ({ parameters: { ...s.parameters, [key]: value } })),

  setParameters: (params) =>
    set((s) => ({ parameters: { ...s.parameters, ...params } })),

  setSeed: (seed) => set({ seed }),

  randomizeSeed: () => set({ seed: Date.now() }),

  updateState: (state) =>
    set((s) => ({ state: { ...s.state, ...state } })),

  reset: () =>
    set({
      state: { frame: 0, time: 0, deltaTime: 0, isPlaying: true },
      seed: Date.now(),
    }),
}));
```

---

## Part VII: Utilities

### Math Utilities

```typescript
// utils/math.ts

export const PHI = (1 + Math.sqrt(5)) / 2;

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function map(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

export function distance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

export function normalize(value: number, min: number, max: number): number {
  return (value - min) / (max - min);
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}
```

### Seeded Random

```typescript
// utils/random.ts

export class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 1103515245 + 12345) & 0x7fffffff;
    return this.seed / 0x7fffffff;
  }

  range(min: number, max: number): number {
    return min + this.next() * (max - min);
  }

  int(min: number, max: number): number {
    return Math.floor(this.range(min, max + 1));
  }

  pick<T>(array: T[]): T {
    return array[this.int(0, array.length - 1)];
  }

  shuffle<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = this.int(0, i);
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  gaussian(mean: number = 0, stddev: number = 1): number {
    const u1 = this.next();
    const u2 = this.next();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return z * stddev + mean;
  }
}
```

---

## Conclusion

This modular component library provides:

1. **Consistent UI** — Reusable React components
2. **Shared Calculations** — Unified numerology engine
3. **Cipher Flexibility** — Abstract cipher interfaces
4. **Renderer Agnostic** — Adapter pattern for different graphics libraries
5. **State Management** — Zustand stores for global state

All components are designed to work together while remaining independently usable.

---

*This document is part of the Cross-Domain Synthesis Extension Project, Phase 4.*
