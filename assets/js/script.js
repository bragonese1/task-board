// Retrieve tasks and nextId from localStorage
import { task } from 'ember-concurrency';
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
const taskCard = $('<div>').addClass('card task-card draggable my-3')
.attr('data-task-id', task.id);
const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
const cardBody = $('<div>').addClass('card-body');
const cardDescription = $('<div>').addClass('card-text').text(task.description);
const cardDueDate = $('<div>').addClass('card-text').text(task.dueDate);

cardBody.append(cardDescription, cardDueDate);
taskCard.append(cardHeader, cardBody);

return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const todo = $(".todo-list");
    const inProgress = $(".in-progress-list");
    const done = $(".done-list");
    
for(let task of taskList){
    if(task.status == 'to-do'){
        todo.append(createTaskCard(task));
    }else if(task.status == 'in-progress'){
        inProgress.append(createTaskCard(task));
    }else if(task.status == 'done'){
        done.append(createTaskCard(task));
    }
}

//draggable using jquery

$('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    // This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
    helper: function (e) {
      // Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      // Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });
}


// Todo: create a function to handle adding a new task
function handleAddTask(event){
    // Prevent the default form submission behavior
    event.preventdefualt();
   

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