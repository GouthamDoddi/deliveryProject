// const { Pool } = require('pg');

// const pool = new Pool({
//     host: process.env,
//     port: 54321,
//     database: process.env,
//     user: process.env,
//     password: process.env,
// });

// module.exports = pool;

const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "1817",
    host: "localhost",
    port: 5432,
    database: "sutbackend"
});

module.exports = pool;