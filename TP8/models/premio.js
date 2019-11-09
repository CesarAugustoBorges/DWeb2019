const mongoose = require('mongoose')
const Schema = mongoose.Schema

var PremioSchema = new Schema({
    category: {type: String, required: true},
    year: {type: Number, required: true},
    overallMotivation: {type: String, required: true},
    laureates: Array
})

module.exports = mongoose.model('nobels', PremioSchema)