var express = require('express');
var router = express.Router();
const Filmes = require('../controllers/filmes')

/* GET home page. */
router.get('/', function(req, res, next) {
  Filmes.listar()
    .then(dados => res.render('index', {filmes : dados}))
    .catch(erro => res.render('error', {error: erro}))
});

router.get('/:idFilme', function(req, res, next) {
  Filmes.consultar(req.params.idFilme)
    .then(dados => res.render('filme', {filme : dados}))
    .catch(erro => res.status(500).jsonp(erro))
});

router.post('/', (req,res) => {
  var dados = req.body
  Filmes.adicionar(dados)
    .then(filme => res.jsonp(filme))
    .catch(erro => res.status(500).jsonp(erro))
})

router.delete('/:idFilme', (req,res) => {
  Filmes.apagar(req.params.idFilme)
    .then(dados => {console.log(dados); res.jsonp(dados)})
    .catch(erro => res.status(500).jsonp(erro))
})

router.put('/:idFilme', (req,res) => {
  Filmes.update(req.params.idFilme, req.body)
})

module.exports = router;
