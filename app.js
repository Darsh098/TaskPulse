const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')
const app = express()
const port = 80

mongoose.connect('mongodb://127.0.0.1:27017/taskpulse');

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

let staticFilesPath = path.join(__dirname, '/public');
console.log(staticFilesPath);
app.use(express.static(staticFilesPath));
app.use(bodyParser.urlencoded({ extended: true })); // Use body-parser for URL-encoded data

app.get('/', (req, res) => {
    let fileName = path.join(__dirname, 'views', 'authentication.html');
    res.sendFile(fileName);
})

app.post('/register', async (req, res) => {
    const registerUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    const registered = await registerUser.save();
    let fileName = path.join(__dirname, 'views', 'index.html');
    res.status(201).sendFile(fileName);
})

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}/`)
})