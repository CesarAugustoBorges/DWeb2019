var express = require('express');
var router = express.Router();
const Filmes = require('../controllers/filmes')

/* GET home page. */
router.get('/', function(req, res, next) {
  Filmes.listar()
    .then(dados => res.render('index', {filmes : dados}))
    .catch(erro => res.render('error', {error: erro}))
});

router.get('/form', (req, res) =>{
  res.render('form', {filme : {}})
})

router.get('/form/:idFilme', (req, res) =>{
  Filmes.consultar(req.params.idFilme)
  .then(dados => res.render('form', {filme : dados}))
  .catch(erro => res.status(500).jsonp(erro))
})

router.post('/', (req,res) => {
  var dados = req.body
  console.log(dados)
  Filmes.adicionar(dados)
    .then(filme => res.render('filme', {filme: filme}))
    .catch(erro => res.status(500).jsonp(erro))
})

router.get('/:idFilme', function(req, res, next) {
  Filmes.consultar(req.params.idFilme)
    .then(dados => res.render('filme', {filme : dados}))
    .catch(erro => res.status(500).jsonp(erro))
});

router.delete('/:idFilme', (req,res) => {
  Filmes.apagar(req.params.idFilme)
    .then(dados => {console.log(dados); res.jsonp(dados)})
    .catch(erro => res.status(500).jsonp(erro))
})

router.put('/:idFilme', (req,res) => {
  console.log("para editar: " + req.body)
  Filmes.update(req.params.idFilme, req.body)
  .then(dados => {console.log(dados); res.jsonp(dados)})
  .catch(erro => res.status(500).jsonp(erro))
})

module.exports = router;
