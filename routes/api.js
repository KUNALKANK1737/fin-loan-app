const express = require('express');
const Joi = require('joi');
const Member = require('../models/member');
const Request = require('../models/request');

const router = express.Router();


router.post('/member', async (req, res) => {
    const { mobile, email, occupation, createpassword } = req.body;
    try {
        const existingMember = await Member.findOne({ mobile });
        if (existingMember) {
            return res.status(400).json({ error: "Member already exists." });
        }

        const newMember = new Member({ mobile, email, occupation, createpassword });
        await newMember.save();
        res.status(201).json({ status: "success", message: "Member registered successfully." });
    } catch (error) {
        res.status(500).json({ error: "Error registering member." });
    }
});


router.get('/service/type/calculate', (req, res) => {
    const { amt, tenure, rate } = req.query; 
    const { type } = req.params; // Extract dynamic 'type' from URL
    try {
        const monthlyRate = rate / (12 * 100);
        const emi = (amt * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                    (Math.pow(1 + monthlyRate, tenure) - 1);
        res.status(200).json({ status: "success", emi: emi.toFixed(2), type: type });
    } catch (error) {
        res.status(500).json({ error: "Error calculating EMI." });
    }
});


// 3. Update Request
router.put('/updaterequest', async (req, res) => {
    const { mobile, service, type, remarks } = req.body;
    try {
        const request = await Request.findOneAndUpdate({ mobile, type }, { service, remarks }, { new: true });
        if (!request) {
            return res.status(404).json({ error: "Loan request not found." });
        }
        res.status(200).json({ status: "success", message: "Loan request updated." });
    } catch (error) {
        res.status(500).json({ error: "Error updating loan request." });
    }
});

// More routes can be added as required
module.exports = router;
