const jsonfile = require('jsonfile')
const myBD = 'arq.json'

module.exports = {
    getArquivo: function(callback){
        jsonfile.readFile(myBD, (erro, arquivo) =>{
            if(erro){
                console.log(erro)
                callback(erro, arquivo)
            } 
            else{
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
                callback(erro)
            }else {
                this.addRegist(dados, erro => {
                    callback(erro)
                })
            }
        })
    }
}
