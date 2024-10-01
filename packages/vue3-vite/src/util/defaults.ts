export const VSCodeExtensionsFilePath = '.vscode/extensions.json';

export const recommendedExtensions = ['vue.volar', 'cpylua.language-postcss'];

// dependency versions
export const vueVersion = '^3.5.10';
export const vueI18nVersion = '^9.14.1';
export const vueRouterVersion = '^4.4.5';

// devDependency versions
export const viteVersion = '^5.4.8';
export const eslintVersion = '^8.57.0';
export const vuePluginVersion = '^5.1.4';
export const babelJestVersion = '^29.7.0';
export const jestGlobalsVersion = '^29.7.0';
export const vue3JestVersion = '^29.2.6';
export const babelPresetEnvVersion = '^7.25.4';
export const postcssVersion = '^8.4.47';
export const postcssBasicsVersion = '^0.7.4';
export const stylelintVersion = '^16.9.0';
export const stylelintConfigVersion = '^36.0.1';
export const tslibVersion = '^2.7.0';
export const tsConfigVersion = '^7.0.0';
export const nrwlJestVersion = '^19.8.3';
export const typescriptVersion = '~5.6.2';

export const CypressDevDependencies = {
  cypress: '^13.15.0',
  '@cypress/vue': '^6.0.1',
  '@cypress/vite-dev-server': '^5.2.0',
  '@cypress/code-coverage': '^3.13.3',
  'eslint-plugin-cypress': '^3.5.0',
  '@nx/cypress': '*',
};

export const VueDevDependencies = {
  '@vue/test-utils': '^2.4.6',
};

export const VitestDevDependencies = {
  '@nx/vite': '^19.8.3',
  'happy-dom': '^15.7.4',
  vitest: '^2.1.1',
};

export const JestDevDependencies = {
  '@nx/jest': nrwlJestVersion,
  '@jest/globals': jestGlobalsVersion,
  '@vue/vue3-jest': vue3JestVersion,
  'babel-jest': babelJestVersion,
  'jest-environment-jsdom': '^29.7.0',
};

export const LintDevDependencies = {
  '@intlify/eslint-plugin-vue-i18n': '^3.0.0',
  '@vue/eslint-config-typescript': '^13.0.0',
  eslint: eslintVersion,
  'eslint-config-prettier': '^9.1.0',
  'eslint-plugin-import': '^2.30.0',
  'eslint-plugin-vue': '^9.28.0',
  stylelint: stylelintVersion,
  'stylelint-config-standard': stylelintConfigVersion,
  '@typescript-eslint/eslint-plugin': '8.8.0',
  '@typescript-eslint/parser': '8.8.0',
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
  picocolors: '1.1.0',
  'class-transformer': '^0.5.1',
  postcss: postcssVersion,
  '@vitejs/plugin-vue': vuePluginVersion,
  '@babel/plugin-transform-modules-commonjs': '^7.24.8',
  '@babel/preset-env': babelPresetEnvVersion,
  '@babel/core': '^7.25.2',
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
