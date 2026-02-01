/**
 * Math Utilities - Golden ratio and numerology functions
 */

import { PHI, PHI_INVERSE } from '@meta-source/core';

/** Re-export constants for convenience */
export { PHI, PHI_INVERSE };

/** Golden angle in degrees (360 / phi^2 ≈ 137.5°) */
export const GOLDEN_ANGLE_DEG = 360 / (PHI * PHI);

/**
 * Map a value from one range to another
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Calculate digit sum of a number
 */
export function digitSum(n: number): number {
  return String(Math.abs(Math.floor(n)))
    .split('')
    .reduce((sum, d) => sum + parseInt(d, 10), 0);
}

/**
 * Reduce number to single digit (Pythagorean numerology)
 * Preserves master numbers 11, 22, 33
 */
export function reduceToDigit(num: number, preserveMasterNumbers = true): number {
  const masterNumbers = [11, 22, 33];
  
  while (num > 9) {
    if (preserveMasterNumbers && masterNumbers.includes(num)) {
      return num;
    }
    num = digitSum(num);
  }
  return num;
}

/**
 * Calculate letter value (A=1, B=2, ..., Z=26)
 */
export function letterValue(char: string): number {
  const code = char.toUpperCase().charCodeAt(0);
  if (code >= 65 && code <= 90) {
    return code - 64;
  }
  return 0;
}

/**
 * Calculate Pythagorean letter value (A=1, B=2, ..., I=9, J=1, ...)
 */
export function pythagoreanValue(char: string): number {
  const value = letterValue(char);
  return value > 0 ? ((value - 1) % 9) + 1 : 0;
}

/**
 * Calculate numerology value from a string
 */
export function calculateNumerology(str: string): number {
  const sum = str
    .toUpperCase()
    .split('')
    .reduce((acc, char) => {
      const code = char.charCodeAt(0);
      // Letters A-Z map to 1-26 then reduce mod 9
      if (code >= 65 && code <= 90) {
        return acc + pythagoreanValue(char);
      }
      // Numbers 0-9 use their value
      if (code >= 48 && code <= 57) {
        return acc + (code - 48);
      }
      return acc;
    }, 0);
  return reduceToDigit(sum);
}

/**
 * Calculate Life Path number from birth date
 */
export function calculateLifePath(birthDate: Date | string): number {
  const date = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  
  const monthReduced = reduceToDigit(month, false);
  const dayReduced = reduceToDigit(day, false);
  const yearReduced = reduceToDigit(year, false);
  
  return reduceToDigit(monthReduced + dayReduced + yearReduced);
}

/**
 * Generate Fibonacci-like sequence from starting values
 */
export function fibonacciSequence(a: number, b: number, length: number): number[] {
  const sequence = [a, b];
  for (let i = 2; i < length; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }
  return sequence;
}

/**
 * Check if a number is close to a power of phi
 */
export function isPhiAligned(value: number, tolerance = 0.01): boolean {
  if (value <= 0) return false;
  const power = Math.log(value) / Math.log(PHI);
  const nearest = Math.round(power);
  const phiPower = Math.pow(PHI, nearest);
  return Math.abs(value - phiPower) / phiPower <= tolerance;
}

/**
 * Find the nearest power of phi
 */
export function nearestPhiPower(value: number): { power: number; value: number } {
  if (value <= 0) return { power: 0, value: 1 };
  const power = Math.round(Math.log(value) / Math.log(PHI));
  return { power, value: Math.pow(PHI, power) };
}
