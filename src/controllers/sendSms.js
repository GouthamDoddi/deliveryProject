const { getCustomer } = require('../services/customerServices');
const { getTruckowner } = require('../services/truckownerServices');
const winston = require('winston');
const jwt = require('jsonwebtoken');


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
    const result1 = await getCustomer(req.body.mobileNum);

    const result2 = await getTruckowner(req.body.mobileNum);


    if (!result1.rowCount && !result2.rowCount) {
        console.log('No user found');
        logger.info(`${req.body.mobileNum} does not exist in either
        customer or truckowner database`);

        return res.json({ statusCode: 404,
            message: 'Error! User is not found.' });
    }

    function createOTP () {
        const digits = '0123456789';
        let OTP = '';

        for (let i = 0; i < 4; i++)
            OTP += digits[Math.floor(Math.random() * 10)];

        return OTP;
    }

    const otp = createOTP();

    logger.info(`${req.body.mobileNo} recived and OTP ${otp}`);

    // also sending JWT token

    const token = jwt.sign({ sub: req.body.mobileNum }, secret, {
        expiresIn: 86400, // expires in 24 hours
    });

    return res.json({
        statusCode: 200,
        otp,
        token,
    });
};

module.exports = sendSMS;
