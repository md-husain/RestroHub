const express = require('express');
const router = express.Router();
const { TopUp } = require('../models/topup');
const adminAuth = require('../middleware/admin-auth');

// Get all pending top-up requests (Admin only)
router.get('/pending', adminAuth, async (req, res) => {
    try {
        const pendingTopups = await TopUp.find({ status: 'pending' }).populate('userId', 'name email');
        res.send(pendingTopups);
    } catch (e) {
        res.status(500).send();
    }
});

// Approve a top-up request (Admin only)
router.patch('/approve/:id', adminAuth, async (req, res) => {
    try {
        const topUp = await TopUp.findById(req.params.id);

        if (!topUp) {
            return res.status(404).send();
        }

        topUp.status = 'approved';
        await topUp.save();

        res.send(topUp);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;