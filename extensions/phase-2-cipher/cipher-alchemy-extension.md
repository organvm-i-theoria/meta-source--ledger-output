# Cipher Alchemy Extension

## Zodiac Ciphers, Historical Compendium & Cryptanalysis Framework

**Document Type:** Technical Specification
**Version:** 1.0
**Extends:** `cipher-rendering-unified-architecture.md`
**Purpose:** Extend cipher system with astrological ciphers, comprehensive historical taxonomy, and cryptanalysis algorithms

---

## Executive Summary

The Cipher Alchemy Extension expands the cipher rendering system with three major components:

1. **Astrological Cipher Family:** Zodiac-based encoding systems mapping letters to celestial positions
2. **Historical Code Compendium:** Complete taxonomy of historical ciphers from Ancient to WWII, including unsolved mysteries
3. **Cryptanalysis Algorithm Framework:** Pattern recognition engines for breaking ciphers

All components integrate with the **Polycosm Reality Engine** for multi-prism analysis.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    CIPHER ALCHEMY EXTENSION                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐         │
│  │   ASTROLOGICAL  │  │   HISTORICAL    │  │  CRYPTANALYSIS  │         │
│  │     FAMILY      │  │   COMPENDIUM    │  │    FRAMEWORK    │         │
│  ├─────────────────┤  ├─────────────────┤  ├─────────────────┤         │
│  │ Zodiac12        │  │ Ancient         │  │ Frequency       │         │
│  │ Planetary       │  │ Classical       │  │ Index of Coinc. │         │
│  │ Decan           │  │ Renaissance     │  │ Kasiski         │         │
│  │ Degree          │  │ Enlightenment   │  │ Known-Plaintext │         │
│  │ Elemental       │  │ WWI/WWII        │  │ ML Pattern      │         │
│  │                 │  │ UNSOLVED        │  │ Collaborative   │         │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘         │
│           │                    │                    │                   │
│           └────────────────────┼────────────────────┘                   │
│                                │                                        │
│                    ┌───────────▼───────────┐                           │
│                    │   POLYCOSM PRISM      │                           │
│                    │   Multi-Lens Analysis │                           │
│                    │                       │                           │
│                    │   Oracle  Celestial   │                           │
│                    │   Poet    Historical  │                           │
│                    │   Alchemical          │                           │
│                    └───────────────────────┘                           │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

# Part 1: Astrological Cipher Family

## Overview

Astrological ciphers encode messages using celestial correspondences. The system draws from Renaissance occult traditions, particularly Agrippa's *Three Books of Occult Philosophy* (1531).

### Cipher Taxonomy

| Cipher | Resolution | Mechanism | Visual Metaphor |
|--------|------------|-----------|-----------------|
| **Zodiac12** | 12 signs | 26 letters → 12 signs (2-3 per sign) | Rotating zodiac wheel |
| **Planetary** | 7 planets | 7 classical planets rule letter groups | Orbital system |
| **Decan** | 36 decans | 10° divisions with planetary rulers | 36-spoke wheel |
| **Degree** | 360° | Full angular encoding | Continuous dial |
| **Elemental** | 4 elements | Fire/Earth/Air/Water groupings | Elemental quadrant |

---

## Extended CipherFamily Enum

```typescript
enum CipherFamily {
  // Existing families
  SUBSTITUTION_SIMPLE,
  SUBSTITUTION_POLY,
  TRANSPOSITION,
  MECHANICAL,
  STREAM,
  BLOCK,
  ASYMMETRIC,
  HASH,

  // New: Astrological family
  ASTROLOGICAL,

  // New: Historical period families
  HISTORICAL_ANCIENT,        // Pre-500 CE
  HISTORICAL_CLASSICAL,      // 500-1400 CE
  HISTORICAL_RENAISSANCE,    // 1400-1700
  HISTORICAL_ENLIGHTENMENT,  // 1700-1900
  HISTORICAL_WWI_WWII,       // 1914-1945

  // New: Unsolved cipher category
  UNSOLVED,
}
```

---

## Astrological Cipher Interface

```typescript
interface IAstrologicalCipher extends ICipher {
  /** The celestial system used for encoding */
  readonly celestialSystem: CelestialSystem;

  /**
   * Set epoch time for time-based encoding variations.
   * Some ciphers shift based on astronomical positions at a given moment.
   */
  setEpochTime?(datetime: Date): void;

  /**
   * Get the current celestial configuration.
   */
  getCelestialConfig(): CelestialConfig;

  /**
   * Get visual hints specific to celestial rendering.
   */
  getCelestialVisualHints(): CelestialVisualHints;

  /**
   * Map a character to its celestial position.
   */
  getCharacterPosition(char: string): CelestialPosition;
}

enum CelestialSystem {
  ZODIAC_12 = 'zodiac_12',
  PLANETARY_7 = 'planetary_7',
  DECAN_36 = 'decan_36',
  DEGREE_360 = 'degree_360',
  ELEMENTAL_4 = 'elemental_4',
}

interface CelestialConfig {
  system: CelestialSystem;
  epochTime?: Date;
  houseSystem?: HouseSystem;
  tropicalVsSidereal?: 'tropical' | 'sidereal';
}

interface CelestialPosition {
  sign?: ZodiacSign;
  planet?: Planet;
  decan?: number;      // 0-35
  degree?: number;     // 0-360
  element?: Element;
  modality?: Modality;
}

interface CelestialVisualHints {
  wheelRadius: number;
  signColors: Record<ZodiacSign, string>;
  planetGlyphs: Record<Planet, string>;
  aspectLines: boolean;
  animationStyle: 'rotate' | 'pulse' | 'orbit';
}
```

---

## Zodiac12 Cipher

### Mechanism

Maps 26 letters to 12 zodiac signs. Each sign receives 2-3 letters based on traditional elemental groupings.

```
┌────────────────────────────────────────────────────────────┐
│                    ZODIAC12 CIPHER                          │
├────────────────────────────────────────────────────────────┤
│                                                             │
│              ♈ Aries: A, M                                 │
│            ♉ Taurus: B, N                                  │
│           ♊ Gemini: C, O                                   │
│          ♋ Cancer: D, P                                    │
│            ♌ Leo: E, Q                                     │
│          ♍ Virgo: F, R                                     │
│          ♎ Libra: G, S                                     │
│        ♏ Scorpio: H, T                                     │
│     ♐ Sagittarius: I, U                                    │
│       ♑ Capricorn: J, V                                    │
│        ♒ Aquarius: K, W                                    │
│         ♓ Pisces: L, X, Y, Z                               │
│                                                             │
│  Encoding: Letter → Sign → Sign position + offset          │
│  Output: Sign glyph or numeric position (1-12)             │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

### Implementation

```typescript
class Zodiac12Cipher implements IAstrologicalCipher {
  readonly id = 'zodiac12';
  readonly name = 'Zodiac 12-Sign Cipher';
  readonly family = CipherFamily.ASTROLOGICAL;
  readonly complexity = ComplexityLevel.STANDARD;
  readonly celestialSystem = CelestialSystem.ZODIAC_12;

