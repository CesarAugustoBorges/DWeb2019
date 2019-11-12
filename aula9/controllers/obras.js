var Obras = require('../models/obras')

module.exports.listarObras = () =>{
    return Obras
        .find()
        .exec()
}

module.exports.listarObrasPor = (criterios) => {
    return Obras
            .find(criterios)
            .exec()
}

module.exports.consultar = (id) => {
    return Obras
            .findOne({_id: id})
            .exec()
}


module.exports.compositores = () => {
    return Obras
        .distinct("compositor")
        .exec()
}

module.exports.periodos = () => {
    return Obras
        .distinct("periodo")
        .exec()
}