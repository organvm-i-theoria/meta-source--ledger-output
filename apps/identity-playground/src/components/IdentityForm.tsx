import { useState, useCallback } from 'react';
import { useIdentityStore } from '../store/identityStore';
import { useAppStore } from '../store/appStore';
import { isValidName } from '../utils/validation';
import type { NumerologySystem } from '../core/types';

const MAX_IDENTITIES = 50;

const SYSTEMS: { value: NumerologySystem; label: string; description: string }[] = [
  { value: 'pythagorean', label: 'Pythagorean', description: 'Western (A=1..I=9 cycle)' },
  { value: 'chaldean', label: 'Chaldean', description: 'Babylonian (1-8, no 9)' },
  { value: 'gematria', label: 'Gematria', description: 'Hebrew-style (A=1..Z=26)' },
];

export const IdentityForm: React.FC = () => {
  const setIdentity = useIdentityStore((state) => state.setIdentity);
  const calculateProfile = useIdentityStore((state) => state.calculateProfile);
  const currentSystem = useAppStore((state) => state.currentSystem);
  const setSystem = useAppStore((state) => state.setSystem);
  const saveIdentity = useAppStore((state) => state.saveIdentity);
  const savedIdentities = useAppStore((state) => state.savedIdentities);
  const identity = useIdentityStore((state) => state.identity);

  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [error, setError] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'exists' | 'full'>('idle');

  const isAlreadySaved = identity
    ? savedIdentities.some((i) => i.id === identity.id)
    : false;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidName(name)) {
      setError('Please enter a valid name (letters only).');
      return;
    }

    if (!birthdate) {
      setError('Birthdate is required for life path calculation.');
      return;
    }

    setError('');

    setIdentity({
      id: crypto.randomUUID(),
      name,
      birthdate,
      meaningfulWords: [],
      createdAt: Date.now()
    });
  };

  const handleSystemChange = (newSystem: NumerologySystem) => {
    setSystem(newSystem);
    // Recalculate profile with new system if identity exists
    if (identity) {
      calculateProfile(newSystem);
    }
  };

  const handleSave = useCallback(() => {
    if (!identity) return;

    if (isAlreadySaved) {
      setSaveStatus('exists');
      setTimeout(() => setSaveStatus('idle'), 2000);
      return;
    }

    if (savedIdentities.length >= MAX_IDENTITIES) {
      setSaveStatus('full');
      setTimeout(() => setSaveStatus('idle'), 2000);
      return;
    }

    const success = saveIdentity(identity);
    if (success) {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }
  }, [identity, isAlreadySaved, savedIdentities.length, saveIdentity]);

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', border: '1px solid #333' }}>
      <h3 style={{ margin: 0, color: '#00ff41' }}>Identity Input</h3>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', background: '#222', border: '1px solid #444', color: '#fff', boxSizing: 'border-box' }}
          placeholder="Jane Doe"
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Birth Date</label>
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', background: '#222', border: '1px solid #444', color: '#fff', boxSizing: 'border-box' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Numerology System</label>
        <select
          value={currentSystem}
          onChange={(e) => handleSystemChange(e.target.value as NumerologySystem)}
          style={{ width: '100%', padding: '0.5rem', background: '#222', border: '1px solid #444', color: '#fff', boxSizing: 'border-box' }}
        >
          {SYSTEMS.map(sys => (
            <option key={sys.value} value={sys.value}>
              {sys.label} - {sys.description}
            </option>
          ))}
        </select>
      </div>

      {error && <div style={{ color: '#ff4141', fontSize: '0.9rem' }}>{error}</div>}

      <button
        type="submit"
        style={{
          padding: '0.75rem',
          background: '#00ff41',
          color: '#000',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '0.9rem',
          letterSpacing: '0.05em',
        }}
      >
        GENERATE IDENTITY
      </button>

      {identity && (
        <button
          type="button"
          onClick={handleSave}
          disabled={isAlreadySaved}
          style={{
            padding: '0.5rem',
            background: isAlreadySaved ? '#333' : '#222',
            color: isAlreadySaved ? '#666' : '#00ff41',
            border: '1px solid #00ff41',
            cursor: isAlreadySaved ? 'not-allowed' : 'pointer',
            fontSize: '0.8rem',
          }}
        >
          {saveStatus === 'saved'
            ? '✓ SAVED'
            : saveStatus === 'exists'
              ? 'ALREADY SAVED'
              : saveStatus === 'full'
                ? `LIMIT REACHED (${MAX_IDENTITIES})`
                : isAlreadySaved
                  ? '✓ SAVED'
                  : 'SAVE IDENTITY'}
        </button>
      )}
    </form>
  );
};
