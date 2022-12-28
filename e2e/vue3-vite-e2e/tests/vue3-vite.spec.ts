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
      `apps/${app}/tsconfig.ts`,
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

  describe('--path', () => {
    it('should use local path alias by default', async () => {
      // Create app
      const app = uniq('vue3-vite');
      await runNxCommandAsync(`generate nx-vue3-vite:app ${app}`);

      // Read paths
      const tsconfigJson = readJson(`apps/${app}/tsconfig.json`);
      const { paths } = tsconfigJson.compilerOptions;

      // Verify `tsconfigJson.compilerOptions.paths`
      expect(Object.keys(paths)).toHaveLength(3);
      expect(paths).toMatchObject({
        '@assets/*': ['./src/assets/*'],
        '@app/*': ['./src/app/*'],
        '@public/*': ['./src/public/*'],
      });
    });

    it('should use local path alias when the value of `path` option equals to "local"', async () => {
      // Create app
      const app = uniq('vue3-vite');
      await runNxCommandAsync(`generate nx-vue3-vite:app ${app} --path local`);

      // Read paths
      const tsconfigJson = readJson(`apps/${app}/tsconfig.json`);
      const { paths } = tsconfigJson.compilerOptions;

      // Verify `tsconfigJson.compilerOptions.paths`
      expect(Object.keys(paths)).toHaveLength(3);
      expect(paths).toMatchObject({
        '@assets/*': ['./src/assets/*'],
        '@app/*': ['./src/app/*'],
        '@public/*': ['./src/public/*'],
      });
    });

    it('should use global path alias when the value of `path` option equals to "global"', async () => {
      // Create app
      const app = uniq('vue3-vite');
      await runNxCommandAsync(`generate nx-vue3-vite:app ${app} --path global`);

      // Read paths
      const tsconfigJson = readJson(`apps/${app}/tsconfig.json`);
      const { paths } = tsconfigJson.compilerOptions;

      // Verify `tsconfigJson.compilerOptions.paths`
      expect(Object.keys(paths)).toHaveLength(0);
      expect(paths).toMatchObject({});
    });

    it('should fail when `path` is not a valid value', async () => {
      // Create app
      const app = uniq('vue3-vite');
      const wrongValue = 'hello';
      const createAppCommand = `generate nx-vue3-vite:app ${app} --path ${wrongValue}`;

      // Expect it to throw an error
      await expect(runNxCommandAsync(createAppCommand)).rejects.toThrow();

      // Silence error to verify error message, because the error message thrown
      // by `runNxCommandAsync` looks like `Command failed: {command}`, which is
      // not detailed enough.
      const result = await runNxCommandAsync(createAppCommand, {
        silenceError: true,
      });
      expect(result.stdout).toContain(
        `Property 'path' does not match the schema. '${wrongValue}' should be one of local,global.`
      );
    });
  });
});
