const studentRouter = require('express').Router(); 
const mongoose = require('mongoose');
const studentSchema = require('../models/studentSchema'); 

const url = 'mongodb://localhost:27017/testdb'; 
mongoose.connect(url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}); 
var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


studentRouter.post('/register', (req, res, next) => {    
    /*
    console.log('request received');
    console.log(req.body);
    */

    try {
        let student = new studentSchema({
            name: req.body.name, 
            email: req.body.email, 
            rollNo: req.body.rollNo, 
            password: req.body.password,
            records: [] 
        });

        student.save((err)=>{
            if(err) console.log(err);
            else {
                console.log('Student saved');
                res.status(201).end()
            }
        })
    }
    catch(err) {
        next(err); 
    }
});

studentRouter.post('/login', (req, res, next) => {

});

studentRouter.get('/records', (req, res, next) => {

});

module.exports = studentRouter;