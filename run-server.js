const { spawn } = require('child_process');
const path = require('path');

console.log('🕉️ Starting Vastu Consultation Server...');
console.log('📁 Project Directory:', __dirname);
console.log('🌐 Server will run on: http://localhost:3000');
console.log('');

// Kill any existing processes on port 3000
const killPort = spawn('npx', ['kill-port', '3000'], { stdio: 'inherit' });

killPort.on('close', () => {
  // Start the server
  const server = spawn('node', ['server.js'], { 
    stdio: 'inherit',
    cwd: __dirname
  });

  server.on('error', (err) => {
    console.error('❌ Server error:', err);
  });

  server.on('close', (code) => {
    console.log(`Server exited with code ${code}`);
  });
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  process.exit(0);
});