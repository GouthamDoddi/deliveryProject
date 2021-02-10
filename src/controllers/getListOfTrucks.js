const { getTrips } = require('../services/tripServices');
const { getTruck } = require('../services/truckServices');


const getListOfTrucks = async (req, res) => {
    const { startDate, source, destination } = req.body;

    const tripInfo = { startDate, source, destination };

    const trips = await getTrips(tripInfo);

    if (!trips.rowCount) {
        return res.json({
            statusCode: 400,
            message: 'No trips found!',
        });
    }


    const listOfTrips = trips.rows;

    const result = await Promise.all(listOfTrips.map(async trip => {
        // eslint-disable-next-line camelcase
        const { truck_no } = trip;

        const truck = await getTruck(truck_no);

        const tripNtruckData = { ...trip, ...truck.rows[0] };

        console.log(tripNtruckData);


        return tripNtruckData;
    }));

    // const resolvedResult = Promise.all(result)
    //     .then(resu => resu)
    //     .catch(err => err);

    console.log(result);

    return res.json({
        statusCode: 200,
        data: result,
    });
};

module.exports = getListOfTrucks;
