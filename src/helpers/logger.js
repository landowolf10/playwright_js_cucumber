import winston from "winston";

const { combine, timestamp, printf, colorize } = winston.format;

//Formats the logger.
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] ${message}`;
});

//Creates the logger to use it in the framework and creates log files.
export const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
  ),
  transports: [

    new winston.transports.Console({
      format: combine(colorize(), timestamp(), logFormat)
    }),

    new winston.transports.File({
      filename: "reports/logs/error.log",
      level: "error"
    }),

    new winston.transports.File({
      filename: "reports/logs/combined.log"
    })
  ]
});