// server/controllers/taskController.js
const Task = require('../models/Task');

const addTask = async (req, res) => {
    const { title, description, budget } = req.body;
    try {
        const newTask = new Task({
            title,
            description,
            budget,
            clientId: req.user.id
        });

        const task = await newTask.save();
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate('clientId', ['username', 'email']);
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const applyTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        task.freelancerId = req.user.id;
        task.status = 'in-progress';
        await task.save();

        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = { addTask, getTasks, applyTask };
