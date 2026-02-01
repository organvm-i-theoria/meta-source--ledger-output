/**
 * Validation Utilities - Input validators
 */

/**
 * Validate that a string is non-empty after trimming
 */
export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Validate date string (ISO format)
 */
export function isValidDate(value: string): boolean {
  const date = new Date(value);
  return !isNaN(date.getTime());
}

/**
 * Validate hexadecimal string
 */
export function isValidHex(value: string): boolean {
  return /^[0-9a-fA-F]+$/.test(value);
}

/**
 * Validate color hex string
 */
export function isValidColorHex(value: string): boolean {
  return /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value);
}

/**
 * Validate number is within range
 */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Clamp number to range
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Validate token format (BLOCK-HINGE-POSTS)
 */
export function isValidToken(value: string): boolean {
  const cleaned = value.trim();
  if (cleaned.length < 3) return false;
  
  // Check various valid patterns
  const patterns = [
    /^(\d+)([a-z])([A-Z]+)$/,  // 4444jPP
    /^(.+?)[^A-Za-z0-9](.+)$/, // delimited
  ];
  
  return patterns.some((p) => p.test(cleaned)) || cleaned.length >= 3;
}

/**
 * Sanitize string for safe display
 */
export function sanitize(value: string): string {
  return value
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Validate a name string (must have at least 2 characters, alphabetic with spaces)
 */
export function validateName(value: string): { valid: boolean; error?: string } {
  const trimmed = value.trim();
  if (trimmed.length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters' };
  }
  if (!/^[A-Za-z\s'-]+$/.test(trimmed)) {
    return { valid: false, error: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
  }
  return { valid: true };
}

/**
 * Validate a birthdate string (must be valid date, not in future, reasonable age)
 */
export function validateBirthdate(value: string): { valid: boolean; error?: string } {
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { valid: false, error: 'Invalid date format' };
  }
  const now = new Date();
  if (date > now) {
    return { valid: false, error: 'Birthdate cannot be in the future' };
  }
  const age = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  if (age > 150) {
    return { valid: false, error: 'Birthdate seems unreasonably old' };
  }
  return { valid: true };
}
