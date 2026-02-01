import { GOLDEN_ANGLE, degToRad } from '../utils/math';

export interface Point {
    x: number;
    y: number;
    angle: number;
    radius: number;
    index: number;
}

export const Phyllotaxis = {
    // Generate N points of a phyllotaxis spiral
    generate(count: number, spread: number = 10): Point[] {
        const points: Point[] = [];
        const angleRad = degToRad(GOLDEN_ANGLE);
        
        for (let i = 0; i < count; i++) {
            const angle = i * angleRad;
            const radius = spread * Math.sqrt(i);
            
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            
            points.push({ x, y, angle, radius, index: i });
        }
        
        return points;
    }
};
