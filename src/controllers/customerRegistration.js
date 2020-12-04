const { insertCustomer } = require('../services/customerServices');
// const { logger } = require('../middleware/logger');
const winston = require('winston');
const bcrypt = require('bcrypt');

const logger = winston.createLogger({
    customer: [
        new winston.transports.File({
            level: 'info',
            filename: 'logs/customer',
            json: true,
            format: winston.format.combine(winston.format.timestamp(),
                winston.format.json()),
        }),
    ],
});

const customerRegister = async (req, res) => {
    // get the customer details from req.body

    // using logger to record activity
    logger.info(`recived register request from customer with mobile number ${req.body.mobileNum}`);


    // using one line promises lets encrypt the password and
    // store it in a var
    const encryptedPassword = await bcrypt.hash(req.body.password, 10)
        .then(hash => hash,
            error => console.log(error));

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
    if (addCustomer) {
        res.status(201)
            .json({ statusCode: 200,
                message: 'User registered!' });
    }
    res.status(409)
        .json({ statusCode: 409,
            message: 'Customer with the details already exists' });


    // const token = jwtCustomer(newUser.rows[0].customer_id);
};

module.exports = customerRegister;
