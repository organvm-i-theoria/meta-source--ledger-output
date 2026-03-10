# MET4MORFOSES — Colossal Forward Propulsion

## Context

The Evaluation-to-Growth pass is complete — error boundaries, metadata, lazy-loading, Zod validation, WebGL probe, loading skeleton, and rate limiter cleanup are all in. Every route renders, all 25 tests pass, the build succeeds. The foundation is solid.

What's missing is everything that transforms this from "a well-built thesis site" into **the portfolio piece that stops people in their tracks**: discoverability, pipeline completeness, immersive transitions, and test confidence. This plan addresses the four highest-impact gaps simultaneously.

---

## Work Streams

### Stream 1: SEO & Discoverability

The site is invisible to the outside world. No robots.txt, no sitemap, no structured data, no OG image, no favicon. Shared links appear as bare text. Search engines have no index. This is the single biggest gap for a portfolio piece.

**1A. `src/app/robots.ts`** — Next.js metadata API robots file
- Allow all crawlers, disallow `/api/`
- Point to sitemap URL

**1B. `src/app/sitemap.ts`** — Dynamic sitemap generation
- Import `getCanonicalManifest()` and `getAllEvolutionaryDocs()` from `src/lib/content`
- Static routes: `/`, `/feed`, `/scroll`, `/oracle`, `/archive`, `/about`
- Dynamic routes: `/read/[slug]` for each canonical doc, `/evolution/[slug]` for each evolutionary doc
- Use `lastModified` from git or static date

**1C. `src/app/opengraph-image.tsx`** — Dynamic OG image via Next.js `ImageResponse`
- Use the `ImageResponse` API from `next/og`
- Render the site title "MET4MORFOSES" in Barlow Condensed on a dark gradient matching `--bg`
- Accent glow effects echoing the site's palette (`--accent-1`, `--accent-2`)
- 1200x630px standard OG dimensions
- This auto-serves as `/opengraph-image` for the root and is picked up by the existing OG metadata

**1D. `src/app/layout.tsx`** — JSON-LD structured data
- Add `<script type="application/ld+json">` in the `<head>` via metadata API or direct injection
- Schema: `ScholarlyArticle` with author, datePublished, educationalLevel, about
- This gives search engines rich context about the thesis

**1E. `src/app/icon.tsx`** — Dynamic favicon
- Use `ImageResponse` to generate a small branded favicon (the "M4" glyph or similar)
- Replaces the need for static favicon files

```
Files to create:
  src/app/robots.ts
  src/app/sitemap.ts
  src/app/opengraph-image.tsx
  src/app/icon.tsx
Files to modify:
  src/app/layout.tsx           — add JSON-LD structured data
```

---

### Stream 2: Content Pipeline Integration

The `content:build` script only runs 5 of 13 available scripts. The remaining 8 scripts (`analyze-style-dna`, `ingest-evolution`, `map-visual-artifacts`, `generate-cycle-4`, `generate-full-corpus`, `compare-fidelity`, `export-publishable`, `broadcast-signal`) produce data files that the app actively imports — but they're not part of the build. A fresh clone with only `npm run build` gets stale or potentially missing data for evolution, style DNA, artifacts, and generated corpus.

**2A. Create `content:build-full`** — an extended pipeline that includes all data-generating scripts in dependency order:

```
content:ingest           (PDFs → markdown + processed-content.json)
  → content:mirror       (catalog public/mirror → mirror-manifest.json)
  → content:nodes        (build narrative graph → node-map.json, feed-items.json)
  → content:analyze      (extract style DNA → style-dna.json)
  → content:evolution    (build evolution map → evolution-map.json)
  → content:artifacts    (map visual artifacts → artifacts.json)
  → content:generate     (generate cycle 4 content)
  → content:full         (expand to full corpus)
  → content:export       (extract publishable signals → social-signals.json)
  → content:report       (compare fidelity → generation-fidelity-report.json)
  → content:broadcast    (simulate broadcast → broadcast-log.json)
  → content:qa           (validate extraction fidelity)
  → content:integrity    (verify data invariants)
```

**2B. Update `build` script** to use `content:build-full` instead of `content:build`

