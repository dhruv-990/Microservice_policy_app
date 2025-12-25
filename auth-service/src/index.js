require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Database
connectDB();

// Routes
app.use('/api/auth', authRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', service: 'auth-service' });
});

// 404
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Auth Service running on port ${PORT}`);
});
