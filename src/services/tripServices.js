const pool = require('../config/db');

async function getTrips (tripDetails) {
    // wrong code, search trip with tripId
    console.log(tripDetails);
    const query = {
        name: 'Check truckowner exists',
        text: `SELECT * FROM "SUT".trip_details WHERE (source = $1
            AND destination = $2 AND start_date = $3)`,
        values: [
            tripDetails.source,
            tripDetails.destination,
            tripDetails.startDate,
        ],
    };

    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return error;
    }
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

module.exports = { getTrips, insertTrip };
