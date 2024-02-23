const mongoose = require('mongoose');

// Task Schema
const taskSchema = new mongoose.Schema({
    userId: String,
    title: String,
    description: String,
    priority: String,
    date: Date
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;