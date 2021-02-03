const pool = require('../config/db');

async function getTruckowner (mobileNumber) {
    const query = {
        name: 'Check truckowner exists',
        text: 'SELECT * FROM "SUT".truck_owner WHERE mobile_num = $1',
        values: [ mobileNumber ],
    };

    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return error;
    }
}

async function getTruckownerWithId (ownerId) {
    const query = {
        name: 'Check truckowner exists',
        text: 'SELECT * FROM "SUT".truck_owner WHERE owner_id = $1',
        values: [ ownerId ],
    };

    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return error;
    }
}

async function insertTruckowner (truckownerDetails) {
    const query = {
        name: 'insert user in db',
        text: `INSERT INTO "SUT".truck_owner (full_name, mobile_num, password, email,
                is_kyc_enabled, aadhar_no, pan_no, addressline1, addressline2, city, state) 
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 ) RETURNING *`,
        values: [
            truckownerDetails.fullName,
            truckownerDetails.mobileNum,
            truckownerDetails.encryptedPassword,
            truckownerDetails.email,
            truckownerDetails.isKycEnabled,
            truckownerDetails.aadharNo,
            truckownerDetails.panNo,
            truckownerDetails.addressline1,
            truckownerDetails.addressline2,
            truckownerDetails.city,
            truckownerDetails.state,
        ],
    };

    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return error;
    }
}

module.exports = { insertTruckowner, getTruckownerWithId, getTruckowner };
