import { useIdentityStore } from '../store/identityStore';
import { NumerologyEngine } from '../numerology/NumerologyEngine';

const SYSTEM_LABELS: Record<string, string> = {
  pythagorean: 'Pythagorean',
  chaldean: 'Chaldean',
  gematria: 'Gematria'
};

export const NumerologyPanel: React.FC = () => {
  const profile = useIdentityStore(state => state.profile);

  if (!profile) {
    return (
      <div style={{ padding: '1rem', color: '#666', border: '1px solid #333', marginTop: '1rem' }}>
        Enter your name and birthdate to generate a numerology profile.
      </div>
    );
  }

  const formatValue = (value: number | null | undefined) => {
    if (value === null || value === undefined) return 'N/A';
    if (value === 11 || value === 22 || value === 33) {
      return `${value} ✦`; // Master number indicator
    }
    return String(value);
  };

  const items = [
    { label: 'Destiny', value: profile.destiny, tooltip: 'Derived from full name' },
    { label: 'Life Path', value: profile.lifePath, tooltip: 'Derived from birthdate' },
    { label: 'Soul Urge', value: profile.soulUrge, tooltip: 'Derived from vowels' },
    { label: 'Personality', value: profile.personality, tooltip: 'Derived from consonants' },
  ];

  return (
    <div style={{ padding: '1rem', border: '1px solid #333', marginTop: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0, color: '#00ff41' }}>Numerology Profile</h3>
        <span style={{ fontSize: '0.75rem', color: '#888', background: '#222', padding: '0.25rem 0.5rem' }}>
          {profile.system ? (SYSTEM_LABELS[profile.system] ?? profile.system) : 'Pythagorean'}
        </span>
      </div>

      <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: '1rem' }}>
        {NumerologyEngine.getSystemDescription(profile.system ?? 'pythagorean')}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        {items.map(item => (
          <div
            key={item.label}
            style={{ background: '#1a1a1a', padding: '0.75rem', textAlign: 'center', border: '1px solid #2a2a2a' }}
            title={item.tooltip}
          >
            <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {item.label}
            </div>
            <div style={{ fontSize: '1.5rem', color: '#00ff41', fontWeight: 'bold' }}>
              {formatValue(item.value)}
            </div>
          </div>
        ))}
      </div>

      {/* Raw sum is particularly meaningful in Gematria */}
      <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#666', textAlign: 'center' }}>
        Raw Sum: <span style={{ color: '#00ff41' }}>{profile.rawSum}</span>
        {profile.isMasterNumber && (
          <span style={{ marginLeft: '1rem', color: '#ffaa00' }}>✦ Master Number Present</span>
        )}
      </div>
    </div>
  );
};
