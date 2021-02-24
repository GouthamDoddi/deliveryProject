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

const getPackageWithDetails = async details => {
    const query = {
        name: 'get list of packeages for route',
        text: `SELECT * FROM "SUT".package_details WHERE
    (pickup_point = $1 AND drop_point = $2 AND pickup_date::date = $3)`,
        values: [ details.pickUpPoint,
            details.dropPoint,
            details.date ],
    };

    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return error;
    }
};

async function getPackageReceivingDetails (mobileNum) {
    const query = {
        name: 'get receiving packages for customer',
        text: 'SELECT * FROM "SUT".package_details WHERE receiving_person_mobile_no = $1',
        values: [ mobileNum ],
    };

    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return error;
    }
}

async function getAllCustomerPackages (mobileNum) {
    const query = {
        name: 'get customer packages',
        text: 'SELECT * FROM "SUT".package_details WHERE customer_mobile_num = $1',
        values: [ mobileNum ],
    };

    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return error;
    }
}

async function insertPackage (packageDetails) {
    const query = {
        name: 'insert package in db',
        text: `INSERT INTO "SUT".package_details (package_name, customer_mobile_num, package_type,
            package_weight, package_space, package_value, pickup_point, 
            drop_point, pickup_date, booked_entire_truck, package_receiving_person,
             receiving_person_mobile_no, status, customer_name) VALUES($1, $2, $3, $4, $5, $6, $7, $8,
             $9, $10, $11, $12, $13, $14) RETURNING *`,
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
            packageDetails.status,
            packageDetails.customerName,
        ],
    };

    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return error;
    }
}

const updatePackageReachDate = updatedValues => {
    const query = {
        name: 'Update package reach date',
        text: `UPDATE "SUT".package_details
              SET  react_date = $1
              WHERE package_id = $2`,
        values: [ updatedValues.reachDate,
            updatedValues.packageId ],
    };

    try {
        return pool.query(query);
    } catch (error) {
        console.error(error);

        return error.detail;
    }
};

const getAllTripPackages = tripId => {
    const query = {
        name: 'get trip packages with tripId',
        text: 'SELECT package_id FROM "SUT".truck_package_mapping WHERE trip_id = $1',
        values: [ tripId ],
    };

    try {
        return pool.query(query);
    } catch (error) {
        console.log(error);

        return error;
    }
};

module.exports = { getPackage,
    insertPackage,
    updatePackageReachDate,
    getPackageReceivingDetails,
    getAllCustomerPackages,
    getAllTripPackages,
    getPackageWithDetails };
