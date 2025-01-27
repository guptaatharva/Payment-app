const express = require('express');
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const router = express.Router();


router.post("/signup", async (req, res) => {
    const { username, password, firstName, lastName } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({
            message: "Email already taken"
        });
    }

    const user = await User.create({
        username,
        password,
        firstName,
        lastName
    });

    const userId = user._id;

    await Account.create({
        userId,
        balance: 10000
    });

    const token = jwt.sign({ userId }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    });
});

router.post("/signin", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });

    if (user) {

        const token = jwt.sign({ userId: user._id }, JWT_SECRET);

        res.json({ token });
    } else {
        res.status(400).json({
            message: "Error while logging in"
        });
    }
});

router.put("/", authMiddleware, async (req, res) => {
    const { password, firstName, lastName } = req.body;

    await User.updateOne(
        { _id: req.userId },
        { password, firstName, lastName }
    );

    res.json({
        message: "Updated successfully"
    });
});

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [
            { firstName: { "$regex": filter, "$options": "i" } },
            { lastName: { "$regex": filter, "$options": "i" } }
        ]
    });

    res.json({
        users: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
});

module.exports = router;
