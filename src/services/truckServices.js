const pool = require('../config/db');


const insertTruck = async truckDetails => {
    const query = {
        name: 'Add truck',
        text: `INSERT INTO "SUT".truckdetails (truck_name, truck_no,
         truck_model, chasis_no, capacity_inkgs, capacity_inspace,
          booked_weight, booked_space, truckowner_mobile_num, truck_mobile_num,
           rc, license, transport_company_name, driver_name, transport_company_mobile_num)
           VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
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
            truckDetails.truckMobileNum,
            truckDetails.rc,
            truckDetails.license,
            truckDetails.companyName,
            truckDetails.truckDriver,
            truckDetails.companyMobileNum,
        ],
    };

    try {
        const result = await pool.query(query);

        return result;
    } catch (error) {
        console.error(`error at service ${error}`);

        return error;
    }
};

const getTruck = truckNo => {
    // use truckNo to get the total space

    const query = {
        name: 'Get truck detail',
        text: `SELECT truck_id, truck_name,
        truck_no, truck_model, chasis_no,
        capacity_inkgs, capacity_inspace,
        booked_weight, booked_space,
        truckowner_mobile_num,
        transport_company_name,
        truck_mobile_num
        driver_name, transport_company_mobile_num
        FROM "SUT".truckdetails WHERE truck_no = $1`,
        values: [ truckNo ],
    };

    try {
        return pool.query(query);
    } catch (error) {
        console.error(error);

        return error;
    }
};

const getTruck2 = truckNo => {
    // use truckNo to get the total space

    const query = {
        name: 'Get truck details with truckNo',
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
    console.log(mobileNum);
    const query = {
        name: 'Get truck details fro owner',
        text: `SELECT truck_id, truck_name,
          truck_no, truck_model, chasis_no,
          capacity_inkgs, capacity_inspace,
          booked_weight, booked_space,
          truckowner_mobile_num,
          transport_company_name,
          driver_name, transport_company_mobile_num, truck_mobile_num
          FROM "SUT".truckdetails WHERE truckowner_mobile_num = $1
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

function getTransportCompanyTrucks (mobileNum) {
    const query = {
        name: 'Check transport owner exist',
        text: `SELECT truck_id, truck_name,
        truck_no, truck_model, chasis_no,
        capacity_inkgs, capacity_inspace,
        booked_weight, booked_space,
        truckowner_mobile_num,
        transport_company_name,
        truck_mobile_num,
        driver_name, transport_company_mobile_num FROM "SUT".truckdetails WHERE transport_company_mobile_num = $1`,
        values: [ mobileNum ],
    };

    // console.log(`select query called! ${mobileNumber}`);

    try {
        return pool.query(query);

        // console.log(`query result is ${result}`);

        // return result.rows.length;
    } catch (error) {
        console.log(error);

        return error;
    }
}

const deleteTruck = async truckDetails => {
    const query = {
        name: 'Get truck',
        text: 'SELECT * FROM "SUT".truckdetails WHERE truck_no = $1 AND transport_company_mobile_num = $2',
        values: [ truckDetails.truckNo,
            truckDetails.mobileNum ],
    };

    try {
        return await pool.query(query);
    } catch (error) {
        console.error(error);

        return error;
    }
};

module.exports = { insertTruck,
    getTrucksForOwner,
    updateTruckWeightandSpace,
    getTruck,
    getTransportCompanyTrucks,
    getTruck2,
    deleteTruck };
