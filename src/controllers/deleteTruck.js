const parseIp = require('../middleware/praseIp');
const getMobileNumber = require('../utils/getMobileNo');
const { deleteTruck } = require('../services/truckServices');


const deleteTruckController = async (req, res) => {
    const { truckNo } = req.body;

    const mobileNum = await getMobileNumber(req.headers.authorization);


    const truckDetails = {
        truckNo,
        mobileNum,
    };

    console.log(truckDetails);

    const result = await deleteTruck(truckDetails);

    console.log(result.rows);

    if (!result.rowCount) {
        return res.json({
            statusCode: 400,
            message: result.detail,
        });
    }

    return res.json({
        statusCode: 200,
        message: 'Truck deleted',
        details: { truckNo: result.rows[0].truck_no,
            mobileNum: result.rows[0].transport_company_mobile_num },
        ipAddress: parseIp(req),
    });
};

module.exports = deleteTruckController;
