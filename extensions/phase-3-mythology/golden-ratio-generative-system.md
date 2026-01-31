# Golden Ratio Generative System

## Mathematical Utilities and Visual Generators Based on φ

**Document Type:** Implementation Notes
**Version:** 1.0
**Extends:** `SYMB0l1C-4RK-Golden-Ratio-Protocols-Initiation.md`
**Purpose:** Complete implementation of φ-based generative tools

---

## Overview

This document provides production-ready code for golden ratio-based generative systems:

1. **Mathematical Utilities** — Core φ calculations
2. **Phyllotaxis Spiral Generator** — Sunflower patterns
3. **Golden Rectangle Subdivision** — Recursive rectangles
4. **φ-Based Color Harmony** — Color palette generation
5. **Integration Examples** — Full generative pieces

---

## Part I: Mathematical Utilities

### Core Constants and Functions

```typescript
// golden-ratio.ts

/**
 * The Golden Ratio: φ = (1 + √5) / 2
 */
export const PHI = (1 + Math.sqrt(5)) / 2; // 1.6180339887498949...

/**
 * Inverse of Golden Ratio: 1/φ = φ - 1
 */
export const PHI_INVERSE = PHI - 1; // 0.6180339887498949...

/**
 * Golden Angle in radians: 2π/φ²
 */
export const GOLDEN_ANGLE_RAD = (2 * Math.PI) / (PHI * PHI); // 2.39996322972865...

/**
 * Golden Angle in degrees
 */
export const GOLDEN_ANGLE_DEG = 137.5077640500378546;

/**
 * Fibonacci sequence generator
 */
export function* fibonacci(): Generator<number, never, unknown> {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

/**
 * Get nth Fibonacci number
 */
export function fib(n: number): number {
  if (n < 2) return n;

  // Binet's formula (accurate for n < ~70)
  const sqrt5 = Math.sqrt(5);
  return Math.round((Math.pow(PHI, n) - Math.pow(-PHI_INVERSE, n)) / sqrt5);
}

/**
 * Check if number is close to a Fibonacci number
 */
export function nearestFibonacci(n: number): { value: number; index: number; diff: number } {
  const gen = fibonacci();
  let prev = gen.next().value;
  let index = 0;

  for (const curr of gen) {
    if (curr > n) {
      const diffPrev = Math.abs(n - prev);
      const diffCurr = Math.abs(n - curr);
      if (diffPrev <= diffCurr) {
        return { value: prev, index: index - 1, diff: diffPrev };
      }
      return { value: curr, index, diff: diffCurr };
    }
    prev = curr;
    index++;
    if (index > 100) break; // Safety limit
  }
  return { value: prev, index, diff: Math.abs(n - prev) };
}

/**
 * Generate Lucas numbers (similar to Fibonacci, starts 2, 1)
 */
export function* lucas(): Generator<number, never, unknown> {
  let a = 2, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

/**
 * Golden ratio powers
 */
export function phiPow(n: number): number {
  return Math.pow(PHI, n);
}

/**
 * Align value to nearest φ multiple
 */
export function alignToPhi(value: number, tolerance: number = 0.01): number {
  const multiple = Math.round(value / PHI);
  const aligned = multiple * PHI;
  if (Math.abs(value - aligned) / value < tolerance) {
    return aligned;
  }
  return value;
}

/**
 * φ-based interpolation (more aesthetically pleasing than linear)
 */
export function phiLerp(a: number, b: number, t: number): number {
  // Use φ curve instead of linear
  const phiT = 1 - Math.pow(1 - t, PHI);
  return a + (b - a) * phiT;
}

/**
 * Generate φ-proportioned sequence
 */
export function phiSequence(start: number, count: number, operation: 'multiply' | 'divide' = 'multiply'): number[] {
  const result = [start];
  for (let i = 1; i < count; i++) {
    const prev = result[result.length - 1];
    result.push(operation === 'multiply' ? prev * PHI : prev / PHI);
  }
  return result;
}
```

---

## Part II: Phyllotaxis Spiral Generator

