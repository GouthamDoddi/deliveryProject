const { getTrucksForOwner, getTruck } = require('../services/truckServices');


const getTrucks = async (req, res) => {
    // using the data givin we need to find trucks
    // thats can travel between user's location,
    // destination and during the given data.


    const { truckNo, mobileNum } = req.body;

    /* _______Trucks for trip_________*/

    if (truckNo) {
        const trucks = await getTruck(truckNo);

        if (trucks.rowCount) {
            return res.json({
                statusCode: 200,
                message: trucks,
            });
        }


        return res.json({
            status: 400,
            message: "Couldn't find any trucks",
        });
    }

    /* ______Truck for company of driver_______*/

    const trucks = await getTrucksForOwner(mobileNum);

    if (trucks.rowCount) {
        return res.json({
            statusCode: 200,
            trucks,
        });
    }

    return res.json({
        statusCode: 400,
        message: 'Could not find any truck with the given info!',
    });
};

module.exports = getTrucks;
