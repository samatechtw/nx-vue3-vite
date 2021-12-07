import {
  checkFilesExist,
  ensureNxProject,
  listFiles,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';

describe('vue3-vite e2e', () => {
  it('should create and build vue3-vite app', async () => {
    const plugin = uniq('vue3-vite');
    ensureNxProject('nx-vue3-vite', 'dist/packages/vue3-vite');
    await runNxCommandAsync(`generate nx-vue3-vite:app ${plugin}`);

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Build complete');
  }, 120000);

  describe('--directory', () => {
    it('should create app in the specified directory and add tags to nx.json', async () => {
      const plugin = uniq('vue3-vite');
      ensureNxProject('nx-vue3-vite', 'dist/packages/vue3-vite');
      await runNxCommandAsync(
        `generate nx-vue3-vite:app ${plugin} --directory subdir/${plugin}  --tags e2etag,e2ePackage`
      );

      expect(() =>
        checkFilesExist(`apps/subdir/${plugin}/vite.config.ts`)
      ).not.toThrow();
      const projectJson = readJson(`apps/subdir/${plugin}/project.json`);
      expect(projectJson.tags).toEqual(['e2etag', 'e2ePackage']);
    }, 120000);
  });
});
