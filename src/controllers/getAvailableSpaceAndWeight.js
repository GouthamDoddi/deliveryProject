const { getTruck } = require('../services/truckServices');

const getAvailableSpaceAndWeight = async (req, res) => {
    // lest use truck no to get the space available in truck
    const truckDetials = await getTruck(req.body.truckNo);

    if (truckDetials.rowCount !== 0) {
        const totalWeight = truckDetials.rows[0].capacity_inkgs;
        const totalSpace = truckDetials.rows[0].capacity_inspace;
        const bookedSapce = truckDetials.rows[0].booked_space;
        const bookedWeight = truckDetials.rows[0].booked_weight;

        return res.json({
            statsCode: 200,
            availableWeight: totalWeight - bookedWeight,
            availableSpace: totalSpace - bookedSapce,
        });
    }

    return res.json({
        statusCode: 404,
        message: 'truck not found',
    });
};

module.exports = getAvailableSpaceAndWeight;
