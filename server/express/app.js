import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import compression from 'compression';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import passport from 'passport';
import http from 'http';
import path from 'path';
import { setupRoutes } from './routes';
import errorHandler from './middleware/errorhandler';

const db = {};

let server;

const TAG = '/server/express/app.js';

export const startApp = () => {
  const app = express();
  mongoose.connect(global.config.mongo.uri, global.config.mongo.options);
  global.db = db;

  app.use(compression());
  app.use(helmet());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, '../../client/build')));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());
  setupRoutes(app, express.Router());
  app.use(errorHandler());

  if (global.config.env === 'dev' || global.config.env === 'test') {
    app.use(morgan('dev'));
  }

  server = http.createServer(app);
  // const socket = require('socket.io').listen(server)
  server.listen(global.config.port, () => {
    global.logger(
      TAG,
      `Campster server started on ${global.config.port} in ${global.config.env} mode.`
    );
  });
  // require('./socketio').setup(socket)

  if (global.config.env === 'prod') {
    console.log(
      `Campster server started on ${global.config.port} in ${global.config.env} mode.`
    );
  }
};

export const stopApp = callback => {
  server.close(() => {
    callback();
  });
};
