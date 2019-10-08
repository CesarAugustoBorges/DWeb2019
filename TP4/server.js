var http = require('http')
var url = require('url')
var fs = require('fs')
var port = 7777

var server = http.createServer(function(req, res){
    var partes = req.url.split('/')
    var fileId = partes[partes.length - 1]
    fs.readFile("./xml/arq" + fileId + ".xml", function(err, data){
        if(err){
            console.log("Couldn't read file with id " + fileId)
            res.writeHead(404, {'Content-Type': 'text/html'})
            res.end('File not found')    
        } else {
            console.log(req.url)
            res.writeHead(200, {'Content-Type': 'text/xml'})
            res.write(data)
            res.end()
        }
    })
})

server.listen(port)
console.log("Server is listening at port " + port + "...")