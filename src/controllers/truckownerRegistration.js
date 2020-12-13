const { insertTruckowner } = require('../services/truckownerServices');
// const { logger } = require('../middleware/logger');
const winston = require('winston');
const bcrypt = require('bcrypt');

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
    logger.info(`recived register request from truck owner with mobile number ${req.body.mobileNum}`);


    // using one line promises lets encrypt the password and
    // store it in a var
    const encryptedPassword = await bcrypt.hash(req.body.password, 10)
        .then(hash => hash,
            error => console.log(error));

    const truckownerDetails = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
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

    // if the insert function failed the it would return a false
    if (addTruckowner) {
        res.json({ statusCode: 201,
            message: 'User registered!' });
    }
    res.json({ statusCode: 409,
        message: 'Truckowner with the details already exists' });


    // const token = jwtTruckowner(newUser.rows[0].truckowner_id);
};

module.exports = truckOwnerRegister;
