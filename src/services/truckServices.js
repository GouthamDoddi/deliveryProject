const pool = require('../config/db');


const insertTruck = async truckDetails => {
    const query = {
        name: 'Add truck',
        text: `INSERT INTO "SUT".truckdetails (truck_name, truck_no,
         truck_model, chasis_no, capacity_inkgs, capacity_inspace,
          booked_weight, booked_space, truckowner_mobile_num)
           VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        values: [
            truckDetails.truckName,
            truckDetails.truckNo,
            truckDetails.truckModel,
            truckDetails.chasisNo,
            truckDetails.capacityInKgs,
            truckDetails.capacityInSpace,
            truckDetails.bookedWeight,
            truckDetails.bookedSpace,
            truckDetails.mobileNum,
        ],
    };

    try {
        return await pool.query(query);
    } catch (error) {
        console.error(error);

        return error;
    }
};

const getTruck = truckNo => {
    // use truckNo to get the total space

    const query = {
        name: 'Get truck details',
        text: 'SELECT * FROM "SUT".truckdetails WHERE truck_no = $1',
        values: [ truckNo ],
    };

    try {
        return pool.query(query);
    } catch (error) {
        console.error(error);

        return error;
    }
};


const updateTruckWeightandSpace = updatedValues => {
    const query = {
        name: 'Update weight and space',
        text: `UPDATE "SUT".truckdetails
                SET  booked_weight = $1,
                     booked_space = $2
                WHERE truck_no = $3`,
        values: [ updatedValues.updatedWeight,
            updatedValues.updatedSpace,
            updatedValues.truckNo ],
    };

    try {
        return pool.query(query);
    } catch (error) {
        console.error(error);

        return error;
    }
};

module.exports = { insertTruck, getTruck, updateTruckWeightandSpace };
