const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../mongodb/models/userModel");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ name });
    if (existingUser) {
        return res.status(400).json({ message: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, password: hashedPassword });

    try {
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
});

// Sign-in Route
router.post("/signin", async (req, res) => {
    const { name, password } = req.body;

    const user = await User.findOne({ name });
    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    res.json({ message: "Sign-in successful", token });
});

// Protected Main Route
router.get("/", authMiddleware, (req, res) => {
    res.json({ message: `Welcome, ${req.user.name}!` });
});

module.exports = router;