```typescript
// phyllotaxis.ts

import { GOLDEN_ANGLE_DEG, PHI } from './golden-ratio';

export interface PhyllotaxisPoint {
  x: number;
  y: number;
  index: number;
  angle: number;
  radius: number;
}

export interface PhyllotaxisOptions {
  count: number;
  divergenceAngle?: number; // degrees, default golden angle
  radiusScale?: number;
  radiusFunction?: 'sqrt' | 'linear' | 'log' | 'fibonacci';
  centerX?: number;
  centerY?: number;
}

/**
 * Generate phyllotaxis pattern (sunflower spiral)
 */
export function generatePhyllotaxis(options: PhyllotaxisOptions): PhyllotaxisPoint[] {
  const {
    count,
    divergenceAngle = GOLDEN_ANGLE_DEG,
    radiusScale = 10,
    radiusFunction = 'sqrt',
    centerX = 0,
    centerY = 0,
  } = options;

  const points: PhyllotaxisPoint[] = [];
  const divergenceRad = divergenceAngle * (Math.PI / 180);

  for (let i = 0; i < count; i++) {
    const angle = i * divergenceRad;

    let radius: number;
    switch (radiusFunction) {
      case 'linear':
        radius = radiusScale * i;
        break;
      case 'log':
        radius = radiusScale * Math.log(i + 1);
        break;
      case 'fibonacci':
        radius = radiusScale * Math.sqrt(fib(Math.min(i, 45)));
        break;
      default: // sqrt (Vogel's model)
        radius = radiusScale * Math.sqrt(i);
    }

    points.push({
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
      index: i,
      angle,
      radius,
    });
  }

  return points;
}

/**
 * Fermat's spiral (basis for sunflower)
 */
export function fermatSpiral(
  centerX: number,
  centerY: number,
  a: number,
  maxTheta: number,
  step: number = 0.1
): { x: number; y: number; theta: number }[] {
  const points: { x: number; y: number; theta: number }[] = [];

  for (let theta = 0; theta <= maxTheta; theta += step) {
    const r = a * Math.sqrt(theta);
    points.push({
      x: centerX + r * Math.cos(theta),
      y: centerY + r * Math.sin(theta),
      theta,
    });
  }

  return points;
}

/**
 * Sunflower seed head with proper Fibonacci spirals
 */
export function sunflowerHead(
  centerX: number,
  centerY: number,
  seedCount: number,
  maxRadius: number
): {
  seeds: PhyllotaxisPoint[];
  spirals: { direction: 'cw' | 'ccw'; count: number }[];
} {
  const seeds = generatePhyllotaxis({
    count: seedCount,
    radiusScale: maxRadius / Math.sqrt(seedCount),
    centerX,
    centerY,
  });

  // Count Fibonacci spirals
  // In a sunflower, you typically see consecutive Fibonacci numbers
  // of spirals going clockwise and counterclockwise
  const { index: fibIndex } = nearestFibonacci(seedCount);

  return {
    seeds,
    spirals: [
      { direction: 'cw', count: fib(fibIndex) },
      { direction: 'ccw', count: fib(fibIndex - 1) },
    ],
  };
}
```

---

## Part III: Golden Rectangle Subdivision

