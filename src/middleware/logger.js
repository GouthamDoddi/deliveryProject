const winston = require('winston');

const logger = filename =>
    winston.createLogger({
        customer: [
            new winston.transports.File({
                level: 'info',
                filename,
                json: true,
                format: winston.format.combine(winston.format.timestamp(),
                    winston.format.json()),
                transports: [
                    new winston.transports.Console(),
                    new winston.transports.File({ filename }),
                ],
            }),
        ],
    });

module.exports = logger;
