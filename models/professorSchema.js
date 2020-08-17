const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const professorSchema = new Schema({

});

module.exports = mongoose.model('professor', professorSchema, 'professors');