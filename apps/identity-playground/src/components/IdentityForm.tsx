import React, { useState } from 'react';
import { useIdentityStore } from '../store/identityStore';
import { isValidName } from '../utils/validation';

export const IdentityForm: React.FC = () => {
    const setIdentity = useIdentityStore(state => state.setIdentity);
    const [name, setName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!isValidName(name)) {
            setError('Please enter a valid name (letters only).');
            return;
        }
        
        if (!birthdate) {
            setError('Birthdate is required for MVP.');
            return;
        }
        
        setError('');
        
        setIdentity({
            id: crypto.randomUUID(),
            name,
            birthdate,
            meaningfulWords: [],
            created: new Date(),
            updated: new Date()
        });
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', border: '1px solid #333' }}>
            <h3>Identity Input</h3>
            <div>
                <label style={{display: 'block', marginBottom: '0.5rem'}}>Full Name</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    style={{width: '100%', padding: '0.5rem', background: '#222', border: '1px solid #444', color: '#fff'}}
                    placeholder="Jane Doe"
                />
            </div>
            <div>
                <label style={{display: 'block', marginBottom: '0.5rem'}}>Birth Date</label>
                <input 
                    type="date" 
                    value={birthdate} 
                    onChange={(e) => setBirthdate(e.target.value)}
                    style={{width: '100%', padding: '0.5rem', background: '#222', border: '1px solid #444', color: '#fff'}}
                />
            </div>
            {error && <div style={{color: 'red'}}>{error}</div>}
            <button type="submit" style={{padding: '0.5rem', background: '#00ff41', color: '#000', border: 'none', cursor: 'pointer', fontWeight: 'bold'}}>
                GENERATE IDENTITY
            </button>
        </form>
    );
};
