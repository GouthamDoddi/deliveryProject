const { updatePackageDeliveryStatus } = require('../services/truckPackageMappingServices');
const parseIp = require('../middleware/praseIp');

const updatePackageMaping = async (req, res) => {
    const { delivered, status, mappingId } = req.body;

    console.log(mappingId);
    const details = { delivered, mappingId, status };

    const result = await updatePackageDeliveryStatus(details);

    if (!result.rowCount) {
        return res.json({
            status: 400,
            message: 'failed',
            details: result.details,
        });
    }

    return res.json({
        statusCode: 200,
        message: 'Updated!',
        ipAddress: parseIp(req),
    });
};

module.exports = updatePackageMaping;
