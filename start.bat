@echo off
echo ======================================
echo  Starting Vastu Consultation Website...
echo ======================================
echo.

REM Step 1: Start Backend
echo Installing backend dependencies...
cd /d "%~dp0"
npm install
echo.

echo Starting backend server...
start cmd /k "node server.js"
echo.

REM Step 2: Start Frontend
echo Starting frontend (React app)...
cd vastusite
npm install
npm start
