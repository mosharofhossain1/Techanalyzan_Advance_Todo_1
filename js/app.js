// Step -1 : selecting elements
const inputField = document.getElementById('inputField');
const addBtn = document.getElementById('addBtn');
const listContainer = document.getElementById('listContainer');

// get input field value function set
function getUserInput() {
    const inputValue = inputField.value;
    inputField.value = '';
    return inputValue;
}
// keyboard enter event
function handleEnterEvent(e) {
    if (e.key === "Enter") {
        inputValue = getUserInput();
        if(!inputValue) return;
        displayinputValue(inputValue);
    }

}

// click event hadler
function handleClickEvent() {
    const inputValue = getUserInput();
    if(!inputValue) return;
    displayinputValue(inputValue);
}

// display input value show
function displayinputValue(inputValue) {
    const li = document.createElement('li');
    li.innerHTML = `
                <span id="inputvalue">${inputValue}</span>
                <span id="action">
                    <button id="edit"><i style='font-size:20px'; class="fa-solid fa-pen-to-square"></i></button>
                    <button id="delete"><i  style='font-size:20px' class="fa-solid fa-delete-left"></i></button>
                </span>
    `;
    li.classList.add('listStyle');
    listContainer.appendChild(li)
}
// hadle events 

inputField.addEventListener('keyup', handleEnterEvent);
addBtn.addEventListener('click', handleClickEvent);
