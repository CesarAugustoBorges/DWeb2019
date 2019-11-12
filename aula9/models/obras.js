const mongoose = require('mongoose')

var obraSchema = new mongoose.Schema({
    nome: {type : String},
    desc: {type : String},
    periodo: {type : String},
    anoCriacao: {type : String},
    compositor: {type : String},
    duracao: {type : String},
    _id : {type : String}
})

module.exports = mongoose.model('obras', obraSchema)