```typescript
// golden-rectangle.ts

import { PHI, PHI_INVERSE } from './golden-ratio';

export interface GoldenRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  orientation: 'landscape' | 'portrait';
  depth: number;
}

export interface GoldenSpiralPoint {
  x: number;
  y: number;
  angle: number;
  radius: number;
}

/**
 * Subdivide a rectangle using golden ratio
 */
export function subdivideGoldenRectangle(
  x: number,
  y: number,
  width: number,
  height: number,
  maxDepth: number
): GoldenRectangle[] {
  const rectangles: GoldenRectangle[] = [];

  function subdivide(
    rx: number,
    ry: number,
    rw: number,
    rh: number,
    depth: number,
    direction: number
  ): void {
    if (depth >= maxDepth) return;

    const isLandscape = rw > rh;
    const orientation = isLandscape ? 'landscape' : 'portrait';

    rectangles.push({
      x: rx,
      y: ry,
      width: rw,
      height: rh,
      orientation,
      depth,
    });

    // Calculate square and remaining rectangle
    if (isLandscape) {
      const squareSize = rh;
      const remaining = rw - squareSize;

      // Add square (for spiral arc center)
      const squareX = direction % 4 === 0 || direction % 4 === 3 ? rx : rx + remaining;

      // Recurse on remaining rectangle
      const nextX = direction % 4 === 0 || direction % 4 === 3 ? rx + squareSize : rx;
      subdivide(nextX, ry, remaining, rh, depth + 1, (direction + 1) % 4);
    } else {
      const squareSize = rw;
      const remaining = rh - squareSize;

      const squareY = direction % 4 === 1 || direction % 4 === 2 ? ry : ry + remaining;

      const nextY = direction % 4 === 1 || direction % 4 === 2 ? ry + squareSize : ry;
      subdivide(rx, nextY, rw, remaining, depth + 1, (direction + 1) % 4);
    }
  }

  subdivide(x, y, width, height, 0, 0);
  return rectangles;
}

/**
 * Generate golden spiral from subdivided rectangles
 */
export function goldenSpiralFromRectangles(
  rectangles: GoldenRectangle[],
  pointsPerArc: number = 20
): GoldenSpiralPoint[] {
  const points: GoldenSpiralPoint[] = [];
  let cumulativeAngle = 0;

  rectangles.forEach((rect, i) => {
    const squareSize = Math.min(rect.width, rect.height);
    const direction = i % 4;

    // Center of arc
    let cx: number, cy: number;
    let startAngle: number;

    switch (direction) {
      case 0: // Right
        cx = rect.x + squareSize;
        cy = rect.y + squareSize;
        startAngle = Math.PI;
        break;
      case 1: // Down
        cx = rect.x;
        cy = rect.y + squareSize;
        startAngle = Math.PI / 2;
        break;
      case 2: // Left
        cx = rect.x;
        cy = rect.y;
        startAngle = 0;
        break;
      case 3: // Up
        cx = rect.x + squareSize;
        cy = rect.y;
        startAngle = -Math.PI / 2;
        break;
      default:
        return;
    }

    // Generate arc points
    for (let j = 0; j < pointsPerArc; j++) {
      const t = j / (pointsPerArc - 1);
      const angle = startAngle + t * (Math.PI / 2);
      const radius = squareSize;

      points.push({
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle),
        angle: cumulativeAngle + t * (Math.PI / 2),
        radius: squareSize * Math.pow(PHI_INVERSE, i),
      });
    }

    cumulativeAngle += Math.PI / 2;
  });

  return points;
}

/**
 * Create logarithmic golden spiral
 */
export function goldenLogarithmicSpiral(
  centerX: number,
  centerY: number,
  initialRadius: number,
  rotations: number,
  pointsPerRotation: number = 100
): GoldenSpiralPoint[] {
  const points: GoldenSpiralPoint[] = [];
  const totalPoints = rotations * pointsPerRotation;
  const b = Math.log(PHI) / (Math.PI / 2); // Growth factor

  for (let i = 0; i < totalPoints; i++) {
    const angle = (i / pointsPerRotation) * Math.PI * 2;
    const radius = initialRadius * Math.exp(b * angle);

    points.push({
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
      angle,
      radius,
    });
  }

  return points;
}
```

---

## Part IV: φ-Based Color Harmony

