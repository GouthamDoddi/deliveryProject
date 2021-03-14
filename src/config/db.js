const { Pool } = require('pg');

const pool = new Pool({
    user: 'eyutqxfmgrdeqr',
    password: 'c7fd7baea32d716e9bd61369155d3df057dd9acd4ea342b82b8310ee4130386e',
    host: '54.234.205.135',
    port: 5432,
    database: 'd1qoulkt024fo0',
    // ssl: true,
});

// const pool = new Pool({
//     user: 'postgres',
//     password: '121212',
//     host: 'localhost',
//     port: 5432,
//     database: 'postgres',
// });

module.exports = pool;
