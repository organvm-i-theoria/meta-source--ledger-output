export const PHI = 1.618033988749895;
export const GOLDEN_ANGLE = 137.5077640500378546;
export const PI = Math.PI;
export const TWO_PI = Math.PI * 2;

export const degToRad = (deg: number): number => deg * (Math.PI / 180);
export const radToDeg = (rad: number): number => rad * (180 / Math.PI);

export const mapRange = (value: number, inMin: number, inMax: number, outMin: number, outMax: number): number => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};
