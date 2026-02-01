/**
 * Validation utilities using @meta-source/utils
 */

import { validateName as coreValidateName, validateBirthdate } from '@meta-source/utils';

/**
 * Check if a name is valid (has letters, reasonable length)
 */
export const isValidName = (name: string): boolean => {
  const result = coreValidateName(name);
  return result.valid;
};

/**
 * Check if a date string is valid and in the past
 */
export const isValidDate = (dateStr: string): boolean => {
  const result = validateBirthdate(dateStr);
  return result.valid;
};

/**
 * Sanitize a name input (filter to letters, spaces, hyphens, apostrophes)
 */
export const sanitizeName = (name: string): string => {
  return name.replace(/[^A-Za-z\s'-]/g, '').trim();
};
