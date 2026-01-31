# Implementation Plan: Integrated Creative Platform

**Branch**: `phase-4-synthesis-platform` | **Date**: 2026-01-31 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/phase-4-synthesis/spec.md`

## Summary

Build a unified platform integrating Identity Playground (Phase 1), Cipher Rendering Pipeline (Phase 2), and 4444jPP Mythology (Phase 3) into a coherent creative environment. Technical approach: Mono-repo with shared packages, unified data model, cross-domain bridges, and synchronized multi-renderer coordination.

## Technical Context

**Language/Version**: TypeScript 5.3+
**Primary Dependencies**: React 18, p5.js 1.9, Three.js 0.160, Tone.js 14, Zustand 4
**Storage**: IndexedDB for archive packages, localStorage for session state
**Testing**: Vitest (unit), Playwright (E2E), Visual regression for renderers
**Target Platform**: Modern browsers (Chrome 90+, Firefox 90+, Safari 15+)
**Project Type**: Mono-repo with shared packages
**Performance Goals**: 60fps 2D + 30fps 3D + real-time audio simultaneously
**Constraints**: Must compose existing Phase 1-3 code, not rewrite
**Scale/Scope**: Full creative workflow, deterministic reproducibility

## Project Structure

### Documentation (this feature)

```
specs/phase-4-synthesis/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Integration patterns
├── data-model.md        # Unified entity model
├── contracts/           # Bridge interfaces
└── tasks.md             # Task list
```

### Source Code (repository root)

```
integrated-creative-platform/
├── package.json                    # Workspace root
├── pnpm-workspace.yaml             # Mono-repo config
├── turbo.json                      # Build orchestration
├── packages/
│   ├── core/                       # Shared types and utilities
│   │   ├── package.json
│   │   ├── src/
│   │   │   ├── types/
│   │   │   │   ├── identity.ts
│   │   │   │   ├── cipher.ts
│   │   │   │   ├── mythology.ts
│   │   │   │   └── unified.ts
│   │   │   ├── utils/
│   │   │   └── index.ts
│   │   └── tests/
│   │
│   ├── identity/                   # Phase 1 as package
│   │   ├── package.json
│   │   └── src/                    # From Phase 1
│   │
│   ├── cipher/                     # Phase 2 as package
│   │   ├── package.json
│   │   └── src/                    # From Phase 2
│   │
│   ├── mythology/                  # Phase 3 as package
│   │   ├── package.json
│   │   └── src/                    # From Phase 3
│   │
│   ├── bridges/                    # Cross-domain bridges
│   │   ├── package.json
│   │   ├── src/
│   │   │   ├── IdentityCipherBridge.ts
│   │   │   ├── CipherVisualBridge.ts
│   │   │   ├── MythologyBridge.ts
│   │   │   └── index.ts
│   │   └── tests/
│   │
│   ├── rendering/                  # Multi-renderer coordinator
│   │   ├── package.json
│   │   ├── src/
│   │   │   ├── RenderCoordinator.ts
│   │   │   ├── P5Renderer.ts
│   │   │   ├── ThreeRenderer.ts
│   │   │   ├── AudioRenderer.ts
│   │   │   ├── SyncManager.ts
│   │   │   └── index.ts
│   │   └── tests/
│   │
│   ├── pipeline/                   # Pipeline orchestration
│   │   ├── package.json
│   │   ├── src/
│   │   │   ├── Pipeline.ts
│   │   │   ├── PipelineExecutor.ts
│   │   │   ├── StepRunner.ts
│   │   │   └── index.ts
│   │   └── tests/
│   │
│   └── archive/                    # Export/import packages
│       ├── package.json
│       ├── src/
│       │   ├── ArchivePackager.ts
│       │   ├── ArchiveLoader.ts
│       │   └── index.ts
│       └── tests/
│
├── apps/
│   └── web/                        # Main web application
│       ├── package.json
│       ├── vite.config.ts
│       ├── src/
│       │   ├── main.tsx
│       │   ├── App.tsx
│       │   ├── store/
│       │   │   ├── unifiedStore.ts
│       │   │   └── pipelineStore.ts
│       │   ├── components/
│       │   │   ├── UnifiedIdentityForm.tsx
│       │   │   ├── PipelineBuilder.tsx
│       │   │   ├── MultiRendererView.tsx
│       │   │   ├── ArchivePanel.tsx
│       │   │   └── DashboardLayout.tsx
│       │   ├── hooks/
│       │   │   ├── useUnifiedIdentity.ts
│       │   │   ├── usePipeline.ts
│       │   │   └── useMultiRenderer.ts
│       │   └── pages/
│       │       ├── Home.tsx
│       │       ├── Create.tsx
│       │       ├── Pipeline.tsx
│       │       └── Archive.tsx
│       └── tests/
│
└── tests/
    └── integration/
        └── full-pipeline.test.ts
