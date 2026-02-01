import { IVisualMetaphor, RenderConfig } from './VisualMetaphorInterface';
import { CipherState } from '../core/types';
import { CipherFamily } from '../core/CipherInterface';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * GridRenderer - Tabula Recta visualization for polyalphabetic ciphers
 * Shows the 26x26 substitution grid with highlighted rows/columns
 */
export class GridRenderer implements IVisualMetaphor {
  readonly id = 'grid';
  readonly name = 'Tabula Recta';
  readonly supportedFamilies = [CipherFamily.POLYALPHABETIC, CipherFamily.SUBSTITUTION];

  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private config: RenderConfig | null = null;

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

  private drawGrid(
    highlightRow: number | null,
    highlightCol: number | null,
    intersectValue: string | null
  ) {
    if (!this.ctx || !this.config) return;

    const { width, height, primaryColor } = this.config;
    const padding = 50;
    const gridSize = Math.min(width, height) - padding * 2;
    const cellSize = gridSize / 27; // 26 letters + 1 header
    const startX = (width - gridSize) / 2;
    const startY = padding;

    const fontSize = Math.max(8, cellSize * 0.5);
    this.ctx.font = `${fontSize}px monospace`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    // Draw header row (plaintext letters)
    for (let i = 0; i < 26; i++) {
      const x = startX + (i + 1.5) * cellSize;
      const y = startY + cellSize * 0.5;

      const isHighlighted = highlightCol === i;
      this.ctx.fillStyle = isHighlighted ? '#ffff00' : '#666';
      this.ctx.fillText(ALPHABET[i], x, y);

      if (isHighlighted) {
        // Draw column highlight
        this.ctx.fillStyle = 'rgba(255, 255, 0, 0.1)';
        this.ctx.fillRect(
          startX + (i + 1) * cellSize,
          startY + cellSize,
          cellSize,
          cellSize * 26
        );
      }
    }

    // Draw header column (key letters) and grid
    for (let row = 0; row < 26; row++) {
      const y = startY + (row + 1.5) * cellSize;
      const isRowHighlighted = highlightRow === row;

      // Row header (key letter)
      this.ctx.fillStyle = isRowHighlighted ? primaryColor : '#666';
      this.ctx.fillText(ALPHABET[row], startX + cellSize * 0.5, y);

      if (isRowHighlighted) {
        // Draw row highlight
        this.ctx.fillStyle = `${primaryColor}1a`;
        this.ctx.fillRect(
          startX + cellSize,
          startY + (row + 1) * cellSize,
          cellSize * 26,
          cellSize
        );
      }

      // Grid cells
      for (let col = 0; col < 26; col++) {
        const x = startX + (col + 1.5) * cellSize;
        const shiftedIndex = (col + row) % 26;
        const letter = ALPHABET[shiftedIndex];

        const isIntersection = highlightRow === row && highlightCol === col;
        const isOnHighlightedRow = highlightRow === row;
        const isOnHighlightedCol = highlightCol === col;

        if (isIntersection) {
          // Draw intersection highlight
          this.ctx.fillStyle = primaryColor;
          this.ctx.fillRect(
            startX + (col + 1) * cellSize + 2,
            startY + (row + 1) * cellSize + 2,
            cellSize - 4,
            cellSize - 4
          );
          this.ctx.fillStyle = '#000';
          this.ctx.font = `bold ${fontSize}px monospace`;
          this.ctx.fillText(letter, x, y);
          this.ctx.font = `${fontSize}px monospace`;
        } else if (isOnHighlightedRow || isOnHighlightedCol) {
          this.ctx.fillStyle = isOnHighlightedRow ? primaryColor : '#888';
          this.ctx.globalAlpha = 0.7;
          this.ctx.fillText(letter, x, y);
          this.ctx.globalAlpha = 1;
        } else {
          this.ctx.fillStyle = '#333';
          this.ctx.fillText(letter, x, y);
        }
      }
    }

    // Draw grid lines
    this.ctx.strokeStyle = '#222';
    this.ctx.lineWidth = 0.5;

    // Vertical lines
    for (let i = 0; i <= 27; i++) {
      const x = startX + i * cellSize;
      this.ctx.beginPath();
      this.ctx.moveTo(x, startY);
      this.ctx.lineTo(x, startY + gridSize);
      this.ctx.stroke();
    }

    // Horizontal lines
    for (let i = 0; i <= 27; i++) {
      const y = startY + i * cellSize;
      this.ctx.beginPath();
      this.ctx.moveTo(startX, y);
      this.ctx.lineTo(startX + gridSize, y);
      this.ctx.stroke();
    }

    // Draw intersection label
    if (intersectValue && highlightRow !== null && highlightCol !== null) {
      const labelX = width - padding;
      const labelY = startY + cellSize * 0.5;

      this.ctx.fillStyle = primaryColor;
      this.ctx.font = 'bold 14px monospace';
      this.ctx.textAlign = 'right';
      this.ctx.fillText(
        `${ALPHABET[highlightCol]} + ${ALPHABET[highlightRow]} = ${intersectValue}`,
        labelX,
        labelY
      );
    }
  }

