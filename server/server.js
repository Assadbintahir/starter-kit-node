import debug from 'debug';
import { startApp, stopApp } from './express/app';
import config from './config/environment';

global.config = config;
global.project = 'campster';

const logger = function(label, data) {
  const namespace = `campster:${label}`;
  const loggerInstance = debug(namespace);

  if (global.config.env === 'dev' || global.config.env === 'test') {
    loggerInstance(data);
  } else {
    // Send logs to some logging server
  }
};

// app close func
const appOut = () => {
  global.logger('Process-Exit: ', 'going to terminate the process');
  stopApp(() => {
    process.exit();
  });
  setTimeout(function() {
    process.exit();
  }, 10000);
};

// logger trace func
const exceptionHandler = error => {
  global.logger('Uncaught Exception: ', error.stack);
};

global.logger = logger;
startApp();
process.on('SIGTERM', appOut);
process.on('SIGINT', appOut);
process.on('uncaughtException', exceptionHandler);
