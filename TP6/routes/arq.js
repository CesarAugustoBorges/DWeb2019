const jsonfile = require('jsonfile')
const myBD = 'arq.json'

function normalizaMusica(musica){
    //console.log(typeof musica.musico)
    if(musica.musico){
        if(typeof musica.musico != 'string'){
            if(Array.isArray(musica.musico)){
            //console.log('ARRAY:' + musica.musico)
            var sb = ""
            musica.musico.forEach(mus => sb += mus)
            musica.musico = sb
            }
            else {
            //console.log('NotARRAY:' + musica.musico)
            musica.musico = musica.musico["#text"]
            }
        } 
    } else {
        musica.musico = "-"
    }
    if(musica.obs){
        if(typeof musica.obs != 'string'){
            if(Array.isArray(musica.obs)){
                //console.log('ARRAY:' + musica.musico)
                var sb = ""
                musica.obs.forEach(mus => sb += mus["#text"])
                musica.obs = sb
            }
            else if(Array.isArray(musica.obs["#text"])){
                var sb = ""
                musica.obs["#text"].forEach(mus => sb += mus)
                musica.obs = sb
            }
            else {
            //console.log('NotARRAY:' + musica.musico)
            musica.obs = musica.obs["#text"]
            }
        } 
    }
    if(musica.file){
        if(typeof musica.file != 'string'){
            if(Array.isArray(musica.file)){
            //console.log('ARRAY:' + musica.musico)
            var sb = ""
            musica.file.forEach(mus => sb += mus["#text"])
            musica.file = sb
            }
            else {
            //console.log('NotARRAY:' + musica.musico)
            musica.file = musica.file["#text"]
            }
        } 
    }
}

module.exports = {
    getArquivo: function(callback){
        jsonfile.readFile(myBD, (erro, arquivo) =>{
            if(erro){
                console.log(erro)
                callback(erro, arquivo)
            } 
            else{
                arquivo.forEach(musica => {
                    normalizaMusica(musica)
                  })
                console.log("Arquivo recuperado com sucesso")
                arquivo.sort((a, b) => a.tit > b.tit ? 1 : (a.tit < b.tit ? -1 : 0))
                callback(erro, arquivo)
            }
        })
    },

    getMusica: function(id, callback){
        this.getArquivo((erro, musicas) => {
            if(erro){
                console.log(erro)
                callback(erro, musicas)
            } else {
                //console.log("A procurar musica: " + id)
                var index = musicas.findIndex(mus => mus.id == id)
                //console.log("index: " + index + "; " + musicas[index])
                if(index == -1){
                    callback(new Error('Música não encontrada'), musicas[index])
                } else {
                    normalizaMusica(musicas[index])
                    callback(erro, musicas[index])
                }
            }
        })
    },

    addRegist: function(musica, callback){
        jsonfile.readFile(myBD, (erro, arquivo)=>{
            if(!erro){ 
                arquivo.push(musica)
                jsonfile.writeFile(myBD, arquivo, erro =>{
                    if(erro){
                        console.log(erro)
                        callback(erro)
                    } 
                    else{
                        callback(null)
                        console.log('Registo gravado com sucesso')
                    } 
                })
            }
            else {
                callback(erro)
                console.log(erro)
            }
        })
    },

    removeRegist: function(id, callback){
        this.getArquivo((erro, musicas) => {
            if(erro){
                console.log(erro)
                callback(erro, musicas)
            } else {
                var index = musicas.findIndex(mus => mus.id == id)
                if(index == -1){
                    callback(new Error('Música não encontrada'))
                } else {
                    musicas.splice(index, 1)
                    jsonfile.writeFile(myBD, musicas, erro =>{
                        if(erro){
                            console.log('Erro na remoção da musica ' + id)
                            callback(erro)
                        } else {
                            console.log('Musica ' + id + ' removida')
                            callback(erro)
                        }
                    })  
                }
            }
        })
    },

    updateRegist: function(id, dados, callback){
        this.removeRegist(id, erro =>{
            if(erro){
                console.log(erro)
                callback(erro)
            }else {
                dados.id = id
                console.log(dados)
                this.addRegist(dados, erro => {
                    callback(erro)
                })
            }
        })
    }
}
