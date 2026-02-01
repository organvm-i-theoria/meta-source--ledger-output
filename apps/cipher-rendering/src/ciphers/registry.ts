import { ICipher } from '../core/CipherInterface';

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
