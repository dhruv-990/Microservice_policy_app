const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    policyId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Success', 'Failed'],
        default: 'Success'
    },
    currency: {
        type: String,
        default: 'USD'
    }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
