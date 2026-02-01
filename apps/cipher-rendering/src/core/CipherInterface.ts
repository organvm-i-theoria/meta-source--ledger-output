import { CipherState, StepResult, EncryptionResult, CipherConfig, VisualHints } from './types';

export enum CipherFamily {
    SUBSTITUTION = 'substitution',
    POLYALPHABETIC = 'polyalphabetic',
    TRANSPOSITION = 'transposition',
    MECHANICAL = 'mechanical',
    STREAM = 'stream'
}

export interface ICipher {
    readonly id: string;
    readonly name: string;
    readonly family: CipherFamily;

    configure(config: CipherConfig): void;
    getInitialState(): CipherState;
    step(state: CipherState, input: string): StepResult;
    encrypt(plaintext: string): EncryptionResult;
    getVisualHints(): VisualHints;
}
