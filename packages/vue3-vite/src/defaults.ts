export const VSCodeExtensionsFilePath = '.vscode/extensions.json';

export const recommendedExtensions = [
  'johnsoncodehk.volar',
  'samatech.postcss-vue',
];

// dependency versions
export const vueVersion = '^3.2.45';
export const vueI18nVersion = '^9.2.2';
export const vueRouterVersion = '^4.1.6';

// devDependency versions
export const viteVersion = '^4.0.2';
export const eslintVersion = '^8.30.0';
export const vuePluginVersion = '^4.0.0';
export const babelJestVersion = '^29.3.1';
export const jestGlobalsVersion = '^29.3.1';
export const vue3JestVersion = '^29.2.2';
export const babelCommonjsVersion = '^7.19.6';
export const postcssVersion = '^8.4.20';
export const postcssBasicsVersion = '^0.5.0';
export const stylelintVersion = '^14.16.0';
export const stylelintConfigVersion = '^29.0.0';
export const tslibVersion = '^2.4.1';
export const tsConfigVersion = '^7.0.0';
export const unpluginVueComponentsVersion = '^0.22.12';

export const CypressDevDependencies = {
  cypress: '^12.1.0',
  '@cypress/vue': '^5.0.2',
  '@cypress/vite-dev-server': '^5.0.2',
  '@cypress/code-coverage': '^3.10.0',
  'eslint-plugin-cypress': '^2.12.1',
  '@nrwl/cypress': '*',
};

export const ProjectDependencies = {
  vue: vueVersion,
  'vue-i18n': vueI18nVersion,
  'vue-router': vueRouterVersion,
  'date-fns': '^2.29.3',
  '@sampullman/fetch-api': '^0.8.1',
};

export const ProjectDevDependencies = {
  vite: viteVersion,
  eslint: eslintVersion,
  picocolors: '1.0.0',
  'class-transformer': '^0.5.1',
  '@intlify/eslint-plugin-vue-i18n': '^2.0.0',
  'eslint-plugin-import': '^2.26.0',
  'eslint-plugin-vue': '^9.8.0',
  'vue-eslint-parser': '^9.1.0',
  '@vue/eslint-config-typescript': '^11.0.2',
  '@vue/compiler-sfc': vueVersion,
  '@vue/vue3-jest': vue3JestVersion,
  postcss: postcssVersion,
  '@vitejs/plugin-vue': vuePluginVersion,
  '@typescript-eslint/eslint-plugin': '5.47.0',
  '@typescript-eslint/parser': '5.47.0',
  'eslint-config-prettier': '^8.5.0',
  'babel-jest': babelJestVersion,
  '@jest/globals': jestGlobalsVersion,
  '@babel/plugin-transform-modules-commonjs': babelCommonjsVersion,
  '@babel/core': '^7.20.5',
  '@babel/preset-env': '^7.20.2',
  '@samatech/postcss-basics': postcssBasicsVersion,
  stylelint: stylelintVersion,
  'stylelint-config-standard': stylelintConfigVersion,
  tslib: tslibVersion,
  tsconfig: tsConfigVersion,
  'unplugin-vue-components': unpluginVueComponentsVersion,
  ...CypressDevDependencies,
};

export const LibraryDependencies = {
  vue: vueVersion,
  'vue-i18n': vueI18nVersion,
  'vue-router': vueRouterVersion,
};

export const LibraryDevDependencies = {
  vite: viteVersion,
  eslint: eslintVersion,
  '@vue/compiler-sfc': vueVersion,
  postcss: postcssVersion,
  '@vitejs/plugin-vue': vuePluginVersion,
  '@samatech/postcss-basics': postcssBasicsVersion,
  stylelint: stylelintVersion,
  'stylelint-config-standard': stylelintConfigVersion,
  tslib: tslibVersion,
  tsconfig: tsConfigVersion,
  'unplugin-vue-components': unpluginVueComponentsVersion,
  ...CypressDevDependencies,
};

export const DocsDependencies = {};

export const DocsDevDependencies = { vitepress: '^0.22.4' };
