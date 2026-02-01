import { IVisualMetaphor, RenderConfig } from './VisualMetaphorInterface';
import { CipherState } from '../core/types';
import { CipherFamily } from '../core/CipherInterface';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const TAU = Math.PI * 2;

export class WheelRenderer implements IVisualMetaphor {
  readonly id = 'wheel';
  readonly name = 'Cipher Wheel';
  readonly supportedFamilies = [CipherFamily.SUBSTITUTION];

  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private config: RenderConfig | null = null;
  private animationFrame: number | null = null;

  initialize(container: HTMLElement, config: RenderConfig) {
    this.config = config;
    this.canvas = document.createElement('canvas');
    this.canvas.width = config.width;
    this.canvas.height = config.height;
    this.canvas.style.display = 'block';
    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
  }

  private clear() {
    if (!this.ctx || !this.config) return;
    const { width, height } = this.config;
    this.ctx.fillStyle = '#0a0a0a';
    this.ctx.fillRect(0, 0, width, height);
  }

  private drawWheel(shift: number, mapping?: string, keyword?: string) {
    if (!this.ctx || !this.config) return;

    const { width, height, primaryColor } = this.config;
    const centerX = width / 2;
    const centerY = height / 2;
    const outerRadius = Math.min(width, height) * 0.4;
    const innerRadius = outerRadius * 0.65;

    // Determine cipher alphabet based on mapping type
    const isAtbash = mapping === 'atbash';
    const cipherAlphabet = isAtbash ? 'ZYXWVUTSRQPONMLKJIHGFEDCBA' : ALPHABET;
    const letterOffset = isAtbash ? 0 : (shift / 26) * TAU;

    // Draw outer ring (plaintext alphabet - stationary)
    this.ctx.strokeStyle = '#333';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, outerRadius, 0, TAU);
    this.ctx.stroke();

