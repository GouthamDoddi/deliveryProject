const { insertTrip } = require('../services/tripServices');


const tripRegister = async (req, res) => {
    const { truckNo, source, destination, startDate, reachDate, totalPackages,
        deliveredPackages, tripDurationInHours } = req.body;

    // placing all trip details in one object so we can pass them as
    // parameters
    const tripDetails = {
        truckNo,
        source,
        destination,
        startDate,
        reachDate,
        totalPackages,
        deliveredPackages,
        tripDurationInHours,
    };

    // let's call the insert function and pass the trip details
    const addTrip = await insertTrip(tripDetails);


    // if insert function didn't return an error
    if (addTrip.command) {
        return res.json({ statusCode: 201,
            message: 'trip registered' });
    }

    return res.json({ statusCode: 400,
        message: addTrip.detail });
};

module.exports = tripRegister;
