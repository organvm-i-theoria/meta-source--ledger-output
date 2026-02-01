import { InputPanel } from './components/InputPanel';
import { ControlPanel } from './components/ControlPanel';
import { VisualizationCanvas } from './components/VisualizationCanvas';
import { FrequencyPanel } from './components/FrequencyPanel';
import { ResultsPanel } from './components/ResultsPanel';

function App() {
  return (
    <div className="flex flex-col h-screen bg-black text-green-500 font-mono">
      <header className="p-4 border-b border-green-900">
        <h1 className="text-xl">CIPHER RENDERING // PHASE 2</h1>
      </header>
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Configuration */}
        <aside className="w-72 border-r border-green-900 overflow-y-auto flex flex-col">
          <InputPanel />
          <ControlPanel />
        </aside>
        {/* Main Visualization */}
        <main className="flex-1 relative overflow-hidden">
          <VisualizationCanvas />
        </main>
        {/* Right Sidebar - Results & Analysis */}
        <aside className="w-80 border-l border-green-900 overflow-y-auto flex flex-col">
          <ResultsPanel />
          <FrequencyPanel />
        </aside>
      </div>
    </div>
  );
}

export default App;
