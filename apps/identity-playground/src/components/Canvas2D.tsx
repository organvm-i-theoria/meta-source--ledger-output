import React, { useEffect, useRef } from 'react';
import { P5Renderer } from '../rendering/P5Renderer';
import { useVisualStore } from '../store/visualStore';
import { useIdentityStore } from '../store/identityStore';

export const Canvas2D: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<P5Renderer | null>(null);
    
    const config = useVisualStore(state => state.config);
    const profile = useIdentityStore(state => state.profile);

    // Initialize
    useEffect(() => {
        if (!containerRef.current) return;
        
        const renderer = new P5Renderer(config);
        renderer.initialize(containerRef.current.id);
        rendererRef.current = renderer;
        
        return () => {
            renderer.destroy();
        };
    }, []); // Run once on mount (recreating renderer is expensive, we update it instead)

    // Update Props
    useEffect(() => {
        if (rendererRef.current) {
            rendererRef.current.updateConfig(config);
        }
    }, [config]);

    useEffect(() => {
        if (rendererRef.current) {
            rendererRef.current.updateProfile(profile);
        }
    }, [profile]);

    return (
        <div 
            id="canvas-container" 
            ref={containerRef} 
            style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#000' }}
        />
    );
};
