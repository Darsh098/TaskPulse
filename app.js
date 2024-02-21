const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')
const app = express()
const port = 80

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

app.post('/register', (req, res) => {
    console.log('Name:', req.body.name);
    console.log('Email:', req.body.email);
    console.log('Password:', req.body.password);
})

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}/`)
})