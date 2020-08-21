const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const validator = require('validator')

const attendeeSchema = require('./attendeeSchema').schema; 
const professorSchema = new Schema({
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

    password: {
        type: String, 
        required: true, 
        trim: true, 
        minlength: 8, 
        maxlength: 15
    }, 
    
    subjects: {
        type: [
            {
                type: String,
                required: true               
            }
        ] ,
        required: true
    },

    records: {
        type: [attendeeSchema], 
        required: false
    }
});

module.exports = mongoose.model('professor', professorSchema, 'professors');