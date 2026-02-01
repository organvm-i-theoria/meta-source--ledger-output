/**
 * Mythology Store - State management for 4444jPP system
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  MythologyToken,
  NumerologicalStack,
  FourAsState,
  FourAsDomain,
  MythologyConfig,
  PhiOperator,
} from '@meta-source/core';
import { parseToken, calculateStack, generateMasterSeed } from '../mythology/tokenParser';
import { createInitialFourAsState, toggleDomain, setFocusDomain } from '../mythology/fourAs';
import { applyPhiOperator } from '../mythology/phiOperators';
import {
  createDecisionSession,
  answerQuestion,
  completeSession,
  type DecisionSession,
} from '../mythology/decisionMatrix';

interface MythologyState {
  // Token and numerology (allow-secret: mythology token, not credential)
  token: MythologyToken | null; // allow-secret
  stack: NumerologicalStack | null;
  masterSeed: string | null;

  // Four As
  fourAs: FourAsState;

  // Decision sessions
  decisionSessions: DecisionSession[];
  activeDecisionId: string | null;

  // Phi operator workspace
  phiValue: number;
  phiHistory: Array<{ operator: PhiOperator; input: number; output: number | number[] }>;

  // Actions
  setToken: (raw: string) => void;
  clearToken: () => void;

  toggleFourAsDomain: (domain: FourAsDomain) => void;
  setFourAsFocus: (domain: FourAsDomain) => void;
  setAuctorVision: (vision: string) => void;
  setArsTools: (tools: string[]) => void;
  setArchiveRefs: (refs: string[]) => void;
  setApparatusStatus: (status: string) => void;

  startDecision: (title: string, description?: string) => void;
  answerDecisionQuestion: (questionIndex: number, answer: boolean) => void;
  completeDecision: () => void;
  clearDecision: () => void;
  loadDecision: (id: string) => void;

  setPhiValue: (value: number) => void;
  applyPhi: (operator: PhiOperator, params?: { secondValue?: number; steps?: number; phase?: number }) => void;
  clearPhiHistory: () => void;

  getConfig: () => MythologyConfig | null;
}

const STORAGE_KEY = 'mythology-playground-state';

export const useMythologyStore = create<MythologyState>()(
  persist(
    (set, get) => ({
      // Initial state
      token: null, // allow-secret
      stack: null,
      masterSeed: null,
      fourAs: createInitialFourAsState(),
      decisionSessions: [],
      activeDecisionId: null,
      phiValue: 100,
      phiHistory: [],

      // Token actions
      setToken: (raw: string) => {
        try {
          const token = parseToken(raw); // allow-secret
          const stack = calculateStack(token);
          const masterSeed = generateMasterSeed(token, stack);
          set({ token, stack, masterSeed });
        } catch (error) {
          console.error('Failed to parse token:', error);
        }
      },

      clearToken: () => {
        set({ token: null, stack: null, masterSeed: null }); // allow-secret
      },

      // Four As actions
      toggleFourAsDomain: (domain: FourAsDomain) => {
        const { fourAs } = get();
        set({ fourAs: toggleDomain(fourAs, domain) });
      },

      setFourAsFocus: (domain: FourAsDomain) => {
        const { fourAs } = get();
        set({ fourAs: setFocusDomain(fourAs, domain) });
      },

      setAuctorVision: (vision: string) => {
        const { fourAs } = get();
        set({ fourAs: { ...fourAs, auctorVision: vision } });
      },

      setArsTools: (tools: string[]) => {
        const { fourAs } = get();
        set({ fourAs: { ...fourAs, arsTools: tools } });
      },

      setArchiveRefs: (refs: string[]) => {
        const { fourAs } = get();
        set({ fourAs: { ...fourAs, archiveRefs: refs } });
      },

      setApparatusStatus: (status: string) => {
        const { fourAs } = get();
        set({ fourAs: { ...fourAs, apparatusStatus: status } });
      },

      // Decision actions
      startDecision: (title: string, description?: string) => {
        const session = createDecisionSession(title, description);
        set((state) => ({
          decisionSessions: [...state.decisionSessions, session],
          activeDecisionId: session.id,
        }));
      },

      answerDecisionQuestion: (questionIndex: number, answer: boolean) => {
        const { decisionSessions, activeDecisionId } = get();
        if (!activeDecisionId) return;

        const sessionIndex = decisionSessions.findIndex((s) => s.id === activeDecisionId);
        if (sessionIndex === -1) return;

        const updatedSession = answerQuestion(decisionSessions[sessionIndex], questionIndex, answer);
        const newSessions = [...decisionSessions];
        newSessions[sessionIndex] = updatedSession;

        set({ decisionSessions: newSessions });
      },

      completeDecision: () => {
        const { decisionSessions, activeDecisionId } = get();
        if (!activeDecisionId) return;

        const sessionIndex = decisionSessions.findIndex((s) => s.id === activeDecisionId);
        if (sessionIndex === -1) return;

        try {
          const completedSession = completeSession(decisionSessions[sessionIndex]);
          const newSessions = [...decisionSessions];
          newSessions[sessionIndex] = completedSession;

          set({ decisionSessions: newSessions });
        } catch (error) {
          console.error('Failed to complete decision:', error);
        }
      },

      clearDecision: () => {
        set({ activeDecisionId: null });
      },

      loadDecision: (id: string) => {
        const { decisionSessions } = get();
        const session = decisionSessions.find((s) => s.id === id);
        if (session) {
          set({ activeDecisionId: id });
        }
      },

      // Phi actions
      setPhiValue: (value: number) => {
        set({ phiValue: value });
      },

      applyPhi: (operator: PhiOperator, params?: { secondValue?: number; steps?: number; phase?: number }) => {
        const { phiValue, phiHistory } = get();
        const result = applyPhiOperator(operator, phiValue, params);

        // Handle different result types
        let outputValue: number;
        if (Array.isArray(result)) {
          outputValue = result[result.length - 1]; // Use last value of sequence
        } else if (typeof result === 'object' && 'center' in result) {
          outputValue = result.center; // Use center of liminal range
        } else {
          outputValue = result;
        }

        set({
          phiValue: outputValue,
          phiHistory: [
            ...phiHistory,
            { operator, input: phiValue, output: result as number | number[] },
          ],
        });
      },

      clearPhiHistory: () => {
        set({ phiHistory: [] });
      },

      // Config getter
      getConfig: () => {
        const { token, stack, fourAs, masterSeed } = get();
        if (!token || !stack || !masterSeed) return null;

        return {
          token,
          stack,
          fourAs,
          masterSeed,
        };
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        token: state.token, // allow-secret
        stack: state.stack,
        masterSeed: state.masterSeed,
        fourAs: state.fourAs,
        decisionSessions: state.decisionSessions,
        phiValue: state.phiValue,
      }),
    }
  )
);
