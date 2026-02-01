import { useMemo } from 'react';
import { useCipherStore } from '../store/cipherStore';
import {
  analyzeFrequency,
  estimateCipherType,
  suggestCaesarShift,
  findKeyLengthByIC,
  findRepeatedSequences,
  ENGLISH_FREQUENCIES,
} from '../analysis/frequency';

const BAR_MAX_HEIGHT = 60;

export const FrequencyPanel: React.FC = () => {
  const currentState = useCipherStore((s) => s.currentState);
  const plaintext = useCipherStore((s) => s.plaintext);
  const mode = useCipherStore((s) => s.mode);
  const activeCipher = useCipherStore((s) => s.activeCipher);

  // Analyze both plaintext and ciphertext
  const plaintextAnalysis = useMemo(
    () => analyzeFrequency(plaintext || ''),
    [plaintext]
  );

  const ciphertextAnalysis = useMemo(
    () => analyzeFrequency(currentState?.ciphertext || ''),
    [currentState?.ciphertext]
  );

  // Suggest Caesar shifts if applicable
  const caesarSuggestions = useMemo(() => {
    if (
      activeCipher?.id === 'caesar' &&
      mode === 'decrypt' &&
      currentState?.ciphertext
    ) {
      return suggestCaesarShift(currentState.ciphertext).slice(0, 3);
    }
    return null;
  }, [activeCipher, mode, currentState?.ciphertext]);

  // Vigenère key length analysis
  const keyLengthAnalysis = useMemo(() => {
    if (
      activeCipher?.id === 'vigenere' &&
      mode === 'decrypt' &&
      currentState?.ciphertext &&
      currentState.ciphertext.length >= 20
    ) {
      const icResults = findKeyLengthByIC(currentState.ciphertext, 10);
      const repeatedSeqs = findRepeatedSequences(currentState.ciphertext).slice(0, 5);
      return { icResults: icResults.slice(0, 5), repeatedSeqs };
    }
    return null;
  }, [activeCipher, mode, currentState?.ciphertext]);

  const analysis = mode === 'encrypt' ? ciphertextAnalysis : plaintextAnalysis;
  const sourceText = mode === 'encrypt' ? 'Ciphertext' : 'Plaintext';

  if (!currentState || currentState.ciphertext.length === 0) {
    return (
      <div className="p-4 border-t border-green-900">
        <h3 className="text-sm font-bold text-green-500 uppercase tracking-wide mb-2">
          Frequency Analysis
        </h3>
        <div className="text-xs text-gray-600">
          Process text to see frequency analysis
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border-t border-green-900 space-y-4">
      <h3 className="text-sm font-bold text-green-500 uppercase tracking-wide">
        Frequency Analysis
      </h3>

      {/* Statistics Row */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="p-2 bg-gray-900 border border-gray-800">
          <div className="text-gray-500">Letters</div>
          <div className="text-white font-mono">{analysis.totalLetters}</div>
        </div>
        <div className="p-2 bg-gray-900 border border-gray-800">
          <div className="text-gray-500">IC</div>
          <div className="text-cyan-400 font-mono">
            {analysis.indexOfCoincidence.toFixed(4)}
          </div>
        </div>
        <div className="p-2 bg-gray-900 border border-gray-800">
          <div className="text-gray-500">χ²</div>
          <div className="text-yellow-400 font-mono">
            {analysis.chiSquared.toFixed(1)}
          </div>
        </div>
      </div>

      {/* Cipher Type Estimate */}
      <div className="text-xs">
        <span className="text-gray-500">Type Estimate: </span>
        <span className="text-purple-400">
          {estimateCipherType(analysis.indexOfCoincidence)}
        </span>
      </div>

      {/* IC Reference */}
      <div className="text-xs text-gray-600 border-l-2 border-gray-800 pl-2">
        <div>IC Reference:</div>
        <div className="font-mono">
          English ≈ 0.067 | Monoalpha ≈ 0.067 | Polyalpha ≈ 0.045 | Random ≈
          0.038
        </div>
      </div>

      {/* Caesar Shift Suggestions */}
      {caesarSuggestions && caesarSuggestions.length > 0 && (
        <div className="p-2 bg-orange-900/20 border border-orange-800 text-xs">
          <div className="text-orange-400 font-bold mb-1">Suggested Shifts:</div>
          <div className="flex gap-2">
            {caesarSuggestions.map((s, i) => (
              <div key={s.shift} className="font-mono">
                <span className="text-white">+{s.shift}</span>
                <span className="text-gray-500">
                  {' '}
                  ({s.confidence.toFixed(0)}%)
                </span>
                {i === 0 && <span className="text-green-500"> ★</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vigenère Key Length Analysis */}
      {keyLengthAnalysis && (
        <div className="p-2 bg-purple-900/20 border border-purple-800 text-xs space-y-2">
          <div className="text-purple-400 font-bold">Key Length Analysis (Kasiski)</div>

          {/* IC-based estimates */}
          <div>
            <div className="text-gray-500 mb-1">By Index of Coincidence:</div>
            <div className="flex gap-2 flex-wrap">
              {keyLengthAnalysis.icResults.map((r, i) => (
                <div key={r.length} className="font-mono">
                  <span className="text-white">{r.length}</span>
                  <span className="text-gray-500">
                    {' '}
                    (IC: {r.avgIC.toFixed(3)})
                  </span>
                  {i === 0 && <span className="text-green-500"> ★</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Repeated sequences */}
          {keyLengthAnalysis.repeatedSeqs.length > 0 && (
            <details>
              <summary className="text-gray-500 cursor-pointer hover:text-gray-400">
                Repeated Sequences ({keyLengthAnalysis.repeatedSeqs.length})
              </summary>
              <div className="mt-1 space-y-1 max-h-24 overflow-y-auto">
                {keyLengthAnalysis.repeatedSeqs.map((seq, i) => (
                  <div key={i} className="font-mono flex gap-2">
                    <span className="text-cyan-400">{seq.sequence}</span>
                    <span className="text-gray-600">
                      pos: {seq.positions.slice(0, 3).join(', ')}
                      {seq.positions.length > 3 && '...'}
                    </span>
                    <span className="text-gray-500">
                      Δ: {seq.distances.slice(0, 2).join(', ')}
                    </span>
                  </div>
                ))}
              </div>
            </details>
          )}
        </div>
      )}

      {/* Frequency Bar Chart */}
      <div className="space-y-1">
        <div className="text-xs text-gray-500 mb-2">{sourceText} Frequencies</div>

        {/* Chart */}
        <div className="flex items-end gap-0.5 h-20 bg-gray-950 p-2 overflow-hidden">
          {analysis.frequencies.map((freq) => {
            const height = freq.percentage
              ? (freq.percentage / 15) * BAR_MAX_HEIGHT
              : 0;
            const expectedHeight =
              (freq.expectedPercentage / 15) * BAR_MAX_HEIGHT;

            return (
              <div
                key={freq.letter}
                className="flex-1 flex flex-col items-center justify-end relative group"
                title={`${freq.letter}: ${freq.count} (${freq.percentage.toFixed(1)}%)\nExpected: ${freq.expectedPercentage.toFixed(1)}%`}
              >
                {/* Expected bar (background) */}
                <div
                  className="absolute bottom-0 w-full bg-gray-800 opacity-50"
                  style={{ height: `${expectedHeight}px` }}
                />
                {/* Actual bar */}
                <div
                  className={`relative w-full transition-all duration-200 ${
                    freq.deviation > 2
                      ? 'bg-red-500'
                      : freq.deviation < -2
                        ? 'bg-blue-500'
                        : 'bg-green-500'
                  }`}
                  style={{ height: `${height}px` }}
                />
              </div>
            );
          })}
        </div>

        {/* Letter labels */}
        <div className="flex gap-0.5 text-xs font-mono text-gray-600">
          {analysis.frequencies.map((freq) => (
            <div key={freq.letter} className="flex-1 text-center">
              {freq.letter}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-800 opacity-50" />
          <span className="text-gray-500">Expected (English)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500" />
          <span className="text-gray-500">Normal</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-500" />
          <span className="text-gray-500">High</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-500" />
          <span className="text-gray-500">Low</span>
        </div>
      </div>

      {/* Most/Least Frequent */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2 bg-gray-900 border border-gray-800">
          <div className="text-gray-500 mb-1">Most Frequent</div>
          <div className="font-mono text-green-400">
            {analysis.mostFrequent.length > 0
              ? analysis.mostFrequent.join(' ')
              : '—'}
          </div>
          <div className="text-gray-600 mt-1">English: E T A O I N</div>
        </div>
        <div className="p-2 bg-gray-900 border border-gray-800">
          <div className="text-gray-500 mb-1">Least Frequent</div>
          <div className="font-mono text-blue-400">
            {analysis.leastFrequent.length > 0
              ? analysis.leastFrequent.join(' ')
              : '—'}
          </div>
          <div className="text-gray-600 mt-1">English: Z Q X J K</div>
        </div>
      </div>

      {/* Quick Reference */}
      <details className="text-xs">
        <summary className="text-gray-500 cursor-pointer hover:text-gray-400">
          English Letter Frequencies
        </summary>
        <div className="mt-2 p-2 bg-gray-900 border border-gray-800 font-mono grid grid-cols-6 gap-1">
          {Object.entries(ENGLISH_FREQUENCIES)
            .sort((a, b) => b[1] - a[1])
            .map(([letter, freq]) => (
              <div key={letter} className="text-center">
                <span className="text-white">{letter}</span>
                <span className="text-gray-600">:{freq.toFixed(1)}</span>
              </div>
            ))}
        </div>
      </details>
    </div>
  );
};
