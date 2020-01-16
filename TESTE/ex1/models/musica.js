const mongoose = require('mongoose')
const Schema = mongoose.Schema

var partituraSchema = new Schema({
    _type: String,
    _path: String,
    _voz : String,
    _clave : String
})

var instrumentosSchema = new Schema({
    designacao: String,
    Partitura : [partituraSchema]
})

var instrumentosSchema = new Schema({
    Partitura : [partituraSchema],
    instrumento : [instrumentosSchema],
})

var musicaSchema = new Schema({
    titulo: String,
    tipo: String,
    compositor: String,
    instrumentos: [instrumentosSchema],
    Partitura: [partituraSchema],
    id: String
})

module.exports = mongoose.model('musicas', musicaSchema)