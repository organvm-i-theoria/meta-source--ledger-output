# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Thesis

The Meta-Source Ledger is an autonomous, perpetual generative system. The organizing principle: algorithms, patterns, and "governing codes" run on a blockchain in perpetuity—a "Clockwork Universe" that cascades forward block by block. External applications (visualizers, identity kits) are "manifestations" that interpret this on-chain source into sensory experiences.

## Repository Status

**Specification: ~95% complete | Implementation: ~35% functional**

See `docs/MASTER_PLAN_AND_STATUS.md` for effort estimates and operational cost analysis.

## Structure

```
apps/                          # Implementation (React/TypeScript)
├── identity-playground/       # Phase 1 app - numerology, identity generation (port 5174)
├── cipher-rendering/          # Phase 2 app - cipher visualization engine (port 5175)
└── mythology-playground/      # Phase 3 app - 4444jPP governance system (port 5176)

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
# Install all dependencies (from root)
pnpm install

# Identity Playground (port 5174)
cd apps/identity-playground && pnpm run dev

# Cipher Rendering (port 5175)
cd apps/cipher-rendering && pnpm run dev

# Mythology Playground (port 5176)
cd apps/mythology-playground && pnpm run dev
```

### Navigation

```bash
rg --files                    # Inventory all documents
rg "pattern" docs/            # Search across sources
```

## Core Concepts

**State Machine Paradigm**: Ciphers are state transition machines rendered through interchangeable Visual Metaphor Layers (Matrix cascade, rotor mechanics, flow diagrams).

**4444jPP Governance**: The identity token decomposes as BLOCK (`4444`) + HINGE (`j`) + POSTS (`PP`). Spoken: "Quad Four J Double P". Used as design governance constraint throughout.

**φ-Operators**: `φ+` (expand), `φ−` (contract), `φ≈` (align), `φ//` (recalibrate), `φ🌀` (recursive), `φ⊕` (blend), `φ¬` (invert), `φ→` (project).

**The Perpetual Ledger**: Smart contracts hold `UniversalState` (seed, activeCipher, chaosLevel, globalHarmonics). A `pulse()` function advances state deterministically. Users `manifest()` historical blocks into NFTs—they don't create, they capture the ongoing stream.

## Universal Patterns (Cross-Phase)

Two foundational patterns apply universally across all five phases:

### Polycosm Reality Engine

The multiversal framework for perceiving how the same Universal Source manifests differently across parallel reality branches. Reality prisms (Oracle, Poet, Alchemical, Celestial, Fractal, etc.) interpret any source—names, ciphers, block states—through different lenses. **Convergence across prisms approaches truth.**

- Spec: `extensions/universal/polycosm-reality-engine.md`
- Interface: `IPolycosmoEngine<T>` with generic source types

### Symbolic Reduction Grammar

The compression/expansion gradient from identity to minimality:

```
IDENTITY → ABBREV → NUMERIC → SYMBOLIC → LIMINAL → REFLECTIVE → MINIMAL → OPERATOR
   ↓          ↓        ↓         ↓          ↓          ↓           ↓          ↓
natural    acronym  number    glyph      query     mirror      essence     verb
language            anchor   direction  uncertain  inversion    form        form
```

Example: `Anthony James Padavano → AJP → 4JP → 4J|> → 4_/|? → <|_/|?> → <,/> → φ⊕`

- Spec: `extensions/universal/symbolic-reduction-grammar.md`
- Interface: `SymbolicReductionGrammar` with bidirectional traversal

## Key Files

- `MANIFEST.md` — Annotated bibliography with thread registry (45+ files, ~38K lines)
- `docs/MASTER_PLAN_AND_STATUS.md` — Roadmap, effort estimates, cost analysis
- `specs/phase-5-ledger/spec.md` — Perpetual Ledger system specification
- `extensions/phase-4-synthesis/integrated-creative-platform-spec.md` — Platform integration spec
- `extensions/phase-2-cipher/cipher-rendering-unified-architecture.md` — Cipher state machine architecture
- `extensions/phase-2-cipher/cipher-alchemy-extension.md` — Astrological ciphers, historical compendium, cryptanalysis
- `extensions/universal/polycosm-reality-engine.md` — Multiversal rendering framework
- `extensions/universal/symbolic-reduction-grammar.md` — Naming/abstraction grammar

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

<!-- ORGANVM:AUTO:START -->
## System Context (auto-generated — do not edit)

**Organ:** ORGAN-I (Theory) | **Tier:** standard | **Status:** LOCAL
**Org:** `organvm-i-theoria` | **Repo:** `meta-source--ledger-output`