    // Draw inner ring (ciphertext alphabet)
    this.ctx.strokeStyle = primaryColor;
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, innerRadius, 0, TAU);
    this.ctx.stroke();

    // Draw letters
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    const fontSize = outerRadius * 0.12;
    this.ctx.font = `bold ${fontSize}px monospace`;

    for (let i = 0; i < 26; i++) {
      const angle = (i / 26) * TAU - Math.PI / 2;

      // Outer ring letter (plaintext)
      const outerX = centerX + Math.cos(angle) * (outerRadius - fontSize);
      const outerY = centerY + Math.sin(angle) * (outerRadius - fontSize);
      this.ctx.fillStyle = '#888';
      this.ctx.fillText(ALPHABET[i], outerX, outerY);

      // Inner ring letter (ciphertext - rotated or mirrored)
      const rotatedAngle = angle + letterOffset;
      const innerX = centerX + Math.cos(rotatedAngle) * (innerRadius - fontSize);
      const innerY = centerY + Math.sin(rotatedAngle) * (innerRadius - fontSize);
      this.ctx.fillStyle = primaryColor;
      this.ctx.fillText(cipherAlphabet[i], innerX, innerY);
    }

    // Draw center
    this.ctx.fillStyle = '#1a1a1a';
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, innerRadius * 0.3, 0, TAU);
    this.ctx.fill();
    this.ctx.strokeStyle = primaryColor;
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

    // Draw center indicator
    this.ctx.fillStyle = primaryColor;
    this.ctx.font = `bold ${fontSize * 1.2}px monospace`;

    if (isAtbash) {
      this.ctx.fillText('↔', centerX, centerY);
    } else if (keyword) {
      this.ctx.font = `bold ${fontSize}px monospace`;
      this.ctx.fillText(keyword.length > 5 ? keyword.slice(0, 5) + '…' : keyword, centerX, centerY - fontSize * 0.5);
      this.ctx.font = `${fontSize * 0.8}px monospace`;
      this.ctx.fillStyle = '#666';
      this.ctx.fillText(`+${shift}`, centerX, centerY + fontSize * 0.7);
    } else {
      this.ctx.fillText(`+${shift}`, centerX, centerY);
    }
  }

  private drawTextDisplay(state: CipherState) {
    if (!this.ctx || !this.config) return;

    const { width, height, primaryColor } = this.config;
    const padding = 20;
    const lineHeight = 24;
    const startY = height - padding - lineHeight * 3;

    this.ctx.font = '14px monospace';
    this.ctx.textAlign = 'left';

    // Plaintext
    this.ctx.fillStyle = '#666';
    this.ctx.fillText('PLAINTEXT:', padding, startY);
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText(state.plaintext || '—', padding + 100, startY);

    // Ciphertext
    this.ctx.fillStyle = '#666';
    this.ctx.fillText('CIPHERTEXT:', padding, startY + lineHeight);
    this.ctx.fillStyle = primaryColor;
    this.ctx.fillText(state.ciphertext || '—', padding + 100, startY + lineHeight);

    // Step counter
    this.ctx.fillStyle = '#444';
    this.ctx.textAlign = 'right';
    this.ctx.fillText(`Step ${state.step}`, width - padding, startY + lineHeight);
  }

  private drawHighlights(state: CipherState) {
    if (!this.ctx || !this.config || !state.plaintext) return;

    const { width, height, primaryColor } = this.config;
    const centerX = width / 2;
    const centerY = height / 2;
    const outerRadius = Math.min(width, height) * 0.4;
    const innerRadius = outerRadius * 0.65;
    const fontSize = outerRadius * 0.12;
    const shift = (state.data.shift ?? state.data.currentShift ?? 0) as number;
    const mapping = state.data.mapping as string | undefined;
    const isAtbash = mapping === 'atbash';
    const letterOffset = isAtbash ? 0 : (shift / 26) * TAU;

    // Highlight current input/output chars
    const lastInputIndex = state.plaintext.length - 1;
    if (lastInputIndex >= 0) {
      const inputChar = state.plaintext[lastInputIndex];
      const outputChar = state.ciphertext[lastInputIndex];
      const inputIdx = ALPHABET.indexOf(inputChar.toUpperCase());
      const outputIdx = ALPHABET.indexOf(outputChar.toUpperCase());

      if (inputIdx !== -1) {
        // Highlight input on outer ring
        const angle = (inputIdx / 26) * TAU - Math.PI / 2;
        const x = centerX + Math.cos(angle) * (outerRadius - fontSize);
        const y = centerY + Math.sin(angle) * (outerRadius - fontSize);

        this.ctx.fillStyle = '#ffff00';
        this.ctx.beginPath();
        this.ctx.arc(x, y, fontSize * 0.8, 0, TAU);
        this.ctx.fill();
        this.ctx.fillStyle = '#000';
        this.ctx.font = `bold ${fontSize}px monospace`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(inputChar.toUpperCase(), x, y);
      }

      if (outputIdx !== -1) {
        // For Atbash, output position is the mirror position
        // For others, it's the rotated position
        let outputAngle: number;
        if (isAtbash) {
          // Mirror: output is at position (25 - outputIdx) on inner ring
          outputAngle = (outputIdx / 26) * TAU - Math.PI / 2;
        } else {
          outputAngle = (outputIdx / 26) * TAU - Math.PI / 2 + letterOffset;
        }

        const x = centerX + Math.cos(outputAngle) * (innerRadius - fontSize);
        const y = centerY + Math.sin(outputAngle) * (innerRadius - fontSize);

        this.ctx.fillStyle = primaryColor;
        this.ctx.beginPath();
        this.ctx.arc(x, y, fontSize * 0.8, 0, TAU);
        this.ctx.fill();
        this.ctx.fillStyle = '#000';
        this.ctx.font = `bold ${fontSize}px monospace`;
        this.ctx.fillText(outputChar.toUpperCase(), x, y);
      }

      // Draw connecting line
      if (inputIdx !== -1 && outputIdx !== -1) {
        const inputAngle = (inputIdx / 26) * TAU - Math.PI / 2;
        let outputAngle: number;
        if (isAtbash) {
          outputAngle = (outputIdx / 26) * TAU - Math.PI / 2;
        } else {
          outputAngle = (outputIdx / 26) * TAU - Math.PI / 2 + letterOffset;
        }

        const startX = centerX + Math.cos(inputAngle) * (outerRadius - fontSize * 2);
        const startY = centerY + Math.sin(inputAngle) * (outerRadius - fontSize * 2);
        const endX = centerX + Math.cos(outputAngle) * (innerRadius - fontSize * 2);
        const endY = centerY + Math.sin(outputAngle) * (innerRadius - fontSize * 2);

        this.ctx.strokeStyle = '#ffff0066';
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([5, 5]);
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
      }
    }
  }

  render(state: CipherState) {
    if (!this.ctx || !this.config) return;

    const shift = (state.data.shift ?? state.data.currentShift ?? 0) as number;
    const mapping = state.data.mapping as string | undefined;
    const keyword = state.data.keyword as string | undefined;
    const rotors = state.data.rotors as Array<{ position: number }> | undefined;

    this.clear();

    if (rotors) {
      // Enigma mode: draw 3 rotors
      this.drawEnigmaRotors(state);
    } else {
      this.drawWheel(shift, mapping, keyword);
      this.drawHighlights(state);
    }

    this.drawTextDisplay(state);
    if (keyword) {
      this.drawKeywordIndicator(state);
    }
  }

  private drawEnigmaRotors(state: CipherState) {
    if (!this.ctx || !this.config) return;

    const { width, height, primaryColor } = this.config;
    const rotors = state.data.rotors as Array<{ position: number; wiring: string }>;
    const rotorCount = rotors.length;
    const rotorWidth = Math.min(width / (rotorCount + 1), 120);
    const rotorHeight = height * 0.6;
    const startY = (height - rotorHeight) / 2 - 20;

    const labels = ['RIGHT', 'MIDDLE', 'LEFT'];

    for (let i = 0; i < rotorCount; i++) {
      const rotor = rotors[i];
      const centerX = width / 2 + (i - 1) * (rotorWidth + 20);

      // Draw rotor housing
      this.ctx.strokeStyle = '#333';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(
        centerX - rotorWidth / 2,
        startY,
        rotorWidth,
        rotorHeight
      );

      // Draw position indicator
      const position = rotor.position;
      const letter = ALPHABET[position];

      // Draw letter display window
      this.ctx.fillStyle = '#1a1a1a';
      this.ctx.fillRect(
        centerX - rotorWidth / 3,
        startY + rotorHeight / 2 - 20,
        (rotorWidth * 2) / 3,
        40
      );

      this.ctx.strokeStyle = primaryColor;
      this.ctx.lineWidth = 1;
      this.ctx.strokeRect(
        centerX - rotorWidth / 3,
        startY + rotorHeight / 2 - 20,
        (rotorWidth * 2) / 3,
        40
      );

      // Draw current letter
      this.ctx.fillStyle = '#f39c12';
      this.ctx.font = 'bold 24px monospace';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(letter, centerX, startY + rotorHeight / 2);

      // Draw position number
      this.ctx.fillStyle = '#666';
      this.ctx.font = '10px monospace';
      this.ctx.fillText(`${position}`, centerX, startY + rotorHeight / 2 + 25);

      // Draw rotor label
      this.ctx.fillStyle = '#444';
      this.ctx.font = '10px monospace';
      this.ctx.fillText(labels[i], centerX, startY - 10);

      // Draw some context letters (before/after current position)
      this.ctx.fillStyle = '#333';
      this.ctx.font = '14px monospace';
      for (let j = -2; j <= 2; j++) {
        if (j === 0) continue;
        const contextPos = (position + j + 26) % 26;
        const contextLetter = ALPHABET[contextPos];
        const yOffset = j * 25;
        this.ctx.fillText(contextLetter, centerX, startY + rotorHeight / 2 + yOffset);
      }
    }

    // Draw reflector
    const reflectorX = width / 2 + 2 * (rotorWidth + 20);
    this.ctx.fillStyle = '#1a1a1a';
    this.ctx.fillRect(reflectorX - 15, startY + rotorHeight / 3, 30, rotorHeight / 3);
    this.ctx.strokeStyle = '#e74c3c';
    this.ctx.strokeRect(reflectorX - 15, startY + rotorHeight / 3, 30, rotorHeight / 3);
    this.ctx.fillStyle = '#e74c3c';
    this.ctx.font = '10px monospace';
    this.ctx.fillText('REF', reflectorX, startY + rotorHeight / 2);
    this.ctx.fillText('B', reflectorX, startY + rotorHeight / 2 + 12);
  }

  private drawKeywordIndicator(state: CipherState) {
    if (!this.ctx || !this.config) return;

    const { width, primaryColor } = this.config;
    const keyword = state.data.keyword as string;
    const keyIndex = (state.data.keyIndex as number) || 0;
    const padding = 20;

    this.ctx.font = '12px monospace';
    this.ctx.textAlign = 'left';

    // Draw keyword with current position highlighted
    let xPos = padding;
    const yPos = padding + 16;

    this.ctx.fillStyle = '#666';
    this.ctx.fillText('KEY: ', xPos, yPos);
    xPos += 40;

    for (let i = 0; i < keyword.length; i++) {
      const isActive = i === keyIndex % keyword.length;
      this.ctx.fillStyle = isActive ? primaryColor : '#444';
      this.ctx.font = isActive ? 'bold 14px monospace' : '12px monospace';
      this.ctx.fillText(keyword[i], xPos, yPos);
      xPos += 14;
    }

    // Show current shift value
    const currentKeyChar = keyword[keyIndex % keyword.length];
    const currentShift = currentKeyChar ? currentKeyChar.charCodeAt(0) - 65 : 0;
    this.ctx.fillStyle = '#666';
    this.ctx.font = '10px monospace';
    this.ctx.textAlign = 'right';
    this.ctx.fillText(`${currentKeyChar} = +${currentShift}`, width - padding, yPos);
  }

  async animate(from: CipherState, to: CipherState, duration: number): Promise<void> {
    if (!this.ctx || !this.config) return;

    const startTime = performance.now();
    const startShift = (from.data.shift as number) || 0;
    const endShift = (to.data.shift as number) || 0;

    return new Promise((resolve) => {
      const animateFrame = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic

        const currentShift = startShift + (endShift - startShift) * eased;

        this.clear();
        this.drawWheel(currentShift);

        // Show intermediate state with highlight
        if (progress < 1) {
          this.drawTextDisplay(to);
          this.animationFrame = requestAnimationFrame(animateFrame);
        } else {
          this.render(to);
          resolve();
        }
      };

      this.animationFrame = requestAnimationFrame(animateFrame);
    });
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    if (this.canvas) {
      this.canvas.remove();
      this.canvas = null;
    }
    this.ctx = null;
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
