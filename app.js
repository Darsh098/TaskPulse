const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');
const path = require('path')

const app = express()
const port = 80

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/taskpulse');

// Set up static files path
let staticFilesPath = path.join(__dirname, '/public');
app.use(express.static(staticFilesPath));

// Use body-parser middleware for URL-encoded data
app.use(bodyParser.urlencoded({ extended: true })); // Use body-parser for URL-encoded data

// Route to serve the login/signup page
app.get('/', (req, res) => {
    let fileName = path.join(__dirname, 'views', 'authentication.html');
    res.sendFile(fileName);
})

// Route to handle user registration
app.post('/register', (req, res) => {

    // Create a new user using the User model
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    newUser.save()
        .then(() => {
            // After successful registration, redirect to the index page
            let fileName = path.join(__dirname, 'views', 'index.html');
            res.status(201).sendFile(fileName);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
})

// Start the server
app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}/`)
})