  // Traditional letter-to-sign mapping
  private readonly ZODIAC_MAP: Map<string, ZodiacSign> = new Map([
    ['A', ZodiacSign.ARIES], ['M', ZodiacSign.ARIES],
    ['B', ZodiacSign.TAURUS], ['N', ZodiacSign.TAURUS],
    ['C', ZodiacSign.GEMINI], ['O', ZodiacSign.GEMINI],
    ['D', ZodiacSign.CANCER], ['P', ZodiacSign.CANCER],
    ['E', ZodiacSign.LEO], ['Q', ZodiacSign.LEO],
    ['F', ZodiacSign.VIRGO], ['R', ZodiacSign.VIRGO],
    ['G', ZodiacSign.LIBRA], ['S', ZodiacSign.LIBRA],
    ['H', ZodiacSign.SCORPIO], ['T', ZodiacSign.SCORPIO],
    ['I', ZodiacSign.SAGITTARIUS], ['U', ZodiacSign.SAGITTARIUS],
    ['J', ZodiacSign.CAPRICORN], ['V', ZodiacSign.CAPRICORN],
    ['K', ZodiacSign.AQUARIUS], ['W', ZodiacSign.AQUARIUS],
    ['L', ZodiacSign.PISCES], ['X', ZodiacSign.PISCES],
    ['Y', ZodiacSign.PISCES], ['Z', ZodiacSign.PISCES],
  ]);

  private readonly ZODIAC_GLYPHS: Record<ZodiacSign, string> = {
    [ZodiacSign.ARIES]: '♈',
    [ZodiacSign.TAURUS]: '♉',
    [ZodiacSign.GEMINI]: '♊',
    [ZodiacSign.CANCER]: '♋',
    [ZodiacSign.LEO]: '♌',
    [ZodiacSign.VIRGO]: '♍',
    [ZodiacSign.LIBRA]: '♎',
    [ZodiacSign.SCORPIO]: '♏',
    [ZodiacSign.SAGITTARIUS]: '♐',
    [ZodiacSign.CAPRICORN]: '♑',
    [ZodiacSign.AQUARIUS]: '♒',
    [ZodiacSign.PISCES]: '♓',
  };

  step(state: CipherState, input: string): StepResult {
    const char = input[0].toUpperCase();
    const sign = this.ZODIAC_MAP.get(char);

    if (!sign) {
      // Pass through non-alphabetic
      return this.passThrough(state, char);
    }

    const glyph = this.ZODIAC_GLYPHS[sign];
    const offset = this.getLetterOffset(char, sign);

    const events: CipherEvent[] = [
      {
        type: EventType.INPUT_CHARACTER,
        timestamp: Date.now(),
        data: { char },
        visualizable: true,
      },
      {
        type: EventType.SUBSTITUTION,
        timestamp: Date.now(),
        data: {
          from: char,
          to: glyph,
          sign,
          offset,
          signIndex: Object.values(ZodiacSign).indexOf(sign),
        },
        visualizable: true,
      },
    ];

    const nextState = this.advanceState(state, char, glyph);

    return {
      nextState,
      output: glyph,
      events,
      complete: false,
    };
  }

  getCharacterPosition(char: string): CelestialPosition {
    const sign = this.ZODIAC_MAP.get(char.toUpperCase());
    if (!sign) return {};

    const signIndex = Object.values(ZodiacSign).indexOf(sign);
    const degree = signIndex * 30 + this.getLetterOffset(char, sign) * 10;

    return {
      sign,
      degree,
      element: this.getElement(sign),
      modality: this.getModality(sign),
    };
  }

  getCelestialVisualHints(): CelestialVisualHints {
    return {
      wheelRadius: 200,
      signColors: {
        [ZodiacSign.ARIES]: '#FF4136',
        [ZodiacSign.TAURUS]: '#2ECC40',
        [ZodiacSign.GEMINI]: '#FFDC00',
        [ZodiacSign.CANCER]: '#B10DC9',
        [ZodiacSign.LEO]: '#FF851B',
        [ZodiacSign.VIRGO]: '#7FDBFF',
        [ZodiacSign.LIBRA]: '#F012BE',
        [ZodiacSign.SCORPIO]: '#111111',
        [ZodiacSign.SAGITTARIUS]: '#FF4136',
        [ZodiacSign.CAPRICORN]: '#3D9970',
        [ZodiacSign.AQUARIUS]: '#39CCCC',
        [ZodiacSign.PISCES]: '#0074D9',
      },
      planetGlyphs: {},
      aspectLines: false,
      animationStyle: 'rotate',
    };
  }

  private getElement(sign: ZodiacSign): Element {
    const elements: Record<ZodiacSign, Element> = {
      [ZodiacSign.ARIES]: Element.FIRE,
      [ZodiacSign.LEO]: Element.FIRE,
      [ZodiacSign.SAGITTARIUS]: Element.FIRE,
      [ZodiacSign.TAURUS]: Element.EARTH,
      [ZodiacSign.VIRGO]: Element.EARTH,
      [ZodiacSign.CAPRICORN]: Element.EARTH,
      [ZodiacSign.GEMINI]: Element.AIR,
      [ZodiacSign.LIBRA]: Element.AIR,
      [ZodiacSign.AQUARIUS]: Element.AIR,
      [ZodiacSign.CANCER]: Element.WATER,
      [ZodiacSign.SCORPIO]: Element.WATER,
      [ZodiacSign.PISCES]: Element.WATER,
    };
    return elements[sign];
  }

  // ... additional implementation
}
```

---

## Planetary Cipher

### Mechanism

Based on Agrippa's planetary tables from *Three Books of Occult Philosophy*. Each of the 7 classical planets rules a group of letters.

```
┌────────────────────────────────────────────────────────────┐
│                    PLANETARY CIPHER                         │
│              (Agrippa Planetary Tables)                     │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  ☉ Sun (Sol):      A, H, O, V                              │
│  ☽ Moon (Luna):    B, I, P, W                              │
│  ☿ Mercury:        C, J, Q, X                              │
│  ♀ Venus:          D, K, R, Y                              │
│  ♂ Mars:           E, L, S, Z                              │
│  ♃ Jupiter:        F, M, T                                 │
│  ♄ Saturn:         G, N, U                                 │
│                                                             │
│  Visual: Planetary orbits with letters along paths         │
│  Animation: Orbital motion during encryption               │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

### Implementation

```typescript
class PlanetaryCipher implements IAstrologicalCipher {
  readonly id = 'planetary';
  readonly name = 'Agrippa Planetary Cipher';
  readonly family = CipherFamily.ASTROLOGICAL;
  readonly complexity = ComplexityLevel.STANDARD;
  readonly celestialSystem = CelestialSystem.PLANETARY_7;

  // Agrippa's planetary letter correspondences
  private readonly PLANETARY_MAP: Map<string, Planet> = new Map([
    // Sun - The Sun rules vowels and certain consonants
    ['A', Planet.SUN], ['H', Planet.SUN],
    ['O', Planet.SUN], ['V', Planet.SUN],
    // Moon - Emotional, flowing letters
    ['B', Planet.MOON], ['I', Planet.MOON],
    ['P', Planet.MOON], ['W', Planet.MOON],
    // Mercury - Communication, quick sounds
    ['C', Planet.MERCURY], ['J', Planet.MERCURY],
    ['Q', Planet.MERCURY], ['X', Planet.MERCURY],
    // Venus - Harmonious, soft sounds
    ['D', Planet.VENUS], ['K', Planet.VENUS],
    ['R', Planet.VENUS], ['Y', Planet.VENUS],
    // Mars - Sharp, aggressive sounds
    ['E', Planet.MARS], ['L', Planet.MARS],
    ['S', Planet.MARS], ['Z', Planet.MARS],
    // Jupiter - Expansive sounds
    ['F', Planet.JUPITER], ['M', Planet.JUPITER],
    ['T', Planet.JUPITER],
    // Saturn - Heavy, ending sounds
    ['G', Planet.SATURN], ['N', Planet.SATURN],
    ['U', Planet.SATURN],
  ]);

  private readonly PLANET_GLYPHS: Record<Planet, string> = {
    [Planet.SUN]: '☉',
    [Planet.MOON]: '☽',
    [Planet.MERCURY]: '☿',
    [Planet.VENUS]: '♀',
    [Planet.MARS]: '♂',
    [Planet.JUPITER]: '♃',
    [Planet.SATURN]: '♄',
  };

  private readonly PLANET_ORBITS: Record<Planet, number> = {
    [Planet.SATURN]: 7,    // Outermost
    [Planet.JUPITER]: 6,
    [Planet.MARS]: 5,
    [Planet.SUN]: 4,       // Center of traditional order
    [Planet.VENUS]: 3,
    [Planet.MERCURY]: 2,
    [Planet.MOON]: 1,      // Innermost
  };

  getCharacterPosition(char: string): CelestialPosition {
    const planet = this.PLANETARY_MAP.get(char.toUpperCase());
    if (!planet) return {};

    const orbit = this.PLANET_ORBITS[planet];
    const letterIndex = this.getLetterIndex(char, planet);
    const degree = letterIndex * (360 / 4); // 4 letters per planet max

    return {
      planet,
      degree,
    };
  }

  getCelestialVisualHints(): CelestialVisualHints {
    return {
      wheelRadius: 250,
      signColors: {},
      planetGlyphs: this.PLANET_GLYPHS,
      aspectLines: true,
      animationStyle: 'orbit',
    };
  }

  // ... implementation
}
```

