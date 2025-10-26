@echo off
echo 🕉️ Starting Vastu Server...
taskkill /f /im node.exe 2>nul
timeout /t 2 /nobreak >nul
echo Starting server on port 3000...
node simple-server.js
pause