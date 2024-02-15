import { NextFunction, Response } from 'express';
import { RequestWithRequestID } from '../types';
import { AppLogger, extractRelativeFilePath } from '../utils';

const logger = AppLogger.getLogger(extractRelativeFilePath(__filename));
export const errorHandler = function () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (err: Error, req: RequestWithRequestID, res: Response, _: NextFunction) => {
        if (process.env.NODE_ENV !== 'test') {
            logger.error(`Error in request id ${req.requestID}:`, {
                errorName: err.name,
                errStack: err.stack,
                errMessage: err.message,
                url: req.url,
            });
        }

        /**
         * If required, do message scrubbing before returning
         * other type of business errors and custom errors should be handled here.
         */
        res.status(500).json({ message: `Internal Server Error: ${err.message}` });
    };
};
