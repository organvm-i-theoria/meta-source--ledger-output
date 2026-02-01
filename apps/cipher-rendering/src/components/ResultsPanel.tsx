import { useCallback, useState } from 'react';
import { useCipherStore } from '../store/cipherStore';

export const ResultsPanel: React.FC = () => {
  const currentState = useCipherStore((s) => s.currentState);
  const plaintext = useCipherStore((s) => s.plaintext);
  const activeCipher = useCipherStore((s) => s.activeCipher);
  const mode = useCipherStore((s) => s.mode);
  const history = useCipherStore((s) => s.history);

  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(null), 1500);
    });
  }, []);

  const handleExportHistory = useCallback(() => {
    if (!currentState || !activeCipher) return;

    const exportData = {
      cipher: activeCipher.name,
      cipherId: activeCipher.id,
      mode,
      plaintext: currentState.plaintext,
      ciphertext: currentState.ciphertext,
      config: currentState.data,
      steps: history.length,
      timestamp: new Date().toISOString(),
    };

    const json = JSON.stringify(exportData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `cipher-${activeCipher.id}-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [currentState, activeCipher, mode, history]);

  const handleShareLink = useCallback(() => {
    if (!currentState || !activeCipher) return;

    // Create shareable data
    const shareData = {
      c: activeCipher.id,
      m: mode,
      t: currentState.ciphertext,
      ...(activeCipher.id === 'caesar' && { s: currentState.data.shift }),
      ...(activeCipher.id === 'vigenere' && { k: currentState.data.keyword }),
      ...(activeCipher.id === 'enigma' && { p: currentState.data.initialPositions }),
    };

    const encoded = btoa(JSON.stringify(shareData))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');

    const shareUrl = `${window.location.origin}?cipher=${encoded}`;

    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied('link');
      setTimeout(() => setCopied(null), 1500);
    });
  }, [currentState, activeCipher, mode]);

  if (!currentState || currentState.ciphertext.length === 0) {
    return null;
  }

  const isComplete = currentState.plaintext.length === plaintext.length;

  return (
    <div className="p-4 border-t border-green-900 space-y-3">
      <h3 className="text-sm font-bold text-green-500 uppercase tracking-wide">
        Results
      </h3>

      {/* Result Display */}
      <div className="space-y-2">
        {/* Input */}
        <div className="p-2 bg-gray-900 border border-gray-800">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-500">
              {mode === 'encrypt' ? 'PLAINTEXT' : 'CIPHERTEXT'}
            </span>
            <button
              onClick={() => handleCopy(currentState.plaintext, 'input')}
              className="text-xs text-gray-500 hover:text-gray-300"
            >
              {copied === 'input' ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          <div className="font-mono text-white text-sm break-all">
            {currentState.plaintext}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center text-gray-600">
          <span>{mode === 'encrypt' ? '↓ ENCRYPT' : '↓ DECRYPT'}</span>
        </div>

        {/* Output */}
        <div
          className={`p-2 border ${
            mode === 'encrypt'
              ? 'bg-green-950/30 border-green-800'
              : 'bg-orange-950/30 border-orange-800'
          }`}
        >
          <div className="flex justify-between items-center mb-1">
            <span
              className={`text-xs ${
                mode === 'encrypt' ? 'text-green-500' : 'text-orange-500'
              }`}
            >
              {mode === 'encrypt' ? 'CIPHERTEXT' : 'PLAINTEXT'}
            </span>
            <button
              onClick={() => handleCopy(currentState.ciphertext, 'output')}
              className={`text-xs ${
                mode === 'encrypt'
                  ? 'text-green-600 hover:text-green-400'
                  : 'text-orange-600 hover:text-orange-400'
              }`}
            >
              {copied === 'output' ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          <div
            className={`font-mono text-sm break-all ${
              mode === 'encrypt' ? 'text-green-400' : 'text-orange-400'
            }`}
          >
            {currentState.ciphertext}
            {!isComplete && <span className="text-gray-600">...</span>}
          </div>
        </div>
      </div>

      {/* Cipher Info */}
      <div className="text-xs text-gray-500 font-mono">
        {activeCipher?.name}
        {currentState.data.shift !== undefined && ` • Shift: ${currentState.data.shift}`}
        {currentState.data.keyword && ` • Key: ${currentState.data.keyword}`}
        {currentState.data.rotors && (
          <>
            {' '}
            • Rotors:{' '}
            {(currentState.data.rotors as Array<{ position: number }>)
              .map((r) => String.fromCharCode(65 + r.position))
              .join('-')}
          </>
        )}
      </div>

      {/* Export Actions */}
      {isComplete && (
        <div className="flex gap-2">
          <button
            onClick={() => handleCopy(currentState.ciphertext, 'result')}
            className="flex-1 py-1.5 text-xs border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white"
          >
            {copied === 'result' ? '✓ COPIED' : 'COPY RESULT'}
          </button>
          <button
            onClick={handleExportHistory}
            className="flex-1 py-1.5 text-xs border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white"
          >
            EXPORT JSON
          </button>
          <button
            onClick={handleShareLink}
            className="flex-1 py-1.5 text-xs border border-cyan-800 text-cyan-500 hover:border-cyan-600 hover:text-cyan-300"
          >
            {copied === 'link' ? '✓ LINK COPIED' : '🔗 SHARE'}
          </button>
        </div>
      )}

      {/* Step Counter */}
      <div className="text-xs text-gray-600 text-right">
        {currentState.step} / {plaintext.length} steps
        {isComplete && <span className="text-green-500 ml-2">✓ Complete</span>}
      </div>
    </div>
  );
};
