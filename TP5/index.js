var http = require('http')
var url = require('url')
var pug = require('pug')
var fs = require('fs')
var jsonfile = require('jsonfile')

var {parse} = require('querystring')

var myBD = 'tarefas.json'
var port = 7777

var server = http.createServer((req, res)=> {
    var purl = url.parse(req.url, true)
    var urlPath = purl.pathname
    
    console.log(req.method + ' ' + purl.pathname)

    if(req.method == 'GET'){
        if((purl.pathname == '/') || (purl.pathname == '/tarefas')){
            res.writeHead(200, {
                'Content-Type' : 'text/html; charset=utf-8'
            })
            res.write(pug.renderFile('index.pug'))
            res.end();
        }else if(purl.pathname == "/w3.css"){
            res.writeHead(200, {
                'Content-Type' : 'text/css; charset=utf-8'
            })
            fs.readFile('stylesheets/w3.css', (erro, dados)=>{
                if(!erro) res.write(dados);
                else res.write(pug.renderFile('erro.pug', {e:erro}))
                res.end()
            })
        }
    } else if(req.method == 'POST'){
        if(urlPath == 'adicionarTarefa'){

        }
    } else if(req.method == 'DELETE'){
        if(urlPath == 'removerTarefa'){

        }
    }  else{

    }
})

server.listen(7777)
console.log("Server tarefas is listening at port: " + port )
