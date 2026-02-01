/**
 * Frequency Analysis Module
 * Provides statistical tools for cryptanalysis
 */

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * Expected letter frequencies in English text (percentages)
 * Source: Standard English frequency tables
 */
export const ENGLISH_FREQUENCIES: Record<string, number> = {
  A: 8.2,
  B: 1.5,
  C: 2.8,
  D: 4.3,
  E: 12.7,
  F: 2.2,
  G: 2.0,
  H: 6.1,
  I: 7.0,
  J: 0.15,
  K: 0.77,
  L: 4.0,
  M: 2.4,
  N: 6.7,
  O: 7.5,
  P: 1.9,
  Q: 0.095,
  R: 6.0,
  S: 6.3,
  T: 9.1,
  U: 2.8,
  V: 0.98,
  W: 2.4,
  X: 0.15,
  Y: 2.0,
  Z: 0.074,
};

export interface FrequencyData {
  letter: string;
  count: number;
  percentage: number;
  expectedPercentage: number;
  deviation: number;
}

export interface FrequencyAnalysis {
  frequencies: FrequencyData[];
  totalLetters: number;
  indexOfCoincidence: number;
  chiSquared: number;
  mostFrequent: string[];
  leastFrequent: string[];
}

/**
 * Count letter frequencies in text
 */
export function countFrequencies(text: string): Map<string, number> {
  const counts = new Map<string, number>();

  // Initialize all letters to 0
  for (const letter of ALPHABET) {
    counts.set(letter, 0);
  }

  // Count occurrences
  const normalized = text.toUpperCase();
  for (const char of normalized) {
    if (ALPHABET.includes(char)) {
      counts.set(char, (counts.get(char) || 0) + 1);
    }
  }

  return counts;
}

/**
 * Calculate Index of Coincidence
 * For English text, IC ≈ 0.067
 * For random text, IC ≈ 0.038
 * Helps identify mono vs polyalphabetic ciphers
 */
export function calculateIC(text: string): number {
  const counts = countFrequencies(text);
  const n = Array.from(counts.values()).reduce((a, b) => a + b, 0);

  if (n <= 1) return 0;

  let sum = 0;
  for (const count of counts.values()) {
    sum += count * (count - 1);
  }

  return sum / (n * (n - 1));
}

/**
 * Calculate Chi-squared statistic against English frequencies
 * Lower values indicate closer match to English
 */
export function calculateChiSquared(text: string): number {
  const counts = countFrequencies(text);
  const total = Array.from(counts.values()).reduce((a, b) => a + b, 0);

  if (total === 0) return 0;

  let chiSquared = 0;
  for (const [letter, count] of counts) {
    const expected = (ENGLISH_FREQUENCIES[letter] / 100) * total;
    if (expected > 0) {
      chiSquared += Math.pow(count - expected, 2) / expected;
    }
  }

  return chiSquared;
}

/**
 * Perform complete frequency analysis
 */
export function analyzeFrequency(text: string): FrequencyAnalysis {
  const counts = countFrequencies(text);
  const totalLetters = Array.from(counts.values()).reduce((a, b) => a + b, 0);

  const frequencies: FrequencyData[] = [];

  for (const letter of ALPHABET) {
    const count = counts.get(letter) || 0;
    const percentage = totalLetters > 0 ? (count / totalLetters) * 100 : 0;
    const expectedPercentage = ENGLISH_FREQUENCIES[letter];
    const deviation = percentage - expectedPercentage;

    frequencies.push({
      letter,
      count,
      percentage,
      expectedPercentage,
      deviation,
    });
  }

  // Sort by count for most/least frequent
  const sorted = [...frequencies].sort((a, b) => b.count - a.count);
  const mostFrequent = sorted.slice(0, 5).filter(f => f.count > 0).map(f => f.letter);
  const leastFrequent = sorted.slice(-5).filter(f => f.count === 0 || sorted.indexOf(f) >= sorted.length - 5).map(f => f.letter).reverse();

  return {
    frequencies,
    totalLetters,
    indexOfCoincidence: calculateIC(text),
    chiSquared: calculateChiSquared(text),
    mostFrequent,
    leastFrequent,
  };
}

/**
 * Estimate cipher type based on IC
 */
export function estimateCipherType(ic: number): string {
  if (ic >= 0.060) return 'Monoalphabetic (or plaintext)';
  if (ic >= 0.045) return 'Polyalphabetic (short key)';
  if (ic >= 0.038) return 'Polyalphabetic (long key)';
  return 'Random or very long key';
}

/**
 * Suggest possible Caesar shift based on frequency matching
 */
