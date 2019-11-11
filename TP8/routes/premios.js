var express = require('express');
var router = express.Router();
var url = require('url');
var axios = require('axios');

/* GET home page. */
//Check
router.get('/', function(req, res, next) {
  queryString = url.parse(req.url).query
  if(queryString) queryString = '?' + queryString
  else queryString = ""
  axios.get('http://localhost:3000/api/premios' +  queryString)
    .then(dados => res.render('premios', {premios: dados.data}))
    .catch(erro => res.render('error', {error: erro}))
});

//Check
router.get('/:id', function(req, res, next) {
  axios.get('http://localhost:3000/api/premios/' + req.params.id)
    .then(dados => res.render('premio', {premio : dados.data}))
    .catch(erro => res.render('error', {error: erro}))
});

module.exports = router;
