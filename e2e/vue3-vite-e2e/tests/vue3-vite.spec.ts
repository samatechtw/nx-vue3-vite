import {
  checkFilesExist,
  ensureNxProject,
  readFile,
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
      `apps/${app}/postcss.config.js`,
      `apps/${app}/project.json`,
      `apps/${app}/src/app/main.ts`,
      `apps/${app}/tsconfig.json`,
      `apps/${app}/vite.config.ts`,
      `.prettierrc`,
      `nx.json`,
      `package.json`,
      `tsconfig.base.json`
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

  describe('--alias', () => {
    it('should use global path alias by default', async () => {
      // Create app
      const app = uniq('vue3-vite');
      await runNxCommandAsync(`generate nx-vue3-vite:app ${app}`);

      // Read paths
      const tsConfigJson = readJson(`apps/${app}/tsconfig.json`);
      const { baseUrl, paths } = tsConfigJson.compilerOptions;

      // Verify `tsConfigJson.compilerOptions.paths`
      expect(baseUrl).toBeUndefined();
      expect(paths).toBeUndefined();

      // Verify `vite.config.ts`
      const viteConfig = readFile(`apps/${app}/vite.config.ts`);
      expect(viteConfig).toContain(
        "import tsconfigBase from '../../tsconfig.base.json'"
      );
      expect(viteConfig).toContain("const rootOffset = '../..'");
      expect(viteConfig).toContain(
        'const tsconfigBaseAliases = (): Record<string, string> => {'
      );
      expect(viteConfig).toContain('...tsconfigBaseAliases(),');
      expect(viteConfig).toContain('// Add your alias here.');
    });

    it('should use local path alias when `alias` equals to "local"', async () => {
      // Create app
      const app = uniq('vue3-vite');
      await runNxCommandAsync(`generate nx-vue3-vite:app ${app} --alias local`);

      // Read paths
      const tsConfigJson = readJson(`apps/${app}/tsconfig.json`);
      const { paths } = tsConfigJson.compilerOptions;

      // Verify `tsConfigJson.compilerOptions.paths`
      expect(Object.keys(paths)).toHaveLength(3);
      expect(paths).toMatchObject({
        '@assets/*': ['./src/assets/*'],
        '@app/*': ['./src/app/*'],
        '@public/*': ['./src/public/*'],
      });

      // Verify `vite.config.ts`
      const viteConfig = readFile(`apps/${app}/vite.config.ts`);
      expect(viteConfig).not.toContain('tsconfig.base.json');
      expect(viteConfig).not.toContain('tsconfigBaseAliases');
      expect(viteConfig).toContain(
        "'@assets/': `${path.resolve(__dirname, './src/assets')}/`"
      );
      expect(viteConfig).toContain(
        "'@app/': `${path.resolve(__dirname, './src/app')}/`"
      );
      expect(viteConfig).toContain(
        "'@public/': `${path.resolve(__dirname, './src/public')}/"
      );
    });

    it('lints and builds with global paths when `alias` is "global"', async () => {
      // Create app
      const app = uniq('vue3-vite');
      await runNxCommandAsync(
        `generate nx-vue3-vite:app ${app} --alias global`
      );

      // Read paths
      const tsConfigJson = readJson(`apps/${app}/tsconfig.json`);
      const { baseUrl, paths } = tsConfigJson.compilerOptions;

      // Verify `tsConfigJson.compilerOptions.paths`
      expect(baseUrl).toBeUndefined();
      expect(paths).toBeUndefined();

      // Verify `vite.config.ts`
      const viteConfig = readFile(`apps/${app}/vite.config.ts`);
      expect(viteConfig).toContain(
        "import tsconfigBase from '../../tsconfig.base.json'"
      );
      expect(viteConfig).toContain("const rootOffset = '../..'");
      expect(viteConfig).toContain(
        'const tsconfigBaseAliases = (): Record<string, string> => {'
      );
      expect(viteConfig).toContain('...tsconfigBaseAliases(),');
      expect(viteConfig).toContain('// Add your alias here.');

      // Lint
      const lintResult = await runNxCommandAsync(`lint ${app}`);
      expect(lintResult.stdout).toContain('All files pass linting.');

      // Build app
      const result = await runNxCommandAsync(`build ${app}`);
      expect(result.stdout).toContain('Build complete');
    });

    it('should fail when `alias` is not a valid value', async () => {
      // Create app
      const app = uniq('vue3-vite');
      const wrongValue = 'hello';
      const createAppCommand = `generate nx-vue3-vite:app ${app} --alias ${wrongValue}`;

      // Expect it to throw an error
      await expect(runNxCommandAsync(createAppCommand)).rejects.toThrow();

      // Silence error to verify error message, because the error message thrown
      // by `runNxCommandAsync` looks like `Command failed: {command}`, which is
      // not detailed enough.
      const result = await runNxCommandAsync(createAppCommand, {
        silenceError: true,
      });
      expect(result.stdout).toContain(
        `Property 'alias' does not match the schema. '${wrongValue}' should be one of local,global.`
      );
    });
  });
});
