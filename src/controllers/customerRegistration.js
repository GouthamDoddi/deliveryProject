const winston = require('winston');

const { insertCustomer } = require('../services/customerServices');
const encryptPassword = require('../middleware/encryptPass');
const parseIp = require('../middleware/praseIp');
const createOTP = require('../utils/createOTP');

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: 'logs/customer.log',
            json: true,
            format: winston.format.combine(winston.format.timestamp(),
                winston.format.json()),
        }),
    ],
});

const customerRegister = async (req, res) => {
    const otp = createOTP();
    // get the customer details from req.body

    // using logger to record activity
    logger.info(`received register request from customer with mobile number ${req.body.mobileNum} 
    and id address = ${parseIp(req)} `);


    // using one line promises lets encrypt the password and
    // store it in a var
    if (req.body.password) {
        var encryptedPassword = await encryptPassword(req.body.password);
        if (!encryptPassword) {
            return res.json({
                statusCode: 500,
                message: 'There is an error in encrypting password',
            });
        }
    }

    // storing all the customer data in one object to use it as a parameter
    const customerDetails = {
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

    const addCustomer = await insertCustomer(customerDetails);

    // if the insert function failed the it would return a false
    if (addCustomer.command === 'INSERT') {
        logger.info(`Customer with mobile number  ${req.body.mobileNum} registered`);

        return res.status(201)
            .json({ statusCode: 200,
                message: 'User registered!',
                details: [ ...addCustomer.rows, otp ],
                ipAddress: parseIp(req) });
    }

    return res.status(400)
        .json({ statusCode: 400,
            message: addCustomer.detail,
            ipAddress: parseIp(req) });


    // const token = jwtCustomer(newUser.rows[0].customer_id);
};

module.exports = customerRegister;
