const jsonfile = require('jsonfile')
const nanoid = require('nanoid')

function generate_id(myBD){
    jsonfile.readFile(myBD, (erro, arquivo) =>{
        if(erro){
            console.log(erro)
        } 
        else{
            console.log("Leitura efetuada com sucesso")
            arquivo.forEach( m => m.id = nanoid())
            jsonfile.writeFile(myBD, arquivo, erro => {
                if(erro) console.log(erro)
                else{
                    console.log("Geração de ids feita com sucesso")
                }
            })
        }
    })
}

generate_id('arq.json')