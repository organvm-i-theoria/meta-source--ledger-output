import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PersonalIdentity, NumerologySystem } from '../core/types';

const STORAGE_KEY = 'identity-playground-state';
const MAX_SAVED_IDENTITIES = 50;

interface AppState {
  savedIdentities: PersonalIdentity[];
  currentSystem: NumerologySystem;
  saveIdentity: (identity: PersonalIdentity) => boolean;
  loadIdentity: (id: string) => PersonalIdentity | undefined;
  deleteIdentity: (id: string) => void;
  setSystem: (system: NumerologySystem) => void;
  clearAllIdentities: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      savedIdentities: [],
      currentSystem: 'pythagorean',

      saveIdentity: (identity) => {
        const { savedIdentities } = get();

        // Check if identity already exists (by id)
        if (savedIdentities.some((i) => i.id === identity.id)) {
          // Update existing
          set({
            savedIdentities: savedIdentities.map((i) =>
              i.id === identity.id ? identity : i
            ),
          });
          return true;
        }

        // Check limit
        if (savedIdentities.length >= MAX_SAVED_IDENTITIES) {
          return false;
        }

        set({ savedIdentities: [...savedIdentities, identity] });
        return true;
      },

      loadIdentity: (id) => get().savedIdentities.find((i) => i.id === id),

      deleteIdentity: (id) =>
        set((state) => ({
          savedIdentities: state.savedIdentities.filter((i) => i.id !== id),
        })),

      setSystem: (system) => set({ currentSystem: system }),

      clearAllIdentities: () => set({ savedIdentities: [] }),
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        savedIdentities: state.savedIdentities,
        currentSystem: state.currentSystem,
      }),
    }
  )
);
