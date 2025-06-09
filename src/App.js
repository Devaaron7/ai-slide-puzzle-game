import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import MainMenu from './components/MainMenu';

function App() {
  const [currentScreen, setCurrentScreen] = useState('menu');

  const handleScreenChange = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="app">
      {currentScreen === 'menu' && (
        <MainMenu onScreenChange={handleScreenChange} />
      )}
      {currentScreen === 'arcade' && (
        <GameBoard onScreenChange={handleScreenChange} />
      )}
    </div>
  );
}

export default App;
