import React from 'react';
import { IdentityForm } from './components/IdentityForm';
import { NumerologyPanel } from './components/NumerologyPanel';
import { Canvas2D } from './components/Canvas2D';

const Header = () => (
    <header style={{padding: '1rem', borderBottom: '1px solid #333', background: '#0a0a0a'}}>
        <h1 style={{margin: 0, fontSize: '1.2rem', color: '#00ff41'}}>IDENTITY PLAYGROUND // PHASE 1</h1>
    </header>
);

const Sidebar = () => (
    <aside style={{width: '300px', borderRight: '1px solid #333', padding: '1rem', background: '#0a0a0a', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
        <IdentityForm />
        <NumerologyPanel />
    </aside>
);

const MainView = () => (
    <main style={{flex: 1, position: 'relative', overflow: 'hidden'}}>
        <Canvas2D />
    </main>
);

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'monospace', background: '#111', color: '#ccc' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <MainView />
      </div>
    </div>
  );
}

export default App;