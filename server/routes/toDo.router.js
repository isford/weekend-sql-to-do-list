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
    let queryText = 'SELECT * FROM "tasks";';
    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log('Error getting tasks in toDoRouter.get', error)
    });
});// end toDoRouter.get

//POST

//PUT


//DELETE

module.exports = toDoRouter;