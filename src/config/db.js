const { Pool } = require('pg');

const pool = new Pool({
    user: 'eyutqxfmgrdeqr',
    password: 'c7fd7baea32d716e9bd61369155d3df057dd9acd4ea342b82b8310ee4130386e',
    database: 'd1qoulkt024fo0',
    port: 5432,
    host: 'ec2-18-215-99-63.compute-1.amazonaws.com',
    ssl: true,
});

// const pool = new Pool({
//     user: 'postgres',
//     password: '121212',
//     host: 'localhost',
//     port: 5432,
//     database: 'postgres',
// });

module.exports = pool;
