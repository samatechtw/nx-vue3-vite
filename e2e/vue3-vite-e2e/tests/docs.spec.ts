import {
  checkFilesExist,
  cleanup,
  ensureNxProject,
  readFile,
  runNxCommandAsync,
  uniq,
} from './utils';

jest.setTimeout(60000);

describe('docs e2e', () => {
  let proj: string;

  beforeAll(() => {
    proj = uniq('vue3-vite');
    ensureNxProject('nx-vue3-vite', 'dist/packages/vue3-vite', proj);
  });

  afterAll(() => {
    cleanup(proj);
  });

  it('should create and build vitepress app', async () => {
    // Create app
    const docs = uniq('docs');
    await runNxCommandAsync(proj, `generate nx-vue3-vite:docs ${docs}`);

    // Check files exist
    checkFilesExist(proj, [
      `apps/${docs}/project.json`,
      `apps/${docs}/docs/.vitepress/config.js`,
      `apps/${docs}/docs/guide/index.md`,
      `apps/${docs}/docs/index.md`,
    ]);

    // Build
    const result = await runNxCommandAsync(proj, `build ${docs}`);
    expect(result.stdout).toContain('build complete');
  });

  describe('--title', () => {
    it('should create vitepress app with custom title', async () => {
      // Create app
      const docs = uniq('docs');
      const title = 'My Title';
      await runNxCommandAsync(
        proj,
        `generate nx-vue3-vite:docs ${docs} --title "${title}"`
      );

      // Check title exists
      const vitePressConfig = readFile(
        proj,
        `apps/${docs}/docs/.vitepress/config.js`
      );
      expect(vitePressConfig).toContain(`title: '${title}'`);
    });
  });
});
