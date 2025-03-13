const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../mongodb/models/userModel");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Sign-up Route
router.post("/signup", async (req, res) => {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
        if (existingUser.username === username) {
            return res.status(400).json({ message: "Username already taken" });
        }
        if (existingUser.email === email) {
            return res.status(400).json({ message: "Email already taken" });
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, username, email, password: hashedPassword });

    try {
        await user.save();
        res.status(201).json({ message: "User created successfully. Please sign in." });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
});

// Sign-in Route
router.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required!" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ message: "Sign-in successful!", token, username: user.username });
    } catch (error) {
        res.status(500).json({ message: "Error signing in!", error });
    }
});

// Protected Main Route
router.get("/", authMiddleware, (req, res) => {
    res.json({ message: `Welcome, ${req.user.username}!` });
});

module.exports = router;