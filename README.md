

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
  - [Project Structure](#project-structure)
  - [Build](#build)
  - [Unit Tests](#unit-tests)
  - [E2E Tests](#e2e-tests)

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

## Vue3 Generators
([NX Docs](https://nx.dev/latest/angular/executors/using-builders))

### Application
```
nx g nx-vue3-vite:app <app-name> [options]
```

Arguments  |	Description
---------- | ------------------------
<app-name> |	The name of the generated app

Options     |    Default     | Description
----------- | -------------- | ------------
--tags      | -              | Comma delimited tags for linting
--directory | apps           | Workspace directory to place the Vue project

### Component

TBD

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
<app-name> |	The name of your app

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
<app-name> |	The name of your app

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

### Project Structure
Source code and documentation are included in the top-level folders listed below:

Folder   | Description
-------- | -----------
packages | Plugin source code
e2e      | e2e tests associated with plugins
tools    | Miscellaneous scripts and utilities

### Build

Build the main `vue3-vite` app plugin:
```
nx run vue3-vite:build
```

Build all app plugins:
```
nx run-many --target build --all
```

### Unit Tests

Run unit tests for the `vue3-vite` plugin:
```
nx test vue3-vite
```

Prepend `affected` to only execute unit tests affected by a change:
```
nx affected:test vue3-vite
```

Run unit tests for all plugins:
```
nx run-many --target test --all
```

### E2E Tests

Run e2e tests for the `vue3-vite` plugin:
```
nx e2e vue3-vite
```

Run e2e tests for all plugins:
```
nx run-many --target e2e --all
```