export function suggestCaesarShift(ciphertext: string): { shift: number; confidence: number }[] {
  const suggestions: { shift: number; confidence: number }[] = [];

  for (let shift = 0; shift < 26; shift++) {
    // Decrypt with this shift
    let decrypted = '';
    for (const char of ciphertext.toUpperCase()) {
      if (ALPHABET.includes(char)) {
        const idx = ALPHABET.indexOf(char);
        const newIdx = (idx - shift + 26) % 26;
        decrypted += ALPHABET[newIdx];
      }
    }

    // Calculate chi-squared for this shift
    const chiSq = calculateChiSquared(decrypted);

    // Lower chi-squared = better match to English
    // Convert to confidence score (inverse relationship)
    const confidence = Math.max(0, 100 - chiSq);

    suggestions.push({ shift, confidence });
  }

  // Sort by confidence (highest first)
  return suggestions.sort((a, b) => b.confidence - a.confidence);
}

/**
 * Kasiski Examination - find repeated sequences to determine Vigenère key length
 */
export interface KasiskiResult {
  sequence: string;
  positions: number[];
  distances: number[];
}

export interface KeyLengthCandidate {
  length: number;
  score: number;
  factors: number[];
}

/**
 * Find repeated sequences in ciphertext (minimum 3 characters)
 */
export function findRepeatedSequences(
  ciphertext: string,
  minLength = 3,
  maxLength = 6
): KasiskiResult[] {
  const text = ciphertext.toUpperCase().replace(/[^A-Z]/g, '');
  const sequences = new Map<string, number[]>();

  // Find all sequences and their positions
  for (let len = minLength; len <= maxLength; len++) {
    for (let i = 0; i <= text.length - len; i++) {
      const seq = text.slice(i, i + len);
      if (!sequences.has(seq)) {
        sequences.set(seq, []);
      }
      sequences.get(seq)!.push(i);
    }
  }

  // Filter to only repeated sequences and calculate distances
  const results: KasiskiResult[] = [];

  for (const [sequence, positions] of sequences) {
    if (positions.length >= 2) {
      const distances: number[] = [];
      for (let i = 1; i < positions.length; i++) {
        distances.push(positions[i] - positions[0]);
      }
      results.push({ sequence, positions, distances });
    }
  }

  // Sort by sequence length (longer = more significant)
  return results.sort((a, b) => b.sequence.length - a.sequence.length);
}

/**
 * Find prime factors of a number
 */
function primeFactors(n: number): number[] {
  const factors: number[] = [];
  let d = 2;
  while (n > 1) {
    while (n % d === 0) {
      factors.push(d);
      n /= d;
    }
    d++;
  }
  return factors;
}

/**
 * Find all factors of a number
 */
function allFactors(n: number): number[] {
  const factors: number[] = [];
  for (let i = 2; i <= n; i++) {
    if (n % i === 0) {
      factors.push(i);
    }
  }
  return factors;
}

/**
 * Estimate key length from Kasiski examination
 */
export function estimateKeyLength(ciphertext: string): KeyLengthCandidate[] {
  const sequences = findRepeatedSequences(ciphertext);

  if (sequences.length === 0) {
    return [];
  }

  // Count factor occurrences across all distances
  const factorCounts = new Map<number, number>();

  for (const seq of sequences) {
    for (const distance of seq.distances) {
      const factors = allFactors(distance);
      for (const factor of factors) {
        if (factor >= 2 && factor <= 20) {
          // Reasonable key length range
          factorCounts.set(factor, (factorCounts.get(factor) || 0) + 1);
        }
      }
    }
  }

  // Convert to sorted candidates
  const candidates: KeyLengthCandidate[] = [];

  for (const [length, count] of factorCounts) {
    candidates.push({
      length,
      score: count,
      factors: primeFactors(length),
    });
  }

  return candidates.sort((a, b) => b.score - a.score);
}

/**
 * Calculate IC for each column assuming a key length
 * Higher average IC suggests correct key length
 */
export function calculateColumnICs(ciphertext: string, keyLength: number): number[] {
  const text = ciphertext.toUpperCase().replace(/[^A-Z]/g, '');
  const columns: string[] = Array(keyLength).fill('');

  // Split text into columns
  for (let i = 0; i < text.length; i++) {
    columns[i % keyLength] += text[i];
  }

  // Calculate IC for each column
  return columns.map(calculateIC);
}

/**
 * Find best key length using IC method
 */
export function findKeyLengthByIC(
  ciphertext: string,
  maxLength = 15
): { length: number; avgIC: number }[] {
  const results: { length: number; avgIC: number }[] = [];

  for (let len = 1; len <= maxLength; len++) {
    const columnICs = calculateColumnICs(ciphertext, len);
    const avgIC = columnICs.reduce((a, b) => a + b, 0) / columnICs.length;
    results.push({ length: len, avgIC });
  }

  // Sort by average IC (higher = better, closer to English)
  return results.sort((a, b) => b.avgIC - a.avgIC);
}
