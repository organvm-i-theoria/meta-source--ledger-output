import { IVisualMetaphor, RenderConfig } from './VisualMetaphorInterface';
import { CipherState } from '../core/types';
import { CipherFamily } from '../core/CipherInterface';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

interface Particle {
  x: number;
  y: number;
  char: string;
  speed: number;
  opacity: number;
  isOutput: boolean;
}

/**
 * CascadeRenderer - Matrix-style falling character visualization
 * Shows plaintext transforming into ciphertext with streaming effect
 */
export class CascadeRenderer implements IVisualMetaphor {
  readonly id = 'cascade';
  readonly name = 'Matrix Cascade';
  readonly supportedFamilies = [
    CipherFamily.SUBSTITUTION,
    CipherFamily.POLYALPHABETIC,
    CipherFamily.MECHANICAL,
  ];

  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private config: RenderConfig | null = null;
  private animationFrame: number | null = null;
  private particles: Particle[] = [];
  private lastState: CipherState | null = null;
  private isAnimating = false;

  initialize(container: HTMLElement, config: RenderConfig) {
    this.config = config;
    this.canvas = document.createElement('canvas');
    this.canvas.width = config.width;
    this.canvas.height = config.height;
    this.canvas.style.display = 'block';
    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.startBackgroundAnimation();
  }

  private startBackgroundAnimation() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const animate = () => {
      if (!this.isAnimating) return;
      this.drawFrame();
      this.animationFrame = requestAnimationFrame(animate);
    };

