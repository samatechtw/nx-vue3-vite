

<h2 align='center'>nx-vue3-vite</h2>

<p align='center'>NX Plugin for generating opinionated Vue3+Vite+PostCSS applications</p>

<p align='center'>
<a href='https://www.npmjs.com/package/nx-vue3-vite'>
  <img src='https://img.shields.io/npm/v/nx-vue3-vite?color=222&style=flat-square'>
</a>
</p>

<br>


This project was generated using [Nx](https://nx.dev):
```
npx create-nx-plugin <org> --pluginName <plugin>
```

## Table of contents
- [Philosophy](#philosophy)
- [Plugin Usage](#plugin-usage)
  - [Install](#install)
  - [Generate App](#generate-app)
  - [Serve](#serve)
- [Vue3 Generators](#vue3-generators)
  - [Application](#application)
  - [Component](#component)
  - [Library](#library)
- [Vue3 Executors](#vue3-executors)
  - [Dev Server](#dev-server)
  - [Build](#build)
  - [Lint](#lint)
  - [Unit Testing](#unit-testing)
  - [E2E Testing](#e2e-testing)
- [Workarounds](#workarounds)
  - [dep-graph hack](#dep-graph-hack)
  - [vue3-jest](#vue3-jest)
  - [vite-jest](#vite-jest)
- [Development/Contributing](#developmentcontributing)

## Philosophy

The intent of this plugin is to help generate a Vue3 related projects and components for Nx. The recommended configuration and folder structures are used where possible in order to integrate smoothly. Some path aliases are provided for convenience:
- `@app`    => `<root>/src/app`
- `@assets` => `<root>/src/assets`
- `@public` => `<root>/src/public`

One compromise made is keeping `index.html` in the root folder. Vite strongly suggests this, since it treats `index.html` as the entry point and requires some configuration to change that.

## Plugin Usage

### Install
**npm**
```bash
npm install nx-vue3-vite --save-dev
```

### Generate App
```bash
nx g nx-vue3-vite:app <app-name>
```

### Serve
```bash
nx serve <app-name>
```

### Recommended VSCode extensions

This plugin adds a few recommended extensions to VSCode. To install them, open VSCode and:

- Open the command palette `[CMD] + [Shift] + [p]` and type "Show Recommended Extensions"

- Review and install extensions under "WORKSPACE RECOMMENDATIONS"

## Vue3 Generators
([NX Docs](https://nx.dev/latest/angular/executors/using-builders))

### Application
```
nx g nx-vue3-vite:app <app-name> [options]
```

Arguments  |	Description
---------- | ------------------------
app-name   |	The name of the generated app

Options     |    Default     | Description
----------- | -------------- | ------------
--tags      | -              | Comma delimited tags for linting
--directory | apps           | Workspace directory to place the Vue project

### Component
```
nx g nx-vue3-vite:component <name> [options]

# Alias
nx g nx-vue3-vite:c <name> [options]
```

Arguments | Description
--------- | ----------------
name      |	The name of the component.

Options      | Default | Description
------------ | ------- | --------------
--project    | -       | The name of the project.
--directory  | -	     | Directory relative to `src` where the component will be generated
--lang       | ts      | Script language: ['ts', 'js']
--setup      | true    | [Script setup](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) syntax sugar
--style	     | postcss | CSS Preprocessor: ['css', 'scss', 'less', 'stylus', 'postcss']
--scoped     | false   | Whether the component's style block is scoped

### Library

TBD

## Vue3 Executors
([NX Docs](https://nx.dev/latest/angular/generators/using-schematics))

### Dev Server
```
nx serve <app-name> [options]
```

Arguments  |	Description
---------- | ------------------------
app-name   |	The name of your app

Options     |    Default     | Description
----------- | -------------- | ------------
--host      | localhost      | [Server host location](https://vitejs.dev/config/#server-host)
--port      | 3000           | [Server port](https://vitejs.dev/config/#server-port)
--https     | false          | [Run in HTTPS/SSL mode](https://vitejs.dev/config/#server-https)

### Build
```
nx build <app-name> [options]
```

Arguments  |	Description
---------- | ------------------------
app-name   |	The name of your app

Options     |    Default     | Description
----------- | -------------- | ------------
--dist      | localhost      | [Output directory](https://vitejs.dev/config/#build-outdir)

### Lint
```
nx lint <app-name> [options]
```

See [options](https://nx.dev/latest/angular/linter/eslint) for `@nrwl/linter`

### Unit Testing
Note: see [vite-jest](#vite-jest) section for progress on testing code that relies on Vite transforms.

```
nx test <app-name> [options]
```

See [options](https://nx.dev/latest/angular/jest/jest) for `@nrwl/jest`

### E2E Testing
```
nx e2e <app-name> [options]
```

See [options](https://nx.dev/latest/angular/cypress/overview) for `@nrwl/cypress`

## Workarounds
Documentation for non-ideal setup that should be removed or replaced when possible.

### dep-graph hack
In order to get `nx dep-graph` to work in a generated Vue app, the NX code responsible for parsing file extension must be patched.

The `build` and `serve` executors in this plugin automatically check your workspace `node_modules` to see if the patch is already installed, and installs if not. See [`packages/vue3-vite/patch-nx-dep-graph.js`](packages/vue3-vite/patch-nx-dep-graph.js).

Patch details: https://github.com/ZachJW34/nx-plus/tree/master/libs/vue#nx-dependency-graph-support

Related NX issue: https://github.com/nrwl/nx/issues/2960

### vue3-jest

Configuring the transformer in `vue3-jest` is difficult, and the library/docs are not quite production ready. The code itself works well when pulled in-tree, so it should be possible to resolve this soon.

The transformer generated in `<app-name>/deps/vue3-jest/` comes directly from [this package](https://github.com/vuejs/vue-jest/tree/47244cddf4f47dd7912f1feb6e128f07cb2f9379/packages/vue3-jest/lib).

### vite-jest
Currently, unit tests will throw warnings when mounting Vue components that rely on code transforms from Vite plugins. This is because Jest does not know about Vite, and relies directly on SFC compilation from `vue3-jest`. The [vite-jest] project will eventually solve this problem, or we may implement our own transformer. The main issue now is Vite requires async for dependency resolution and transforming code, but Jest support is rudimentary/alpha.

## Development/Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)
