const { getRating } = require('../services/ratingServices');
const parseIp = require('../middleware/praseIp');


const getTruckRating = async (req, res) => {
    const result = await getRating(req.body.truckNo);

    if (!result.rowCount) {
        return res.json({
            statusCode: 400,
            message: result.detail || 'No ratings for this truck :(',
        });
    }

    let ratingSum = 0;

    result.rows.map(row => {
        ratingSum += Number(row.rating);
    });

    const AverageRating = ratingSum / result.rowCount;

    return res.json({
        statusCode: 200,
        AverageRating,
        noOfRatings: result.rowCount,
        // details: result.rows,
        ipAddress: parseIp(req),
    });
};

module.exports = getTruckRating;
