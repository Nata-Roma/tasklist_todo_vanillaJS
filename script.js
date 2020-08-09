// const form = document.querySelector('.task-form');
const task = document.querySelector('#task'); 
const taskList = document.querySelector('.collection'); 

const btnSubmit = document.querySelector('[type="submit"]'); 
const btnClear = document.querySelector('.clear-tasks'); 

const filter = document.querySelector('#filter'); 

loadEvent();

function loadEvent() {

    document.addEventListener('DOMContentLoaded', loadFromLocalStorage);

    btnSubmit.addEventListener('click', addTask);

    taskList.addEventListener('click', removeTask);

    btnClear.addEventListener('click', removeAll);

    filter.addEventListener('keyup', filterTasks);
}

function addTask(e) {
    e.preventDefault();

    if(task.value === '') {
        alert('Add a task');
    } else {

    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task.value));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);
    taskList.appendChild(li);
    saveInLocalStorage(task.value);
    task.value = '';
    
    }
}

function saveInLocalStorage(task) {

    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // localStorage.clear();
}

function loadFromLocalStorage() {

    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
    
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
    
        li.appendChild(link);
        taskList.appendChild(li);
        task.value = '';
    })
}

function removeTask(e) {
    let item = e.target.parentElement;

    if(confirm("Are you sure?")){
        if(item.classList.contains('delete-item')) {
            taskList.removeChild(item.parentElement);
        }
    }
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks.forEach(function(task, index) {
        if(item.parentElement.textContent === task) {
            tasks.splice(index, 1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function removeAll() {

    if(confirm("Are you sure?")){
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
}

    localStorage.clear();
}

function filterTasks() {
    let task = document.querySelectorAll('.collection-item')
    let text = filter.value.toLowerCase();

    task.forEach(function(elem) {
        let content = elem.firstChild.textContent.toLowerCase(); 
        if (content.indexOf(text) !== -1) {
            elem.style.display = 'block';
        } else {
            elem.style.display = 'none';
        }
    })
    
}