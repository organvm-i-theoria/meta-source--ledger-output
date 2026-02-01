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
const REVERSED = 'ZYXWVUTSRQPONMLKJIHGFEDCBA';

export class AtbashCipher implements ICipher {
  readonly id = 'atbash';
  readonly name = 'Atbash Cipher';
  readonly family = CipherFamily.SUBSTITUTION;

  configure(_config: CipherConfig) {
    // Atbash has no configuration - it's a fixed substitution
  }

  getInitialState(): CipherState {
    return {
      id: crypto.randomUUID(),
      step: 0,
      timestamp: Date.now(),
      data: { mapping: 'atbash' },
      visual: { focus: [], annotations: [], transforms: [] },
      plaintext: '',
      ciphertext: '',
    };
  }

  step(state: CipherState, inputChar: string, _mode: CipherMode = 'encrypt'): StepResult {
    // Atbash is self-inverting: encrypt and decrypt are identical
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
      outputChar = REVERSED[index];

      events.push({
        type: CIPHER_EVENTS.SUBSTITUTION,
        payload: {
          from: upperChar,
          to: outputChar,
          method: 'mirror',
          fromIndex: index,
          toIndex: 25 - index,
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
      data: { mapping: 'atbash' },
      visual: {
        focus: [
          { type: 'character', id: `plaintext:${state.plaintext.length}` },
          { type: 'character', id: `ciphertext:${state.ciphertext.length}` },
        ],
        annotations: [
          {
            text: `${upperChar} ↔ ${outputChar}`,
            x: 0,
            y: 0,
          },
        ],
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
      const result = this.step(currentState, char);
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
      preferredMetaphors: ['mirror', 'wheel', 'grid'],
      colors: {
        plaintext: '#ffffff',
        ciphertext: '#ff6b6b',
        highlight: '#ffff00',
      },
    };
  }
}
