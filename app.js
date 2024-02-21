const express = require('express')
const path = require('path')
const app = express()
const port = 80

let staticFilesPath = path.join(__dirname, '/public');
console.log(staticFilesPath);
app.use(express.static(staticFilesPath));

app.get('/', (req, res) => {
    let fileName = path.join(__dirname, 'views', 'authentication.html');
    res.sendFile(fileName);
})

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}/`)
})