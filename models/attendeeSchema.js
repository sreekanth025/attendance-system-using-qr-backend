const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const studentSchema = require('./studentSchema').schema; 
const attendeeSchema = new Schema({
    
    subjectName: {
        type: String, 
        required: true
    }, 

    date: {
        type: Date, 
        required: true
    },

    attendees: {
        type:[studentSchema.rollNo],
        required: false
    }
});

module.exports = mongoose.model('attendeeSchema', attendeeSchema);