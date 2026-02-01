import { TokenPanel } from './components/TokenPanel';
import { FourAsPanel } from './components/FourAsPanel';
import { PhiPanel } from './components/PhiPanel';
import { DecisionPanel } from './components/DecisionPanel';

function App() {
  return (
    <div className="flex flex-col h-screen bg-black text-purple-500 font-mono">
      <header className="p-4 border-b border-purple-900">
        <h1 className="text-xl">MYTHOLOGY PLAYGROUND // PHASE 3</h1>
        <p className="text-xs text-gray-600 mt-1">4444jPP Symbolic Governance System</p>
      </header>
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Token & Four As */}
        <aside className="w-80 border-r border-purple-900 overflow-y-auto flex flex-col">
          <TokenPanel />
          <FourAsPanel />
        </aside>
        {/* Center - Decision Matrix */}
        <main className="flex-1 overflow-y-auto">
          <DecisionPanel />
        </main>
        {/* Right Sidebar - Phi Operators */}
        <aside className="w-72 border-l border-purple-900 overflow-y-auto flex flex-col">
          <PhiPanel />
        </aside>
      </div>
    </div>
  );
}

export default App;
