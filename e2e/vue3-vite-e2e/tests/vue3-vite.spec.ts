import {
  checkFilesExist,
  cleanup,
  ensureNxProject,
  exists,
  readFile,
  readJson,
  runCommandAsync,
  runNxCommandAsync,
  uniq,
  updateFile,
} from './utils';

jest.setTimeout(90000);

describe('vue3-vite e2e', () => {
  let proj: string;

  beforeAll(() => {
    proj = uniq('vue3-vite');
    ensureNxProject('nx-vue3-vite', 'dist/packages/vue3-vite', proj);
  });

  afterAll(() => {
    cleanup(proj);
  });

  it('should create and build vue3-vite app', async () => {
    // Create app
    const app = uniq('vue3-vite');
    await runNxCommandAsync(proj, `generate nx-vue3-vite:app ${app}`);

    // Check files exist
    checkFilesExist(proj, [
      `apps/${app}/index.html`,
      `apps/${app}/postcss.config.js`,
      `apps/${app}/project.json`,
      `apps/${app}/src/app/main.ts`,
      `apps/${app}/tsconfig.json`,
      `apps/${app}/vite.config.ts`,
      `nx.json`,
      `package.json`,
      `tsconfig.base.json`,
    ]);

    // Build app
    const result = await runNxCommandAsync(proj, `build ${app}`);
    expect(result.stdout).toContain('Build complete');
  });

  it('should make a copy of `package.json` to `dist` if it exists', async () => {
    // Create app
    const app = uniq('vue3-vite');
    await runNxCommandAsync(proj, `generate nx-vue3-vite:app ${app}`);

    // Create `package.json`
    const stringifiedPackageJson = JSON.stringify({
      name: app,
      version: '0.0.1',
    });
    updateFile('package.json', stringifiedPackageJson, `${proj}/apps/${app}`);
    checkFilesExist(proj, [`apps/${app}/package.json`]);

    // Build app
    const result = await runNxCommandAsync(proj, `build ${app}`);
    expect(result.stdout).toContain('Build complete');

    // Verify `package.json` is copied
    const copiedPackageJson = readJson(proj, `dist/apps/${app}/package.json`);
    expect(JSON.stringify(copiedPackageJson)).toEqual(stringifiedPackageJson);
  });

  it('should not make a copy of `package.json` to `dist` if it does not exist', async () => {
    // Create app
    const app = uniq('vue3-vite');
    await runNxCommandAsync(proj, `generate nx-vue3-vite:app ${app}`);

    // Build app
    const result = await runNxCommandAsync(proj, `build ${app}`);
    expect(result.stdout).toContain('Build complete');

    // Verify `package.json` does not exist in app folder
    const packageJsonInApp = `${proj}/apps/${app}/package.json`;
    expect(exists(packageJsonInApp)).toEqual(false);

    // Verify `package.json` does not exist in `dist` folder
    const packageJsonInDist = `${proj}/dist/apps/${app}/package.json`;
    expect(exists(packageJsonInDist)).toEqual(false);
  });

  it('should pass lint check', async () => {
    // Create app
    const app = uniq('vue3-vite');
    await runNxCommandAsync(proj, `generate nx-vue3-vite:app ${app}`);

    // Lint
    const lintResult = await runNxCommandAsync(proj, `lint ${app}`);
    expect(lintResult.stdout).toContain('All files pass linting.');
  });

  it('should not overwrite `dependencies` in `package.json`', async () => {
    // Install Vue 2
    const packageName = 'vue';
    const oldVersion = '^2.7.16';
    await runCommandAsync(
      proj,
      `npm install ${packageName}@${oldVersion} --force --save`,
    );

    // Verify `dependencies` after install
    let packageJson = readJson(proj, 'package.json');
    expect(packageJson.dependencies[packageName]).toEqual(oldVersion);

    // Create app
    const app = uniq('vue3-vite-dep');
    await runNxCommandAsync(proj, `generate nx-vue3-vite:app ${app}`);

    // Verify `dependencies` after running the generator
    packageJson = readJson(proj, 'package.json');
    expect(packageJson.dependencies[packageName]).toEqual(oldVersion);
  });

  it('should not overwrite `devDependencies` in `package.json`', async () => {
    // Install Vite 3
    const packageName = 'vite';
    const oldVersion = '^3.2.10';
    await runCommandAsync(
      proj,
      `npm install ${packageName}@${oldVersion} --force --save-dev`,
    );

    // Verify `dependencies` after install
    let packageJson = readJson(proj, 'package.json');
    expect(packageJson.devDependencies[packageName]).toEqual(oldVersion);

    // Create app
    const app = uniq('vue3-vite-dev-dep');
    await runNxCommandAsync(proj, `generate nx-vue3-vite:app ${app}`);

    // Verify `devDepndencies` after running the generator
    packageJson = readJson(proj, 'package.json');
    expect(packageJson.devDependencies[packageName]).toEqual(oldVersion);
  });

  describe('--directory', () => {
    it('should create app in the specified directory and add tags to nx.json', async () => {
      const plugin = uniq('vue3-vite');
      await runNxCommandAsync(
        proj,
        `generate nx-vue3-vite:app ${plugin} --directory subdir/${plugin} --tags e2etag,e2ePackage`,
      );

      expect(() =>
        checkFilesExist(proj, [`apps/subdir/${plugin}/vite.config.ts`]),
      ).not.toThrow();
      const projectJson = readJson(proj, `apps/subdir/${plugin}/project.json`);
      expect(projectJson.tags).toEqual(['e2etag', 'e2ePackage']);
    });
  });

  describe('--alias', () => {
    it('should use global path alias by default', async () => {
      // Create app
      const app = uniq('vue3-vite');
      await runNxCommandAsync(proj, `generate nx-vue3-vite:app ${app}`);

      // Read paths
      const tsConfigJson = readJson(proj, `apps/${app}/tsconfig.json`);
      const { baseUrl, paths } = tsConfigJson.compilerOptions;

      // Verify `tsConfigJson.compilerOptions.paths`
      expect(baseUrl).toBeUndefined();
      expect(paths).toBeUndefined();

      // Verify `vite.config.ts`
      const viteConfig = readFile(proj, `apps/${app}/vite.config.ts`);
      expect(viteConfig).toMatch(
        /import\s{.*tsconfigBaseAliases.*}\sfrom\s'nx-vue3-vite'/,
      );
      expect(viteConfig).toContain('...tsconfigBaseAliases(__dirname),');
    });

    it('should use local path alias when `alias` equals to "local"', async () => {
      // Create app
      const app = uniq('vue3-vite');
      await runNxCommandAsync(
        proj,
        `generate nx-vue3-vite:app ${app} --alias local`,
      );

      // Read paths
      const tsConfigJson = readJson(proj, `apps/${app}/tsconfig.json`);
      const { paths } = tsConfigJson.compilerOptions;

      // Verify `tsConfigJson.compilerOptions.paths`
      expect(Object.keys(paths)).toHaveLength(3);
      expect(paths).toMatchObject({
        '@assets/*': ['./src/assets/*'],
        '@app/*': ['./src/app/*'],
        '@public/*': ['./src/public/*'],
      });

      // Verify `vite.config.ts`
      const viteConfig = readFile(proj, `apps/${app}/vite.config.ts`);
      expect(viteConfig).not.toContain('tsconfigBaseAliases');
      expect(viteConfig).toContain(
        "'@assets/': `${path.resolve(__dirname, './src/assets')}/`",
      );
      expect(viteConfig).toContain(
        "'@app/': `${path.resolve(__dirname, './src/app')}/`",
      );
      expect(viteConfig).toContain(
        "'@public/': `${path.resolve(__dirname, './src/public')}/",
      );
    });

    it('lints and builds with global paths when `alias` is "global"', async () => {
      // Reset project to avoid issues with previous project state
      proj = uniq('vue3-vite');
      ensureNxProject('nx-vue3-vite', 'dist/packages/vue3-vite', proj);

      // Create app
      const app = uniq('vue3-vite');
      await runNxCommandAsync(
        proj,
        `generate nx-vue3-vite:app ${app} --alias global`,
      );

      // Read paths
      const tsConfigJson = readJson(proj, `apps/${app}/tsconfig.json`);
      const { baseUrl, paths } = tsConfigJson.compilerOptions;

      // Verify `tsConfigJson.compilerOptions.paths`
      expect(baseUrl).toBeUndefined();
      expect(paths).toBeUndefined();

      // Verify `vite.config.ts`
      const viteConfig = readFile(proj, `apps/${app}/vite.config.ts`);
      expect(viteConfig).toMatch(
        /import\s{.*tsconfigBaseAliases.*}\sfrom\s'nx-vue3-vite'/,
      );
      expect(viteConfig).toContain('...tsconfigBaseAliases(__dirname),');

      // Lint
      const lintResult = await runNxCommandAsync(proj, `lint ${app}`);
      expect(lintResult.stdout).toContain('All files pass linting.');

      // Build app
      const result = await runNxCommandAsync(proj, `build ${app}`);
      expect(result.stdout).toContain('Build complete');
    });

    it('should fail when `alias` is not a valid value', async () => {
      // Create app
      const app = uniq('vue3-vite');
      const wrongValue = 'hello';
      const createAppCommand = `generate nx-vue3-vite:app ${app} --alias ${wrongValue}`;

      // Expect it to throw an error
      await expect(runNxCommandAsync(proj, createAppCommand)).rejects.toThrow();

      // Silence error to verify error message, because the error message thrown
      // by `runNxCommandAsync` looks like `Command failed: {command}`, which is
      // not detailed enough.
      const result = await runNxCommandAsync(proj, createAppCommand, {
        silenceError: true,
      });
      expect(result.stdout).toContain(
        `Property 'alias' does not match the schema. '${wrongValue}' should be one of local,global.`,
      );
    });
  });

  describe('--test', () => {
    describe('lints', () => {
      it('lints and uses Vitest as testing framework by default', async () => {
        // Reset project to verify correct dependencies are installed
        proj = uniq('vue3-vite');
        ensureNxProject('nx-vue3-vite', 'dist/packages/vue3-vite', proj);

        // Create app
        const app = uniq('vue3-vite');
        await runNxCommandAsync(proj, `generate nx-vue3-vite:app ${app}`);

        // Read and verify `package.json`
        const packageJson = readFile(proj, 'package.json');
        expect(packageJson).toContain('vitest');
        expect(packageJson).toContain('happy-dom');
        expect(packageJson).not.toContain('jest');

        // Read and verify `vite.config.ts`
        const viteConfig = readFile(proj, `apps/${app}/vite.config.ts`);
        expect(viteConfig).toContain("environment: 'happy-dom'");

        // Read and verify test file
        const testFile = readFile(
          proj,
          `apps/${app}/src/app/components/CookiesConsent.spec.ts`,
        );
        expect(testFile).toContain('vitest');
        expect(testFile).not.toContain('jest');

        // Lint
        const lintResult = await runNxCommandAsync(proj, `lint ${app}`);
        expect(lintResult.stdout).toContain('All files pass linting.');
      });

      it('lints and uses Jest as testing framework when `test` equals to "jest"', async () => {
        // Reset project to verify correct dependencies are installed
        proj = uniq('vue3-vite');
        ensureNxProject('nx-vue3-vite', 'dist/packages/vue3-vite', proj);

        // Create app
        const app = uniq('vue3-vite');
        await runNxCommandAsync(
          proj,
          `generate nx-vue3-vite:app ${app} --test jest`,
        );

        // Read and verify `package.json`
        const packageJson = readFile(proj, 'package.json');
        expect(packageJson).toContain('jest');
        expect(packageJson).not.toContain('vitest');
        expect(packageJson).not.toContain('happy-dom');

        // Read and verify `vite.config.ts`
        const viteConfig = readFile(proj, `apps/${app}/vite.config.ts`);
        expect(viteConfig).not.toContain("environment: 'happy-dom'");

        // Read and verify test file
        const testFile = readFile(
          proj,
          `apps/${app}/src/app/components/CookiesConsent.spec.ts`,
        );
        expect(testFile).toContain('jest');
        expect(testFile).not.toContain('vitest');

        // Lint
        const lintResult = await runNxCommandAsync(proj, `lint ${app}`);
        expect(lintResult.stdout).toContain('All files pass linting.');
      });
    });

    describe('runs tests', () => {
      it('runs tests with Vitest when `test` equals to "vitest"', async () => {
        // Create app
        const app = uniq('vue3-vite');
        await runNxCommandAsync(
          proj,
          `generate nx-vue3-vite:app ${app} --test vitest`,
        );

        // Runs tests
        const testResult = await runNxCommandAsync(proj, `test ${app}`);
        expect(testResult.stdout).toContain(
          `Successfully ran target test for project ${app}`,
        );
      });

      it('runs tests with Jest when `test` equals to "jest"', async () => {
        // Create app
        const app = uniq('vue3-vite');
        await runNxCommandAsync(
          proj,
          `generate nx-vue3-vite:app ${app} --test jest`,
        );

        // Runs tests
        const testResult = await runNxCommandAsync(proj, `test ${app}`);
        expect(testResult.stdout).toContain(
          `Successfully ran target test for project ${app}`,
        );
      });
    });

    describe('builds', () => {
      it('builds with Vitest when `test` equals to "vitest"', async () => {
        // Create app
        const app = uniq('vue3-vite');
        await runNxCommandAsync(
          proj,
          `generate nx-vue3-vite:app ${app} --test vitest`,
        );

        // Build app
        const result = await runNxCommandAsync(proj, `build ${app}`);
        expect(result.stdout).toContain('Build complete');
      });

      it('builds with Jest when `test` equals to "jest"', async () => {
        // Create app
        const app = uniq('vue3-vite');
        await runNxCommandAsync(
          proj,
          `generate nx-vue3-vite:app ${app} --test jest`,
        );

        // Build app
        const result = await runNxCommandAsync(proj, `build ${app}`);
        expect(result.stdout).toContain('Build complete');
      });
    });

    it('should fail when `test` is not a valid value', async () => {
      // Create app
      const app = uniq('vue3-vite');
      const wrongValue = 'hello';
      const createAppCommand = `generate nx-vue3-vite:app ${app} --test ${wrongValue}`;

      // Expect it to throw an error
      await expect(runNxCommandAsync(proj, createAppCommand)).rejects.toThrow();

      // Silence error to verify error message, because the error message thrown
      // by `runNxCommandAsync` looks like `Command failed: {command}`, which is
      // not detailed enough.
      const result = await runNxCommandAsync(proj, createAppCommand, {
        silenceError: true,
      });
      expect(result.stdout).toContain(
        `Property 'test' does not match the schema. '${wrongValue}' should be one of vitest,jest.`,
      );
    });
  });
});
