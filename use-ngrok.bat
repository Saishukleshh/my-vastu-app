@echo off
echo ========================================
echo Starting Ravi Vastu with ngrok
echo ========================================
echo.

echo Starting Node.js server on port 3000...
start "Vastu Server" cmd /k "npm start"

timeout /t 3 /nobreak >nul

echo.
echo Starting ngrok tunnel...
ngrok http 3000

pause
