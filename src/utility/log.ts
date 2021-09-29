import path from 'path';
import { createLogger, transports, format } from 'winston';

const { combine, timestamp, printf } = format;

let loggerPath = null;

const formatLog = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] [${level}]: ${message}`;
});

if (process.env.NODE_ENV === 'development') {
    //NOTE: 开发
    loggerPath = path.resolve('.', './logs');
} else {
    //NOTE: 生产
    loggerPath = path.resolve(process.cwd(), './logs');
}

const logger = createLogger({
    format: combine(
        timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
        formatLog
    ),
    transports: [
        new transports.File({
            filename: loggerPath,
            maxsize: 524288
        })
    ]
});

export default logger;