#!/bin/bash
set -e

echo "Building Coffee Shop Website UI..."
echo "Current directory: $(pwd)"
echo "Node version: $(node --version)"
echo "npm version: $(npm --version)"

# Ensure vite is available
echo "Checking vite..."
if [ -f "./node_modules/.bin/vite" ]; then
  echo "Vite found at ./node_modules/.bin/vite"
  chmod +x ./node_modules/.bin/vite
  ./node_modules/.bin/vite build
else
  echo "Vite not found, using npx..."
  npx vite build
fi

echo "Build completed successfully!"
