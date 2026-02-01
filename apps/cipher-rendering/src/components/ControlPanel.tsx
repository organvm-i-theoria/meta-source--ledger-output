import { useEffect, useRef } from 'react';
import { useCipherStore } from '../store/cipherStore';

export const ControlPanel: React.FC = () => {
  const currentState = useCipherStore((s) => s.currentState);
  const history = useCipherStore((s) => s.history);
  const historyIndex = useCipherStore((s) => s.historyIndex);
  const plaintext = useCipherStore((s) => s.plaintext);
  const isPlaying = useCipherStore((s) => s.isPlaying);
  const playSpeed = useCipherStore((s) => s.playSpeed);

  const stepForward = useCipherStore((s) => s.stepForward);
  const stepBack = useCipherStore((s) => s.stepBack);
  const play = useCipherStore((s) => s.play);
  const pause = useCipherStore((s) => s.pause);
  const reset = useCipherStore((s) => s.reset);
  const setPlaySpeed = useCipherStore((s) => s.setPlaySpeed);
  const encryptAll = useCipherStore((s) => s.encryptAll);
  const goToStep = useCipherStore((s) => s.goToStep);

  const playIntervalRef = useRef<number | null>(null);

  const canStepBack = historyIndex > 0;
  const canStepForward = currentState && currentState.plaintext.length < plaintext.length;
  const isComplete = !!(currentState && currentState.plaintext.length === plaintext.length);

  // Playback loop
  useEffect(() => {
    if (isPlaying && canStepForward) {
      playIntervalRef.current = window.setInterval(() => {
        stepForward();
      }, playSpeed);
    } else if (isPlaying && !canStepForward) {
      pause();
    }

    return () => {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    };
  }, [isPlaying, canStepForward, playSpeed, stepForward, pause]);

  if (!currentState || !plaintext) {
    return (
      <div className="p-4 border-t border-green-900">
        <p className="text-xs text-gray-600">Select a cipher and enter plaintext to begin</p>
      </div>
    );
  }

  return (
    <div className="p-4 border-t border-green-900 space-y-4">
      <h2 className="text-sm font-bold text-green-500 uppercase tracking-wide">
        Playback Controls
      </h2>

      {/* Step Controls */}
      <div className="flex gap-2">
        <button
          onClick={reset}
          className="flex-1 py-2 bg-gray-800 text-gray-400 text-xs font-bold border border-gray-700 hover:bg-gray-700"
        >
          RESET
        </button>
        <button
          onClick={stepBack}
          disabled={!canStepBack}
          className="flex-1 py-2 bg-gray-800 text-gray-400 text-xs font-bold border border-gray-700 hover:bg-gray-700 disabled:opacity-30"
        >
          ◀ BACK
        </button>
        <button
          onClick={stepForward}
          disabled={!canStepForward}
          className="flex-1 py-2 bg-gray-800 text-gray-400 text-xs font-bold border border-gray-700 hover:bg-gray-700 disabled:opacity-30"
        >
          NEXT ▶
        </button>
      </div>

      {/* Play/Pause */}
      <div className="flex gap-2">
        {isPlaying ? (
          <button
            onClick={pause}
            className="flex-1 py-2 bg-yellow-600 text-black text-sm font-bold"
          >
            ⏸ PAUSE
          </button>
        ) : (
          <button
            onClick={play}
            disabled={!canStepForward}
            className="flex-1 py-2 bg-green-600 text-black text-sm font-bold disabled:bg-gray-700 disabled:text-gray-500"
          >
            ▶ PLAY
          </button>
        )}
        <button
          onClick={encryptAll}
          disabled={isComplete}
          className="flex-1 py-2 bg-gray-800 text-gray-400 text-sm font-bold border border-gray-700 disabled:opacity-30"
        >
          ⏭ SKIP
        </button>
      </div>

      {/* Speed Control */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">
          Speed: {playSpeed}ms/step
        </label>
        <input
          type="range"
          min="100"
          max="1000"
          step="100"
          value={playSpeed}
          onChange={(e) => setPlaySpeed(Number(e.target.value))}
          className="w-full accent-green-500"
        />
        <div className="flex justify-between text-xs text-gray-600">
          <span>Fast</span>
          <span>Slow</span>
        </div>
      </div>

      {/* Timeline */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">
          Timeline: Step {historyIndex} / {plaintext.length}
        </label>
        <input
          type="range"
          min="0"
          max={history.length - 1}
          value={historyIndex}
          onChange={(e) => goToStep(Number(e.target.value))}
          className="w-full accent-green-500"
        />
      </div>

      {/* Status */}
      {isComplete && (
        <div className="p-2 bg-green-900/30 border border-green-700 text-green-400 text-xs text-center">
          ✓ ENCRYPTION COMPLETE
        </div>
      )}
    </div>
  );
};
