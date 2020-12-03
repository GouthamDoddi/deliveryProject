const pool = require('../config/db');

async function getCustomer (mobileNumber) {
    const query = {
        name: 'Check customer exists',
        text: 'SELECT * FROM "SUT".customer WHERE mobile_num = $1',
        value: mobileNumber,
    };

    try {
        const result = await pool.query(query);

        console.log(`query result is ${result}`);

        return result.rows.length;
    } catch (error) {
        console.log(error);

        return error;
    }
}

async function insertCustomer (customerDetails) {
    const query = {
        name: 'insert user in db',
        text: `INSERT INTO "SUT".customer (first_name, last_name, mobile_num, password, email,
                is_kyc_enabled, aadhar_no, pan_no, addressline1, addressline2, city, state) 
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
        values: [
            customerDetails.firstName,
            customerDetails.lastName,
            customerDetails.mobileNum,
            customerDetails.encryptedPassword,
            customerDetails.email,
            customerDetails.isKycEnabled,
            customerDetails.aadharNo,
            customerDetails.panNo,
            customerDetails.addressline1,
            customerDetails.addressline2,
            customerDetails.city,
            customerDetails.state,
        ],
    };

    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return false;
    }
}

module.exports = getCustomer;
module.exports = insertCustomer;
