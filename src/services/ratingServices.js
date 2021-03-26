const pool = require('../config/db');


const insertRating = async details => {
    const query = {
        name: 'Insert customer rating',
        text: `INSERT INTO "SUT".delivery_partner_rating (truck_no,
        truck_owner_mobile_num, company_mobile_num, trip_id, customer_mobile_num,
         rating, receiving_person_mobile_no, comment) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        values: [
            details.truckNo,
            details.truckOwnerMobileNo,
            details.companyMobileNo,
            details.tripId,
            details.mobileNum,
            details.rating,
            details.receivingPersonNo,
            details.comment,
        ],
    };

    try {
        return await pool.query(query);
    } catch (err) {
        console.log(err);

        return err;
    }
};


const getRating = async mobileNum => {
    const query = {
        name: 'Insert customer rating',
        text: 'SELECT * FROM "SUT".delivery_partner_rating WHERE truck_owner_mobile_num = $1 OR company_mobile_num = $1 ',
        values: [
            mobileNum,
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