**2C. Update CI** — ensure `.github/workflows/ci.yml` runs the full pipeline

```
Files to modify:
  package.json                        — add content:build-full, update build script
  .github/workflows/ci.yml            — use full pipeline in build step
```

---

### Stream 3: Mode-Nav Fix + View Transitions

**3A. Fix mode-nav subroute matching** (`src/components/mode-nav.tsx:47`)

The `pathToMode()` helper already does `startsWith()` matching correctly (lines 22-34), but the `active` check on line 47 uses exact `===` comparison. Fix: use `pathToMode(pathname) === mode.mode` for the active state.

**3B. Add View Transitions for mode switching**

The site has `framer-motion` installed (used by MVSConsole). The metamorphosis theme is *begging* for transitions between modes. Add `<AnimatePresence>` + `motion.div` wrappers to the layout's `{children}` slot using a route-keyed animation.

Since this is Next.js App Router, use the `usePathname()` hook as the animation key. Wrap the `<main>` children in a `<LayoutTransition>` client component that provides fade + subtle vertical slide matching the atmospheric aesthetic.

```
Files to create:
  src/components/layout-transition.tsx  — AnimatePresence wrapper keyed on pathname
Files to modify:
  src/components/mode-nav.tsx           — fix active state to use pathToMode()
  src/app/layout.tsx                    — wrap {children} with LayoutTransition
```

---

### Stream 4: Test Coverage Expansion

Current coverage: 8 files, 25 tests. No component-level rendering tests for key interactive components, no accessibility tests, no error boundary tests. For a portfolio piece, tests *are* the credibility story.

**4A. Error boundary tests** — verify error.tsx components render and reset works
- Test global error boundary renders themed fallback
- Test reset button calls the reset function

**4B. Mode-nav component test** — verify active state logic
- Test that pathname `/feed` highlights Feed chip
- Test that pathname `/read/intro` highlights Node Map (root fallback)
- Test that pathname `/oracle` highlights Oracle

**4C. Loading skeleton test** — verify loading.tsx renders with aria-busy

**4D. WebGL probe test** — verify fallback behavior
- Test returns false when document is undefined (SSR)
- Test returns false when canvas context fails

**4E. Accessibility smoke tests** (E2E)
- Test skip-link is focusable and navigates to #main-content
- Test mode-nav has `aria-label="Experience mode"`
- Test node-map panel has `aria-live="polite"`

```
Files to create:
  tests/unit/error-boundary.test.tsx
  tests/unit/mode-nav.test.tsx
  tests/unit/loading.test.tsx
  tests/unit/webgl-probe.test.ts
  tests/e2e/accessibility.spec.ts
```

---

## Implementation Order

| Step | Stream | Items | Files | Complexity |
|------|--------|-------|-------|------------|
| 1 | S1 | SEO: robots.ts, sitemap.ts | 2 new | Low |
| 2 | S1 | SEO: OG image, favicon, JSON-LD | 2 new + 1 mod | Medium |
| 3 | S3A | Fix mode-nav active state | 1 mod | Trivial |
| 4 | S3B | View Transitions component | 1 new + 1 mod | Medium |
| 5 | S2 | Pipeline integration | 2 mod | Low |
| 6 | S4 | Unit tests (error, mode-nav, loading, webgl) | 4 new | Medium |
| 7 | S4 | E2E accessibility tests | 1 new | Low |

**Total**: 10 new files, 5 file modifications

---

## Verification

```bash
# Type safety
npm run typecheck

# Lint
npm run lint

# Unit + integration tests (should now pass ~35+ tests)
npm test

# Full build with integrated pipeline
npm run build

# Verify SEO outputs:
#   curl http://localhost:3000/robots.txt
#   curl http://localhost:3000/sitemap.xml
#   curl http://localhost:3000/opengraph-image (should return PNG)
#   curl http://localhost:3000/icon (should return favicon)
#   View source on any page → find <script type="application/ld+json">

# Verify mode-nav:
#   Navigate to /read/intro → Node Map chip should be highlighted
#   Navigate to /feed → Feed chip highlighted

# Verify transitions:
#   Click between modes → should see smooth fade/slide animation

# E2E (includes accessibility)
npm run test:e2e
```
