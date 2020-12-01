const { Pool } = require('pg');

const pool = new Pool({
    host: process.env,
    port: 54321,
    database: process.env,
    user: process.env,
    password: process.env,
});

module.exports = pool;
