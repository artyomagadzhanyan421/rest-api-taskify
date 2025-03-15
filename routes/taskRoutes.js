const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Task = require("../mongodb/models/taskModel");

const router = express.Router();

// Create a new task
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
        res.status(500).json({ message: "Error creating task!", error });
    }
});

// Get tasks for the signed-in user
router.get("/tasks", authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id }); // Fetch only tasks that belong to the signed-in user
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks!", error });
    }
});

// Update Task (PUT request)
router.put("/:id", authMiddleware, async (req, res) => {
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
        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to edit this task!" });
        }

        // Update task fields
        task.title = title;
        task.startDate = startDate;
        task.endDate = endDate;
        task.description = description;

        await task.save();

        res.json({ message: "Task updated successfully!", task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating task!", error });
    }
});

module.exports = router;