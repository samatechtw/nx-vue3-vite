import {
  checkFilesExist,
  cleanup,
  ensureNxProject,
  readFile,
  readJson,
  runNxCommandAsync,
  uniq,
} from './utils';

jest.setTimeout(60000);

describe('library e2e', () => {
  let proj: string;

  beforeAll(() => {
    proj = uniq('vue3-vite');
    ensureNxProject('nx-vue3-vite', 'dist/packages/vue3-vite', proj);
  });

  afterAll(() => {
    cleanup(proj);
  });

  it('should create library', async () => {
    // Create library
    const library = uniq('library');
    await runNxCommandAsync(proj, `generate nx-vue3-vite:library ${library}`);

    // Check files exist
    checkFilesExist(proj, [
      `libs/${library}/postcss.config.js`,
      `libs/${library}/project.json`,
      `libs/${library}/vite.config.ts`,
      `libs/${library}/src/index.ts`,
      `libs/${library}/src/lib/MyWidget.vue`,
      `libs/${library}/src/lib/MyWidget.spec.ts`,
    ]);
  });

  it('should pass lint check', async () => {
    // Create library
    const library = uniq('library');
    await runNxCommandAsync(proj, `generate nx-vue3-vite:library ${library}`);

    // Lint
    const lintResult = await runNxCommandAsync(proj, `lint ${library}`);
    expect(lintResult.stdout).toContain('All files pass linting.');
  });

  it('should add path to `tsconfig.base.json`', async () => {
    // Create library
    const library = uniq('some/random/library');
    await runNxCommandAsync(proj, `generate nx-vue3-vite:library ${library}`);

    // Evaluate key and path
    const { npmScope } = readJson(proj, 'nx.json');
    const key = `@${npmScope}/${library}`;
    const path = `libs/${library}/src/index.ts`;

    // Check if path is added to `tsConfigBaseJson.compilerOptions.paths` correctly
    const tsConfigBaseJson = readJson(proj, `tsconfig.base.json`);
    const { paths } = tsConfigBaseJson.compilerOptions;
    expect(paths[key]).toEqual([path]);
  });

  describe('--test', () => {
    describe('lints', () => {
      it('lints and uses Vitest as testing framework by default', async () => {
        // Reset project to verify correct dependencies are installed
        proj = uniq('vue3-vite');
        ensureNxProject('nx-vue3-vite', 'dist/packages/vue3-vite', proj);

        // Create library
        const library = uniq('lib-test');
        await runNxCommandAsync(
          proj,
          `generate nx-vue3-vite:library ${library}`
        );

        // Read and verify `package.json`
        const packageJson = readFile(proj, 'package.json');
        expect(packageJson).toContain('vitest');
        expect(packageJson).toContain('happy-dom');
        expect(packageJson).not.toContain('jest');

        // Read and verify `vite.config.ts`
        const viteConfig = readFile(proj, `libs/${library}/vite.config.ts`);
        expect(viteConfig).toContain("environment: 'happy-dom'");

        // Read and verify test file
        const testFile = readFile(
          proj,
          `libs/${library}/src/lib/MyWidget.spec.ts`
        );
        expect(testFile).toContain('vitest');
        expect(testFile).not.toContain('jest');

        // Lint
        const lintResult = await runNxCommandAsync(proj, `lint ${library}`);
        expect(lintResult.stdout).toContain('All files pass linting.');
      });

      it('lints and uses Jest as testing framework when `test` equals to "jest"', async () => {
        // Reset project to verify correct dependencies are installed
        proj = uniq('vue3-vite');
        ensureNxProject('nx-vue3-vite', 'dist/packages/vue3-vite', proj);

        // Create library
        const library = uniq('lib-test');
        await runNxCommandAsync(
          proj,
          `generate nx-vue3-vite:library ${library} --test jest`
        );

        // Read and verify `package.json`
        const packageJson = readFile(proj, 'package.json');
        expect(packageJson).toContain('jest');
        expect(packageJson).not.toContain('vitest');
        expect(packageJson).not.toContain('happy-dom');

        // Read and verify `vite.config.ts`
        const viteConfig = readFile(proj, `libs/${library}/vite.config.ts`);
        expect(viteConfig).not.toContain("environment: 'happy-dom'");

        // Read and verify test file
        const testFile = readFile(
          proj,
          `libs/${library}/src/lib/MyWidget.spec.ts`
        );
        expect(testFile).toContain('jest');
        expect(testFile).not.toContain('vitest');

        // Lint
        const lintResult = await runNxCommandAsync(proj, `lint ${library}`);
        expect(lintResult.stdout).toContain('All files pass linting.');
      });
    });

    describe('runs tests', () => {
      it('runs tests with Vitest when `test` equals to "vitest"', async () => {
        // Create library
        const library = uniq('lib-test');
        await runNxCommandAsync(
          proj,
          `generate nx-vue3-vite:library ${library} --test vitest`
        );

        // Run test
        const testResult = await runNxCommandAsync(proj, `test ${library}`);
        expect(testResult.stdout).toContain(
          `Successfully ran target test for project ${library}`
        );
      });

      it('runs tests with Jest when `test` equals to "jest"', async () => {
        // Create library
        const library = uniq('lib-test');
        await runNxCommandAsync(
          proj,
          `generate nx-vue3-vite:library ${library} --test jest`
        );

        // Run test
        const testResult = await runNxCommandAsync(proj, `test ${library}`);
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
      await expect(runNxCommandAsync(proj, createAppCommand)).rejects.toThrow();

      // Silence error to verify error message, because the error message thrown
      // by `runNxCommandAsync` looks like `Command failed: {command}`, which is
      // not detailed enough.
      const result = await runNxCommandAsync(proj, createAppCommand, {
        silenceError: true,
      });
      expect(result.stdout).toContain(
        `Property 'test' does not match the schema. '${wrongValue}' should be one of vitest,jest.`
      );
    });
  });
});
