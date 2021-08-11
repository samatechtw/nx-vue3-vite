
// dependency versions
export const vueVersion = '^3.2.1';
export const vueI18nVersion = '^9.1.6';
export const vueRouterVersion = '^4.0.10';
export const dateFnsVersion = '^2.23.0';
export const fetchApiVersion = '^0.3.2';

// devDependency versions
export const viteVersion = '^2.4.4';
export const eslintVersion = '^7.32.0';
export const eslintI18nVersion = '^0.12.0';
export const eslintImportVersion = '^2.23.4';
export const eslintVueVersion = '^7.15.0';
export const babelCommonjsVersion = '^7.14.5';
export const chalkVersion = '^4.1.2';
export const convertSourceMapVersion = '^1.8.0';
export const extractCSSVersion = '^0.4.4';
export const sourceMapVersion = '^0.7.3';
export const vuePluginVersion = '^1.3.0';
export const vueTestUtilsVersion = '^2.0.0-rc.12';
export const vue3JestVersion = '^27.0.0-alpha.2';
export const postcssVersion = '^8.3.6';
export const postcssBasicsVersion = '^0.2.0';
export const compilerSfcVersion = vueVersion;
export const stylelintVersion = '^13.13.1';
export const stylelintConfigVersion = '^22.0.0';
export const tslibVersion = '^2.3.0';
export const tsConfigVersion = '^7.0.0';
export const viteComponentsVersion = '^0.13.2';
export const viteImagesVersion = '^0.6.1';

export const Dependencies = {
  vue: vueVersion,
  'vue-i18n': vueI18nVersion,
  'vue-router': vueRouterVersion,
  'date-fns': dateFnsVersion,
  '@sampullman/vue3-fetch-api': fetchApiVersion,
};

export const DevDependencies = {
  vite: viteVersion,
  eslint: eslintVersion,
  '@babel/plugin-transform-modules-commonjs': babelCommonjsVersion,
  chalk: chalkVersion,
  'convert-source-map': convertSourceMapVersion,
  'source-map': sourceMapVersion,
  'extract-from-css': extractCSSVersion,
  '@intlify/eslint-plugin-vue-i18n': eslintI18nVersion,
  'eslint-plugin-import': eslintImportVersion,
  'eslint-plugin-vue': eslintVueVersion,
  '@vue/compiler-sfc': compilerSfcVersion,
  postcss: postcssVersion,
  '@vitejs/plugin-vue': vuePluginVersion,
  '@vue/test-utils': vueTestUtilsVersion,
  'vue3-jest': vue3JestVersion,
  '@samatech/postcss-basics': postcssBasicsVersion,
  stylelint: stylelintVersion,
  'stylelint-config-standard': stylelintConfigVersion,
  tslib: tslibVersion,
  tsconfig: tsConfigVersion,
  'vite-plugin-components': viteComponentsVersion,
  'vite-plugin-vue-images': viteImagesVersion,
};
