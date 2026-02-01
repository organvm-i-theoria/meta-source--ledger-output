import { IVisualMetaphor } from './VisualMetaphorInterface';
import { CipherFamily } from '../core/CipherInterface';

class MetaphorRegistry {
    private metaphors: Map<string, IVisualMetaphor> = new Map();

    register(metaphor: IVisualMetaphor) {
        this.metaphors.set(metaphor.id, metaphor);
    }

    get(id: string): IVisualMetaphor | undefined {
        return this.metaphors.get(id);
    }

    getCompatible(family: CipherFamily): IVisualMetaphor[] {
        return Array.from(this.metaphors.values()).filter(m => 
            m.supportedFamilies.includes(family)
        );
    }
}

export const metaphorRegistry = new MetaphorRegistry();
