const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const professionalSchema = new Schema({
    name: String,
    firstSurname: String,
    secondSurname: String,
    email: String,
    phone: Number
});


module.exports = mongoose.model('Professional', professionalSchema);
