console.log ('JS Loaded');
$(document).ready(handleReady)

function handleReady(){
    console.log('JQ Loaded');
    setUpClickListeners();
    getTasks();

    $('#viewTasks').on('click', '.completeButton', handleCompleteClick)
}

//Click Listeners
function setUpClickListeners(){
    //Add Task
    $('#submit').on('click', function (){
        console.log('in submitButton on click');
        let taskToSend = {
            taskName: $('#taskName').val(),
            taskPriority: $('#taskPriority').val(),
        };
        swal("Great!", "You added a new task!", "success");
        saveTask(taskToSend);
    });

    //Delete Task
    $('#viewTasks').on('click', '.deleteButton', deleteTaskHandler)
    //UPDATE/COMPLETE/PUT Task

}

//Client Side GET
function getTasks(){
    //console.log('In getTasks');

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
        <tr class = "changeMe${task.id}">
            <td scope="row" >${task.task_name}</td>
            <td>${task.task_priority}</td>
            <td><button class="deleteButton btn btn-danger" data-id="${task.id}">Delete</button></td>
            <td><button class="completeButton btn btn-info" data-id="${task.id}" data-task_complete="${task.task_complete}">Task Complete!</button></td>
        </tr>
        `);
       if(task.task_complete == true) {
            $(`.changeMe${task.id}`).addClass("turnGreen")}
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

//Delete Handler
function deleteTaskHandler(){

swal({
  title: "Are you sure?",
  text: "Once deleted, you will not be able to recover this task again!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    swal("Your task is gone forever!...Hope you know what you are doing...", {
      icon: "success",
    });
    deleteTask($(this).data("id"));
  } else {
    swal("Your task is safe to complete later!");
  }
});

    // deleteTask($(this).data("id"))
}

//DELETE Task
function deleteTask(taskId){
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskId}`
    }).then(response => {
        console.log(`deleted Task with id of ${taskId}`);
        getTasks();
    }).catch(err => {
        alert('There was a problem deleting that task, try again', err);
    });
}

//handle Complete
function handleCompleteClick(){
    completeClick($(this).data("id"), "true");
    swal("Great!", "Another one bites the dust!!", "success");
}

//Complete Task PUT
function completeClick(taskId, taskComplete){
    console.log(`In completeClick ${taskComplete}`);
    $.ajax({
        method: "PUT",
        url: `/tasks/${taskId}`,
        data: {
            task_complete: true
        }
    }).then(response => {
        console.log('Task complete');
        getTasks();
    }).catch(err => {
        console.log(err);
    })
}