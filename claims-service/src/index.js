require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const claimRoutes = require('./routes/claims');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5003;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

connectDB();

app.use('/api/claims', claimRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', service: 'claims-service' });
});

app.listen(PORT, () => {
    console.log(`Claims Service running on port ${PORT}`);
});
