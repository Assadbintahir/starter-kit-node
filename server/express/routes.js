import path from 'path';
import { testRoutes } from '../api/test/routes';

export const setupRoutes = (app, router) => {
  testRoutes(router);

  // serve the bundle file.
  router.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
  });

  app.use(router);
};
