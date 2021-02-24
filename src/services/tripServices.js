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

async function getTripByTruckNo (truckNo) {
    // wrong code, search trip with tripId

    console.log(truckNo);
    const query = {
        name: 'Check tripzzz exists',
        text: 'SELECT * FROM "SUT".trip_details WHERE (truck_no = $1)',
        values: [
            truckNo,
        ],
    };

    try {
        const r = await pool.query(query);

        console.log(r);

        return r;
    } catch (error) {
        console.log(error);

        return error;
    }
}

const insertTrip = async tripDetails => {
    const query = {
        name: 'insert Trip in db',
        text: `INSERT INTO "SUT".trip_details (truck_no, source, destination, start_date,
                 reach_date, trip_duration_in_hours) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,

        values: [ tripDetails.truckNo,
            tripDetails.source,
            tripDetails.destination,
            tripDetails.startDate,
            tripDetails.reachDate,
            // tripDetails.totalPackages,
            // tripDetails.deliveredPackages,
            tripDetails.tripDurationInHours ],
    };

    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return error;
    }
};

const updateTripDetails = async tripDetails => {
    const query = {
        name: 'Update trip details',
        text: `UPDATE "SUT".trip_details SET reach_date = $1,
        trip_duration_in_hours = $2, start_date = $3
         WHERE (trip_id = $4)`,
        values: [
            tripDetails.reachDate,
            tripDetails.tripDurationInHours,
            tripDetails.startDate,
            tripDetails.tripId,
        ],
    };

    try {
        const result = await pool.query(query);

        console.log(result);

        return result;
    } catch (error) {
        console.log(error);

        return error;
    }
};

const incrementTripPackageDelivered = async tripId => {
    const query = {
        name: 'Update delivered  packages',
        text: `UPDATE "SUT".trip_details SET delivered_packages = delivered_packages + 1
        WHERE trip_id = $1`,
        values: [ tripId ],
    };

    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return error;
    }
};

const incrementTripPackageTotal = async tripId => {
    const query = {
        name: 'Update Total packages',
        text: `UPDATE "SUT".trip_details SET total_packages = total_packages + 1
        WHERE trip_id = $1`,
        values: [ tripId ],
    };

    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error);

        return error;
    }
};

module.exports = { getTrips,
    insertTrip,
    updateTripDetails,
    incrementTripPackageDelivered,
    incrementTripPackageTotal,
    getTripByTruckNo };
