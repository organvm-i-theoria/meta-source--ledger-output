/**
 * Hash Utilities - Deterministic seed generation
 */

/**
 * Simple string hash function (djb2)
 * Returns a 32-bit integer hash as hex string
 */
export function hashString(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

/**
 * Combine multiple values into a single hash
 */
export function combineHashes(...values: (string | number)[]): string {
  const combined = values.map(String).join('-');
  return hashString(combined);
}

/**
 * Generate a deterministic seed from arbitrary input
 */
export function generateSeed(input: string | object): string {
  const str = typeof input === 'string' ? input : JSON.stringify(input);
  return hashString(str);
}

/**
 * Convert hash to a normalized 0-1 float
 */
export function hashToFloat(hash: string): number {
  const num = parseInt(hash.slice(0, 8), 16);
  return num / 0xffffffff;
}

/**
 * Generate a pseudorandom number from seed
 */
export function seededRandom(seed: string, index = 0): number {
  const combined = `${seed}-${index}`;
  return hashToFloat(hashString(combined));
}

/**
 * Generate an array of seeded random numbers
 */
export function seededRandomArray(seed: string, length: number): number[] {
  return Array.from({ length }, (_, i) => seededRandom(seed, i));
}

/**
 * Hash a personal identity for unique identification.
 * Accepts either an identity object or separate arguments.
 *
 * @example
 * // Object form
 * hashIdentity({ name: 'John', birthdate: '1990-01-01' })
 *
 * @example
 * // Separate arguments form
 * hashIdentity('John', '1990-01-01', ['love', 'peace'])
 */
export function hashIdentity(
  nameOrIdentity: string | { name?: string; fullName?: string; birthDate?: Date | string; birthdate?: string },
  birthdate?: string,
  meaningfulWords?: string[]
): string {
  if (typeof nameOrIdentity === 'object') {
    // Object form
    const identity = nameOrIdentity;
    const name = identity.name || identity.fullName || '';
    const date = identity.birthdate || identity.birthDate || '';
    return hashString(`${name}:${date}`);
  }

  // Separate arguments form
  const name = nameOrIdentity || '';
  const date = birthdate || '';
  const words = meaningfulWords?.join(',') || '';
  return hashString(`${name}:${date}:${words}`);
}
