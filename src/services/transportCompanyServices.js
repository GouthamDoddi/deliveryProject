const pool = require('../config/db');
const { getTrucksForOwner } = require('../services/truckServices');
const { getTransportCompanyTrucks } = require('../services/truckServices');


async function getTransportCompany (mobileNumber) {
    const query = {
        name: 'Check transport owner exists',
        text: 'SELECT * FROM "SUT".transport_company WHERE mobile_num = $1',
        values: [ mobileNumber ],
    };

    const truckDetails = await getTransportCompanyTrucks(mobileNumber);

    try {
        const result = await pool.query(query);
        const finalResult = truckDetails.rowCount
            ? [ result, truckDetails.rows ]
            : result;

        return finalResult;
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
