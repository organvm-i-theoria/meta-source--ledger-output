export const CIPHER_EVENTS = {
    INPUT_CHAR: 'cipher:input',
    SUBSTITUTION: 'cipher:substitution',
    ROTOR_STEP: 'cipher:rotor_step',
    KEY_APPLICATION: 'cipher:key_application',
    OUTPUT_CHAR: 'cipher:output',
    RESET: 'cipher:reset'
};

export interface CipherEventPayloads {
    [CIPHER_EVENTS.INPUT_CHAR]: { char: string, index: number };
    [CIPHER_EVENTS.SUBSTITUTION]: { from: string, to: string, method: string };
    [CIPHER_EVENTS.ROTOR_STEP]: { rotorIndex: number, position: number };
    [CIPHER_EVENTS.KEY_APPLICATION]: { keyChar: string, keyIndex: number };
    [CIPHER_EVENTS.OUTPUT_CHAR]: { char: string, index: number };
}
