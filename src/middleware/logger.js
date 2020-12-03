const winston = require('winston');

const logger = winston.createLogger({
    customer: [
        new winston.transports.File({
            level: 'info',
            filename: 'logs/customer',
            json: true,
            format: winston.format.combine(winston.format.timestamp(),
                winston.format.json()),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'logs/customer' }),
            ],
        }),
    ],
});

module.exports = logger;
