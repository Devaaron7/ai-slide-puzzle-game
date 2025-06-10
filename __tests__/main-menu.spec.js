const { test, expect } = require('@playwright/test');

test.describe('Main Menu', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application before each test
    await page.goto('/');
  });

  test('should render the main menu correctly', async ({ page }) => {
    // Check for the title
    await expect(page.locator('h1').filter({ hasText: 'AI Slide Puzzle' })).toBeVisible();
    
    // Check for the prompt input field
    const promptInput = page.locator('input[placeholder="Enter a prompt to generate an image"]');
    await expect(promptInput).toBeVisible();
    
    // Check for the start button
    const startButton = page.locator('button').filter({ hasText: 'Start Game' });
    await expect(startButton).toBeVisible();
    
    // Check for example prompts section
    await expect(page.locator('div').filter({ hasText: /Try these examples/ })).toBeVisible();
    
    // Check for the loading state (initially not visible)
    await expect(page.locator('div').filter({ hasText: 'Generating image...' })).not.toBeVisible();
  });
});
