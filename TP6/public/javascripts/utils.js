function apagaItem(ident){
    console.log('Vou tentar apagar o ' + ident + ' ...')
    axios.delete('/removerMusica/' + ident)
        .then(response => { window.document.documentElement.innerHTML = response.data})//axios.get('/').then(() => {window.location.assign('/'); console.log(response)}))//window.location.assign('/'))
        .catch(error => console.log(error))
}

function editaItem(ident){
    var musica  = {};
    musica.tit = document.getElementById('tit').value;
    musica.local = document.getElementById('local').value;
    musica.musico = document.getElementById('musico').value;
    musica.prov = document.getElementById('prov').value;
    console.log(musica);
    console.log('Vou tentar editar o ' + ident + ' ...')
    axios.put('/editarMusica/' + ident, musica)
        .then(response => axios.get('/').then(window.location.assign('/')))
        .catch(error => console.log(error))
}