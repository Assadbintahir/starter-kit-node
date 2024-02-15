import { Request, Response, NextFunction } from 'express';
import { IHealthCheckController, IHealthCheckService } from '../../../types';

export class HealthCheckController implements IHealthCheckController {
    private healthCheckService: IHealthCheckService;
    // inject controller dependencies here
    constructor(healthCheckService: IHealthCheckService) {
        this.healthCheckService = healthCheckService;
    }

    /**
     * GET HealthCheck Handler
     * @param _ Request
     * @param res Response
     * @param next NextFunction
     */
    public healthCheck = async (_: Request, res: Response, next: NextFunction) => {
        try {
            const healthCheck = await this.healthCheckService.getHealthCheckPayload();
            res.status(200).json(healthCheck);
        } catch (err) {
            next(err);
        }
    };
}
