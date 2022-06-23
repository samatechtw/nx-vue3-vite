export const VSCodeExtensionsFilePath = '.vscode/extensions.json';

export const recommendedExtensions = [
  'johnsoncodehk.volar',
  'samatech.postcss-vue',
];

// dependency versions
export const vueVersion = '^3.2.37';
export const vueI18nVersion = '^9.1.6';
export const vueRouterVersion = '^4.0.16';

// devDependency versions
export const viteVersion = '^2.9.12';
export const eslintVersion = '^8.18.0';
export const vuePluginVersion = '^2.3.3';
// TODO -- add or remove once it's out of alpha or vite-jest is used
// Note -- babel stuff shouldn't be needed with vite-jest
// https://github.com/samatechtw/nx-vue3-vite/issues/14
// export const vue3JestVersion = '^27.0.0-alpha.2';
export const babelJestVersion = '^28.1.1';
export const babelCommonjsVersion = '^7.18.2';
export const postcssVersion = '^8.4.14';
export const postcssBasicsVersion = '^0.4.2';
export const stylelintVersion = '^14.9.1';
export const stylelintConfigVersion = '^26.0.0';
export const tslibVersion = '^2.4.0';
export const tsConfigVersion = '^7.0.0';
export const unpluginVueComponentsVersion = '^0.19.6';

export const CypressDevDependencies = {
  cypress: '^10.2.0',
  '@cypress/vue': '^4.0.0',
  '@cypress/vite-dev-server': '^3.0.0',
  '@cypress/code-coverage': '^3.10.0',
  'eslint-plugin-cypress': '^2.12.1',
  '@nrwl/cypress': '*',
};

export const ProjectDependencies = {
  vue: vueVersion,
  'vue-i18n': vueI18nVersion,
  'vue-router': vueRouterVersion,
  'date-fns': '^2.28.0',
  '@sampullman/fetch-api': '^0.7.0',
};

export const ProjectDevDependencies = {
  vite: viteVersion,
  eslint: eslintVersion,
  picocolors: '1.0.0',
  'class-transformer': '^0.5.1',
  '@intlify/eslint-plugin-vue-i18n': '^2.0.0',
  'eslint-plugin-import': '^2.26.0',
  'eslint-plugin-vue': '^9.1.1',
  'vue-eslint-parser': '^9.0.2',
  '@vue/eslint-config-typescript': '^11.0.0',
  '@vue/compiler-sfc': vueVersion,
  postcss: postcssVersion,
  '@vitejs/plugin-vue': vuePluginVersion,
  '@typescript-eslint/eslint-plugin': '5.24.0',
  '@typescript-eslint/parser': '5.24.0',
  'eslint-config-prettier': '^8.5.0',
  'babel-jest': babelJestVersion,
  '@babel/plugin-transform-modules-commonjs': babelCommonjsVersion,
  '@babel/core': '^7.18.5',
  '@babel/preset-env': '^7.18.2',
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
