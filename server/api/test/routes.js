import { helloWorld } from './controller';

export const testRoutes = router => {
  router.get('/api/v1/test', helloWorld);
};
