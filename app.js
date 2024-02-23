const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const Task = require('./models/task');

const app = express();
const port = 80;
app.set('view engine', 'ejs');

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

// Route to serve the tasks page
app.get('/tasks', auth, async (req, res) => {
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.SECRET);

        // Find the user based on the ID extracted from the token
        const user = await User.findOne({ _id: verifyUser._id });

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Find tasks for the authenticated user
        const tasks = await Task.find({ userId: user._id });

        // Organize tasks by priority
        const tasksByPriority = {
            high: [],
            medium: [],
            low: []
        };

        tasks.forEach(task => {
            tasksByPriority[task.priority].push(task);
        });

        // Render the index.ejs page with the user's tasks
        let fileName = path.join(__dirname, 'views', 'index.ejs');

        // Pass tasksByPriority as a variable to be used in your template
        res.render(fileName, { tasksByPriority });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
    // let fileName = path.join(__dirname, 'views', 'index.html');
    // res.sendFile(fileName);
})


// Route to Add task
app.post('/tasks', async (req, res) => {
    let title = req.body.title
    let description = req.body.description;
    let priority = req.body.priority;
    let day = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    let isCompleted = false;

    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.SECRET);
    const u = await User.findOne({ _id: verifyUser._id });

    const newTask = new Task({
        userId: u._id,
        title: title,
        description: description,
        priority: priority,
        date: new Date(),
        isCompleted: isCompleted
    });

    newTask.save()
        .then(() => {
            res.status(201).redirect('/tasks');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
})

// Start the server
app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}/`);
})