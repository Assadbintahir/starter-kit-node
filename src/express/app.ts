import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import helmet from 'helmet';
import http from 'http';
import dotenv from 'dotenv';
import { appendRequestID, errorHandler } from '../middlewares';
import { AppLogger, extractRelativeFilePath } from '../utils';

dotenv.config();

let server: http.Server;
const logger = AppLogger.getLogger(extractRelativeFilePath(__filename));

/**
 * Bootstrap express application
 */
export const startApp = async () => {
    const app = express();

    app.use(compression());
    app.use(helmet());
    app.use(methodOverride());
    app.use(appendRequestID());
    app.use(
        cors({
            // add origin for respective environment
            origin: process.env.origin || 'http://localhost:3000',
        })
    );

    if (['development', 'test'].includes(process.env.NODE_ENV || '')) {
        app.use(morgan('combined'));
    }

    const { setupRoutes } = await import('./routes');
    setupRoutes(app);
    app.use(errorHandler());

    server = http.createServer(app);
    return server.listen(process.env.PORT, () => {
        logger.info(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
    });
};

/**
 * stops express application
 * @param callback
 */
export const stopApp = (callback: () => void) => {
    server.close(() => {
        callback();
    });
};
