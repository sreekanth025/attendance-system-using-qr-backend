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
            await professorModel.find({ email : user },(err,result)=>{

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

module.exports = professorRouter;