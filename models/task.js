const mongoose = require('mongoose');

// User Schema
const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
