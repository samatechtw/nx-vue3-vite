module.exports = {
  displayName: 'vue3-vite-e2e',
  preset: '../../jest.preset.ts',
  transform: {
    '^.+\\.[tj]s?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/e2e/vue3-vite-e2e',
};
