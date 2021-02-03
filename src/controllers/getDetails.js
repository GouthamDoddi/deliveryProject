const winston = require('winston');

const { getCustomer, getCustomerWithId } = require('../services/customerServices');
const { getTruckowner, getTruckownerWithId } = require('../services/truckownerServices');
const { getTransportCompanyWithId, getTransportCompany } = require('../services/transportCompanyServices');
const parseIp = require('../middleware/praseIp');

const log = winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: 'logs/other-reqs.log',
            json: true,
            format: winston.format.combine(winston.format.timestamp(),
                winston.format.json()),
        }),
    ],
});

const getCustomerDetails = async (req, res) => {
    const { customerId, mobileNum } = req.body;

    log.info(`Received get customer details req from ip=${parseIp(req)} with the following
    params mobileNum = ${mobileNum} or customerId = ${customerId}`);

    const result = customerId
        ? await getCustomerWithId(customerId)
        : await getCustomer(mobileNum);

    return result.rowCount
        ? res.json({
            statusCode: 200,
            details: result.rows,
        })
        : res.json({
            statusCode: 404,
            message: 'User not found',
        });
};


const getTruckOwnerDetails = async (req, res) => {
    const { ownerId, mobileNum } = req.body;

    log.info(`Received get customer details req from ip=${parseIp(req)} with the following
    params mobileNum = ${mobileNum} or customerId = ${ownerId}`);

    const result = ownerId
        ? await getTruckownerWithId(ownerId)
        : await getTruckowner(mobileNum);

    return result.rowCount
        ? res.json({
            statusCode: 200,
            details: result.rows,
        })
        : res.json({
            statusCode: 404,
            message: 'User not found',
        });
};


const getTransportCompanyDetails = async (req, res) => {
    const { customerId, mobileNum } = req.body;

    log.info(`Received get customer details req from ip=${parseIp(req)} with the following
    params mobileNum = ${mobileNum} or customerId = ${customerId}`);

    const result = customerId
        ? await getTransportCompanyWithId(customerId)
        : await getTransportCompany(mobileNum);

    return result.rowCount
        ? res.json({
            statusCode: 200,
            details: result.rows,
        })
        : res.json({
            statusCode: 404,
            message: 'User not found',
        });
};

module.exports = { getCustomerDetails, getTruckOwnerDetails, getTransportCompanyDetails };
