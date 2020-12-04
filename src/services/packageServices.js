const pool = require('../config/db');

function getPackage (packageId) {
    const query = {
        name: 'Check package exists',
        text: 'SELECT * FROM "SUT".package_details WHERE package_id = $1',
        values: [ packageId ],
    };

    try {
        return pool.query(query);
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
