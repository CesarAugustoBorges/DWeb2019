var express = require('express');
var router = express.Router();
var Obras = require('../controllers/obras')



router.get('/obras/:id', function(req, res){
    console.log(req.params.id)
    Obras.consultar(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
})

/* GET home page. */
router.get('/obras', function(req, res, next) {
    var ano = req.query.ano
    var compositor = req.query.compositor
    var periodo = req.query.periodo
    var duracao = req.query.duracao
    console.log(ano, compositor, periodo)
    if(ano){
        Obras.listarObrasPor({anoCriacao : ano})
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
    }
    else if(periodo){
        Obras.listarObrasPor({periodo : periodo})
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
    }
    else if(compositor && duracao){
        Obras.listarObrasPor({compositor : compositor, duracao : {$gt : duracao}})
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
    } else {
        Obras.listarObras()
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
    }  
});

router.get('/compositores', function(req, res){
    Obras.compositores()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
})

router.get('/periodos', function(req, res){
    Obras.periodos()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
})

module.exports = router;
