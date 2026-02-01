import { create } from 'zustand';
import { VisualConfig } from '../core/types';

interface VisualState {
  config: VisualConfig;
  isPlaying: boolean;
  setConfig: (partial: Partial<VisualConfig>) => void;
  play: () => void;
  pause: () => void;
  reset: () => void;
}

const DEFAULT_CONFIG: VisualConfig = {
    mode: '2d',
    width: 800,
    height: 600,
    pointCount: 300,
    colorPrimary: '#00ff41', // Matrix Green default
    animationSpeed: 1.0,
    seed: 12345
};

export const useVisualStore = create<VisualState>((set) => ({
  config: DEFAULT_CONFIG,
  isPlaying: true,
  setConfig: (partial) => set((state) => ({ config: { ...state.config, ...partial } })),
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  reset: () => set({ config: DEFAULT_CONFIG, isPlaying: true }),
}));
