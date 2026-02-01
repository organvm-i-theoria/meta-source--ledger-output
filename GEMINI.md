# Gemini CLI Context for Meta-Source Ledger

## Project Overview

**Meta-Source Ledger** is a comprehensive research and specification repository for a cross-domain creative-technical framework. It explores the intersections of identity systems, cipher visualization, mythology, and generative platforms.

**Key Characteristics:**
*   **Type:** Documentation, Research, and Specification (Non-Code).
*   **Purpose:** To define the architecture, algorithms, and conceptual frameworks for a modular rendering pipeline and creative platform.
*   **Core Themes:** Identity Systems, Cipher Visualization, Mythology & Symbolism (4444jPP), and Synthesis/Integration.
*   **Status:** The repository contains specifications (phases 1-4) and research threads. Actual implementation code is minimal (illustrative snippets only).

## Directory Structure

*   **`docs/`**: Contains foundational research (`research/`), original creative dialogues (`source-threads/`), and assets (`assets/` including PDFs and code fragments).
*   **`extensions/`**: Houses the phased implementation specifications (Phases 1-4).
*   **`specs/`**: Contains Software Design Document (SDD) requirements, architecture plans, and task lists for each phase.
*   **`research-prompts/`**: A framework for research methodology and prompts.
*   **`MANIFEST.md`**: A comprehensive, annotated bibliography of every file in the repository. **Crucial for understanding the relationship between documents.**
*   **`AGENTS.md`**: Specific guidelines for contributors and AI agents working in this repository.

## Key Files

*   **`README.md`**: The project entry point, outlining the vision, features, and structure.
*   **`MANIFEST.md`**: The source of truth for document inventory and metadata. Must be updated when files change.
*   **`AGENTS.md`**: Governance and contribution rules.
*   **`extensions/phase-4-synthesis/integrated-creative-platform-spec.md` (`EXT-401`)**: The master integration specification that ties all phases together.

## Usage & Workflow

Since this is a specification repository, there are no build or run commands.

*   **Navigation:** Use `rg --files` to list documents or `rg "search_term" docs/` to find concepts.
*   **Contribution:**
    *   **Style:** Markdown is the primary format. Use ASCII diagrams for visuals.
    *   **Structure:** Respect the four-phase structure (Identity, Cipher, Mythology, Synthesis).
    *   **Code:** Code snippets (JS/TS/React) are for illustration and specification, not execution.
    *   **Manifest:** Any file addition, move, or rename requires an update to `MANIFEST.md`.

## Conventions

*   **Governance:** Adhere to the `4444jPP` symbolic system and governance concepts defined in Phase 3 specifications.
*   **Commit Messages:** Imperative mood, sentence case (e.g., "Add identity ethics framework").
*   **File Naming:** Kebab-case for new files in `extensions/` and `specs/`. Preserve existing naming in `docs/`.
*   **Testing:** Manual validation of internal links and consistency. No automated test suite.
