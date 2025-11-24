import React, { useState } from 'react';
import { AppState } from './types';
import ProposalCard from './components/ProposalCard';
import SuccessScreen from './components/SuccessScreen';
import BackgroundHearts from './components/BackgroundHearts';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.PROPOSAL);

  const handleYes = () => {
    setAppState(AppState.SUCCESS);
  };

  const handleReset = () => {
    setAppState(AppState.PROPOSAL);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Global Background */}
      <BackgroundHearts />
      
      {/* Content */}
      <main className="relative z-10">
        {appState === AppState.PROPOSAL ? (
          <ProposalCard onYes={handleYes} />
        ) : (
          <SuccessScreen onReset={handleReset} />
        )}
      </main>
    </div>
  );
};

export default App;