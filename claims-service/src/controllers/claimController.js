const Claim = require('../models/Claim');

// @desc    Get my claims or all claims (admin)
// @route   GET /api/claims
// @access  Private
exports.getClaims = async (req, res) => {
    try {
        let claims;
        if (req.user.role === 'admin') {
            claims = await Claim.find();
        } else {
            claims = await Claim.find({ userId: req.user.id });
        }
        res.status(200).json(claims);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    File a new claim
// @route   POST /api/claims
// @access  Private
exports.createClaim = async (req, res) => {
    try {
        const { policyId, claimAmount, reason } = req.body;

        const claim = await Claim.create({
            userId: req.user.id,
            policyId,
            claimAmount,
            reason
        });

        res.status(201).json(claim);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Invalid claim data' });
    }
};

// @desc    Update claim status (Approve/Reject)
// @route   PUT /api/claims/:id
// @access  Private/Admin
exports.updateClaimStatus = async (req, res) => {
    try {
        const { status, adminComment } = req.body;
        const claim = await Claim.findById(req.params.id);

        if (claim) {
            claim.status = status || claim.status;
            claim.adminComment = adminComment || claim.adminComment;
            await claim.save();
            res.json(claim);
        } else {
            res.status(404).json({ message: 'Claim not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
