const Task = require('../models/Task');

// Create task
exports.createTask = async (req, res) => {
  const { title, description, priority, deadline } = req.body;
  const task = new Task({ user: req.user._id, title, description, priority, deadline });
  await task.save();
  res.status(201).json(task);
};

// Get all tasks for a user
exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};

// Update task
exports.updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
};

// Delete task
exports.deleteTask = async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json({ message: 'Task deleted' });
};