---

## Decan Cipher

### Mechanism

Uses the 36 decans (10° divisions of the zodiac), each with its own planetary ruler. Provides finer granularity than the 12-sign cipher.

```
┌────────────────────────────────────────────────────────────┐
│                    DECAN CIPHER                             │
│             (36 Ten-Degree Divisions)                       │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  Each sign has 3 decans (30° ÷ 3 = 10° each)               │
│                                                             │
│  Aries Decans:                                             │
│    0°-10°:  ♈₁ (Mars ruler)    → A                         │
│    10°-20°: ♈₂ (Sun ruler)     → B                         │
│    20°-30°: ♈₃ (Venus ruler)   → C                         │
│                                                             │
│  Total: 36 decans for ~26 letters (some share)             │
│                                                             │
│  Visual: 36-spoke wheel with planetary rulers              │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

---

## Degree Cipher

### Mechanism

Full 360° encoding where each letter maps to approximately 13.8° (360 ÷ 26).

```typescript
class DegreeCipher implements IAstrologicalCipher {
  readonly id = 'degree360';
  readonly name = 'Full Degree Cipher';
  readonly family = CipherFamily.ASTROLOGICAL;
  readonly celestialSystem = CelestialSystem.DEGREE_360;

  private readonly DEGREE_PER_LETTER = 360 / 26; // ~13.846°

  encrypt(plaintext: string): EncryptionResult {
    const output: string[] = [];

    for (const char of plaintext.toUpperCase()) {
      const index = char.charCodeAt(0) - 65;
      if (index >= 0 && index < 26) {
        const degree = (index * this.DEGREE_PER_LETTER).toFixed(1);
        output.push(degree);
      } else {
        output.push(char);
      }
    }

    return {
      ciphertext: output.join('°'),
      // ...
    };
  }

  getCharacterPosition(char: string): CelestialPosition {
    const index = char.toUpperCase().charCodeAt(0) - 65;
    if (index < 0 || index >= 26) return {};

    const degree = index * this.DEGREE_PER_LETTER;
    const signIndex = Math.floor(degree / 30);
    const signs = Object.values(ZodiacSign);

    return {
      sign: signs[signIndex],
      degree,
      decan: Math.floor((degree % 30) / 10),
    };
  }
}
```

---

## Zodiac Wheel Renderer

```typescript
class ZodiacWheelRenderer implements IVisualMetaphor {
  readonly id = 'zodiac_wheel';
  readonly name = 'Zodiac Wheel';
  readonly supportedFamilies = [CipherFamily.ASTROLOGICAL];

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private centerX: number;
  private centerY: number;
  private outerRadius: number;

  private readonly ZODIAC_GLYPHS = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];

  initialize(container: HTMLElement, config: RenderConfig): void {
    this.canvas = document.createElement('canvas');
    this.canvas.width = config.width * config.dpr;
    this.canvas.height = config.height * config.dpr;
    this.ctx = this.canvas.getContext('2d')!;
    this.ctx.scale(config.dpr, config.dpr);

    this.centerX = config.width / 2;
    this.centerY = config.height / 2;
    this.outerRadius = Math.min(config.width, config.height) * 0.4;

    container.appendChild(this.canvas);
    this.drawWheel();
  }

  private drawWheel(): void {
    const ctx = this.ctx;

    // Outer ring
    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY, this.outerRadius, 0, Math.PI * 2);
    ctx.strokeStyle = '#gold';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw 12 sign segments
    for (let i = 0; i < 12; i++) {
      const startAngle = (i * 30 - 90) * (Math.PI / 180);
      const endAngle = ((i + 1) * 30 - 90) * (Math.PI / 180);

      // Segment arc
      ctx.beginPath();
      ctx.moveTo(this.centerX, this.centerY);
      ctx.arc(this.centerX, this.centerY, this.outerRadius, startAngle, endAngle);
      ctx.closePath();

      // Alternate fill
      ctx.fillStyle = i % 2 === 0 ? 'rgba(255,215,0,0.1)' : 'rgba(192,192,192,0.1)';
      ctx.fill();
      ctx.stroke();

      // Glyph label
      const midAngle = (startAngle + endAngle) / 2;
      const labelRadius = this.outerRadius * 0.85;
      const x = this.centerX + Math.cos(midAngle) * labelRadius;
      const y = this.centerY + Math.sin(midAngle) * labelRadius;

      ctx.font = '24px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#FFD700';
      ctx.fillText(this.ZODIAC_GLYPHS[i], x, y);
    }
  }

  render(state: CipherState): void {
    this.drawWheel();

    const focus = state.visual.focus;
    if (focus.length > 0) {
      this.highlightPositions(focus);
    }
  }

  private highlightPositions(focus: FocusTarget[]): void {
    const ctx = this.ctx;

    for (const target of focus) {
      if (target.type === 'sign') {
        const signIndex = parseInt(target.value);
        this.highlightSign(signIndex);
      } else if (target.type === 'degree') {
        const degree = parseFloat(target.value);
        this.highlightDegree(degree);
      }
    }
  }

  private highlightSign(signIndex: number): void {
    const startAngle = (signIndex * 30 - 90) * (Math.PI / 180);
    const endAngle = ((signIndex + 1) * 30 - 90) * (Math.PI / 180);

    this.ctx.beginPath();
    this.ctx.moveTo(this.centerX, this.centerY);
    this.ctx.arc(this.centerX, this.centerY, this.outerRadius, startAngle, endAngle);
    this.ctx.closePath();
    this.ctx.fillStyle = 'rgba(255, 255, 0, 0.4)';
    this.ctx.fill();
  }

  private highlightDegree(degree: number): void {
    const angle = (degree - 90) * (Math.PI / 180);
    const x = this.centerX + Math.cos(angle) * (this.outerRadius - 10);
    const y = this.centerY + Math.sin(angle) * (this.outerRadius - 10);

    this.ctx.beginPath();
    this.ctx.arc(x, y, 8, 0, Math.PI * 2);
    this.ctx.fillStyle = '#FF4136';
    this.ctx.fill();
  }

  async animate(from: CipherState, to: CipherState, duration: number): Promise<void> {
    // Animate rotation between positions
    // ...
  }
}
```

---

# Part 2: Historical Code Compendium

## Complete Cipher Taxonomy

### Era Classification

```
HISTORICAL CIPHERS
│
├── ANCIENT (Pre-500 CE)
│   ├── Spartan Scytale (~700 BCE)
│   ├── Hebrew Atbash (~500 BCE)
│   ├── Greek Polybius (~200 BCE)
│   └── Caesar (50 BCE)
│
├── CLASSICAL (500-1400 CE)
│   ├── Arab Frequency Analysis (Al-Kindi, ~850 CE)
│   └── Papal Nomenclators
│
├── RENAISSANCE (1400-1700)
│   ├── Alberti Disk (1467)
│   ├── Trithemius Tableau (1518)
│   ├── Vigenère (1553)
│   └── Bacon's Bilateral (1605)
│
├── ENLIGHTENMENT (1700-1900)
│   ├── Jefferson Wheel (1795)
│   ├── Playfair (1854)
│   └── Bazeries Cylinder (1891)
│
├── WWI/WWII (1914-1945)
│   ├── ADFGX/ADFGVX (1918)
│   ├── Enigma (1918-1945)
│   ├── Lorenz SZ40/42 (1941)
│   ├── Purple (Japanese, 1939)
│   └── Navajo Code Talkers (1942)
│
└── UNSOLVED
    ├── Voynich Manuscript (~1420)
    ├── Zodiac Killer Ciphers (1969-1970)
    ├── Kryptos (1990)
    ├── Beale Ciphers (~1885)
    └── [12+ more documented]
