const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
    policyName: {
        type: String,
        required: true
    },
    policyType: {
        type: String,
        enum: ['Health', 'Life', 'Vehicle', 'Property'],
        required: true
    },
    premiumAmount: {
        type: Number,
        required: true
    },
    coverageAmount: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    createdBy: {
        type: String, // Admin User ID (from Auth Service typically, just storing ID here)
        required: true
    }
}, { timestamps: true });

// We might want a separate UserPolicy schema for when a user buys a policy
// But for simplicity in this MVP, let's just have Policy Definitions managed by Admin
// And separate "UserPolicies" if needed, OR just a "policyHolders" array here?
// Better: Separate collection 'UserPolicy' to link User -> Policy.
// Let's stick to Policy Definition first.

module.exports = mongoose.model('Policy', policySchema);
