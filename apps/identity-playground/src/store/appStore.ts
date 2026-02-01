import { create } from 'zustand';
import { PersonalIdentity, NumerologySystem } from '../core/types';

interface AppState {
  savedIdentities: PersonalIdentity[];
  currentSystem: NumerologySystem;
  saveIdentity: (identity: PersonalIdentity) => void;
  loadIdentity: (id: string) => PersonalIdentity | undefined;
  deleteIdentity: (id: string) => void;
  setSystem: (system: NumerologySystem) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  savedIdentities: [], // In real impl, load from localStorage here
  currentSystem: 'pythagorean',
  saveIdentity: (identity) => set((state) => ({ savedIdentities: [...state.savedIdentities, identity] })),
  loadIdentity: (id) => get().savedIdentities.find(i => i.id === id),
  deleteIdentity: (id) => set((state) => ({ savedIdentities: state.savedIdentities.filter(i => i.id !== id) })),
  setSystem: (system) => set({ currentSystem: system }),
}));
