const { getTrips } = require('../services/tripServices');


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
    });
};

module.exports = getTrip;
