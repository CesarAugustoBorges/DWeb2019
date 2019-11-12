var mongoose = require('mongoose');
var jsonfile = require('jsonfile');

mongoimport = function(dbName, colName, file){
    mongoose.connect('mongodb://127.0.0.1:27017/'+ dbName, {useNewUrlParser: true, useUnifiedTopology: true})
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
                            console.log("File " + file + " was saved susscefully")
                            mongoose.connection.close()
                        })
                        .catch(erro => console.log("ERROR: " + erro.message))
                }
            })
        })
        .catch((erro)=> console.log('ERROR: Mongo, erro na conexão: ' + erro))
}

main = function(){
    if(process.argv.length != 5){
        console.log("use \"node myMongoImport <dbName> <colName> <filePath>\"")
        return
    }
    var dbName = process.argv[2]
    var colName = process.argv[3]
    var jsonfile = process.argv[4]
    mongoimport(dbName, colName, jsonfile)
}

main()
