import { useCallback } from 'react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

// Preset colors for quick selection
const PRESETS = [
  { color: '#00ff41', name: 'Matrix Green' },
  { color: '#ff4141', name: 'Alert Red' },
  { color: '#4169e1', name: 'Royal Blue' },
  { color: '#ffd700', name: 'Gold' },
  { color: '#ff69b4', name: 'Hot Pink' },
  { color: '#00ffff', name: 'Cyan' },
  { color: '#ff8c00', name: 'Dark Orange' },
  { color: '#9400d3', name: 'Violet' },
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange }) => {
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const handlePresetClick = useCallback(
    (color: string) => {
      onChange(color);
    },
    [onChange]
  );

  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <label style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {label}
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.7rem', color: '#666', fontFamily: 'monospace' }}>{value}</span>
          <input
            type="color"
            value={value}
            onChange={handleInputChange}
            style={{
              width: '24px',
              height: '24px',
              padding: 0,
              border: '1px solid #444',
              borderRadius: '2px',
              cursor: 'pointer',
              background: 'transparent',
            }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
        {PRESETS.map((preset) => (
          <button
            key={preset.color}
            onClick={() => handlePresetClick(preset.color)}
            title={preset.name}
            style={{
              width: '20px',
              height: '20px',
              background: preset.color,
              border: value === preset.color ? '2px solid #fff' : '1px solid #444',
              borderRadius: '2px',
              cursor: 'pointer',
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
};
