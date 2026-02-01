import p5 from 'p5';
import { VisualConfig, NumerologyProfile } from '../core/types';
import { Phyllotaxis } from '../proportions/Phyllotaxis';

export class P5Renderer {
    private p5: p5 | null = null;
    private config: VisualConfig;
    private profile: NumerologyProfile | null = null;
    
    constructor(config: VisualConfig) {
        this.config = config;
    }
    
    updateConfig(config: VisualConfig) {
        this.config = config;
    }
    
    updateProfile(profile: NumerologyProfile | null) {
        this.profile = profile;
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
            
            // Dynamic scaling based on frameCount for "breathing" effect
            const time = p.frameCount * (this.config.animationSpeed * 0.01);
            
            // Generate points
            // Spread is influenced by Destiny number if available (default 8)
            const spreadBase = this.profile ? (this.profile.destiny + 5) : 8;
            const spread = spreadBase + Math.sin(time) * 2;
            
            const points = Phyllotaxis.generate(this.config.pointCount, spread);
            
            p.noStroke();
            
            points.forEach(pt => {
                // Color based on primary color hue + variation based on index/radius
                // Parse hex to HSB? For MVP just use fixed HSB logic
                // If profile exists, use LifePath to determine color shift
                const colorShift = this.profile ? this.profile.lifePath * 10 : 0;
                
                const hue = (pt.index * 0.5 + colorShift + p.frameCount) % 360;
                p.fill(hue, 80, 100);
                
                // Size based on radius
                const size = p.map(pt.radius, 0, Math.min(p.width, p.height)/2, 2, 8);
                p.circle(pt.x, pt.y, size);
            });
        };
    };
    
    initialize(containerId: string) {
        const container = document.getElementById(containerId);
        if (container) {
            this.p5 = new p5(this.sketch, container);
        }
    }
    
    destroy() {
        if (this.p5) {
            this.p5.remove();
            this.p5 = null;
        }
    }
}
