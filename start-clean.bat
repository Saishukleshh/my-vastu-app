@echo off
echo Stopping any existing servers...
taskkill /f /im node.exe 2>nul
timeout /t 2 /nobreak >nul

echo Starting Vastu Server on port 3001...
node server.js