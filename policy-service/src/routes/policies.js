const express = require('express');
const router = express.Router();
const { getPolicies, createPolicy, deletePolicy, getPolicyById } = require('../controllers/policyController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getPolicies).post(protect, admin, createPolicy);
router.route('/:id').get(getPolicyById).delete(protect, admin, deletePolicy);

module.exports = router;
