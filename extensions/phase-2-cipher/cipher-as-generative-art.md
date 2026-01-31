# Cipher as Generative Art Form

## Encryption as Compositional Principle

**Document Type:** Conceptual Exploration
**Version:** 1.0
**Purpose:** Explore encryption as artistic medium and compositional system

---

## Overview

This document explores cipher systems not as tools for secrecy, but as generative art forms:

1. **Encryption as Composition** — Transformation rules as aesthetic choices
2. **Living Ciphers** — Systems that evolve over time
3. **Participatory Encryption** — Audience as key/seed input
4. **Sonification** — Sound-cipher correspondences
5. **Exhibition Concepts** — Gallery and performance contexts

---

## Part I: Encryption as Composition

### 1.1 The Cipher as Aesthetic System

Every cipher can be understood as a compositional system:

| Cipher Property | Musical Analog | Visual Analog |
|-----------------|----------------|---------------|
| **Key** | Scale/Mode | Color palette |
| **Algorithm** | Compositional rule | Transformation law |
| **Plaintext** | Theme/Motif | Source image |
| **Ciphertext** | Variation | Transformed output |
| **Decryption** | Return to theme | Revealing original |

### 1.2 Substitution as Color Remapping

```typescript
interface SubstitutionPalette {
  // Each letter maps to a color
  mapping: Record<string, string>;
  // Decryption is color-to-letter
  reverse: Record<string, string>;
}

function createCipherPalette(): SubstitutionPalette {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const colors = generateGoldenHues(26);

  const mapping: Record<string, string> = {};
  const reverse: Record<string, string> = {};

  alphabet.split('').forEach((letter, i) => {
    const color = hslToHex(colors[i]);
    mapping[letter] = color;
    reverse[color] = letter;
  });

  return { mapping, reverse };
}

function encryptToColors(text: string, palette: SubstitutionPalette): string[] {
  return text.toUpperCase().split('')
    .filter(c => palette.mapping[c])
    .map(c => palette.mapping[c]);
}

// Visual piece: text becomes color field
function renderCipherColorField(colors: string[], p: p5): void {
  const cellSize = Math.sqrt(p.width * p.height / colors.length);
  const cols = Math.ceil(p.width / cellSize);

  colors.forEach((color, i) => {
    const x = (i % cols) * cellSize;
    const y = Math.floor(i / cols) * cellSize;

    p.fill(color);
    p.noStroke();
    p.rect(x, y, cellSize, cellSize);
  });
}
```

### 1.3 Transposition as Choreography

```typescript
interface TranspositionChoreography {
  originalPositions: number[];
  finalPositions: number[];
  paths: { from: number; to: number; curve: string }[];
}

function createColumnarTransposition(
  text: string,
  key: string
): TranspositionChoreography {
  const keyOrder = key.split('')
    .map((char, i) => ({ char, i }))
    .sort((a, b) => a.char.localeCompare(b.char))
    .map((item, newIndex) => ({ original: item.i, sorted: newIndex }));

  const cols = key.length;
  const rows = Math.ceil(text.length / cols);

  const originalPositions: number[] = [];
  const finalPositions: number[] = [];
  const paths: TranspositionChoreography['paths'] = [];

  for (let i = 0; i < text.length; i++) {
    const originalRow = Math.floor(i / cols);
    const originalCol = i % cols;

    const sortedCol = keyOrder.find(k => k.original === originalCol)!.sorted;
    const newPosition = sortedCol * rows + originalRow;

    originalPositions.push(i);
    finalPositions.push(newPosition);
    paths.push({
      from: i,
      to: newPosition,
      curve: 'cubic-bezier',
    });
  }

  return { originalPositions, finalPositions, paths };
}

// Animate transposition as dance
function renderTranspositionDance(
  choreography: TranspositionChoreography,
  text: string,
  progress: number, // 0 to 1
  p: p5
): void {
  const charRadius = 15;
  const cols = Math.ceil(Math.sqrt(text.length * 2));

  choreography.paths.forEach((path, i) => {
    const char = text[i];
    if (!char) return;

    // Calculate original and final positions
    const fromX = (path.from % cols) * charRadius * 2.5 + charRadius;
    const fromY = Math.floor(path.from / cols) * charRadius * 2.5 + charRadius;
    const toX = (path.to % cols) * charRadius * 2.5 + charRadius;
    const toY = Math.floor(path.to / cols) * charRadius * 2.5 + charRadius;

    // Interpolate with easing
    const t = easeInOutCubic(progress);
    const x = lerp(fromX, toX, t);
    const y = lerp(fromY, toY, t);

    // Add arc to path
    const midY = Math.min(fromY, toY) - 30 * Math.sin(progress * Math.PI);

    // Draw trail
    p.stroke(255, 100);
    p.noFill();
    p.beginShape();
    p.vertex(fromX, fromY);
    p.quadraticVertex(fromX + (toX - fromX) / 2, midY, toX, toY);
    p.endShape();

    // Draw character
    p.fill(255);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(14);
    p.text(char, x, y);
  });
}
```

