import { TestFramework } from './test-framework';

export const generateTestTarget = (
  projectRoot: string,
  testFramework: TestFramework
) => {
  const useVitest = testFramework === TestFramework.Vitest;
  const executor = useVitest ? '@nrwl/vite:test' : '@nrwl/jest:jest';
  const config = useVitest
    ? {
        config: 'vite.config.ts',
      }
    : {
        jestConfig: `${projectRoot}/jest.config.ts`,
      };

  return {
    executor,
    outputs: ['coverage/libs/e2e/apps'],
    options: {
      ...config,
      passWithNoTests: true,
    },
  };
};
