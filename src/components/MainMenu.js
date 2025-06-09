import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config';

// List of restricted terms for prompt validation
const restrictedTerms = [
  'nude', 'naked', 'porn', 'pornographic', 'sexual', 'explicit', 
  'violence', 'gore', 'bloody', 'kill', 'murder', 'terrorist',
  'racism', 'racist', 'nazi', 'nsfw', 'offensive', 'illegal', 'child', 'hentai'
  // Add more terms as needed
];

function MainMenu({ onScreenChange }) {
  const [showPromptInput, setShowPromptInput] = useState(false);
  const [imagePrompt, setImagePrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isValidPrompt, setIsValidPrompt] = useState(true);

  const handleArcadeClick = () => {
    console.log('Arcade clicked, setting showPromptInput to true');
    setShowPromptInput(true);
    console.log('showPromptInput after setting:', showPromptInput); // This will still show false due to React's state update timing
  };
  
  // Add effect to monitor state changes
  useEffect(() => {
    console.log('showPromptInput state changed:', showPromptInput);
  }, [showPromptInput]);
  
  // Validate prompt against restricted terms
  const validatePrompt = (prompt) => {
    const lowercasePrompt = prompt.toLowerCase();
    for (const term of restrictedTerms) {
      if (lowercasePrompt.includes(term)) {
        return false;
      }
    }
    return true;
  };
  
  // Handle prompt input change
  const handlePromptChange = (e) => {
    const newPrompt = e.target.value;
    setImagePrompt(newPrompt);
    setIsValidPrompt(validatePrompt(newPrompt));
  };

  const [fallbackNotice, setFallbackNotice] = useState(false);
  const [fallbackMessage, setFallbackMessage] = useState('');

  const handlePromptSubmit = async () => {
    if (!imagePrompt.trim()) {
      setError('Please enter a description for your image');
      return;
    }
    
    // Check for restricted terms
    if (!isValidPrompt) {
      setError('Please revise your prompt before sending your request.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setFallbackNotice(false);
    setFallbackMessage('');

    try {
      // Call our backend API to generate an image
      const response = await fetch(API_ENDPOINTS.GENERATE_IMAGE, {
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
      
      // Check if a fallback image was used
      if (data.isFallback) {
        setFallbackNotice(true);
        setFallbackMessage('Image generation failed. Using a fallback image instead.');
        // Show fallback notice for 3 seconds before transitioning
        setTimeout(() => {
          // Pass the image URL to the game board
          onScreenChange('arcade', data.imageUrl);
        }, 3000);
      } else {
        // Small delay to show loading message before transitioning
        setTimeout(() => {
          // Pass the image URL to the game board
          onScreenChange('arcade', data.imageUrl);
        }, 1000);
      }
    } catch (err) {
      console.error('Error generating image:', err);
      setError('Failed to generate image. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <section className="main-menu">
      <div id="game-bkg"></div>
      <div id="game-title">AI Slide Puzzle Game</div>
      
      {/* Loading Screen */}
      {isLoading && (
        <div className="loading-screen">
          {fallbackNotice ? (
            <>
              <div className="loading-text fallback-notice">Notice</div>
              <div className="fallback-message">{fallbackMessage}</div>
              <div className="loader"></div>
              <div className="loading-subtext">Loading your game with a fallback image...</div>
            </>
          ) : (
            <>
              <div className="loading-text">Generating Your Image</div>
              <div className="loader"></div>
              <div className="loading-subtext">Loading your game...</div>
            </>
          )}
        </div>
      )}
      
      {!showPromptInput ? (
        <div>
          <div 
            id="game-arcade" 
            onClick={handleArcadeClick}
            className="menu-item"
          >
            Enter A Prompt
          </div>
        
          <div 
            id="game-credits" 
            onClick={() => window.open('https://github.com/Devaaron7/aaron-tracy-resume/blob/main/Aaron_Tracy_Software_Engineer_2025.pdf', '_blank')}
            className="menu-item"
          >
            Meet The Developer
          </div>
          
          
        </div>
      ) : (
        <div className="prompt-container" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
          <h2>Create Your Puzzle Image</h2>
          <p>Enter a description and we'll generate an image for your puzzle</p>
          <p style={{ color: 'red' }}>**Please do not use any restricted terms**</p>
          
          <textarea
            className={`prompt-input ${!isValidPrompt ? 'invalid-prompt' : ''}`}
            placeholder="Describe the image you want (e.g., 'a colorful landscape with mountains and a lake')"
            value={imagePrompt}
            onChange={handlePromptChange}
            disabled={isLoading}
          />
          
          {!isValidPrompt && (
            <p className="validation-message">Your prompt contains restricted content. Please revise it.</p>
          )}
          
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
              disabled={isLoading || !isValidPrompt || !imagePrompt.trim()}
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
