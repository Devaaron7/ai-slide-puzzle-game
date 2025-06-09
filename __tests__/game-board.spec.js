const { test, expect } = require('@playwright/test');

test.describe('Game Board', () => {
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

  test('should render the game board correctly', async ({ page }) => {
    // Check for the game container
    await expect(page.locator('.game-container')).toBeVisible();
    
    // Check for the puzzle grid
    await expect(page.locator('.puzzle-container')).toBeVisible();
    
    // Check for 16 tiles (4x4 grid)
    const tiles = page.locator('.tile');
    await expect(tiles).toHaveCount(15); // 15 visible tiles + 1 empty space
    
    // Check for the moves counter
    await expect(page.locator('div').filter({ hasText: /Moves: \d+/ })).toBeVisible();
    
    // Check for the timer
    await expect(page.locator('div').filter({ hasText: /Time: \d+/ })).toBeVisible();
    
    // Check for the reset button
    await expect(page.locator('button').filter({ hasText: 'Reset' })).toBeVisible();
    
    // Check for the back button
    await expect(page.locator('button').filter({ hasText: 'Back to Menu' })).toBeVisible();
  });
});
