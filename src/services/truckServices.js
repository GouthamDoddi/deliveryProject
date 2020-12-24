const pool = require('../config/db');


const insertTruck = async truckDetails => {
    const query = {
        name: 'Add truck',
        text: `INSERT INTO "SUT".truckdetails (truck_name, truck_no,
         truck_model, chasis_no, capacity_inkgs, capacity_inspace,
          booked_weight, booked_space, truckowner_mobile_num, rc,
          license, transport_company_name, driver_name)
           VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
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
            truckDetails.rc,
            truckDetails.license,
            truckDetails.companyName,
            truckDetails.truckDriver,
        ],
    };

    try {
        return await pool.query(query);
    } catch (error) {
        console.error(`error at service ${error}`);

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

const getTrucksForOwner = async mobileNum => {
    // use truckNo to get the total space

    const query = {
        name: 'Get truck details',
        text: `SELECT * FROM "SUT".truckdetails WHERE truckowner_mobile_num = $1
             OR transport_company_mobile_num = $2`,
        values: [ mobileNum, mobileNum ],
    };

    try {
        return await pool.query(query);
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

        return error.detail;
    }
};

module.exports = { insertTruck,
    getTrucksForOwner,
    updateTruckWeightandSpace,
    getTruck };
