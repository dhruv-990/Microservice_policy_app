const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    policyId: {
        type: String, // Ideally ObjectId referencing Policy Service, but loose coupling means String ID
        required: true
    },
    claimAmount: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    adminComment: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Claim', claimSchema);
