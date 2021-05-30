//const { Router } = require('express');
const { Router } = require('express');
const express = require('express');
const toDoRouter = express.Router();
const pg = require('pg');
const Pool = pg.Pool;


const pool = new Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
})
pool.on('connect', () => {
    console.log('CONNECTED TO POSTGRES');
});
pool.on('error', (error) => {
    console.log(error);
});

//GET
toDoRouter.get('/', (req, res) => {
    let queryText = `SELECT * FROM "tasks";`;
    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log('Error getting tasks in toDoRouter.get', error)
    });
});// end toDoRouter.get

//POST
toDoRouter.post('/', (req, res) => {
    console.log('In toDoRouter.post', req.body);

    let queryText = `INSERT INTO "tasks" ("task_name", "task_priority")
        VALUES ($1, $2)`

    pool.query(queryText, [req.body.taskName, req.body.taskPriority])
    .then ((result) => {
        res.sendStatus(201);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
});


//PUT
toDoRouter.put('/:id', (req, res) => {
    let taskId = req.params.id;//setting task id dynamically
    console.log('taskId in taskRouter', taskId);
    
    let taskComplete = req.body.task_complete//sets variable to transferability of koala
    console.log(req.body);
    console.log(taskComplete);
    let queryString = `UPDATE "tasks" SET "task_complete"='true' WHERE "tasks".id=$1;`;
  
    pool.query(queryString, [taskId])
        .then(response => {
            console.log(response.rowCount);
            res.sendStatus(202);//sends info to SQL DB for update and sends back 202
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);//if it doesn't work get 500
        });
});

//DELETE
toDoRouter.delete('/:id', (req, res) => {
    const taskToDelete = req.params.id;
    const queryText = `DELETE FROM "tasks" WHERE "tasks".id = $1`;
    pool.query(queryText, [taskToDelete])
    .then((response) => {
        console.log(`We deleted the task with id ${taskToDelete}`);
        res.sendStatus(200);
    }).catch((err) => {
        console.log('Something went wrong in the toDoRouter.delete', err);
        res.sendStatus(500)
    });
});//END DELETE

module.exports = toDoRouter;