```typescript
// phi-color.ts

import { PHI, GOLDEN_ANGLE_DEG } from './golden-ratio';

export interface HSLColor {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
}

export interface RGBColor {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
}

/**
 * Generate golden-ratio-spaced hues
 */
export function goldenHues(startHue: number, count: number): number[] {
  const hues: number[] = [];
  let hue = startHue;

  for (let i = 0; i < count; i++) {
    hues.push(hue % 360);
    hue += GOLDEN_ANGLE_DEG;
  }

  return hues;
}

/**
 * Create φ-harmonious color palette
 */
export function goldenPalette(
  baseHue: number,
  baseSaturation: number,
  baseLightness: number,
  count: number
): HSLColor[] {
  const palette: HSLColor[] = [];
  const hues = goldenHues(baseHue, count);

  // Vary saturation and lightness using φ
  for (let i = 0; i < count; i++) {
    const satVariation = (i % 3 === 0) ? 0 : (i % 3 === 1) ? 10 : -10;
    const lightVariation = ((i * PHI_INVERSE) % 1) * 20 - 10;

    palette.push({
      h: hues[i],
      s: clamp(baseSaturation + satVariation, 0, 100),
      l: clamp(baseLightness + lightVariation, 0, 100),
    });
  }

  return palette;
}

/**
 * φ-proportioned gradient stops
 */
export function goldenGradientStops(
  color1: HSLColor,
  color2: HSLColor,
  count: number
): { position: number; color: HSLColor }[] {
  const stops: { position: number; color: HSLColor }[] = [];

  // Use φ-based positions instead of linear
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const phiPosition = 1 - Math.pow(1 - t, PHI); // φ curve

    stops.push({
      position: phiPosition,
      color: {
        h: lerp(color1.h, color2.h, t),
        s: lerp(color1.s, color2.s, t),
        l: lerp(color1.l, color2.l, t),
      },
    });
  }

  return stops;
}

/**
 * Convert numerology number to φ-based color
 */
export function numerologyToColor(
  number: number,
  saturation: number = 70,
  lightness: number = 50
): HSLColor {
  // Map 1-9 to hue spectrum using golden angle
  const baseHue = (number - 1) * GOLDEN_ANGLE_DEG;

  return {
    h: baseHue % 360,
    s: saturation,
    l: lightness,
  };
}

/**
 * Create triadic harmony using φ
 */
export function goldenTriad(baseHue: number): [number, number, number] {
  return [
    baseHue % 360,
    (baseHue + GOLDEN_ANGLE_DEG) % 360,
    (baseHue + GOLDEN_ANGLE_DEG * 2) % 360,
  ];
}

/**
 * Create φ-proportioned tint/shade series
 */
export function goldenTintShade(
  hue: number,
  saturation: number,
  baseLightness: number,
  count: number
): HSLColor[] {
  const colors: HSLColor[] = [];
  const lightnessRange = 80; // Total range

  for (let i = 0; i < count; i++) {
    // Use φ to distribute lightness values
    const position = i / (count - 1);
    const phiPosition = 1 - Math.pow(1 - position, PHI);
    const lightness = baseLightness - lightnessRange / 2 + phiPosition * lightnessRange;

    colors.push({
      h: hue,
      s: saturation,
      l: clamp(lightness, 5, 95),
    });
  }

  return colors;
}

// Utility functions
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function hslToRgb(hsl: HSLColor): RGBColor {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

export function hslToString(hsl: HSLColor): string {
  return `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;
}
```

---

## Part V: Integration Examples

### Example 1: Complete Phyllotaxis Visualization

```typescript
// phyllotaxis-sketch.ts

import p5 from 'p5';
import { generatePhyllotaxis, PhyllotaxisPoint } from './phyllotaxis';
import { goldenPalette, hslToString, numerologyToColor } from './phi-color';
import { PHI } from './golden-ratio';

interface SketchConfig {
  seedCount: number;
  numerologyNumber: number;
  animationSpeed: number;
}

export function createPhyllotaxisSketch(config: SketchConfig) {
  return (p: p5) => {
    let points: PhyllotaxisPoint[] = [];
    let palette: ReturnType<typeof goldenPalette> = [];
    let visibleCount = 0;

    p.setup = () => {
      p.createCanvas(800, 800);
      p.colorMode(p.HSL, 360, 100, 100, 1);

      // Generate pattern
      points = generatePhyllotaxis({
        count: config.seedCount,
        radiusScale: 8,
        centerX: p.width / 2,
        centerY: p.height / 2,
      });

      // Create palette based on numerology
      const baseColor = numerologyToColor(config.numerologyNumber);
      palette = goldenPalette(baseColor.h, baseColor.s, baseColor.l, 9);
    };

    p.draw = () => {
      p.background(0, 0, 10);

      // Animate growth
      visibleCount = Math.min(
        points.length,
        Math.floor(p.frameCount * config.animationSpeed)
      );

      // Draw seeds
      for (let i = 0; i < visibleCount; i++) {
        const pt = points[i];
        const colorIndex = i % palette.length;
        const color = palette[colorIndex];

        // Age-based size and opacity
        const age = (visibleCount - i) / visibleCount;
        const size = 4 + age * 8;

        p.fill(color.h, color.s, color.l, 0.3 + age * 0.7);
        p.noStroke();
        p.circle(pt.x, pt.y, size);

        // Add golden ratio scaled glow for recent seeds
        if (i > visibleCount - 20) {
          const glowSize = size * PHI;
          p.fill(color.h, color.s, color.l + 20, 0.1);
          p.circle(pt.x, pt.y, glowSize);
        }
      }

      // Draw connecting spiral hint
      if (visibleCount > 10) {
        p.stroke(60, 50, 50, 0.3);
        p.strokeWeight(1);
        p.noFill();
        p.beginShape();
        for (let i = 0; i < Math.min(visibleCount, 100); i++) {
          p.vertex(points[i].x, points[i].y);
        }
        p.endShape();
      }
    };
  };
}
```

### Example 2: Golden Rectangle Art

```typescript
// golden-rectangle-sketch.ts

