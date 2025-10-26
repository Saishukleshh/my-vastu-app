const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;

// Store consultation bookings in memory
let consultations = [];

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json'
};

// Simple Vastu chatbot responses
const vastuResponses = {
  'bedroom': 'For bedroom Vastu: Place bed in Southwest direction, avoid mirrors facing bed, use warm colors like pink/peach.',
  'kitchen': 'Kitchen should be in Southeast direction, cooking should face East, avoid kitchen in Northeast.',
  'entrance': 'Main entrance should face North/East/Northeast for positive energy flow and prosperity.',
  'colors': 'Use warm colors in South/Southwest, cool colors in North/Northeast, avoid dark colors in Northeast.',
  'plants': 'Tulsi in Northeast, money plant in Southeast corner, avoid thorny plants inside home.',
  'mirror': 'Mirrors in North/East walls bring prosperity, avoid mirrors in bedroom and opposite to main door.',
  'water': 'Water features in North/Northeast, avoid in South/Southwest, keep water clean and flowing.',
  'default': 'I can help with Vastu guidance for bedrooms, kitchens, entrances, colors, plants, mirrors, and water features. What would you like to know?'
};

function getVastuResponse(message) {
  const lowerMessage = message.toLowerCase();
  for (const [key, response] of Object.entries(vastuResponses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }
  return vastuResponses.default;
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Handle chatbot API
  if (pathname === '/api/chatbot/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const response = getVastuResponse(data.message);
        
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({
          success: true,
          response: response,
          timestamp: new Date()
        }));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, response: 'Server error' }));
      }
    });
    return;
  }

  // Handle consultation booking
  if (pathname === '/api/consultations/book' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        
        // Store consultation with timestamp
        const consultation = {
          ...data,
          createdAt: new Date().toISOString(),
          status: 'pending'
        };
        consultations.push(consultation);
        
        console.log('Consultation booking received:', data);
        console.log('Total consultations:', consultations.length);
        
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({
          success: true,
          message: 'Consultation booked successfully! We will contact you soon.',
          data: consultation
        }));
      } catch (error) {
        res.writeHead(400, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({
          success: false,
          message: 'Invalid request data'
        }));
      }
    });
    return;
  }

  // Get all consultations (for admin panel)
  if (pathname === '/api/consultations' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify(consultations));
    return;
  }

  // Serve admin panel
  if (pathname === '/admin') {
    const adminPath = path.join(__dirname, 'admin.html');
    fs.readFile(adminPath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Admin panel not found</h1>');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
    return;
  }

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  // Serve static files
  let filePath = pathname === '/' ? '/index.html' : pathname;
  filePath = path.join(__dirname, 'vastu-consult', filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - File Not Found</h1>');
      return;
    }

    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'text/plain';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('🕉️ Vastu Consultation Server Started!');
  console.log(`🌐 Server running at: http://localhost:${PORT}`);
  console.log('📁 Serving files from: vastu-consult/');
  console.log('🤖 AI Chatbot API: /api/chatbot/chat');
  console.log('📅 Booking API: /api/consultations/book');
  console.log('👨‍💼 Admin Panel: http://localhost:3000/admin');
  console.log('\n✨ Open http://localhost:3000 in your browser');
});