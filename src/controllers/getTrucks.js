const { getTrucksForOwner, getTruck,
    getTransportCompanyTrucks, getTruck2 } = require('../services/truckServices');
const getMobileNumber = require('../utils/getMobileNo');
const parseIp = require('../middleware/praseIp');


const getTrucks = async (req, res) => {
    // using the data givin we need to find trucks
    // thats can travel between user's location,
    // destination and during the given data.


    const mobileNum = await getMobileNumber(req.headers.authorization);

    const { truckNo } = req.body;

    /* _______Trucks for trip_________*/

    if (truckNo) {
        const trucks = await getTruck(truckNo);

        if (trucks.rowCount) {
            return res.json({
                statusCode: 200,
                message: trucks.rows,
                ipAddress: parseIp(req),
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
            ipAddress: parseIp(req),
        });
    }

    return res.json({
        statusCode: 400,
        message: 'Could not find any truck with the given info!',
    });
};

const getTruckWithDocs = async (req, res) => {
    const { truckNo } = req.body;

    const trucks = await getTruck2(truckNo);

    if (trucks.rowCount) {
        return res.json({
            statusCode: 200,
            message: trucks.rows,
            ipAddress: parseIp(req),
        });
    }


    return res.json({
        status: 400,
        message: "Couldn't find any trucks",
    });
};


const getCompanyTrucks = async (req, res) => {
    // using the data givin we need to find trucks
    // thats can travel between user's location,
    // destination and during the given data.


    const mobileNum = req.body.mobileNum
        ? req.body.mobileNum
        : await getMobileNumber(req.headers.authorization);


    /* ______Truck for company of driver_______*/

    const trucks = await getTransportCompanyTrucks(mobileNum);

    if (trucks.rowCount) {
        return res.json({
            statusCode: 200,
            trucks,
            ipAddress: parseIp(req),
        });
    }

    return res.json({
        statusCode: 400,
        message: 'Could not find any truck with the given info!',
    });
};

module.exports = { getTrucks, getCompanyTrucks, getTruckWithDocs };
