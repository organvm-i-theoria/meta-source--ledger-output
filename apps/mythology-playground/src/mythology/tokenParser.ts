/**
 * Token Parser - Decomposes identity tokens into BLOCK-HINGE-POSTS structure
 */

import type { MythologyToken, NumerologicalStack } from '@meta-source/core';

/**
 * Hash a string to a deterministic hex value
 */
function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
}

/**
 * Reduce a number to single digit (Pythagorean numerology)
 */
function reduceToDigit(num: number): number {
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = String(num)
      .split('')
      .reduce((sum, d) => sum + parseInt(d, 10), 0);
  }
  return num;
}

/**
 * Calculate numerological value from a string
 */
function calculateNumerology(str: string): number {
  const sum = str
    .toUpperCase()
    .split('')
    .reduce((acc, char) => {
      const code = char.charCodeAt(0);
      // Letters A-Z map to 1-26
      if (code >= 65 && code <= 90) {
        return acc + ((code - 64) % 9 || 9); // Pythagorean: A=1, B=2, ..., I=9, J=1, etc.
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
 * Parse a token string into BLOCK-HINGE-POSTS structure
 * Default pattern: numeric prefix (BLOCK), single connector (HINGE), suffix (POSTS)
 * Example: "4444jPP" → BLOCK="4444", HINGE="j", POSTS="PP"
 */
export function parseToken(raw: string): MythologyToken {
  // Remove whitespace
  const cleaned = raw.trim();

  if (cleaned.length < 3) {
    throw new Error('Token must be at least 3 characters');
  }

  // Try to detect BLOCK-HINGE-POSTS pattern
  // Pattern 1: Numbers followed by lowercase followed by uppercase (4444jPP)
  const pattern1 = /^(\d+)([a-z])([A-Z]+)$/;
  // Pattern 2: Alphanumeric BLOCK, single connector, POSTS
  const pattern2 = /^(.+?)([^A-Za-z0-9])(.+)$/;
  // Pattern 3: First half is BLOCK, middle char is HINGE, rest is POSTS

  let block: string;
  let hinge: string;
  let posts: string;

  const match1 = cleaned.match(pattern1);
  if (match1) {
    [, block, hinge, posts] = match1;
  } else {
    const match2 = cleaned.match(pattern2);
    if (match2) {
      [, block, hinge, posts] = match2;
    } else {
      // Fallback: split into thirds
      const third = Math.floor(cleaned.length / 3);
      block = cleaned.slice(0, third || 1);
      hinge = cleaned.slice(third || 1, (third || 1) + 1);
      posts = cleaned.slice((third || 1) + 1);
    }
  }

  return {
    raw: cleaned,
    block,
    hinge,
    posts,
    hash: hashString(cleaned),
  };
}

/**
 * Calculate the numerological stack from a parsed token
 * Core (from BLOCK), Engine (from HINGE), Interface (from POSTS)
 */
export function calculateStack(token: MythologyToken): NumerologicalStack { // allow-secret
  const core = calculateNumerology(token.block);
  const engine = calculateNumerology(token.hinge);
  const iface = calculateNumerology(token.posts);

  return {
    core,
    engine,
    interface: iface,
    signature: `${core}-${engine}-${iface}`,
  };
}

/**
 * Get description for a numerological value
 */
export function getNumerologyMeaning(num: number): string {
  const meanings: Record<number, string> = {
    1: 'Leadership, independence, new beginnings',
    2: 'Partnership, balance, diplomacy',
    3: 'Creativity, expression, communication',
    4: 'Structure, stability, foundation',
    5: 'Change, freedom, adventure',
    6: 'Harmony, responsibility, nurturing',
    7: 'Analysis, wisdom, introspection',
    8: 'Power, abundance, achievement',
    9: 'Completion, humanitarianism, wisdom',
    11: 'Master number: intuition, inspiration',
    22: 'Master number: master builder',
    33: 'Master number: master teacher',
  };
  return meanings[num] || 'Unknown';
}

/**
 * Generate a master seed from token and stack
 */
export function generateMasterSeed(token: MythologyToken, stack: NumerologicalStack): string { // allow-secret
  const combined = `${token.hash}-${stack.signature}-${token.raw.length}`;
  return hashString(combined);
}
