import {
  checkFilesExist,
  ensureNxProject,
  readFile,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';

jest.setTimeout(90000);

describe('vue3-vite e2e', () => {
  beforeEach(() => {
    ensureNxProject('nx-vue3-vite', 'dist/packages/vue3-vite');
  });

  it('should create and build vue3-vite app', async () => {
    // Create app
    const app = uniq('vue3-vite');
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
        "import { tsconfigBaseAliases } from 'nx-vue3-vite'"
      );
      expect(viteConfig).toContain('...tsconfigBaseAliases(__dirname),');
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
        "import { tsconfigBaseAliases } from 'nx-vue3-vite'"
      );
      expect(viteConfig).toContain('...tsconfigBaseAliases(__dirname),');

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

  describe('--test', () => {
    describe('lints', () => {
      it('lints and uses Vitest as testing framework by default', async () => {
        // Create app
        const app = uniq('vue3-vite');
        await runNxCommandAsync(`generate nx-vue3-vite:app ${app}`);

        // Read and verify `package.json`
        const packageJson = readFile('package.json');
        expect(packageJson).toContain('vitest');
        expect(packageJson).toContain('happy-dom');
        expect(packageJson).not.toContain('jest');

        // Read and verify `vite.config.ts`
        const viteConfig = readFile(`apps/${app}/vite.config.ts`);
        expect(viteConfig).toContain("environment: 'happy-dom'");

        // Read and verify test file
        const testFile = readFile(
          `apps/${app}/src/app/components/CookiesConsent.spec.ts`
        );
        expect(testFile).toContain('vitest');
        expect(testFile).not.toContain('jest');

        // Lint
        const lintResult = await runNxCommandAsync(`lint ${app}`);
        expect(lintResult.stdout).toContain('All files pass linting.');
      });

      it('lints and uses Jest as testing framework when `test` equals to "jest"', async () => {
        // Create app
        const app = uniq('vue3-vite');
        await runNxCommandAsync(`generate nx-vue3-vite:app ${app} --test jest`);

        // Read and verify `package.json`
        const packageJson = readFile('package.json');
        expect(packageJson).toContain('jest');
        expect(packageJson).not.toContain('vitest');
        expect(packageJson).not.toContain('happy-dom');

        // Read and verify `vite.config.ts`
        const viteConfig = readFile(`apps/${app}/vite.config.ts`);
        expect(viteConfig).not.toContain("environment: 'happy-dom'");

        // Read and verify test file
        const testFile = readFile(
          `apps/${app}/src/app/components/CookiesConsent.spec.ts`
        );
        expect(testFile).toContain('jest');
        expect(testFile).not.toContain('vitest');

        // Lint
        const lintResult = await runNxCommandAsync(`lint ${app}`);
        expect(lintResult.stdout).toContain('All files pass linting.');
      });
    });

    describe('runs tests', () => {
      it('runs tests with Vitest when `test` equals to "vitest"', async () => {
        // Create app
        const app = uniq('vue3-vite');
        await runNxCommandAsync(
          `generate nx-vue3-vite:app ${app} --test vitest`
        );

        // Runs tests
        const testResult = await runNxCommandAsync(`test ${app}`);
        expect(testResult.stdout).toContain(
          `Successfully ran target test for project ${app}`
        );
      });

      it('runs tests with Jest when `test` equals to "jest"', async () => {
        // Create app
        const app = uniq('vue3-vite');
        await runNxCommandAsync(`generate nx-vue3-vite:app ${app} --test jest`);

        // Runs tests
        const testResult = await runNxCommandAsync(`test ${app}`);
        expect(testResult.stdout).toContain(
          `Successfully ran target test for project ${app}`
        );
      });
    });

    describe('builds', () => {
      it('builds with Vitest when `test` equals to "vitest"', async () => {
        // Create app
        const app = uniq('vue3-vite');
        await runNxCommandAsync(
          `generate nx-vue3-vite:app ${app} --test vitest`
        );

        // Build app
        const result = await runNxCommandAsync(`build ${app}`);
        expect(result.stdout).toContain('Build complete');
      });

      it('builds with Jest when `test` equals to "jest"', async () => {
        // Create app
        const app = uniq('vue3-vite');
        await runNxCommandAsync(`generate nx-vue3-vite:app ${app} --test jest`);

        // Build app
        const result = await runNxCommandAsync(`build ${app}`);
        expect(result.stdout).toContain('Build complete');
      });
    });

    it('should fail when `test` is not a valid value', async () => {
      // Create app
      const app = uniq('vue3-vite');
      const wrongValue = 'hello';
      const createAppCommand = `generate nx-vue3-vite:app ${app} --test ${wrongValue}`;

      // Expect it to throw an error
      await expect(runNxCommandAsync(createAppCommand)).rejects.toThrow();

      // Silence error to verify error message, because the error message thrown
      // by `runNxCommandAsync` looks like `Command failed: {command}`, which is
      // not detailed enough.
      const result = await runNxCommandAsync(createAppCommand, {
        silenceError: true,
      });
      expect(result.stdout).toContain(
        `Property 'test' does not match the schema. '${wrongValue}' should be one of vitest,jest.`
      );
    });
  });
});
