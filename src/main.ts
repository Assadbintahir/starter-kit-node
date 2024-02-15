import { startApp, stopApp } from './express/app';
import { AppLogger, extractRelativeFilePath } from './utils';

const logger = AppLogger.getLogger(extractRelativeFilePath(__filename));

/**
 * Gracefully shutdown the server
 * Best Practice: handle any pending tasks i.e. handling events in queues or in transit requests
 */
const appOut = () => {
    logger.info('Gracefully exiting the app');

    stopApp(() => {
        process.exit(0);
    });
    setTimeout(function () {
        process.exit(0);
    }, 10000);
};

/**
 * logging unhandled exceptions
 * @param error Error
 */
const exceptionHandler = (error: Error) => {
    logger.error('Encountered uncaught exception', {
        error,
    });
};

(async () => {
    await startApp();
})();

// handle exceptions and quit signals.
process.on('SIGTERM', appOut);
process.on('SIGINT', appOut);
process.on('uncaughtException', exceptionHandler);
