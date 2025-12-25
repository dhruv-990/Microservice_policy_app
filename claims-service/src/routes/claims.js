const express = require('express');
const router = express.Router();
const { getClaims, createClaim, updateClaimStatus } = require('../controllers/claimController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getClaims)
    .post(protect, createClaim);

router.route('/:id')
    .put(protect, admin, updateClaimStatus);

module.exports = router;