```

**Structure Decision**: Mono-repo with pnpm workspaces. Each phase becomes a package. New packages for bridges, rendering coordination, pipeline execution, and archiving. Single web app composes everything.

## Research Summary

### Mono-repo Tooling

- **pnpm workspaces**: Fast, efficient package management with symlinks
- **Turborepo**: Build caching and task orchestration
- **TypeScript project references**: Incremental builds across packages

### Cross-Domain Bridge Patterns

1. **Identity → Cipher Bridge**: Map identity numerology to cipher parameters
   - Destiny number → Caesar shift
   - Meaningful words → Vigenere keyword
   - Full profile → Enigma complex config

2. **Cipher → Visual Bridge**: Map cipher events to generative parameters
   - Substitution events → color hue
   - Event density → visual complexity
   - Event timing → rhythm/pulse

3. **Mythology Bridge**: Apply φ-operators and Four As governance across all domains

### Multi-Renderer Synchronization

Challenge: Keep p5.js, Three.js, and Tone.js in sync with shared state.

Solution: Central state store + render coordinator that:
1. Receives state updates
2. Distributes to all active renderers
3. Manages timing to prevent drift
4. Handles graceful degradation if one renderer fails

## Data Model Summary

See `data-model.md` for full definitions. Key unified entities:

1. **CreativeIdentity**: Unified identity combining personal + numerology + mythology
2. **Pipeline**: Definition of processing steps across domains
3. **ProcessState**: Current state trackable across all systems
4. **ArchivePackage**: Complete exportable session bundle

## Key Interfaces

```typescript
// Unified identity combining all systems
interface CreativeIdentity {
  id: string;
  version: string;
  created: Date;
  updated: Date;

  personal: PersonalIdentity;      // From Phase 1
  numerology: {
    pythagorean: NumerologyProfile;
    chaldean: NumerologyProfile;
    gematria?: GematriaProfile;
  };
  mythology: {
    token: string; // allow-secret: type definition
    fourAs: FourAsState;
    numerologicalStack: NumerologicalStack;
    activeOperators: PhiOperator[];
  };
  seeds: {
    master: number;
    visual: number;
    audio: number;
    cipher: number;
  };
}

// Pipeline definition
interface Pipeline {
  id: string;
  name: string;
  description: string;
  steps: PipelineStep[];
  mythology?: {
    fourAsAlignment: FourAsAlignment;
    phiOperators?: PhiOperator[];
  };
}

interface PipelineStep {
  id: string;
  algorithm: string;
  category: AlgorithmCategory;
  params: Record<string, unknown> | ParamResolver;
  inputFrom?: string;
  outputTo?: string;
}

