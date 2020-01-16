var express = require('express');
var router = express.Router();
var axios = require('axios');

const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NjAwNTQsImV4cCI6MTU4MTQ1MjA1NH0.HIlH4_Ao6504qaLhhbZ2_OtDzaZaG5FeYy-Yc2d9lwQ"

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://clav-api.dglab.gov.pt/api/entidades?apikey='+ apikey)
    .then(dados => res.render('index', {lista: dados.data}))
    .catch(erro => res.render('error', {error: erro}))
});

router.get('/tipologia/:id', function(req, res, next) {
  axios.get('http://clav-api.dglab.gov.pt/api/tipologias/' + req.params.id + '?apikey='+ apikey)
    .then(dados => {res.render('tipologia', {tipologia: dados.data})})
    .catch(erro => res.render('error', {error: erro}))
});

router.get('/entidade/:id', function(req, res, next){
  axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '?apikey='+ apikey )
    .then(dados =>  {
      axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/tipologias?apikey='+ apikey)
        .then(dados2 => {
          axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/intervencao/dono?apikey='+ apikey)
            .then(dados3 => {
              axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/intervencao/participante?apikey='+ apikey)
              .then(dados4 =>{console.log(dados3.data);res.render('entidade', {entidade: dados.data, tipologias: dados2.data, dono: dados3.data, participante: dados4.data})})
            })
            .catch(erro => res.render('error', {error: erro}))
        })
        .catch(erro => res.render('error', {error: erro}))
    })
    .catch(erro => res.render('error', {error: erro}))
})



module.exports = router;
