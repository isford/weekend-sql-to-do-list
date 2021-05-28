const { Router } = require('express');
const express = require('express');
const toDoRouter = express.Router();
// DB CONNECTION
const pg = require('pg');
//pg configuration
const Pool = pg.Pool;

//const pool = require('../modules/pool')


const pool = new Pool({
    database: 'weekend-to-do-app', // THIS CHANGES BY PROJECT
    host: 'localhost',
    port: 5432,
})
pool.on('connect', () => {
    console.log('CONNECTED TO POSTGRES');
});
pool.on('error', (error) => {
    console.log(error);
});