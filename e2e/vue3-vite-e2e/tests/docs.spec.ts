import {
  checkFilesExist,
  ensureNxProject,
  readFile,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';

jest.setTimeout(60000);

describe('docs e2e', () => {
  beforeEach(() => {
    ensureNxProject('nx-vue3-vite', 'dist/packages/vue3-vite');
  });

  it('should create and build vitepress app', async () => {
    // Create app
    const docs = uniq('docs');
    await runNxCommandAsync(`generate nx-vue3-vite:docs ${docs}`);

    // Check files exist
    checkFilesExist(
      `apps/${docs}/project.json`,
      `apps/${docs}/docs/.vitepress/config.js`,
      `apps/${docs}/docs/guide/index.md`,
      `apps/${docs}/docs/index.md`
    );

    // Build
    const result = await runNxCommandAsync(`build ${docs}`);
    expect(result.stdout).toContain('build complete');
  });

  describe('--title', () => {
    it('should create vitepress app with custom title', async () => {
      // Create app
      const docs = uniq('docs');
      const title = 'My Title';
      await runNxCommandAsync(
        `generate nx-vue3-vite:docs ${docs} --title "${title}"`
      );

      // Check title exists
      const vitePressConfig = readFile(
        `apps/${docs}/docs/.vitepress/config.js`
      );
      expect(vitePressConfig).toContain(`title: '${title}'`);
    });
  });
});
