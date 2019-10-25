var express = require('express');
var router = express.Router();
const arq = require('./arq');
const jsonfile = require('jsonfile')
const myBD = 'arq.json'

/* GET home page. */
router.get('/musica/:tit', function(req, res, next) {
  console.log(req.params.tit);
  arq.getMusica(req.params.tit, (erro, musica) => {
    console.log(musica)
    if(erro) res.render('error', {error : erro})
    else res.render('musica', {musica: musica})
  })
});

router.get('/', function(req, res, next) {
  arq.getArquivo((erro,arquivo) => {
    if(erro) res.render('error', {error : erro})
    else res.render('index', { musicas: arquivo })
  })
});

module.exports = router;