```

---

## Historical Cipher Interface

```typescript
interface IHistoricalCipher extends ICipher {
  /** Historical context and metadata */
  readonly historicalContext: HistoricalContext;

  /** Known vulnerabilities for educational display */
  readonly knownVulnerabilities: Vulnerability[];

  /** Related ciphers in evolution chain */
  readonly evolutionChain: EvolutionLink[];

  /** Get academic sources */
  getSources(): AcademicSource[];
}

interface HistoricalContext {
  era: HistoricalEra;
  yearIntroduced: number | string;  // "~1420" for Voynich
  yearBroken?: number;
  inventor?: string;
  primaryUsers: string[];
  notableMessages?: string[];
  historicalSignificance: string;
}

enum HistoricalEra {
  ANCIENT = 'ancient',         // Pre-500 CE
  CLASSICAL = 'classical',     // 500-1400 CE
  RENAISSANCE = 'renaissance', // 1400-1700
  ENLIGHTENMENT = 'enlightenment', // 1700-1900
  WWI_WWII = 'wwi_wwii',       // 1914-1945
  MODERN = 'modern',           // 1945-present
  UNSOLVED = 'unsolved',       // Never broken
}

interface Vulnerability {
  type: VulnerabilityType;
  description: string;
  exploitMethod: string;
  discoverer?: string;
  yearDiscovered?: number;
}

enum VulnerabilityType {
  FREQUENCY_ANALYSIS = 'frequency',
  KEY_LENGTH_DETECTION = 'key_length',
  KNOWN_PLAINTEXT = 'known_plaintext',
  CRIB_BASED = 'crib',
  BRUTE_FORCE = 'brute_force',
  MECHANICAL_FLAW = 'mechanical',
  OPERATOR_ERROR = 'operator',
  MATHEMATICAL = 'mathematical',
}

interface EvolutionLink {
  cipherId: string;
  relationship: 'predecessor' | 'successor' | 'variant' | 'inspired_by';
  description: string;
}

interface AcademicSource {
  title: string;
  authors: string[];
  year: number;
  type: 'book' | 'paper' | 'primary_source';
  url?: string;
}
```

---

## Historical Cipher Implementations

### Spartan Scytale (Ancient)

```typescript
class ScytaleCipher implements IHistoricalCipher {
  readonly id = 'scytale';
  readonly name = 'Spartan Scytale';
  readonly family = CipherFamily.TRANSPOSITION;
  readonly complexity = ComplexityLevel.ELEMENTARY;

  readonly historicalContext: HistoricalContext = {
    era: HistoricalEra.ANCIENT,
    yearIntroduced: '~700 BCE',
    inventor: 'Spartan military',
    primaryUsers: ['Spartan ephors', 'Greek military'],
    historicalSignificance:
      'First known military cipher. Wrapped leather strip around rod (scytale) ' +
      'of specific diameter. Message only readable with matching rod.',
  };

  readonly knownVulnerabilities: Vulnerability[] = [
    {
      type: VulnerabilityType.BRUTE_FORCE,
      description: 'Limited number of possible rod diameters',
      exploitMethod: 'Try all reasonable rod sizes',
    },
  ];

  private rodDiameter: number = 5; // Number of characters per row

  encrypt(plaintext: string): EncryptionResult {
    const clean = plaintext.toUpperCase().replace(/[^A-Z]/g, '');
    const rows = Math.ceil(clean.length / this.rodDiameter);

    // Pad to fill rectangle
    const padded = clean.padEnd(rows * this.rodDiameter, 'X');

    // Read column by column (simulates unwrapping)
    let ciphertext = '';
    for (let col = 0; col < this.rodDiameter; col++) {
      for (let row = 0; row < rows; row++) {
        ciphertext += padded[row * this.rodDiameter + col];
      }
    }

    return { ciphertext, /* ... */ };
  }
}
```

### Hebrew Atbash (Ancient)

```typescript
class AtbashCipher implements IHistoricalCipher {
  readonly id = 'atbash';
  readonly name = 'Hebrew Atbash';
  readonly family = CipherFamily.SUBSTITUTION_SIMPLE;

  readonly historicalContext: HistoricalContext = {
    era: HistoricalEra.ANCIENT,
    yearIntroduced: '~500 BCE',
    primaryUsers: ['Hebrew scribes', 'Biblical authors'],
    notableMessages: ['Book of Jeremiah: "Sheshach" = "Babel"'],
    historicalSignificance:
      'Mirror alphabet cipher. A↔Z, B↔Y, etc. Name from first/last Hebrew letters: ' +
      'Aleph-Tav-Bet-Shin. Used in Hebrew Bible for concealment.',
  };

  private readonly ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private readonly REVERSED = 'ZYXWVUTSRQPONMLKJIHGFEDCBA';

  encrypt(plaintext: string): EncryptionResult {
    let ciphertext = '';
    for (const char of plaintext.toUpperCase()) {
      const index = this.ALPHABET.indexOf(char);
      ciphertext += index >= 0 ? this.REVERSED[index] : char;
    }
    return { ciphertext, /* ... */ };
  }
}
```

### ADFGVX Cipher (WWI)

```typescript
class ADFGVXCipher implements IHistoricalCipher {
  readonly id = 'adfgvx';
  readonly name = 'ADFGVX Cipher';
  readonly family = CipherFamily.SUBSTITUTION_POLY;
  readonly complexity = ComplexityLevel.COMPLEX;

  readonly historicalContext: HistoricalContext = {
    era: HistoricalEra.WWI_WWII,
    yearIntroduced: 1918,
    yearBroken: 1918,
    inventor: 'Fritz Nebel (German)',
    primaryUsers: ['German Army WWI'],
    historicalSignificance:
      'Fractionating transposition cipher. Each letter becomes two from {A,D,F,G,V,X}. ' +
      'Chosen because distinct in Morse code. Broken by Georges Painvin.',
  };

  readonly knownVulnerabilities: Vulnerability[] = [
    {
      type: VulnerabilityType.FREQUENCY_ANALYSIS,
      description: 'Digraph frequencies leak through columnar transposition',
      exploitMethod: 'Painvin\'s statistical attack on column pairs',
      discoverer: 'Georges Painvin',
      yearDiscovered: 1918,
    },
  ];

