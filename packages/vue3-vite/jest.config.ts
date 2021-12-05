module.exports = {
  displayName: 'vue3-vite',
  preset: '../../jest.preset.ts',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  coverageDirectory: '../../coverage/packages/vue3-vite',
};
