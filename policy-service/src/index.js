require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const policyRoutes = require('./routes/policies');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Database
connectDB();

// Routes
app.use('/api/policies', policyRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', service: 'policy-service' });
});

app.listen(PORT, () => {
    console.log(`Policy Service running on port ${PORT}`);
});
