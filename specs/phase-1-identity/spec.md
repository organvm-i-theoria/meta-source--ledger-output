# Feature Specification: Identity Playground

**Feature Branch**: `phase-1-identity-playground`
**Created**: 2026-01-31
**Status**: Draft
**Input**: User description: "Web-based generative art platform that transforms personal identity data (name, birthdate, meaningful words) into visual representations using numerology algorithms (Pythagorean, Chaldean, Gematria), golden ratio proportions, and sacred geometry patterns"

## User Scenarios & Testing

### User Story 1 - Generate Basic Numerology Profile (Priority: P1)

A user visits the Identity Playground and enters their name and birthdate. The system calculates their numerology profile using the Pythagorean system and displays the core numbers (destiny, life path, soul urge, personality, expression) alongside a generated visual representation.

**Why this priority**: Core value proposition - transforms personal data into meaningful visualizations. Without this, the product has no purpose.

**Independent Test**: Can be fully tested by entering a name and birthdate, receiving calculated numerology values and seeing a generated visual. Delivers immediate value without any other features.

**Acceptance Scenarios**:

1. **Given** a user on the input form, **When** they enter "Jane Doe" as name and "1990-04-15" as birthdate and click Generate, **Then** the system displays destiny=9, life path=2, and renders a phyllotaxis spiral visualization
2. **Given** a user with a generated profile, **When** they view the numerology panel, **Then** they see all five core numbers with brief explanations
3. **Given** a user enters only a name (no birthdate), **When** they click Generate, **Then** the system calculates name-based numbers and shows N/A for life path

---

### User Story 2 - Switch Between Numerology Systems (Priority: P2)

A user with an existing profile can switch between Pythagorean, Chaldean, and Gematria calculation systems. Each system produces different numeric values and correspondingly different visualizations, allowing users to explore how different traditions interpret their identity.

**Why this priority**: Differentiating feature that adds depth beyond basic calculators. Builds on P1 foundation.

**Independent Test**: After generating a P1 profile, user can toggle between systems and observe both numeric and visual changes immediately.

**Acceptance Scenarios**:

1. **Given** a user with a Pythagorean profile, **When** they select "Chaldean" from the system dropdown, **Then** the numerology values update (Chaldean max is 8, not 9) and the visualization re-renders with new parameters
2. **Given** a user viewing Gematria mode, **When** they hover over a number, **Then** they see the Hebrew letter correspondence and meaning

---

### User Story 3 - Customize Visual Parameters (Priority: P2)

A user can adjust visual generation parameters like color palette, point count, animation speed, and rendering style (2D/3D). Changes are reflected in real-time on the canvas, allowing exploration of aesthetic variations.

**Why this priority**: Creative control is essential for engagement but depends on base visualization working first.

**Independent Test**: With any generated visual, user can adjust sliders and see real-time changes without needing other features.

**Acceptance Scenarios**:

1. **Given** a user viewing a generated visualization, **When** they drag the "Point Count" slider from 200 to 500, **Then** the visualization updates in real-time showing more points
2. **Given** a user in 2D mode, **When** they click "Switch to 3D", **Then** the canvas transitions to a Three.js 3D view with orbit controls
3. **Given** a user adjusting color, **When** they select a new primary hue, **Then** the visualization color scheme updates maintaining harmony

---

### User Story 4 - Export Artwork (Priority: P3)

A user can export their generated visualization in multiple formats: PNG (raster), SVG (vector), and WebM (animated). Exports include embedded metadata containing the generation parameters for reproducibility.

**Why this priority**: Valuable for sharing and saving work, but not essential for core exploration experience.

**Independent Test**: Any generated visualization can be exported and saved locally with correct format and metadata.

**Acceptance Scenarios**:

1. **Given** a user with a visualization, **When** they click "Export PNG" and select 2x resolution, **Then** a PNG file downloads with double the canvas dimensions
2. **Given** a user exports to SVG, **When** they open the file, **Then** all paths are vector-based and scalable without quality loss
3. **Given** an exported PNG, **When** opened in metadata viewer, **Then** it shows identity hash, algorithm ID, and seed value

---

### User Story 5 - Save and Load Identities (Priority: P3)

A user can save their identity configuration (input data + selected algorithms + visual parameters) to local storage and reload it later. Multiple identities can be stored and managed.

**Why this priority**: Persistence improves UX but app is fully functional without it.

**Independent Test**: User can create, save, close browser, return, and load their previous identity with all settings intact.

**Acceptance Scenarios**:

1. **Given** a user with a configured identity, **When** they click "Save", **Then** the identity is stored in localStorage with a user-provided name
2. **Given** a user with saved identities, **When** they view the "My Identities" panel, **Then** they see a list of saved identities with creation dates
3. **Given** a user clicks "Load" on a saved identity, **Then** all input fields, algorithm selections, and visual parameters are restored

---

### Edge Cases

- What happens when a user enters non-alphabetic characters in name? → Filter to A-Z only, show warning
- How does system handle extremely long names (>100 chars)? → Truncate at 100, notify user
- What happens with invalid dates (future dates, Feb 30)? → Reject with validation message
- How does visualization handle destiny number of 0? → Use 9 as fallback (0 reduces to 9)
- What if localStorage is full? → Show error, suggest clearing old identities

## Requirements

### Functional Requirements

- **FR-001**: System MUST calculate Pythagorean numerology from name input (A=1...I=9 cycling)
- **FR-002**: System MUST calculate Chaldean numerology with distinct mapping (no 9s)
- **FR-003**: System MUST calculate Life Path number from birthdate (YYYY-MM-DD)
- **FR-004**: System MUST preserve master numbers (11, 22, 33) when configured
- **FR-005**: System MUST render phyllotaxis spiral patterns using golden angle (137.5°)
- **FR-006**: System MUST support 2D rendering via p5.js
- **FR-007**: System MUST support 3D rendering via Three.js
- **FR-008**: System MUST export PNG at configurable resolutions (1x, 2x, 4x)
- **FR-009**: System MUST export SVG with vector paths
- **FR-010**: System MUST store identities in localStorage with retrieval
- **FR-011**: System MUST validate all user inputs before processing
- **FR-012**: System MUST hash identity data in exports (no raw personal data in metadata)

### Key Entities

- **Identity**: User's personal data (name, birthdate, meaningful words) with generated unique ID
- **NumerologyProfile**: Calculated values for a specific system (destiny, lifePath, soulUrge, personality, expression, rawSum, isMasterNumber)
- **VisualConfig**: Rendering parameters (resolution, colorSpace, pointCount, animationSpeed, renderMode)
- **GeneratedOutput**: Artifact produced from identity processing (preview data, metadata, algorithm chain)

## Success Criteria

### Measurable Outcomes

- **SC-001**: Users can generate a numerology profile and visualization in under 10 seconds from initial page load
- **SC-002**: Visualization re-renders within 100ms of parameter change (real-time feedback)
- **SC-003**: 90% of users who enter valid data see a generated visualization (no crashes/errors)
- **SC-004**: Exported PNGs at 4x resolution complete within 2 seconds
- **SC-005**: System maintains 60fps during 2D animation and 30fps during 3D rendering on mid-range hardware
