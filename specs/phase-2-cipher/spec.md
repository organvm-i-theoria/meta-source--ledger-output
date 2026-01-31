# Feature Specification: Cipher Rendering Pipeline

**Feature Branch**: `phase-2-cipher-rendering`
**Created**: 2026-01-31
**Status**: Draft
**Input**: User description: "Unified visualization framework for encryption/cipher systems that treats all ciphers (Caesar, Vigenere, Enigma, etc.) as state machines with interchangeable visual renderers (Matrix cascade, rotor mechanics, tabula recta). Supports step-through animation, timeline scrubbing, and comparative views."

## User Scenarios & Testing

### User Story 1 - Visualize Caesar Cipher Step-by-Step (Priority: P1)

A user enters plaintext and a shift value. The system animates each character transformation through a rotating wheel visualization, showing how each letter maps to its encrypted counterpart. Users can step through one character at a time or play the full animation.

**Why this priority**: Caesar is the simplest cipher and validates the core architecture. If this works, other ciphers can follow the same pattern.

**Independent Test**: Enter "HELLO" with shift 3, watch each letter transform to "KHOOR" with visual feedback showing the substitution on a wheel.

**Acceptance Scenarios**:

1. **Given** a user enters "ABC" with shift 3, **When** they click "Encrypt", **Then** the wheel animates showing A→D, B→E, C→F sequentially
2. **Given** animation is playing, **When** user clicks "Pause", **Then** animation stops at current character with state preserved
3. **Given** animation is paused at character 2, **When** user clicks "Step Forward", **Then** only the next character encrypts and animates

---

### User Story 2 - Visualize Vigenere with Tabula Recta (Priority: P1)

A user enters plaintext and a keyword. The system displays a 26x26 Tabula Recta (Vigenere table) and animates the lookup process: highlighting the plaintext row, keyword column, and intersection cell for each character.

**Why this priority**: Vigenere demonstrates polyalphabetic cipher visualization and validates the grid-based renderer. Core educational value.

**Independent Test**: Encrypt "HELLO" with key "KEY", see the table light up row-by-row showing how each letter transforms.

**Acceptance Scenarios**:

1. **Given** plaintext "A" and key "B", **When** encrypting, **Then** row A and column B highlight, intersection cell "B" pulses as output
2. **Given** key "KEY" with longer plaintext, **When** key indicator shows current key letter, **Then** it cycles K→E→Y→K→E→Y...
3. **Given** completed encryption, **When** user hovers a ciphertext character, **Then** the corresponding table cell highlights showing the lookup path

---

### User Story 3 - Visualize Enigma Machine in 3D (Priority: P2)

A user configures an Enigma machine (rotor order, ring settings, start positions, plugboard) and watches a 3D visualization of signal flow through rotors, reflector, and back. Rotor stepping is animated including the double-stepping anomaly.

**Why this priority**: Enigma is the most complex cipher and demonstrates the architecture's scalability. High educational and aesthetic value but requires P1 infrastructure.

**Independent Test**: Configure Enigma I with rotors III-II-I, encrypt "HELLO", watch rotors turn and signal path trace through the machine.

**Acceptance Scenarios**:

1. **Given** default Enigma config, **When** pressing a key, **Then** the right rotor steps before encryption and signal path animates through all stages
2. **Given** middle rotor at notch position, **When** next key is pressed, **Then** both middle and left rotors step (double-stepping visualized)
3. **Given** plugboard configured with "AB CD", **When** encrypting "A", **Then** the plugboard swap to "B" is visualized before entering rotors

---

### User Story 4 - Switch Visual Metaphors (Priority: P2)

A user can change the visual representation of any cipher without changing the underlying algorithm. For example, view Caesar cipher as a wheel, a grid, or a Matrix-style cascade. The same encryption state renders differently based on selected metaphor.

**Why this priority**: Demonstrates the pluggable architecture and allows users to find visualizations that resonate with them.

**Independent Test**: With Caesar cipher mid-encryption, switch from "Wheel" to "Grid" to "Cascade" and see the same state rendered three different ways.

**Acceptance Scenarios**:

1. **Given** a Caesar cipher in Wheel mode, **When** user selects "Grid" from metaphor dropdown, **Then** visualization transitions to 26x26 grid with highlighted substitution pairs
2. **Given** switching to Matrix Cascade mode, **When** characters encrypt, **Then** they fall as glowing glyphs with the Matrix digital rain aesthetic
3. **Given** any metaphor switch, **When** animation continues, **Then** the step count, state, and output remain unchanged—only visual changes

