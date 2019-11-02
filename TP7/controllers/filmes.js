const Filme = require('../models/filme')
const mongoose = require('mongoose')
const ObjectId =  mongoose.Types.ObjectId

const Filmes = module.exports

Filmes.listar = () => {
    return Filme
        .find({}, {})
        .exec()
        .then(filmes => filmes.sort((f1, f2) => f1.title > f2.title ? 1 : (f1.title < f2.title ? -1 : 0)))
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