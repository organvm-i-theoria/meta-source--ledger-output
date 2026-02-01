import { useCallback } from 'react';
import { useVisualStore } from '../store/visualStore';
import { Slider } from './Slider';
import { ColorPicker } from './ColorPicker';

export const ParameterPanel: React.FC = () => {
  const config = useVisualStore((state) => state.config);
  const setConfig = useVisualStore((state) => state.setConfig);
  const isPlaying = useVisualStore((state) => state.isPlaying);
  const play = useVisualStore((state) => state.play);
  const pause = useVisualStore((state) => state.pause);
  const reset = useVisualStore((state) => state.reset);

  const handlePointCountChange = useCallback(
    (value: number) => setConfig({ pointCount: Math.round(value) }),
    [setConfig]
  );

  const handleSpeedChange = useCallback(
    (value: number) => setConfig({ animationSpeed: value }),
    [setConfig]
  );

  const handleColorChange = useCallback(
    (value: string) => setConfig({ colorPrimary: value }),
    [setConfig]
  );

  return (
    <div style={{ padding: '1rem', border: '1px solid #333', marginTop: '1rem' }}>
      <h3 style={{ margin: '0 0 1rem 0', color: '#00ff41', fontSize: '0.9rem' }}>Visual Parameters</h3>

      <Slider
        label="Point Count"
        value={config.pointCount}
        min={50}
        max={1000}
        step={10}
        onChange={handlePointCountChange}
        formatValue={(v) => String(Math.round(v))}
      />

      <Slider
        label="Animation Speed"
        value={config.animationSpeed}
        min={0.1}
        max={2.0}
        step={0.1}
        onChange={handleSpeedChange}
        formatValue={(v) => `${v.toFixed(1)}x`}
      />

      <ColorPicker label="Primary Color" value={config.colorPrimary} onChange={handleColorChange} />

      {/* Render Mode Toggle */}
      <div style={{ marginTop: '1rem', marginBottom: '0.75rem' }}>
        <label style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
          Render Mode
        </label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setConfig({ mode: '2d' })}
            style={{
              flex: 1,
              padding: '0.5rem',
              background: config.mode === '2d' ? '#00ff41' : '#222',
              color: config.mode === '2d' ? '#000' : '#888',
              border: '1px solid #444',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: config.mode === '2d' ? 'bold' : 'normal',
            }}
          >
            2D (p5.js)
          </button>
          <button
            onClick={() => setConfig({ mode: '3d' })}
            style={{
              flex: 1,
              padding: '0.5rem',
              background: config.mode === '3d' ? '#00ff41' : '#222',
              color: config.mode === '3d' ? '#000' : '#888',
              border: '1px solid #444',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: config.mode === '3d' ? 'bold' : 'normal',
            }}
          >
            3D (Three.js)
          </button>
        </div>
      </div>

      {/* Playback Controls */}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <button
          onClick={isPlaying ? pause : play}
          style={{
            flex: 1,
            padding: '0.5rem',
            background: '#222',
            color: '#00ff41',
            border: '1px solid #00ff41',
            cursor: 'pointer',
            fontSize: '0.75rem',
          }}
        >
          {isPlaying ? 'PAUSE' : 'PLAY'}
        </button>
        <button
          onClick={reset}
          style={{
            flex: 1,
            padding: '0.5rem',
            background: '#222',
            color: '#888',
            border: '1px solid #444',
            cursor: 'pointer',
            fontSize: '0.75rem',
          }}
        >
          RESET
        </button>
      </div>
    </div>
  );
};
