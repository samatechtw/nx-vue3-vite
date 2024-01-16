export const VSCodeExtensionsFilePath = '.vscode/extensions.json';

export const recommendedExtensions = ['vue.volar', 'cpylua.language-postcss'];

// dependency versions
export const vueVersion = '^3.4.14';
export const vueI18nVersion = '^9.9.0';
export const vueRouterVersion = '^4.2.5';

// devDependency versions
export const viteVersion = '^5.0.11';
export const eslintVersion = '^8.56.0';
export const vuePluginVersion = '^5.0.3';
export const babelJestVersion = '^29.7.0';
export const jestGlobalsVersion = '^29.7.0';
export const vue3JestVersion = '^29.2.6';
export const babelPresetEnvVersion = '^7.23.8';
export const postcssVersion = '^8.4.33';
export const postcssBasicsVersion = '^0.7.3';
export const stylelintVersion = '^16.1.0';
export const stylelintConfigVersion = '^36.0.0';
export const tslibVersion = '^2.6.2';
export const tsConfigVersion = '^7.0.0';
export const nrwlJestVersion = '^17.2.8';
export const typescriptVersion = '~5.3.3';

export const CypressDevDependencies = {
  cypress: '^13.6.2',
  '@cypress/vue': '^6.0.0',
  '@cypress/vite-dev-server': '^5.0.7',
  '@cypress/code-coverage': '^3.12.18',
  'eslint-plugin-cypress': '^2.15.1',
  '@nx/cypress': '*',
};

export const VueDevDependencies = {
  '@vue/test-utils': '^2.4.3',
};

export const VitestDevDependencies = {
  '@nx/vite': '^17.2.8',
  'happy-dom': '^13.1.4',
  vitest: '^1.2.0',
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
  'eslint-config-prettier': '^9.1.0',
  'eslint-plugin-import': '^2.29.1',
  'eslint-plugin-vue': '^9.20.1',
  stylelint: stylelintVersion,
  'stylelint-config-standard': stylelintConfigVersion,
  '@typescript-eslint/eslint-plugin': '6.19.0',
  '@typescript-eslint/parser': '6.19.0',
  'vue-eslint-parser': '^9.4.0',
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
  '@babel/plugin-transform-modules-commonjs': '^7.23.3',
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