---

### User Story 5 - Timeline Scrubbing and Playback Control (Priority: P3)

A user can scrub a timeline to any point in the encryption process, jump to specific events, and adjust playback speed. The timeline shows markers for each character transformation and state changes.

**Why this priority**: Advanced control feature that enhances learning but isn't essential for basic visualization.

**Independent Test**: After encrypting a message, drag the timeline back to step 3 and watch the visualization rewind to that state.

**Acceptance Scenarios**:

1. **Given** completed encryption of 10 characters, **When** user drags timeline to step 5, **Then** visualization shows state at step 5 with first 5 characters processed
2. **Given** timeline at any point, **When** user clicks an event marker, **Then** visualization jumps to that exact state
3. **Given** playback running at 1x, **When** user sets speed to 0.5x, **Then** animation slows to half speed for detailed observation

---

### User Story 6 - Comparative Side-by-Side Views (Priority: P3)

A user can view plaintext, key, and ciphertext in synchronized panels. Changes to one view (like scrubbing the timeline) update all panels simultaneously, showing the relationship between input and output.

**Why this priority**: Educational enhancement for understanding cipher mechanics, but not required for core functionality.

**Independent Test**: Enable 3-panel view, scrub timeline, and observe all three panels update in sync showing character-by-character correspondence.

**Acceptance Scenarios**:

1. **Given** comparative mode enabled, **When** encryption progresses, **Then** all three panels highlight their current character simultaneously
2. **Given** any panel clicked on character N, **When** selected, **Then** all panels jump to show character N's context
3. **Given** Vigenere in comparative mode, **When** key panel shows "E", **Then** the corresponding plaintext and ciphertext characters are aligned

---

### Edge Cases

- What happens with non-alphabetic input? → Pass through unchanged, don't visualize as transformation
- How to handle Enigma with invalid rotor configuration? → Validate on configure, show error for duplicate rotors
- What if animation is faster than render can handle? → Cap frame rate, skip intermediate frames if needed
- How to handle very long messages (>1000 chars)? → Warn user, offer to process without animation
- What if user resizes window mid-animation? → Pause, resize canvas, offer to resume

## Requirements

### Functional Requirements

- **FR-001**: System MUST implement Caesar cipher with configurable shift (0-25)
- **FR-002**: System MUST implement Vigenere cipher with arbitrary keyword
- **FR-003**: System MUST implement Enigma machine with rotors I-V, reflectors B/C, and plugboard
- **FR-004**: System MUST model Enigma double-stepping anomaly accurately
- **FR-005**: System MUST provide step-by-step animation with play/pause/step controls
- **FR-006**: System MUST render cipher state to at least 3 visual metaphors (wheel, grid, cascade)
- **FR-007**: System MUST support timeline scrubbing to any encryption step
- **FR-008**: System MUST allow visual metaphor switching without losing state
- **FR-009**: System MUST render comparative views (plaintext/key/ciphertext) synchronously
- **FR-010**: System MUST export visualization as PNG frame or WebM video
- **FR-011**: System MUST validate cipher configurations before processing
- **FR-012**: System MUST log all transformation events for timeline reconstruction

### Key Entities

- **Cipher**: Algorithm implementation with configure(), encrypt(), step() methods
- **CipherState**: Current state of encryption (step, rotorPositions, processed/remaining text, signalPath)
- **VisualMetaphor**: Renderer that transforms CipherState into visual representation
- **AnimationTimeline**: Sequence of keyframes with timestamps and states
- **ProcessEvent**: Single transformation event (INPUT, SUBSTITUTION, ROTOR_STEP, OUTPUT)

## Success Criteria

### Measurable Outcomes

- **SC-001**: Caesar cipher encryption completes in under 50ms for 100 character input
- **SC-002**: Enigma visualization maintains 30fps during animation
- **SC-003**: Timeline scrub responds within 100ms of drag input
- **SC-004**: Visual metaphor switch completes within 200ms with smooth transition
- **SC-005**: 95% of users can identify the encryption pattern after watching visualization (educational efficacy)
- **SC-006**: Exported video maintains consistent frame timing (no dropped frames)
