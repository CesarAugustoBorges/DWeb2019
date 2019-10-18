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
            jsonfile.readFile(myBD, (erro, tarefas)=>{
                res.writeHead(200, {
                    'Content-Type' : 'text/html; charset=utf-8'
                })
                if(!erro) res.write(pug.renderFile('index.pug', {listaTarefas: tarefas}))
                else res.write(pug.renderFile('erro.pug', {e: "Erro na leitura da BD..."}))
                res.end()
            })
        }else if(purl.pathname == "/w3.css"){
            res.writeHead(200, {
                'Content-Type' : 'text/css; charset=utf-8'
            })
            fs.readFile('stylesheets/w3.css', (erro, dados)=>{
                if(!erro) res.write(dados);
                else res.write(pug.renderFile('erro.pug', {e:erro}))
                res.end()
            })
        } else {
            res.writeHead(200, {
                'Content-Type' : 'text/html; charset=utf-8'
            })
            res.write(pug.renderFile('erro.pug', {e: urlPath + ' not found'}))
            res.end()
        }
    } else if(req.method == 'POST'){
        if(urlPath == '/adicionarTarefa'){
            recuperaTarefa(req, tarefa => {
                jsonfile.readFile(myBD, (erro, tarefas)=>{
                    if(!erro){ 
                        tarefas.push(tarefa)
                        jsonfile.writeFile(myBD, tarefas, erro =>{
                            if(erro) console.log(erro)
                            else{
                                console.log('Registo gravado com sucesso')
                                res.writeHead(200, {
                                    'Content-Type' : 'text/html; charset=utf-8'
                                })
                                res.write(pug.renderFile('index.pug', {listaTarefas:tarefas}))
                                res.end()
                            } 
                        })
                    }
                    else {
                    res.writeHead(200, {
                        'Content-Type' : 'text/html; charset=utf-8'
                    })
                    res.write(pug.renderFile('erro.pug', {e:erro}))
                    res.end()
                    }
                })
            })
        } else if(urlPath.match(/removerTarefa\/[0-9]+/)){
            let split = urlPath.split('/')
            let index = split[2] - '0'
            jsonfile.readFile(myBD, (erro, tarefas)=>{
                if(!erro){ 
                    tarefas.splice(index, 1)
                    jsonfile.writeFile(myBD, tarefas, erro =>{
                        if(erro) console.log(erro)
                        else{
                            console.log('Registo ' + index + ' removido com sucesso')
                            res.writeHead(200, {
                                'Content-Type' : 'text/html; charset=utf-8'
                            })
                            res.write(pug.renderFile('index.pug', {listaTarefas:tarefas}))
                            res.end()
                        }
                    })
                }
                else {
                    res.writeHead(200, {
                        'Content-Type' : 'text/html; charset=utf-8'
                    })
                    res.write(pug.renderFile('erro.pug', {e:erro}))
                    res.end()
                }
            })
        } else {
            res.writeHead(200, {
                'Content-Type' : 'text/html; charset=utf-8'
            })
            res.write(pug.renderFile('erro.pug', {e: urlPath + ' not found'}))
            res.end()
        }
    } else if(req.method == 'DELETE'){
        res.writeHead(200, {
            'Content-Type' : 'text/html; charset=utf-8'
        })
        res.write(pug.renderFile('erro.pug', {e: req.method + ' not supported'}))
        res.end()
        // TODO
        // need a way to get a DELETE method from index.pug
        // after -> move route 'removerTarefa/index' here
    }  else{
        res.writeHead(200, {
            'Content-Type' : 'text/html; charset=utf-8'
        })
        res.write(pug.renderFile('erro.pug', {e: req.method + ' not supported'}))
        res.end()
    }
})

server.listen(7777)
console.log("Server tarefas is listening at port: " + port )


function recuperaTarefa(request, callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', ()=>{
            callback(parse(body))
        })
    }
}