  private readonly FRACTIONATION_CHARS = ['A', 'D', 'F', 'G', 'V', 'X'];
  private grid: string[][] = [];
  private transpositionKey: string = '';

  configure(config: CipherConfig): void {
    // Build 6×6 grid with keyword
    this.grid = this.buildGrid(config.keyword || '');
    this.transpositionKey = config.transpositionKey || 'PRIVACY';
  }

  encrypt(plaintext: string): EncryptionResult {
    // Step 1: Fractionate - each letter → pair of ADFGVX
    let fractionated = '';
    for (const char of plaintext.toUpperCase()) {
      const pos = this.findInGrid(char);
      if (pos) {
        fractionated += this.FRACTIONATION_CHARS[pos.row];
        fractionated += this.FRACTIONATION_CHARS[pos.col];
      }
    }

    // Step 2: Columnar transposition
    const ciphertext = this.columnarTranspose(fractionated, this.transpositionKey);

    return { ciphertext, /* ... */ };
  }
}
```

---

## Unsolved Cipher Framework

### Unsolved Cipher Interface

```typescript
interface IUnsolvedCipher extends IHistoricalCipher {
  /** Comprehensive facts known about the cipher */
  readonly knownFacts: UnsolvedCipherFacts;

  /** Community theories and attempted solutions */
  getCommunityTheories(): Theory[];

  /** Submit an analysis result for peer review */
  submitAnalysisResult(result: AnalysisSubmission): void;

  /** Apply an experimental decryption attempt */
  applyExperimentalDecryption(cipher: ICipher): ExperimentResult;

  /** Get breakthrough detection score */
  getBreakthroughScore(): number;
}

interface UnsolvedCipherFacts {
  /** Known creation date range */
  dateRange: [string, string];

  /** Physical artifact details if applicable */
  physicalArtifact?: PhysicalArtifact;

  /** Ciphertext characteristics */
  ciphertextStats: CiphertextStats;

  /** Confirmed partial solutions */
  partialSolutions: PartialSolution[];

  /** Methods already attempted */
  attemptedMethods: AttemptedMethod[];

  /** Active research groups */
  researchGroups: string[];
}

interface CiphertextStats {
  totalCharacters: number;
  uniqueSymbols: number;
  entropy: number;
  indexOfCoincidence: number;
  repeatedPatterns: RepeatedPattern[];
}

interface Theory {
  id: string;
  author: string;
  proposedDate: Date;
  proposedCipherType: string;
  proposedPlaintext?: string;
  supportingEvidence: string[];
  refutingEvidence: string[];
  communityScore: number;  // -1 to 1
}

interface AnalysisSubmission {
  analysisType: string;
  findings: string;
  evidence: Evidence[];
  proposedNextSteps: string[];
}

interface ExperimentResult {
  cipherApplied: string;
  output: string;
  coherenceScore: number;    // 0-1, how language-like
  patternMatches: number;
  verdict: 'promising' | 'inconclusive' | 'rejected';
}
```

---

### Documented Unsolved Ciphers

#### Voynich Manuscript

```typescript
class VoynichManuscript implements IUnsolvedCipher {
  readonly id = 'voynich';
  readonly name = 'Voynich Manuscript';
  readonly family = CipherFamily.UNSOLVED;

  readonly historicalContext: HistoricalContext = {
    era: HistoricalEra.UNSOLVED,
    yearIntroduced: '~1404-1438', // Carbon-dated
    primaryUsers: ['Unknown'],
    historicalSignificance:
      '240-page illustrated codex written in unknown script. ' +
      'Named after Wilfrid Voynich who purchased it in 1912. ' +
      'Now MS 408 at Yale\'s Beinecke Library.',
  };

  readonly knownFacts: UnsolvedCipherFacts = {
    dateRange: ['1404', '1438'],
    physicalArtifact: {
      location: 'Yale Beinecke Library, MS 408',
      pages: 240,
      dimensions: '23.5 × 16.2 cm',
      material: 'vellum',
      condition: 'good',
    },
    ciphertextStats: {
      totalCharacters: 170000,
      uniqueSymbols: 30,  // Approximate, varies by analysis
      entropy: 4.2,       // Bits per character
      indexOfCoincidence: 0.0695,
      repeatedPatterns: [
        { pattern: 'daiin', count: 500, significance: 'high' },
        { pattern: 'chedy', count: 200, significance: 'medium' },
      ],
    },
    partialSolutions: [],  // None confirmed
    attemptedMethods: [
      { method: 'Simple substitution', result: 'Rejected - word statistics inconsistent' },
      { method: 'Polyalphabetic', result: 'Inconclusive' },
      { method: 'Hebrew anagram', result: 'Rejected - unconvincing' },
      { method: 'Proto-Romance', result: 'Partially promising - Gerard Cheshire 2019' },
    ],
    researchGroups: ['Voynich Ninja', 'René Zandbergen site'],
  };

  getCommunityTheories(): Theory[] {
    return [
      {
        id: 'proto_romance',
        author: 'Gerard Cheshire',
        proposedDate: new Date('2019-05-15'),
        proposedCipherType: 'Proto-Romance language',
        supportingEvidence: ['Word structure analysis', 'Botanical identification'],
        refutingEvidence: ['Methodology criticized', 'Translations unconvincing'],
        communityScore: -0.3,
      },
      {
        id: 'artificial_language',
        author: 'Various',
        proposedDate: new Date('1970-01-01'),
        proposedCipherType: 'Constructed language',
        supportingEvidence: ['Statistical properties match artificial languages'],
        refutingEvidence: ['No known constructed language from era'],
        communityScore: 0.2,
      },
      {
        id: 'hoax',
        author: 'Gordon Rugg',
        proposedDate: new Date('2004-01-01'),
        proposedCipherType: 'Meaningless hoax',
        supportingEvidence: ['Cardan grille can produce similar text'],
        refutingEvidence: ['Statistical complexity argues against pure hoax'],
        communityScore: 0.0,
      },
    ];
  }

  applyExperimentalDecryption(cipher: ICipher): ExperimentResult {
    // Apply cipher to sample of Voynich text
    const sampleText = 'fchxdy qotedy shedy qotedy'; // Transcribed Voynich
    const result = cipher.decrypt(sampleText);

    return {
      cipherApplied: cipher.id,
      output: result.plaintext,
      coherenceScore: this.assessCoherence(result.plaintext),
      patternMatches: this.countPatternMatches(result.plaintext),
      verdict: this.evaluateResult(result.plaintext),
    };
  }
}
```

#### Zodiac Killer Ciphers

```typescript
class ZodiacCiphers implements IUnsolvedCipher {
  readonly id = 'zodiac';
  readonly name = 'Zodiac Killer Ciphers';
  readonly family = CipherFamily.UNSOLVED;

  readonly historicalContext: HistoricalContext = {
    era: HistoricalEra.UNSOLVED,
    yearIntroduced: '1969-1970',
    primaryUsers: ['Zodiac Killer (unidentified)'],
    historicalSignificance:
      'Four ciphers sent by serial killer to San Francisco newspapers. ' +
      'Z408 solved within week. Z340 solved December 2020 after 51 years. ' +
      'Z13 and Z32 remain unsolved.',
  };

