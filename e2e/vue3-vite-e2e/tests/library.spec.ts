import {
  checkFilesExist,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';

jest.setTimeout(60000);

describe('library e2e', () => {
  it('should create library', async () => {
    // Create app
    const app = uniq('vue3-vite');
    await runNxCommandAsync(`generate nx-vue3-vite:app ${app}`);

    // Create library
    const library = uniq('library');
    await runNxCommandAsync(`generate nx-vue3-vite:library ${library}`);

    // Check files exist
    checkFilesExist(
      `libs/${library}/project.json`,
      `libs/${library}/vite.config.ts`,
      `libs/${library}/src/index.ts`,
      `libs/${library}/src/lib/MyWidget.vue`
    );
  });

  it('should pass lint check', async () => {
    // Create app
    const app = uniq('vue3-vite');
    await runNxCommandAsync(`generate nx-vue3-vite:app ${app}`);

    // Create library
    const library = uniq('library');
    await runNxCommandAsync(`generate nx-vue3-vite:library ${library}`);

    // Lint
    const lintResult = await runNxCommandAsync(`lint ${library}`);
    expect(lintResult.stdout).toContain('All files pass linting.');
  });
});
