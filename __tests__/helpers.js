/**
 * Helper functions for Playwright tests
 */

/**
 * Wait for a specific amount of time
 * @param {number} ms - Time to wait in milliseconds
 * @returns {Promise<void>}
 */
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Expose game instance for testing
 * This function should be called in your Game component
 * @param {Object} gameInstance - The game instance to expose
 */
const exposeGameInstance = (gameInstance) => {
  if (typeof window !== 'undefined') {
    window.__GAME_INSTANCE__ = gameInstance;
  }
};

/**
 * Simulate winning the game
 * This function can be added to your Game component for testing
 * @param {Object} gameState - Current game state
 * @param {Function} setGameState - Function to update game state
 */
const simulateWin = (gameState, setGameState) => {
  setGameState({
    ...gameState,
    isWon: true,
    gameOver: true,
  });
};

module.exports = {
  wait,
  exposeGameInstance,
  simulateWin
};
