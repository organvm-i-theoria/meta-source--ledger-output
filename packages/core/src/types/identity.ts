/**
 * Identity Types - Phase 1 numerology and personal identity
 */

/** Numerology calculation system */
export type NumerologySystem = 'pythagorean' | 'chaldean' | 'gematria';

/** Personal identity data input */
export interface PersonalIdentity {
  id?: string;
  /** Short name (alias for fullName) */
  name?: string;
  /** Full name - required if name not provided */
  fullName?: string;
  /** Birth date (Date or ISO string) - alias for birthdate */
  birthDate?: Date | string;
  /** Birth date as string (alias for birthDate) */
  birthdate?: string;
  birthTime?: string;
  birthPlace?: string;
  meaningfulWords?: string[];
  createdAt?: number;
}

/** Numerology profile derived from identity */
export interface NumerologyProfile {
  system?: NumerologySystem;
  lifePath: number | null;
  expression: number;
  soulUrge: number;
  personality: number;
  birthday?: number;
  /** Destiny number (often same as expression) */
  destiny?: number;
  maturity?: number;
  pinnacles?: number[];
  challenges?: number[];
  rawSum?: number;
  isMasterNumber?: boolean;
}

/** Encoded identity seed for cross-app communication */
export interface IdentitySeed {
  version?: string;
  hash?: string;
  name?: string;
  birthdate?: string;
  numerology: Partial<NumerologyProfile>;
  seed?: string;
  timestamp?: number;
}

/** Cipher configuration derived from identity seed */
export interface CipherDerivedConfig {
  caesar: { shift: number };
  vigenere: { keyword: string };
  enigma: { positions: [number, number, number] };
}

/** Identity generation config */
export interface IdentityConfig {
  seed: string;
  numerology: NumerologyProfile;
  colorPalette?: string[];
  harmonics?: number[];
}

// Portable base64 for Node and browser (ASCII-safe for JSON)
const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function toBase64(str: string): string {
  let result = '';
  let i = 0;
  while (i < str.length) {
    const b1 = str.charCodeAt(i++) & 0xff;
    const b2 = i < str.length ? str.charCodeAt(i++) & 0xff : 0;
    const b3 = i < str.length ? str.charCodeAt(i++) & 0xff : 0;
    const padding = str.length - (i - 3);
    result += base64Chars[(b1 >> 2) & 0x3f];
    result += base64Chars[((b1 << 4) | (b2 >> 4)) & 0x3f];
    result += padding < 2 ? '=' : base64Chars[((b2 << 2) | (b3 >> 6)) & 0x3f];
    result += padding < 1 ? '=' : base64Chars[b3 & 0x3f];
  }
  return result;
}

function fromBase64(str: string): string {
  const lookup: Record<string, number> = {};
  for (let i = 0; i < base64Chars.length; i++) {
    lookup[base64Chars[i]] = i;
  }
  const padded = str.replace(/=+$/, '');
  let result = '';
  for (let i = 0; i < padded.length; i += 4) {
    const b1 = lookup[padded[i]] ?? 0;
    const b2 = lookup[padded[i + 1]] ?? 0;
    const b3 = lookup[padded[i + 2]] ?? 0;
    const b4 = lookup[padded[i + 3]] ?? 0;
    result += String.fromCharCode((b1 << 2) | (b2 >> 4));
    if (padded[i + 2] !== undefined) result += String.fromCharCode(((b2 << 4) | (b3 >> 2)) & 0xff);
    if (padded[i + 3] !== undefined) result += String.fromCharCode(((b3 << 6) | b4) & 0xff);
  }
  return result;
}

/**
 * Encode an IdentitySeed to a URL-safe base64 string
 */
export function encodeSeed(seed: IdentitySeed): string {
  const json = JSON.stringify(seed);
  // Use URL-safe base64 encoding
  const base64 = toBase64(json);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Decode a URL-safe base64 string to an IdentitySeed
 */
export function decodeSeed(encoded: string): IdentitySeed | null {
  try {
    // Restore standard base64
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    // Add padding if needed
    while (base64.length % 4) {
      base64 += '=';
    }
    const json = fromBase64(base64);
    return JSON.parse(json) as IdentitySeed;
  } catch {
    return null;
  }
}

/**
 * Derive cipher configuration from an identity seed
 * Maps numerology values to cipher parameters
 */
export function deriveCipherConfig(seed: IdentitySeed): CipherDerivedConfig {
  const { numerology } = seed;

  // Caesar shift from life path or destiny (1-25)
  const lifePath = numerology.lifePath ?? 5;
  const destiny = numerology.destiny ?? numerology.expression ?? 1;
  const shift = Math.max(1, Math.min(25, lifePath + destiny));

  // Vigenère keyword from soul urge and personality
  const soulUrge = numerology.soulUrge ?? 5;
  const personality = numerology.personality ?? 5;
  const keywordBase = [soulUrge, personality, lifePath, destiny]
    .map(n => String.fromCharCode(65 + (n % 26)))
    .join('');

  // Enigma positions from various numbers
  const positions: [number, number, number] = [
    (lifePath ?? 0) % 26,
    (soulUrge ?? 0) % 26,
    (personality ?? 0) % 26,
  ];

  return {
    caesar: { shift },
    vigenere: { keyword: keywordBase },
    enigma: { positions },
  };
}
