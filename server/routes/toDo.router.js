//const { Router } = require('express');
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


//POST

//PUT


//DELETE

module.exports = toDoRouter;