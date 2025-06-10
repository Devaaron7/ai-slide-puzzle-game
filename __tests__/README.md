# End-to-End Testing with Playwright

This directory contains end-to-end tests for the AI Slide Puzzle Game using Playwright.

## Test Structure

- `main-menu.spec.js`: Tests that the main menu renders correctly
- `game-board.spec.js`: Tests that the game board renders correctly
- `game-win.spec.js`: Tests that a player can win the game
- `helpers.js`: Helper functions for testing

## Running Tests

Make sure your application is built and the development server is running before executing tests.

```bash
# Start the development server
npm run dev

# In a separate terminal, run the tests
npm run test:e2e          # Run tests in headless mode
npm run test:e2e:ui       # Run tests with UI mode (interactive)
npm run test:e2e:headed   # Run tests in headed mode (visible browser)
```

## Test Implementation Details

### Main Menu Test
Verifies that all main menu components render correctly:
- Title
- Prompt input field
- Start button
- Example prompts section

### Game Board Test
Verifies that the game board renders correctly after starting a game:
- Game container
- Puzzle grid with 15 tiles
- Moves counter
- Timer
- Reset and Back buttons

### Game Win Test
Tests the win scenario by simulating a win condition:
- Uses the exposed game instance to trigger a win
- Verifies the win message appears
- Checks for Play Again and Back to Menu buttons

## Adding New Tests

To add new tests:
1. Create a new file in the `__tests__` directory
2. Import the Playwright test utilities
3. Write your test cases following the existing patterns
