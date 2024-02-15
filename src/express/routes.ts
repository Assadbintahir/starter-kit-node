import { Express } from 'express';
import { HealthCheckRoutes } from '../api/v1';
import { RouteConstants, RoutePrefix } from './routeConstants';

/**
 *
 * @param app Express
 */

export const setupRoutes = (app: Express) => {
    const healthCheck = HealthCheckRoutes();

    app.use(`${RoutePrefix}/${RouteConstants.HEALTH_CHECK}`, healthCheck);
};
