require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const paymentRoutes = require('./routes/payments');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5004;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

connectDB();

app.use('/api/payments', paymentRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', service: 'payment-service' });
});

app.listen(PORT, () => {
    console.log(`Payment Service running on port ${PORT}`);
});
