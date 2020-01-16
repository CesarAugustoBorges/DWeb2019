var express = require('express');
var router = express.Router();
var musica = require('../controlllers/musica')

/* GET home page. */
router.get('/obras', function(req, res, next) {
    var compositor = req.query.compositor
    var instrumento = req.query.instrumento
    var conds = {}
    if(compositor) conds.compositor = compositor
    if(instrumento) conds['instrumentos.instrumento.designacao'] = instrumento
    //console.log(conds)
    musica.listarPor(conds)
        .then(lista => res.jsonp(lista))
        .catch(erro => res.status(500).jsonp(erro))
});

router.get('/tipos', function(req, res){
    musica.listarTipos()
        .then(tipos => res.jsonp(tipos))
        .catch(erro => res.status(500).jsonp(erro))
})

router.get('/obrasQuant', function(req, res){
    musica.listarObrasQuant()
        .then(lista => res.jsonp(lista))
        .catch(erro => res.status(500).jsonp(erro))
})

router.get('/obras/:id', function(req, res){
    musica.consultar(req.params.id)
        .then(obra => res.jsonp(obra))
        .catch(erro => res.status(500).jsonp(erro))
})

module.exports = router;
