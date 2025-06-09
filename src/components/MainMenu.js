import React, { useState, useEffect } from 'react';

function MainMenu({ onScreenChange }) {
  const [showPromptInput, setShowPromptInput] = useState(false);
  const [imagePrompt, setImagePrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleArcadeClick = () => {
    console.log('Arcade clicked, setting showPromptInput to true');
    setShowPromptInput(true);
    console.log('showPromptInput after setting:', showPromptInput); // This will still show false due to React's state update timing
  };
  
  // Add effect to monitor state changes
  useEffect(() => {
    console.log('showPromptInput state changed:', showPromptInput);
  }, [showPromptInput]);

  const handlePromptSubmit = async () => {
    if (!imagePrompt.trim()) {
      setError('Please enter a description for your image');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Call our backend API to generate an image
      const response = await fetch('http://localhost:5000/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: imagePrompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const data = await response.json();
      
      // Small delay to show loading message before transitioning
      setTimeout(() => {
        // Pass the image URL to the game board
        onScreenChange('arcade', data.imageUrl);
      }, 1000);
    } catch (err) {
      console.error('Error generating image:', err);
      setError('Failed to generate image. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <section className="main-menu">
      <div id="game-bkg"></div>
      <div id="game-title">SLIDE PUZZLE GAME</div>
      
      {/* Loading Screen */}
      {isLoading && (
        <div className="loading-screen">
          <div className="loading-text">Generating Your Image</div>
          <div className="loader"></div>
          <div className="loading-subtext">Loading your game...</div>
        </div>
      )}
      
      {!showPromptInput ? (
        <div>
          <div 
            id="game-arcade" 
            onClick={handleArcadeClick}
            className="menu-item"
          >
            ARCADE
          </div>
          <div 
            id="game-custom" 
            onClick={() => onScreenChange('custom')}
            className="menu-item"
          >
            CUSTOM
          </div>
          <div 
            id="game-credits" 
            onClick={() => onScreenChange('credits')}
            className="menu-item"
          >
            CREDITS
          </div>
          
          
        </div>
      ) : (
        <div className="prompt-container" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
          <h2>Create Your Puzzle Image</h2>
          <p>Enter a description and we'll generate an image for your puzzle</p>
          
          <textarea
            className="prompt-input"
            placeholder="Describe the image you want (e.g., 'a colorful landscape with mountains and a lake')"
            value={imagePrompt}
            onChange={(e) => setImagePrompt(e.target.value)}
            disabled={isLoading}
          />
          
          {error && <p className="error-message">{error}</p>}
          
          <div className="prompt-buttons">
            <button 
              className="menu-button back-button" 
              onClick={() => setShowPromptInput(false)}
              disabled={isLoading}
            >
              Back
            </button>
            <button 
              className="menu-button generate-button" 
              onClick={handlePromptSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate Image'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default MainMenu;
