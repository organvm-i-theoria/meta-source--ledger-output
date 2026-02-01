import { ICipher, CipherFamily, CipherMode } from '../core/CipherInterface';
import {
  CipherState,
  StepResult,
  EncryptionResult,
  VisualHints,
  CipherConfig,
} from '../core/types';
import { CIPHER_EVENTS } from '../core/events';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export class CaesarCipher implements ICipher {
  readonly id = 'caesar';
  readonly name = 'Caesar Cipher';
  readonly family = CipherFamily.SUBSTITUTION;

  private shift: number = 3;

  configure(config: CipherConfig) {
    if (config.shift !== undefined) this.shift = config.shift;
  }

  getInitialState(): CipherState {
    return {
      id: crypto.randomUUID(),
      step: 0,
      timestamp: Date.now(),
      data: { shift: this.shift },
      visual: { focus: [], annotations: [], transforms: [] },
      plaintext: '',
      ciphertext: '',
    };
  }

  step(state: CipherState, inputChar: string, mode: CipherMode = 'encrypt'): StepResult {
    const upperChar = inputChar.toUpperCase();
    const index = ALPHABET.indexOf(upperChar);

    let outputChar = inputChar;
    const events = [];

    events.push({
      type: CIPHER_EVENTS.INPUT_CHAR,
      payload: { char: inputChar, index: state.plaintext.length },
      timestamp: Date.now(),
    });

    if (index !== -1) {
      // Encrypt: add shift, Decrypt: subtract shift
      const effectiveShift = mode === 'encrypt' ? this.shift : -this.shift;
      const newIndex = (index + effectiveShift + 26) % 26;
      outputChar = ALPHABET[newIndex];

      events.push({
        type: CIPHER_EVENTS.SUBSTITUTION,
        payload: {
          from: upperChar,
          to: outputChar,
          method: mode === 'encrypt' ? 'shift' : 'unshift',
        },
        timestamp: Date.now(),
      });
    }

    events.push({
      type: CIPHER_EVENTS.OUTPUT_CHAR,
      payload: { char: outputChar, index: state.ciphertext.length },
      timestamp: Date.now(),
    });

    const nextState: CipherState = {
      id: crypto.randomUUID(),
      step: state.step + 1,
      timestamp: Date.now(),
      data: { shift: this.shift },
      visual: {
        focus: [
          { type: 'character', id: `plaintext:${state.plaintext.length}` },
          { type: 'character', id: `ciphertext:${state.ciphertext.length}` },
        ],
        annotations: [],
        transforms: [],
      },
      plaintext: state.plaintext + inputChar,
      ciphertext: state.ciphertext + outputChar,
    };

    return { nextState, events, outputChar };
  }

  encrypt(plaintext: string): EncryptionResult {
    let currentState = this.getInitialState();
    const history = [currentState];

    for (const char of plaintext) {
      const result = this.step(currentState, char, 'encrypt');
      currentState = result.nextState;
      history.push(currentState);
    }

    return {
      finalState: currentState,
      ciphertext: currentState.ciphertext,
      history,
    };
  }

  decrypt(ciphertext: string): EncryptionResult {
    let currentState = this.getInitialState();
    const history = [currentState];

    for (const char of ciphertext) {
      const result = this.step(currentState, char, 'decrypt');
      currentState = result.nextState;
      history.push(currentState);
    }

    return {
      finalState: currentState,
      ciphertext: currentState.ciphertext,
      history,
    };
  }

  getVisualHints(): VisualHints {
    return {
      preferredMetaphors: ['wheel', 'grid', 'cascade'],
      colors: {
        plaintext: '#ffffff',
        ciphertext: '#00ff41',
        highlight: '#ffff00',
      },
    };
  }
}
