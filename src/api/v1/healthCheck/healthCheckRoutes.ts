import express, { Router } from 'express';
import { HealthCheckController } from './healthCheckController';
import { HealthCheckService } from '../../../services';
import { HealthCheckRepository } from '../../../repositories/healthCheckRepository/healthCheckRepository';
/**
 * sets up HealthCheck controller & API Routes
 */
export const HealthCheckRoutes = (): Router => {
    const router = express.Router();

    const healthCheckRepo = new HealthCheckRepository();
    const healthCheckService = new HealthCheckService(healthCheckRepo);
    const controller = new HealthCheckController(healthCheckService);

    router.get(`/`, controller.healthCheck);

    return router;
};