### 1.4 Enigma as Mechanical Symphony

The Enigma machine can be experienced as a musical instrument:

```typescript
interface EnigmaSymphony {
  rotorPositions: number[]; // Current rotor state
  signalPath: string[];     // Path through machine
  outputNote: string;       // Musical note output
}

function enigmaToMusic(
  inputChar: string,
  enigmaState: EnigmaState
): EnigmaSymphony {
  const signalPath: string[] = [];

  // Trace through machine
  let signal = inputChar;
  signalPath.push(`keyboard:${signal}`);

  // Plugboard
  signal = enigmaState.plugboard.swap(signal);
  signalPath.push(`plugboard:${signal}`);

  // Rotors forward
  for (let i = enigmaState.rotors.length - 1; i >= 0; i--) {
    signal = enigmaState.rotors[i].forward(signal);
    signalPath.push(`rotor${i}:${signal}`);
  }

  // Reflector
  signal = enigmaState.reflector.reflect(signal);
  signalPath.push(`reflector:${signal}`);

  // Rotors backward
  for (let i = 0; i < enigmaState.rotors.length; i++) {
    signal = enigmaState.rotors[i].reverse(signal);
    signalPath.push(`rotor${i}:${signal}`);
  }

  // Map final character to musical note
  const outputNote = characterToNote(signal);

  return {
    rotorPositions: enigmaState.rotors.map(r => r.position),
    signalPath,
    outputNote,
  };
}

function characterToNote(char: string): string {
  const index = char.toUpperCase().charCodeAt(0) - 65;
  const octave = 3 + Math.floor(index / 12);
  const noteIndex = index % 12;
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  return `${notes[noteIndex]}${octave}`;
}
```

---

## Part II: Living Ciphers

### 2.1 Evolutionary Cipher Systems

Ciphers that mutate and adapt over time:

