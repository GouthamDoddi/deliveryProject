const { updatePackageTruck, updatePackageDeliveryStatus } = require('../services/truckPackageMappingServices');

const updatePackageMaping = async (req, res) => {
    const { delivered, truckNo } = req.body;

    const details = {
        delivered,
        truckNo,
    };

    if (delivered) {
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
