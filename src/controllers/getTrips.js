const { getTrips } = require('../services/tripServices');


const getTrip = async (req, res) => {
    // using the data givin we need to find trucks
    // thats can travel between user's location,
    // destination and during the given data.


    const { source, destination, tripDate } = req.body;

    const tripDetails = {
        source,
        destination,
        tripDate,
    };

    /* ______Trips that match_______*/

    const trips = await getTrips(tripDetails);

    if (trips.rowCount) {
        return res.json({
            statusCode: 200,
            trips,
        });
    }

    return res.json({
        statusCode: 400,
        message: 'Could not find any matching trips!',
    });
};

module.exports = getTrip;
