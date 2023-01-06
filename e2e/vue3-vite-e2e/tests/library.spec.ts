import {
  checkFilesExist,
  ensureNxProject,
  readFile,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';

jest.setTimeout(60000);

describe('library e2e', () => {
  beforeEach(() => {
    ensureNxProject('nx-vue3-vite', 'dist/packages/vue3-vite');
  });

  it('should create library', async () => {
    // Create library
    const library = uniq('library');
    await runNxCommandAsync(`generate nx-vue3-vite:library ${library}`);

    // Check files exist
    checkFilesExist(
      `libs/${library}/postcss.config.js`,
      `libs/${library}/project.json`,
      `libs/${library}/vite.config.ts`,
      `libs/${library}/src/index.ts`,
      `libs/${library}/src/lib/MyWidget.vue`,
      `libs/${library}/src/lib/MyWidget.spec.ts`
    );
  });

  it('should pass lint check', async () => {
    // Create library
    const library = uniq('library');
    await runNxCommandAsync(`generate nx-vue3-vite:library ${library}`);

    // Lint
    const lintResult = await runNxCommandAsync(`lint ${library}`);
    expect(lintResult.stdout).toContain('All files pass linting.');
  });

  it('should add path to `tsconfig.base.json`', async () => {
    // Create library
    const library = uniq('some/random/library');
    await runNxCommandAsync(`generate nx-vue3-vite:library ${library}`);

    // Evaluate key and path
    const { npmScope } = readJson('nx.json');
    const key = `@${npmScope}/${library}`;
    const path = `libs/${library}/src/index.ts`;

    // Check if path is added to `tsConfigBaseJson.compilerOptions.paths` correctly
    const tsConfigBaseJson = readJson(`tsconfig.base.json`);
    const { paths } = tsConfigBaseJson.compilerOptions;
    expect(paths[key]).toEqual([path]);
  });

  describe('--test', () => {
    describe('lints', () => {
      it('lints and uses Vitest as testing framework by default', async () => {
        // Create library
        const library = uniq('lib-test');
        await runNxCommandAsync(`generate nx-vue3-vite:library ${library}`);

        // Read and verify `vite.config.ts`
        const viteConfig = readFile(`libs/${library}/vite.config.ts`);
        expect(viteConfig).toContain("environment: 'happy-dom'");

        // Read and verify test file
        const testFile = readFile(`libs/${library}/src/lib/MyWidget.spec.ts`);
        expect(testFile).toContain('vitest');
        expect(testFile).not.toContain('jest');

        // Lint
        const lintResult = await runNxCommandAsync(`lint ${library}`);
        expect(lintResult.stdout).toContain('All files pass linting.');
      });

      it('lints and uses Jest as testing framework when `test` equals to "jest"', async () => {
        // Create library
        const library = uniq('lib-test');
        await runNxCommandAsync(
          `generate nx-vue3-vite:library ${library} --test jest`
        );

        // Read and verify `vite.config.ts`
        const viteConfig = readFile(`libs/${library}/vite.config.ts`);
        expect(viteConfig).not.toContain("environment: 'happy-dom'");

        // Read and verify test file
        const testFile = readFile(`libs/${library}/src/lib/MyWidget.spec.ts`);
        expect(testFile).toContain('jest');
        expect(testFile).not.toContain('vitest');

        // Lint
        const lintResult = await runNxCommandAsync(`lint ${library}`);
        expect(lintResult.stdout).toContain('All files pass linting.');
      });
    });

    describe('runs tests', () => {
      it('runs tests with Vitest when `test` equals to "vitest"', async () => {
        // Create library
        const library = uniq('lib-test');
        await runNxCommandAsync(
          `generate nx-vue3-vite:library ${library} --test vitest`
        );

        // Run test
        const testResult = await runNxCommandAsync(`test ${library}`);
        expect(testResult.stdout).toContain(
          `Successfully ran target test for project ${library}`
        );
      });

      it('runs tests with Jest when `test` equals to "jest"', async () => {
        // Create library
        const library = uniq('lib-test');
        await runNxCommandAsync(
          `generate nx-vue3-vite:library ${library} --test jest`
        );

        // Run test
        const testResult = await runNxCommandAsync(`test ${library}`);
        expect(testResult.stdout).toContain(
          `Successfully ran target test for project ${library}`
        );
      });
    });

    it('should fail when `test` is not a valid value', async () => {
      // Create app
      const library = uniq('lib-test');
      const wrongValue = 'hello';
      const createAppCommand = `generate nx-vue3-vite:library ${library} --test ${wrongValue}`;

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
