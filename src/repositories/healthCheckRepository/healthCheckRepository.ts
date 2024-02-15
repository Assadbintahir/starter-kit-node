import { HealthCheckPayload, IHealthCheckRepo } from '../../types';

export class HealthCheckRepository implements IHealthCheckRepo {
    // inject repo dependencies here
    constructor() {}

    /**
     * returns service health check report
     * @returns HealthCheckPayload
     */
    async getHealthCheckData(): Promise<HealthCheckPayload> {
        // in real world scenario, it will fetch from DB
        return {
            uptime: process.uptime(),
            message: 'OK: API V1 is running',
            timestamp: Date.now(),
            responseTime: process.hrtime(),
        };
    }
}
