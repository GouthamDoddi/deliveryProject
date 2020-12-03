const { insertPackage } = require('../services/packageServices');
// const { logger } = require('../middleware/logger');
const winston = require('winston');

const logger = winston.createLogger({
    customer: [
        new winston.transports.File({
            level: 'info',
            filename: 'logs/truckowner',
            json: true,
            format: winston.format.combine(winston.format.timestamp(),
                winston.format.json()),
        }),
    ],
});

const packageRegister = async (req, res) => {
    // get the truck owner details from req.body

    // using logger to record activity
    logger.info(`received package register request for customer ${req.body.MobileNum}`);


    const packageDetails = {
        packageName: req.body.packageName,
        customerId: req.body.mobileNum,
        packageType: req.body.packageType,
        packageWeight: req.body.packageWeight,
        packageSpace: req.body.packageSpace,
        packageValue: req.body.packageValue,
    };

    const addPackage = await insertPackage(packageDetails);

    // if the insert function failed the it would return a false
    if (addPackage) {
        res.json({ statusCode: 201,
            message: 'package registered!' });
    }
    res.json({ statusCode: 409,
        message: 'failed to add package. please check provided details' });


    // const token = jwtPackage(newUser.rows[0].truckowner_id);
};

module.exports = packageRegister;
