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

    try {
        let professor = new professorModel({
            name: req.body.name, 
            email: req.body.email, 
            password: req.body.password,
            subjects: req.body.subjects,
            records: [] 
        });

        professor.save((err)=>{
            if(err) console.log(err);
            else {
                console.log('Professor registered');
                res.status(201).send('Professor registered');
            }
        })
    }
    catch(err) {
        next(err); 
    }

}); 

professorRouter.post('/login', async (req, res, next) => {
    try{
        let user = {
            email : req.body.email
        }
        
        await professorModel.find({ email : user.email },(err,result)=>{

            if(err)
                console.log('Error occured');
            
            else if(result.length==0)
                res.status(401).send("login failed");
            
            else if(result[0].password != req.body.password )
            res.status(401).send('Invalid password! User unidentified');

            else
            {
                res.cookie("asqr-user",user); 
                res.status(200).send("Successfully logged-In"); 
            } 
        }); 
    }

    catch(err){
        next(err); 
    }        

}); 

professorRouter.get('/records', async (req, res, next) => {
    try {
        let user = req.cookies['asqr-user']
        if(!user) res.send("Please login"); 
        
        if(user) {
            // console.log(user);
            await professorModel.find({ email : user.email },(err,result)=>{

                if(err)
                    console.log(err);
                
                else if(result.length == 0)
                    res.status(401).send("login failed");
    
                else
                    res.status(200).send(result[0].records);
            });
        }
    }
    catch(err) {
        next(err); 
    }
});

professorRouter.post('/add_subject', async (req, res, next) => {

    try{      
        let user = req.cookies['asqr-user']
        if(!user) res.send("Please login"); 
        
        if(user) {
            
            await professorModel.updateOne(

                { email : user.email },
                { $addToSet : { subjects : req.body.subject } },
                (err,result)=>{
                  
                if(err)
                    console.log(err);
                
                else if(result.n==0)
                    res.status(401).send("login failed");
                    
                else if(result.nModified==0)
                    res.status(200).send('Subject already exists!');  

                else
                    res.status(200).send('Added successfully!');
                    
                });
        }
    }

    catch(err){
        next(err);
    }
});

professorRouter.post('/newLecture', async (req, res, next) => {
    try {

        let user = {
            email: req.cookies['asqr-user'].email
        }

        var datetime = new Date();
        let newLecture = {
            subjectName: req.body.subjectName, 
            date: datetime,
            attendees: []
        }

        let changes = {
            $addToSet: {records: newLecture}
        }

        let lectureCookie = {
            email: user.email, 
            subjectName: newLecture.subjectName,
            date: newLecture.date
        }

        await professorModel.updateOne(user, changes, (err, result) => {
            if(err) {
                console.log(err); 
                res.send("Some Problem occurred");
            }
            else {
                // console.log(result);
                res.cookie("asqr-lecture", lectureCookie);
                res.send("class started");
            }
        });
    }
    catch(err) {
        next(err); 
    }
});

professorRouter.post('/attendance', async (req, res, next) => {
    try {
        let lecture = req.cookies['asqr-lecture'];
        let student = {
            rollNo: req.body.rollNo
        }

        let subDoc = {
            "email": lecture.email,
            "records.subjectName": lecture.subjectName, 
            "records.date": lecture.date
        }

        let changes = {
            $addToSet: {"records.$.attendees": student.rollNo}
        }
        
        await professorModel.updateOne(subDoc, changes, (err, result) => {
            if(err) {
                console.log(err); 
                res.send("Some Problem occurred");
            }
            else {
                // console.log(result);
                res.send("Succesfully attended the lecture");
            }
        }); 
        
    }
    catch(err) {
        next(err);
    }
});

module.exports = professorRouter;
