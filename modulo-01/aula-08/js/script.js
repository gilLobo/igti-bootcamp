window.addEventListener('load', start);

function start() {
    console.log('Aula - 8.2');
    var nameInput = document.querySelector('#nameInput');
    nameInput.addEventListener('keyup', countName);

    var form = document.querySelector('form');
    form.addEventListener('submit', preventSubmit);
}

function countName(event){
    var count = event.target.value;
    var span = document.querySelector('#nameLenght');
    span.textContent = count.length;
}

function preventSubmit(event) {
    event.preventDefault();
    console.log('chegoy')
}