  readonly knownFacts: UnsolvedCipherFacts = {
    dateRange: ['1969-07-31', '1970-06-26'],
    ciphertextStats: {
      totalCharacters: 340 + 13 + 32,  // Z340 + Z13 + Z32
      uniqueSymbols: 63,               // Z340
      entropy: 5.4,
      indexOfCoincidence: 0.0425,
      repeatedPatterns: [],
    },
    partialSolutions: [
      {
        cipher: 'Z408',
        solved: true,
        solver: 'Donald and Bettye Harden',
        date: '1969-08-08',
        plaintext: 'I LIKE KILLING PEOPLE...',
      },
      {
        cipher: 'Z340',
        solved: true,
        solver: 'David Oranchak, Jarl Van Eycke, Sam Blake',
        date: '2020-12-03',
        plaintext: 'I HOPE YOU ARE HAVING LOTS OF FUN...',
      },
    ],
    attemptedMethods: [
      { method: 'Homophonic substitution', result: 'Confirmed for Z408, Z340' },
      { method: 'Transposition variations', result: 'Key to Z340 solution' },
    ],
    researchGroups: ['Zodiac Killer Cipher Community', 'David Oranchak'],
  };

  // Z13: "MY NAME IS ____" - 13 symbols for name
  readonly z13 = {
    ciphertext: '⊕ K ⌘ A N A M ∧ + M E',
    possibleSolutions: ['Unknown'],
  };

  // Z32: Contains claimed bomb diagram location
  readonly z32 = {
    ciphertext: 'CAEN...', // 32 symbols
    possibleSolutions: ['Unknown'],
  };
}
```

#### Kryptos

```typescript
class KryptosSculpture implements IUnsolvedCipher {
  readonly id = 'kryptos';
  readonly name = 'Kryptos Sculpture';
  readonly family = CipherFamily.UNSOLVED;

  readonly historicalContext: HistoricalContext = {
    era: HistoricalEra.UNSOLVED,
    yearIntroduced: 1990,
    inventor: 'Jim Sanborn',
    primaryUsers: ['CIA Headquarters installation'],
    historicalSignificance:
      'Copper scroll sculpture at CIA HQ with 4 encrypted sections. ' +
      'K1-K3 solved by various cryptographers. K4 (97 characters) remains unsolved.',
  };

  readonly knownFacts: UnsolvedCipherFacts = {
    dateRange: ['1990-11-03', '1990-11-03'],
    physicalArtifact: {
      location: 'CIA Headquarters, Langley, VA',
      material: 'copper, granite, petrified wood',
      dimensions: '12 ft × 13 ft',
    },
    ciphertextStats: {
      totalCharacters: 97,  // K4 only
      uniqueSymbols: 26,
      entropy: 4.0,
      indexOfCoincidence: 0.040,
      repeatedPatterns: [
        { pattern: 'NYPVTT', significance: 'Unknown' },
        { pattern: 'BERLIN', significance: 'Sanborn clue: positions 64-69' },
        { pattern: 'CLOCK', significance: 'Sanborn clue: positions 70-74' },
      ],
    },
    partialSolutions: [
      { cipher: 'K1', solved: true, solver: 'Multiple', method: 'Vigenère' },
      { cipher: 'K2', solved: true, solver: 'Multiple', method: 'Vigenère' },
      { cipher: 'K3', solved: true, solver: 'Multiple', method: 'Transposition' },
      { cipher: 'K4', solved: false },
    ],
    attemptedMethods: [],
    researchGroups: ['Elonka Dunin', 'Kryptos Yahoo Group'],
  };

  readonly sanbornClues = [
    { year: 2010, clue: 'Letters 64-69 decrypt to BERLIN' },
    { year: 2014, clue: 'Letters 70-74 decrypt to CLOCK' },
    { year: 2020, clue: 'Letters 26-34 decrypt to NORTHEAST' },
  ];
}
```

---

# Part 3: Cryptanalysis Algorithm Framework

## Engine Architecture

```typescript
interface ICryptanalysisEngine {
  readonly id: string;
  readonly name: string;
  readonly targetFamilies: CipherFamily[];

  /**
   * Analyze ciphertext and return structured results.
   */
  analyze(ciphertext: string, config: AnalysisConfig): AnalysisResult;

  /**
   * Get Polycosm prism lenses for multi-view analysis.
   */
  getPrismLenses(): AnalysisLens[];

  /**
   * Estimate computational cost of analysis.
   */
  estimateCost(ciphertext: string): ComputationCost;
}

interface AnalysisConfig {
  maxIterations?: number;
  targetLanguage?: string;
  knownPlaintext?: string;
  parallelism?: number;
}

interface AnalysisResult {
  engineId: string;
  timestamp: number;
  confidence: number;

  // Structured findings
  findings: Finding[];
  recommendations: Recommendation[];
  metrics: AnalysisMetrics;

  // Visualization data
  visualData: VisualizationData;
}

interface AnalysisLens {
  id: string;
  name: string;
  category: PrismCategory;
  visualize(result: AnalysisResult): Visualization;
}
```

---

## Frequency Analysis Engine

```typescript
class FrequencyAnalysisEngine implements ICryptanalysisEngine {
  readonly id = 'frequency';
  readonly name = 'Frequency Analysis Engine';
  readonly targetFamilies = [
    CipherFamily.SUBSTITUTION_SIMPLE,
    CipherFamily.ASTROLOGICAL,
  ];

  private readonly ENGLISH_FREQUENCIES: Record<string, number> = {
    'E': 0.127, 'T': 0.091, 'A': 0.082, 'O': 0.075, 'I': 0.070,
    'N': 0.067, 'S': 0.063, 'H': 0.061, 'R': 0.060, 'D': 0.043,
    'L': 0.040, 'C': 0.028, 'U': 0.028, 'M': 0.024, 'W': 0.024,
    'F': 0.022, 'G': 0.020, 'Y': 0.020, 'P': 0.019, 'B': 0.015,
    'V': 0.010, 'K': 0.008, 'J': 0.002, 'X': 0.002, 'Q': 0.001,
    'Z': 0.001,
  };

  private readonly ENGLISH_BIGRAMS: Record<string, number> = {
    'TH': 0.0356, 'HE': 0.0307, 'IN': 0.0243, 'ER': 0.0205,
    'AN': 0.0199, 'RE': 0.0185, 'ON': 0.0176, 'AT': 0.0149,
    // ... more
  };

  analyze(ciphertext: string, config: AnalysisConfig): AnalysisResult {
    const clean = ciphertext.toUpperCase().replace(/[^A-Z]/g, '');

    // Single character frequencies
    const charFreq = this.calculateFrequencies(clean);
    const chiSquared = this.calculateChiSquared(charFreq);

    // Bigram frequencies
    const bigramFreq = this.calculateBigramFrequencies(clean);

    // Trigram frequencies
    const trigramFreq = this.calculateTrigramFrequencies(clean);

    // Index of Coincidence
    const ic = this.calculateIC(charFreq, clean.length);

    // Likely cipher type based on IC
    const likelyCipherType = this.inferCipherType(ic);

    return {
      engineId: this.id,
      timestamp: Date.now(),
      confidence: this.calculateConfidence(ic, chiSquared),
      findings: [
        {
          type: 'character_distribution',
          data: charFreq,
          interpretation: this.interpretCharacterDistribution(charFreq),
        },
        {
          type: 'index_of_coincidence',
          value: ic,
          interpretation: this.interpretIC(ic),
        },
        {
          type: 'likely_cipher_type',
          value: likelyCipherType,
          confidence: this.getCipherTypeConfidence(ic),
        },
      ],
      recommendations: this.generateRecommendations(ic, charFreq),
      metrics: {
        indexOfCoincidence: ic,
        chiSquared,
        uniqueCharacters: Object.keys(charFreq).length,
        textLength: clean.length,
      },
      visualData: {
        histograms: [
          { type: 'character', data: charFreq },
          { type: 'bigram', data: bigramFreq },
        ],
        comparisons: [
          { observed: charFreq, expected: this.ENGLISH_FREQUENCIES },
        ],
      },
    };
  }