    animate();
  }

  private stopBackgroundAnimation() {
    this.isAnimating = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  private spawnBackgroundParticle() {
    if (!this.config) return;

    const { width } = this.config;
    const columns = Math.floor(width / 20);
    const x = Math.floor(Math.random() * columns) * 20 + 10;

    this.particles.push({
      x,
      y: -20,
      char: ALPHABET[Math.floor(Math.random() * 26)],
      speed: 2 + Math.random() * 4,
      opacity: 0.1 + Math.random() * 0.3,
      isOutput: false,
    });
  }

  private drawFrame() {
    if (!this.ctx || !this.config) return;

    const { width, primaryColor } = this.config;
    const height = this.config.height;

    // Fade effect
    this.ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
    this.ctx.fillRect(0, 0, width, height);

    // Spawn new background particles occasionally
    if (Math.random() < 0.3) {
      this.spawnBackgroundParticle();
    }

    // Update and draw particles
    this.ctx.font = '14px monospace';
    this.ctx.textAlign = 'center';

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      // Update position
      p.y += p.speed;
      p.opacity *= 0.995;

      // Remove if off screen or faded
      if (p.y > height + 20 || p.opacity < 0.01) {
        this.particles.splice(i, 1);
        continue;
      }

      // Draw particle
      if (p.isOutput) {
        this.ctx.fillStyle = primaryColor;
        this.ctx.globalAlpha = Math.min(p.opacity * 2, 1);
      } else {
        this.ctx.fillStyle = primaryColor;
        this.ctx.globalAlpha = p.opacity * 0.5;
      }

      this.ctx.fillText(p.char, p.x, p.y);
    }

    this.ctx.globalAlpha = 1;

    // Draw current state overlay
    if (this.lastState) {
      this.drawStateOverlay(this.lastState);
    }
  }

  private drawStateOverlay(state: CipherState) {
    if (!this.ctx || !this.config) return;

    const { width, height, primaryColor } = this.config;
    const centerX = width / 2;
    const centerY = height / 2;

    // Draw transformation display
    if (state.plaintext.length > 0) {
      const lastIdx = state.plaintext.length - 1;
      const inputChar = state.plaintext[lastIdx];
      const outputChar = state.ciphertext[lastIdx];

      // Input character (top)
      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = 'bold 48px monospace';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(inputChar, centerX, centerY - 60);

      // Arrow
      this.ctx.fillStyle = '#444';
      this.ctx.font = '24px monospace';
      this.ctx.fillText('↓', centerX, centerY - 20);

      // Output character (bottom)
      this.ctx.fillStyle = primaryColor;
      this.ctx.font = 'bold 48px monospace';
      this.ctx.fillText(outputChar, centerX, centerY + 30);

      // Cipher info
      this.ctx.fillStyle = '#666';
      this.ctx.font = '12px monospace';

      const shift = state.data.shift ?? state.data.currentShift;
      const keyword = state.data.keyword as string | undefined;
      const rotors = state.data.rotors as Array<{ position: number }> | undefined;

      if (rotors) {
        const positions = rotors.map((r) => ALPHABET[r.position]).join('-');
        this.ctx.fillText(`ROTORS: ${positions}`, centerX, centerY + 70);
      } else if (keyword) {
        const keyIdx = (state.data.keyIndex as number) || 0;
        const keyChar = keyword[(keyIdx > 0 ? keyIdx - 1 : 0) % keyword.length];
        this.ctx.fillText(`KEY: ${keyChar} (+${ALPHABET.indexOf(keyChar)})`, centerX, centerY + 70);
      } else if (shift !== undefined) {
        this.ctx.fillText(`SHIFT: +${shift}`, centerX, centerY + 70);
      }
    }

    // Draw plaintext/ciphertext at bottom
    const padding = 20;
    const lineHeight = 24;
    const startY = height - padding - lineHeight * 2;

    this.ctx.font = '14px monospace';
    this.ctx.textAlign = 'left';

    // Plaintext
    this.ctx.fillStyle = '#666';
    this.ctx.fillText('IN:', padding, startY);
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText(state.plaintext || '—', padding + 40, startY);

    // Ciphertext
    this.ctx.fillStyle = '#666';
    this.ctx.fillText('OUT:', padding, startY + lineHeight);
    this.ctx.fillStyle = primaryColor;
    this.ctx.fillText(state.ciphertext || '—', padding + 40, startY + lineHeight);

    // Step counter
    this.ctx.fillStyle = '#444';
    this.ctx.textAlign = 'right';
    this.ctx.fillText(`Step ${state.step}`, width - padding, startY + lineHeight);
  }

  private spawnTransformParticles(inputChar: string, outputChar: string) {
    if (!this.config) return;

    const { width, height } = this.config;
    const centerX = width / 2;

    // Spawn input particle
    this.particles.push({
      x: centerX + (Math.random() - 0.5) * 100,
      y: height / 2 - 100,
      char: inputChar,
      speed: 3,
      opacity: 1,
      isOutput: false,
    });

    // Spawn output particles with slight delay effect
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        this.particles.push({
          x: centerX + (Math.random() - 0.5) * 60,
          y: height / 2 + 20,
          char: outputChar,
          speed: 4 + Math.random() * 2,
          opacity: 1,
          isOutput: true,
        });
      }, i * 50);
    }
  }

  render(state: CipherState) {
    this.lastState = state;

    // Spawn particles for new characters
    if (state.plaintext.length > 0) {
      const lastIdx = state.plaintext.length - 1;
      const inputChar = state.plaintext[lastIdx];
      const outputChar = state.ciphertext[lastIdx];

      if (
        !this.lastState ||
        this.lastState.plaintext.length !== state.plaintext.length
      ) {
        this.spawnTransformParticles(inputChar, outputChar);
      }
    }
  }

  async animate(from: CipherState, to: CipherState, duration: number): Promise<void> {
    this.lastState = to;

    if (to.plaintext.length > from.plaintext.length) {
      const lastIdx = to.plaintext.length - 1;
      const inputChar = to.plaintext[lastIdx];
      const outputChar = to.ciphertext[lastIdx];
      this.spawnTransformParticles(inputChar, outputChar);
    }

    return new Promise((resolve) => setTimeout(resolve, duration));
  }

  destroy() {
    this.stopBackgroundAnimation();
    if (this.canvas) {
      this.canvas.remove();
      this.canvas = null;
    }
    this.ctx = null;
    this.particles = [];
  }

  resize(width: number, height: number) {
    if (this.canvas && this.config) {
      this.canvas.width = width;
      this.canvas.height = height;
      this.config.width = width;
      this.config.height = height;
    }
  }
}
