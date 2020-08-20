const express = require('express'); 
const app = express(); 

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const studentRouter = require('./controllers/studentRouter');
const professorRouter = require('./controllers/professorRouter'); 
const middleware = require('./utils/middleware');

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/student', studentRouter);
app.use('/api/professor', professorRouter);

app.get('/', (req, res) => {
    res.send('Hello'); 
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;