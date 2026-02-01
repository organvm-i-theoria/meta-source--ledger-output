/**
 * Phi Operators - Transform values using the golden ratio
 * φ (phi) ≈ 1.6180339887...
 */

import type { PhiOperator } from '@meta-source/core';

/** The golden ratio */
export const PHI = 1.6180339887498948482;

/** Inverse of phi (1/φ ≈ 0.618) */
export const PHI_INVERSE = 1 / PHI;

/** Tolerance for alignment operations */
const ALIGNMENT_TOLERANCE = 0.01;

export interface PhiOperatorInfo {
  id: PhiOperator;
  symbol: string;
  name: string;
  description: string;
}

export const PHI_OPERATOR_INFO: PhiOperatorInfo[] = [
  { id: 'phi_plus', symbol: 'φ+', name: 'Expand', description: 'Multiply by φ (grow by golden ratio)' },
  { id: 'phi_minus', symbol: 'φ-', name: 'Contract', description: 'Divide by φ (shrink by golden ratio)' },
  { id: 'phi_approx', symbol: 'φ≈', name: 'Align', description: 'Snap to nearest φ-multiple' },
  { id: 'phi_recal', symbol: 'φ//', name: 'Recalibrate', description: 'Reset to φ-based origin' },
  { id: 'phi_recurse', symbol: 'φ🌀', name: 'Recurse', description: 'Apply recursively to generate sequence' },
  { id: 'phi_blend', symbol: 'φ⊕', name: 'Blend', description: 'Combine two values at φ-weighted ratio' },
  { id: 'phi_invert', symbol: 'φ¬', name: 'Invert', description: 'Transform through φ-based reflection' },
  { id: 'phi_project', symbol: 'φ→', name: 'Project', description: 'Extend value toward future φ-state' },
  { id: 'phi_retro', symbol: 'φ←', name: 'Retrospect', description: 'Trace value back to φ-origin' },
  { id: 'phi_parallel', symbol: 'φ∥', name: 'Parallel', description: 'Generate parallel φ-scaled value' },
  { id: 'phi_focus', symbol: 'φ⊙', name: 'Focus', description: 'Concentrate toward φ-center' },
  { id: 'phi_cycle', symbol: 'φ⟳', name: 'Cycle', description: 'Rotate through φ-based phases' },
  { id: 'phi_liminal', symbol: 'φ◇', name: 'Liminal', description: 'Enter transitional φ-space' },
];

/**
 * φ+ Expand - Multiply by golden ratio
 */
export function phiExpand(value: number): number {
  return value * PHI;
}

/**
 * φ- Contract - Divide by golden ratio
 */
export function phiContract(value: number): number {
  return value / PHI;
}

/**
 * φ≈ Align - Snap to nearest φ-multiple if within tolerance
 */
export function phiAlign(value: number, tolerance = ALIGNMENT_TOLERANCE): number {
  // Find nearest φ-multiple
  const base = Math.log(value) / Math.log(PHI);
  const rounded = Math.round(base);
  const nearest = Math.pow(PHI, rounded);

  // Check if within tolerance
  const diff = Math.abs(value - nearest) / value;
  if (diff <= tolerance) {
    return nearest;
  }
  return value;
}

/**
 * φ// Recalibrate - Reset to φ-based origin (reduce to base φ power)
 */
export function phiRecalibrate(value: number): number {
  if (value <= 0) return 1;
  const power = Math.floor(Math.log(value) / Math.log(PHI));
  return Math.pow(PHI, power);
}

/**
 * φ🌀 Recurse - Generate Fibonacci-like sequence from value
 */
export function phiRecurse(value: number, steps = 5): number[] {
  const sequence = [value, value * PHI_INVERSE];
  for (let i = 2; i < steps + 2; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }
  return sequence.slice(2);
}

/**
 * φ⊕ Blend - Combine two values at φ-weighted ratio (a × (1-1/φ) + b × (1/φ))
 */
export function phiBlend(a: number, b: number): number {
  return a * (1 - PHI_INVERSE) + b * PHI_INVERSE;
}

/**
 * φ¬ Invert - Reflect through φ-based transformation
 */
export function phiInvert(value: number, center = 1): number {
  // Reflect around center using φ ratio
  const distance = value - center;
  return center - distance * PHI_INVERSE;
}

/**
 * φ→ Project - Extend value toward future φ-state (exponential growth)
 */
export function phiProject(value: number, steps = 1): number {
  return value * Math.pow(PHI, steps);
}

/**
 * φ← Retrospect - Trace value back to φ-origin (exponential decay)
 */
export function phiRetrospect(value: number, steps = 1): number {
  return value * Math.pow(PHI_INVERSE, steps);
}

/**
 * φ∥ Parallel - Generate parallel φ-scaled value (complementary)
 */
export function phiParallel(value: number): number {
  // Return the "shadow" value at φ-inverse scale
  return value * PHI_INVERSE * PHI_INVERSE; // φ^-2
}

/**
 * φ⊙ Focus - Concentrate toward φ-center (reduces deviation from φ)
 */
export function phiFocus(value: number): number {
  // Move value closer to nearest φ power
  const power = Math.log(value) / Math.log(PHI);
  const nearestPower = Math.round(power);
  const targetPower = power + (nearestPower - power) * PHI_INVERSE;
  return Math.pow(PHI, targetPower);
}

/**
 * φ⟳ Cycle - Rotate through φ-based phases (modular)
 */
export function phiCycle(value: number, phase: number, totalPhases = 4): number {
  // Apply phase-based φ transformation
  const phaseAngle = (phase / totalPhases) * 2 * Math.PI;
  const scale = 1 + (PHI - 1) * Math.sin(phaseAngle);
  return value * scale;
}

/**
 * φ◇ Liminal - Enter transitional φ-space (probabilistic blur)
 */
export function phiLiminal(value: number, uncertainty = 0.1): { min: number; center: number; max: number } {
  const spread = value * uncertainty * PHI;
  return {
    min: value - spread,
    center: value,
    max: value + spread,
  };
}

/**
 * Apply a phi operator to a value
 */
export function applyPhiOperator(
  operator: PhiOperator,
  value: number,
  params?: { secondValue?: number; steps?: number; phase?: number }
): number | number[] | { min: number; center: number; max: number } {
  switch (operator) {
    case 'phi_plus':
      return phiExpand(value);
    case 'phi_minus':
      return phiContract(value);
    case 'phi_approx':
      return phiAlign(value);
    case 'phi_recal':
      return phiRecalibrate(value);
    case 'phi_recurse':
      return phiRecurse(value, params?.steps);
    case 'phi_blend':
      return phiBlend(value, params?.secondValue ?? value);
    case 'phi_invert':
      return phiInvert(value);
    case 'phi_project':
      return phiProject(value, params?.steps);
    case 'phi_retro':
      return phiRetrospect(value, params?.steps);
    case 'phi_parallel':
      return phiParallel(value);
    case 'phi_focus':
      return phiFocus(value);
    case 'phi_cycle':
      return phiCycle(value, params?.phase ?? 0);
    case 'phi_liminal':
      return phiLiminal(value);
    default:
      return value;
  }
}
