@echo off
REM Start the test server in the background and run Playwright tests

echo Starting test server on http://localhost:3000...
start /B node test-server.js

REM Give the server time to start
timeout /t 2 /nobreak

echo.
echo Running Playwright tests...
echo.

npx playwright test

echo.
echo Test completed! Stopping server...
taskkill /IM node.exe /F >nul 2>&1

echo Done!
pause
