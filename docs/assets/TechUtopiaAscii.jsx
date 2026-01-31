jsx
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

const useAnimationFrame = (callback, isRunning = true) => {
  const requestRef = useRef(null);
  const previousTimeRef = useRef(null);

  const animate = useCallback((time) => {
    if (previousTimeRef.current !== null) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, [callback]);

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
      previousTimeRef.current = null;
    };
  }, [animate, isRunning]);
}

const TechUtopiaAscii = () => {
  const [frame, setFrame] = useState(0);
  const containerRef = useRef(null);
  const characters = '▓▒░█▀▄◢◣◤◥▲▼◆●■';
  const rows = 28;
  const cols = 60;
  const centerPos = { x: 0.5, y: 0.5 };
  const charactersLength = characters.length;
  const charLengthDivide4 = charactersLength / 4;
  const piTimes2 = Math.PI * 2;
  const lastUpdateRef = useRef(0);

  const updateAnimation = useCallback((deltaTime) => {
    lastUpdateRef.current += deltaTime;
    if (lastUpdateRef.current > 80) {
      setFrame(f => f + 1);
      lastUpdateRef.current = 0;
    }
  }, []);

  useAnimationFrame(updateAnimation);

  useEffect(() => {
    return () => {
      lastUpdateRef.current = 0;
    };
  }, []);

  const generateAscii = useCallback(() => {
    const rowsArray = [];
    const frameDiv4 = frame / 4.2;
    const frameDiv5 = frame / 5.8;
    const frameDiv8 = frame / 9.1;

    for (let y = 0; y < rows; y++) {
      const yDivRows = y / rows;
      const yDiv5 = y / 5;
      const yDiv3 = y / 3;
      let rowString = '';
      let rowHue = 0;

      for (let x = 0; x < cols; x++) {
        const xDivCols = x / cols;
        const xDiv3 = x / 3;
        const xDiv4 = x / 4;
        const dx = xDivCols - centerPos.x;
        const dy = yDivRows - centerPos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const distTimes10 = dist * 10;
        const distTimes5 = dist * 5;
        const wave = Math.sin(xDiv3 + yDiv5 + frameDiv4 + distTimes10) + 
                     Math.cos(xDiv4 - yDiv3 - frameDiv5) + 
                     Math.sin(frameDiv8 + xDivCols * piTimes2) +
                     Math.cos(dist * 8 - frameDiv4 * 1.5);
        const charValue = (wave + 3) * charLengthDivide4 + distTimes5;
        const charIndex = Math.floor(Math.abs(charValue)) % charactersLength;
        
        const hue = (xDivCols * 360 + yDivRows * 180 + frame * 2) % 360;
        if (x === 0) rowHue = hue;
        else rowHue = (rowHue + hue) / 2;

        rowString += characters[charIndex];
      }
      rowsArray.push({ text: rowString, hue: rowHue });
    }
    return rowsArray;
  }, [frame, rows, cols, charactersLength, charLengthDivide4, piTimes2, centerPos.x, centerPos.y, characters]);

  const ascii = useMemo(() => generateAscii(), [generateAscii]);

  const containerStyle = useMemo(() => ({
    margin: 0,
    background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1729 100%)',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    position: 'relative'
  }), []);

  const glowOverlayStyle = useMemo(() => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.05) 0%, transparent 70%)',
    pointerEvents: 'none',
    animation: 'pulse 4s ease-in-out infinite'
  }), []);

  // Remove the redeclaration below! Only declare innerContainerStyle once.
  const innerContainerStyle = useMemo(() => ({
    padding: '30px',
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.3))',
    fontSize: '11px',
    lineHeight: '1.1',
    cursor: 'default',
    userSelect: 'none',
    margin: 0,
    padding: '20px',
    textShadow: '0 0 8px currentColor, 0 0 15px currentColor'
  }), []);

  return (
    <div style={containerStyle}>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
      <div style={glowOverlayStyle} />
      <div ref={containerRef} style={innerContainerStyle}>
        <pre style={preStyle}>
          {ascii.map((row, i) => (
            <div 
              key={i} 
              style={{ 
                color: `hsl(${row.hue}, 85%, 65%)`,
                margin: 0, 
                lineHeight: '1.1',
                opacity: 0.95
              }}
            >
              {row.text}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default TechUtopiaAscii;