export const VSCodeExtensionsFilePath = '.vscode/extensions.json';

export const recommendedExtensions = ['vue.volar', 'cpylua.language-postcss'];

// dependency versions
export const vueVersion = '^3.5.13';
export const vueI18nVersion = '^11.0.1';
export const vueRouterVersion = '^4.5.0';

// devDependency versions
export const viteVersion = '^7.1.12';
export const eslintVersion = '^8.57.0';
export const vuePluginVersion = '^6.0.7';
export const babelJestVersion = '^29.7.0';
export const jestGlobalsVersion = '^29.7.0';
export const vue3JestVersion = '^29.2.6';
export const babelPresetEnvVersion = '^7.26.0';
export const postcssVersion = '^8.5.1';
export const postcssBasicsVersion = '^0.7.4';
export const stylelintVersion = '^16.13.2';
export const stylelintConfigVersion = '^37.0.0';
export const tslibVersion = '^2.8.1';
export const tsConfigVersion = '^7.0.0';
export const nrwlJestVersion = '^21.6.11';
export const typescriptVersion = '~5.9.3';

export const CypressDevDependencies = {
  cypress: '^14.0.0',
  '@cypress/vue': '^6.0.2',
  '@cypress/vite-dev-server': '^6.0.1',
  '@cypress/code-coverage': '^3.13.10',
  'eslint-plugin-cypress': '^4.1.0',
  '@nx/cypress': '^21.6.11',
};

export const VueDevDependencies = {
  '@vue/test-utils': '^2.4.6',
};

// The vitest `test` target runs via `nx:run-commands`, so no `@nx/vite` executor
// (and no `@nx/vite` peer-range coupling to vite/vitest) is needed.
export const VitestDevDependencies = {
  'happy-dom': '^20.10.6',
  vitest: '^4.1.9',
};

export const JestDevDependencies = {
  '@nx/jest': nrwlJestVersion,
  '@jest/globals': jestGlobalsVersion,
  '@vue/vue3-jest': vue3JestVersion,
  'babel-jest': babelJestVersion,
  jest: '^29.7.0',
  'jest-environment-jsdom': '^29.7.0',
  'ts-jest': '^29.2.5',
  // Required by Jest to load TS `jest.config.ts`.
  'ts-node': '^10.9.2',
};

export const LintDevDependencies = {
  '@intlify/eslint-plugin-vue-i18n': '^3.2.0',
  '@vue/eslint-config-typescript': '^13.0.0',
  eslint: eslintVersion,
  'eslint-config-prettier': '^10.0.1',
  'eslint-plugin-import': '^2.31.0',
  'eslint-plugin-vue': '^9.32.0',
  stylelint: stylelintVersion,
  'stylelint-config-standard': stylelintConfigVersion,
  '@typescript-eslint/eslint-plugin': '8.20.0',
  '@typescript-eslint/parser': '8.20.0',
  'vue-eslint-parser': '^9.4.3',
};

export const ProjectDependencies = {
  vue: vueVersion,
  'vue-i18n': vueI18nVersion,
  'vue-router': vueRouterVersion,
  'date-fns': '^4.1.0',
};

export const ProjectDevDependencies = {
  vite: viteVersion,
  picocolors: '1.1.1',
  'class-transformer': '^0.5.1',
  postcss: postcssVersion,
  '@vitejs/plugin-vue': vuePluginVersion,
  '@babel/plugin-transform-modules-commonjs': '^7.26.3',
  '@babel/preset-env': babelPresetEnvVersion,
  '@babel/core': '^7.26.0',
  '@samatech/postcss-basics': postcssBasicsVersion,
  tslib: tslibVersion,
  tsconfig: tsConfigVersion,
  ...LintDevDependencies,
  ...CypressDevDependencies,
  ...VueDevDependencies,
};

export const LibraryDependencies = {
  vue: vueVersion,
  'vue-i18n': vueI18nVersion,
  'vue-router': vueRouterVersion,
};

export const LibraryDevDependencies = {
  vite: viteVersion,
  postcss: postcssVersion,
  '@babel/preset-env': babelPresetEnvVersion,
  '@vitejs/plugin-vue': vuePluginVersion,
  '@samatech/postcss-basics': postcssBasicsVersion,
  tslib: tslibVersion,
  tsconfig: tsConfigVersion,
  typescript: typescriptVersion,
  ...LintDevDependencies,
  ...CypressDevDependencies,
  ...VueDevDependencies,
};

export const DocsDependencies = {};

export const DocsDevDependencies = { vitepress: '^0.22.4' };
