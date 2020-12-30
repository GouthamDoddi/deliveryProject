const winston = require('winston');

const { insertPackage } = require('../services/packageServices');
const getMobileNumber = require('../utils/getMobileNo');
const parseIp = require('../middleware/praseIp');

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

const packageRegister = async (req, res) => {
    // get the truck owner details from req.body

    // using logger to record activity
    logger.info(`received package register request for customer ${req.body.mobileNum}`);

    // using jwt let's get  the user's mobile no

    const mobileNum = await getMobileNumber(req.headers.authorization);


    // after extracting the mobile number lets call the insert qurrey

    const packageDetails = {
        packageName: req.body.packageName,
        mobileNum,
        packageType: req.body.packageType,
        pickUpPoint: req.body.pickUpPoint,
        dropPoint: req.body.dropPoint,
        date: req.body.date,
        entireTruck: req.body.entireTruck,
        receivingPersonName: req.body.receivingPersonName,
        receivingPersonNo: req.body.receivingPersonNo,
        packageWeight: req.body.packageWeight,
        packageSpace: req.body.packageSpace,
        packageValue: req.body.packageValue,
    };

    const addTruck = await insertPackage(packageDetails);

    // if the insert function failed the it would return a false
    if (addTruck.command === 'INSERT') {
        return res.json({ statusCode: 201,
            message: 'package registered!',
            details: addTruck.rows,
            ipAddress: parseIp(req) });
    }

    return res.json({ statusCode: 400,
        message: addTruck.detail });


    // const token = jwtPackage(newUser.rows[0].truckowner_id);
};

module.exports = packageRegister;
