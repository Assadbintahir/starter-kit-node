import { helloWorld } from './test/controller';

export const testRoutes = router => {
  router.get('/api/v1/test', helloWorld);
};
