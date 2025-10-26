const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Vastu Server Setup...\n');

// Test 1: Check if files exist
const filesToCheck = [
  'server.js',
  'vastu-consult/index.html',
  'vastu-consult/style.css',
  'vastu-consult/script.js',
  'routes/chatbot.js',
  'routes/consultations.js'
];

console.log('📁 Checking required files:');
filesToCheck.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, file));
  console.log(`${exists ? '✅' : '❌'} ${file}`);
});

// Test 2: Check if HTML is valid
console.log('\n📄 Checking HTML file:');
try {
  const htmlContent = fs.readFileSync(path.join(__dirname, 'vastu-consult/index.html'), 'utf8');
  const hasTitle = htmlContent.includes('<title>');
  const hasBody = htmlContent.includes('<body>');
  const hasChatbot = htmlContent.includes('chatbot-widget');
  
  console.log(`${hasTitle ? '✅' : '❌'} Has title tag`);
  console.log(`${hasBody ? '✅' : '❌'} Has body tag`);
  console.log(`${hasChatbot ? '✅' : '❌'} Has chatbot widget`);
} catch (err) {
  console.log('❌ Error reading HTML file');
}

console.log('\n🚀 To start the server, run:');
console.log('   node server.js');
console.log('\n🌐 Then open: http://localhost:3000');