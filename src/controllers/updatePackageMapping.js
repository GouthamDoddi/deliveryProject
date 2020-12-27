const { updatePackageTruck, updatePackageDeliveryStatus } = require('../services/truckPackageMappingServices');

const updatePackageMaping = async (req, res) => {
    const { delivered, truckNo, packageId } = req.body;

    if (delivered) {
        const details = { delivered, packageId };

        const result = await updatePackageDeliveryStatus(details);

        if (!result.rowCount) {
            return res.json({
                status: 400,
                details: result.detail,
            });
        }

        return res.json({
            statusCode: 200,
            message: 'Info updated',
        });
    }

    if (truckNo) {
        const details = { truckNo, packageId };

        const result = await updatePackageTruck(details);

        if (!result.rowCount) {
            return res.json({
                status: 400,
                details: result.detail,
            });
        }

        return res.json({
            statusCode: 200,
            message: 'Info updated',
        });
    }

    return true;
};

module.exports = updatePackageMaping;
