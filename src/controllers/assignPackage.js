const { updateTruckWeightandSpace } = require('../services/truckServices');
const { getPackage } = require('../services/packageServices');
const { getTruck } = require('../services/truckServices');
const { insertMapping } = require('../services/truckPackageMappingServices');
const { incrementTripPackageTota } = require('../services/tripServices');
const parseIp = require('../middleware/praseIp');


const assignPackage = async (req, res) => {
    // get package details and assign it to suitble truck
    const { packageId, truckNo, tripId } = req.body;

    const packageDetails = await getPackage(packageId);

    if (packageDetails.rowCount === 0) {
        return res.json({
            statusCode: 404,
            message: 'Package with that ID is not found',
        });
    }
    const packageWeight = packageDetails.rows[0].package_weight;
    const packageSpace = packageDetails.rows[0].package_space;

    const truckDetials = await getTruck(truckNo);

    console.log(truckDetials.rowCount, 'is the truck row count');

    if (truckDetials.rowCount === 0) {
        return res.json({
            statusCode: 404,
            message: 'Truck with that ID is not found',
        });
    }

    console.log(truckDetials.rows);

    const bookedSapce = truckDetials.rows[0].booked_space;
    const bookedWeight = truckDetials.rows[0].booked_weight;

    // now let's update truck weight
    const updatedValues = {
        updatedWeight: bookedWeight + packageWeight,
        updatedSpace: bookedSapce + packageSpace,
        truckNo,
    };

    const updateTruckDetails = await updateTruckWeightandSpace(updatedValues);

    console.log(updateTruckDetails, 'is truck details');

    const date = new Date().toISOString()
        .split('T')[0];

    console.log(date);

    const mappingDetails = {
        truckNo,
        packageId,
        date,
        tripId,
    };

    const packageMapping1 = await insertMapping(mappingDetails);

    if (!packageMapping1.rowCount) {
        return res.json({
            statusCode: 400,
            message: packageMapping1.detail,
            ipAddress: parseIp(req),
        });
    }

    const packageMapping = await incrementTripPackageTota(tripId);

    if (packageMapping.rowCount === 1) {
        return res.json({
            statusCode: 200,
            message: `Package has been successfully mapped to
             truck with number ${truckNo}`,
        });
    }

    return res.json({
        statusCode: 400,
        message: packageMapping.detail,
        ipAddress: parseIp(req),
    });
};

module.exports = assignPackage;
