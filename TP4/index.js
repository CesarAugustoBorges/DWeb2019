var http = require('http')
var url = require('url')
var fs = require('fs')
var port = 7777

var server = http.createServer(function(req, res){
    var partes = req.url.split('/')
    var fileId = partes[partes.length - 1]
    console.log("fileId: " + fileId);
    if(fileId.match(/arq2html.xsl/))
        sendFile(res, "./arq2html.xsl", "xsl")
    else if(fileId.match(/index/))
        sendFile(res, "./index.html", "html")
    else
        sendFile(res, "./dataset/arq" + fileId + ".xml", "xml")
})

function error(res, message){
    console.log("MY ERROR: " + message)
    res.writeHead(404, {'Content-Type': 'text/text'})
    res.end(message)    
}

function sendFile(res, filePath, contentType){
    fs.readFile(filePath, function(err, data){
        if(err) error(res, "Can't load xsl file");
        else sendData(res, data, contentType)
    })  
}

function sendData(res, data, contentType){
    res.writeHead(200, {'Content-Type': 'text/' + contentType})
    res.write(data)
    res.end()
}

server.listen(port)
console.log("Server is listening at port " + port + "...")