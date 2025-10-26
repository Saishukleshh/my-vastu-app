@echo off
echo ========================================
echo Starting Ravi Vastu Server + Tunnel
echo ========================================
echo.

echo Starting Node.js server on port 3000...
start "Vastu Server" cmd /k "npm start"

timeout /t 3 /nobreak >nul

echo.
echo Starting dev tunnel...
echo Your app will be available at: https://ravi-vastu.devtunnels.ms/
echo.
devtunnel host ravi-vastu

pause
