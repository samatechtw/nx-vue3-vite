import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';

jest.setTimeout(60000);

describe('vue3-vite e2e', () => {
  it('should create and build vue3-vite app', async () => {
    // Create app
    const app = uniq('vue3-vite');
    ensureNxProject('nx-vue3-vite', 'dist/packages/vue3-vite');
    await runNxCommandAsync(`generate nx-vue3-vite:app ${app}`);

    // Check files exist
    checkFilesExist(
      `apps/${app}/index.html`,
      `apps/${app}/project.json`,
      `apps/${app}/src/app/main.ts`,
      `apps/${app}/vite.config.ts`
    );

    // Build app
    const result = await runNxCommandAsync(`build ${app}`);
    expect(result.stdout).toContain('Build complete');
  });

  it('should pass lint check', async () => {
    // Create app
    const app = uniq('vue3-vite');
    await runNxCommandAsync(`generate nx-vue3-vite:app ${app}`);

    // Lint
    const lintResult = await runNxCommandAsync(`lint ${app}`);
    expect(lintResult.stdout).toContain('All files pass linting.');
  });

  describe('--directory', () => {
    it('should create app in the specified directory and add tags to nx.json', async () => {
      const plugin = uniq('vue3-vite');
      ensureNxProject('nx-vue3-vite', 'dist/packages/vue3-vite');
      await runNxCommandAsync(
        `generate nx-vue3-vite:app ${plugin} --directory subdir/${plugin} --tags e2etag,e2ePackage`
      );

      expect(() =>
        checkFilesExist(`apps/subdir/${plugin}/vite.config.ts`)
      ).not.toThrow();
      const projectJson = readJson(`apps/subdir/${plugin}/project.json`);
      expect(projectJson.tags).toEqual(['e2etag', 'e2ePackage']);
    });
  });
});
