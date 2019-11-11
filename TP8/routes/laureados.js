var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
//Check
router.get('/', function(req, res, next) {
    axios.get('http://localhost:3000/api/laureados')
        .then(dados => {res.render('laureados', {laureates :dados.data})})
        .catch(erro => res.render('error', erro))
});

module.exports = router;
