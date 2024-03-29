/* eslint-disable object-shorthand */
const { insertTruckowner } = require('../services/truckownerServices');
// const { logger } = require('../middleware/logger');
const winston = require('winston');
const jwt = require('jsonwebtoken');

const encryptPassword = require('../middleware/encryptPass');
const parseIp = require('../middleware/praseIp');
const createOTP = require('../utils/createOTP');


const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: 'logs/truckowner.log',
            json: true,
            format: winston.format.combine(winston.format.timestamp(),
                winston.format.json()),
        }),
    ],
});

const truckOwnerRegister = async (req, res) => {
    // get the customer details from req.body

    // using logger to record activity
    logger.info(`recived register request from truck owner with mobile number ${req.body.mobileNum}
    and id address = ${parseIp(req)} `);

    const secret = '!@#DWe$%^gge&&**';


    // using one line promises lets encrypt the password and
    // store it in a var
    if (req.body.password) {
        var encryptedPassword = await encryptPassword(req.body.password);
        if (!encryptedPassword) {
            return res.json({
                statusCode: 500,
                message: 'There is an error in encrypting password',
            });
        }
    }

    const truckownerDetails = {
        fullName: req.body.fullName,
        mobileNum: req.body.mobileNum,
        email: req.body.email,
        isKycEnabled: req.body.isKycEnabled,
        aadharNo: req.body.aadharNo,
        encryptedPassword,
        panNo: req.body.panNo,
        addressline1: req.body.addressline1,
        addressline2: req.body.addressline2,
        city: req.body.city,
        state: req.body.state,
    };

    const addTruckowner = await insertTruckowner(truckownerDetails);

    const otp = createOTP();

    const token = jwt.sign({ sub: req.body.mobileNum }, secret, {
        expiresIn: 86400, // expires in 24 hours
    });

    // if the insert function failed the it would return a false
    if (addTruckowner.command === 'INSERT') {
        logger.info(`truckowner with no ${req.body.mobileNum} is registered`);

        return res.json({ statusCode: 201,
            message: 'User registered!',
            details: addTruckowner.rows,
            ipAddress: parseIp(req),
            token: token,
            otp: otp });
    }

    return res.json({ statusCode: 400,
        message: addTruckowner.detail,
        ipAddress: parseIp(req) });


    // const token = jwtTruckowner(newUser.rows[0].truckowner_id);
};

module.exports = truckOwnerRegister;
