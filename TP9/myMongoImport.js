var mongoose = require('mongoose');
var jsonfile = require('jsonfile');
var port = 27017;

mongoimport = function(dbName, colName, file){
    mongoose.connect('mongodb://127.0.0.1:' + port +'/'+ dbName, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=> {
            //console.log('Mongo ready: ' + mongoose.connection.readyState)
            jsonfile.readFile(file, (erro, objs) => {
                if(erro){
                    console.log('ERROR: não foi possivel ler o ficheiro ' + file)
                    return
                }else{
                    var genericSchema = mongoose.Schema({}, { strict: false })
                    var ModelSchema = mongoose.model(colName, genericSchema)
                    var savedObj = new ModelSchema(objs)
                    savedObj.save()
                        .then(dados => {
                            console.log("File " + file + " was saved sussefully")
                            mongoose.connection.close()
                        })
                        .catch(erro => console.log("ERROR: " + erro.message))
                }
            })
        })
        .catch((erro)=> console.log('ERROR: Mongo, erro na conexão: ' + erro))
}

main = function(){
    if(process.argv.length < 5){
        console.log("ERROR: use \"node myMongoImport <dbName> <colName> <filePath> [--<option>=<value>]\"")
        return
    }
    var dbName = process.argv[2]
    var colName = process.argv[3]
    var jsonfile = process.argv[4]
    for(var i = 5; i < process.argv.length; i++){
        if(process.argv[i].startsWith('--')){
            var option = process.argv[i].substring(2, process.argv[i].length)
            var split = option.split('=')
            if(split.length < 2){
                console.log('ERROR: ' + process.argv[i] + 'is not a valid option, user \"--<option>=<value>\"')
                return;
            }
            switch (split[0]) {
                case 'port' : 
                    //console.log('port :' + split[1])
                    port = parseInt(split[1]); 
                    break;
                default : 
                    console.log('ERROR: Can\'t find option ' + split[0])
                    return;
            }
        }
    }
    mongoimport(dbName, colName, jsonfile)
}

main()
