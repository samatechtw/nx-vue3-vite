export const VSCodeExtensionsFilePath = '.vscode/extensions.json';

export const recommendedExtensions = ['vue.volar', 'cpylua.language-postcss'];

// dependency versions
export const vueVersion = '^3.3.4';
export const vueI18nVersion = '^9.2.2';
export const vueRouterVersion = '^4.2.2';

// devDependency versions
export const viteVersion = '^4.3.9';
export const eslintVersion = '^8.42.0';
export const vuePluginVersion = '^4.2.3';
export const babelJestVersion = '^29.5.0';
export const jestGlobalsVersion = '^29.5.0';
export const vue3JestVersion = '^29.2.4';
export const babelPresetEnvVersion = '^7.22.5';
export const postcssVersion = '^8.4.24';
export const postcssBasicsVersion = '^0.6.0';
export const stylelintVersion = '^15.7.0';
export const stylelintConfigVersion = '^33.0.0';
export const tslibVersion = '^2.5.3';
export const tsConfigVersion = '^7.0.0';
export const nrwlJestVersion = '^16.3.2';
export const typescriptVersion = '~5.1.3';

export const CypressDevDependencies = {
  cypress: '^12.14.0',
  '@cypress/vue': '^5.0.5',
  '@cypress/vite-dev-server': '^5.0.5',
  '@cypress/code-coverage': '^3.10.7',
  'eslint-plugin-cypress': '^2.13.3',
  '@nx/cypress': '*',
};

export const VueDevDependencies = {
  '@vue/test-utils': '^2.3.2',
};

export const VitestDevDependencies = {
  '@nx/vite': '^16.3.2',
  'happy-dom': '^9.20.3',
  vitest: '^0.32.0',
};

export const JestDevDependencies = {
  '@nx/jest': nrwlJestVersion,
  '@jest/globals': jestGlobalsVersion,
  '@vue/vue3-jest': vue3JestVersion,
  'babel-jest': babelJestVersion,
  'jest-environment-jsdom': '^29.5.0',
};

export const LintDevDependencies = {
  '@intlify/eslint-plugin-vue-i18n': '^2.0.0',
  '@vue/eslint-config-typescript': '^11.0.3',
  eslint: eslintVersion,
  'eslint-config-prettier': '^8.8.0',
  'eslint-plugin-import': '^2.27.5',
  'eslint-plugin-vue': '^9.14.1',
  stylelint: stylelintVersion,
  'stylelint-config-standard': stylelintConfigVersion,
  '@typescript-eslint/eslint-plugin': '5.59.11',
  '@typescript-eslint/parser': '5.59.11',
  'vue-eslint-parser': '^9.3.1',
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
  '@babel/plugin-transform-modules-commonjs': '^7.22.5',
  '@babel/preset-env': babelPresetEnvVersion,
  '@babel/core': '^7.22.5',
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
