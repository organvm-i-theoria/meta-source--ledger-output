import { useMythologyStore } from '../store/mythologyStore';
import { FOUR_AS_INFO, getWorkflowRecommendation } from '../mythology/fourAs';
import type { FourAsDomain } from '@meta-source/core';

const DOMAINS: FourAsDomain[] = ['auctor', 'ars', 'archive', 'apparatus'];

export const FourAsPanel: React.FC = () => {
  const fourAs = useMythologyStore((s) => s.fourAs);
  const toggleFourAsDomain = useMythologyStore((s) => s.toggleFourAsDomain);
  const setFourAsFocus = useMythologyStore((s) => s.setFourAsFocus);

  const recommendation = getWorkflowRecommendation(fourAs);
  const activeCount = Object.values(fourAs.active).filter(Boolean).length;

  return (
    <div className="p-4 border-b border-purple-900 space-y-4">
      <h2 className="text-sm font-bold text-purple-400 uppercase tracking-wide">
        Four As Governance
      </h2>

      {/* Domain Grid */}
      <div className="grid grid-cols-2 gap-2">
        {DOMAINS.map((domain) => {
          const info = FOUR_AS_INFO[domain];
          const isActive = fourAs.active[domain];
          const isFocus = fourAs.focus === domain;

          return (
            <div
              key={domain}
              className={`p-3 border cursor-pointer transition-all ${
                isActive
                  ? 'bg-opacity-20 border-opacity-60'
                  : 'bg-gray-900 border-gray-800 opacity-50'
              } ${isFocus ? 'ring-2 ring-offset-1 ring-offset-black' : ''}`}
              style={{
                backgroundColor: isActive ? `${info.color}20` : undefined,
                borderColor: isActive ? info.color : undefined,
              }}
              onClick={() => {
                if (isActive) {
                  setFourAsFocus(domain);
                } else {
                  toggleFourAsDomain(domain);
                }
              }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div
                    className="font-bold text-sm"
                    style={{ color: isActive ? info.color : '#666' }}
                  >
                    {info.name}
                  </div>
                  <div className="text-xs text-gray-500">{info.latin}</div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFourAsDomain(domain);
                  }}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs ${
                    isActive ? 'border-current' : 'border-gray-600'
                  }`}
                  style={{ borderColor: isActive ? info.color : undefined }}
                >
                  {isActive && (
                    <span style={{ color: info.color }}>✓</span>
                  )}
                </button>
              </div>
              <div
                className="text-xs mt-1"
                style={{ color: isActive ? info.color : '#555' }}
              >
                {info.focus}
              </div>
              {isFocus && (
                <div className="text-xs mt-1 text-yellow-500">★ Focus</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Active Count */}
      <div className="flex justify-between text-xs">
        <span className="text-gray-500">Active Domains:</span>
        <span className={activeCount > 0 ? 'text-green-400' : 'text-gray-600'}>
          {activeCount}/4
        </span>
      </div>

      {/* Workflow Recommendation */}
      <div className="p-2 bg-gray-900 border border-gray-800 text-xs">
        <div className="text-gray-500 mb-1">WORKFLOW MODE</div>
        <div className="text-gray-300">{recommendation}</div>
      </div>

      {/* Legend */}
      <details className="text-xs">
        <summary className="text-gray-500 cursor-pointer hover:text-gray-400">
          About the Four As
        </summary>
        <div className="mt-2 space-y-2">
          {DOMAINS.map((domain) => {
            const info = FOUR_AS_INFO[domain];
            return (
              <div key={domain} className="p-2 bg-gray-950 border border-gray-900">
                <div style={{ color: info.color }} className="font-bold">
                  {info.name} ({info.latin})
                </div>
                <div className="text-gray-400 mt-1">{info.description}</div>
                <div className="text-gray-500 mt-1">
                  Key questions:
                  <ul className="list-disc list-inside ml-2">
                    {info.questions.slice(0, 2).map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </details>
    </div>
  );
};
