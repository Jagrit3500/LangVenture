require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const pathRoutes = require('./routes/paths');
const userRoutes = require('./routes/user');
const translateRoutes = require('./routes/translate');

// Initialize Express app
const app = express();

// Connect to MongoDB (non-blocking)
connectDB().then(connected => {
  if (connected) {
    console.log('💾 Database is ready for seeding. Run: npm run seed\n');
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/paths', pathRoutes);
app.use('/api/user', userRoutes);
app.use('/api/translate', translateRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'LangVenture API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to LangVenture API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth/register, /api/auth/login',
      paths: '/api/paths, /api/paths/:slug',
      user: '/api/user/me, /api/user/set-path, /api/user/challenge, /api/user/challenges',
      translate: '/api/translate',
      health: '/api/health'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
