import { CipherState, StepResult, EncryptionResult, CipherConfig, VisualHints } from './types';

export enum CipherFamily {
  SUBSTITUTION = 'substitution',
  POLYALPHABETIC = 'polyalphabetic',
  TRANSPOSITION = 'transposition',
  MECHANICAL = 'mechanical',
  STREAM = 'stream',
}

export type CipherMode = 'encrypt' | 'decrypt';

export interface ICipher {
  readonly id: string;
  readonly name: string;
  readonly family: CipherFamily;

  configure(config: CipherConfig): void;
  getInitialState(): CipherState;
  step(state: CipherState, input: string, mode?: CipherMode): StepResult;
  encrypt(plaintext: string): EncryptionResult;
  decrypt?(ciphertext: string): EncryptionResult;
  getVisualHints(): VisualHints;
}
