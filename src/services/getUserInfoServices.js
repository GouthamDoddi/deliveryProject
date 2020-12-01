const pool = require('../config/pool');

// here we define all the function that re related
// to geting user details form postgres

async function getUserDetails (userMobileNo, destination, date) {
    // lets take the user phoneNo and get all
    // his credentials from the the db

    const query = {
        name: 'fetch user details',
        text: `SELECT * FROM "SUT".customer WHERE 
        mobile_num = 1$`,
        values: [ userMobileNo ],
    };

    try {
        const result = await pool.query(query);
    } catch (error) {
        console.log(error);

        return false;
    }
}
