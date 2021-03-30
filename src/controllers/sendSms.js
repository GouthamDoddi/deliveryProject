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

    const { mobileNum } = req.body;

    logger.info(`${mobileNum} requested an otp.`);

    /* _______try to find if the user already exists________ */

    const result1 = await getCustomer(mobileNum);

    console.log(mobileNum);

    console.log(result1.rows);


    const result2 = await getTruckowner(mobileNum);

    console.log(`result2 = ${JSON.stringify(result2[1])}`);

    // console.log(`trunk driver ${JSON.stringify(result2)}`);

    if (!result2) {
        const result3 = await getTransportCompany(mobileNum);

        console.log(`result3 = ${result3.rowCount}`);

        if (!result3 && !result1.rowCount) {
            console.log('No user found');
            logger.info(`${req.body.mobileNum} does not exist in either
                customer or truckowner database`);

            return res.json({ statusCode: 404,
                message: 'Error! User is not found.' });
        } else if (!result3 && result1.rowCount) {
            const otp = createOTP();
            const token = jwt.sign({ sub: req.body.mobileNum }, secret, {
                expiresIn: 86400, // expires in 24 hours
            });

            return res.json({
                statusCode: 200,
                customerDetails: result1.rows,
                otp,
                token,
                ipAddress: parseIp(req),
            });
        } else if (result3 && !result1.rowCount) {
            const otp = createOTP();
            const token = jwt.sign({ sub: req.body.mobileNum }, secret, {
                expiresIn: 86400, // expires in 24 hours
            });

            return res.json({
                statusCode: 200,
                transportOwner: result3[0],
                truckDetails: result3[1],
                otp,
                token,
                ipAddress: parseIp(req),
            });
        }
        const otp = createOTP();
        const token = jwt.sign({ sub: req.body.mobileNum }, secret, {
            expiresIn: 86400, // expires in 24 hours
        });

        return res.json({
            statusCode: 200,
            customerDetails: result1.rows,
            transportOwner: result3[0],
            truckDetails: result3[1],
            otp,
            token,
            ipAddress: parseIp(req),
        });
    }

    /* _______If the user is found________ */

    const otp = createOTP();

    logger.info(`${mobileNum} received and OTP ${otp}`);

    // also sending JWT token

    const token = jwt.sign({ sub: mobileNum }, secret, {
        expiresIn: 86400, // expires in 24 hours
    });

    // console.log('result2');
    // console.log(result2);
    if (result1.rowCount) {
        return res.json({
            statusCode: 200,
            customerDetails: result1.rows,
            truckOwner: result2[0],
            truckDetails: result2[1],
            otp,
            token,
            ipAddress: parseIp(req),
        });
    }

    return res.json({
        statusCode: 200,
        truckOwner: result2[0],
        truckDetails: result2[1],
        otp,
        token,
        ipAddress: parseIp(req),
    });
};

module.exports = sendSMS;
