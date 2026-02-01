import { PythagoreanCalculator } from './PythagoreanCalculator';
import { ChaldeanCalculator } from './ChaldeanCalculator';
import { GematriaCalculator } from './GematriaCalculator';
import { NumerologySystem, NumerologyProfile } from '../core/types';

export const NumerologyEngine = {
  /**
   * Calculate numerology profile using the specified system
   */
  calculate(name: string, birthdate: string, system: NumerologySystem = 'pythagorean'): NumerologyProfile {
    switch (system) {
      case 'chaldean':
        return ChaldeanCalculator.calculate(name, birthdate);
      case 'gematria':
        return GematriaCalculator.calculate(name, birthdate);
      case 'pythagorean':
      default:
        return PythagoreanCalculator.calculate(name, birthdate);
    }
  },

  /**
   * Calculate profiles for all systems (useful for comparison)
   */
  calculateAll(name: string, birthdate: string): Record<NumerologySystem, NumerologyProfile> {
    return {
      pythagorean: PythagoreanCalculator.calculate(name, birthdate),
      chaldean: ChaldeanCalculator.calculate(name, birthdate),
      gematria: GematriaCalculator.calculate(name, birthdate)
    };
  },

  /**
   * Get system description for UI display
   */
  getSystemDescription(system: NumerologySystem): string {
    switch (system) {
      case 'pythagorean':
        return 'Western numerology based on alphabet position (A=1...I=9 cycling)';
      case 'chaldean':
        return 'Ancient Babylonian system based on sound vibrations (1-8 only, no 9)';
      case 'gematria':
        return 'Hebrew-derived system with larger base values (A=1...Z=26)';
      default:
        return '';
    }
  }
};