import p5 from 'p5';
import {
  subdivideGoldenRectangle,
  goldenSpiralFromRectangles,
} from './golden-rectangle';
import { goldenPalette, hslToString } from './phi-color';
import { PHI } from './golden-ratio';

export function createGoldenRectangleSketch(depth: number = 10) {
  return (p: p5) => {
    let rectangles: ReturnType<typeof subdivideGoldenRectangle> = [];
    let spiral: ReturnType<typeof goldenSpiralFromRectangles> = [];
    let palette: ReturnType<typeof goldenPalette> = [];
    let animationProgress = 0;

    p.setup = () => {
      p.createCanvas(800, 800);
      p.colorMode(p.HSL, 360, 100, 100, 1);

      // Generate golden rectangle at proper proportions
      const rectWidth = p.width * 0.8;
      const rectHeight = rectWidth / PHI;
      const startX = (p.width - rectWidth) / 2;
      const startY = (p.height - rectHeight) / 2;

      rectangles = subdivideGoldenRectangle(
        startX,
        startY,
        rectWidth,
        rectHeight,
        depth
      );

      spiral = goldenSpiralFromRectangles(rectangles);
      palette = goldenPalette(30, 60, 50, depth);
    };

    p.draw = () => {
      p.background(0, 0, 95);

      // Animate rectangles appearing
      animationProgress = Math.min(1, p.frameCount / 120);
      const visibleRects = Math.floor(animationProgress * rectangles.length);

      // Draw rectangles
      for (let i = 0; i < visibleRects; i++) {
        const rect = rectangles[i];
        const color = palette[i % palette.length];

        // Fill with depth-based opacity
        const opacity = 0.1 + (1 - rect.depth / depth) * 0.3;
        p.fill(color.h, color.s, color.l, opacity);
        p.stroke(color.h, color.s, color.l - 20);
        p.strokeWeight(2);
        p.rect(rect.x, rect.y, rect.width, rect.height);

        // Add φ symbol in center of larger rectangles
        if (rect.depth < 3) {
          p.fill(0, 0, 30);
          p.noStroke();
          p.textAlign(p.CENTER, p.CENTER);
          p.textSize(rect.width / 4);
          p.text('φ', rect.x + rect.width / 2, rect.y + rect.height / 2);
        }
      }

      // Draw golden spiral
      const spiralProgress = Math.min(1, (p.frameCount - 60) / 180);
      if (spiralProgress > 0) {
        const visiblePoints = Math.floor(spiralProgress * spiral.length);

        p.stroke(0, 0, 20);
        p.strokeWeight(3);
        p.noFill();
        p.beginShape();
        for (let i = 0; i < visiblePoints; i++) {
          const pt = spiral[i];
          p.vertex(pt.x, pt.y);
        }
        p.endShape();
      }

      // Add proportion label
      p.fill(0, 0, 30);
      p.noStroke();
      p.textAlign(p.LEFT, p.TOP);
      p.textSize(14);
      p.text(`φ ≈ 1.618 | Depth: ${visibleRects}/${depth}`, 20, 20);
    };
  };
}
```

### Example 3: Numerology-Driven φ Generator

```typescript
// numerology-phi-sketch.ts

