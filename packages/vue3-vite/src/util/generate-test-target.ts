import { TestFramework } from './test-framework';

export const generateTestTarget = (
  projectRoot: string,
  testFramework: TestFramework,
  projectName: string,
) => {
  const useVitest = testFramework === TestFramework.Vitest;
  const executor = useVitest ? '@nx/vite:test' : '@nx/jest:jest';
  const config = useVitest
    ? {
        config: `${projectRoot}/vite.config.ts`,
      }
    : {
        jestConfig: `${projectRoot}/jest.config.ts`,
      };

  return {
    executor,
    outputs: [`{workspaceRoot}/coverage/apps/${projectName}`],
    options: {
      ...config,
      passWithNoTests: true,
    },
  };
};
