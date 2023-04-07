export const VSCodeExtensionsFilePath = '.vscode/extensions.json';

export const recommendedExtensions = ['vue.volar', 'cpylua.language-postcss'];

// dependency versions
export const vueVersion = '^3.2.47';
export const vueI18nVersion = '^9.2.2';
export const vueRouterVersion = '^4.1.6';

// devDependency versions
export const viteVersion = '^4.2.1';
export const eslintVersion = '^8.37.0';
export const vuePluginVersion = '^4.1.0';
export const babelJestVersion = '^29.5.0';
export const jestGlobalsVersion = '^29.5.0';
export const vue3JestVersion = '^29.2.3';
export const babelPresetEnvVersion = '^7.21.4';
export const postcssVersion = '^8.4.21';
export const postcssBasicsVersion = '^0.6.0';
export const stylelintVersion = '^15.4.0';
export const stylelintConfigVersion = '^32.0.0';
export const tslibVersion = '^2.5.0';
export const tsConfigVersion = '^7.0.0';
export const unpluginVueComponentsVersion = '^0.24.1';
export const nrwlJestVersion = '^15.9.2';
export const typescriptVersion = '~4.9.5';

export const CypressDevDependencies = {
  cypress: '^12.9.0',
  '@cypress/vue': '^5.0.5',
  '@cypress/vite-dev-server': '^5.0.5',
  '@cypress/code-coverage': '^3.10.3',
  'eslint-plugin-cypress': '^2.13.2',
  '@nrwl/cypress': '*',
};

export const VueDevDependencies = {
  '@vue/test-utils': '^2.3.2',
};

export const VitestDevDependencies = {
  '@nrwl/vite': '^15.9.2',
  'happy-dom': '^9.1.7',
  vitest: '^0.29.8',
};

export const JestDevDependencies = {
  '@nrwl/jest': nrwlJestVersion,
  '@jest/globals': jestGlobalsVersion,
  '@vue/vue3-jest': vue3JestVersion,
  'babel-jest': babelJestVersion,
  'jest-environment-jsdom': '^29.5.0',
};

export const LintDevDependencies = {
  '@intlify/eslint-plugin-vue-i18n': '^2.0.0',
  '@vue/eslint-config-typescript': '^11.0.2',
  eslint: eslintVersion,
  'eslint-config-prettier': '^8.8.0',
  'eslint-plugin-import': '^2.27.5',
  'eslint-plugin-vue': '^9.10.0',
  stylelint: stylelintVersion,
  'stylelint-config-standard': stylelintConfigVersion,
  '@typescript-eslint/eslint-plugin': '5.57.1',
  '@typescript-eslint/parser': '5.57.1',
  'vue-eslint-parser': '^9.1.1',
};

export const ProjectDependencies = {
  vue: vueVersion,
  'vue-i18n': vueI18nVersion,
  'vue-router': vueRouterVersion,
  'date-fns': '^2.29.3',
  '@sampullman/fetch-api': '^0.11.3',
};

export const ProjectDevDependencies = {
  vite: viteVersion,
  picocolors: '1.0.0',
  'class-transformer': '^0.5.1',
  postcss: postcssVersion,
  '@vitejs/plugin-vue': vuePluginVersion,
  '@babel/plugin-transform-modules-commonjs': '^7.21.2',
  '@babel/preset-env': babelPresetEnvVersion,
  '@babel/core': '^7.21.4',
  '@samatech/postcss-basics': postcssBasicsVersion,
  tslib: tslibVersion,
  tsconfig: tsConfigVersion,
  'unplugin-vue-components': unpluginVueComponentsVersion,
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
  'unplugin-vue-components': unpluginVueComponentsVersion,
  typescript: typescriptVersion,
  ...LintDevDependencies,
  ...CypressDevDependencies,
  ...VueDevDependencies,
};

export const DocsDependencies = {};

export const DocsDevDependencies = { vitepress: '^0.22.4' };
