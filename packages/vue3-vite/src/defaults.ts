export const VSCodeExtensionsFilePath = '.vscode/extensions.json';

export const recommendedExtensions = [
  'johnsoncodehk.volar',
  'samatech.postcss-vue',
];

// dependency versions
export const vueVersion = '^3.2.26';
export const vueI18nVersion = '^9.1.6';
export const vueRouterVersion = '^4.0.12';
export const classTransformerVersion = '^0.4.0';

// devDependency versions
export const viteVersion = '^2.7.12';
export const eslintVersion = '^7.32.0';
export const eslintI18nVersion = '^0.15.0';
export const eslintImportVersion = '^2.25.2';
export const eslintVueVersion = '^7.20.0';
export const eslintVueTypescript = '^8.0.0';
export const vueEslintParser = '^8.0.1';
export const chalkVersion = '^4.1.2';
export const vuePluginVersion = '^2.0.1';
// TODO -- add or remove once it's out of alpha or vite-jest is used
// Note -- babel stuff shouldn't be needed with vite-jest
// https://github.com/samatechtw/nx-vue3-vite/issues/14
// export const vue3JestVersion = '^27.0.0-alpha.2';
export const babelJestVersion = '^27.3.1';
export const babelCommonjsVersion = '^7.15.4';
export const babelCoreVersion = '^7.15.8';
export const babelPresetEnvVersion = '^7.15.8';
export const postcssVersion = '^8.4.5';
export const postcssBasicsVersion = '^0.4.2';
export const compilerSfcVersion = vueVersion;
export const stylelintVersion = '^14.2.0';
export const stylelintConfigVersion = '^23.0.0';
export const tslibVersion = '^2.3.1';
export const tsConfigVersion = '^7.0.0';
export const unpluginVueComponentsVersion = '^0.17.11';
export const viteImagesVersion = '^0.6.1';

export const CypressDevDependencies = {
  cypress: '^8.7.0',
  '@cypress/vue': '^3.1.0',
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
  chalk: chalkVersion,
  'class-transformer': classTransformerVersion,
  '@intlify/eslint-plugin-vue-i18n': eslintI18nVersion,
  'eslint-plugin-import': eslintImportVersion,
  'eslint-plugin-vue': eslintVueVersion,
  'vue-eslint-parser': vueEslintParser,
  '@vue/eslint-config-typescript': eslintVueTypescript,
  '@vue/compiler-sfc': compilerSfcVersion,
  postcss: postcssVersion,
  '@vitejs/plugin-vue': vuePluginVersion,
  '@typescript-eslint/eslint-plugin': '^4.31.2',
  '@typescript-eslint/parser': '^4.31.2',
  'eslint-config-prettier': '^8.1.0',
  'babel-jest': babelJestVersion,
  '@babel/plugin-transform-modules-commonjs': babelCommonjsVersion,
  '@babel/core': babelCoreVersion,
  '@babel/preset-env': babelPresetEnvVersion,
  '@samatech/postcss-basics': postcssBasicsVersion,
  stylelint: stylelintVersion,
  'stylelint-config-standard': stylelintConfigVersion,
  tslib: tslibVersion,
  tsconfig: tsConfigVersion,
  'unplugin-vue-components': unpluginVueComponentsVersion,
  'vite-plugin-vue-images': viteImagesVersion,
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
  '@vue/compiler-sfc': compilerSfcVersion,
  postcss: postcssVersion,
  '@vitejs/plugin-vue': vuePluginVersion,
  '@samatech/postcss-basics': postcssBasicsVersion,
  stylelint: stylelintVersion,
  'stylelint-config-standard': stylelintConfigVersion,
  tslib: tslibVersion,
  tsconfig: tsConfigVersion,
  'unplugin-vue-components': unpluginVueComponentsVersion,
  'vite-plugin-vue-images': viteImagesVersion,
  ...CypressDevDependencies,
};

export const DocsDependencies = {};

export const DocsDevDependencies = { vitepress: '^0.21.4' };
