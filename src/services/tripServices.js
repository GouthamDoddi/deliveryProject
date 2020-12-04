const pool = require('../config/db');

async function checkTrip (truck_no) {
    // wrong code, search trip with tripId
    const query = {
        name: 'Check truckowner exists',
        text: 'SELECT * FROM trip_details WHERE truck_no = $1',
        values: truck_no,
    };

    try {
        const result = await pool.query(query);

        console.log(result);
    } catch (error) {
        console.log(error);
    }

    return trip.rows.length;
}

const insertTrip = async tripDetails => {
    const query = {
        name: 'insert user in db',
        text: `INSERT INTO "SUT".trip_details (truck_no, source, destination, start_date,
                 reach_date, trip_duration_in_hours) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,

        values: [ tripDetails.truckNo,
            tripDetails.source,
            tripDetails.destination,
            tripDetails.startDate,
            tripDetails.reachDate,
            tripDetails.tripDurationInHours ],
    };

    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return error;
    }
};

module.exports = { checkTrip, insertTrip };
