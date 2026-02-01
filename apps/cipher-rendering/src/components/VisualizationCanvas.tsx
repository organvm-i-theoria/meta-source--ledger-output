import { useRef, useEffect } from 'react';
import { useCipherStore } from '../store/cipherStore';

export const VisualizationCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializeMetaphor = useCipherStore((s) => s.initializeMetaphor);
  const destroyMetaphor = useCipherStore((s) => s.destroyMetaphor);
  const activeCipher = useCipherStore((s) => s.activeCipher);
  const activeMetaphor = useCipherStore((s) => s.activeMetaphor);
  const currentState = useCipherStore((s) => s.currentState);

  // Initialize metaphor when cipher is selected
  useEffect(() => {
    if (!containerRef.current || !activeCipher) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    initializeMetaphor(container, {
      width: rect.width,
      height: rect.height,
      theme: 'dark',
      primaryColor: '#00ff41',
    });

    return () => {
      destroyMetaphor();
    };
  }, [activeCipher, initializeMetaphor, destroyMetaphor]);

  // Handle resize
  useEffect(() => {
    if (!containerRef.current || !activeMetaphor) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        activeMetaphor.resize(width, height);
        if (currentState) {
          activeMetaphor.render(currentState);
        }
      }
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [activeMetaphor, currentState]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-black"
      style={{ minHeight: '400px' }}
    >
      {!activeCipher && (
        <div className="flex items-center justify-center h-full text-gray-600">
          <p>Select a cipher to visualize</p>
        </div>
      )}
    </div>
  );
};
