const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');
const path = require('path')
const app = express()
const port = 80

mongoose.connect('mongodb://127.0.0.1:27017/taskpulse');

let staticFilesPath = path.join(__dirname, '/public');
console.log(staticFilesPath);
app.use(express.static(staticFilesPath));
app.use(bodyParser.urlencoded({ extended: true })); // Use body-parser for URL-encoded data

app.get('/', (req, res) => {
    let fileName = path.join(__dirname, 'views', 'authentication.html');
    res.sendFile(fileName);
})

app.post('/register', (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    newUser.save()
        .then(() => {
            let fileName = path.join(__dirname, 'views', 'index.html');
            res.status(201).sendFile(fileName);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
})

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}/`)
})