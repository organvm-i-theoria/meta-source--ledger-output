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

export class VigenereCipher implements ICipher {
  readonly id = 'vigenere';
  readonly name = 'Vigenère Cipher';
  readonly family = CipherFamily.POLYALPHABETIC;

  private keyword: string = 'KEY';

  configure(config: CipherConfig) {
    if (config.keyword && typeof config.keyword === 'string') {
      // Clean keyword - only letters, uppercase
      this.keyword = config.keyword.toUpperCase().replace(/[^A-Z]/g, '') || 'KEY';
    }
  }

  getInitialState(): CipherState {
    return {
      id: crypto.randomUUID(),
      step: 0,
      timestamp: Date.now(),
      data: {
        keyword: this.keyword,
        keyIndex: 0,
        currentShift: ALPHABET.indexOf(this.keyword[0]),
      },
      visual: { focus: [], annotations: [], transforms: [] },
      plaintext: '',
      ciphertext: '',
    };
  }

  step(state: CipherState, inputChar: string, mode: CipherMode = 'encrypt'): StepResult {
    const upperChar = inputChar.toUpperCase();
    const index = ALPHABET.indexOf(upperChar);
    const keyword = state.data.keyword as string;
    let keyIndex = state.data.keyIndex as number;

    let outputChar = inputChar;
    const events = [];

    events.push({
      type: CIPHER_EVENTS.INPUT_CHAR,
      payload: { char: inputChar, index: state.plaintext.length },
      timestamp: Date.now(),
    });

    let newKeyIndex = keyIndex;
    let currentShift = state.data.currentShift as number;

    if (index !== -1) {
      // Get shift from current keyword letter
      const keyChar = keyword[keyIndex % keyword.length];
      const shift = ALPHABET.indexOf(keyChar);
      currentShift = shift;

      // Apply shift (add for encrypt, subtract for decrypt)
      const effectiveShift = mode === 'encrypt' ? shift : -shift;
      const newIndex = (index + effectiveShift + 26) % 26;
      outputChar = ALPHABET[newIndex];

      events.push({
        type: CIPHER_EVENTS.KEY_ADVANCE,
        payload: {
          keyChar,
          keyIndex: keyIndex % keyword.length,
          shift,
        },
        timestamp: Date.now(),
      });

      events.push({
        type: CIPHER_EVENTS.SUBSTITUTION,
        payload: {
          from: upperChar,
          to: outputChar,
          method: 'vigenere',
          shift,
          keyChar,
        },
        timestamp: Date.now(),
      });

      // Advance key index only for alphabetic characters
      newKeyIndex = keyIndex + 1;
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
      data: {
        keyword,
        keyIndex: newKeyIndex,
        currentShift,
      },
      visual: {
        focus: [
          { type: 'character', id: `plaintext:${state.plaintext.length}` },
          { type: 'character', id: `ciphertext:${state.ciphertext.length}` },
          { type: 'character', id: `keyword:${newKeyIndex % keyword.length}` },
        ],
        annotations: [
          {
            text: `Key: ${keyword[keyIndex % keyword.length]} (+${currentShift})`,
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
      preferredMetaphors: ['tabula-recta', 'wheel', 'cascade'],
      colors: {
        plaintext: '#ffffff',
        ciphertext: '#9b59b6',
        highlight: '#f1c40f',
      },
    };
  }
}
