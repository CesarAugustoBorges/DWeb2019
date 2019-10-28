var express = require('express');
var router = express.Router();
const arq = require('./arq');
const nanoid = require('nanoid');
const myBD = 'arq.json'

/* GET Musica by id. */
router.get('/musica/:id', function(req, res, next) {
  console.log(req.params.id);
  arq.getMusica(req.params.id, (erro, musica) => {
    if(erro) res.render('error', {error : erro})
    else res.render('musica', {musica: musica})
  })
});

/* GET form to edit music */
router.get('/form/:id', function(req, res, next){
  arq.getMusica(req.params.id, (erro, musica) => {
    if(erro) res.render('error', {error : erro})
    else res.render('form', {musica: musica})
  })
});


/* GET form to add music */
router.get('/form', function(req, res, next){
  res.render('form')
});

/* GET home page. */
router.get('/', function(req, res, next) {
  arq.getArquivo((erro,arquivo) => {
    arquivo.forEach(musica => {
      if(!musica.musico === 'String'){
          if(musica.musico === 'Array'){
            console.log('ARRAY:' + musica.musico)
            musica.musico = musica.musico.forEach()
          }
          else {

            console.log('NotARRAY:' + musica.musico)
            //musica.musico = musica.musico.#text
          }
      }
    })
    if(erro) res.render('error', {error : erro})
    else{
      res.render('index', { musicas: arquivo })
    } 
  })
});

/* POST add new music */
router.post('/adicionarMusica', function(req, res, next){
  var music = req.body
  music.id = nanoid()
  arq.addRegist(music, erro => {
    if(erro) res.render('error', {error : erro})
    else{
      arq.getArquivo((erro,arquivo) => {
        if(erro) res.render('error', {error : erro})
        else{
          res.render('index', { musicas: arquivo })
        } 
      })
    }
  })
})

/* DELETE music by id */
router.delete('/removerMusica/:id', function(req, res, next){
  arq.removeRegist(req.params.id, erro =>{
    if(erro) res.render('error', {error : erro})
    else{
      arq.getArquivo((erro,arquivo) => {
        if(erro) res.render('error', {error : erro})
        else res.render('index', { musicas: arquivo })
      })
    } 
  })
})

/* PUT music by id */
router.put('/editarMusica/:id', function(req, res, next){
  arq.updateRegist(req.params.id, req.body, erro => {
    if(erro) res.render('error', {error : erro})
    else {
      arq.getArquivo((erro,arquivo) => {
        if(erro) res.render('error', {error : erro})
        else res.render('index', { musicas: arquivo })
      })
    }
  })
})

module.exports = router;
