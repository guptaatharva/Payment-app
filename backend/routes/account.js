const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');
const router = express.Router();


router.get('/balance', authMiddleware, async function (req, res) {
    try {
        const userAcc = await Account.findOne({ userId: req.userId });
        if (!userAcc) {
            return res.status(404).json({ success: false, message: "Account not found" });
        }

        res.status(200).json({
            success: true,
            message: "Balance fetched successfully",
            balance: userAcc.balance
        });
    } catch (err) {
        console.error("Error fetching balance:", err.message);
        res.status(500).json({
            success: false,
            message: "Server error occurred",
            error: err.message
        });
    }
});

router.post('/transfer', authMiddleware, async function (req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { to, amount } = req.body;

        if (!amount || typeof amount !== "number" || amount <= 0) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ success: false, message: "Invalid transfer amount" });
        }

        const fromAcc = await Account.findOne({ userId: req.userId }).session(session);

        if (!fromAcc) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ success: false, message: "Sender account not found" });
        }

        if (fromAcc.balance < amount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
                success: false,
                message: `Insufficient funds. Available: ₹${fromAcc.balance}, Required: ₹${amount}`
            });
        }

        const toAcc = await Account.findOne({ userId: to }).session(session);

        if (!toAcc) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ success: false, message: "Recipient account not found" });
        }

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            success: true,
            message: "Transaction successful"
        });

    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.error("Error processing transaction:", err.message);
        res.status(500).json({
            success: false,
            message: "Server error occurred",
            error: err.message
        });
    }
});

module.exports = router;
