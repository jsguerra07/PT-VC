const winston = require("winston")
const {createLogger, format, transports} = require("winston")

module.exports = createLogger({
    format: format.combine(format.printf(info => `${JSON.stringify(info)}`)),
    //format: winston.format.json(),
    transports: [
        new transports.File({
            filename: `${__dirname}/../logs/logapi.log`
        }),
        new transports.Console({
            level: "info"
        })

    ]
})