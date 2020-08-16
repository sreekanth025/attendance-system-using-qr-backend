const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const classSchema = new Schema({
    professorName: {
        type: String, 
        required: true
    }, 

    subjectName: {
        type: String, 
        required: true
    }, 

    date: {
        type: Date, 
        required: true
    }
});

module.exports = mongoose.model('classSchema', classSchema);