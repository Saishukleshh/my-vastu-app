@echo off
echo ========================================
echo Setting up Ravi Vastu Dev Tunnel
echo ========================================
echo.

echo Step 1: Creating named tunnel 'ravi-vastu'...
devtunnel create ravi-vastu --allow-anonymous

echo.
echo Step 2: Adding port 3000...
devtunnel port create ravi-vastu -p 3000

echo.
echo Step 3: Starting tunnel...
echo Your custom URL will be: https://ravi-vastu.devtunnels.ms/ (or similar)
echo.
devtunnel host ravi-vastu

pause
