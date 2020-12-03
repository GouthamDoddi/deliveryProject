const pool = require('../config/db');

async function checkTrip (truck_no) {
    const query = {
        name: 'Check truckowner exists',
        text: 'SELECT * FROM trip_details WHERE truck_no = $1',
        value: truck_no,
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
    try {
        const query = {
            name: 'insert user in db',
            text: `INSERT INTO trip_details (truck_no, source, destination, start_date,
                 reach_date, trip_duration_in_hours) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`, 

            values: [ tripDetails.truck_no,
                tripDetails.source,
                tripDetails.destination,
                tripDetails.start_date,
                tripDetails.reach_date,
                tripDetails.trip_duration_in_hours],
        };

        const result = await pool.query(query);

        console.log(result);
    } catch (error) {
        console.log(error);
    }
};

module.exports = checkTrip;
module.exports = insertTrip;
