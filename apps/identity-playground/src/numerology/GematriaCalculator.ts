/**
 * Gematria Calculator (English/Simple Gematria)
 *
 * Traditional Hebrew Gematria assigns values based on letter position:
 * - Aleph to Tet (1-9)
 * - Yod to Tzade (10-90)
 * - Koph to Tav (100-400)
 *
 * For English, we use Simple English Gematria:
 * - A=1, B=2, C=3... Z=26 (direct position)
 *
 * This produces larger numbers that are then reduced.
 */

// Simple English Gematria: A=1 through Z=26
const LETTER_MAP: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
  j: 10, k: 11, l: 12, m: 13, n: 14, o: 15, p: 16, q: 17, r: 18,
  s: 19, t: 20, u: 21, v: 22, w: 23, x: 24, y: 25, z: 26
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

export const GematriaCalculator = {
  /**
   * Get the raw gematria value before reduction
   * Useful for comparing names with same reduced value
   */
  getRawValue(name: string): number {
    const cleanName = cleanString(name);
    let total = 0;
    for (const char of cleanName) {
      total += LETTER_MAP[char] || 0;
    }
    return total;
  },

  calculate(name: string, birthdate: string) {
    const cleanName = cleanString(name);

    // Destiny/Expression: Sum of all letters
    let rawDestiny = 0;
    let rawSoul = 0; // Vowels
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

    // Life Path: Sum of birthdate digits
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
      system: 'gematria' as const,
      destiny: destiny.reduced,
      lifePath: birthdate ? lifePath.reduced : null,
      soulUrge: soulUrge.reduced,
      personality: personality.reduced,
      expression: destiny.reduced,
      rawSum: rawDestiny, // Raw gematria value is often significant
      isMasterNumber: destiny.isMaster || lifePath.isMaster
    };
  }
};
