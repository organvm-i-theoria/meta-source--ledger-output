import { useState, useCallback, useEffect } from 'react';
import { useCipherStore } from '../store/cipherStore';
import { cipherRegistry } from '../ciphers/registry';
import { metaphorRegistry } from '../metaphors/registry';
import { decodeSeed, deriveCipherConfig, type IdentitySeed } from '@meta-source/core';

export const InputPanel: React.FC = () => {
  const activeCipher = useCipherStore((s) => s.activeCipher);
  const selectCipher = useCipherStore((s) => s.selectCipher);
  const configureCipher = useCipherStore((s) => s.configureCipher);
  const plaintext = useCipherStore((s) => s.plaintext);
  const setPlaintext = useCipherStore((s) => s.setPlaintext);
  const currentState = useCipherStore((s) => s.currentState);
  const mode = useCipherStore((s) => s.mode);
  const setMode = useCipherStore((s) => s.setMode);
  const activeMetaphorId = useCipherStore((s) => s.activeMetaphorId);
  const switchMetaphor = useCipherStore((s) => s.switchMetaphor);

  const [shift, setShift] = useState(3);
  const [keyword, setKeyword] = useState('KEY');
  const [rotorPositions, setRotorPositions] = useState<[number, number, number]>([0, 0, 0]);
  const [inputText, setInputText] = useState('');
  const [importedSeed, setImportedSeed] = useState<IdentitySeed | null>(null);

  const ciphers = cipherRegistry.getAll();
  const metaphors = metaphorRegistry.getAll();

  // Check for seed or cipher share in URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const seedParam = params.get('seed');
    const cipherParam = params.get('cipher');

    if (seedParam) {
      const seed = decodeSeed(seedParam);
      if (seed) {
        setImportedSeed(seed);
        const config = deriveCipherConfig(seed);

        // Apply derived configuration
        setShift(config.caesar.shift);
        setKeyword(config.vigenere.keyword);
        setRotorPositions(config.enigma.positions);

        // Clear URL parameter
        window.history.replaceState({}, '', window.location.pathname);
      }
    }

    // Handle shared cipher configuration
    if (cipherParam) {
      try {
        const padded = cipherParam.replace(/-/g, '+').replace(/_/g, '/');
        const json = atob(padded);
        const shareData = JSON.parse(json) as {
          c: string;
          m: 'encrypt' | 'decrypt';
          t: string;
          s?: number;
          k?: string;
          p?: [number, number, number];
        };

        // Apply shared configuration
        if (shareData.c) {
          selectCipher(shareData.c);
        }
        if (shareData.m) {
          setMode(shareData.m);
        }
        if (shareData.s !== undefined) {
          setShift(shareData.s);
          configureCipher({ shift: shareData.s });
        }
        if (shareData.k) {
          setKeyword(shareData.k);
          configureCipher({ keyword: shareData.k });
        }
        if (shareData.p) {
          setRotorPositions(shareData.p);
          configureCipher({ positions: shareData.p });
        }
        if (shareData.t) {
          setInputText(shareData.t);
        }

        // Clear URL parameter
        window.history.replaceState({}, '', window.location.pathname);
      } catch {
        // Invalid share data, ignore
      }
    }
  }, [selectCipher, setMode, configureCipher]);

  const handleCipherSelect = useCallback(
    (id: string) => {
      selectCipher(id);

      // Apply imported seed configuration if available
      if (importedSeed) {
        const config = deriveCipherConfig(importedSeed);
        if (id === 'caesar') {
          configureCipher({ shift: config.caesar.shift });
        } else if (id === 'vigenere') {
          configureCipher({ keyword: config.vigenere.keyword });
        } else if (id === 'enigma') {
          configureCipher({ positions: config.enigma.positions });
        }
      }
    },
    [selectCipher, configureCipher, importedSeed]
  );

  const handleShiftChange = useCallback(
    (newShift: number) => {
      setShift(newShift);
      configureCipher({ shift: newShift });
    },
    [configureCipher]
  );

  const handleKeywordChange = useCallback(
    (newKeyword: string) => {
      const cleaned = newKeyword.toUpperCase().replace(/[^A-Z]/g, '');
      setKeyword(cleaned);
      if (cleaned.length > 0) {
        configureCipher({ keyword: cleaned });
      }
    },
    [configureCipher]
  );

  const handleRotorPositionChange = useCallback(
    (index: number, value: number) => {
      const newPositions = [...rotorPositions] as [number, number, number];
      newPositions[index] = value;
      setRotorPositions(newPositions);
      configureCipher({ positions: newPositions });
    },
    [rotorPositions, configureCipher]
  );

  const handleTextSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (inputText.trim()) {
        setPlaintext(inputText.trim());
      }
    },
    [inputText, setPlaintext]
  );

  return (
    <div className="p-4 border-b border-green-900 space-y-4">
      <h2 className="text-sm font-bold text-green-500 uppercase tracking-wide">
        Cipher Configuration
      </h2>

      {/* Identity Seed Indicator */}
      {importedSeed && (
        <div className="p-2 bg-purple-900/30 border border-purple-700 text-xs">
          <div className="text-purple-400 font-bold flex items-center gap-1">
            <span>🔗</span> Identity Linked
          </div>
          <div className="text-purple-300/70 mt-1">
            Destiny: {importedSeed.numerology.destiny} •
            Life Path: {importedSeed.numerology.lifePath ?? '—'} •
            Soul: {importedSeed.numerology.soulUrge}
          </div>
          <button
            onClick={() => setImportedSeed(null)}
            className="mt-1 text-purple-500 hover:text-purple-400 text-xs"
          >
            Clear link
          </button>
        </div>
      )}

      {/* Cipher Selector */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">Select Cipher</label>
        <select
          value={activeCipher?.id || ''}
          onChange={(e) => handleCipherSelect(e.target.value)}
          className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-green-400 text-sm"
        >
          <option value="">-- Select --</option>
          {ciphers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Mode Toggle */}
      {activeCipher && (
        <div>
          <label className="block text-xs text-gray-500 mb-1">Mode</label>
          <div className="flex">
            <button
              onClick={() => setMode('encrypt')}
              className={`flex-1 py-2 text-sm font-bold border-r-0 ${
                mode === 'encrypt'
                  ? 'bg-green-900 border-green-500 text-green-400'
                  : 'bg-gray-900 border-gray-700 text-gray-500'
              } border`}
            >
              ENCRYPT
            </button>
            <button
              onClick={() => setMode('decrypt')}
              className={`flex-1 py-2 text-sm font-bold ${
                mode === 'decrypt'
                  ? 'bg-orange-900 border-orange-500 text-orange-400'
                  : 'bg-gray-900 border-gray-700 text-gray-500'
              } border`}
            >
              DECRYPT
            </button>
          </div>
        </div>
      )}

      {/* Caesar Shift Control */}
      {activeCipher?.id === 'caesar' && (
        <div>
          <label className="block text-xs text-gray-500 mb-1">
            Shift Amount: {shift}
          </label>
          <input
            type="range"
            min="1"
            max="25"
            value={shift}
            onChange={(e) => handleShiftChange(Number(e.target.value))}
            className="w-full accent-green-500"
          />
          <div className="flex justify-between text-xs text-gray-600">
            <span>1</span>
            <span>13</span>
            <span>25</span>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => handleShiftChange(13)}
              className={`flex-1 py-1 text-xs border ${shift === 13 ? 'bg-green-900 border-green-500 text-green-400' : 'bg-gray-900 border-gray-700 text-gray-500'}`}
            >
              ROT13
            </button>
            <button
              onClick={() => handleShiftChange(3)}
              className={`flex-1 py-1 text-xs border ${shift === 3 ? 'bg-green-900 border-green-500 text-green-400' : 'bg-gray-900 border-gray-700 text-gray-500'}`}
            >
              Classic (+3)
            </button>
          </div>
        </div>
      )}

      {/* Vigenère Keyword Control */}
      {activeCipher?.id === 'vigenere' && (
        <div>
          <label className="block text-xs text-gray-500 mb-1">Keyword</label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => handleKeywordChange(e.target.value)}
            placeholder="KEY"
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-purple-400 text-sm placeholder-gray-600 uppercase"
          />
          <div className="mt-1 text-xs text-gray-600">
            Shifts: {keyword.split('').map((c) => c.charCodeAt(0) - 65).join(', ')}
          </div>
        </div>
      )}

      {/* Atbash Info */}
      {activeCipher?.id === 'atbash' && (
        <div className="p-2 bg-gray-900 border border-gray-700 text-xs">
          <div className="text-red-400 font-bold mb-1">Mirror Substitution</div>
          <div className="text-gray-500 font-mono">
            A↔Z B↔Y C↔X ... M↔N
          </div>
          <div className="text-gray-600 mt-1">
            No configuration needed - each letter maps to its mirror.
          </div>
        </div>
      )}

      {/* Enigma Rotor Configuration */}
      {activeCipher?.id === 'enigma' && (
        <div className="p-2 bg-gray-900 border border-gray-700">
          <div className="text-red-500 font-bold text-xs mb-2">Rotor Positions</div>
          <div className="flex gap-2">
            {['Left', 'Mid', 'Right'].map((label, idx) => (
              <div key={label} className="flex-1 text-center">
                <div className="text-xs text-gray-600 mb-1">{label}</div>
                <select
                  value={rotorPositions[idx]}
                  onChange={(e) => handleRotorPositionChange(idx, Number(e.target.value))}
                  className="w-full px-1 py-1 bg-black border border-gray-700 text-orange-400 text-sm text-center"
                >
                  {Array.from({ length: 26 }, (_, i) => (
                    <option key={i} value={i}>
                      {String.fromCharCode(65 + i)}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-600 mt-2">
            Rotors: I-II-III • Reflector B
          </div>
        </div>
      )}

      {/* Visual Metaphor Selector */}
      {activeCipher && (
        <div>
          <label className="block text-xs text-gray-500 mb-1">Visualization</label>
          <div className="flex gap-1">
            {metaphors.map((m) => (
              <button
                key={m.id}
                onClick={() => switchMetaphor(m.id)}
                className={`flex-1 py-1.5 text-xs border ${
                  activeMetaphorId === m.id
                    ? 'bg-green-900 border-green-500 text-green-400'
                    : 'bg-gray-900 border-gray-700 text-gray-500 hover:border-gray-600'
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Text */}
      <form onSubmit={handleTextSubmit}>
        <label className="block text-xs text-gray-500 mb-1">
          {mode === 'encrypt' ? 'Plaintext' : 'Ciphertext'}
        </label>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value.toUpperCase())}
          placeholder={mode === 'encrypt' ? 'ENTER MESSAGE' : 'ENTER CIPHERTEXT'}
          className={`w-full px-3 py-2 bg-gray-900 border text-sm placeholder-gray-600 ${
            mode === 'encrypt'
              ? 'border-gray-700 text-white'
              : 'border-orange-900 text-orange-300'
          }`}
          disabled={!activeCipher}
        />
        <button
          type="submit"
          disabled={!activeCipher || !inputText.trim()}
          className={`mt-2 w-full py-2 font-bold text-sm disabled:bg-gray-700 disabled:text-gray-500 ${
            mode === 'encrypt'
              ? 'bg-green-600 text-black'
              : 'bg-orange-600 text-black'
          }`}
        >
          SET {mode === 'encrypt' ? 'PLAINTEXT' : 'CIPHERTEXT'}
        </button>
      </form>

      {/* Current State Display */}
      {plaintext && (
        <div className="pt-2 border-t border-gray-800 text-xs space-y-1">
          <div className="text-gray-500">
            Input: <span className="text-white">{plaintext}</span>
          </div>
          <div className="text-gray-500">
            Progress:{' '}
            <span className="text-green-400">
              {currentState?.plaintext.length || 0}/{plaintext.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
