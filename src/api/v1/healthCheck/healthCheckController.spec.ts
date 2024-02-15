import supertest from 'supertest';
import { Server } from 'http';
import { startApp, stopApp } from '../../../express/app';
import { MockHealthCheckService } from '../../../mocks';

describe('HealthCheckController Integration Tests', () => {
    let express: Server;

    describe('HealthCheckController Success Scenarios', () => {
        beforeEach(async () => {
            express = await startApp();
        });

        afterEach((done) => {
            jest.resetAllMocks();
            express.close(done);
            stopApp(jest.fn());
        });

        it('should return health check payload', async () => {
            const { status, body } = await supertest(express).get('/api/v1/healthCheck');
            expect(status).toBe(200);
            expect(body.message).toBe('OK: API V1 is running');
        });
    });

    describe('HealthCheckController Error Scenarios', () => {
        const errorMessage = 'Error while checking service health';
        beforeEach(async () => {
            jest.resetModules();

            jest.mock('../../../services', () => {
                const originalModule = jest.requireActual('../../../services');

                //Mock the service method to throw error
                return {
                    __esModule: true,
                    ...originalModule,
                    HealthCheckService: MockHealthCheckService,
                };
            });

            express = await startApp();
        });

        afterEach((done) => {
            jest.resetAllMocks();
            express.close(done);
            stopApp(jest.fn());
        });

        it('should throw error', async () => {
            const { status, body } = await supertest(express).get('/api/v1/healthCheck');
            expect(status).toBe(500);
            expect(body.message).toBe(`Internal Server Error: ${errorMessage}`);
        });
    });
});
