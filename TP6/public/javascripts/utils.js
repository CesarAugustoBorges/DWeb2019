function apagaItem(ident){
    console.log('Vou tentar apagar o ' + ident + ' ...')
    axios.delete('/removerMusica/' + ident)
        .then(responseDEL => {
            window.location.assign('/')
            console.log(window.location.search)
            var message = document.getElementById('message')
            if(responseDEL.data == '0') {
                message.innerHTML = "Música eleminada com sucesso"
                message.classList.add("w3-text-green")
            } else {
                message.innerHTML = "Erro ao eleminara música"
                message.classList.add("w3-text-red")
            }
            
        })
        .catch(error => console.log(error))
}

function editaItem(ident){
    var musica  = {};
    musica.tit = document.getElementById('tit').value;
    musica.local = document.getElementById('local').value;
    musica.musico = document.getElementById('musico').value;
    musica.prov = document.getElementById('prov').value;
    musica.obs = document.getElementById('observacao').value
    musica.inst = document.getElementById('instrumentos').value
    musica.file = document.getElementById('ficheiros').value
    //console.log(musica);
    console.log('Vou tentar editar o ' + ident + ' ...')
    axios.put('/editarMusica/' + ident, musica)
        .then(responseUP =>  {
            window.location.assign('/')
            var message = document.getElementById('message')
            if(responseUP.data == '0') {
                message.innerHTML = "Música editada com sucesso"
                message.classList.add("w3-text-green")
            } else {
                message.innerHTML = "Erro ao editar a música"
                message.classList.add("w3-text-red")
            }
            
        })
        .catch(error => console.log(error))
}