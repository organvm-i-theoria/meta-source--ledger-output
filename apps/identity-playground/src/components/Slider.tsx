import { useCallback, useRef, useEffect, useState } from 'react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  debounceMs?: number;
  formatValue?: (value: number) => string;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  debounceMs = 100,
  formatValue = (v) => String(v),
}) => {
  const [localValue, setLocalValue] = useState(value);
  const timeoutRef = useRef<number | null>(null);

  // Sync local value with prop
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value);
      setLocalValue(newValue);

      // Debounce the onChange callback
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        onChange(newValue);
      }, debounceMs);
    },
    [onChange, debounceMs]
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
        <label style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {label}
        </label>
        <span style={{ fontSize: '0.75rem', color: '#00ff41', fontFamily: 'monospace' }}>
          {formatValue(localValue)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={localValue}
        onChange={handleChange}
        style={{
          width: '100%',
          height: '4px',
          appearance: 'none',
          background: '#333',
          borderRadius: '2px',
          cursor: 'pointer',
        }}
      />
    </div>
  );
};
