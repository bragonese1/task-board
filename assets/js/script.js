// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Function to get task from the local storage and return an array of tasks
function readTaskFromLocalStorage(){
    const tasks = JSON.parse(localStorage.getItem("tasks"));
// If there are no tasks in the local storage, create an empty array
    if(!tasks){
        tasks=[]
    }
// Return the array of tasks
    return tasks;

}

// Todo: create a function to generate a unique task id
// This function will be used to create a unique id for each task
function generateTaskId() {
    return 'task ' + (nextId++);
}

// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});