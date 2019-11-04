var express = require('express');
var router = express.Router();
const Filmes = require('../controllers/filmes')

/* GET home page. */
router.get('/', function(req, res, next) {
  var page = req.query.page;
  if(page != undefined) page = Number(page)
  if(!Number.isInteger(page) || page < 0) 
    page = 0
  Filmes.numPaginas().then(num =>{
    if(!Number.isInteger(page) || page > num)
      page = num 
    Filmes.listarPagina(page)
      .then(dados => {
        res.render('index', {filmes : dados, page: page, numPages: num})
      })
      .catch(erro => res.render('error', {error: erro}))  
  })
  
    /*
  Filmes.listar()
    .then(dados => {
      filmes = new Array;
      var j = 0
      for( var i = page*30; j < 30 && i < dados.length; j++,i++)
        filmes.push(dados[i])
      res.render('index', {filmes : filmes, page: page})
    })
    .catch(erro => res.render('error', {error: erro}))
    */
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
