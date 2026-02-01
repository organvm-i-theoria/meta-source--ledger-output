import { useState, useCallback } from 'react';
import { useMythologyStore } from '../store/mythologyStore';
import { getNumerologyMeaning } from '../mythology/tokenParser';

export const TokenPanel: React.FC = () => {
  const token = useMythologyStore((s) => s.token); // allow-secret (mythology token, not credential)
  const stack = useMythologyStore((s) => s.stack);
  const masterSeed = useMythologyStore((s) => s.masterSeed);
  const setToken = useMythologyStore((s) => s.setToken);
  const clearToken = useMythologyStore((s) => s.clearToken);

  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      if (inputValue.trim().length < 3) {
        setError('Token must be at least 3 characters');
        return;
      }

      try {
        setToken(inputValue.trim());
        setInputValue('');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Invalid token');
      }
    },
    [inputValue, setToken]
  );

  return (
    <div className="p-4 border-b border-purple-900 space-y-4">
      <h2 className="text-sm font-bold text-purple-400 uppercase tracking-wide">
        Identity Token
      </h2>

      {/* Token Input */}
      {!token && (
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter token (e.g., 4444jPP)"
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-purple-300 text-sm placeholder-gray-600"
          />
          <button
            type="submit"
            className="w-full py-2 bg-purple-600 text-white font-bold text-sm hover:bg-purple-500"
          >
            ANALYZE TOKEN
          </button>
          {error && <div className="text-xs text-red-400">{error}</div>}
          <div className="text-xs text-gray-600">
            Default: 4444jPP (BLOCK-HINGE-POSTS pattern)
          </div>
        </form>
      )}

      {/* Token Display */}
      {token && (
        <div className="space-y-3">
          {/* Decomposition */}
          <div className="p-3 bg-purple-950/30 border border-purple-800">
            <div className="text-xs text-gray-500 mb-2">DECOMPOSITION</div>
            <div className="flex items-center justify-center gap-1 text-2xl font-mono">
              <span className="text-purple-400" title="BLOCK (Foundation)">
                {token.block}
              </span>
              <span className="text-yellow-400" title="HINGE (Connection)">
                {token.hinge}
              </span>
              <span className="text-cyan-400" title="POSTS (Interface)">
                {token.posts}
              </span>
            </div>
            <div className="flex justify-center gap-4 mt-2 text-xs">
              <span className="text-purple-400">BLOCK</span>
              <span className="text-yellow-400">HINGE</span>
              <span className="text-cyan-400">POSTS</span>
            </div>
          </div>

          {/* Numerological Stack */}
          {stack && (
            <div className="p-3 bg-gray-900 border border-gray-800">
              <div className="text-xs text-gray-500 mb-2">NUMEROLOGICAL STACK</div>
              <div className="flex justify-center gap-2 text-3xl font-mono font-bold">
                <span className="text-purple-400">{stack.core}</span>
                <span className="text-gray-600">-</span>
                <span className="text-yellow-400">{stack.engine}</span>
                <span className="text-gray-600">-</span>
                <span className="text-cyan-400">{stack.interface}</span>
              </div>
              <div className="mt-3 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Core ({stack.core}):</span>
                  <span className="text-purple-300">{getNumerologyMeaning(stack.core)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Engine ({stack.engine}):</span>
                  <span className="text-yellow-300">{getNumerologyMeaning(stack.engine)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Interface ({stack.interface}):</span>
                  <span className="text-cyan-300">{getNumerologyMeaning(stack.interface)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Master Seed */}
          {masterSeed && (
            <div className="text-xs">
              <span className="text-gray-500">Master Seed: </span>
              <span className="font-mono text-green-400">{masterSeed}</span>
            </div>
          )}

          {/* Clear Button */}
          <button
            onClick={clearToken}
            className="w-full py-1 text-xs text-gray-500 border border-gray-800 hover:border-gray-600 hover:text-gray-300"
          >
            Clear Token
          </button>
        </div>
      )}
    </div>
  );
};
