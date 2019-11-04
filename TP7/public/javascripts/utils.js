function apagaItem(ident){
    console.log('Vou tentar apagar o ' + ident + ' ...')
    axios.delete('/filmes/' + ident)
        .then(responseDEL => {
            window.location.assign('/filmes')
        })
        .catch(error => console.log(error))
}

function editaItem(ident){
    var filme  = {};
    filme.title = document.getElementById('titulo').value;
    filme.year = document.getElementById('ano').value;
    filme.cast = new Array
    filme.genres = new Array
    var genres = document.getElementsByClassName('generos')
    var actors = document.getElementsByClassName('atores')
    for(genre of genres)
        filme.genres.push(genre.value)
    for(actor of actors)
        filme.cast.push(actor.value)
    axios.put('/filmes/' + ident, filme)
        .then(responseUP =>  {
            window.location.assign('/filmes/' + ident)
        })
        .catch(error => console.log(error))
}

function addPlusIcon(toAppendId, classToAdd, name){
    console.log("A tentar adicionar um novo " + name)
    var input = document.createElement("INPUT")
    input.classList.add("w3-input")
    input.classList.add("w3-border")
    input.classList.add("w3-light-grey")
    input.classList.add("w3-threequarter")
    input.classList.add(classToAdd)
    input.type = "type='text'"
    input.name = name
    input.value = ''
    input.required = true
    var div = document.createElement("DIV")
    div.classList.add("w3-container")
    var addButton = document.createElement("SPAN")
    var icon = document.createElement("I")
    icon.classList.add("fa")
    icon.classList.add("fa-minus-square")
    icon.classList.add("w3-rest")
    icon.onclick= function(){
        removeGrandParentElement(icon)
    }
    div.append(input)
    div.append(addButton)
    addButton.append(icon)
    document.getElementById(toAppendId).append(div)
}

function addGenre(){
    addPlusIcon('generos-container', 'generos', 'genres')
}

function addActor(){
    addPlusIcon('atores-container', 'atores', 'cast')
}

function removeGrandParentElement(element){
    console.log(element)
    var spanParent = element.parentElement;
    var divGrand = spanParent.parentElement;
    var container = divGrand.parentElement;
    container.removeChild(divGrand)
}