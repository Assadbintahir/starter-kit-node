import path from 'path';
import merge from 'lodash/merge';
import dev from './dev';
import prod from './prod';

const all = {
  env: process.env.NODE_ENV || 'dev',
  secrets: {
    session: process.env.SESSION_SECRET || 'some string',
  },
  // Project root path
  root: path.normalize(`${__dirname}/../../..`),
  // Server port
  port: process.env.PORT || 3000,
  ip: process.env.IP || undefined,
  domain: `${process.env.DOMAIN || 'https://campster.kibopush.com'}`,
};

const envSpecificConfig = () => (process.env.NODE_ENV === 'dev' ? dev : prod);

export default merge(all, envSpecificConfig());
