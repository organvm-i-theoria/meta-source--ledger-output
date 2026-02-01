import React from 'react';
import { useIdentityStore } from '../store/identityStore';

export const NumerologyPanel: React.FC = () => {
    const profile = useIdentityStore(state => state.profile);

    if (!profile) return <div style={{padding: '1rem', color: '#666'}}>No identity generated yet.</div>;

    const items = [
        { label: 'Destiny', value: profile.destiny },
        { label: 'Life Path', value: profile.lifePath },
        { label: 'Soul Urge', value: profile.soulUrge },
        { label: 'Personality', value: profile.personality },
    ];

    return (
        <div style={{ padding: '1rem', border: '1px solid #333', marginTop: '1rem' }}>
            <h3>Numerology Profile ({profile.system})</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {items.map(item => (
                    <div key={item.label} style={{ background: '#222', padding: '0.5rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.8rem', color: '#888' }}>{item.label}</div>
                        <div style={{ fontSize: '1.5rem', color: '#00ff41' }}>
                            {item.value === 11 || item.value === 22 || item.value === 33 ? `${item.value} (Master)` : item.value}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
