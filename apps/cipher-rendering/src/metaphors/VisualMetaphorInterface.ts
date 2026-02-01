import { CipherState } from '../core/types';
import { CipherFamily } from '../core/CipherInterface';

export interface RenderConfig {
    width: number;
    height: number;
    theme: 'dark' | 'light';
    primaryColor: string;
}

export interface IVisualMetaphor {
    readonly id: string;
    readonly name: string;
    readonly supportedFamilies: CipherFamily[];

    initialize(container: HTMLElement, config: RenderConfig): void;
    render(state: CipherState): void;
    animate(from: CipherState, to: CipherState, duration: number): Promise<void>;
    destroy(): void;
    resize(width: number, height: number): void;
}
