const winston = require('winston');

const { insertTransportCompany } = require('../services/transportCompanyServices');


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
    logger.info(`received register request from transportCompany ${req.body.companyName}`);


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

    // if the insert function failed the it would return a false
    if (addCompany.command === 'INSERT') {
        logger.info(`Transport company ${req.body.companyName} is registered`);

        return res.json({ statusCode: 201,
            message: 'Company registered!' });
    }

    return res.json({ statusCode: 400,
        message: addCompany.detail });


    // const token = jwtTruckowner(newUser.rows[0].truckowner_id);
};

module.exports = transportCompanyRegister;
