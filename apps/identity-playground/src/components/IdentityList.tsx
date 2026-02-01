import { useCallback, useState } from 'react';
import { useAppStore } from '../store/appStore';
import { useIdentityStore } from '../store/identityStore';

export const IdentityList: React.FC = () => {
  const savedIdentities = useAppStore((state) => state.savedIdentities);
  const deleteIdentity = useAppStore((state) => state.deleteIdentity);
  const clearAllIdentities = useAppStore((state) => state.clearAllIdentities);

  const currentIdentity = useIdentityStore((state) => state.identity);
  const setIdentity = useIdentityStore((state) => state.setIdentity);

  const [confirmClear, setConfirmClear] = useState(false);

  const handleLoad = useCallback(
    (id: string) => {
      const identity = savedIdentities.find((i) => i.id === id);
      if (identity) {
        setIdentity(identity);
      }
    },
    [savedIdentities, setIdentity]
  );

  const handleDelete = useCallback(
    (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      deleteIdentity(id);
    },
    [deleteIdentity]
  );

  const handleClearAll = useCallback(() => {
    if (confirmClear) {
      clearAllIdentities();
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
    }
  }, [confirmClear, clearAllIdentities]);

  if (savedIdentities.length === 0) {
    return (
      <div style={{ padding: '1rem', border: '1px solid #333', marginTop: '1rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#00ff41', fontSize: '0.9rem' }}>
          Saved Identities
        </h3>
        <div style={{ fontSize: '0.75rem', color: '#666' }}>
          No saved identities. Generate one and click Save.
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem', border: '1px solid #333', marginTop: '1rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.75rem',
        }}
      >
        <h3 style={{ margin: 0, color: '#00ff41', fontSize: '0.9rem' }}>
          Saved Identities ({savedIdentities.length})
        </h3>
        <button
          onClick={handleClearAll}
          style={{
            padding: '0.25rem 0.5rem',
            background: confirmClear ? '#ff4141' : 'transparent',
            color: confirmClear ? '#fff' : '#666',
            border: '1px solid #444',
            fontSize: '0.65rem',
            cursor: 'pointer',
          }}
        >
          {confirmClear ? 'CONFIRM CLEAR' : 'CLEAR ALL'}
        </button>
      </div>

      <div
        style={{
          maxHeight: '200px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
        }}
      >
        {savedIdentities.map((identity) => {
          const identityId = identity.id ?? '';
          const isActive = currentIdentity?.id === identityId;
          const dateStr = identity.createdAt ? new Date(identity.createdAt).toLocaleDateString() : '';

          return (
            <div
              key={identityId}
              onClick={() => identityId && handleLoad(identityId)}
              style={{
                padding: '0.5rem',
                background: isActive ? '#1a2a1a' : '#1a1a1a',
                border: isActive ? '1px solid #00ff41' : '1px solid #333',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: '0.8rem',
                    color: isActive ? '#00ff41' : '#ccc',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {identity.name}
                </div>
                <div style={{ fontSize: '0.65rem', color: '#666' }}>
                  {dateStr}
                  {identity.birthdate && ` • ${identity.birthdate}`}
                </div>
              </div>
              <button
                onClick={(e) => identityId && handleDelete(identityId, e)}
                style={{
                  padding: '0.25rem 0.5rem',
                  background: 'transparent',
                  color: '#ff4141',
                  border: 'none',
                  fontSize: '0.7rem',
                  cursor: 'pointer',
                  opacity: 0.6,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.6')}
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
