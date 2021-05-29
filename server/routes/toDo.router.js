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