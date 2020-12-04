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

module.exports = { insertTruck };
