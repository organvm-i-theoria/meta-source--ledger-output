# Repository Guidelines

Global policy: /Users/4jp/AGENTS.md applies and cannot be overridden.

## Project Structure & Module Organization
This repository is documentation and specifications only. Key paths:
- README.md for the overview and MANIFEST.md for the annotated bibliography.
- docs/research, docs/source-threads, and docs/assets for research, original threads, and PDFs/data.
- extensions/phase-1-identity through extensions/phase-4-synthesis for phase specifications.
- specs/phase-*/spec.md, plan.md, and tasks.md for SDD requirements, architecture, and tasks.
- research-prompts/ for the research methodology suite.

## Build, Test, and Development Commands
There are no build, test, or runtime commands. Useful navigation checks:
- `rg --files` to inventory documents.
- `rg "phrase" docs/` to locate terms across sources.

## Coding Style & Naming Conventions
- Markdown first; keep headings descriptive and sections short.
- Use ASCII diagrams when you need visual structure.
- Keep code samples illustrative (TypeScript-style interfaces appear in specs).
- Prefer kebab-case filenames in extensions/ and specs/; preserve existing filenames in docs/ even if they use spaces or underscores.

## Testing Guidelines
No automated tests or coverage targets. Validate changes by:
- Proofreading for clarity and consistency.
- Ensuring internal links resolve.
- Updating MANIFEST.md when adding, moving, or renaming files (paths and line counts).

## Commit & Pull Request Guidelines
- Existing commits use imperative, sentence-case subjects (for example: "Add ...", "Initial commit: ...") and often include a short body with bullet details and a Co-Authored-By trailer. Follow that pattern.
- PRs should include: a summary, the list of documents touched, and a note on MANIFEST.md updates. Add links to related issues or source threads when applicable. Include asset notes for PDFs/data additions.

## Repository-Specific Notes
- Respect the four-phase structure and the 4444jPP governance concepts in new specs.
- Keep the repository documentation-focused; treat code snippets as examples only.

<!-- ORGANVM:AUTO:START -->
## Agent Context (auto-generated — do not edit)

This repo participates in the **ORGAN-I (Theory)** swarm.

### Active Subscriptions
- Event: `governance.updated` → Action: Check compliance with updated governance rules
- Event: `health-audit.completed` → Action: Review audit findings for this repo

### Production Responsibilities
- **Produce** `theory` for unspecified

### External Dependencies
- *No external dependencies*

### Governance Constraints
- Adhere to unidirectional flow: I→II→III
- Never commit secrets or credentials

*Last synced: 2026-02-24T12:41:28Z*
<!-- ORGANVM:AUTO:END -->
