const parseIp = require('../middleware/praseIp');


const { getPackageReceivingDetails, getAllCustomerPackages,
    getAllTripPackages } = require('../services/packageServices');


const getReceivingPackages = async (req, res) => {
    const { mobileNum } = req.body;

    const result = await getPackageReceivingDetails(mobileNum);


    if (!result.rowCount) {
        return res.json({
            statusCode: 400,
            message: 'Could not find any matching packages!',
        });
    }

    return res.json({
        statusCode: 200,
        numberOfpackages: result.rowCount,
        packageDetails: result.rows,
        ipAddress: parseIp(req),
    });
};


const getCustomerPackages = async (req, res) => {
    const { mobileNum } = req.body;

    const result = await getAllCustomerPackages(mobileNum);


    if (!result.rowCount) {
        return res.json({
            statusCode: 400,
            message: 'Could not find any matching packages!',
        });
    }

    return res.json({
        statusCode: 200,
        numberOfpackages: result.rowCount,
        packageDetails: result.rows,
        ipAddress: parseIp(req),
    });
};

const getAllPackagesForTrip = async (req, res) => {
    const { tripId } = req.body;

    const result = await getAllTripPackages(tripId);

    console.log(result);
    if (!result.rowCount) {
        return res.json({
            statusCode: 400,
            message: 'Could not find any matching packages!',
        });
    }

    return res.json({
        statusCode: 200,
        numberOfpackages: result.rowCount,
        packageDetails: result.rows,
        ipAddress: parseIp(req),
    });
};

module.exports = { getReceivingPackages, getCustomerPackages, getAllPackagesForTrip };
