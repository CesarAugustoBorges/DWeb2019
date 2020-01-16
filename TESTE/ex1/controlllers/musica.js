var Musica = require('../models/musica')

// Devolve a lista de Musicas
module.exports.listar = () => {
    return Musica
        .find({}, {_id: 1, titulo: 1, compositor: 1})
        .exec()
}


// Devolve a informação de um Musica
module.exports.consultar = id => {
    return Musica
        .findOne({id: id})
        .exec()
}

module.exports.listarTipos = () => {
    return Musica
        .distinct('tipo')
        .exec()
}

module.exports.listarPor = (conds) => {
    return Musica
        .find(conds, {})
        .exec()
}

module.exports.remover = function(id){
    return Musica.deleteOne({_id: id})
}

module.exports.categorias = () => {
    return Musica
        .aggregate([{"$group" : {"_id" : "$category"}}])
        .exec()
}

module.exports.listarPor = (criterios) =>{
    return Musica
        .find(criterios, {})
        .exec()
}

module.exports.listarObrasQuant = () =>{
    return Musica
        .aggregate([{$unwind : "$instrumentos"},
                {$group: 
                    {_id : "$id",
                    partituras: {$sum: 1},
                    titulo: {$first: "$titulo"}}}
            ])
        }