var express = require('express');
var router = express.Router();
const fs = require('fs')
var Ficheiros = require('../controllers/ficheiros')
var Ficheiro = require('../models/ficheiros')


var multer = require('multer')
var upload = multer({dest: 'uploads/'})

/* GET users listing. */
router.get('/ficheiros', function(req, res) {
  Ficheiros.listar()
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
});

router.post('/ficheiros', upload.array('ficheiro'), function(req,res){
    let data = new Date()
    for(var i = 0; i < req.files.length; i++){

      let oldPath = __dirname + '/../' + req.files[i].path
      let newPath = __dirname + '/../public/ficheiros/' + req.files[i].originalname
      fs.rename(oldPath, newPath, function (err){
        if (err) throw err
      })

      var descricao = req.files.length == 1 ? req.body.desc : req.body.desc[i]
      let novoFicheiro = new Ficheiro(
        {
          data: data.toISOString(),
          desc: descricao,
          name: req.files[i].originalname,
          mimetype: req.files[i].mimetype,
          size: req.files[i].size
        })
      
      novoFicheiro.save(function( err, ficheiro){
        if (!err) {console.log("Ficheiro guardado com sucesso")
      }
        else console.log(err)
      })
    }
    res.redirect('/')
})

module.exports = router;