```typescript
interface LivingCipher {
  id: string;
  generation: number;
  genome: CipherGenome;
  fitness: number;
  offspring: string[];
  mutations: Mutation[];
}

interface CipherGenome {
  type: 'substitution' | 'transposition' | 'hybrid';
  substitutionTable?: number[]; // Permutation of 0-25
  transpositionPattern?: number[];
  mutationRate: number;
  crossoverPoints: number[];
}

interface Mutation {
  timestamp: number;
  type: 'swap' | 'shift' | 'invert' | 'random';
  affectedIndices: number[];
}

class EvolvingCipherSystem {
  private population: LivingCipher[] = [];
  private targetFitness: (cipher: LivingCipher, input: string) => number;

  constructor(
    populationSize: number,
    fitnessFunction: (cipher: LivingCipher, input: string) => number
  ) {
    this.targetFitness = fitnessFunction;
    this.initializePopulation(populationSize);
  }

  evolve(input: string): void {
    // Calculate fitness
    for (const cipher of this.population) {
      cipher.fitness = this.targetFitness(cipher, input);
    }

    // Selection
    this.population.sort((a, b) => b.fitness - a.fitness);
    const survivors = this.population.slice(0, this.population.length / 2);

    // Reproduction
    const offspring: LivingCipher[] = [];
    for (let i = 0; i < survivors.length; i++) {
      const parent1 = survivors[i];
      const parent2 = survivors[(i + 1) % survivors.length];

      const child = this.crossover(parent1, parent2);
      this.mutate(child);
      offspring.push(child);
    }

    this.population = [...survivors, ...offspring];
  }

  private mutate(cipher: LivingCipher): void {
    if (Math.random() > cipher.genome.mutationRate) return;

    const mutationType = ['swap', 'shift', 'invert', 'random'][
      Math.floor(Math.random() * 4)
    ] as Mutation['type'];

    const table = cipher.genome.substitutionTable || [];

    switch (mutationType) {
      case 'swap':
        const i = Math.floor(Math.random() * 26);
        const j = Math.floor(Math.random() * 26);
        [table[i], table[j]] = [table[j], table[i]];
        break;

      case 'shift':
        const shift = Math.floor(Math.random() * 5) - 2;
        cipher.genome.substitutionTable = table.map(v => (v + shift + 26) % 26);
        break;

      case 'invert':
        const start = Math.floor(Math.random() * 20);
        const length = Math.floor(Math.random() * 6) + 2;
        const section = table.slice(start, start + length).reverse();
        table.splice(start, length, ...section);
        break;
    }

    cipher.mutations.push({
      timestamp: Date.now(),
      type: mutationType,
      affectedIndices: [],
    });

    cipher.generation++;
  }

  // Visual representation of cipher evolution
  renderEvolution(p: p5): void {
    const spacing = p.height / this.population.length;

    this.population.forEach((cipher, i) => {
      const y = i * spacing + spacing / 2;

      // Draw substitution table as color gradient
      const table = cipher.genome.substitutionTable || [];
      const cellWidth = p.width / 26;

      table.forEach((value, j) => {
        const hue = (value / 26) * 360;
        p.fill(hue, 70, 50);
        p.noStroke();
        p.rect(j * cellWidth, y - spacing / 4, cellWidth, spacing / 2);
      });

      // Fitness indicator
      p.fill(255);
      p.textAlign(p.RIGHT);
      p.textSize(10);
      p.text(`Gen ${cipher.generation}: ${cipher.fitness.toFixed(3)}`, p.width - 5, y);
    });
  }
}
```

### 2.2 Ecological Cipher Networks

Multiple ciphers interacting in an ecosystem:

```typescript
interface CipherEcosystem {
  ciphers: LivingCipher[];
  environment: CipherEnvironment;
  interactions: CipherInteraction[];
}

interface CipherEnvironment {
  messagePool: string[];       // Available plaintexts
  noise: number;               // Environmental randomness
  selectionPressure: number;   // How harsh the environment
  mutagenicFactor: number;     // Mutation rate modifier
}

interface CipherInteraction {
  type: 'predator-prey' | 'symbiosis' | 'competition' | 'neutralism';
  cipher1: string;
  cipher2: string;
  effect: {
    onCipher1: number; // -1 to 1
    onCipher2: number;
  };
}

// Predator cipher "eats" prey cipher by using it as a pre-processing step
// Symbiotic ciphers strengthen each other
// Competing ciphers fight for the same niche (similar encryption patterns)
```

---

## Part III: Participatory Encryption

### 3.1 Audience as Key

```typescript
interface ParticipatoryCipher {
  id: string;
  baseAlgorithm: string;
  keyDerivation: 'vote' | 'aggregate' | 'consensus' | 'random';
  participants: Participant[];
  currentKey: unknown;
}

interface Participant {
  id: string;
  contribution: unknown;  // Their input to key derivation
  weight: number;         // How much their input counts
  timestamp: number;
}

class AudienceKeyCipher {
  private participants: Map<string, Participant> = new Map();
  private cipher: ICipher;

  addParticipant(id: string, contribution: string): void {
    this.participants.set(id, {
      id,
      contribution,
      weight: 1,
      timestamp: Date.now(),
    });

    this.updateKey();
  }

  private updateKey(): void {
    // Aggregate all contributions into a key
    const contributions = Array.from(this.participants.values());

    // Weight by recency
    const now = Date.now();
    const weightedContributions = contributions.map(p => ({
      ...p,
      weight: Math.exp(-(now - p.timestamp) / 60000), // Decay over 1 minute
    }));

    // Combine contributions
    const combinedKey = this.deriveKey(weightedContributions);
    this.cipher.configure({ key: combinedKey });
  }

  private deriveKey(contributions: Participant[]): string {
    // Simple: concatenate and hash
    const combined = contributions
      .sort((a, b) => b.weight - a.weight)
      .map(p => p.contribution)
      .join('');

    return this.hash(combined).slice(0, 16);
  }

  private hash(input: string): string {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash = (hash << 5) - hash + input.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(8, '0');
  }
}
```

