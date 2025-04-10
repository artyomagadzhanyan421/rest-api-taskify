const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./mongodb/connect");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

// .env 
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/", authRoutes);
app.use("/", taskRoutes);

// Connect to DB and start server
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));