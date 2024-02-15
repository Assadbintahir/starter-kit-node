import { Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { RequestWithRequestID } from '../types';

export const appendRequestID = function () {
    return function (req: RequestWithRequestID, _: Response, next: NextFunction) {
        req.requestID = uuidv4();
        next();
    };
};
