import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import MainMenu from './components/MainMenu';

function App() {
  const [currentScreen, setCurrentScreen] = useState('menu');
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);

  const handleScreenChange = (screen, imageUrl = null) => {
    setCurrentScreen(screen);
    if (imageUrl) {
      setGeneratedImageUrl(imageUrl);
    }
  };

  return (
    <div className="app">
      {currentScreen === 'menu' && (
        <MainMenu onScreenChange={handleScreenChange} />
      )}
      {currentScreen === 'arcade' && (
        <GameBoard 
          onScreenChange={handleScreenChange} 
          generatedImageUrl={generatedImageUrl}
        />
      )}
    </div>
  );
}

export default App;
