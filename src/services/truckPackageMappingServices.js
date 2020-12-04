const pool = require('../config/db');


async function insertMapping (mappingDetails) {
    const query = {
        name: 'insert user in db',
        text: `INSERT INTO "SUT".truck_package_maping (truck_no, package_id, date) 
                VALUES($1, $2, $3) RETURNING *`,
        values: [
            mappingDetails.truckNo,
            mappingDetails.packageId,
            mappingDetails.date,
        ],
    };

    console.log('insert querry called');

    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return false;
    }
}

module.exports = { insertMapping };
