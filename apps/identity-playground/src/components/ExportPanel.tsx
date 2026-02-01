import { useState, useCallback } from 'react';
import { useVisualStore } from '../store/visualStore';
import { useIdentityStore } from '../store/identityStore';
import {
  exportCanvasToPNG,
  exportWebGLToPNG,
  generateExportMetadata,
  generateFilename,
  type ExportResolution,
} from '../export';
import { encodeSeed, type IdentitySeed } from '@meta-source/core';
import { hashIdentity } from '@meta-source/utils';

const RESOLUTIONS: { value: ExportResolution; label: string }[] = [
  { value: 1, label: '1x (Standard)' },
  { value: 2, label: '2x (High)' },
  { value: 4, label: '4x (Ultra)' },
];

export const ExportPanel: React.FC = () => {
  const config = useVisualStore((state) => state.config);
  const identity = useIdentityStore((state) => state.identity);
  const profile = useIdentityStore((state) => state.profile);

  const [resolution, setResolution] = useState<ExportResolution>(2);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExportPNG = useCallback(async () => {
    if (!identity || !profile) {
      setError('Generate an identity first');
      return;
    }

    setIsExporting(true);
    setError(null);

    try {
      // Find the canvas container based on current mode
      const containerId = config.mode === '2d' ? 'canvas-container' : 'canvas-container-3d';
      const container = document.getElementById(containerId);

      if (!container) {
        throw new Error('Canvas container not found');
      }

      // Generate metadata and filename
      const metadata = generateExportMetadata(identity, profile, config, resolution);
      const filename = generateFilename('identity', profile, 'png');

      // Export based on mode
      if (config.mode === '2d') {
        await exportCanvasToPNG(container, { resolution, metadata, filename });
      } else {
        await exportWebGLToPNG(container, { resolution, metadata, filename });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed');
    } finally {
      setIsExporting(false);
    }
  }, [config, identity, profile, resolution]);

  const handleExportJSON = useCallback(() => {
    if (!identity || !profile) {
      setError('Generate an identity first');
      return;
    }

    try {
      const metadata = generateExportMetadata(identity, profile, config, resolution);
      const json = JSON.stringify(metadata, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const filename = generateFilename('identity-meta', profile, 'json');
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed');
    }
  }, [config, identity, profile, resolution]);

  const handleExportSeed = useCallback(() => {
    if (!identity || !profile) {
      setError('Generate an identity first');
      return;
    }

    try {
      const seed: IdentitySeed = {
        version: '1.0.0',
        hash: hashIdentity(identity.name ?? '', identity.birthdate ?? '', identity.meaningfulWords),
        numerology: {
          destiny: profile.destiny,
          lifePath: profile.lifePath,
          soulUrge: profile.soulUrge,
          personality: profile.personality,
          expression: profile.expression,
        },
        timestamp: Date.now(),
      };

      const encoded = encodeSeed(seed);
      const cipherUrl = `http://localhost:5175/?seed=${encoded}`;

      // Copy to clipboard
      navigator.clipboard.writeText(cipherUrl).then(() => {
        setError(null);
        alert('Cipher link copied to clipboard!\n\nOpen it in the Cipher Rendering app to use your identity as a cipher seed.');
      }).catch(() => {
        // Fallback: show the URL
        prompt('Copy this link to use in Cipher Rendering:', cipherUrl);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed');
    }
  }, [identity, profile]);

  const canExport = identity && profile;

  return (
    <div style={{ padding: '1rem', border: '1px solid #333', marginTop: '1rem' }}>
      <h3 style={{ margin: '0 0 1rem 0', color: '#00ff41', fontSize: '0.9rem' }}>Export</h3>

      {/* Resolution Selector */}
      <div style={{ marginBottom: '1rem' }}>
        <label
          style={{
            fontSize: '0.75rem',
            color: '#888',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            display: 'block',
            marginBottom: '0.5rem',
          }}
        >
          Resolution
        </label>
        <select
          value={resolution}
          onChange={(e) => setResolution(Number(e.target.value) as ExportResolution)}
          style={{
            width: '100%',
            padding: '0.5rem',
            background: '#222',
            border: '1px solid #444',
            color: '#fff',
            fontSize: '0.8rem',
          }}
        >
          {RESOLUTIONS.map((res) => (
            <option key={res.value} value={res.value}>
              {res.label}
            </option>
          ))}
        </select>
      </div>

      {/* Export Buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
        <button
          onClick={handleExportPNG}
          disabled={!canExport || isExporting}
          style={{
            padding: '0.75rem',
            background: canExport ? '#00ff41' : '#333',
            color: canExport ? '#000' : '#666',
            border: 'none',
            cursor: canExport && !isExporting ? 'pointer' : 'not-allowed',
            fontSize: '0.8rem',
            fontWeight: 'bold',
          }}
        >
          {isExporting ? 'EXPORTING...' : 'EXPORT PNG'}
        </button>

        <button
          onClick={handleExportJSON}
          disabled={!canExport}
          style={{
            padding: '0.5rem',
            background: '#222',
            color: canExport ? '#888' : '#444',
            border: '1px solid #444',
            cursor: canExport ? 'pointer' : 'not-allowed',
            fontSize: '0.75rem',
          }}
        >
          EXPORT METADATA (JSON)
        </button>

        <button
          onClick={handleExportSeed}
          disabled={!canExport}
          style={{
            padding: '0.5rem',
            background: canExport ? '#1a1a2e' : '#222',
            color: canExport ? '#9b59b6' : '#444',
            border: '1px solid #9b59b6',
            cursor: canExport ? 'pointer' : 'not-allowed',
            fontSize: '0.75rem',
          }}
        >
          🔗 LINK TO CIPHER APP
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#ff4141' }}>{error}</div>
      )}

      {/* Info */}
      {!canExport && (
        <div style={{ marginTop: '0.75rem', fontSize: '0.7rem', color: '#666' }}>
          Generate an identity to enable export
        </div>
      )}
    </div>
  );
};
