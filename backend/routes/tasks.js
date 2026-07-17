const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { protect } = require('../middleware/auth');

// All routes require auth
router.use(protect);

// @route GET /api/tasks?date=YYYY-MM-DD
router.get('/', async (req, res) => {
  try {
    const { date } = req.query;
    const filter = { user: req.user._id };
    if (date) filter.date = date;
    const tasks = await Task.find(filter).sort({ time: 1, createdAt: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route POST /api/tasks
router.post('/', async (req, res) => {
  try {
    const { title, description, category, time, date, priority } = req.body;
    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      category,
      time,
      date,
      priority,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route PUT /api/tasks/:id
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const { title, description, category, time, date, priority, completed } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (category !== undefined) task.category = category;
    if (time !== undefined) task.time = time;
    if (date !== undefined) task.date = date;
    if (priority !== undefined) task.priority = priority;
    if (completed !== undefined) task.completed = completed;

    const updated = await task.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route PATCH /api/tasks/:id/toggle
router.patch('/:id/toggle', async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    task.completed = !task.completed;
    const updated = await task.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route GET /api/tasks/stats?date=YYYY-MM-DD
router.get('/stats', async (req, res) => {
  try {
    const { date } = req.query;
    const filter = { user: req.user._id };
    if (date) filter.date = date;
    const tasks = await Task.find(filter);
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    res.json({ total, completed, pending: total - completed });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
