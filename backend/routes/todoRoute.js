const express = require('express');
const router = express.Router();
const Todo = require('../models/todoModel');

router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new todo
router.post('/todo', async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    description: req.body.description,
    completed: req.body.completed || false,
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a todo
router.patch('/todo/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (req.body.text) {
      todo.text = req.body.text;
    }
    if (req.body.description) {
      todo.description = req.body.description;
    }
    if (req.body.completed !== undefined) {
      todo.completed = req.body.completed;
    }
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a todo
router.delete('/todo/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
