// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));

// unique task id
    function generateTaskId() {
    return 'taskId-' + (nextId++);
    }

// Function for the task card
function createTaskCard(task) {
    const taskCard = $('<div>').addClass('card task-card draggable m-2')
        .attr('data-task-id', task.id);
    const cardHeader = $('<div>').addClass('card-header h4')
        .text(task.title);
    const cardBody = $('<div>').addClass('card-body');
    const cardDescription = $('<div>').addClass('card-text')
        .text(task.description);
    const cardDueDate = $('<div>').addClass('card-text')
        .text(task.dueDate);
    
    //delete button
    const cardDeleteButton = $('<button>')
        .addClass('btn btn-danger delete')
        .text('Delete')
        .attr('data-task-id', task.id);
    
    cardDeleteButton.on('click', handleDeleteTask);
   
    //Creating background color based on due date for the task
    if (task.dueDate && task.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, "DD/MM/YYYY");
    if (now.isBefore(taskDueDate)) {
            taskCard.addClass('bg-success text-white');
        } else if(now.isSame(taskDueDate, 'day')) {
            taskCard.addClass('bg-warning text-white');
        } else if (now.isAfter(taskDueDate)) {
            taskCard.addClass('bg-danger text-white');
            cardDeleteButton.addClass('border-light');
        } 
    }

    //Append elements
    cardBody.append(cardDueDate, cardDescription, cardDeleteButton);
    taskCard.append(cardHeader, cardBody);

    return taskCard; 
}

// function to render the task list and for draggable feature
function renderTaskList() {

    const toDoList = $('#todo-cards');
    toDoList.empty();

    const inProgressList = $('#in-progress-cards')
    inProgressList.empty();

    const doneList = $('#done-cards');
    doneList.empty();

// Loop through tasks and create task cards for each status
    for (let task of taskList) {
        if (task.status === 'to-do') {
            toDoList.append(createTaskCard(task));
        } else if (task.status === 'in-progress') {
            inProgressList.append(createTaskCard(task));
        } else if (task.status === 'done') {
            doneList.append(createTaskCard(task))
        }
    }
    
    //Jquery UI to make cards Draggable 
    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
        helper: function (e) {
            const original = $(e.target).hasClass('ui-draggable')
                ? $(e.target)
                : $(e.target).closest('.ui-draggable')
            return original.clone().css({
                width: original.outerWidth(),
            })   
        },
    });
}

// function to handle a new task
function handleAddTask(event){
    event.preventDefault();

    // Getting the task data
    const taskTitle = $('#task-title').val().trim();
    const taskDescription = $('#task-description').val();
    const taskDate = $('#task-due-date').val();
    
    // Create a new task object
    const newTask = {
        id: generateTaskId(),
        title: taskTitle,
        description: taskDescription,
        dueDate: taskDate,
        status: 'to-do',
    };

    // Add the new task to the task list
    console.log(newTask);
    taskList.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(taskList));

    //Clear the form inputs
    $('#task-title').val('');
    $('#task-description').val('');
    $('#task-due-date').val('');
    

    renderTaskList();
}

//function to handle deleting a task
function handleDeleteTask(event) {
    
    
    const taskId = $(this).attr('data-task-id');
    taskList = taskList.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(taskList));

    renderTaskList();
}

//function to handle drop from each task lane
function handleDrop(event, ui) {

    // Get the task ID and new status from the event and the task that was dropped
    const taskId = ui.draggable[0].dataset.taskId;
    const newStatus = event.target.id;
    // Find the task in the task list and update its status
    for (let task of taskList) {
        if (task.id === taskId) {
            task.status = newStatus;
        }
    }
    // Save the updated task list to local storage
    localStorage.setItem('tasks', JSON.stringify(taskList));

    renderTaskList();
}

// When the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    //render the task list
    renderTaskList();

    // event listeners for adding task and deleting task
    $('#task-form').on('submit', handleAddTask);
    $('.modal-footer').on('click', '.btn-danger', handleDeleteTask);

    //make lanes droppable 
    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop
    });

    //due date
    $('#task-due-date').datepicker({
        changeMonth: true,
        changeYear: true,
      });
});