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
                <span id="taskName">${taskName}</span>
                   <button id='edit'>E</button>
                   <button id='delete'>X</button>
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

// delete task from localstorage
function deleteTaskFromLocalStorage(taskName){
    const task = getTaskFromLocalStorage();
    const taskAfterDeleting = task.filter(tasks => tasks !== taskName);
    addTasksTolocalStorage(taskAfterDeleting);
}
// delete handler 
function deleteHander(targetEl){
    const li = targetEl.parentElement;
    const taskName = li.querySelector('#taskName').textContent;
    li.remove();
    deleteTaskFromLocalStorage(taskName)
}

// update tasktoLocalStorage
function updateTaskLocalStorage(newTaskName,preVl){
    const task = getTaskFromLocalStorage();
    const taskAfterUpdating = task.map(taskName =>{
        if(taskName === preVl){
            return newTaskName;
        }
        else{
            return taskName;
        }
    });
    addTasksTolocalStorage(taskAfterUpdating);
}
// update Task 
function updateTask(input,preVl){
    const newTaskName = input.value;
    const li = input.parentElement;
    li.innerHTML = `
                <span id="taskName">${newTaskName}</span>
                <button id='edit'>E</button>
                <button id='delete'>X</button>

    `
    
    updateTaskLocalStorage(newTaskName,preVl)
}
// eventHandler 
function eventHandler(e,preVl){
    const input = e.target;
    if(e.key === 'Enter'){
        updateTask(input, preVl)
    }
}
function updateHandler(e,preVl){
    const input = e.target.previousElementSibling;
    updateTask(input,preVl)
}

// edit handler
function editHandler(targetEl){
    const li = targetEl.parentElement;
    const preVl = li.querySelector('#taskName').textContent;
    li.innerHTML = `
                <input onkeypress = 'eventHandler(event,"${preVl}")' value = '${preVl}'>
                <button onclick = 'updateHandler(event,"${preVl}")'> Update </button>

    `
    li.classList.add('inputStyle')
}
// action handler function 
function actionHandler(e){
    const targetEl = e.target;
     
    if(targetEl.id === 'delete'){
        deleteHander(targetEl)
    }
    else if(targetEl.id === 'edit'){
        editHandler(targetEl)
    }
}
// hadle events 
inputField.addEventListener('keyup', handleEnterEvent);
addBtn.addEventListener('click', handleAddTask);
listContainer.addEventListener('click', actionHandler);

