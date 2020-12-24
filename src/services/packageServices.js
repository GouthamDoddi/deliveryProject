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
            package_weight, package_space, package_value, pickup_point, 
            drop_point, pickup_date, booked_entire_truck, package_receiving_person,
             receiving_person_mobile_no) VALUES($1, $2, $3, $4, $5, $6, $7, $8,
             $9, $10, $11, $12) RETURNING *`,
        values: [
            packageDetails.packageName,
            packageDetails.mobileNum,
            packageDetails.packageType,
            packageDetails.packageWeight,
            packageDetails.packageSpace,
            packageDetails.packageValue,
            packageDetails.pickUpPoint,
            packageDetails.dropPoint,
            packageDetails.date,
            packageDetails.entireTruck,
            packageDetails.receivingPersonName,
            packageDetails.receivingPersonNo,
        ],
    };

    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return error;
    }
}

module.exports = { getPackage, insertPackage };
