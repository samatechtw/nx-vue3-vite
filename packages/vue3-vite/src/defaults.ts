export const VSCodeExtensionsFilePath = '.vscode/extensions.json';

export const recommendedExtensions = [
  'johnsoncodehk.volar',
  'samatech.postcss-vue',
];

// dependency versions
export const vueVersion = '^3.2.20';
export const vueI18nVersion = '^9.1.6';
export const vueRouterVersion = '^4.0.12';
export const dateFnsVersion = '^2.25.0';
export const fetchApiVersion = '^0.5.0';
export const classTransformerVersion = '^0.4.0';

// devDependency versions
export const viteVersion = '^2.6.10';
export const eslintVersion = '^7.32.0';
export const eslintI18nVersion = '^0.15.0';
export const eslintImportVersion = '^2.25.2';
export const eslintVueVersion = '^7.20.0';
export const eslintVueTypescript = '^8.0.0';
export const vueEslintParser = '^8.0.0';
export const chalkVersion = '^4.1.2';
export const vuePluginVersion = '^1.9.3';
// TODO -- add or remove once it's out of alpha or vite-jest is used
// Note -- babel stuff shouldn't be needed with vite-jest
// https://github.com/samatechtw/nx-vue3-vite/issues/14
// export const vue3JestVersion = '^27.0.0-alpha.2';
export const babelJestVersion = '^27.3.1';
export const babelCommonjsVersion = '^7.15.4';
export const babelCoreVersion = '^7.15.8';
export const babelPresetEnvVersion = '^7.15.8';
export const postcssVersion = '^8.3.11';
export const postcssBasicsVersion = '^0.4.2';
export const compilerSfcVersion = vueVersion;
export const stylelintVersion = '^14.0.0';
export const stylelintConfigVersion = '^23.0.0';
export const tslibVersion = '^2.3.1';
export const tsConfigVersion = '^7.0.0';
export const unpluginVueComponentsVersion = '^0.16.0';
export const viteImagesVersion = '^0.6.1';

// Testing dependencies
export const cypressVersion = '^8.4.0';
export const cypressVueVersion = '^3.0.3';
export const cypressCodeCoverageVersion = '^3.9.11';
export const cypressViteVersion = '^2.2.0';
export const eslintCypressVersion = '^2.12.1';

export const CypressDevDependencies = {
  cypress: cypressVersion,
  '@cypress/vue': cypressVueVersion,
  '@cypress/vite-dev-server': cypressViteVersion,
  '@cypress/code-coverage': cypressCodeCoverageVersion,
  'eslint-plugin-cypress': eslintCypressVersion,
  '@nrwl/cypress': '*',
};

export const ProjectDependencies = {
  vue: vueVersion,
  'vue-i18n': vueI18nVersion,
  'vue-router': vueRouterVersion,
  'date-fns': dateFnsVersion,
  '@sampullman/vue3-fetch-api': fetchApiVersion,
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
  // 'vue3-jest': vue3JestVersion,
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

export const DocsDevDependencies = { vitepress: '^0.17.1' };
