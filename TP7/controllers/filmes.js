const Filme = require('../models/filme')
const mongoose = require('mongoose')
const ObjectId =  mongoose.Types.ObjectId

const Filmes = module.exports

Filmes.listar = () => {
    return Filme
        .find({}, {})
        .exec()
}


Filmes.contar = () => {
    return Filme
        .countDocuments()
        .exec()
}

Filmes.projectar = campos => {
    return Filme
        .find({}, campos)
        .exec()
}

Filmes.consultar = id => {
    return Filme
        .findOne({_id : ObjectId(id)})
        .exec()
}

Filmes.apagar = id => {
    return Filme
        .findOneAndDelete({_id: ObjectId(id)}, {useFindAndModify : true})
        .exec()
}

Filmes.adicionar = dados => {
    var filme = new Filme(dados)
    return filme.save()
}

Filmes.update = (idFilme, dados) => {
    return Filme.findOneAndUpdate({_id : idFilme}, dados, {useFindAndModify : true})
        .exec()
        .then(filmeAntigo => this.consultar(idFilme))
}