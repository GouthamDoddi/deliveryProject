const jwt = require('jsonwebtoken');
const { getTruckowner } = require('../services/truckownerServices');
const Bcrypt = require('bcrypt');
const winston = require('winston');
const parseIp = require('../middleware/praseIp');


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

const truckOwnerLogin = async (req, res) => {
    const result = await getTruckowner(req.body.mobileNum);
    const secret = '!@#DWe$%^gge&&**';

    console.log(result);


    if (!result.rowCount) {
        console.log('No user found');
        logger.info('Username not found in database');

        return res.json({ statusCode: 404,
            message: 'Error! User is not found.' });
    }

    // if rowCount > 0 .i.e if any user was matched

    console.log('truckOwner found');
    logger.info('truckOwner is found in the database!');

    // since a user was found lets check if the passwords match
    return Bcrypt.compare(req.body.password, result.rows[0].password).then(
        onfullfilled => {
            console.log(onfullfilled);
            if (onfullfilled) {
                console.log('truckOwner authenticated');
                logger.info('passwords matched!, truckOwner authenticated !');

                const token = jwt.sign({ sub: req.body.mobileNum }, secret, {
                    expiresIn: 86400, // expires in 24 hours
                });

                // res.statusCode(200);

                logger.info('truckOwner authorized!, 200');

                return res.json({
                    statusCode: 200,
                    message: 'truckOwner authorized',
                    token,
                    ipAddress: parseIp(req),
                });
            }
            logger.info('truckOwner unauthorized!, 401');

            return res.json({ statusCode: 401,
                error: 'truckOwner unothorized',
                msg: 'invalid password',
                ipAddress: parseIp(req) });
        },
    );
};

module.exports = truckOwnerLogin;
