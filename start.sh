#!/bin/bash

# Start the backend server in the background
node server/server.js &

# Store the backend server's PID
BACKEND_PID=$!

# Build the frontend
npm run build

# Install serve if not already installed
if ! command -v serve &> /dev/null; then
  npm install -g serve
fi

# Start the frontend server
serve -s build -l $PORT

# When the frontend server exits, make sure to clean up the backend process
trap "kill $BACKEND_PID" EXIT