### 3.2 Collective Decryption Ritual

```typescript
interface DecryptionRitual {
  ciphertext: string;
  requiredParticipants: number;
  currentParticipants: number;
  keyFragments: Map<string, string>;
  threshold: number;  // Minimum fragments needed
  reconstructedKey?: string;
}

// Shamir's Secret Sharing for artistic decryption
class ThresholdDecryption {
  private fragments: Map<string, { x: number; y: number }> = new Map();
  private threshold: number;
  private prime: number = 257; // Prime for modular arithmetic

  constructor(threshold: number) {
    this.threshold = threshold;
  }

  // Each participant contributes a fragment
  addFragment(participantId: string, x: number, y: number): void {
    this.fragments.set(participantId, { x, y });

    if (this.fragments.size >= this.threshold) {
      const key = this.reconstructKey();
      console.log('Key reconstructed:', key);
      // Trigger decryption reveal
    }
  }

  private reconstructKey(): number {
    // Lagrange interpolation to find f(0)
    const points = Array.from(this.fragments.values()).slice(0, this.threshold);

    let secret = 0; // allow-secret: variable name in Shamir's Secret Sharing algorithm
    for (let i = 0; i < points.length; i++) {
      let term = points[i].y;
      for (let j = 0; j < points.length; j++) {
        if (i !== j) {
          const numerator = (0 - points[j].x);
          const denominator = (points[i].x - points[j].x);
          term = (term * numerator * this.modInverse(denominator)) % this.prime;
        }
      }
      secret = (secret + term) % this.prime; // allow-secret: variable assignment
    }

    return (secret + this.prime) % this.prime;
  }

  private modInverse(a: number): number {
    let [old_r, r] = [a, this.prime];
    let [old_s, s] = [1, 0];

    while (r !== 0) {
      const quotient = Math.floor(old_r / r);
      [old_r, r] = [r, old_r - quotient * r];
      [old_s, s] = [s, old_s - quotient * s];
    }

    return ((old_s % this.prime) + this.prime) % this.prime;
  }
}
```

### 3.3 Visualization: Collective Key Formation

```typescript
function renderCollectiveKeyFormation(
  participants: Participant[],
  requiredCount: number,
  p: p5
): void {
  const centerX = p.width / 2;
  const centerY = p.height / 2;
  const radius = Math.min(p.width, p.height) / 3;

  // Draw required slots
  p.noFill();
  p.stroke(100);
  p.strokeWeight(2);

  for (let i = 0; i < requiredCount; i++) {
    const angle = (i / requiredCount) * Math.PI * 2 - Math.PI / 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    p.circle(x, y, 40);
  }

  // Draw participants
  participants.forEach((participant, i) => {
    const angle = (i / requiredCount) * Math.PI * 2 - Math.PI / 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    // Filled circle for present participant
    p.fill(120, 70, 50);
    p.noStroke();
    p.circle(x, y, 35);

    // Draw connection to center
    const progress = participants.length / requiredCount;
    const connectionLength = progress >= 1 ? 1 : 0;

    p.stroke(120, 70, 50);
    p.strokeWeight(2);
    p.line(
      x, y,
      lerp(x, centerX, connectionLength),
      lerp(y, centerY, connectionLength)
    );
  });

  // Draw key formation at center when threshold met
  if (participants.length >= requiredCount) {
    p.fill(60, 80, 60);
    p.noStroke();

    // Pulsing effect
    const pulse = Math.sin(Date.now() / 200) * 10 + 50;
    p.circle(centerX, centerY, pulse);

    p.fill(255);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(16);
    p.text('KEY FORMED', centerX, centerY);
  } else {
    p.fill(200);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(14);
    p.text(`${participants.length}/${requiredCount}`, centerX, centerY);
  }
}
```

