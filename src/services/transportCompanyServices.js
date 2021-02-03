const pool = require('../config/db');

async function getTransportCompany (mobileNumber) {
    const query = {
        name: 'Check transport owner exists',
        text: 'SELECT * FROM "SUT".transport_company WHERE mobile_num = $1',
        values: [ mobileNumber ],
    };


    try {
        return await pool.query(query);

        // console.log(`query result is ${result}`);

        // return result.rows.length;
    } catch (error) {
        console.log(error);

        return error;
    }
}

async function getTransportCompanyWithId (companyId) {
    const query = {
        name: 'Check transport owner exists',
        text: 'SELECT * FROM "SUT".transport_company WHERE company_id = $1',
        values: [ companyId ],
    };

    // console.log(`select query called! ${mobileNumber}`);

    try {
        return await pool.query(query);

        // console.log(`query result is ${result}`);

        // return result.rows.length;
    } catch (error) {
        console.log(error);

        return error;
    }
}

const insertTransportCompany = async transportCompany => {
    const query = {
        name: 'insert user in db',
        text: `INSERT INTO "SUT".transport_company (company_name, mobile_num, no_of_vehicles)
                VALUES($1, $2, $3) RETURNING *`,
        values: [
            transportCompany.companyName,
            transportCompany.mobileNum,
            transportCompany.noOfTrucks,
        ],
    };

    try {
        return await pool.query(query).then(error => error);
    } catch (error) {
        console.log(error);

        return error;
    }
};

module.exports = { insertTransportCompany, getTransportCompanyWithId, getTransportCompany };
