import p5 from 'p5';
import { VisualConfig, NumerologyProfile } from '../core/types';
import { Phyllotaxis } from '../proportions/Phyllotaxis';

/**
 * Convert hex color to HSB values
 */
function hexToHsb(hex: string): { h: number; s: number; b: number } {
  // Remove # if present
  hex = hex.replace('#', '');

  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === r) {
      h = ((g - b) / delta) % 6;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  const s = max === 0 ? 0 : Math.round((delta / max) * 100);
  const brightness = Math.round(max * 100);

  return { h, s, b: brightness };
}

export class P5Renderer {
  private p5Instance: p5 | null = null;
  private config: VisualConfig;
  private profile: NumerologyProfile | null = null;

  constructor(config: VisualConfig) {
    this.config = config;
  }

  updateConfig(config: VisualConfig) {
    this.config = config;
    // Resize canvas if dimensions changed
    if (this.p5Instance) {
      this.p5Instance.resizeCanvas(config.width, config.height);
    }
  }

  updateProfile(profile: NumerologyProfile | null) {
    this.profile = profile;
  }

  setPlaying(playing: boolean) {
    if (this.p5Instance) {
      if (playing) {
        this.p5Instance.loop();
      } else {
        this.p5Instance.noLoop();
      }
    }
  }

  sketch = (p: p5) => {
    p.setup = () => {
      p.createCanvas(this.config.width, this.config.height);
      p.colorMode(p.HSB, 360, 100, 100);
    };

    p.draw = () => {
      p.background(0);

      // Center the origin
      p.translate(p.width / 2, p.height / 2);

      // Get base hue from primary color
      const baseColor = hexToHsb(this.config.colorPrimary);

      // Dynamic scaling based on frameCount for "breathing" effect
      const time = p.frameCount * (this.config.animationSpeed * 0.01);

      // Generate points
      // Spread is influenced by Destiny number if available (default 8)
      const spreadBase = this.profile ? (this.profile.destiny ?? this.profile.expression ?? 3) + 5 : 8;
      const spread = spreadBase + Math.sin(time) * 2;

      const points = Phyllotaxis.generate(this.config.pointCount, spread);

      p.noStroke();

      points.forEach((pt) => {
        // Color based on primary color hue + variation based on index
        // LifePath affects the color rotation
        const colorShift = this.profile?.lifePath ? this.profile.lifePath * 10 : 0;

        // Vary hue around the base color
        const hueVariation = (pt.index * 0.3 + colorShift) % 60 - 30; // +/- 30 degrees
        const hue = (baseColor.h + hueVariation + p.frameCount * 0.5) % 360;

        // Vary saturation and brightness slightly
        const saturation = Math.max(50, baseColor.s - (pt.index % 20));
        const brightness = Math.min(100, baseColor.b + 10);

        p.fill(hue, saturation, brightness);

        // Size based on radius and soul urge if available
        const sizeMultiplier = this.profile?.soulUrge ? 0.5 + this.profile.soulUrge * 0.1 : 1;
        const size = p.map(pt.radius, 0, Math.min(p.width, p.height) / 2, 2, 8) * sizeMultiplier;

        p.circle(pt.x, pt.y, size);
      });

      // Draw center indicator based on personality
      if (this.profile) {
        const centerSize = 5 + this.profile.personality;
        p.fill(baseColor.h, 100, 100);
        p.circle(0, 0, centerSize);
      }
    };

    // Handle window resize
    p.windowResized = () => {
      // Get the container element by ID
      const container = document.getElementById('canvas-container');
      if (container) {
        p.resizeCanvas(container.clientWidth, container.clientHeight);
      }
    };
  };

  initialize(containerId: string) {
    const container = document.getElementById(containerId);
    if (container) {
      // Set initial dimensions from container
      this.config.width = container.clientWidth || 800;
      this.config.height = container.clientHeight || 600;
      this.p5Instance = new p5(this.sketch, container);
    }
  }

  destroy() {
    if (this.p5Instance) {
      this.p5Instance.remove();
      this.p5Instance = null;
    }
  }
}