  private calculateIC(frequencies: Record<string, number>, length: number): number {
    let sum = 0;
    for (const freq of Object.values(frequencies)) {
      const count = freq * length;
      sum += count * (count - 1);
    }
    return sum / (length * (length - 1));
  }

  private inferCipherType(ic: number): string {
    if (ic >= 0.060 && ic <= 0.075) {
      return 'monoalphabetic_substitution';
    } else if (ic >= 0.040 && ic < 0.050) {
      return 'polyalphabetic_likely';
    } else if (ic >= 0.030 && ic < 0.040) {
      return 'strong_polyalphabetic_or_random';
    } else {
      return 'unknown';
    }
  }

  getPrismLenses(): AnalysisLens[] {
    return [
      {
        id: 'oracle_frequency',
        name: 'Oracle: Statistical Distribution',
        category: PrismCategory.ANALYTICAL,
        visualize: this.visualizeAsHistogram.bind(this),
      },
      {
        id: 'poet_frequency',
        name: 'Poet: Harmonic Pattern',
        category: PrismCategory.AESTHETIC,
        visualize: this.visualizeAsWaveform.bind(this),
      },
    ];
  }
}
```

---

## Index of Coincidence Engine

```typescript
class IndexOfCoincidenceEngine implements ICryptanalysisEngine {
  readonly id = 'ic';
  readonly name = 'Index of Coincidence Engine';
  readonly targetFamilies = [CipherFamily.SUBSTITUTION_POLY];

  /**
   * Estimate key length for polyalphabetic ciphers.
   */
  estimateKeyLength(ciphertext: string, maxLength: number = 20): KeyLengthResult {
    const clean = ciphertext.toUpperCase().replace(/[^A-Z]/g, '');
    const results: { length: number; ic: number }[] = [];

    for (let keyLen = 1; keyLen <= maxLength; keyLen++) {
      // Split into cosets
      const cosets = this.splitIntoCosets(clean, keyLen);

      // Average IC across cosets
      let totalIC = 0;
      for (const coset of cosets) {
        totalIC += this.calculateIC(coset);
      }
      const avgIC = totalIC / cosets.length;

      results.push({ length: keyLen, ic: avgIC });
    }

    // Find peaks (key length candidates)
    const peaks = this.findPeaks(results);

    return {
      likelyKeyLengths: peaks,
      allResults: results,
      recommendation: peaks[0]?.length || 1,
    };
  }

  private splitIntoCosets(text: string, keyLen: number): string[] {
    const cosets: string[] = Array(keyLen).fill('');
    for (let i = 0; i < text.length; i++) {
      cosets[i % keyLen] += text[i];
    }
    return cosets;
  }

  private findPeaks(results: { length: number; ic: number }[]): typeof results {
    // IC close to 0.0667 (English) suggests monoalphabetic cosets
    const ENGLISH_IC = 0.0667;
    const threshold = 0.06;

    return results
      .filter(r => r.ic >= threshold)
      .sort((a, b) => Math.abs(a.ic - ENGLISH_IC) - Math.abs(b.ic - ENGLISH_IC))
      .slice(0, 5);
  }
}
```

---

## Kasiski Examination Engine

```typescript
class KasiskiExaminationEngine implements ICryptanalysisEngine {
  readonly id = 'kasiski';
  readonly name = 'Kasiski Examination Engine';
  readonly targetFamilies = [CipherFamily.SUBSTITUTION_POLY];

  /**
   * Find repeated sequences and use distances to deduce key length.
   */
  analyze(ciphertext: string, config: AnalysisConfig): AnalysisResult {
    const clean = ciphertext.toUpperCase().replace(/[^A-Z]/g, '');

    // Find repeated sequences of length 3+
    const sequences = this.findRepeatedSequences(clean, 3, 10);

    // Calculate distances between occurrences
    const distances = this.calculateDistances(sequences);

    // Find GCD of distances
    const gcdResult = this.findGCDCandidates(distances);

    return {
      engineId: this.id,
      timestamp: Date.now(),
      confidence: this.calculateConfidence(sequences.length, distances),
      findings: [
        {
          type: 'repeated_sequences',
          data: sequences,
          interpretation: `Found ${sequences.length} repeated sequences`,
        },
        {
          type: 'distance_analysis',
          data: distances,
          interpretation: `GCD candidates: ${gcdResult.candidates.join(', ')}`,
        },
        {
          type: 'likely_key_length',
          value: gcdResult.mostLikely,
          confidence: gcdResult.confidence,
        },
      ],
      recommendations: [
        `Try key lengths: ${gcdResult.candidates.slice(0, 3).join(', ')}`,
        'Use IC analysis to confirm',
      ],
      metrics: {
        repeatedSequenceCount: sequences.length,
        avgDistance: distances.reduce((a, b) => a + b, 0) / distances.length || 0,
      },
      visualData: {
        sequenceMap: this.createSequenceMap(clean, sequences),
      },
    };
  }

  private findRepeatedSequences(
    text: string,
    minLen: number,
    maxLen: number
  ): RepeatedSequence[] {
    const sequences: RepeatedSequence[] = [];

    for (let len = minLen; len <= maxLen; len++) {
      const seenAt: Map<string, number[]> = new Map();

      for (let i = 0; i <= text.length - len; i++) {
        const seq = text.slice(i, i + len);
        const positions = seenAt.get(seq) || [];
        positions.push(i);
        seenAt.set(seq, positions);
      }

      // Keep only sequences that appear more than once
      for (const [seq, positions] of seenAt) {
        if (positions.length > 1) {
          sequences.push({ sequence: seq, positions, length: len });
        }
      }
    }

    return sequences;
  }

  private findGCDCandidates(distances: number[]): {
    candidates: number[];
    mostLikely: number;
    confidence: number;
  } {
    const factors: Map<number, number> = new Map();

    // Count all factors of all distances
    for (const d of distances) {
      for (let f = 2; f <= Math.min(d, 20); f++) {
        if (d % f === 0) {
          factors.set(f, (factors.get(f) || 0) + 1);
        }
      }
    }

    // Sort by frequency
    const sorted = [...factors.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return {
      candidates: sorted.map(([f]) => f),
      mostLikely: sorted[0]?.[0] || 0,
      confidence: sorted[0] ? sorted[0][1] / distances.length : 0,
    };
  }
}
```

---

## Known Plaintext Attack Engine

```typescript
class KnownPlaintextEngine implements ICryptanalysisEngine {
  readonly id = 'known_plaintext';
  readonly name = 'Known Plaintext Attack Engine';
  readonly targetFamilies = [CipherFamily.MECHANICAL];

  /**
   * Use known plaintext (crib) to deduce key settings.
   * Implements Bombe-style menu construction for Enigma.
   */
  analyze(ciphertext: string, config: AnalysisConfig): AnalysisResult {
    if (!config.knownPlaintext) {
      return this.noPlaintextResult();
    }

    const crib = config.knownPlaintext.toUpperCase();
    const cipher = ciphertext.toUpperCase();

    // Find possible crib positions
    const positions = this.findCribPositions(cipher, crib);

    // Build menu (graph of letter relationships) for each position
    const menus: CribMenu[] = positions.map(pos =>
      this.buildMenu(cipher, crib, pos)
    );

    // Score menus by closure (loops = better for Bombe)
    const scoredMenus = menus.map(menu => ({
      menu,
      score: this.scoreMenuClosure(menu),
    })).sort((a, b) => b.score - a.score);

    return {
      engineId: this.id,
      timestamp: Date.now(),
      confidence: scoredMenus[0]?.score || 0,
      findings: [
        {
          type: 'crib_positions',
          data: positions,
          interpretation: `${positions.length} possible crib positions`,
        },
        {
          type: 'best_menu',
          data: scoredMenus[0]?.menu,
          interpretation: 'Best menu for Bombe attack',
        },
      ],
      recommendations: [
        'Implement Bombe simulation on best menu',
        'Check for contradictions in rotor settings',
      ],
      metrics: {
        cribLength: crib.length,
        possiblePositions: positions.length,
        bestMenuScore: scoredMenus[0]?.score || 0,
      },
      visualData: {
        menuGraph: this.visualizeMenu(scoredMenus[0]?.menu),
      },
    };
  }

