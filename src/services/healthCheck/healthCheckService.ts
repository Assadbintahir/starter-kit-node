import { HealthCheckPayload, IHealthCheckRepo, IHealthCheckService } from '../../types';

export class HealthCheckService implements IHealthCheckService {
    private healthCheckRepo: IHealthCheckRepo;
    // inject service dependencies here
    constructor(healthCheckRepo: IHealthCheckRepo) {
        this.healthCheckRepo = healthCheckRepo;
    }

    /**
     * returns service health check report
     * @returns HealthCheckPayload
     */
    getHealthCheckPayload(): Promise<HealthCheckPayload> {
        return this.healthCheckRepo.getHealthCheckData();
    }
}
