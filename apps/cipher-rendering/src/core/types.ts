export type CipherConfig = Record<string, any>;

export interface VisualHints {
    preferredMetaphors: string[];
    colors?: {
        plaintext: string;
        ciphertext: string;
        highlight: string;
    };
}

export interface FocusTarget {
    type: 'character' | 'component' | 'region';
    id: string; // e.g., "plaintext:5" or "rotor:1"
    action?: 'highlight' | 'rotate' | 'move';
}

export interface Annotation {
    text: string;
    x: number;
    y: number;
}

export interface Transform {
    from: FocusTarget;
    to: FocusTarget;
    duration: number;
}

export interface CipherState {
    id: string; // unique state ID
    step: number;
    timestamp: number;
    data: Record<string, any>; // Cipher-specific data (e.g. rotor positions)
    visual: {
        focus: FocusTarget[];
        annotations: Annotation[];
        transforms: Transform[];
    };
    plaintext: string;
    ciphertext: string;
}

export interface StepResult {
    nextState: CipherState;
    events: CipherEvent[];
    outputChar: string;
}

export interface EncryptionResult {
    finalState: CipherState;
    ciphertext: string;
    history: CipherState[]; // For time-travel
}

export interface CipherEvent {
    type: string;
    payload: any;
    timestamp: number;
}
