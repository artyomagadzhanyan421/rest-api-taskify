const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Task = require("../mongodb/models/taskModel");

const router = express.Router();

// POST request
router.post("/tasks", authMiddleware, async (req, res) => {
    const { title, startDate, endDate, description } = req.body;

    if (!title || !startDate || !endDate || !description) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        const newTask = new Task({
            title,
            startDate,
            endDate,
            description,
            userId: req.user.id // Associate task with the signed-in user
        });

        await newTask.save();
        res.status(201).json({ message: "Task created successfully!", task: newTask });
    } catch (error) {
        res.status(500).json({ message: "Error creating task!", error: error.message });
    }
});

// GET request (render all tasks)
router.get("/tasks", authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks!", error: error.message });
    }
});

// PUT request
router.put("/tasks/:id", authMiddleware, async (req, res) => {
    const { title, startDate, endDate, description } = req.body;
    const taskId = req.params.id;

    if (!title || !startDate || !endDate || !description) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: "Task not found!" });
        }

        // Ensure the task belongs to the signed-in user
        if (task.userId.toString() !== req.user.id) { // Fixed `user` to `userId`
            return res.status(403).json({ message: "Not authorized to edit this task!" });
        }

        task.title = title;
        task.startDate = startDate;
        task.endDate = endDate;
        task.description = description;

        await task.save();
        res.json({ message: "Task updated successfully!", task });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Error updating task!", error: error.message });
    }
});

// DELETE request
router.delete("/tasks/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        await Task.findByIdAndDelete(id);
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// GET request (render individual task)
router.get("/tasks/:id", authMiddleware, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found!" });
        }

        if (task.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to view this task!" });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Error fetching task!", error: error.message });
    }
});

module.exports = router;