// Multi-renderer coordination
interface RenderCoordinator {
  registerRenderer(renderer: IRenderer): void;
  activateRenderer(id: string): Promise<void>;
  renderAll(state: ProcessState): Promise<void>;
  synchronize(): void;
}
```

## Bridge Implementations

### Identity → Cipher Bridge

```typescript
class IdentityCipherBridge {
  deriveKeyFromIdentity(identity: CreativeIdentity, cipherType: string): CipherConfig {
    const { numerology, mythology, seeds } = identity;

    switch (cipherType) {
      case 'caesar':
        return { shift: numerology.pythagorean.destiny };

      case 'vigenere':
        return {
          keyword: identity.personal.meaningfulWords[0] ||
                   this.generateKeyword(seeds.cipher)
        };

      case 'enigma':
        return {
          rotorOrder: this.fourAsToRotors(mythology.fourAs),
          ringSettings: this.numerologyToRings(numerology.pythagorean),
          startPositions: this.numerologyToStarts(numerology),
          reflector: 'B',
          plugboard: this.generatePlugboard(seeds.cipher)
        };
    }
  }

  private fourAsToRotors(fourAs: FourAsState): string[] {
    const rotorMap = {
      auctor: 'I', ars: 'II', archive: 'III', apparatus: 'IV'
    };
    const active = Object.entries(fourAs)
      .filter(([_, s]) => s.active)
      .map(([k]) => rotorMap[k]);
    return active.length >= 3 ? active.slice(0, 3) : ['III', 'II', 'I'];
  }
}
```

### Cipher → Visual Bridge

```typescript
class CipherVisualBridge {
  mapToVisualParams(state: ProcessState): VisualParams {
    const events = state.events;

    return {
      hue: this.avgShiftToHue(events.filter(e => e.type === 'SUBSTITUTION')),
      complexity: Math.min(events.length / 100, 1),
      rhythm: this.eventsToRhythm(events),
      density: this.charFrequencyToDensity(state.output.accumulated)
    };
  }

  private avgShiftToHue(substitutions: ProcessEvent[]): number {
    if (substitutions.length === 0) return 0;
    const avgShift = substitutions.reduce((sum, e) =>
      sum + (e.data.shift || 0), 0) / substitutions.length;
    return (avgShift / 26) * 360;
  }

  private eventsToRhythm(events: ProcessEvent[]): number[] {
    const times = events.filter(e => e.visualizable).map(e => e.timestamp);
    if (times.length < 2) return [1];
    const deltas = times.slice(1).map((t, i) => t - times[i]);
    const max = Math.max(...deltas);
    return deltas.map(d => d / max);
  }
}
```

### Mythology Bridge

```typescript
class MythologyBridge {
  constructor(private identity: CreativeIdentity) {}

  applyPhiOperator(input: unknown, operator: PhiOperator): unknown {
    const PHI = (1 + Math.sqrt(5)) / 2;

    switch (operator) {
      case 'φ+':
        return typeof input === 'number' ? input * PHI : input;
      case 'φ-':
        return typeof input === 'number' ? input / PHI : input;
      case 'φ≈':
        return this.alignToPhiMultiple(input);
      case 'φ//':
        return this.nearestFibonacci(input);
      case 'φ🌀':
        return Array.isArray(input) ? this.recursiveExpand(input) : input;
      case 'φ⊕':
        return input; // Requires second input
    }
  }

  filterByFourAs(algorithms: IAlgorithm[]): IAlgorithm[] {
    const active = Object.entries(this.identity.mythology.fourAs)
      .filter(([_, s]) => s.active)
      .map(([k]) => k);

    return algorithms.sort((a, b) => {
      const aAligned = active.includes(a.getFourAsAlignment().primary) ? 1 : 0;
      const bAligned = active.includes(b.getFourAsAlignment().primary) ? 1 : 0;
      return bAligned - aAligned;
    });
  }
}
```

## Pipeline Execution

```typescript
class PipelineExecutor {
  async execute(pipeline: Pipeline, input: CreativeIdentity): Promise<PipelineResult> {
    const context = { input, results: new Map(), events: [] };

    // Apply mythology governance if configured
    const steps = pipeline.mythology
      ? this.applyGovernance(pipeline.steps, pipeline.mythology)
      : pipeline.steps;

    // Topological sort for dependency order
    const order = this.topologicalSort(steps);

    for (const stepId of order) {
      const step = steps.find(s => s.id === stepId)!;
      await this.executeStep(step, context);
    }

    return this.collectResults(context);
  }

