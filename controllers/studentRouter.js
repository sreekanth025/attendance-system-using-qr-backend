const studentRouter = require('express').Router(); 
const mongoose = require('mongoose');
const studentModel = require('../models/studentSchema'); 

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
        let student = new studentModel({
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

studentRouter.post('/login', async (req, res, next) => {

    try {
        let user = {
            rollNo: req.body.rollNo
        }        

        let doc; 
        let userExist = true;
        await studentModel.find(user, (err, docs) => {
            // console.log(docs);
            if(docs.length == 0) {
                userExist = false;
                res.status(401).send("User doesn't exist.");

            }

            if(userExist) doc = docs[0];
        }); 

        if(userExist && req.body.password == doc.password) {
            res.cookie("asqr-user", user); 
            res.status(200).send("Successfully logged-In"); 
        }
        else if(userExist) res.status(401).send("Login Failed");
    }
    catch(err) {
        next(err); 
    }
});

studentRouter.get('/records', (req, res, next) => {
    try {
        let user = req.cookies['asqr-user']
        if(!user) res.send("Please login"); 
        
        if(user) {
            console.log(user.rollNo);
        }
    }
    catch(err) {
        next(err); 
    }
});

module.exports = studentRouter;