import p5 from 'p5';
import { NumerologyEngine } from '@numerology/NumerologyEngine';
import { generatePhyllotaxis } from './phyllotaxis';
import { goldenLogarithmicSpiral } from './golden-rectangle';
import { goldenPalette, numerologyToColor, goldenTriad } from './phi-color';
import { PHI, phiSequence } from './golden-ratio';

interface NumerologyPhiConfig {
  name: string;
  birthdate?: string;
}

export function createNumerologyPhiSketch(config: NumerologyPhiConfig) {
  return (p: p5) => {
    let profile: ReturnType<NumerologyEngine['calculate']>;
    let phyllotaxisPoints: ReturnType<typeof generatePhyllotaxis> = [];
    let spiralPoints: ReturnType<typeof goldenLogarithmicSpiral> = [];
    let palette: ReturnType<typeof goldenPalette> = [];
    let radii: number[] = [];

    p.setup = () => {
      p.createCanvas(800, 800);
      p.colorMode(p.HSL, 360, 100, 100, 1);

      // Calculate numerology
      const engine = new NumerologyEngine({
        system: 'pythagorean',
        preserveMasterNumbers: true,
        calculateCompound: false,
      });
      profile = engine.calculate(config.name, config.birthdate);

      // Use numerology values to parameterize generation
      const seedCount = profile.destiny * 50;
      const divergence = 137.5 + (profile.soulUrge - 5) * 0.5;

      // Generate patterns
      phyllotaxisPoints = generatePhyllotaxis({
        count: seedCount,
        divergenceAngle: divergence,
        radiusScale: 6,
        centerX: p.width / 2,
        centerY: p.height / 2,
      });

      // Spiral rotations based on life path
      spiralPoints = goldenLogarithmicSpiral(
        p.width / 2,
        p.height / 2,
        5,
        profile.lifePath,
        100
      );

      // Color palette based on expression
      const baseColor = numerologyToColor(profile.expression);
      palette = goldenPalette(baseColor.h, 70, 50, 9);

      // Radii sequence from φ
      radii = phiSequence(100, profile.personality);
    };

    p.draw = () => {
      p.background(0, 0, 5);

      // Draw concentric φ circles
      p.noFill();
      p.strokeWeight(0.5);
      radii.forEach((r, i) => {
        const color = palette[i % palette.length];
        p.stroke(color.h, color.s * 0.5, color.l, 0.3);
        p.circle(p.width / 2, p.height / 2, r * 2);
      });

      // Draw phyllotaxis pattern
      const visibleCount = Math.min(
        phyllotaxisPoints.length,
        p.frameCount * 3
      );

      for (let i = 0; i < visibleCount; i++) {
        const pt = phyllotaxisPoints[i];
        const color = palette[i % palette.length];
        const age = (visibleCount - i) / visibleCount;

        // Size based on Fibonacci index
        const fibIndex = i % 8;
        const size = 2 + fibIndex * 0.5;

        p.fill(color.h, color.s, color.l, 0.3 + age * 0.5);
        p.noStroke();
        p.circle(pt.x, pt.y, size);
      }

      // Draw central golden spiral
      p.stroke(40, 60, 60, 0.6);
      p.strokeWeight(2);
      p.noFill();
      p.beginShape();
      const spiralVisible = Math.min(spiralPoints.length, p.frameCount * 5);
      for (let i = 0; i < spiralVisible; i++) {
        const pt = spiralPoints[i];
        p.vertex(pt.x, pt.y);
      }
      p.endShape();

      // Numerology info
      p.fill(0, 0, 80);
      p.noStroke();
      p.textSize(12);
      p.textAlign(p.LEFT, p.TOP);
      p.text(
        `Name: ${config.name}\n` +
        `Destiny: ${profile.destiny}\n` +
        `Life Path: ${profile.lifePath}\n` +
        `Expression: ${profile.expression}`,
        20,
        20
      );
    };
  };
}
```

---

## Part VI: φ-Operators for Mythology Integration

```typescript
// phi-operators.ts

import { PHI, PHI_INVERSE, fibonacci, nearestFibonacci } from './golden-ratio';

export type PhiOperator = 'φ+' | 'φ−' | 'φ≈' | 'φ//' | 'φ🌀' | 'φ⊕';

