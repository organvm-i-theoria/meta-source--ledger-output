# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Thesis

The Meta-Source Ledger is an autonomous, perpetual generative system. The organizing principle: algorithms, patterns, and "governing codes" run on a blockchain in perpetuity—a "Clockwork Universe" that cascades forward block by block. External applications (visualizers, identity kits) are "manifestations" that interpret this on-chain source into sensory experiences.

## Repository Status

**Specification: ~95% complete | Implementation: ~15% scaffolded**

See `docs/MASTER_PLAN_AND_STATUS.md` for effort estimates and operational cost analysis.

## Structure

```
apps/                          # Implementation (React/TypeScript)
├── identity-playground/       # Phase 1 app - numerology, identity generation
└── cipher-rendering/          # Phase 2 app - cipher visualization engine

specs/phase-{1-5}-*/           # SDD workflow (spec.md → plan.md → tasks.md)
extensions/phase-{1-5}-*/      # Detailed technical specifications
docs/
├── source-threads/            # Original creative dialogues (preserved)
├── research/                  # Domain research documents
└── assets/                    # PDFs, JSX prototypes, pattern files
research-prompts/              # Research methodology suite
```

## Five-Phase Architecture

| Phase | Domain | Key Concept |
|-------|--------|-------------|
| 1. Identity | Numerology, proportions | Input → Algorithm → Visual identity |
| 2. Cipher | Encryption visualization | All ciphers as state machines with pluggable visual metaphors |
| 3. Mythology | 4444jPP, PROTOCALL | Design governance + φ-operators |
| 4. Synthesis | Integration platform | Unified engine combining phases 1-3 |
| 5. Ledger | Blockchain perpetuity | On-chain `pulse()` → `Waterfall` events → `manifest()` NFTs |

## Commands

### Apps (Vite + React)

```bash
# Identity Playground
cd apps/identity-playground && npm install && npm run dev

# Cipher Rendering
cd apps/cipher-rendering && npm install && npm run dev
```

### Navigation

```bash
rg --files                    # Inventory all documents
rg "pattern" docs/            # Search across sources
```

## Core Concepts

**State Machine Paradigm**: Ciphers are state transition machines rendered through interchangeable Visual Metaphor Layers (Matrix cascade, rotor mechanics, flow diagrams).

**4444jPP Governance**: The identity token decomposes as BLOCK (`4444`) + HINGE (`j`) + POSTS (`PP`). Spoken: "Quad Four J Double P". Used as design governance constraint throughout.

**φ-Operators**: `φ+` (expand), `φ−` (contract), `φ≈` (align), `φ//` (recalibrate), `φ🌀` (recursive), `φ⊕` (blend).

**The Perpetual Ledger**: Smart contracts hold `UniversalState` (seed, activeCipher, chaosLevel, globalHarmonics). A `pulse()` function advances state deterministically. Users `manifest()` historical blocks into NFTs—they don't create, they capture the ongoing stream.

## Key Files

- `MANIFEST.md` — Annotated bibliography with thread registry (45+ files, ~38K lines)
- `docs/MASTER_PLAN_AND_STATUS.md` — Roadmap, effort estimates, cost analysis
- `specs/phase-5-ledger/spec.md` — Perpetual Ledger system specification
- `extensions/phase-4-synthesis/integrated-creative-platform-spec.md` — Platform integration spec
- `extensions/phase-2-cipher/cipher-rendering-unified-architecture.md` — Cipher state machine architecture

## Technology Stack

- **Visualization**: p5.js, Three.js, WebGL shaders
- **Frontend**: React 18+, TypeScript, Vite, Zustand
- **Audio**: Tone.js
- **Blockchain**: Solidity/EVM, Chainlink Automation (Keeper)
- **Target Deployment**: L2 (Base/Optimism) for affordable perpetuity

## Working with Specifications

- Update `MANIFEST.md` when adding/moving files (paths, line counts, annotations, tags)
- Maintain TypeScript interface patterns from existing specs
- Respect 4444jPP design governance in new specifications
- Use ASCII diagrams for architecture (existing convention)
- Follow SDD workflow: `spec.md` (requirements) → `plan.md` (architecture) → `tasks.md` (implementation tasks)

## Working with Apps

The `apps/` implementations follow specs from `extensions/`. Key patterns:
- Zustand stores for state management
- Event emitter pattern for cross-module communication
- Registry pattern for ciphers and visual metaphors
- p5.js/Three.js renderers decoupled from business logic
