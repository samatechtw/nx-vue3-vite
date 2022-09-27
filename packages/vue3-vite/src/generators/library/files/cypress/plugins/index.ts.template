import { devServer } from '@cypress/vite-dev-server';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
module.exports = (on: any, config: any) => {
  on('dev-server:start', (options: Cypress.DevServerConfig) =>
    devServer(options)
  );

  return config;
};
