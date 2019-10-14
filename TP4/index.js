var http = require('http')
var url = require('url')
var fs = require('fs')
var port = 7777

var server = http.createServer(function(req, res){
    var partes = req.url.split('/')
    var fileId = partes[partes.length - 1]
    var fileIdSplit = fileId.split('.')
    var fileType = fileIdSplit[partes.length - 1]
    if(fileId == ""){
        fileId = "index.html"
        fileType = "html"
    } 
    console.log("fileId: " + fileId);
    if(fileType != undefined){
        console.log("fileType: " + fileType)
        if(fileType == "html" && !fileId.match(/index/)) 
            fileId = "html/" + fileId
        sendFile(res, fileId, fileType)
    }
    else
        sendFile(res, "./dataset/arq" + fileId + ".xml", "xml")
})

function error(res, message){
    console.log("MY ERROR: " + message)
    res.writeHead(404, {'Content-Type': 'text/html'})
    res.end("<html><head></head><body><h1>" + message + "</h1></body>")    
}

function sendFile(res, filePath, contentType){
    fs.readFile(filePath, function(err, data){
        if(err) error(res, "Can't load file: \"" + filePath + "\"");
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