const winston = require('winston');
const jwt = require('jsonwebtoken');

const { insertTransportCompany } = require('../services/transportCompanyServices');
const parseIp = require('../middleware/praseIp');
const createOTP = require('../utils/createOTP');


const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: 'logs/transportCompany.log',
            json: true,
            format: winston.format.combine(winston.format.timestamp(),
                winston.format.json()),
        }),
    ],
});

const transportCompanyRegister = async (req, res) => {
    // using logger to record activity
    logger.info(`received register request from transportCompany ${req.body.companyName}
    and id address = ${parseIp(req)} `);

    const secret = '!@#DWe$%^gge&&**';


    // using one line promises lets encrypt the password and
    // store it in a var
    // if (req.body.password) {
    //     var encryptedPassword = await encryptPassword(req.body.password);
    //     if (!encryptedPassword) {
    //         return res.json({
    //             statusCode: 500,
    //             message: 'There is an error in encrypting password',
    //         });
    //     }
    // }

    const transportCompany = {
        companyName: req.body.companyName,
        noOfTrucks: req.body.noOfTrucks,
        mobileNum: req.body.mobileNum,
    };

    const addCompany = await insertTransportCompany(transportCompany);
    const otp = createOTP();
    const token = jwt.sign({ sub: req.body.mobileNum }, secret, {
        expiresIn: 86400, // expires in 24 hours
    });

    // if the insert function failed the it would return a false
    if (addCompany.command === 'INSERT') {
        logger.info(`Transport company ${req.body.companyName} is registered`);

        return res.json({ statusCode: 201,
            message: 'Company registered!',
            details: addCompany.rows,
            ipAddress: parseIp(req),
            // eslint-disable-next-line object-shorthand
            otp: otp,
            // eslint-disable-next-line object-shorthand
            token: token });
    }

    return res.json({ statusCode: 400,
        message: addCompany.detail,
        ipAddress: parseIp(req) });


    // const token = jwtTruckowner(newUser.rows[0].truckowner_id);
};

module.exports = transportCompanyRegister;
