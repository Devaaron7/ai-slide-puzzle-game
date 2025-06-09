# Slide Puzzle Game - React Version

A modern React implementation of the classic slide puzzle game with AI image generation.

## Features

- Responsive design that works on desktop and mobile devices
- Clean, modern UI with animations
- Game timer and move counter
- Cheat button that appears after a few moves
- Background music and sound effects
- Main menu with multiple game options
- AI image generation using text prompts
- Custom image loading from URL

## How to Play

1. Click on any tile adjacent to the empty space to move it
2. Arrange the tiles in numerical order (1-8) with the empty space in the bottom right
3. Try to solve the puzzle in as few moves as possible!

## Deployment

### Railway

1. Install the [Railway CLI](https://docs.railway.app/develop/cli):
   ```bash
   npm i -g @railway/cli
   ```

2. Link your project to Railway:
   ```bash
   railway link
   ```

3. Set up environment variables in the Railway dashboard:
   - `PORT`: The port your server should listen on (Railway will provide this)
   - `NODE_ENV`: Set to `production`
   - `HF_TOKEN`: Your Hugging Face API token (if using AI image generation)

4. Deploy your application:
   ```bash
   railway up
   ```

## Development

### Prerequisites

- Node.js and npm

### Installation

#### Frontend
```bash
npm install
```

#### Backend
```bash
cd server
npm install
```

### Running the Development Server

#### Frontend
```bash
npm start
```
This will start the frontend development server at http://localhost:3000

#### Backend
```bash
cd server
node server.js
```
This will start the backend server at http://localhost:5000

### Required Dependencies

The backend server requires:
- Node.js and npm
- Chrome WebDriver for Selenium
- Chrome browser installed

### Building for Production

```bash
npm run build
```

This will create a production-ready build in the `dist` directory.

## Technologies Used

- React
- Webpack
- Babel
- CSS3

 
