export const VSCodeExtensionsFilePath = '.vscode/extensions.json';

export const recommendedExtensions = ['vue.volar', 'cpylua.language-postcss'];

// dependency versions
export const vueVersion = '^3.3.4';
export const vueI18nVersion = '^9.5.0';
export const vueRouterVersion = '^4.2.5';

// devDependency versions
export const viteVersion = '^4.3.9';
export const eslintVersion = '^8.51.0';
export const vuePluginVersion = '^4.4.0';
export const babelJestVersion = '^29.7.0';
export const jestGlobalsVersion = '^29.7.0';
export const vue3JestVersion = '^29.2.6';
export const babelPresetEnvVersion = '^7.23.2';
export const postcssVersion = '^8.4.31';
export const postcssBasicsVersion = '^0.6.0';
export const stylelintVersion = '^15.10.3';
export const stylelintConfigVersion = '^34.0.0';
export const tslibVersion = '^2.6.2';
export const tsConfigVersion = '^7.0.0';
export const nrwlJestVersion = '^16.10.0';
export const typescriptVersion = '~5.2.2';

export const CypressDevDependencies = {
  cypress: '^13.3.1',
  '@cypress/vue': '^6.0.0',
  '@cypress/vite-dev-server': '^5.0.6',
  '@cypress/code-coverage': '^3.12.3',
  'eslint-plugin-cypress': '^2.15.1',
  '@nx/cypress': '*',
};

export const VueDevDependencies = {
  '@vue/test-utils': '^2.4.1',
};

export const VitestDevDependencies = {
  '@nx/vite': '^16.10.0',
  'happy-dom': '^12.9.0',
  vitest: '^0.32.0',
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
  '@vue/eslint-config-typescript': '^12.0.0',
  eslint: eslintVersion,
  'eslint-config-prettier': '^8.8.0',
  'eslint-plugin-import': '^2.28.1',
  'eslint-plugin-vue': '^9.17.0',
  stylelint: stylelintVersion,
  'stylelint-config-standard': stylelintConfigVersion,
  '@typescript-eslint/eslint-plugin': '5.60.1',
  '@typescript-eslint/parser': '5.60.1',
  'vue-eslint-parser': '^9.3.2',
};

export const ProjectDependencies = {
  vue: vueVersion,
  'vue-i18n': vueI18nVersion,
  'vue-router': vueRouterVersion,
  'date-fns': '^2.30.0',
};

export const ProjectDevDependencies = {
  vite: viteVersion,
  picocolors: '1.0.0',
  'class-transformer': '^0.5.1',
  postcss: postcssVersion,
  '@vitejs/plugin-vue': vuePluginVersion,
  '@babel/plugin-transform-modules-commonjs': '^7.23.0',
  '@babel/preset-env': babelPresetEnvVersion,
  '@babel/core': '^7.23.2',
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
