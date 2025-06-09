import React, { useState, useEffect } from 'react';
import Tile from './Tile';

function GameBoard({ onScreenChange }) {
  const [tiles, setTiles] = useState([]);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isWinner, setIsWinner] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  
  // Initialize the board
  useEffect(() => {
    initializeBoard();
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
    // Create tiles 1-8 and an empty tile (9)
    const initialTiles = Array.from({ length: 9 }, (_, index) => ({
      id: index + 1,
      value: index < 8 ? index + 1 : null, // Last tile is empty
      position: index + 1
    }));
    
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

    // Update positions after shuffle
    newTiles.forEach((tile, index) => {
      tile.position = index + 1;
    });

    // If the puzzle is not solvable, make it solvable by swapping two tiles
    if (!isSolvable(newTiles)) {
      // Swap the first two non-empty tiles
      const firstNonEmpty = newTiles.findIndex(tile => tile.value !== null);
      const secondNonEmpty = newTiles.findIndex((tile, index) => 
        index > firstNonEmpty && tile.value !== null
      );
      
      if (firstNonEmpty !== -1 && secondNonEmpty !== -1) {
        [newTiles[firstNonEmpty], newTiles[secondNonEmpty]] = [
          newTiles[secondNonEmpty], newTiles[firstNonEmpty]
        ];
      }
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
    
    // For a 3x3 puzzle, if the number of inversions is even, the puzzle is solvable
    return inversions % 2 === 0;
  };

  // Move a tile if it's adjacent to the empty space
  const moveTile = (tileId) => {
    // Find the clicked tile and the empty tile
    const tileIndex = tiles.findIndex(tile => tile.id === tileId);
    const emptyTileIndex = tiles.findIndex(tile => tile.value === null);
    
    // Check if the clicked tile is adjacent to the empty tile
    if (isAdjacent(tiles[tileIndex].position, tiles[emptyTileIndex].position)) {
      // Play sound effect
      playTileSound();
      
      // Swap the tiles
      const newTiles = [...tiles];
      const tempPosition = newTiles[tileIndex].position;
      newTiles[tileIndex].position = newTiles[emptyTileIndex].position;
      newTiles[emptyTileIndex].position = tempPosition;
      
      setTiles(newTiles);
      setMoves(moves + 1);
      
      // Check if the puzzle is solved
      if (moves > 0 && checkWinner(newTiles)) {
        setIsWinner(true);
      }
    }
  };

  // Check if two positions are adjacent
  const isAdjacent = (pos1, pos2) => {
    // In a 3x3 grid:
    // Positions are 1-9, with 1 at top-left and 9 at bottom-right
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
    const sfx = new Audio("https://drive.google.com/uc?id=13a8dopqZFTTOCOgFd-Qpgbd8lAhxLw0q");
    sfx.play();
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

  // Format time for display (00:00)
  const formatTime = () => {
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  // Cheat function to solve the puzzle
  const cheat = () => {
    const solvedTiles = Array.from({ length: 9 }, (_, index) => ({
      id: index + 1,
      value: index < 8 ? index + 1 : null,
      position: index + 1
    }));
    setTiles(solvedTiles);
  };

  return (
    <div className="game-container">
      <div id="backgroundMovie"></div>
      
      <audio 
        id="bgMusic" 
        controls
        src="https://drive.google.com/uc?id=12G3rsqjOGW4-XMZIFD76v8WDBpFFl2zs"
      />
      
      <div id="board" className="main-board">
        {tiles.map(tile => (
          <Tile 
            key={tile.id}
            id={tile.id}
            value={tile.value}
            position={tile.position}
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
