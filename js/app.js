// Step -1 : selecting elements
const inputField = document.getElementById('inputField');
const addBtn = document.getElementById('addBtn');
const listContainer = document.getElementById('listContainer');

// get input from user 
function getUserInput() {
    const taskName = inputField.value;
    inputField.value = '';
    return taskName;
}
// handle add task 
function handleAddTask(){
    const taskName = getUserInput();
        if(!taskName) return;
        displayinputValue(taskName);
        addTasktoLocalStorage(taskName)
}
// enter keyup event handler 
function handleEnterEvent(e){
    if(e.key === "Enter"){
        handleAddTask()
    }
}

// click event hadler
    // function clickEventHandler(){
    //     const taskName = getUserInput();
    //     if(!taskName) return;
    //     displayinputValue(taskName);
    //     addTasksTolocalStorage(taskName)
    // }


// display input value show
function displayinputValue(taskName) {
    const li = document.createElement('li');
    li.innerHTML = `
                <span id="inputvalue">${taskName}</span>
                <span style='display:flex;justify-content:space-around' id="action">
                    <button id="edit"><i style='font-size:20px'; class="fa-solid fa-pen-to-square"></i></button>
                    <button id="delete"><i  style='font-size:20px' class="fa-solid fa-delete-left"></i></button>
                </span>
    `;
    li.classList.add('listStyle');
    listContainer.appendChild(li)
}
// Step- 2: add task to localStorage

// add tasks to localstorage
function addTasksTolocalStorage(task){
    localStorage.setItem("task", JSON.stringify(task))
}
// add task to localstorage
function addTasktoLocalStorage(taskName){
    const task = getTaskFromLocalStorage();
    task.push(taskName);
    addTasksTolocalStorage(task)
}

// get all task from localstorage
function getTaskFromLocalStorage(){
    let task = [];
    const rowTask = localStorage.getItem('task');
    if(rowTask){
        task = JSON.parse(rowTask);
    }
    return task;
}

// display all task to UI when page loading
function loadAndDisplayUiTask(){
    const task = getTaskFromLocalStorage();
    task.forEach(taskName =>  displayinputValue(taskName)
    );
}

loadAndDisplayUiTask()
// hadle events 
inputField.addEventListener('keyup', handleEnterEvent);
addBtn.addEventListener('click', handleAddTask);


