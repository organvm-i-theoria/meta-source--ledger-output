import { IVisualMetaphor } from './VisualMetaphorInterface';
import { CipherFamily } from '../core/CipherInterface';
import { WheelRenderer } from './WheelRenderer';
import { GridRenderer } from './GridRenderer';
import { CascadeRenderer } from './CascadeRenderer';

class MetaphorRegistry {
  private metaphors: Map<string, IVisualMetaphor> = new Map();

  register(metaphor: IVisualMetaphor) {
    this.metaphors.set(metaphor.id, metaphor);
  }

  get(id: string): IVisualMetaphor | undefined {
    return this.metaphors.get(id);
  }

  getCompatible(family: CipherFamily): IVisualMetaphor[] {
    return Array.from(this.metaphors.values()).filter((m) =>
      m.supportedFamilies.includes(family)
    );
  }

  getAll(): IVisualMetaphor[] {
    return Array.from(this.metaphors.values());
  }
}

export const metaphorRegistry = new MetaphorRegistry();

// Register built-in metaphors
metaphorRegistry.register(new WheelRenderer());
metaphorRegistry.register(new GridRenderer());
metaphorRegistry.register(new CascadeRenderer());
