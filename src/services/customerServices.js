const pool = require('../config/db');

async function checkCustomer (mobileNumber) {
    const query = {
        name: 'Check customer exists',
        text: 'SELECT * FROM customer WHERE mobile_num = $1',
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

const insertCustomer = async customerDetails => {
    try {
        const query = {
            name: 'insert user in db',
            text: `INSERT INTO customer (first_name, last_name, mobile_num, password, email,
                is_kyc_enabled, aadhar_no, pan_no, addressline1, addressline2, city, state) 
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
            values: [ customerDetails.first_name,
                customerDetails.last_name,
                customerDetails.month_num,
                customerDetails.encryptedPassword,
                customerDetails.email,
                customerDetails.is_kyc_enabled,
                customerDetails.aadhar_no,
                customerDetails.pan_no,
                customerDetails.addressline1,
                customerDetails.addressline2,
                customerDetails.city,
                customerDetails.state ],
        };

        const result = await pool.query(query);

        console.log(result);
    } catch (error) {
        console.log(error);
    }
};

module.exports = checkCustomer;
module.exports = insertCustomer;
