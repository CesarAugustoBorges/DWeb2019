var http = require('http')
var url = require('url')
var fs = require('fs')
var port = 7777

var server = http.createServer(function(req, res){
    var partes = req.url.split('/')
    var fileId = partes[partes.length - 1]
    console.log("fileId: " + fileId);
    if(fileId.match(/arq2html.xsl/)){
        fs.readFile("./arq2html.xsl", function(err, data){
            if(err) error(res, "Can't load xsl file");
            else{
                console.log(data)
                res.writeHead(200, {'Content-Type': 'text/xsl'})
                res.write(data)
                res.end()
            }
        })  
    }
    else{
        fs.readFile("./dataset/arq" + fileId + ".xml", function(err, data){
            if(err) error("Couldn't read file with id " + fileId)
            else {
                console.log(data)
                res.writeHead(200, {'Content-Type': 'text/xml'})
                res.write(data)
                res.end()
            }
        })
    }
})

function error(res, message){
    console.log("MY ERROR: " + message)
    res.writeHead(404, {'Content-Type': 'text/text'})
    res.end(message)    
}

server.listen(port)
console.log("Server is listening at port " + port + "...")