---

## Part IV: Sound-Cipher Correspondences

### 4.1 Sonification Strategies

| Cipher Element | Sound Parameter | Example |
|----------------|-----------------|---------|
| Plaintext character | Pitch | A=C4, Z=B5 |
| Key character | Timbre | Different waveforms |
| Substitution | Pitch shift | Glide between notes |
| Rotor position | Reverb depth | 0-25 maps to 0-100% wet |
| Signal path | Delay time | Longer path = more delay |
| Encryption strength | Dissonance | More entropy = more clash |

### 4.2 Tone.js Implementation

```typescript
import * as Tone from 'tone';

interface CipherSonification {
  synth: Tone.PolySynth;
  effects: {
    reverb: Tone.Reverb;
    delay: Tone.FeedbackDelay;
    distortion: Tone.Distortion;
  };
  mappings: SonificationMappings;
}

interface SonificationMappings {
  characterToFrequency: (char: string) => number;
  keyToWaveform: (key: number) => OscillatorType;
  entropyToDistortion: (entropy: number) => number;
}

class CipherSonifier {
  private synth: Tone.PolySynth;
  private reverb: Tone.Reverb;
  private delay: Tone.FeedbackDelay;

  constructor() {
    this.reverb = new Tone.Reverb(2).toDestination();
    this.delay = new Tone.FeedbackDelay('8n', 0.3).connect(this.reverb);
    this.synth = new Tone.PolySynth().connect(this.delay);
  }

  async sonifyCipherStep(
    inputChar: string,
    outputChar: string,
    cipherState: unknown
  ): Promise<void> {
    const inputFreq = this.charToFrequency(inputChar);
    const outputFreq = this.charToFrequency(outputChar);

    // Play input note briefly
    this.synth.triggerAttackRelease(inputFreq, '16n');

    // After brief pause, glide to output
    await new Promise(resolve => setTimeout(resolve, 100));

    this.synth.triggerAttackRelease(outputFreq, '8n');
  }

  sonifyEnigma(enigmaSymphony: EnigmaSymphony): void {
    const { rotorPositions, signalPath, outputNote } = enigmaSymphony;

    // Rotor positions affect reverb
    const reverbAmount = (rotorPositions[0] + rotorPositions[1] + rotorPositions[2]) / 78;
    this.reverb.wet.value = reverbAmount;

    // Signal path length affects delay
    const delayTime = signalPath.length / 20;
    this.delay.delayTime.value = delayTime;

    // Play each step of the signal path
    signalPath.forEach((step, i) => {
      const [stage, char] = step.split(':');
      const freq = this.charToFrequency(char);

      // Stagger the notes
      setTimeout(() => {
        this.synth.triggerAttackRelease(freq, '32n');
      }, i * 50);
    });

    // Final output note
    setTimeout(() => {
      this.synth.triggerAttackRelease(outputNote, '4n');
    }, signalPath.length * 50 + 100);
  }

  private charToFrequency(char: string): number {
    const index = char.toUpperCase().charCodeAt(0) - 65;
    if (index < 0 || index > 25) return 440;

    // Map to C4-B5 (two octaves)
    const baseFreq = 261.63; // C4
    const semitones = index;
    return baseFreq * Math.pow(2, semitones / 12);
  }

  // Sonify the entire encryption process
  async sonifyEncryption(
    plaintext: string,
    cipher: ICipher
  ): Promise<void> {
    let state = cipher.getInitialState();

    for (const char of plaintext) {
      state.input = char;
      const { nextState, events } = cipher.step(state);

      for (const event of events) {
        if (event.type === 'substitution') {
          await this.sonifyCipherStep(
            event.data.from as string,
            event.data.to as string,
            state
          );
        }
      }

      state = nextState;
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }
}
```

### 4.3 Music Composition from Ciphertext

