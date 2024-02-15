import { Request } from 'express';

export type RequestWithRequestID = {
    requestID?: string;
} & Request;
