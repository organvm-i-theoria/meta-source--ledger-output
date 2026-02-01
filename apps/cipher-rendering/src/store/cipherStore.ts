import { create } from 'zustand';
import type { CipherState, CipherEvent } from '../core/types';
import type { ICipher, CipherMode } from '../core/CipherInterface';
import { cipherRegistry } from '../ciphers/registry';
import { metaphorRegistry } from '../metaphors/registry';
import type { IVisualMetaphor, RenderConfig } from '../metaphors/VisualMetaphorInterface';

interface CipherStore {
  // Cipher state
  activeCipher: ICipher | null;
  currentState: CipherState | null;
  history: CipherState[];
  historyIndex: number;
  events: CipherEvent[];

  // Input
  plaintext: string;
  mode: CipherMode;
  isPlaying: boolean;
  playSpeed: number;

  // Visual
  activeMetaphor: IVisualMetaphor | null;
  activeMetaphorId: string;
  metaphorContainer: HTMLElement | null;
  metaphorConfig: RenderConfig | null;

  // Actions
  selectCipher: (cipherId: string) => void;
  configureCipher: (config: Record<string, unknown>) => void;
  setPlaintext: (text: string) => void;
  setMode: (mode: CipherMode) => void;
  reset: () => void;
  stepForward: () => void;
  stepBack: () => void;
  play: () => void;
  pause: () => void;
  setPlaySpeed: (speed: number) => void;
  goToStep: (index: number) => void;
  encryptAll: () => void;
  initializeMetaphor: (container: HTMLElement, config: RenderConfig) => void;
  switchMetaphor: (metaphorId: string) => void;
  destroyMetaphor: () => void;
}

export const useCipherStore = create<CipherStore>((set, get) => ({
  activeCipher: null,
  currentState: null,
  history: [],
  historyIndex: -1,
  events: [],
  plaintext: '',
  mode: 'encrypt' as CipherMode,
  isPlaying: false,
  playSpeed: 500,
  activeMetaphor: null,
  activeMetaphorId: 'wheel',
  metaphorContainer: null,
  metaphorConfig: null,

  selectCipher: (cipherId) => {
    const cipher = cipherRegistry.get(cipherId);
    if (!cipher) return;

    const initialState = cipher.getInitialState();
    set({
      activeCipher: cipher,
      currentState: initialState,
      history: [initialState],
      historyIndex: 0,
      events: [],
    });

    // Update metaphor if exists
    const { activeMetaphor } = get();
    if (activeMetaphor) {
      activeMetaphor.render(initialState);
    }
  },

  configureCipher: (config) => {
    const { activeCipher } = get();
    if (!activeCipher) return;

    activeCipher.configure(config);

    // Re-initialize state after config change
    const initialState = activeCipher.getInitialState();
    set({
      currentState: initialState,
      history: [initialState],
      historyIndex: 0,
      events: [],
    });
  },

  setPlaintext: (text) => {
    set({ plaintext: text.toUpperCase() });
  },

  setMode: (mode) => {
    const { activeCipher, activeMetaphor } = get();
    if (!activeCipher) return;

    // Reset state when mode changes
    const initialState = activeCipher.getInitialState();
    set({
      mode,
      currentState: initialState,
      history: [initialState],
      historyIndex: 0,
      events: [],
      isPlaying: false,
    });

    if (activeMetaphor) {
      activeMetaphor.render(initialState);
    }
  },

  reset: () => {
    const { activeCipher, activeMetaphor } = get();
    if (!activeCipher) return;

    const initialState = activeCipher.getInitialState();
    set({
      currentState: initialState,
      history: [initialState],
      historyIndex: 0,
      events: [],
      isPlaying: false,
    });

    if (activeMetaphor) {
      activeMetaphor.render(initialState);
    }
  },

  stepForward: () => {
    const { activeCipher, currentState, history, historyIndex, plaintext, mode, activeMetaphor } =
      get();
    if (!activeCipher || !currentState) return;

    // Check if we're at the end
    const inputIndex = currentState.plaintext.length;
    if (inputIndex >= plaintext.length) return;

    const inputChar = plaintext[inputIndex];
    const result = activeCipher.step(currentState, inputChar, mode);

    // Trim history if we stepped back then forward
    const newHistory = [...history.slice(0, historyIndex + 1), result.nextState];

    set({
      currentState: result.nextState,
      history: newHistory,
      historyIndex: newHistory.length - 1,
      events: [...get().events, ...result.events],
    });

    if (activeMetaphor) {
      activeMetaphor.animate(currentState, result.nextState, 300);
    }
  },

  stepBack: () => {
    const { history, historyIndex, activeMetaphor } = get();
    if (historyIndex <= 0) return;

    const newIndex = historyIndex - 1;
    const previousState = history[newIndex];

    set({
      currentState: previousState,
      historyIndex: newIndex,
    });

    if (activeMetaphor) {
      activeMetaphor.render(previousState);
    }
  },

  play: () => {
    set({ isPlaying: true });
  },

  pause: () => {
    set({ isPlaying: false });
  },

  setPlaySpeed: (speed) => {
    set({ playSpeed: speed });
  },

  goToStep: (index) => {
    const { history, activeMetaphor } = get();
    if (index < 0 || index >= history.length) return;

    const targetState = history[index];
    set({
      currentState: targetState,
      historyIndex: index,
    });

    if (activeMetaphor) {
      activeMetaphor.render(targetState);
    }
  },

  encryptAll: () => {
    const { activeCipher, plaintext, activeMetaphor } = get();
    if (!activeCipher) return;

    const result = activeCipher.encrypt(plaintext);
    set({
      currentState: result.finalState,
      history: result.history,
      historyIndex: result.history.length - 1,
      isPlaying: false,
    });

    if (activeMetaphor) {
      activeMetaphor.render(result.finalState);
    }
  },

  initializeMetaphor: (container, config) => {
    const { activeCipher, currentState, activeMetaphor: existing, activeMetaphorId } = get();
    if (existing) {
      existing.destroy();
    }

    // Store container and config for later metaphor switching
    set({ metaphorContainer: container, metaphorConfig: config });

    // Get preferred metaphor from cipher hints, or use current selection
    const hints = activeCipher?.getVisualHints();
    const preferredId = hints?.preferredMetaphors[0] || activeMetaphorId || 'wheel';

    const metaphor = metaphorRegistry.get(preferredId);
    if (!metaphor) return;

    metaphor.initialize(container, config);
    set({ activeMetaphor: metaphor, activeMetaphorId: preferredId });

    if (currentState) {
      metaphor.render(currentState);
    }
  },

  switchMetaphor: (metaphorId) => {
    const { metaphorContainer, metaphorConfig, activeMetaphor, currentState } = get();
    if (!metaphorContainer || !metaphorConfig) return;

    // Destroy existing metaphor
    if (activeMetaphor) {
      activeMetaphor.destroy();
    }

    // Create new metaphor
    const metaphor = metaphorRegistry.get(metaphorId);
    if (!metaphor) return;

    metaphor.initialize(metaphorContainer, metaphorConfig);
    set({ activeMetaphor: metaphor, activeMetaphorId: metaphorId });

    if (currentState) {
      metaphor.render(currentState);
    }
  },

  destroyMetaphor: () => {
    const { activeMetaphor } = get();
    if (activeMetaphor) {
      activeMetaphor.destroy();
      set({ activeMetaphor: null, metaphorContainer: null, metaphorConfig: null });
    }
  },
}));
