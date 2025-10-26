const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vastu-app';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err.message));

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'vastu-consult')));

// Routes
app.use('/api/consultations', require('./routes/consultations'));
app.use('/api/chatbot', require('./routes/chatbot'));

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'vastu-consult', 'index.html'));
});

// Serve admin panel
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Catch all handler for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'vastu-consult', 'index.html'));
});

// Socket.io for real-time chat
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('chat-message', async (data) => {
    const response = getVastuResponse(data.message);
    socket.emit('bot-response', { message: response });
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Simple Vastu AI responses for Socket.io
function getVastuResponse(message) {
  const responses = {
    'bedroom': 'For bedroom Vastu: Place bed in Southwest direction, avoid mirrors facing bed, use warm colors like pink/peach.',
    'kitchen': 'Kitchen should be in Southeast direction, cooking should face East, avoid kitchen in Northeast.',
    'entrance': 'Main entrance should face North/East/Northeast for positive energy flow and prosperity.',
    'colors': 'Use warm colors in South/Southwest, cool colors in North/Northeast, avoid dark colors in Northeast.',
    'plants': 'Tulsi in Northeast, money plant in Southeast corner, avoid thorny plants inside home.',
    'mirror': 'Mirrors in North/East walls bring prosperity, avoid mirrors in bedroom and opposite to main door.',
    'water': 'Water features in North/Northeast, avoid in South/Southwest, keep water clean and flowing.',
    'default': 'I can help with Vastu guidance for bedrooms, kitchens, entrances, colors, plants, mirrors, and water features. What would you like to know?'
  };
  
  const lowerMessage = message.toLowerCase();
  for (const [key, response] of Object.entries(responses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }
  return responses.default;
}

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Local: http://localhost:${PORT}`);
  if (process.env.TUNNEL_URL) {
    console.log(`Tunnel: ${process.env.TUNNEL_URL}`);
  }
});