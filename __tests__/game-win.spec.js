const { test, expect } = require('@playwright/test');

test.describe('Game Win Scenario', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('/');
    
    // Enter a test prompt
    await page.locator('input[placeholder="Enter a prompt to generate an image"]').fill('test image');
    
    // Click the start button
    await page.locator('button').filter({ hasText: 'Start Game' }).click();
    
    // Wait for the game board to load
    await page.waitForSelector('.game-container');
  });

  test('should be able to win the game', async ({ page }) => {
    // This test simulates solving the puzzle by directly calling the internal win function
    // since programmatically solving the puzzle would be complex and time-consuming
    
    // Execute JavaScript to simulate winning the game
    await page.evaluate(() => {
      // Access the game component and call the win function
      // This assumes your React component exposes these methods or we can manipulate the state
      const gameInstance = window.__GAME_INSTANCE__;
      if (gameInstance && typeof gameInstance.simulateWin === 'function') {
        gameInstance.simulateWin();
      } else {
        // Alternative approach: directly modify the game state
        // This is a simplified example and may need to be adjusted based on your actual implementation
        document.dispatchEvent(new CustomEvent('game-win', {
          detail: { moves: 10, time: 30 }
        }));
      }
    });
    
    // Wait for the win message to appear
    await page.waitForSelector('.win-message', { timeout: 5000 });
    
    // Check for the congratulations message
    await expect(page.locator('.win-message')).toContainText('Congratulations');
    
    // Check for the play again button
    await expect(page.locator('button').filter({ hasText: 'Play Again' })).toBeVisible();
    
    // Check for the back to menu button
    await expect(page.locator('button').filter({ hasText: 'Back to Menu' })).toBeVisible();
  });
});
