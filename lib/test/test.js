export const indexTest = name =>
  new Promise(resolve => {
    global.logger('lib/test: ', 'Endpoint is called');
    resolve({ message: `Hello ${name}` });
  });
