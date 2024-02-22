const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');
const path = require('path');
const cookieParser = require('cookie-parser');
const auth = require('./middleware/auth');

const app = express();
const port = 80;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/taskpulse');

// Set up static files path
let staticFilesPath = path.join(__dirname, '/public');
app.use(express.static(staticFilesPath));

// Use body-parser middleware for URL-encoded data
app.use(bodyParser.urlencoded({ extended: true })); // Use body-parser for URL-encoded data

app.use(bodyParser.json());

app.use(cookieParser());

// Route to serve the login/signup page
app.get('/', (req, res) => {
    let fileName = path.join(__dirname, 'views', 'authentication.html');
    res.sendFile(fileName);
})

// Route to serve the tasks page
app.get('/tasks', auth, (req, res) => {
    let fileName = path.join(__dirname, 'views', 'index.html');
    res.sendFile(fileName);
})

// Route to handle user registration
app.post('/register', async (req, res) => {

    // Create a new user using the User model
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    const token = await newUser.generateJWT();

    res.cookie('jwt', token, {
        expires: new Date(Date.now() + (15 * 60 * 1000)),
        httpOnly: true
    });


    newUser.save()
        .then(() => {
            // After successful registration, redirect to the index page
            let fileName = path.join(__dirname, 'views', 'authentication.html');
            res.status(201).redirect('/');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

// Route to handle user Login
app.post('/login', async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let dbUser = await User.findOne({ email: email, password: password });

    if (dbUser) {
        const token = await dbUser.generateJWT();

        res.cookie('jwt', token, {
            expires: new Date(Date.now() + (15 * 60 * 1000)),
            httpOnly: true
        });
        // After successful Login, redirect to the index page
        res.json({ success: true, message: '/tasks' });
    }
    else {
        // Clear form fields and display an error message on the client-side
        res.json({ success: false, message: 'Invalid Credentials' });
    }

})

// Start the server
app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}/`);
})