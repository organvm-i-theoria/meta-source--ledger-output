import { IVisualMetaphor, RenderConfig } from './VisualMetaphorInterface';
import { CipherState } from '../core/types';
import { CipherFamily } from '../core/CipherInterface';

export class WheelRenderer implements IVisualMetaphor {
    readonly id = 'wheel';
    readonly name = 'Cipher Wheel';
    readonly supportedFamilies = [CipherFamily.SUBSTITUTION];

    private canvas: HTMLCanvasElement | null = null;
    private ctx: CanvasRenderingContext2D | null = null;
    private config: RenderConfig | null = null;

    initialize(container: HTMLElement, config: RenderConfig) {
        this.config = config;
        this.canvas = document.createElement('canvas');
        this.canvas.width = config.width;
        this.canvas.height = config.height;
        container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.drawBase();
    }

    private drawBase() {
        if (!this.ctx || !this.config) return;
        const { width, height } = this.config;
        const centerX = width / 2;
        const centerY = height / 2;

        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, width, height);
        
        this.ctx.strokeStyle = '#00ff41';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, 100, 0, Math.PI * 2);
        this.ctx.stroke();
    }

    render(state: CipherState) {
        if (!this.ctx || !this.config) return;
        
        // MVP: Just draw text for now
        this.drawBase();
        this.ctx.fillStyle = '#00ff41';
        this.ctx.font = '16px monospace';
        this.ctx.fillText(`Step: ${state.step}`, 20, 30);
        this.ctx.fillText(`In: ${state.plaintext}`, 20, 60);
        this.ctx.fillText(`Out: ${state.ciphertext}`, 20, 90);
        
        // To do: Draw rotated alphabet rings
    }

    async animate(from: CipherState, to: CipherState, duration: number) {
        // MVP: Immediate render
        this.render(to);
        return Promise.resolve();
    }

    destroy() {
        if (this.canvas) {
            this.canvas.remove();
        }
    }

    resize(width: number, height: number) {
        if (this.canvas) {
            this.canvas.width = width;
            this.canvas.height = height;
            this.drawBase();
        }
    }
}
