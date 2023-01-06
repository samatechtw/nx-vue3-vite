import {
  checkFilesExist,
  ensureNxProject,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';

jest.setTimeout(60000);

describe('cypress e2e', () => {
  beforeEach(() => {
    ensureNxProject('nx-vue3-vite', 'dist/packages/vue3-vite');
  });

  it('should create a cypress app', async () => {
    // Create app
    const cypress = uniq('cypress');
    await runNxCommandAsync(`generate nx-vue3-vite:cypress ${cypress}`);

    // Check files exist
    checkFilesExist(
      `apps/${cypress}/project.json`,
      `apps/${cypress}/src/fixtures/example.json`,
      `apps/${cypress}/src/integration/app.spec.ts`,
      `apps/${cypress}/src/plugins/index.js`,
      `apps/${cypress}/src/support/index.ts`
    );
  });

  describe('--project', () => {
    it('should create a cypress app for specified project', async () => {
      // Create vue app
      const vueApp = uniq('vue3-vite');
      await runNxCommandAsync(`generate nx-vue3-vite:app ${vueApp}`);

      // Create cypress app
      await runNxCommandAsync(
        `generate nx-vue3-vite:cypress --project ${vueApp}`
      );
      const cypress = `${vueApp}-e2e`;

      // Check files exist
      checkFilesExist(
        `apps/${cypress}/project.json`,
        `apps/${cypress}/src/fixtures/example.json`,
        `apps/${cypress}/src/integration/app.spec.ts`,
        `apps/${cypress}/src/plugins/index.js`,
        `apps/${cypress}/src/support/index.ts`
      );
    });
  });
});
