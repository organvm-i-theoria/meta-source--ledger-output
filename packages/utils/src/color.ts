/**
 * Color Utilities - Palette generation and color math
 */

import { PHI } from '@meta-source/core';

/** RGB color tuple */
export type RGB = [number, number, number];

/** HSL color tuple */
export type HSL = [number, number, number];

/**
 * Convert HSL to RGB
 * @param h Hue (0-360)
 * @param s Saturation (0-100)
 * @param l Lightness (0-100)
 */
export function hslToRgb(h: number, s: number, l: number): RGB {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return [
    Math.round(f(0) * 255),
    Math.round(f(8) * 255),
    Math.round(f(4) * 255),
  ];
}

/**
 * Convert RGB to HSL
 */
export function rgbToHsl(r: number, g: number, b: number): HSL {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) {
    return [0, 0, Math.round(l * 100)];
  }

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;

  switch (max) {
    case r:
      h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      break;
    case g:
      h = ((b - r) / d + 2) / 6;
      break;
    case b:
      h = ((r - g) / d + 4) / 6;
      break;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

/**
 * Convert RGB to hex string
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}

/**
 * Parse hex color to RGB
 */
export function hexToRgb(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) throw new Error(`Invalid hex color: ${hex}`);
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ];
}

/**
 * Generate a phi-based color palette
 * Uses the golden angle (137.5°) for harmonious hue distribution
 */
export function generatePhiPalette(
  baseHue: number,
  count: number,
  saturation = 70,
  lightness = 50
): string[] {
  const goldenAngle = 360 / (PHI * PHI); // ~137.5°
  return Array.from({ length: count }, (_, i) => {
    const hue = (baseHue + i * goldenAngle) % 360;
    const [r, g, b] = hslToRgb(hue, saturation, lightness);
    return rgbToHex(r, g, b);
  });
}

/**
 * Generate complementary colors using phi ratio
 */
export function phiComplement(hue: number): number {
  return (hue + 360 / PHI) % 360;
}

/**
 * Blend two colors at phi ratio
 */
export function blendColors(color1: RGB, color2: RGB): RGB {
  const ratio = 1 / PHI;
  return [
    Math.round(color1[0] * (1 - ratio) + color2[0] * ratio),
    Math.round(color1[1] * (1 - ratio) + color2[1] * ratio),
    Math.round(color1[2] * (1 - ratio) + color2[2] * ratio),
  ];
}

/**
 * Generate a color from a seed string
 */
export function seedToColor(seed: string, saturation = 70, lightness = 50): string {
  // Simple hash to hue
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash;
  }
  const hue = Math.abs(hash) % 360;
  const [r, g, b] = hslToRgb(hue, saturation, lightness);
  return rgbToHex(r, g, b);
}
