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
                console.log("arq: " + arquivo.length)
                callback(erro, arquivo)
            }
        })
    },

    getMusica: function(titulo, callback){
        this.getArquivo((erro, musicas) => {
            if(erro){
                console.log(erro)
                callback(erro, musicas)
            } else {
                //console.log("A procurar musica: " + titulo)
                var index = musicas.findIndex(mus => mus.tit == titulo)
                //console.log("index: " + index + "; " + musicas[index])
                if(index == -1){
                    callback(new Error('Música não encontrada'), musicas[index])
                } else {
                    callback(erro, musicas[index])
                }
            }
        })
    },

    addRegist: function(musica){
        jsonfile.readFile(myBD, (erro, arquivo)=>{
            if(!erro){ 
                arquivo.push(musica)
                jsonfile.writeFile(myBD, arquivo, erro =>{
                    if(erro) console.log(erro)
                    else{
                        console.log('Registo gravado com sucesso')
                    } 
                })
            }
            else {
                console.log(erro)
            }
        })
    }
}