```typescript
interface CipherComposition {
  title: string;
  plaintext: string;
  cipher: string;
  key: string;

  // Musical structure derived from cipher
  melody: Note[];
  harmony: Chord[];
  rhythm: Beat[];
}

interface Note {
  pitch: string;
  duration: string;
  velocity: number;
  timing: number;
}

function composeCipherPiece(
  plaintext: string,
  ciphertext: string,
  key: string
): CipherComposition {
  // Melody from ciphertext
  const melody = ciphertext.split('').map((char, i) => ({
    pitch: charToNote(char),
    duration: i % 4 === 3 ? '4n' : '8n', // Every 4th note longer
    velocity: 0.6 + Math.random() * 0.3,
    timing: i * 0.25,
  }));

  // Harmony from key
  const keyNumbers = key.split('').map(c => c.charCodeAt(0) - 65);
  const harmony = keyNumbers.map((num, i) => ({
    root: charToNote(String.fromCharCode(65 + num)),
    quality: num % 2 === 0 ? 'major' : 'minor',
    duration: '1m',
    timing: i * 4,
  }));

  // Rhythm from differences between plain and cipher
  const rhythm = plaintext.split('').map((plain, i) => {
    const cipher = ciphertext[i];
    const diff = Math.abs(cipher.charCodeAt(0) - plain.charCodeAt(0));
    return {
      subdivision: 16 - (diff % 8),
      accent: diff > 13,
      timing: i * 0.25,
    };
  });

  return {
    title: `Cipher in ${key}`,
    plaintext,
    cipher: ciphertext,
    key,
    melody,
    harmony,
    rhythm,
  };
}
```

---

## Part V: Exhibition Concepts

### 5.1 Gallery Installation: "The Encryption Chamber"

```
INSTALLATION PLAN: THE ENCRYPTION CHAMBER

Physical Layout:
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│   ┌─────┐                                         ┌─────┐     │
│   │INPUT│                                         │OUTPUT│    │
│   │BOOTH│                                         │REVEAL│    │
│   └──┬──┘                                         └──▲──┘     │
│      │                                               │         │
│      │        ┌───────────────────────────┐          │         │
│      │        │                           │          │         │
│      └───────►│    ENCRYPTION CHAMBER     │──────────┘         │
│               │                           │                     │
│               │   ┌───┐  ┌───┐  ┌───┐    │                     │
│               │   │ R │  │ R │  │ R │    │  ← Physical         │
│               │   │ O │  │ O │  │ O │    │    Rotor Props      │
│               │   │ T │  │ T │  │ T │    │                     │
│               │   │ 1 │  │ 2 │  │ 3 │    │                     │
│               │   └───┘  └───┘  └───┘    │                     │
│               │                           │                     │
│               └───────────────────────────┘                     │
│                                                                │
│   ← PARTICIPANT SEATING (key contributors)                    │
│   ○  ○  ○  ○  ○  ○  ○  ○                                     │
│                                                                │
└────────────────────────────────────────────────────────────────┘

Interactive Elements:
1. Input Booth: Visitors type messages on vintage keyboard
2. Encryption Chamber: Physical rotors + projection mapping
3. Participant Seating: Each seat contributes to collective key
4. Output Reveal: Decrypted message appears after ritual
```

### 5.2 Performance Piece: "Cipher Symphony"

```typescript
interface PerformanceScore {
  duration: number;  // minutes
  sections: Section[];
  performers: Performer[];
}

interface Section {
  name: string;
  startTime: number;
  duration: number;
  cipher: string;
  visualMode: string;
  audioMode: string;
  interactionMode: string;
}

const CIPHER_SYMPHONY: PerformanceScore = {
  duration: 30,
  sections: [
    {
      name: 'I. Plaintext (Exposition)',
      startTime: 0,
      duration: 5,
      cipher: 'none',
      visualMode: 'clear_text_flow',
      audioMode: 'spoken_word',
      interactionMode: 'audience_listens',
    },
    {
      name: 'II. Caesar (First Transformation)',
      startTime: 5,
      duration: 5,
      cipher: 'caesar',
      visualMode: 'wheel_rotation',
      audioMode: 'shifted_pitches',
      interactionMode: 'audience_votes_shift',
    },
    {
      name: 'III. Vigenère (Deepening)',
      startTime: 10,
      duration: 7,
      cipher: 'vigenere',
      visualMode: 'tabula_recta_trace',
      audioMode: 'chord_progressions',
      interactionMode: 'audience_provides_keyword',
    },
    {
      name: 'IV. Enigma (Mechanical Climax)',
      startTime: 17,
      duration: 8,
      cipher: 'enigma',
      visualMode: 'rotor_3d_projection',
      audioMode: 'polyrhythmic_rotors',
      interactionMode: 'distributed_key_fragments',
    },
    {
      name: 'V. Decryption (Resolution)',
      startTime: 25,
      duration: 5,
      cipher: 'reverse_all',
      visualMode: 'unwinding_spiral',
      audioMode: 'melodic_resolution',
      interactionMode: 'collective_key_reconstruction',
    },
  ],
  performers: [
    { role: 'Encryptor', instrument: 'keyboard', position: 'center' },
    { role: 'Rotor Operator', instrument: 'physical_rotors', position: 'left' },
    { role: 'Key Keeper', instrument: 'key_fragments', position: 'right' },
    { role: 'Sonifier', instrument: 'synthesis', position: 'offstage' },
  ],
};
```

