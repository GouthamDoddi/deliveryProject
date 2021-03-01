const { Pool } = require('pg');

const pool = new Pool({
    user: 'eyutqxfmgrdeqr',
    password: 'c7fd7baea32d716e9bd61369155d3df057dd9acd4ea342b82b8310ee4130386e',
    host: 'd1qoulkt024fo0',
    port: 5432,
    database: 'd1qoulkt024fo0',
});

module.exports = pool;