/**
 * Apply φ-operator to a value
 */
export function applyPhiOperator(value: unknown, operator: PhiOperator, secondary?: unknown): unknown {
  switch (operator) {
    case 'φ+': // Expand
      return expand(value);

    case 'φ−': // Contract
      return contract(value);

    case 'φ≈': // Align
      return align(value);

    case 'φ//': // Recalibrate
      return recalibrate(value);

    case 'φ🌀': // Recursive expansion
      return recurse(value);

    case 'φ⊕': // Blend
      return blend(value, secondary);

    default:
      return value;
  }
}

function expand(value: unknown): unknown {
  if (typeof value === 'number') {
    return value * PHI;
  }
  if (Array.isArray(value)) {
    // Interpolate to φ-times the length
    const newLength = Math.ceil(value.length * PHI);
    return interpolateArray(value, newLength);
  }
  return value;
}

function contract(value: unknown): unknown {
  if (typeof value === 'number') {
    return value * PHI_INVERSE;
  }
  if (Array.isArray(value)) {
    const newLength = Math.ceil(value.length * PHI_INVERSE);
    return sampleArray(value, newLength);
  }
  return value;
}

function align(value: unknown): unknown {
  if (typeof value === 'number') {
    const nearest = nearestFibonacci(value);
    if (nearest.diff / value < 0.1) {
      return nearest.value;
    }
    return value;
  }
  return value;
}

function recalibrate(value: unknown): unknown {
  if (typeof value === 'number') {
    const { value: fibValue } = nearestFibonacci(value);
    return fibValue;
  }
  if (Array.isArray(value)) {
    return value.map(v => recalibrate(v));
  }
  return value;
}

function recurse(value: unknown, depth: number = 3): unknown {
  if (Array.isArray(value) && depth > 0) {
    const expanded = expand(value) as unknown[];
    return [...value, ...recurse(expanded.slice(value.length), depth - 1) as unknown[]];
  }
  return value;
}

function blend(value: unknown, secondary: unknown): unknown {
  if (typeof value === 'number' && typeof secondary === 'number') {
    // φ-weighted blend
    return value * PHI_INVERSE + secondary * (1 - PHI_INVERSE);
  }
  if (Array.isArray(value) && Array.isArray(secondary)) {
    const maxLength = Math.max(value.length, secondary.length);
    return Array(maxLength).fill(0).map((_, i) => {
      const a = value[i % value.length];
      const b = secondary[i % secondary.length];
      return blend(a, b);
    });
  }
  return value;
}

// Helper functions
function interpolateArray<T>(arr: T[], newLength: number): T[] {
  if (arr.length === 0) return [];
  const result: T[] = [];

  for (let i = 0; i < newLength; i++) {
    const t = i / (newLength - 1);
    const index = t * (arr.length - 1);
    const lower = Math.floor(index);
    const upper = Math.min(lower + 1, arr.length - 1);

    // For numeric arrays, interpolate; otherwise, pick nearest
    if (typeof arr[lower] === 'number') {
      const frac = index - lower;
      result.push(
        ((arr[lower] as number) * (1 - frac) + (arr[upper] as number) * frac) as T
      );
    } else {
      result.push(arr[Math.round(index)]);
    }
  }

  return result;
}

function sampleArray<T>(arr: T[], newLength: number): T[] {
  if (arr.length === 0 || newLength === 0) return [];
  const result: T[] = [];

  for (let i = 0; i < newLength; i++) {
    const index = Math.round(i * (arr.length - 1) / (newLength - 1));
    result.push(arr[index]);
  }

  return result;
}
```

---

## Conclusion

This Golden Ratio Generative System provides:

1. **Mathematical Foundation** — Core φ calculations and utilities
2. **Pattern Generation** — Phyllotaxis spirals, golden rectangles
3. **Color Harmony** — φ-based palette generation
4. **Visual Integration** — Complete p5.js sketches
5. **Mythology Connection** — φ-operator implementations

All code is production-ready and integrates with the Identity Playground and 4444jPP personal mythology systems.

---

*This document is part of the Personal Mythology Extension Project, Phase 3.*
