import { PHI } from '../utils/math';

export const GoldenRatio = {
    PHI,
    conjugate: 1 / PHI, // 0.618...
    square: PHI * PHI,  // 2.618...
    
    // Get the nth golden section of a length
    section(length: number, n: number = 1): number {
        return length / Math.pow(PHI, n);
    }
};
