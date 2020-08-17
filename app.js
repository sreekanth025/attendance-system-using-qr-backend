const express = require('express'); 
const app = express(); 

const bodyParser = require('body-parser');
const studentRouter = require('./controllers/studentRouter');
const professorRouter = require('./controllers/professorRouter'); 

app.use(bodyParser.json());
app.use('/api/student', studentRouter);
app.use('/api/professor', professorRouter);

app.get('/', (req, res) => {
    res.send('Hello'); 
});

module.exports = app;