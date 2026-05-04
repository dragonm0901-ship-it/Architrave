const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('./src/config/db');
const errorHandler = require('./src/middleware/errorHandler');
require('dotenv').config();


// 1. Environment Validation
const requiredEnv = ['PGUSER', 'PGHOST', 'PGDATABASE', 'PGPASSWORD', 'PGPORT'];
const missingEnv = requiredEnv.filter(env => !process.env[env]);

if (missingEnv.length > 0) {
  console.error(`FATAL ERROR: Missing environment variables: ${missingEnv.join(', ')}`);
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 5000;

// 2. Security Middleware
app.use(helmet()); // Set security headers
app.use(morgan('dev')); // HTTP request logger
app.use(cors({

  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json({ limit: '10kb' })); // Body limit to prevent large payload attacks



// Routes
const projectRoutes = require('./src/routes/projectRoutes');
const serviceRoutes = require('./src/routes/serviceRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');
const contactRoutes = require('./src/routes/contactRoutes');

app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/contact', contactRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'success', message: 'Backend is running correctly.' });
});

// Global Error Handler
app.use(errorHandler);

app.listen(port, () => {

  console.log(`Server is running on port ${port}`);
});


