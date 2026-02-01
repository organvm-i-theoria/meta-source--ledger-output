import { useState, useCallback } from 'react';
import { useMythologyStore } from '../store/mythologyStore';
import { PHI, PHI_OPERATOR_INFO } from '../mythology/phiOperators';
import type { PhiOperator } from '@meta-source/core';

export const PhiPanel: React.FC = () => {
  const phiValue = useMythologyStore((s) => s.phiValue);
  const phiHistory = useMythologyStore((s) => s.phiHistory);
  const setPhiValue = useMythologyStore((s) => s.setPhiValue);
  const applyPhi = useMythologyStore((s) => s.applyPhi);
  const clearPhiHistory = useMythologyStore((s) => s.clearPhiHistory);

  const [inputValue, setInputValue] = useState(phiValue.toString());
  const [secondValue, setSecondValue] = useState('50');

  const handleValueSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const num = parseFloat(inputValue);
      if (!isNaN(num) && num > 0) {
        setPhiValue(num);
      }
    },
    [inputValue, setPhiValue]
  );

  const handleOperator = useCallback(
    (operator: PhiOperator) => {
      const params: { secondValue?: number; steps?: number; phase?: number } = {};

      if (operator === 'phi_blend') {
        params.secondValue = parseFloat(secondValue) || 50;
      }
      if (operator === 'phi_recurse' || operator === 'phi_project' || operator === 'phi_retro') {
        params.steps = 5;
      }
      if (operator === 'phi_cycle') {
        params.phase = (phiHistory.length % 4);
      }

      applyPhi(operator, params);
    },
    [applyPhi, secondValue, phiHistory.length]
  );

  // Common operators for quick access
  const quickOperators: PhiOperator[] = [
    'phi_plus',
    'phi_minus',
    'phi_approx',
    'phi_blend',
  ];

  return (
    <div className="p-4 border-b border-purple-900 space-y-4">
      <h2 className="text-sm font-bold text-purple-400 uppercase tracking-wide">
        φ Operators
      </h2>

      {/* Phi Constant */}
      <div className="text-xs text-gray-500 font-mono">
        φ (phi) = {PHI.toFixed(10)}...
      </div>

      {/* Current Value */}
      <div className="p-3 bg-gray-900 border border-gray-800">
        <div className="text-xs text-gray-500 mb-1">CURRENT VALUE</div>
        <div className="text-2xl font-mono text-yellow-400">
          {phiValue.toFixed(4)}
        </div>
      </div>

      {/* Value Input */}
      <form onSubmit={handleValueSubmit} className="flex gap-2">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          step="any"
          min="0.0001"
          className="flex-1 px-2 py-1 bg-gray-900 border border-gray-700 text-white text-sm font-mono"
        />
        <button
          type="submit"
          className="px-3 py-1 bg-gray-800 text-gray-300 text-xs hover:bg-gray-700"
        >
          SET
        </button>
      </form>

      {/* Quick Operators */}
      <div className="space-y-2">
        <div className="text-xs text-gray-500">QUICK OPERATORS</div>
        <div className="grid grid-cols-4 gap-1">
          {quickOperators.map((opId) => {
            const op = PHI_OPERATOR_INFO.find((o) => o.id === opId);
            if (!op) return null;

            return (
              <button
                key={op.id}
                onClick={() => handleOperator(op.id)}
                className="p-2 bg-purple-900/30 border border-purple-800 text-purple-300 text-sm font-mono hover:bg-purple-900/50"
                title={op.description}
              >
                {op.symbol}
              </button>
            );
          })}
        </div>
      </div>

      {/* Blend Second Value */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-gray-500">Blend with:</span>
        <input
          type="number"
          value={secondValue}
          onChange={(e) => setSecondValue(e.target.value)}
          className="w-20 px-2 py-1 bg-gray-900 border border-gray-700 text-white text-xs font-mono"
        />
      </div>

      {/* All Operators */}
      <details>
        <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-400">
          All φ Operators ({PHI_OPERATOR_INFO.length})
        </summary>
        <div className="mt-2 grid grid-cols-3 gap-1">
          {PHI_OPERATOR_INFO.map((op) => (
            <button
              key={op.id}
              onClick={() => handleOperator(op.id)}
              className="p-2 bg-gray-900 border border-gray-800 text-xs hover:border-purple-700 group"
              title={op.description}
            >
              <div className="font-mono text-purple-400">{op.symbol}</div>
              <div className="text-gray-500 group-hover:text-gray-300 truncate">
                {op.name}
              </div>
            </button>
          ))}
        </div>
      </details>

      {/* History */}
      {phiHistory.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">HISTORY</span>
            <button
              onClick={clearPhiHistory}
              className="text-xs text-gray-600 hover:text-gray-400"
            >
              Clear
            </button>
          </div>
          <div className="max-h-32 overflow-y-auto space-y-1">
            {phiHistory.slice(-10).reverse().map((entry, i) => {
              const op = PHI_OPERATOR_INFO.find((o) => o.id === entry.operator);
              const outputStr = Array.isArray(entry.output)
                ? `[${entry.output.map((n) => n.toFixed(2)).join(', ')}]`
                : entry.output.toFixed(4);

              return (
                <div
                  key={i}
                  className="text-xs font-mono flex items-center gap-2 p-1 bg-gray-950"
                >
                  <span className="text-gray-500">{entry.input.toFixed(2)}</span>
                  <span className="text-purple-400">{op?.symbol}</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-yellow-400">{outputStr}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
