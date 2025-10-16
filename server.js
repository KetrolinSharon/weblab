// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Allow frontend to call backend
app.use(bodyParser.json());

// In-memory storage for tasks
let tasks = [];

// Routes

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Add new task
app.post('/tasks', (req, res) => {
  const { task } = req.body;
  if(task) {
    tasks.push(task);
    res.status(201).json({ message: 'Task added', tasks });
  } else {
    res.status(400).json({ message: 'Task is required' });
  }
});

// Delete task by index
app.delete('/tasks/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if(index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    res.json({ message: 'Task deleted', tasks });
  } else {
    res.status(400).json({ message: 'Invalid index' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});