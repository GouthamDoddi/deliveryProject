const pool = require('../config/db');


const insertRating = async details => {
    const query = {
        name: 'Insert customer rating',
        text: `INSERT INTO "SUT".delivery_partner_rating (truck_no,
        truck_owner_mobile_num, company_mobile_num, trip_id, customer_mobile_num,
         rating) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
        values: [
            details.truckNo,
            details.truckOwnerMobileNo,
            details.companyMobileNo,
            details.tripId,
            details.customerMobileNum,
            details.rating,
        ],
    };

    try {
        return await pool.query(query);
    } catch (err) {
        console.log(err);

        return err;
    }
};


const getRating = async truckNo => {
    const query = {
        name: 'Insert customer rating',
        text: 'SELECT * FROM "SUT".delivery_partner_rating WHERE truck_no = $1',
        values: [
            truckNo,
        ],
    };

    try {
        return await pool.query(query);
    } catch (err) {
        console.log(err);

        return err;
    }
};

module.exports = { insertRating, getRating };
