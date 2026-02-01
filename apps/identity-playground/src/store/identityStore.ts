import { create } from 'zustand';
import { PersonalIdentity, NumerologyProfile, NumerologySystem } from '../core/types';
import { NumerologyEngine } from '../numerology/NumerologyEngine';

interface IdentityState {
  identity: PersonalIdentity | null;
  profile: NumerologyProfile | null;
  setIdentity: (identity: PersonalIdentity) => void;
  calculateProfile: (system: NumerologySystem) => void;
  clear: () => void;
}

export const useIdentityStore = create<IdentityState>((set, get) => ({
  identity: null,
  profile: null,
  setIdentity: (identity) => {
      set({ identity });
      // Auto-calculate on identity set
      get().calculateProfile('pythagorean');
  },
  calculateProfile: (system) => {
      const { identity } = get();
      if (!identity) return;
      
      const profile = NumerologyEngine.calculate(identity.name, identity.birthdate, system);
      set({ profile });
  },
  clear: () => set({ identity: null, profile: null }),
}));