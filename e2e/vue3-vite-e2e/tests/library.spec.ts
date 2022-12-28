import {
  checkFilesExist,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';

jest.setTimeout(60000);

describe('library e2e', () => {
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
      `libs/${library}/src/lib/MyWidget.vue`
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
});
