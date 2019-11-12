var express = require('express');
var router = express.Router();
var axios = require('axios');

var apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM0ODgwMDgsImV4cCI6MTU3NjA4MDAwOH0.UD0UdMrzKcWDop8HlwqdeOuK_ZzZxHvOMOP2DMkIjUQ'

/* GET home page. */
router.get('/', function(req, res, next) {
    axios.get('http://clav-api.dglab.gov.pt/api/entidades?apikey=' + apiKey)
        .then(dados => res.render('entidades', {entidades: dados.data}))
        .catch(erro => res.render('error', {error: erro}))
});

router.get('/:id', function(req, res, next) {
    axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id +'?apikey=' + apiKey)
        .then(dados1 => {axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id +'/intervencao/dono?apikey=' + apiKey)
            .then(dados2 => {axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id +'/intervencao/participante?apikey=' + apiKey)
                .then(dados3 => {axios.get('http://clav-api.dglab.gov.pt/api/entidades/'+ req.params.id +'/tipologias?apikey=' + apiKey)
                    .then(dados4 => res.render('entidade', {entidade: dados1.data, dono: dados2.data, participante: dados3.data, topologia: dados4.data}))
                    .catch(erro => res.render('error', {error: erro}))
                })
                .catch(erro => res.render('error', {error: erro}))
            })
            .catch(erro => res.render('error', {error: erro}))
        })
        .catch(erro => res.render('error', {error: erro}))
});

module.exports = router;
