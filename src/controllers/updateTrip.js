const { updateTripDetails, incrementTripPackageDelivered,
    incrementTripPackageTotal } = require('../services/tripServices');
const parseIp = require('../middleware/praseIp');


const updateTrip = async (req, res) => {
    const { reachDate, tripDurationInHours,
        tripId, startDate } = req.body;

    const tripDetails = {
        reachDate,
        tripDurationInHours,
        tripId,
        startDate,
    };

    const result = await updateTripDetails(tripDetails);

    if (!result.rowCount) {
        return res.json({
            statusCode: 400,
            message: result.detail,
        });
    }

    return res.json({
        statusCode: 200,
        message: 'info updated',
        ipAddress: parseIp(req),
    });
};

const incrementDeliveredPackages = async (req, res) => {
    const { tripId } = req.body;

    const result = await incrementTripPackageDelivered(tripId);

    if (!result.rowCount) {
        return res.json({
            statusCode: 400,
            message: result.detail,
        });
    }

    return res.json({
        statusCode: 200,
        message: 'info updated',
        ipAddress: parseIp(req),
    });
};

const incrementTotalPackages = async (req, res) => {
    const { tripId } = req.body;

    const result = await incrementTripPackageTotal(tripId);

    console.log(result);

    if (!result.rowCount) {
        return res.json({
            statusCode: 400,
            message: result.detail,
        });
    }

    return res.json({
        statusCode: 200,
        message: 'info updated',
        ipAddress: parseIp(req),
    });
};


module.exports = { updateTrip, incrementDeliveredPackages, incrementTotalPackages };
