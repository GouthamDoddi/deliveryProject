const { updateTripDetails, incrementTripPackageDelivered,
    incrementTripPackageTotal } = require('../services/tripServices');

const updateTrip = async (req, res) => {
    const { reachDate, totalPackages, deliveredPackages, tripDurationInHours,
        truckNo, startDate } = req.body;

    const tripDetails = {
        reachDate,
        totalPackages,
        deliveredPackages,
        tripDurationInHours,
        truckNo,
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
    });
};

const incrementTotalPackages = async (req, res) => {
    const { tripId } = req.body;

    const result = await incrementTripPackageTotal(tripId);

    if (!result.rowCount) {
        return res.json({
            statusCode: 400,
            message: result.detail,
        });
    }

    return res.json({
        statusCode: 200,
        message: 'info updated',
    });
};


module.exports = { updateTrip, incrementDeliveredPackages, incrementTotalPackages };
