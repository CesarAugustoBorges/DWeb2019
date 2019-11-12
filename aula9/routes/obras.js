var express = require('express');
var router = express.Router();
var axios = require('axios');
var url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  queryString = url.parse(req.url).query  
  if(queryString) queryString = '?' + queryString
  else queryString = ""
  axios.get('http://localhost:3000/api/obras' + queryString)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => res.status(500).jsonp(erro))
});

router.get('/compositores', function(req, res){
  axios.get('http://localhost:3000/api/compositores')
    .then(dados => res.jsonp(dados.data))
    .catch(erro => res.status(500).jsonp(erro))
})

router.get('/periodos', function(req, res){
  axios.get('http://localhost:3000/api/periodos')
    .then(dados => res.jsonp(dados.data))
    .catch(erro => res.status(500).jsonp(erro))
})

module.exports = router;
