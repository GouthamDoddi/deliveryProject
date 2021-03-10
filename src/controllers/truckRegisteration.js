const winston = require('winston');

const { insertTruck } = require('../services/truckServices');
const parseIp = require('../middleware/praseIp');
const createOTP = require('../utils/createOTP');
// const fs = require('fs');


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

    const { companyMobileNum, mobileNum, truckMobileNum } = req.body;

    console.log(req.body);

    const bookedWeight = req.body.bookedWeight
        ? req.body.bookedWeight
        : 0;

    const bookedSpace = req.body.bookedSpace
        ? req.body.bookedSpace
        : 0;

    console.log(req.body, req.files);

    // const rc = fs.createReadStream('C:/Users/gouth/Pictures/wallpappers/paint_stains_fluid_art_172777_1920x1080.jpg');

    // console.log(rc);

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
        truckMobileNum,
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

const truckRegister2 = async (req, res) => {
    // getting mobile number from decoding the token

    const { companyMobileNum, mobileNum } = req.body;


    const bookedWeight = req.body.bookedWeight
        ? req.body.bookedWeight
        : 0;

    const bookedSpace = req.body.bookedSpace
        ? req.body.bookedSpace
        : 0;
    // const rc = fs.createReadStream('C:/Users/gouth/Pictures/wallpappers/paint_stains_fluid_art_172777_1920x1080.jpg');

    // console.log(rc);

    if (req.files.length !== 2) {
        return res.json({
            statusCode: 400,
            message: "There must be only two files 'rc' and 'license' no less no more!",
        });
    } else if (req.files[0].fieldname !== 'rc' && req.files[1].fieldname !== 'rc') {
        return res.json({
            statusCode: 400,
            message: "can't find rc document",
        });
    } else if (req.files[0].fieldname !== 'license' && req.files[1].fieldname !== 'license') {
        return res.json({
            statusCode: 400,
            message: "can't find license document",
        });
    }

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
        rc: req.files[0].fieldname === 'rc'
            ? req.files[0].buffer
            : req.files[1].fieldname === 'rc'
                ? req.files[1].buffer
                : false,
        license: req.files[0].fieldname === 'license'
            ? req.files[0].buffer
            : req.files[1].fieldname === 'license'
                ? req.files[1].buffer
                : false,
        companyName: req.body.companyName,
        truckDriver: req.body.truckDriver,
        companyMobileNum,
    };

    // eslint-disable-next-line valid-typeof
    if (!truckDetails.rc || !truckDetails.license) {
        return res.json({
            statusCode: 400,
            message: 'could not find rc or license',
        });
    }

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

module.exports = { truckRegister, truckRegister2 };
