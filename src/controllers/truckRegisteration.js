const winston = require('winston');

const { insertTruck } = require('../services/truckServices');
const parseIp = require('../middleware/praseIp');
const createOTP = require('../utils/createOTP');


// define the logger function
const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: 'logs/truck.log',
            json: true,
            format: winston.format.combine(winston.format.timestamp(),
                winston.format.json()),
        }),
    ],
});


const truckRegister = async (req, res) => {
    // getting mobile number from decoding the token
    console.log(req);

    const { companyMobileNum, mobileNum } = req.body;

    const bookedWeight = req.body.bookedWeight
        ? req.body.bookedWeight
        : 0;

    const bookedSpace = req.body.bookedSpace
        ? req.body.bookedSpace
        : 0;

    const truckDetails = {
        truckName: req.body.truckName,
        truckNo: req.body.truckNo,
        truckModel: req.body.truckModel,
        chasisNo: req.body.chasisNo,
        capacityInKgs: req.body.capacityInKgs,
        capacityInSpace: req.body.capacityInSpace,
        bookedWeight,
        bookedSpace,
        mobileNum,
        rc: req.files[0].buffer,
        license: req.files[1].buffer,
        companyName: req.body.companyName,
        truckDriver: req.body.truckDriver,
        companyMobileNum,
    };

    const result = await insertTruck(truckDetails);
    const otp = createOTP();

    if (result.command === 'INSERT') {
        logger.info(`added truck with no = ${truckDetails.truckNo} by user with mobileNo=${mobileNum}
        and id address = ${parseIp(req)} `);

        return res.json({
            statusCode: 200,
            message: 'Truck added to database',
            details: result.details,
            ipAddress: parseIp(req),
            // eslint-disable-next-line object-shorthand
            otp: otp,
        });
    }

    logger.info(`Failed! Couldn't add added truck with no = ${truckDetails.truckNo} by user with mobileNo=${mobileNum || companyMobileNum}`);


    return res.json({
        statusCode: 400,
        message: result.detail,
        ipAddress: parseIp(req),
    });
};

module.exports = truckRegister;
