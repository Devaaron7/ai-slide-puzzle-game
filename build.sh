#!/bin/bash

# Exit on error
set -e

# Install dependencies using npm install (not npm ci)
echo "Installing dependencies..."
npm install --no-audit

# Build the frontend
echo "Building frontend..."
npm run build

# Print success message
echo "Build completed successfully!"
