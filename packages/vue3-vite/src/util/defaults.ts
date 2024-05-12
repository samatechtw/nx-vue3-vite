export const VSCodeExtensionsFilePath = '.vscode/extensions.json';

export const recommendedExtensions = ['vue.volar', 'cpylua.language-postcss'];

// dependency versions
export const vueVersion = '^3.4.27';
export const vueI18nVersion = '^9.13.1';
export const vueRouterVersion = '^4.3.2';

// devDependency versions
export const viteVersion = '^5.2.11';
export const eslintVersion = '^8.57.0';
export const vuePluginVersion = '^5.0.4';
export const babelJestVersion = '^29.7.0';
export const jestGlobalsVersion = '^29.7.0';
export const vue3JestVersion = '^29.2.6';
export const babelPresetEnvVersion = '^7.24.5';
export const postcssVersion = '^8.4.38';
export const postcssBasicsVersion = '^0.7.4';
export const stylelintVersion = '^16.5.0';
export const stylelintConfigVersion = '^36.0.0';
export const tslibVersion = '^2.6.2';
export const tsConfigVersion = '^7.0.0';
export const nrwlJestVersion = '^18.3.4';
export const typescriptVersion = '~5.4.5';

export const CypressDevDependencies = {
  cypress: '^13.9.0',
  '@cypress/vue': '^6.0.0',
  '@cypress/vite-dev-server': '^5.0.7',
  '@cypress/code-coverage': '^3.12.39',
  'eslint-plugin-cypress': '^3.2.0',
  '@nx/cypress': '*',
};

export const VueDevDependencies = {
  '@vue/test-utils': '^2.4.6',
};

export const VitestDevDependencies = {
  '@nx/vite': '^18.3.4',
  'happy-dom': '^14.10.1',
  vitest: '^1.6.0',
};

export const JestDevDependencies = {
  '@nx/jest': nrwlJestVersion,
  '@jest/globals': jestGlobalsVersion,
  '@vue/vue3-jest': vue3JestVersion,
  'babel-jest': babelJestVersion,
  'jest-environment-jsdom': '^29.7.0',
};

export const LintDevDependencies = {
  '@intlify/eslint-plugin-vue-i18n': '^2.0.0',
  '@vue/eslint-config-typescript': '^13.0.0',
  eslint: eslintVersion,
  'eslint-config-prettier': '^9.1.0',
  'eslint-plugin-import': '^2.29.1',
  'eslint-plugin-vue': '^9.26.0',
  stylelint: stylelintVersion,
  'stylelint-config-standard': stylelintConfigVersion,
  '@typescript-eslint/eslint-plugin': '7.8.0',
  '@typescript-eslint/parser': '7.8.0',
  'vue-eslint-parser': '^9.4.2',
};

export const ProjectDependencies = {
  vue: vueVersion,
  'vue-i18n': vueI18nVersion,
  'vue-router': vueRouterVersion,
  'date-fns': '^3.6.0',
};

export const ProjectDevDependencies = {
  vite: viteVersion,
  picocolors: '1.0.0',
  'class-transformer': '^0.5.1',
  postcss: postcssVersion,
  '@vitejs/plugin-vue': vuePluginVersion,
  '@babel/plugin-transform-modules-commonjs': '^7.24.1',
  '@babel/preset-env': babelPresetEnvVersion,
  '@babel/core': '^7.23.7',
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
