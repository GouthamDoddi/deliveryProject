const pool = require('../config/db');


async function insertMapping (mappingDetails) {
    const query = {
        name: 'insert user in db',
        text: `INSERT INTO "SUT".truck_package_mapping (truck_no, package_id, date, trip_id) 
                VALUES($1, $2, $3, $4) RETURNING *`,
        values: [
            mappingDetails.truckNo,
            mappingDetails.packageId,
            mappingDetails.date,
            mappingDetails.tripId,
        ],
    };

    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return error;
    }
}

const updatePackageTruck = async details => {
    const query = {
        name: 'Update package mapping',
        text: `UPDATE "SUT".truck_package_mapping SET truck_no=$1 
        WHERE package_id=$2`,
        values: [ details.truckNo,
            details.packageId ],
    };

    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return error;
    }
};

const updatePackageDeliveryStatus = async details => {
    const query = {
        name: 'Update package mapping',
        text: `UPDATE "SUT".truck_package_mapping SET delivered=$1, status=$3
        WHERE mapping_id=$2`,
        values: [ details.delivered,
            details.mappingId,
            details.status ],
    };

    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return error;
    }
};

module.exports = { insertMapping,
    updatePackageTruck,
    updatePackageDeliveryStatus };