### Edges
- **Produces** → `unspecified`: theory

### Siblings in Theory
`recursive-engine--generative-entity`, `organon-noumenon--ontogenetic-morphe`, `auto-revision-epistemic-engine`, `narratological-algorithmic-lenses`, `call-function--ontological`, `sema-metra--alchemica-mundi`, `system-governance-framework`, `cognitive-archaelogy-tribunal`, `a-recursive-root`, `radix-recursiva-solve-coagula-redi`, `.github`, `nexus--babel-alexandria-`, `reverse-engine-recursive-run`, `4-ivi374-F0Rivi4`, `cog-init-1-0-` ... and 4 more

### Governance
- Foundational theory layer. No upstream dependencies.

*Last synced: 2026-03-08T20:11:34Z*

## Session Review Protocol

At the end of each session that produces or modifies files:
1. Run `organvm session review --latest` to get a session summary
2. Check for unimplemented plans: `organvm session plans --project .`
3. Export significant sessions: `organvm session export <id> --slug <slug>`
4. Run `organvm prompts distill --dry-run` to detect uncovered operational patterns

Transcripts are on-demand (never committed):
- `organvm session transcript <id>` — conversation summary
- `organvm session transcript <id> --unabridged` — full audit trail
- `organvm session prompts <id>` — human prompts only


## Active Directives

| Scope | Phase | Name | Description |
|-------|-------|------|-------------|
| system | any | prompting-standards | Prompting Standards |
| system | any | research-standards-bibliography | APPENDIX: Research Standards Bibliography |
| system | any | research-standards | METADOC: Architectural Typology & Research Standards |
| system | any | sop-ecosystem | METADOC: SOP Ecosystem — Taxonomy, Inventory & Coverage |
| system | foundation | agent-seeding-and-workforce-planning | agent-seeding-and-workforce-planning |
| system | any | autopoietic-systems-diagnostics | SOP: Autopoietic Systems Diagnostics (The Mirror of Eternity) |
| system | any | cicd-resilience-and-recovery | SOP: CI/CD Pipeline Resilience & Recovery |
| system | any | cross-agent-handoff | SOP: Cross-Agent Session Handoff |
| system | any | document-audit-feature-extraction | SOP: Document Audit & Feature Extraction |
| system | any | essay-publishing-and-distribution | SOP: Essay Publishing & Distribution |
| system | any | market-gap-analysis | SOP: Full-Breath Market-Gap Analysis & Defensive Parrying |
| system | foundation | ontological-renaming | ontological-renaming |
| system | any | pitch-deck-rollout | SOP: Pitch Deck Generation & Rollout |
| system | any | promotion-and-state-transitions | SOP: Promotion & State Transitions |
| system | foundation | readme-and-documentation | readme-and-documentation |
| system | any | repo-onboarding-and-habitat-creation | SOP: Repo Onboarding & Habitat Creation |
| system | any | research-to-implementation-pipeline | SOP: Research-to-Implementation Pipeline (The Gold Path) |
| system | any | security-and-accessibility-audit | SOP: Security & Accessibility Audit |
| system | any | session-self-critique | session-self-critique |
| system | any | source-evaluation-and-bibliography | SOP: Source Evaluation & Annotated Bibliography (The Refinery) |
| system | any | stranger-test-protocol | SOP: Stranger Test Protocol |
| system | any | strategic-foresight-and-futures | SOP: Strategic Foresight & Futures (The Telescope) |
| system | any | typological-hermeneutic-analysis | SOP: Typological & Hermeneutic Analysis (The Archaeology) |
| unknown | any | gpt-to-os | SOP_GPT_TO_OS.md |
| unknown | any | index | SOP_INDEX.md |
| unknown | any | obsidian-sync | SOP_OBSIDIAN_SYNC.md |

Linked skills: cross-agent-handoff, evaluation-to-growth, planning-and-roadmapping, repo-onboarding-and-habitat-creation, structural-integrity-audit


**Prompting (Anthropic)**: context 200K tokens, format: XML tags, thinking: extended thinking (budget_tokens)

<!-- ORGANVM:AUTO:END -->


## ⚡ Conductor OS Integration
This repository is a managed component of the ORGANVM meta-workspace.
- **Orchestration:** Use `conductor patch` for system status and work queue.
- **Lifecycle:** Follow the `FRAME -> SHAPE -> BUILD -> PROVE` workflow.
- **Governance:** Promotions are managed via `conductor wip promote`.
- **Intelligence:** Conductor MCP tools are available for routing and mission synthesis.
