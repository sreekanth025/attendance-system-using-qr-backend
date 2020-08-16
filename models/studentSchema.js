const mongoose = require('mongoose');
const validator = require('validator')

const classSchema = require('./classSchema').schema; 
const Schema = mongoose.Schema; 

const studentSchema = new Schema({
    name: {
        type: String, 
        required: true, 
        trim: true,
        minlength: 1,
        maxlength: 100
    },

    email: {
        type: String, 
        required: true, 
        trim: true, 
        validate: (value) => {
            return validator.isEmail(value)
        }
    },

    rollNo: {
        type: String, 
        required: true, 
        trim: true,
        minlength: 9,
        maxlength: 9
    },  

    password: {
        type: String, 
        required: true, 
        trim: true, 
        minlength: 8, 
        maxlength: 15
    }, 

    records: {
        type: [classSchema], 
        required: false
    }
}); 

module.exports = mongoose.model('student', studentSchema, 'students'); 