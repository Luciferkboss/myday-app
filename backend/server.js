const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Load env from config.env for local dev; in production env vars are set by host
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.join(__dirname, 'config.env') });
}

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();

// CORS — allow local dev + deployed frontend
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://myday-app-lake.vercel.app',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'MyDay API is running ✅' });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