  private findCribPositions(cipher: string, crib: string): number[] {
    const positions: number[] = [];

    // Enigma property: letter cannot encrypt to itself
    for (let i = 0; i <= cipher.length - crib.length; i++) {
      let valid = true;
      for (let j = 0; j < crib.length; j++) {
        if (cipher[i + j] === crib[j]) {
          valid = false;
          break;
        }
      }
      if (valid) positions.push(i);
    }

    return positions;
  }

  private buildMenu(cipher: string, crib: string, position: number): CribMenu {
    const edges: MenuEdge[] = [];

    for (let i = 0; i < crib.length; i++) {
      edges.push({
        from: crib[i],
        to: cipher[position + i],
        position: position + i,
      });
    }

    return { edges, position };
  }

  private scoreMenuClosure(menu: CribMenu): number {
    // Count loops (cycles) in the menu graph
    // More loops = more constraint = better for attack
    const graph = this.buildGraph(menu);
    const cycles = this.findCycles(graph);
    return cycles.length / menu.edges.length;
  }
}
```

---

## ML Pattern Detector

```typescript
interface IMLPatternDetector extends ICryptanalysisEngine {
  /**
   * Load pre-trained model for cipher classification.
   */
  loadModel(modelPath: string): Promise<void>;

  /**
   * Train on labeled cipher samples.
   */
  train(samples: LabeledSample[]): Promise<TrainingResult>;

  /**
   * Classify unknown ciphertext.
   */
  classify(ciphertext: string): ClassificationResult;
}

class MLPatternDetector implements IMLPatternDetector {
  readonly id = 'ml_pattern';
  readonly name = 'ML Pattern Detector';
  readonly targetFamilies = [/* all */];

  private model: any; // TensorFlow.js or ONNX model

  async loadModel(modelPath: string): Promise<void> {
    // Load pre-trained model
    // this.model = await tf.loadLayersModel(modelPath);
  }

  async train(samples: LabeledSample[]): Promise<TrainingResult> {
    // Extract features from each sample
    const features = samples.map(s => this.extractFeatures(s.ciphertext));
    const labels = samples.map(s => this.encodeLabel(s.cipherType));

    // Train classifier
    // ...

    return {
      accuracy: 0.85,
      loss: 0.32,
      epochs: 100,
    };
  }

  classify(ciphertext: string): ClassificationResult {
    const features = this.extractFeatures(ciphertext);

    // Run inference
    // const prediction = this.model.predict(features);

    return {
      predictions: [
        { cipherType: 'substitution_simple', confidence: 0.75 },
        { cipherType: 'polyalphabetic', confidence: 0.20 },
        { cipherType: 'transposition', confidence: 0.05 },
      ],
      features: features,
    };
  }

  private extractFeatures(text: string): number[] {
    const clean = text.toUpperCase().replace(/[^A-Z]/g, '');

    return [
      // Character frequency distribution
      ...this.getFrequencyVector(clean),

      // Index of Coincidence
      this.calculateIC(clean),

      // Bigram IC
      this.calculateBigramIC(clean),

      // Entropy
      this.calculateEntropy(clean),

      // Repeated sequence count
      this.countRepeatedSequences(clean),

      // Text length (normalized)
      Math.log(clean.length),
    ];
  }
}
```

---

## Polycosm Integration

All cryptanalysis engines integrate with the Polycosm Reality Engine:

```typescript
class CryptanalysisPolycosm {
  private engine: IPolycosmoEngine<CipherState>;
  private analysisEngines: ICryptanalysisEngine[];

  constructor() {
    this.engine = new PolycosmoEngine<CipherState>();
    this.analysisEngines = [
      new FrequencyAnalysisEngine(),
      new IndexOfCoincidenceEngine(),
      new KasiskiExaminationEngine(),
      new KnownPlaintextEngine(),
      new MLPatternDetector(),
    ];
  }

  async analyzeWithAllPrisms(
    ciphertext: string
  ): Promise<MultiverseView<CipherState>> {
    const state: CipherState = {
      id: crypto.randomUUID(),
      step: 0,
      timestamp: Date.now(),
      data: { ciphertext },
      visual: { focus: [], annotations: [], transforms: [] },
    };

    this.engine.setUniversalSource(state);

    // Run each analysis engine and create prism
    for (const analysisEngine of this.analysisEngines) {
      const result = analysisEngine.analyze(ciphertext, {});

      // Create prism from engine lenses
      for (const lens of analysisEngine.getPrismLenses()) {
        this.engine.activatePrism(
          new AnalysisPrism(analysisEngine.id, lens, result)
        );
      }
    }

    // Find convergence across analyses
    const convergences = this.engine.findConvergence(0.6);

    // Convergence = multiple engines agree = likely correct cipher type
    if (convergences.length > 0) {
      console.log('Consensus reached:', convergences[0].synthesizedNarrative);
    }

    return this.engine.renderMultiverse();
  }
}
```

---

## 4444jPP Alignment

Following the symbolic reduction pattern:

```
CIPHER ALCHEMY → ALCH → A_/CH → <|_/CH|> → φ⊕ (blend)
                 ↓        ↓         ↓       ↓
              identity  motion  reflection  blend

The extension blends (φ⊕) historical wisdom with algorithmic analysis.
```

**φ-Operator Compatibility:**

| Operator | Cipher Alchemy Application |
|----------|---------------------------|
| φ+ expand | Zoom into cipher state, reveal substates |
| φ− contract | Abstract to pattern essence |
| φ≈ align | Synchronize prisms across reality branches |
| φ// recalibrate | Reset to new universal source block |
| φ🌀 recursive | Cipher within cipher, fractal encoding |
| φ⊕ blend | Merge insights from multiple prisms → convergence |

---

## Implementation Roadmap

### Phase A: Astrological Ciphers
1. Zodiac12 cipher + renderer
2. Planetary cipher + orbital renderer
3. Decan cipher + 36-spoke renderer
4. Degree cipher + dial renderer

### Phase B: Historical Compendium
1. Document all ancient ciphers with metadata
2. Implement Renaissance ciphers (Alberti, Trithemius)
3. Implement WWI/WWII ciphers (ADFGVX, Lorenz)
4. Create historical era visual themes

### Phase C: Unsolved Framework
1. Voynich manuscript toolkit
2. Zodiac cipher analysis tools
3. Kryptos K4 solver framework
4. Collaborative contribution system

### Phase D: Cryptanalysis Engines
1. Frequency analysis engine
2. IC/Kasiski engines
3. Known-plaintext attack
4. ML pattern detector

### Phase E: Integration
1. Polycosm prism creation for all ciphers
2. Convergence detection across engines
3. Unified analysis dashboard
4. Export/sharing capabilities

---

*This document is part of the Meta-Source Ledger project, extending the cipher rendering system with astrological, historical, and cryptanalysis capabilities.*

**Signature:** `4444jPP::ALCH::v1.0::φ⊕`
