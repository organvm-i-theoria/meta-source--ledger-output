import { useState, useCallback } from 'react';
import { useMythologyStore } from '../store/mythologyStore';
import {
  getSessionProgress,
  getRecommendationColor,
  getRecommendationLabel,
} from '../mythology/decisionMatrix';

export const DecisionPanel: React.FC = () => {
  const decisionSessions = useMythologyStore((s) => s.decisionSessions);
  const activeDecisionId = useMythologyStore((s) => s.activeDecisionId);
  const startDecision = useMythologyStore((s) => s.startDecision);
  const answerDecisionQuestion = useMythologyStore((s) => s.answerDecisionQuestion);
  const completeDecision = useMythologyStore((s) => s.completeDecision);
  const clearDecision = useMythologyStore((s) => s.clearDecision);
  const loadDecision = useMythologyStore((s) => s.loadDecision);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const activeSession = decisionSessions.find((s) => s.id === activeDecisionId);
  const progress = activeSession ? getSessionProgress(activeSession) : null;

  const handleStart = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (newTitle.trim()) {
        startDecision(newTitle.trim(), newDescription.trim() || undefined);
        setNewTitle('');
        setNewDescription('');
      }
    },
    [newTitle, newDescription, startDecision]
  );

  const filterColors = {
    core: '#9b59b6',
    engine: '#f39c12',
    interface: '#3498db',
  };

  const filterLabels = {
    core: 'Core (4) - Foundation',
    engine: 'Engine (7) - Analysis',
    interface: 'Interface (6) - Harmony',
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-sm font-bold text-purple-400 uppercase tracking-wide">
        Decision Matrix (4-7-6)
      </h2>

      {/* No Active Session */}
      {!activeSession && (
        <div className="space-y-3">
          {/* New Decision Form */}
          <form onSubmit={handleStart} className="space-y-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Decision title..."
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white text-sm placeholder-gray-600"
            />
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Description (optional)..."
              rows={2}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white text-sm placeholder-gray-600 resize-none"
            />
            <button
              type="submit"
              disabled={!newTitle.trim()}
              className="w-full py-2 bg-purple-600 text-white font-bold text-sm hover:bg-purple-500 disabled:bg-gray-700 disabled:text-gray-500"
            >
              START DECISION ANALYSIS
            </button>
          </form>

          {/* Previous Sessions */}
          {decisionSessions.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs text-gray-500">PREVIOUS DECISIONS</div>
              <div className="max-h-40 overflow-y-auto space-y-1">
                {decisionSessions.slice().reverse().map((session) => (
                  <button
                    key={session.id}
                    onClick={() => loadDecision(session.id)}
                    className="w-full p-2 bg-gray-900 border border-gray-800 text-left hover:border-gray-600"
                  >
                    <div className="text-sm text-white">{session.title}</div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>
                        {session.result
                          ? getRecommendationLabel(session.result.recommendation)
                          : 'In progress'}
                      </span>
                      <span>
                        {new Date(session.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Active Session */}
      {activeSession && (
        <div className="space-y-4">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <div className="text-white font-bold">{activeSession.title}</div>
              {activeSession.description && (
                <div className="text-xs text-gray-500">{activeSession.description}</div>
              )}
            </div>
            <button
              onClick={clearDecision}
              className="text-xs text-gray-500 hover:text-gray-300"
            >
              ✕ Close
            </button>
          </div>

          {/* Result Display */}
          {activeSession.result && (
            <div
              className="p-3 border"
              style={{
                borderColor: getRecommendationColor(activeSession.result.recommendation),
                backgroundColor: `${getRecommendationColor(activeSession.result.recommendation)}20`,
              }}
            >
              <div
                className="text-lg font-bold"
                style={{ color: getRecommendationColor(activeSession.result.recommendation) }}
              >
                {getRecommendationLabel(activeSession.result.recommendation)}
              </div>
              <div className="text-2xl font-mono text-white mt-1">
                {activeSession.result.score}/12
              </div>
              <div className="text-sm text-gray-300 mt-2">
                {activeSession.result.feedback}
              </div>
              {activeSession.result.failedFilters.length > 0 && (
                <div className="mt-2 text-xs text-gray-400">
                  Weak areas:{' '}
                  {activeSession.result.failedFilters
                    .map((f) => filterLabels[f])
                    .join(', ')}
                </div>
              )}
            </div>
          )}

          {/* Progress */}
          {progress && !activeSession.result && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Progress</span>
                <span className="text-gray-400">{progress.percentage}%</span>
              </div>
              <div className="h-2 bg-gray-800 rounded overflow-hidden">
                <div
                  className="h-full bg-purple-500 transition-all"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Questions */}
          {!activeSession.result && (
            <div className="space-y-4">
              {(['core', 'engine', 'interface'] as const).map((filter) => {
                const filterQuestions = activeSession.questions.filter(
                  (q) => q.filter === filter
                );
                const answered = filterQuestions.filter((q) => q.answer !== undefined).length;

                return (
                  <div key={filter} className="space-y-2">
                    <div
                      className="text-xs font-bold flex justify-between"
                      style={{ color: filterColors[filter] }}
                    >
                      <span>{filterLabels[filter]}</span>
                      <span>{answered}/{filterQuestions.length}</span>
                    </div>
                    {filterQuestions.map((q) => {
                      const globalIdx = activeSession.questions.indexOf(q);
                      return (
                        <div
                          key={globalIdx}
                          className="p-2 bg-gray-900 border border-gray-800"
                        >
                          <div className="text-sm text-gray-300 mb-2">
                            {q.question}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => answerDecisionQuestion(globalIdx, true)}
                              className={`flex-1 py-1 text-sm border ${
                                q.answer === true
                                  ? 'bg-green-900 border-green-500 text-green-400'
                                  : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500'
                              }`}
                            >
                              YES
                            </button>
                            <button
                              onClick={() => answerDecisionQuestion(globalIdx, false)}
                              className={`flex-1 py-1 text-sm border ${
                                q.answer === false
                                  ? 'bg-red-900 border-red-500 text-red-400'
                                  : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500'
                              }`}
                            >
                              NO
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              {/* Complete Button */}
              {progress && progress.percentage === 100 && (
                <button
                  onClick={completeDecision}
                  className="w-full py-3 bg-purple-600 text-white font-bold text-sm hover:bg-purple-500"
                >
                  CALCULATE RESULT
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
