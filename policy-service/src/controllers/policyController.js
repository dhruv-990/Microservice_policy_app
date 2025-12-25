const Policy = require('../models/Policy');

// @desc    Get all policies
// @route   GET /api/policies
// @access  Public
exports.getPolicies = async (req, res) => {
    try {
        const policies = await Policy.find();
        res.status(200).json(policies);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get single policy
// @route   GET /api/policies/:id
// @access  Public
exports.getPolicyById = async (req, res) => {
    try {
        const policy = await Policy.findById(req.params.id);
        if (policy) {
            res.status(200).json(policy);
        } else {
            res.status(404).json({ message: 'Policy not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a policy
// @route   POST /api/policies
// @access  Private/Admin
exports.createPolicy = async (req, res) => {
    try {
        const { policyName, policyType, premiumAmount, coverageAmount, description } = req.body;

        const policy = await Policy.create({
            policyName,
            policyType,
            premiumAmount,
            coverageAmount,
            description,
            createdBy: req.user.id
        });

        res.status(201).json(policy);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Invalid policy data' });
    }
};

// @desc    Delete a policy
// @route   DELETE /api/policies/:id
// @access  Private/Admin
exports.deletePolicy = async (req, res) => {
    try {
        const policy = await Policy.findById(req.params.id);

        if (policy) {
            await policy.deleteOne();
            res.json({ message: 'Policy removed' });
        } else {
            res.status(404).json({ message: 'Policy not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
