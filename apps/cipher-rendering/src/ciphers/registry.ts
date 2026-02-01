import { ICipher } from '../core/CipherInterface';
import { CaesarCipher } from './CaesarCipher';
import { AtbashCipher } from './AtbashCipher';
import { VigenereCipher } from './VigenereCipher';
import { EnigmaCipher } from './EnigmaCipher';

class CipherRegistry {
  private ciphers: Map<string, ICipher> = new Map();

  register(cipher: ICipher) {
    this.ciphers.set(cipher.id, cipher);
  }

  get(id: string): ICipher | undefined {
    return this.ciphers.get(id);
  }

  getAll(): ICipher[] {
    return Array.from(this.ciphers.values());
  }
}

export const cipherRegistry = new CipherRegistry();

// Register built-in ciphers
cipherRegistry.register(new CaesarCipher());
cipherRegistry.register(new AtbashCipher());
cipherRegistry.register(new VigenereCipher());
cipherRegistry.register(new EnigmaCipher());
