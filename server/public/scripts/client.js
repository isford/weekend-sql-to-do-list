console.log ('JS Loaded');
$(document).ready(handleReady)

function handleReady(){
    console.log('JQ Loaded')
    getTasks();
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
}

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
}