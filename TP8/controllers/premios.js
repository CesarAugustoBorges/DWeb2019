var Premio = require('../models/premio')

// Devolve a lista de premios
module.exports.listar = () => {
    return Premio
        .find()
        .exec()
}

module.exports.listarMin = () => {
    return Premio
        .find({}, {year: 1, category: 1, _id: -1})
        .exec()
}

// Devolve a informação de um premio
module.exports.consultar = id => {
    return Premio
        .findOne({_id: id})
        .exec()
}

// Devolve o número de premios na BD
module.exports.contar = () => {
    return Premio
        .countDocuments()
        .exec()
}

module.exports.inserir = premio => {
    var novo = new Premio(premio)
    return novo.save()
}

module.exports.remover = function(id){
    return Premio.deleteOne({_id: id})
}

module.exports.categorias = () => {
    return Premio
        .aggregate([{"$group" : {"_id" : "$category"}}])
        .exec()
}

module.exports.listarPor = (criterios) =>{
    return Premio
        .find(criterios, {})
        .exec()
}

module.exports.laureados = () => {
    return Premio.aggregate([
        {"$unwind" : "$laureates"},
        {"$group": { "_id" : "$laureates", "premio":{"$push": {"ano" : "$year", "categoria" : "$category"}}}},
        {"$sort" : {"_id.firstname" : 1}}
    ]).exec()
}

//db.nobels.aggregate({$unwind : "$laureates"}, 
//{$group:{ _id : "$laureates", premio:{$push: {ano : "$year", categoria : "$category"}}}}, 
//{$sort : {"_id.firstname" : -1}})