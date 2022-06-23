import { devServer } from '@cypress/vite-dev-server';

module.exports = (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
) => {
  on('dev-server:start', (options: Cypress.DevServerConfig) =>
    devServer(options)
  );

  return config;
};
