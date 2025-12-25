const Transaction = require('../models/Transaction');

// @desc    Process payment (Mock)
// @route   POST /api/payments
// @access  Private
exports.processPayment = async (req, res) => {
    try {
        const { policyId, amount } = req.body;

        // Mock Payment Logic: Always succeed for now
        // In real world, integrate with Stripe/PayPal here

        const transaction = await Transaction.create({
            userId: req.user.id,
            policyId,
            amount,
            status: 'Success'
        });

        res.status(201).json({ message: 'Payment Successful', transaction });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Payment Failed' });
    }
};

// @desc    Get user transactions
// @route   GET /api/payments
// @access  Private
exports.getTransactions = async (req, res) => {
    try {
        let transactions;
        if (req.user.role === 'admin') {
            transactions = await Transaction.find();
        } else {
            transactions = await Transaction.find({ userId: req.user.id });
        }
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
