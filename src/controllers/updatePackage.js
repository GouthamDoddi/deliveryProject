const { updatePackageReachDate } = require('../services/packageServices');
const parseIp = require('../middleware/praseIp');

const updatePackage = (req, res) => {
    const { reachDate, packageId } = req.body;

    const result = updatePackageReachDate({ reachDate, packageId });


    if (!result.rowCount) {
        return res.json({
            status: 400,
            details: result.detail,
            ipAddress: parseIp(req),
        });
    }

    return res.json({
        statusCode: 200,
        message: 'Info updated',
        ipAddress: parseIp(req),
    });
};

module.exports = updatePackage;
