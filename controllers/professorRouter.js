const professorRouter = require('express').Router(); 
const mongoose = require('mongoose');
const professorModel = require('../models/professorSchema'); 

const url = 'mongodb://localhost:27017/testdb'; 
mongoose.connect(url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}); 
var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


professorRouter.post('/register', (req, res, next) => {

}); 

professorRouter.post('/login', (req, res, next) => {

}); 

module.exports = professorRouter;