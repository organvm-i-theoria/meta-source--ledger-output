import { IdentityForm } from './components/IdentityForm';
import { NumerologyPanel } from './components/NumerologyPanel';
import { ParameterPanel } from './components/ParameterPanel';
import { ExportPanel } from './components/ExportPanel';
import { IdentityList } from './components/IdentityList';
import { Canvas2D } from './components/Canvas2D';
import { Canvas3D } from './components/Canvas3D';
import { useVisualStore } from './store/visualStore';

const Header = () => (
  <header style={{ padding: '1rem', borderBottom: '1px solid #333', background: '#0a0a0a' }}>
    <h1 style={{ margin: 0, fontSize: '1.2rem', color: '#00ff41' }}>
      IDENTITY PLAYGROUND // PHASE 1
    </h1>
  </header>
);

const Sidebar = () => (
  <aside
    style={{
      width: '320px',
      borderRight: '1px solid #333',
      padding: '1rem',
      background: '#0a0a0a',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      overflowY: 'auto',
    }}
  >
    <IdentityForm />
    <NumerologyPanel />
    <ParameterPanel />
    <ExportPanel />
    <IdentityList />
  </aside>
);

const MainView = () => {
  const mode = useVisualStore((state) => state.config.mode);

  return (
    <main style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
      {mode === '2d' ? <Canvas2D /> : <Canvas3D />}
    </main>
  );
};

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        fontFamily: 'monospace',
        background: '#111',
        color: '#ccc',
      }}
    >
      <Header />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar />
        <MainView />
      </div>
    </div>
  );
}

export default App;
