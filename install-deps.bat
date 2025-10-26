@echo off
echo Installing Node.js dependencies...
npm install express cors dotenv nodemailer socket.io
echo.
echo Dependencies installed successfully!
echo Now run: node server.js
pause