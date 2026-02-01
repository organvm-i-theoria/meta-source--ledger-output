/**
 * Re-export math utilities from @meta-source/utils
 * and add app-specific utilities
 */

export { PHI, GOLDEN_ANGLE_DEG as GOLDEN_ANGLE, mapRange } from '@meta-source/utils';

// App-specific constants
export const PI = Math.PI;
export const TWO_PI = Math.PI * 2;

// App-specific utilities
export const degToRad = (deg: number): number => deg * (Math.PI / 180);
export const radToDeg = (rad: number): number => rad * (180 / Math.PI);
