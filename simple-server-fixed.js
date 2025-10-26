const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// In-memory storage for consultations (temporary)
let consultations = [];

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'vastu-consult')));

// Simple consultation booking route
app.post('/api/consultations/book', (req, res) => {
  try {
    const { name, email, phone, service, message, date } = req.body;
    
    const consultation = {
      id: Date.now(),
      name,
      email,
      phone,
      service,
      message,
      date,
      status: 'pending',
      createdAt: new Date()
    };
    
    consultations.push(consultation);
    console.log('New consultation:', consultation);
    
    res.json({ success: true, message: 'Consultation booked successfully!' });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ success: false, message: 'Booking failed' });
  }
});

// Get all consultations for admin panel
app.get('/api/consultations', (req, res) => {
  res.json(consultations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

// Simple chatbot route
app.post('/api/chatbot/chat', (req, res) => {
  const { message } = req.body;
  const response = getVastuResponse(message);
  res.json({ response });
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'vastu-consult', 'index.html'));
});

// Serve admin panel
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Enhanced Vastu AI responses
function getVastuResponse(message) {
  const responses = {
    'bedroom': '🛏️ Bedroom Vastu Tips: Place bed in Southwest direction, avoid mirrors facing bed, use warm colors like pink/peach, keep room clutter-free.',
    'kitchen': '🍳 Kitchen Vastu: Should be in Southeast direction, cook facing East, avoid Northeast placement, keep gas stove away from sink.',
    'entrance': '🚪 Main Entrance: Face North/East/Northeast for prosperity, keep well-lit and clean, avoid obstacles, use auspicious symbols.',
    'colors': '🎨 Vastu Colors: North-blue/white, South-red/pink, East-green/blue, West-white/yellow. Avoid dark colors in Northeast.',
    'plants': '🌿 Plant Placement: Tulsi in Northeast, money plant in Southeast, bamboo in East. Avoid thorny plants inside home.',
    'mirror': '🪞 Mirror Vastu: Place on North/East walls, avoid in bedroom or opposite main door, keep clean and crack-free.',
    'water': '💧 Water Elements: Place in North/Northeast, avoid South/Southwest, keep water clean and flowing.',
    'toilet': '🚽 Toilet Vastu: Best in Northwest/Southeast, avoid Northeast/Southwest, keep seat closed, ensure ventilation.',
    'study': '📚 Study Room: Face East/North while studying, place table in Northeast, use green/blue colors.',
    'wealth': '💰 Wealth Tips: Keep cash in North, place Kuber Yantra in North, keep Northeast clean, use purple in Southeast.',
    'health': '🏥 Health Vastu: Sleep with head South, keep Northeast clean, use earth colors in Southwest.',
    'career': '💼 Career Growth: Face North while working, keep North clutter-free, use blue/black in North.',
    'default': '🕉️ Namaste! I can help with Vastu guidance for rooms (bedroom, kitchen, study), directions, colors, plants, water features, and life aspects (wealth, health, career). What do you need help with?'
  };
  
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('namaste')) {
    return '🙏 Namaste! Welcome to Vastu guidance. I can help with room placements, directions, colors, and prosperity tips. What would you like to know?';
  }
  
  if (lowerMessage.includes('thank')) {
    return '🙏 You are welcome! May your home be filled with positive energy and prosperity. Ask more Vastu questions anytime!';
  }
  
  for (const [key, response] of Object.entries(responses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }
  
  return responses.default;
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/admin`);
});