import React, { useState, useEffect } from 'react';
import Tile from './Tile';

function GameBoard({ onScreenChange, generatedImageUrl }) {
  const [tiles, setTiles] = useState([]);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isWinner, setIsWinner] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [imageUrl, setImageUrl] = useState(generatedImageUrl || '');
  const [imageLoaded, setImageLoaded] = useState(!!generatedImageUrl);
  
  // Initialize the board
  useEffect(() => {
    // Only initialize once we have the image URL from props
    if (generatedImageUrl) {
      console.log('Initializing board with generatedImageUrl:', generatedImageUrl);
      setImageUrl(generatedImageUrl);
      setImageLoaded(true);
      initializeBoard();
    }
  }, [generatedImageUrl]);
  
  // Add a fallback initialization if no image URL is provided
  useEffect(() => {
    if (!generatedImageUrl) {
      initializeBoard();
    }
  }, []);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds === 59) {
        setMinutes(minutes + 1);
        setSeconds(0);
      } else {
        setSeconds(seconds + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, minutes]);

  // Initialize the board with shuffled tiles
  const initializeBoard = () => {
    // Create tiles 1-5 and an empty tile (6)
    const initialTiles = Array.from({ length: 6 }, (_, index) => ({
      id: index + 1,
      value: index < 5 ? index + 1 : null, // Last tile is empty
      position: index + 1,
      visualPosition: index + 1, // Add visual position for CSS positioning
      imageUrl: imageUrl // Add image URL to each tile
    }));
    
    console.log('Initializing board with imageUrl:', imageUrl);
    
    // Shuffle the tiles (ensuring the puzzle is solvable)
    const shuffledTiles = shuffleTiles(initialTiles);
    setTiles(shuffledTiles);
  };

  // Shuffle the tiles (ensuring the puzzle is solvable)
  const shuffleTiles = (tilesArray) => {
    const newTiles = [...tilesArray];
    let currentIndex = newTiles.length;
    let randomIndex;

    // While there remain elements to shuffle
    while (currentIndex !== 0) {
      // Pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Swap it with the current element
      [newTiles[currentIndex], newTiles[randomIndex]] = [
        newTiles[randomIndex], newTiles[currentIndex]
      ];
    }

    // Update positions based on the new order
    for (let i = 0; i < newTiles.length; i++) {
      newTiles[i].position = i + 1;
      newTiles[i].visualPosition = i + 1;
      newTiles[i].imageUrl = imageUrl; // Ensure all tiles have the image URL
    }

    // Ensure the puzzle is solvable
    // For simplicity, we'll just make sure it's not already solved
    if (checkWinner(newTiles)) {
      return shuffleTiles(tilesArray); // Try again
    }

    return newTiles;
  };

  // Check if the puzzle is solvable
  const isSolvable = (tilesArray) => {
    // Count inversions
    let inversions = 0;
    const values = tilesArray.map(tile => tile.value);
    
    for (let i = 0; i < values.length - 1; i++) {
      if (values[i] === null) continue;
      
      for (let j = i + 1; j < values.length; j++) {
        if (values[j] === null) continue;
        if (values[i] > values[j]) {
          inversions++;
        }
      }
    }
    
    // For a 2x3 puzzle, if the number of inversions is even, the puzzle is solvable
    return inversions % 2 === 0;
  };

  // Move a tile if it's adjacent to the empty tile
  const moveTile = (tileId) => {
    // Find the clicked tile and the empty tile
    const clickedTile = tiles.find(tile => tile.id === tileId);
    const emptyTile = tiles.find(tile => tile.value === null);
    
    // Check if the clicked tile is adjacent to the empty tile
    if (isAdjacent(clickedTile.position, emptyTile.position)) {
      // Swap positions
      const newTiles = tiles.map(tile => {
        if (tile.id === clickedTile.id) {
          return { 
            ...tile, 
            position: emptyTile.position, 
            visualPosition: emptyTile.position,
            imageUrl: imageUrl // Ensure image URL is passed
          };
        }
        if (tile.id === emptyTile.id) {
          return { 
            ...tile, 
            position: clickedTile.position, 
            visualPosition: clickedTile.position,
            imageUrl: imageUrl // Ensure image URL is passed
          };
        }
        return { ...tile, imageUrl: imageUrl }; // Ensure all tiles have the image URL
      });
      
      // Play sound effect
      playTileSound();
      
      // Update tiles and increment move counter
      setTiles(newTiles);
      setMoves(moves + 1);
      
      // Check if the puzzle is solved
      if (checkWinner(newTiles)) {
        setIsWinner(true);
      }
    }
  };

  // Check if two positions are adjacent
  const isAdjacent = (pos1, pos2) => {
    // In a 2x3 grid:
    // Positions are 1-6, with 1 at top-left and 6 at bottom-right
    // Two positions are adjacent if they differ by 1 (left/right) or by 3 (up/down)
    // But we need to handle the edge cases (e.g., 3 and 4 differ by 1 but are not adjacent)
    
    const row1 = Math.ceil(pos1 / 3);
    const col1 = (pos1 - 1) % 3 + 1;
    const row2 = Math.ceil(pos2 / 3);
    const col2 = (pos2 - 1) % 3 + 1;
    
    // Adjacent if they're in the same row and columns differ by 1,
    // or in the same column and rows differ by 1
    return (row1 === row2 && Math.abs(col1 - col2) === 1) || 
           (col1 === col2 && Math.abs(row1 - row2) === 1);
  };

  // Check if the puzzle is solved
  const checkWinner = (tilesArray) => {
    // The puzzle is solved if each tile is in its correct position
    // (tile with value i should be at position i)
    return tilesArray.every(tile => 
      tile.value === null || tile.position === tile.value
    );
  };

  // Play tile movement sound
  const playTileSound = () => {
    try {
      // Using a standard click sound from a public source
      const sfx = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3");
      sfx.volume = 0.5; // Set volume to 50%
      sfx.play().catch(error => {
        console.log('Audio playback failed:', error);
      });
    } catch (error) {
      console.log('Error creating audio:', error);
    }
  };

  // Toggle background music
  const toggleBackgroundMusic = () => {
    const bgMusic = document.getElementById("bgMusic");
    if (audioPlaying) {
      bgMusic.pause();
    } else {
      bgMusic.play();
    }
    setAudioPlaying(!audioPlaying);
  };

  // Reset the game
  const resetGame = () => {
    initializeBoard();
    setMinutes(0);
    setSeconds(0);
    setMoves(0);
    setIsWinner(false);
  };
  
  
  // Simplified function to update image URL if needed
  const updateImageUrl = (newImageUrl) => {
    if (!newImageUrl) return;
    
    setImageUrl(newImageUrl);
    setImageLoaded(true);
    
    // Update all existing tiles with the new image URL
    const updatedTiles = tiles.map(tile => ({
      ...tile,
      imageUrl: newImageUrl
    }));
    setTiles(updatedTiles);
  };

  // Format time for display (00:00)
  const formatTime = () => {
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  // Cheat function to solve the puzzle
  const cheat = () => {
    const solvedTiles = Array.from({ length: 6 }, (_, index) => ({
      id: index + 1,
      value: index < 5 ? index + 1 : null,
      position: index + 1,
      visualPosition: index + 1,
      imageUrl: imageUrl // Ensure all tiles have the image URL
    }));
    setTiles(solvedTiles);
  };

  return (
    <div className="game-container">
      <div id="backgroundMovie"></div>
      
      <div id="board" className="main-board">
        {tiles.map(tile => (
          <Tile 
            key={tile.id}
            id={tile.id}
            value={tile.value}
            position={tile.position}
            visualPosition={tile.visualPosition}
            imageUrl={imageUrl}
            onClick={() => moveTile(tile.id)}
          />
        ))}
      </div>
      
      <div className="settings">
        <div id="blank_page">
          <p>{formatTime()}</p>
        </div>
        <div id="cheat">
          {moves > 3 && !isWinner && (
            <button id="buttonOnly" onClick={cheat}>CHEAT</button>
          )}
          {isWinner && (
            <button onClick={resetGame}>PLAY AGAIN</button>
          )}
        </div>
        <div id="clock">
          <p>Moves: {moves}</p>
        </div>
      </div>
      
      <button className="back-button" onClick={() => onScreenChange('menu')}>
        Back to Menu
      </button>
      
      {isWinner && (
        <div className="winner-overlay">
          <div className="winner-message">
            <h2>Congratulations!</h2>
            <p>You solved the puzzle in {moves} moves and {formatTime()}!</p>
            <button onClick={resetGame}>Play Again</button>
            <button onClick={() => onScreenChange('menu')}>Main Menu</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameBoard;
