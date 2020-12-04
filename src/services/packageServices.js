const pool = require('../config/db');

async function getPackage (mobileNumber) {
    const query = {
        name: 'Check package exists',
        text: 'SELECT * FROM "SUT".package_details WHERE mobile_num = $1',
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

async function insertPackage (packageDetails) {
    const query = {
        name: 'insert user in db',
        text: `INSERT INTO "SUT".package_details (package_name, customer_mobile_num, package_type,
            package_weight, package_space, package_value) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
        values: [
            packageDetails.packageName,
            packageDetails.mobileNum,
            packageDetails.packageType,
            packageDetails.packageWeight,
            packageDetails.packageSpace,
            packageDetails.packageValue,
        ],
    };

    console.log(packageDetails.mobileNum);

    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return false;
    }
}

module.exports = { getPackage, insertPackage };
