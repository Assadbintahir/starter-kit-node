import winston, { Logger } from 'winston';
import 'winston-daily-rotate-file';

export class AppLogger {
    private static winstonLogger: Logger;

    private constructor() {
        const { combine, timestamp, json } = winston.format;

        const fileRotateTransport = new winston.transports.DailyRotateFile({
            filename: 'combined-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            dirname: 'logs',
            // update if retention period should be changed
            maxFiles: '14d',
        });

        const errFileRotateTransport = new winston.transports.DailyRotateFile({
            filename: 'combined-error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            level: 'error',
            dirname: 'logs',
            // update if retention period should be changed
            maxFiles: '14d',
        });

        AppLogger.winstonLogger = winston.createLogger({
            format: combine(timestamp(), json()),
            transports: [new winston.transports.Console(), fileRotateTransport, errFileRotateTransport],
        });
    }

    public static getLogger(serviceTag: string): Logger {
        if (!this.winstonLogger) {
            new AppLogger();
        }

        return this.winstonLogger.child({ TAG: serviceTag });
    }
}
