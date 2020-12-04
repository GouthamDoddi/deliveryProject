const jwt = require('jsonwebtoken');
const { getCustomer } = require('../services/customerServices');
const Bcrypt = require('bcrypt');
const winston = require('winston');

// log4js helps us to create a logfile which contains all the info related
// loging activity. So we can can have data about all the activity that
// has ever happened.
const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: 'logs/login.log',
            json: true,
            format: winston.format.combine(winston.format.timestamp(),
                winston.format.json()),
        }),
    ],
});

// create th logger object

const customerLogin = async (req, res) => {
    const result = await getCustomer(req.body.mobileNum);
    const secret = '!@#DWe$%^gge&&**';

    console.log(result);


    if (!result.rowCount) {
        console.log('No user found');
        logger.info('Username not found in database');

        return res.json({ statusCode: 404,
            message: 'Error! User is not found.' });
    }

    // if rowCount > 0 .i.e if any user was matched

    console.log('customer found');
    logger.info('customer is found in the database!');

    // since a user was found lets check if the passwords match
    return await Bcrypt.compare(req.body.password, result.rows[0].password).then(
        onfullfilled => {
            console.log(onfullfilled);
            if (onfullfilled) {
                console.log('User authenticated');
                logger.info('passwords matched!, User authenticated !');

                const token = jwt.sign({ sub: req.body.mobileNum }, secret, {
                    expiresIn: 86400, // expires in 24 hours
                });

                // res.statusCode(200);

                logger.info('user authorized!, 200');

                return res.json({
                    statusCode: 200,
                    message: 'User authorized',
                    token,
                });
            }
            logger.info('user unauthorized!, 401');

            return res.json({ statusCode: 401,
                error: 'User unothorized',
                msg: 'invalid password' });
        },
    );
};

module.exports = customerLogin;