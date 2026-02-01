/**
 * Chaldean Numerology Calculator
 *
 * The Chaldean system differs from Pythagorean:
 * - Numbers range from 1-8 (no 9, as 9 was sacred)
 * - Letter values are based on sound vibrations, not alphabet order
 * - Generally considered more accurate by practitioners
 */

// Chaldean letter-to-number mapping (sound-based, not sequential)
const LETTER_MAP: Record<string, number> = {
  a: 1, i: 1, j: 1, q: 1, y: 1,
  b: 2, k: 2, r: 2,
  c: 3, g: 3, l: 3, s: 3,
  d: 4, m: 4, t: 4,
  e: 5, h: 5, n: 5, x: 5,
  u: 6, v: 6, w: 6,
  o: 7, z: 7,
  f: 8, p: 8
};

const VOWELS = ['a', 'e', 'i', 'o', 'u'];

/**
 * Reduce a number to single digit, preserving master numbers
 */
const reduceNumber = (num: number): { reduced: number; isMaster: boolean } => {
  let current = num;

  // Check master numbers first
  if (current === 11 || current === 22 || current === 33) {
    return { reduced: current, isMaster: true };
  }

  while (current > 9 && current !== 11 && current !== 22 && current !== 33) {
    current = String(current)
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit), 0);
  }

  return {
    reduced: current,
    isMaster: current === 11 || current === 22 || current === 33
  };
};

const cleanString = (str: string) => str.toLowerCase().replace(/[^a-z]/g, '');

export const ChaldeanCalculator = {
  calculate(name: string, birthdate: string) {
    const cleanName = cleanString(name);

    // Destiny/Expression: Sum of all letters
    let rawDestiny = 0;
    let rawSoul = 0; // Vowels (Heart's Desire)
    let rawPersonality = 0; // Consonants

    for (const char of cleanName) {
      const val = LETTER_MAP[char] || 0;
      rawDestiny += val;

      if (VOWELS.includes(char)) {
        rawSoul += val;
      } else {
        rawPersonality += val;
      }
    }

    // Life Path: Sum of birthdate digits (same calculation as Pythagorean)
    const dateStr = birthdate.replace(/-/g, '');
    let rawLifePath = 0;
    for (const char of dateStr) {
      rawLifePath += parseInt(char) || 0;
    }

    const destiny = reduceNumber(rawDestiny);
    const lifePath = reduceNumber(rawLifePath);
    const soulUrge = reduceNumber(rawSoul);
    const personality = reduceNumber(rawPersonality);

    return {
      system: 'chaldean' as const,
      destiny: destiny.reduced,
      lifePath: birthdate ? lifePath.reduced : null,
      soulUrge: soulUrge.reduced,
      personality: personality.reduced,
      expression: destiny.reduced,
      rawSum: rawDestiny,
      isMasterNumber: destiny.isMaster || lifePath.isMaster
    };
  }
};
