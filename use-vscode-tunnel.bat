@echo off
echo ========================================
echo Starting Ravi Vastu with VS Code Tunnel
echo ========================================
echo.

echo Starting Node.js server on port 3000...
start "Vastu Server" cmd /k "npm start"

echo.
echo ========================================
echo MANUAL STEPS:
echo ========================================
echo 1. In VS Code, press Ctrl+Shift+P
echo 2. Type: "Forward a Port"
echo 3. Enter port: 3000
echo 4. Right-click the port and select "Port Visibility" > "Public"
echo 5. Copy the forwarded URL
echo ========================================
echo.

pause
