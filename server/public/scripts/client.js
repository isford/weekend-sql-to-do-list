console.log ('JS Loaded');
$(document).ready(handleReady)

function handleReady(){
    console.log('JQ Loaded');
    setUpClickListeners();
    getTasks();
}

//Click Listeners
function setUpClickListeners(){
    $('#submit').on('click', function (){
        console.log('in submitButton on click');
        let taskToSend = {
            taskName: $('#taskName').val(),
            taskPriority: $('#taskPriority').val(),
        };

        saveTask(taskToSend);
    });
}

//Client Side GET
function getTasks(){
    console.log('In getTasks');

    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function (response) {
        console.log(response);
        renderTasks(response);
    }).catch(function(error) {
        console.log('Error in GET on client.js', error)
    })
}//end GET

//Render/APPEND tasks to DOM
function renderTasks(tasks){
    $('#viewTasks').empty();

    for (let i = 0; i < tasks.length; i++){
        let task = tasks[i];
        console.log('in renderTasks', task);

        $('#viewTasks').append(`
        <tr>
            <td>${task.task_name}</td>
            <td>${task.task_priority}</td>
            <td><button class="deleteButton btn btn-danger" data-id="${task.id}">Delete</button></td>
            <td><button class="complete btn btn-info" data-id="${task.id}"">Task Complete!</button></td>
        </tr>
        `);
    };
}//end RENDER

//Client Side POST
function saveTask(newTask){
    console.log('In client newTask', newTask);

    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: newTask,
    }).then( function (response) {
        $('#taskName').val('');
        getTasks();
    });
}//END POST