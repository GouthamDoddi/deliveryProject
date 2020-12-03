const pool = require('../config/pool');

// here we define all the function that re related
// to geting user details form postgres

async function getUserDetails (userMobileNo) {
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

        return result;
    } catch (error) {
        console.log(error);

        return false;
    }
}

module.exports = getUserDetails;
