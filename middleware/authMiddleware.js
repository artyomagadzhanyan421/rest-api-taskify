const jwt = require("jsonwebtoken");
const User = require("../mongodb/models/userModel");

const tokenBlacklist = require("../tokenBlacklist");

const authMiddleware = async (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied, no token provided!" });
    }

    const token = authHeader.split(" ")[1];

    if (tokenBlacklist.has(token)) {
        return res.status(401).json({ message: "Token has been invalidated, please sign in again!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token!" });
    }
};

module.exports = authMiddleware;