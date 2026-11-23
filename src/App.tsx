import { useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { GameScreen } from './screens/GameScreen';
import { StartScreen } from './screens/StartScreen';

type Screen = 'start' | 'game';

export const App = () => {
  const [screen, setScreen] = useState<Screen>('start');

  return (
    <AppLayout>
      {screen === 'start' ? (
        <StartScreen onStart={() => setScreen('game')} />
      ) : (
        <GameScreen onExit={() => setScreen('start')} />
      )}
    </AppLayout>
  );
};
