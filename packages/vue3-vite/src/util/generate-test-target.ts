import { TestFramework } from './test-framework';

export const generateTestTarget = (
  projectRoot: string,
  testFramework: TestFramework,
) => {
  if (testFramework === TestFramework.Vitest) {
    // Run vitest with `nx:run-commands` instead of `@nx/vite:test`. `@nx/vite`'s
    // peer range lags Vite/Vitest releases we target.
    return {
      executor: 'nx:run-commands',
      outputs: [`{workspaceRoot}/coverage/${projectRoot}`],
      options: {
        command: 'vitest run --passWithNoTests',
        cwd: projectRoot,
      },
    };
  }

  return {
    executor: '@nx/jest:jest',
    outputs: [`{workspaceRoot}/coverage/${projectRoot}`],
    options: {
      jestConfig: `${projectRoot}/jest.config.ts`,
      passWithNoTests: true,
    },
  };
};