  private drawTextDisplay(state: CipherState) {
    if (!this.ctx || !this.config) return;

    const { width, height, primaryColor } = this.config;
    const padding = 20;
    const lineHeight = 20;
    const startY = height - padding - lineHeight * 2;

    this.ctx.font = '12px monospace';
    this.ctx.textAlign = 'left';

    // Plaintext
    this.ctx.fillStyle = '#666';
    this.ctx.fillText('IN:', padding, startY);
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText(state.plaintext || '—', padding + 35, startY);

    // Ciphertext
    this.ctx.fillStyle = '#666';
    this.ctx.fillText('OUT:', padding, startY + lineHeight);
    this.ctx.fillStyle = primaryColor;
    this.ctx.fillText(state.ciphertext || '—', padding + 35, startY + lineHeight);

    // Keyword display for Vigenère
    const keyword = state.data.keyword as string | undefined;
    if (keyword) {
      const keyIndex = (state.data.keyIndex as number) || 0;
      this.ctx.textAlign = 'right';
      this.ctx.fillStyle = '#666';
      this.ctx.fillText('KEY:', width - padding - 80, startY);

      let xPos = width - padding - 60;
      for (let i = 0; i < keyword.length; i++) {
        const isActive = i === (keyIndex > 0 ? (keyIndex - 1) % keyword.length : 0);
        this.ctx.fillStyle = isActive ? primaryColor : '#444';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(keyword[i], xPos, startY);
        xPos += 10;
      }
    }
  }

  render(state: CipherState) {
    if (!this.ctx || !this.config) return;

    this.clear();

    let highlightRow: number | null = null;
    let highlightCol: number | null = null;
    let intersectValue: string | null = null;

    // Determine highlights based on current encryption state
    if (state.plaintext.length > 0) {
      const lastIdx = state.plaintext.length - 1;
      const inputChar = state.plaintext[lastIdx].toUpperCase();
      const outputChar = state.ciphertext[lastIdx]?.toUpperCase();

      highlightCol = ALPHABET.indexOf(inputChar);

      // For Vigenère, get the key character
      const keyword = state.data.keyword as string | undefined;
      if (keyword) {
        const keyIndex = state.data.keyIndex as number;
        const prevKeyIndex = keyIndex > 0 ? keyIndex - 1 : 0;
        const keyChar = keyword[prevKeyIndex % keyword.length];
        highlightRow = ALPHABET.indexOf(keyChar);
      } else {
        // For simple shift ciphers, use shift as row
        const shift = (state.data.shift ?? state.data.currentShift ?? 0) as number;
        highlightRow = shift % 26;
      }

      intersectValue = outputChar || null;
    }

    this.drawGrid(highlightRow, highlightCol, intersectValue);
    this.drawTextDisplay(state);
  }

  async animate(_from: CipherState, to: CipherState, _duration: number): Promise<void> {
    this.render(to);
  }

  destroy() {
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
