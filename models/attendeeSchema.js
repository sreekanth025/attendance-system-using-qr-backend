const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

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
        type:[String],
        required: false
    }
});

module.exports = mongoose.model('attendeeSchema', attendeeSchema);