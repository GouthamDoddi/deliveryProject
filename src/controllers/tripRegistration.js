const { insertTrip } = require('../services/tripServices');


const tripRegister = async (req, res) => {
    const { truckNo, source, destination, startDate, reachDate, tripDurationInHours } = req.body;

    // placing all trip details in one object so we can pass them as
    // parameters
    const tripDetails = {
        truckNo,
        source,
        destination,
        startDate,
        reachDate,
        tripDurationInHours,
    };

    // let's call the insert function and pass the trip details
    const addTrip = await insertTrip(tripDetails);


    // if insert function didn't return an error
    if (addTrip.command) {
        return res.status(201)
            .json({ statusCode: 201,
                message: 'trip registered' });
    }

    return res.status(201)
        .json({ statusCode: 409,
            message: 'Please check if all trip details are provided and valid.' });
};

module.exports = tripRegister;
