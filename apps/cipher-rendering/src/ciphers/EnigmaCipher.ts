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

// Historical Enigma rotor wirings (simplified)
const ROTORS = {
  I: 'EKMFLGDQVZNTOWYHXUSPAIBRCJ',
  II: 'AJDKSIRUXBLHWTMCQGZNPYFVOE',
  III: 'BDFHJLCPRTXVZNYEIWGAKMUSQO',
};

const REFLECTOR_B = 'YRUHQSLDPXNGOKMIEBFZCWVJAT';

interface RotorState {
  wiring: string;
  position: number;
  notch: number;
}

/**
 * Simplified Enigma cipher with 3 rotors
 * Demonstrates mechanical cipher principles: rotors, reflector, stepping
 */
export class EnigmaCipher implements ICipher {
  readonly id = 'enigma';
  readonly name = 'Enigma (Simplified)';
  readonly family = CipherFamily.MECHANICAL;

  private rotorConfig: [keyof typeof ROTORS, keyof typeof ROTORS, keyof typeof ROTORS] = [
    'I',
    'II',
    'III',
  ];
  private initialPositions: [number, number, number] = [0, 0, 0];

  configure(config: CipherConfig) {
    if (config.rotors && Array.isArray(config.rotors)) {
      this.rotorConfig = config.rotors as typeof this.rotorConfig;
    }
    if (config.positions && Array.isArray(config.positions)) {
      this.initialPositions = config.positions as typeof this.initialPositions;
    }
  }

  private createRotors(): RotorState[] {
    return this.rotorConfig.map((rotorId, idx) => ({
      wiring: ROTORS[rotorId],
      position: this.initialPositions[idx],
      notch: rotorId === 'I' ? 16 : rotorId === 'II' ? 4 : 21, // Q, E, V
    }));
  }

  getInitialState(): CipherState {
    return {
      id: crypto.randomUUID(),
      step: 0,
      timestamp: Date.now(),
      data: {
        rotors: this.createRotors(),
        reflector: REFLECTOR_B,
        rotorConfig: this.rotorConfig,
      },
      visual: { focus: [], annotations: [], transforms: [] },
      plaintext: '',
      ciphertext: '',
    };
  }

  private stepRotors(rotors: RotorState[]): RotorState[] {
    const newRotors = rotors.map((r) => ({ ...r }));

    // Middle rotor double-stepping
    if (newRotors[1].position === newRotors[1].notch) {
      newRotors[1].position = (newRotors[1].position + 1) % 26;
      newRotors[2].position = (newRotors[2].position + 1) % 26;
    }

    // Right rotor always steps
    if (newRotors[0].position === newRotors[0].notch) {
      newRotors[1].position = (newRotors[1].position + 1) % 26;
    }

    newRotors[0].position = (newRotors[0].position + 1) % 26;

    return newRotors;
  }

  private encryptChar(char: string, rotors: RotorState[], reflector: string): string {
    let idx = ALPHABET.indexOf(char.toUpperCase());
    if (idx === -1) return char;

    // Forward through rotors (right to left)
    for (const rotor of rotors) {
      idx = (idx + rotor.position) % 26;
      idx = ALPHABET.indexOf(rotor.wiring[idx]);
      idx = (idx - rotor.position + 26) % 26;
    }

    // Through reflector
    idx = ALPHABET.indexOf(reflector[idx]);

    // Backward through rotors (left to right)
    for (let i = rotors.length - 1; i >= 0; i--) {
      const rotor = rotors[i];
      idx = (idx + rotor.position) % 26;
      idx = rotor.wiring.indexOf(ALPHABET[idx]);
      idx = (idx - rotor.position + 26) % 26;
    }

    return ALPHABET[idx];
  }

  step(state: CipherState, inputChar: string, _mode: CipherMode = 'encrypt'): StepResult {
    // Enigma is self-inverting: encrypt and decrypt are identical
    // (provided the same rotor settings are used)
    const upperChar = inputChar.toUpperCase();
    const isLetter = ALPHABET.includes(upperChar);
    const events = [];

    events.push({
      type: CIPHER_EVENTS.INPUT_CHAR,
      payload: { char: inputChar, index: state.plaintext.length },
      timestamp: Date.now(),
    });

    let outputChar = inputChar;
    let newRotors = state.data.rotors as RotorState[];

    if (isLetter) {
      // Step rotors BEFORE encryption (like real Enigma)
      newRotors = this.stepRotors(newRotors);

      events.push({
        type: CIPHER_EVENTS.ROTOR_STEP,
        payload: {
          positions: newRotors.map((r) => r.position),
          letters: newRotors.map((r) => ALPHABET[r.position]),
        },
        timestamp: Date.now(),
      });

      // Encrypt
      outputChar = this.encryptChar(upperChar, newRotors, state.data.reflector as string);

      events.push({
        type: CIPHER_EVENTS.SUBSTITUTION,
        payload: {
          from: upperChar,
          to: outputChar,
          method: 'enigma',
          rotorPositions: newRotors.map((r) => r.position),
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
      data: {
        rotors: newRotors,
        reflector: state.data.reflector,
        rotorConfig: state.data.rotorConfig,
      },
      visual: {
        focus: [
          { type: 'component', id: 'rotor:0' },
          { type: 'component', id: 'rotor:1' },
          { type: 'component', id: 'rotor:2' },
        ],
        annotations: [
          {
            text: `Rotors: ${newRotors.map((r) => ALPHABET[r.position]).join('-')}`,
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
      preferredMetaphors: ['rotor', 'wheel', 'cascade'],
      colors: {
        plaintext: '#ffffff',
        ciphertext: '#e74c3c',
        highlight: '#f39c12',
      },
    };
  }
}
