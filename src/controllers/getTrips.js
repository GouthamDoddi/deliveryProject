const { getTrips, getTripByTruckNo } = require('../services/tripServices');
const parseIp = require('../middleware/praseIp');

const getTrip = async (req, res) => {
    // using the data givin we need to find trucks
    // thats can travel between user's location,
    // destination and during the given data.


    const { source, destination, startDate } = req.body;

    const tripDetails = {
        source,
        destination,
        startDate,
    };

    /* ______Trips that match_______*/

    const trips = await getTrips(tripDetails);

    // console.log(tripDetails);

    if (!trips.rowCount) {
        return res.json({
            statusCode: 400,
            message: 'Could not find any matching trips!',
        });
    }

    return res.json({
        statusCode: 200,
        message: { numberOfTrip: trips.rowCount,
            tripDetails: trips.rows },
        ipAddress: parseIp(req),
    });
};

const getTripWTruckNo = async (req, res) => {
    // using the data givin we need to find trucks
    // thats can travel between user's location,
    // destination and during the given data.


    const { truckNo } = req.body;

    /* ______Trips that match_______*/

    const trips = await getTripByTruckNo(truckNo);

    // console.log(tripDetails);

    if (!trips.rowCount) {
        return res.json({
            statusCode: 400,
            message: 'Could not find any matching trips!',
        });
    }

    return res.json({
        statusCode: 200,
        message: { numberOfTrip: trips.rowCount,
            tripDetails: trips.rows },
        ipAddress: parseIp(req),
    });
};

module.exports = { getTrip, getTripWTruckNo };
