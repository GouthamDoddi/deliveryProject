const checkTrip = require('../services/tripServices');
const insertTrip = require('../services/tripServices');


const tripRegister = async (req, res) => {
    console.log('check req', req.body);
    const { truck_no, source, destination, start_date, reach_date, trip_duration_in_hours } = req.body;

    const result = await checkTrip(truck_no);

    console.log(result);
    if (result) {

        const tripDetails = {
            truck_no,
            source,
            destination, 
            start_date, 
            reach_date, 
            trip_duration_in_hours,
        };

        const addTrip = await insertTrip(tripDetails);

        res.json({ addTrip });


    }
    console.error('trip already exists');
    res.status(409).send('Duplicate trip');
};

module.exports = tripRegister;
