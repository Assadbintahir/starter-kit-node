import { Request, Response, NextFunction } from 'express';

export type HealthCheckPayload = {
    uptime: number;
    message: string;
    timestamp: number;
    responseTime: number[];
};

export type IHealthCheckService = {
    getHealthCheckPayload: () => Promise<HealthCheckPayload>;
};

export type IHealthCheckController = {
    healthCheck: (req: Request, res: Response, next: NextFunction) => void;
};

export type IHealthCheckRepo = {
    getHealthCheckData: () => Promise<HealthCheckPayload>;
};
