@echo off
echo Installing frontend dependencies...
npm install
echo.

echo Installing backend dependencies...
cd server
npm install
echo.

echo Setup complete!
echo.
echo To start the frontend: npm start
echo To start the backend: cd server && node server.js
echo.
pause
