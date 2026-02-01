/**
 * Cipher Types - Phase 2 encryption state machine types
 */

/** Cipher operation mode */
export type CipherMode = 'encrypt' | 'decrypt';

/** Base cipher state */
export interface CipherState {
  id: string;
  plaintext: string;
  ciphertext: string;
  mode: CipherMode;
  data: Record<string, unknown>;
}

/** Cipher definition interface */
export interface ICipher {
  id: string;
  name: string;
  family: CipherFamily;
  description: string;
  encrypt: (plaintext: string, data: Record<string, unknown>) => string;
  decrypt: (ciphertext: string, data: Record<string, unknown>) => string;
  getDefaultData: () => Record<string, unknown>;
}

/** Cipher family categories */
export type CipherFamily =
  | 'substitution'
  | 'transposition'
  | 'polyalphabetic'
  | 'machine'
  | 'modern'
  | 'astrological'
  | 'historical'
  | 'unsolved';

/** Visual metaphor for cipher rendering */
export interface VisualMetaphor {
  id: string;
  name: string;
  render: (state: CipherState) => void;
}
