import { names } from '@nrwl/devkit';
import {
  checkFilesExist,
  ensureNxProject,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';

jest.setTimeout(60000);

describe('component e2e', () => {
  it('should create component', async () => {
    // Create app
    const app = uniq('vue3-vite-cmp');
    ensureNxProject('nx-vue3-vite', 'dist/packages/vue3-vite');
    await runNxCommandAsync(`generate nx-vue3-vite:app ${app}`);

    // Create component
    const component = uniq('component');
    await runNxCommandAsync(
      `generate nx-vue3-vite:component ${component} --project ${app} --style postcss --lang ts`
    );

    // Check file exists
    const componentName = names(component).className;
    checkFilesExist(
      `apps/${app}/src/components/${componentName}.cy.ts`,
      `apps/${app}/src/components/${componentName}.vue`
    );
  });

  describe('--project', () => {
    it('should create component in the specified project', async () => {
      // Create apps
      const firstApp = uniq('first-vue3-vite-cmp');
      const secondApp = uniq('second-vue3-vite-cmp');
      await runNxCommandAsync(`generate nx-vue3-vite:app ${firstApp}`);
      await runNxCommandAsync(`generate nx-vue3-vite:app ${secondApp}`);

      // Create components
      const firstComponent = uniq('first-component');
      const secondComponent = uniq('second-component');
      await runNxCommandAsync(
        [
          `generate nx-vue3-vite:component ${firstComponent}`,
          `--project ${firstApp}`,
          '--style postcss',
          '--lang ts',
        ].join(' ')
      );
      await runNxCommandAsync(
        [
          `generate nx-vue3-vite:component ${secondComponent}`,
          `--project ${secondApp}`,
          '--style postcss',
          '--lang ts',
        ].join(' ')
      );

      // Check file exists
      const firstComponentName = names(firstComponent).className;
      const secondComponentName = names(secondComponent).className;
      checkFilesExist(
        `apps/${firstApp}/src/components/${firstComponentName}.cy.ts`,
        `apps/${firstApp}/src/components/${firstComponentName}.vue`,
        `apps/${secondApp}/src/components/${secondComponentName}.cy.ts`,
        `apps/${secondApp}/src/components/${secondComponentName}.vue`
      );
    });
  });

  describe('--directory', () => {
    it('should create component in the specified directory', async () => {
      // Create app
      const app = uniq('vue3-vite-cmp');
      await runNxCommandAsync(`generate nx-vue3-vite:app ${app}`);

      // Create component
      const component = uniq('component');
      await runNxCommandAsync(
        [
          `generate nx-vue3-vite:component ${component}`,
          `--project ${app}`,
          '--directory mydirectory',
          '--style postcss',
          '--lang ts',
        ].join(' ')
      );

      // Check file exists
      const componentName = names(component).className;
      checkFilesExist(
        `apps/${app}/src/mydirectory/${componentName}.cy.ts`,
        `apps/${app}/src/mydirectory/${componentName}.vue`
      );
    });
  });
});
