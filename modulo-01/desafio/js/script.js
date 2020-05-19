window.addEventListener('load', start);

var globalNames = ['Um', 'Dois', 'Tres'];
var inputName = null;
var currentIndex = null;
var isEditing = false;

function start() {
    preventFormSubmit();
    inputName = document.querySelector('#inputName');
    activateInput();
    render();
}

function preventFormSubmit() {
    function handleFormSubmit(event) {
        event.preventDefault();
    }
    var form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
    function insertName(newName) {
        globalNames.push(newName);
    }

    function updateName(newName) {
        globalNames[currentIndex] = newName;
    }

    function handleTyping(event) {
        if (event.key === 'Enter' && event.target.value.trim() !== '') {
            if (!isEditing) {
                insertName(event.target.value);
            } else {
                updateName(event.target.value);
            }
            render();
            isEditing = false;
        }
    }

    inputName.addEventListener('keyup', handleTyping);
    inputName.focus();
}

function render() {
    function createDeleteButton(index) {
        function deleteName(){
            globalNames.splice(index, 1);
            render();
        }
        var button = document.createElement('button');
        button.classList.add('deleteButton');
        button.textContent = 'x';
        button.addEventListener('click', deleteName);
        return button;
    }

    function createSpan(name, index) {
        function editItem(){
            inputName.value = name;
            inputName.focus();
            currentIndex = index;
            isEditing = true;
        }

        var span = document.createElement('span');
        span.classList.add('clickable');
        span.textContent = name;
        span.addEventListener('click', editItem);

        return span;
    }

    divNames = document.querySelector("#names");
    divNames.innerHTML= '';
    var ul = document.createElement('ul');

    for(i=0; i < globalNames.length; i++) {
        var currentName = globalNames[i];
        var li = document.createElement('li');
        var span = createSpan(currentName, i);
        var button = createDeleteButton(i);

        li.appendChild(button);
        li.appendChild(span);
        ul.appendChild(li)
    }
    divNames.appendChild(ul);
    clearInput();
}

function clearInput() {
    inputName.value='';
    inputName.focus();
}