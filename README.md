# Vastu Consultation Website with AI Chatbot

A full-stack website for Vastu consultation services featuring an intelligent AI chatbot for instant Vastu guidance.

## Features

### 🤖 AI Chatbot
- Comprehensive Vastu knowledge base
- Real-time responses for room placements, directions, colors
- Remedies for wealth, health, relationships, career
- Plant and mirror placement guidance

### 🏠 Consultation Services
- Online booking system
- Email notifications
- Service management
- Contact form integration

### 🎨 Modern Design
- Vastu-themed color palette
- Responsive design
- Glass morphism effects
- Smooth animations

## Tech Stack

**Frontend:**
- HTML5, CSS3, JavaScript
- Socket.io for real-time chat
- Modern CSS Grid & Flexbox
- Font Awesome icons

**Backend:**
- Node.js with Express
- Socket.io for WebSocket connections
- Nodemailer for email notifications
- RESTful API architecture

## Installation

1. **Clone or download the project**
   ```bash
   cd my-vastu-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Edit `.env` file:
   ```
   PORT=3000
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-app-password
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Access the website**
   Open http://localhost:3000 in your browser

## Email Setup

To enable email notifications:

1. **Gmail Setup:**
   - Enable 2-factor authentication
   - Generate an App Password
   - Use the App Password in EMAIL_PASS

2. **Update .env file:**
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-digit-app-password
   ```

## AI Chatbot Knowledge Base

The chatbot can help with:

### 🧭 Directions
- North, South, East, West guidance
- Northeast, Southeast, Southwest, Northwest
- Directional colors and elements

### 🏠 Room Placements
- Bedroom positioning
- Kitchen placement
- Bathroom locations
- Living room setup
- Study room guidance
- Prayer room positioning

### 🎨 Colors & Elements
- Directional color schemes
- Vastu-compliant color combinations
- Element balancing

### 🌿 Remedies
- Financial prosperity tips
- Health improvement guidance
- Relationship harmony
- Career advancement
- Educational success

### 🪴 Additional Guidance
- Plant placements
- Mirror positioning
- Water feature locations
- Entrance optimization

## API Endpoints

### Consultation Booking
```
POST /api/consultations/book
Body: {
  name, email, phone, service, date, message
}
```

### Chatbot
```
POST /api/chatbot/chat
Body: {
  message: "your question"
}
```

## File Structure

```
my-vastu-app/
├── vastu-consult/
│   ├── index.html          # Main website
│   ├── style.css           # Modern CSS styles
│   └── script.js           # Frontend JavaScript
├── routes/
│   ├── consultations.js    # Booking API
│   └── chatbot.js          # AI chatbot API
├── server.js               # Express server
├── package.json            # Dependencies
├── .env                    # Environment variables
└── README.md               # This file
```

## Customization

### Adding New Vastu Knowledge
Edit `routes/chatbot.js` and add to the `vastuKnowledge` object:

```javascript
const vastuKnowledge = {
  // Add new categories or expand existing ones
  newCategory: {
    topic: "guidance text"
  }
};
```

### Styling Changes
Modify CSS custom properties in `vastu-consult/style.css`:

```css
:root {
  --primary: #8b4513;     /* Change primary color */
  --accent: #ff6b35;      /* Change accent color */
  /* Add more custom properties */
}
```

## Deployment

### Local Development
```bash
npm run dev
```

### Production Deployment
1. Set NODE_ENV=production in .env
2. Configure proper email credentials
3. Deploy to your hosting platform
4. Ensure port 3000 is accessible

## Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions:
- Email: support@vastuexpert.com
- Phone: +91 9876543210

---

**Note:** This is a demonstration project. For production use, consider adding:
- Database integration (MongoDB/PostgreSQL)
- User authentication
- Payment gateway integration
- Advanced AI/ML models
- Comprehensive testing
- Security enhancements