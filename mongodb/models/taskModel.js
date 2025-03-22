const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["pending", "completed"], default: "pending" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // Reference to the user
}, { timestamps: true });

const Task = mongoose.model("tasks", taskSchema);

module.exports = Task;