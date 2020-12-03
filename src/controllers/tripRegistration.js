const insertTrip = require('../services/tripServices');


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

    console.log(addTrip.command);

    // if insert function didn't return an error
    if (addTrip.command) {
        res.status(201)
            .json({ statusCode: 201,
                message: 'trip registered' });
    }

    res.status(201)
        .json({ statusCode: 409,
            message: `Some of the trip values conflict with already registered
        data(duplicate values)` });
};

module.exports = tripRegister;
