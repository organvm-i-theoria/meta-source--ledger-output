import { useEffect, useRef } from 'react';
import { ThreeRenderer } from '../rendering/ThreeRenderer';
import { useVisualStore } from '../store/visualStore';
import { useIdentityStore } from '../store/identityStore';

export const Canvas3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<ThreeRenderer | null>(null);

  const config = useVisualStore((state) => state.config);
  const isPlaying = useVisualStore((state) => state.isPlaying);
  const profile = useIdentityStore((state) => state.profile);

  // Initialize renderer
  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = new ThreeRenderer(config);
    renderer.initialize(containerRef.current.id);
    rendererRef.current = renderer;

    return () => {
      renderer.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  // Update config
  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.updateConfig(config);
    }
  }, [config]);

  // Update profile
  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.updateProfile(profile);
    }
  }, [profile]);

  // Update playing state
  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setPlaying(isPlaying);
    }
  }, [isPlaying]);

  return (
    <div
      id="canvas-container-3d"
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        background: '#000',
      }}
    />
  );
};
