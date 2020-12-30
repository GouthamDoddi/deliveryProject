const { insertRating } = require('../services/ratingServices');
const getMobileNumber = require('../utils/getMobileNo');
const parseIp = require('../middleware/praseIp');


const addRating = async (req, res) => {
    const { truckNo, truckOwnerMobileNo, companyMobileNo, tripId,
        rating } = req.body;

    const customerMobileNum = await getMobileNumber(req.headers.authorization);

    const details = {
        truckNo,
        truckOwnerMobileNo,
        companyMobileNo,
        tripId,
        rating,
        customerMobileNum,
    };


    const result = await insertRating(details);


    if (!result.rowCount) {
        return res.json({
            statusCode: 400,
            message: result.detail,
        });
    }

    return res.json({
        statusCode: 200,
        message: 'info updated',
        details: result.rows,
        ipAddress: parseIp(req),
    });
};


module.exports = addRating;
