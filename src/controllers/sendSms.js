const winston = require('winston');
const jwt = require('jsonwebtoken');

const createOTP = require('../utils/createOTP');
const { getCustomer } = require('../services/customerServices');
const { getTruckowner } = require('../services/truckownerServices');
const { getTransportCompany } = require('../services/transportCompanyServices');
const parseIp = require('../middleware/praseIp');


const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: 'logs/OTP.log',
            json: true,
            format: winston.format.combine(winston.format.timestamp(),
                winston.format.json()),
        }),
    ],
});

const sendSMS = async (req, res) => {
    const secret = '!@#DWe$%^gge&&**';

    logger.info(`${req.body.mobileNum} requested an otp.`);

    /* _______try to find if the user already exists________ */

    const result1 = await getCustomer(req.body.mobileNum);

    console.log(result1);


    const result2 = await getTruckowner(req.body.mobileNum);

    console.log(result2);

    if (!result2.rowCount) {
        var result3 = await getTransportCompany(req.body.mobileNum);

        console.log(result3);

        if (!result3.rowCount && !result1.rowCount) {
            console.log('No user found');
            logger.info(`${req.body.mobileNum} does not exist in either
                customer or truckowner database`);

            return res.json({ statusCode: 404,
                message: 'Error! User is not found.' });
        }
    }

    /* _______If the user is found________ */

    const otp = createOTP();

    logger.info(`${req.body.mobileNo} received and OTP ${otp}`);

    // also sending JWT token

    const token = jwt.sign({ sub: req.body.mobileNum }, secret, {
        expiresIn: 86400, // expires in 24 hours
    });

    return res.json({
        statusCode: 200,
        customerDetails: result1.rows,
        truckOwner: result2.rows,
        transportOwner: result3.rows,
        otp,
        token,
        ipAddress: parseIp(req),
    });
};

module.exports = sendSMS;
