import { PythagoreanCalculator } from './PythagoreanCalculator';
import { NumerologySystem, NumerologyProfile } from '../core/types';

export const NumerologyEngine = {
    calculate(name: string, birthdate: string, system: NumerologySystem = 'pythagorean'): NumerologyProfile {
        // Switch on system when others are implemented
        switch(system) {
            case 'pythagorean':
            default:
                return PythagoreanCalculator.calculate(name, birthdate);
        }
    }
};
