export const VSCodeExtensionsFilePath = '.vscode/extensions.json';

export const recommendedExtensions = [
  'johnsoncodehk.volar',
  'samatech.postcss-vue',
];

// dependency versions
export const vueVersion = '^3.2.31';
export const vueI18nVersion = '^9.1.6';
export const vueRouterVersion = '^4.0.12';

// devDependency versions
export const viteVersion = '^2.9.1';
export const eslintVersion = '^8.8.0';
export const vuePluginVersion = '^2.2.2';
// TODO -- add or remove once it's out of alpha or vite-jest is used
// Note -- babel stuff shouldn't be needed with vite-jest
// https://github.com/samatechtw/nx-vue3-vite/issues/14
// export const vue3JestVersion = '^27.0.0-alpha.2';
export const babelJestVersion = '^27.3.1';
export const babelCommonjsVersion = '^7.15.4';
export const postcssVersion = '^8.4.6';
export const postcssBasicsVersion = '^0.4.2';
export const stylelintVersion = '^14.5.1';
export const stylelintConfigVersion = '^25.0.0';
export const tslibVersion = '^2.3.1';
export const tsConfigVersion = '^7.0.0';
export const unpluginVueComponentsVersion = '^0.17.19';

export const CypressDevDependencies = {
  cypress: '^9.5.3',
  '@cypress/vue': '^3.1.1',
  '@cypress/vite-dev-server': '^2.2.2',
  '@cypress/code-coverage': '^3.9.12',
  'eslint-plugin-cypress': '^2.12.1',
  '@nrwl/cypress': '*',
};

export const ProjectDependencies = {
  vue: vueVersion,
  'vue-i18n': vueI18nVersion,
  'vue-router': vueRouterVersion,
  'date-fns': '^2.28.0',
  '@sampullman/fetch-api': '^0.6.0',
};

export const ProjectDevDependencies = {
  vite: viteVersion,
  eslint: eslintVersion,
  picocolors: '1.0.0',
  'class-transformer': '^0.5.1',
  '@intlify/eslint-plugin-vue-i18n': '^1.2.0',
  'eslint-plugin-import': '^2.25.4',
  'eslint-plugin-vue': '^8.5.0',
  'vue-eslint-parser': '^8.3.0',
  '@vue/eslint-config-typescript': '^10.0.0',
  '@vue/compiler-sfc': vueVersion,
  postcss: postcssVersion,
  '@vitejs/plugin-vue': vuePluginVersion,
  '@typescript-eslint/eslint-plugin': '5.12.1',
  '@typescript-eslint/parser': '5.12.1',
  'eslint-config-prettier': '^8.4.0',
  'babel-jest': babelJestVersion,
  '@babel/plugin-transform-modules-commonjs': babelCommonjsVersion,
  '@babel/core': '^7.15.8',
  '@babel/preset-env': '^7.15.8',
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

export const DocsDevDependencies = { vitepress: '^0.21.6' };
