var express = require('express');
var router = express.Router();
var Premios = require('../controllers/premios');

router.get('/premios', function(req, res){
    var categoria = req.query.categoria
    var ano = req.query.data
    console.log("query string " + categoria, ano)
    if(categoria && ano){
        Premios.listarPor({category: categoria, year: { "$gte" : ano }})
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
    } else if (categoria){
        Premios.listarPor({category: categoria})
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
    } else if (ano){
        Premios.listarPor({year: { "$gte" : ano }})
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
    } else {
        Premios.listarMin()
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))  
    }
})


router.get('/premios/:id', function(req, res){
    Premios.consultar(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))  
})

router.get('/categorias', function(req, res){
    Premios.categorias()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))  
})

router.get('/laureados', function(req, res){
    Premios.laureados()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))  
})


module.exports = router;