  private async executeStep(step: PipelineStep, context: ExecutionContext): Promise<void> {
    const algorithm = this.registry.get(step.algorithm);

    // Resolve input
    const input = step.inputFrom === 'input'
      ? context.input
      : context.results.get(step.inputFrom);

    // Resolve params
    const params = typeof step.params === 'function'
      ? step.params(input)
      : step.params;

    // Execute
    algorithm.initialize(params);
    const result = algorithm.process({ data: input });

    // Apply φ-operators if configured
    if (context.input.mythology?.activeOperators) {
      const bridge = new MythologyBridge(context.input);
      for (const op of context.input.mythology.activeOperators) {
        result.data = bridge.applyPhiOperator(result.data, op);
      }
    }

    context.results.set(step.id, result);
  }
}
```

## Multi-Renderer Coordination

```typescript
class RenderCoordinator {
  private renderers = new Map<string, IRenderer>();
  private active = new Set<string>();
  private syncManager = new SyncManager();

  async renderAll(state: ProcessState): Promise<void> {
    this.syncManager.startSync();

    const promises = Array.from(this.active)
      .map(id => this.renderers.get(id)!.render(state));

    await Promise.all(promises);
    this.syncManager.endSync();
  }

  async animateAll(from: ProcessState, to: ProcessState, duration: number): Promise<void> {
    this.syncManager.startSync();

    const promises = Array.from(this.active)
      .map(id => this.renderers.get(id)!.animate(from, to, duration));

    await Promise.all(promises);
    this.syncManager.endSync();
  }
}

class SyncManager {
  private frameCallbacks: (() => void)[] = [];

  startSync(): void {
    this.frameCallbacks = [];
  }

  onFrame(callback: () => void): void {
    this.frameCallbacks.push(callback);
  }

  endSync(): void {
    // All registered callbacks fire at same RAF frame
    requestAnimationFrame(() => {
      this.frameCallbacks.forEach(cb => cb());
    });
  }
}
```

## Archive Package Format

```
archive-{id}.zip
├── manifest.json           # Package metadata
├── identity.json           # Full CreativeIdentity
├── pipeline.json           # Pipeline definition
├── outputs/
│   ├── visual-2d.png       # 2D render
│   ├── visual-3d.png       # 3D render
│   ├── audio.mp3           # Audio export
│   └── data.json           # Raw output data
└── metadata.json           # Timestamps, versions, seeds
```

```typescript
interface ArchivePackage {
  manifest: {
    id: string;
    version: string;
    created: string;
    platform: string;
  };
  identity: CreativeIdentity;
  pipeline: Pipeline;
  outputs: {
    visual2d?: string;
    visual3d?: string;
    audio?: string;
    data: unknown;
  };
  metadata: {
    executionTime: number;
    steps: { id: string; duration: number }[];
    seeds: Record<string, number>;
  };
}
```

## State Management

```typescript
// unifiedStore
- identity: CreativeIdentity | null
- setIdentity(identity)
- updateMythology(partial)
- generateSeeds()

// pipelineStore
- pipeline: Pipeline | null
- executionState: 'idle' | 'running' | 'paused' | 'complete' | 'error'
- results: Map<string, unknown>
- setPipeline(pipeline)
- execute()
- pause()
- resume()
- reset()

// renderStore
- activeRenderers: Set<string>
- syncEnabled: boolean
- activate(rendererId)
- deactivate(rendererId)
- toggleSync()
```

## Quickstart Validation

After implementation, verify:

1. Create unified identity with name + token → Seeds generated from combined data
2. Derive Caesar shift from identity → Shift equals destiny number
3. Define 4-step pipeline → Execute with data flowing between steps
4. Enable 2D + 3D + Audio renderers → All respond to same state changes
5. Apply φ+ operator in pipeline → Output values multiplied by 1.618
6. Export archive → ZIP contains all components
7. Import archive on fresh browser → Identical output regenerated
8. With Archive Four-A active → Archive-aligned algorithms prioritized
