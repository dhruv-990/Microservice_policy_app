const express = require('express');
const router = express.Router();
const { processPayment, getTransactions } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getTransactions)
    .post(protect, processPayment);

module.exports = router;
