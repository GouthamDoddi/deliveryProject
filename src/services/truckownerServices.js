const pool = require('../config/db');

async function checkTruckowner (mobileNumber) {
    const query = {
        name: 'Check truckowner exists',
        text: 'SELECT * FROM truckowner WHERE mobile_num = $1',
        value: mobileNumber,
    };

    try {
        const result = await pool.query(query);

        console.log(result);
    } catch (error) {
        console.log(error);
    }

    return customer.rows.length;
}

const insertTruckowner = async truckownerDetails => {
    try {
        const query = {
            name: 'insert user in db',
            text: `INSERT INTO truckowner (truckowner_name, last_name, mobile_num, password, email,
                is_kyc_enabled, aadhar_no, pan_no, addressline1, addressline2, city, state) 
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
            values: [ truckownerDetails.first_name,
                truckownerDetails.last_name,
                truckownerDetails.month_num,
                truckownerDetails.encryptedPassword,
                truckownerDetails.email,
                truckownerDetails.is_kyc_enabled,
                truckownerDetails.aadhar_no,
                truckownerDetails.pan_no,
                truckownerDetails.addressline1,
                truckownerDetails.addressline2,
                truckownerDetails.city,
                truckownerDetails.state ],
        };

        const result = await pool.query(query);

        console.log(result);
    } catch (error) {
        console.log(error);
    }
};

module.exports = checkTruckowner;
module.exports = insertTruckowner;
