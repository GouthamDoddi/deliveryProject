const pool = require('../config/db');
const { getPackage } = require('./packageServices');


async function insertMapping (mappingDetails) {
    const query = {
        name: 'mapping trucck and package',
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

const getPackageByTruck = async truckNo => {
    const query = {
        name: 'Update package mapping',
        text: 'SELECT * FROM "SUT".truck_package_mapping WHERE truck_no=$1',
        values: [ truckNo ],
    };


    try {
        // console.log(result.rows);
        const result = await pool.query(query);


        const result2 = result.rows
            ? await Promise.all(result.rows.map(async data => {
                const resultData = await getPackage(data.package_id);

                return [ resultData.rows[0], data ];
            }))
            : 0;

        return result2;
    } catch (error) {
        console.log(error);

        return error;
    }
};

const getPackageMappingWithPagageId = async pacakageId => {
    const query = {
        name: 'Update package mapping',
        text: 'SELECT * FROM "SUT".truck_package_mapping WHERE package_id=$1',
        values: [ pacakageId ],
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
    updatePackageDeliveryStatus,
    getPackageByTruck,
    getPackageMappingWithPagageId };