### 5.3 Online Exhibition: "Persistent Ciphers"

```typescript
interface OnlineExhibition {
  title: string;
  ciphers: ExhibitedCipher[];
  globalState: GlobalExhibitionState;
}

interface ExhibitedCipher {
  id: string;
  title: string;
  artist: string;
  description: string;

  // The cipher itself
  cipher: LivingCipher;

  // Exhibition-specific properties
  visitorContributions: VisitorContribution[];
  evolutionHistory: EvolutionSnapshot[];
  currentVisualization: string;
}

interface GlobalExhibitionState {
  totalVisitors: number;
  activeVisitors: number;
  globalKey: string;  // Derived from all visitor contributions
  entropyPool: number;  // Collective randomness
  lastMutationEvent: number;
}

// Ciphers evolve based on visitor interaction
class PersistentCipherExhibition {
  private ciphers: Map<string, ExhibitedCipher> = new Map();
  private globalState: GlobalExhibitionState;

  onVisitorInteraction(
    visitorId: string,
    cipherId: string,
    interaction: string
  ): void {
    const cipher = this.ciphers.get(cipherId);
    if (!cipher) return;

    // Record contribution
    cipher.visitorContributions.push({
      visitorId,
      interaction,
      timestamp: Date.now(),
    });

    // Contribution affects cipher evolution
    this.evolveCipherFromInteraction(cipher, interaction);

    // Update global state
    this.globalState.entropyPool += this.calculateEntropy(interaction);
    this.updateGlobalKey();

    // Snapshot evolution
    cipher.evolutionHistory.push({
      timestamp: Date.now(),
      genome: { ...cipher.cipher.genome },
      fitness: cipher.cipher.fitness,
    });
  }

  // Ciphers that haven't been visited "sleep"
  // Active ciphers evolve faster
  updateAll(deltaTime: number): void {
    for (const cipher of this.ciphers.values()) {
      const lastInteraction = cipher.visitorContributions.length > 0
        ? cipher.visitorContributions[cipher.visitorContributions.length - 1].timestamp
        : 0;

      const dormancy = (Date.now() - lastInteraction) / (1000 * 60 * 60); // hours

      if (dormancy < 1) {
        // Active: fast evolution
        this.evolveCipherFromEntropy(cipher, this.globalState.entropyPool * deltaTime);
      } else if (dormancy < 24) {
        // Drowsy: slow evolution
        this.evolveCipherFromEntropy(cipher, this.globalState.entropyPool * deltaTime * 0.1);
      }
      // Beyond 24 hours: cipher sleeps
    }
  }
}
```

---

## Conclusion

Cipher as Generative Art Form reimagines encryption through artistic lenses:

1. **Encryption as Composition** — Transformation rules become aesthetic choices
2. **Living Ciphers** — Evolutionary systems that grow and adapt
3. **Participatory Encryption** — Audiences contribute to key generation
4. **Sonification** — Sound-cipher correspondences for musical expression
5. **Exhibition Concepts** — Physical and online installation ideas

This framework positions cryptography not as mere secrecy tool but as rich generative system with aesthetic, social, and experiential dimensions.

---

*This document is part of the Cipher Rendering Pipeline Extension Project, Phase 2.*
