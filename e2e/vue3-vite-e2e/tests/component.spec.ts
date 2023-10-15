import { names } from '@nx/devkit';
import {
  checkFilesExist,
  cleanup,
  ensureNxProject,
  runNxCommandAsync,
  uniq,
} from './utils';

jest.setTimeout(60000);

describe('component e2e', () => {
  let proj: string;

  beforeAll(() => {
    proj = uniq('vue3-vite');
    ensureNxProject('nx-vue3-vite', 'dist/packages/vue3-vite', proj);
  });

  afterAll(() => {
    cleanup(proj);
  });

  it('should create component', async () => {
    // Create app
    const app = uniq('vue3-vite-cmp');
    await runNxCommandAsync(proj, `generate nx-vue3-vite:app ${app}`);

    // Create component
    const component = uniq('component');
    await runNxCommandAsync(
      proj,
      `generate nx-vue3-vite:component ${component} --project ${app} --style postcss --lang ts`,
    );

    // Check file exists
    const componentName = names(component).className;
    checkFilesExist(proj, [
      `apps/${app}/src/app/components/${componentName}.cy.ts`,
      `apps/${app}/src/app/components/${componentName}.vue`,
    ]);
  });

  describe('--project', () => {
    it('should create component in the specified app', async () => {
      // Create projects
      const app = uniq('vue3-vite-cmp');
      const library = uniq('library-cmp');
      await runNxCommandAsync(proj, `generate nx-vue3-vite:app ${app}`);
      await runNxCommandAsync(proj, `generate nx-vue3-vite:library ${library}`);

      // Create components
      const componentForApp = uniq('component-for-app');
      const componentForLibrary = uniq('component-for-library');
      await runNxCommandAsync(
        proj,
        [
          `generate nx-vue3-vite:component ${componentForApp}`,
          `--project ${app}`,
          '--style postcss',
          '--lang ts',
        ].join(' '),
      );
      await runNxCommandAsync(
        proj,
        [
          `generate nx-vue3-vite:component ${componentForLibrary}`,
          `--project ${library}`,
          '--style postcss',
          '--lang ts',
        ].join(' '),
      );

      // Check files exist
      const componentNameForApp = names(componentForApp).className;
      const componentNameForLibrary = names(componentForLibrary).className;
      checkFilesExist(proj, [
        `apps/${app}/src/app/components/${componentNameForApp}.cy.ts`,
        `apps/${app}/src/app/components/${componentNameForApp}.vue`,
        `libs/${library}/src/lib/${componentNameForLibrary}.cy.ts`,
        `libs/${library}/src/lib/${componentNameForLibrary}.vue`,
      ]);
    });
  });

  describe('--directory', () => {
    it('should create component in the specified directory of an app', async () => {
      // Create app
      const app = uniq('vue3-vite-cmp');
      await runNxCommandAsync(proj, `generate nx-vue3-vite:app ${app}`);

      // Create component
      const component = uniq('component');
      await runNxCommandAsync(
        proj,
        [
          `generate nx-vue3-vite:component ${component}`,
          `--project ${app}`,
          '--directory mydirectory',
          '--style postcss',
          '--lang ts',
        ].join(' '),
      );

      // Check file exists
      const componentName = names(component).className;
      checkFilesExist(proj, [
        `apps/${app}/src/mydirectory/${componentName}.cy.ts`,
        `apps/${app}/src/mydirectory/${componentName}.vue`,
      ]);
    });

    it('should create component in the specified directory of a library', async () => {
      // Create a library
      const library = uniq('library');
      await runNxCommandAsync(proj, `generate nx-vue3-vite:library ${library}`);

      // Create a component
      const component = uniq('component');
      const directory = 'some/random/library';
      await runNxCommandAsync(
        proj,
        [
          `generate nx-vue3-vite:component ${component}`,
          `--project ${library}`,
          `--directory ${directory}`,
          '--style postcss',
          '--lang ts',
        ].join(' '),
      );

      // Check files exist
      const componentName = names(component).className;
      checkFilesExist(proj, [
        `libs/${library}/src/${directory}/${componentName}.cy.ts`,
        `libs/${library}/src/${directory}/${componentName}.vue`,
      ]);
    });
  });
});
