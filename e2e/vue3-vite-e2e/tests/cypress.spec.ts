import {
  checkFilesExist,
  ensureNxProject,
  runNxCommandAsync,
  uniq,
  cleanup,
} from './utils';

jest.setTimeout(60000);

describe('cypress e2e', () => {
  let proj: string;

  beforeAll(() => {
    proj = uniq('vue3-vite');
    ensureNxProject('nx-vue3-vite', 'dist/packages/vue3-vite', proj);
  });

  afterAll(() => {
    cleanup(proj);
  });

  it('should create a cypress app', async () => {
    // Create app
    const cypress = uniq('cypress');
    await runNxCommandAsync(proj, `generate nx-vue3-vite:cypress ${cypress}`);

    // Check files exist
    checkFilesExist(proj, [
      `apps/${cypress}/project.json`,
      `apps/${cypress}/src/fixtures/example.json`,
      `apps/${cypress}/src/integration/app.spec.ts`,
      `apps/${cypress}/src/plugins/index.js`,
      `apps/${cypress}/src/support/index.ts`,
    ]);
  });

  describe('--project', () => {
    it('should create a cypress app for specified project', async () => {
      // Create vue app
      const vueApp = uniq('vue3-vite');
      await runNxCommandAsync(proj, `generate nx-vue3-vite:app ${vueApp}`);

      // Create cypress app
      await runNxCommandAsync(
        proj,
        `generate nx-vue3-vite:cypress --project ${vueApp}`
      );
      const cypress = `${vueApp}-e2e`;

      // Check files exist
      checkFilesExist(proj, [
        `apps/${cypress}/project.json`,
        `apps/${cypress}/src/fixtures/example.json`,
        `apps/${cypress}/src/integration/app.spec.ts`,
        `apps/${cypress}/src/plugins/index.js`,
        `apps/${cypress}/src/support/index.ts`,
      ]);
    });
  });
});
