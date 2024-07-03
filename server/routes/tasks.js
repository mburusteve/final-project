// server/routes/tasks.js
const express = require('express');
const router = express.Router();
const { addTask, getTasks, applyTask } = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, addTask);
router.get('/', getTasks);
router.post('/apply/:id', authMiddleware, applyTask);

module.exports = router;
