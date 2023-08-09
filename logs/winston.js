const winston = require('winston');

const winstonRotate = require("winston-daily-rotate-file")

const getlogger =() =>{
    try{
        return winston.createLogger({
            transports:[
                new winston.transports.DailyRotateFile({
                    filename:"user-%DATE%.log",
                    frequency:"5m",
                    datePattern: "YYYY-MM-DD-HH-mm",
                    maxSize:"1k",
                    maxFiles: 5,
                    dirname:"errorlogs"
                })
            ]
        })

    }catch(error){
        console.log("error in getlogger() : " + error)

    }
}


module.exports = getlogger;
