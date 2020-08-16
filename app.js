const express = require('express'); 
const app = express(); 

const bodyParser = require('body-parser');
const studentRouter = require('./controllers/studentRouter');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello'); 
})

app.use('/api/student', studentRouter);

module.exports = app;